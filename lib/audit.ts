/**
 * lib/audit.ts — Optimal course allocation via maximum bipartite matching
 *
 * ── Why matching, not greedy ──────────────────────────────────────────────────
 *
 * Greedy (even scarcity-first greedy) fails on cross-group conflicts:
 *
 *   STAT major:  Core slot accepts { MATH 237, MATH 239, MATH 247, MATH 249 }
 *                Math Options slot accepts ONLY { MATH 237, MATH 247 }
 *   CO major:    Core slot accepts { MATH 237, MATH 239, MATH 247, MATH 249 }
 *                Extra slot accepts ONLY { MATH 239, MATH 249 }
 *
 *   Student has: MATH 237, MATH 239.
 *   STAT: greedy may assign MATH 237 → Core, leaving nothing for Math Options.
 *         Correct: MATH 239 → Core, MATH 237 → Math Options.
 *   CO:   greedy may assign MATH 239 → Core, leaving nothing for Extra slot.
 *         Correct: MATH 237 → Core, MATH 239 → Extra slot.
 *
 * Maximum bipartite matching finds the globally optimal assignment in one pass.
 *
 * ── Algorithm: Hopcroft-Karp ─────────────────────────────────────────────────
 *
 * O(E√V) where E = edges (course×slot eligibilities) and V = courses+slots.
 * At the scale of a degree audit (≤200 courses, ≤100 slots) this is instant.
 *
 * ── Slot model ────────────────────────────────────────────────────────────────
 *
 * We explode every RequirementGroup into individual "slots":
 *   - one slot per course in a "required" group
 *   - `minCourses` slots for an "elective" / "list-one-of" group
 *   - one slot per subGroup entry (respecting at-most count) for "complex" groups
 *
 * A slot carries an eligibility predicate (which courses can fill it).
 * The matching assigns at most one course per slot and at most one slot per
 * course (unless canDoubleCount is set on that slot's group/subGroup).
 *
 * ── Double-counting ──────────────────────────────────────────────────────────
 *
 * canDoubleCount slots are satisfied "for free" — they don't consume a course
 * from the pool, so the same course can also fill a non-double-count slot.
 * We model this by running double-count slots AFTER the main matching, reading
 * off which courses were assigned to non-double-count slots, then checking
 * overlap with double-count slot eligibilities.
 */

import type {
  RequirementGroup,
  RequirementRule,
  SubGroup,
  AuditGroupResult,
} from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// Rule helpers
// ─────────────────────────────────────────────────────────────────────────────

export function matchesRule(code: string, rule: RequirementRule): boolean {
  const [prefix, levelStr] = code.split(" ");
  const level = parseInt(levelStr, 10);
  if (rule.prefixes && !rule.prefixes.includes(prefix)) return false;
  if (rule.minLevel !== undefined && level < rule.minLevel) return false;
  if (rule.maxLevel !== undefined && level > rule.maxLevel) return false;
  return true;
}

export function matchesAnyRule(code: string, rules: RequirementRule[]): boolean {
  return rules.some((r) => matchesRule(code, r));
}

// ─────────────────────────────────────────────────────────────────────────────
// Slot model
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A Slot represents one unit of requirement that needs exactly one course.
 * Complex groups are decomposed into multiple slots before matching.
 */
interface Slot {
  /** Unique id used by the matching algorithm. */
  id:            number;
  /** Which RequirementGroup this slot belongs to (by index). */
  groupIndex:    number;
  /** Which SubGroup path produced this slot (for result attribution). */
  subGroupPath?: string;
  /** Returns true iff `code` is eligible to fill this slot. */
  eligible:      (code: string) => boolean;
  /** How many degree-credits this slot contributes when filled (default 1). */
  multiplier:    number;
  /** If true, filling this slot does NOT consume the course from the pool. */
  doubleCount:   boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Target / display helpers  (exported for Sidebar / ProgressAudit)
// ─────────────────────────────────────────────────────────────────────────────

export function groupTarget(group: RequirementGroup): number {
  if (group.subGroups?.length) {
    const subs = group.minSubGroups
      ? group.subGroups.slice(0, group.minSubGroups)
      : group.subGroups;
    return subs.reduce((acc, s) => acc + subGroupTarget(s), 0);
  }
  if (group.type === "required" && group.courses.length > 0) return group.courses.length;
  return group.minCourses ?? 1;
}

function subGroupTarget(sub: SubGroup): number {
  if (sub.type === "and" && sub.subGroups?.length) {
    return sub.subGroups.reduce((acc, s) => acc + subGroupTarget(s), 0);
  }
  if (sub.type === "or" && sub.subGroups?.length) {
    // sub.count branches must each be satisfied; each contributes min(branch_target) courses
    return sub.count * Math.min(...sub.subGroups.map(subGroupTarget));
  }
  // Non-combinator with nested subGroups (e.g. at-least with sub-paths)
  if (sub.subGroups?.length) {
    return sub.subGroups.reduce((acc, s) => acc + subGroupTarget(s), 0);
  }
  return sub.count;
}

export function groupDisplayCourses(group: RequirementGroup, claimed: Set<string>): string[] {
  let display: string[] = [];

  // 1. Gather all static "hint" courses from subgroups or the main group
  if (group.subGroups?.length) {
    display = collectSubGroupCourses(group.subGroups);
  } else if (group.courses.length > 0) {
    display = [...group.courses];
  }

  // 2. Merge in the actually claimed courses (the dynamic matches)
  // We use a Set to ensure we don't duplicate (e.g., if CS 485 was both static and claimed)
  const merged = new Set([...display, ...claimed]);

  return [...merged];
}

function collectSubGroupCourses(subs: SubGroup[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const sub of subs) {
    if (sub.requiredCourse && !seen.has(sub.requiredCourse)) {
      seen.add(sub.requiredCourse);
      out.push(sub.requiredCourse);
    }
    for (const c of sub.courses ?? []) {
      if (!seen.has(c)) { seen.add(c); out.push(c); }
    }
    if (sub.subGroups?.length) {
      for (const c of collectSubGroupCourses(sub.subGroups)) {
        if (!seen.has(c)) { seen.add(c); out.push(c); }
      }
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Branch eligibility helper (used by "or" decomposition)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns true if course `c` is eligible for the given branch subGroup,
 * recursing into nested subGroups when present.
 */
function isBranchEligible(c: string, branch: SubGroup): boolean {
  if (branch.requiredCourse && c === branch.requiredCourse) return true;
  if (branch.subGroups?.length) {
    return branch.subGroups.some((sg) => isBranchEligible(c, sg));
  }
  if (branch.courses?.includes(c)) return true;
  if (branch.rules && matchesAnyRule(c, branch.rules)) return true;
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Slot decomposition
// ─────────────────────────────────────────────────────────────────────────────

let nextSlotId = 0;

function makeSlot(
  groupIndex:  number,
  eligible:    (code: string) => boolean,
  opts: {
    multiplier?:    number;
    doubleCount?:   boolean;
    subGroupPath?:  string;
  } = {}
): Slot {
  return {
    id:            nextSlotId++,
    groupIndex,
    eligible,
    multiplier:    opts.multiplier    ?? 1,
    doubleCount:   opts.doubleCount   ?? false,
    subGroupPath:  opts.subGroupPath,
  };
}

/**
 * Decomposes a RequirementGroup into a flat list of Slots for matching.
 * Double-count slots are separated into a second list so they run after
 * the main matching pass.
 */
function decomposeGroup(
  group:       RequirementGroup,
  groupIndex:  number,
  pool:        ReadonlySet<string>,
): { normal: Slot[]; doubleCount: Slot[] } {
  const normal: Slot[] = [];
  const dc:     Slot[] = [];
  const groupDC = group.canDoubleCount ?? false;

  function addSlot(
    eligible:    (c: string) => boolean,
    doubleCount: boolean,
    multiplier = 1,
    path?:       string
  ) {
    const s = makeSlot(groupIndex, eligible, { multiplier, doubleCount, subGroupPath: path });
    if (doubleCount) dc.push(s); else normal.push(s);
  }

  function decomposeSubGroup(sub: SubGroup, parentDC: boolean, path: string): void {
    const dc = parentDC || (sub.canDoubleCount ?? false);
    const mult = sub.countMultiplier ?? 1;

    if (sub.type === "and") {
      for (let i = 0; i < (sub.subGroups?.length ?? 0); i++) {
        decomposeSubGroup(sub.subGroups![i], dc, `${path}.and[${i}]`);
      }
      return;
    }

    if (sub.type === "or") {
      const branches = sub.subGroups ?? [];
      if (branches.length === 0) return;
      // sub.count = how many branches must be satisfied
      // each branch contributes minBranchTarget courses
      const minBranchTarget = Math.min(...branches.map((b) => subGroupTarget(b)));
      const slotCount = sub.count * minBranchTarget;

      for (let i = 0; i < slotCount; i++) {
        // which "slot position" within a single branch's allocation
        const slotWithinBranch = i % minBranchTarget;
        addSlot((c) => {
          return branches.some((branch) => {
            if (slotWithinBranch >= subGroupTarget(branch)) return false;
            if (branch.requiredCourse && !pool.has(branch.requiredCourse)) return false;
            return isBranchEligible(c, branch);
          });
        }, dc, 1, `${path}.or[${i}]`);
      }
      return;
    }

    if (sub.type === "elective") {
      const rules = sub.rules ?? [];
      for (let i = 0; i < sub.count; i++) {
        addSlot((c) => matchesAnyRule(c, rules), dc, mult, `${path}.elective[${i}]`);
      }
      return;
    }

    // Leaf: at-most / at-least / exactly
    const courses = sub.courses ?? [];
    const rules   = sub.rules   ?? [];

    if (sub.requiredCourse) {
      // If the required course isn't in the pool, the whole subGroup is locked
      if (!pool.has(sub.requiredCourse)) return;
      // Dedicated slot for the required course — consumes it from the pool
      // (doubleCount follows the subGroup's own canDoubleCount, not forced true)
      const rc = sub.requiredCourse;
      addSlot((c) => c === rc, dc, mult, `${path}.required`);
      // Remaining flexible slots (exclude the required course to avoid double-claiming it)
      for (let i = 0; i < sub.count - 1; i++) {
        addSlot(
          (c) => c !== rc && (courses.includes(c) || (rules.length > 0 && matchesAnyRule(c, rules))),
          dc, mult, `${path}.leaf[${i}]`
        );
      }
      return;
    }

    for (let i = 0; i < sub.count; i++) {
      addSlot(
        (c) => courses.includes(c) || (rules.length > 0 && matchesAnyRule(c, rules)),
        dc, mult, `${path}.leaf[${i}]`
      );
    }
  }

  if (group.subGroups?.length) {
    const requiredSubs = group.minSubGroups
      ? group.subGroups.slice(0, group.minSubGroups)
      : group.subGroups;

    requiredSubs.forEach((sub, i) => {
      decomposeSubGroup(sub, groupDC, `g${groupIndex}.sub[${i}]`);
    });
    return { normal, doubleCount: dc };
  }

  // Flat course list
  if (group.courses.length > 0) {
    const target = groupTarget(group);
    for (let i = 0; i < target; i++) {
      // For "required", each course in the list gets its own dedicated slot
      if (group.type === "required") {
        const c = group.courses[i];
        addSlot((code) => code === c, groupDC, 1, `g${groupIndex}.req[${i}]`);
      } else {
        // elective / list-one-of: any course from the list
        const courses = group.courses;
        addSlot((code) => courses.includes(code), groupDC, 1, `g${groupIndex}.elec[${i}]`);
      }
    }
    return { normal, doubleCount: dc };
  }

  // Rule-only
  if (group.rules?.length) {
    const target = groupTarget(group);
    const rules = group.rules;
    for (let i = 0; i < target; i++) {
      addSlot((c) => matchesAnyRule(c, rules), groupDC, 1, `g${groupIndex}.rule[${i}]`);
    }
  }

  return { normal, doubleCount: dc };
}

// ─────────────────────────────────────────────────────────────────────────────
// Hopcroft-Karp maximum bipartite matching
// ─────────────────────────────────────────────────────────────────────────────
// Left  = courses (indexed 0..courses.length-1)
// Right = slots   (indexed 0..slots.length-1)
// Edge  = slot.eligible(course) is true

function hopcroftKarp(
  courses: string[],
  slots:   Slot[],
): {
  courseToSlot: Map<string, Slot>;  // course → slot it was matched to
  slotToCourse: Map<number, string>; // slot.id → course matched to it
} {
  const n = courses.length;
  const m = slots.length;

  // Adjacency: for each course (left node), which slot indices can it reach?
  const adj: number[][] = courses.map((c) =>
    slots.flatMap((s, si) => s.eligible(c) ? [si] : [])
  );

  const matchL = new Array<number>(n).fill(-1);  // course i matched to slot index
  const matchR = new Array<number>(m).fill(-1);  // slot j matched to course index

  const INF = Number.MAX_SAFE_INTEGER;

  // BFS to find shortest augmenting paths
  function bfs(): boolean {
    const dist = new Array<number>(n).fill(INF);
    const queue: number[] = [];
    for (let u = 0; u < n; u++) {
      if (matchL[u] === -1) { dist[u] = 0; queue.push(u); }
    }
    let found = false;
    let qi = 0;
    while (qi < queue.length) {
      const u = queue[qi++];
      for (const v of adj[u]) {
        const w = matchR[v];
        if (w === -1) {
          found = true;
        } else if (dist[w] === INF) {
          dist[w] = dist[u] + 1;
          queue.push(w);
        }
      }
    }
    // DFS along shortest paths
    function dfs(u: number): boolean {
      for (const v of adj[u]) {
        const w = matchR[v];
        if (w === -1 || (dist[w] === dist[u] + 1 && dfs(w))) {
          matchL[u] = v;
          matchR[v] = u;
          return true;
        }
      }
      dist[u] = INF;
      return false;
    }
    if (found) {
      for (let u = 0; u < n; u++) {
        if (matchL[u] === -1) dfs(u);
      }
    }
    return found;
  }

  while (bfs()) { /* repeat until no augmenting path found */ }

  // Build result maps
  const courseToSlot = new Map<string, Slot>();
  const slotToCourse = new Map<number, string>();
  for (let u = 0; u < n; u++) {
    if (matchL[u] !== -1) {
      const s = slots[matchL[u]];
      courseToSlot.set(courses[u], s);
      slotToCourse.set(s.id, courses[u]);
    }
  }
  return { courseToSlot, slotToCourse };
}


// ─────────────────────────────────────────────────────────────────────────────
// Public entry point
// ─────────────────────────────────────────────────────────────────────────────

export function runAudit(
  groups:    RequirementGroup[],
  completed: Set<string>,
  planned:   Set<string> = new Set(),
): AuditGroupResult[] {
  nextSlotId = 0; // reset between calls

  // Merge completed + planned into one pool (completed takes precedence)
  const allCourses = new Set([...completed, ...planned]);

  // 1. Decompose all groups into slots
  const normalSlotsByGroup:  Slot[][] = groups.map(() => []);
  const dcSlotsByGroup:      Slot[][] = groups.map(() => []);

  groups.forEach((group, gi) => {
    const { normal, doubleCount } = decomposeGroup(group, gi, allCourses);
    normalSlotsByGroup[gi] = normal;
    dcSlotsByGroup[gi]     = doubleCount;
  });

  const allNormal = normalSlotsByGroup.flat();
  const courses   = [...allCourses];

  // 2. Run maximum bipartite matching on normal (non-double-count) slots
  const { slotToCourse } = hopcroftKarp(courses, allNormal);

  // 3. Resolve double-count slots (can reuse already-matched courses)
  const allDC = dcSlotsByGroup.flat();
  const dcAssignments = new Map<number, string>(); // slot.id → course

  for (const slot of allDC) {
    // Prefer courses already matched elsewhere (classic double-count usage)
    const candidate = courses.find((c) => slot.eligible(c));
    if (candidate !== undefined) {
      dcAssignments.set(slot.id, candidate);
    }
  }

  // 4. Build per-group results
  return groups.map((group, gi) => {
    const claimed = new Set<string>();
    let completedDoneCount = 0;
    let plannedDoneCount   = 0;

    for (const slot of normalSlotsByGroup[gi]) {
      const c = slotToCourse.get(slot.id);
      if (c !== undefined) {
        claimed.add(c);
        if (completed.has(c)) completedDoneCount += slot.multiplier;
        else                   plannedDoneCount   += slot.multiplier;
      }
    }
    for (const slot of dcSlotsByGroup[gi]) {
      const c = dcAssignments.get(slot.id);
      if (c !== undefined) {
        claimed.add(c);
        if (completed.has(c)) completedDoneCount += slot.multiplier;
        else                   plannedDoneCount   += slot.multiplier;
      }
    }

    const plannedClaimed = new Set([...claimed].filter((c) => planned.has(c) && !completed.has(c)));

    return {
      group,
      claimedCourses:        claimed,
      plannedClaimedCourses: plannedClaimed,
      doneCount:             completedDoneCount + plannedDoneCount,
      completedDoneCount,
      plannedDoneCount,
      target:                groupTarget(group),
      displayCourses:        groupDisplayCourses(group, claimed),
    };
  });
}
