import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  CourseStatus, MajorId, SubMajorId, FacultyId, TierFilter, TermPlan, CanvasTransform,
  RequirementRule, SubGroup, RequirementGroup
} from "../types";
import { COURSE_DATA } from "../data/courses";
import { MAJORS, SUB_MAJOR_REGISTRY, DEFAULT_MAJOR_ID, MAJOR_TO_FACULTY } from "../data/majors";
import { FACULTIES, DEFAULT_FACULTY_ID } from "../data/faculties";
import { matchesAnyRule } from "./audit";
import { getAncestors, getDescendants } from "./graph";
import { areRequisitesSatisfied, getAllRequisiteCourseCodes } from "./requisites";
import { SHARE_TERMS, type ShareSnapshotV1 } from "./share";

// ── Module-level helpers ───────────────────────────────────────────────────────

/** Count explicitly listed courses per subject across a major's requirement groups. */
function topSubjectsForMajor(requirementGroups: RequirementGroup[], n: number): Set<string> | null {
  const { codes: explicitCodes } = collectRequirementInfo(requirementGroups);
  const coreSubjects = new Set<string>();
  const collectCoreSubjects = (group: RequirementGroup) => {
    if (!group.core && group.type !== "required") return;
    const { codes } = collectRequirementInfo([group]);
    codes.forEach((code) => coreSubjects.add(courseSubject(code)));
  };
  requirementGroups.forEach(collectCoreSubjects);

  const counts: Record<string, number> = {};
  const tally = (code: string) => {
    const subj = courseSubject(code);
    counts[subj] = (counts[subj] ?? 0) + 1;
  };
  explicitCodes.forEach(tally);

  const top = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([s]) => s);
  top.forEach((subject) => coreSubjects.add(subject));
  return coreSubjects.size > 0 ? coreSubjects : null;
}

function toSet<T = string>(value: unknown): Set<T> {
  if (value instanceof Set) return value;
  if (Array.isArray(value)) return new Set<T>(value as T[]);
  return new Set<T>();
}

export function courseSubject(code: string): string {
  return code.split(" ")[0];
}

export function subjectsFromCodes(codes: string[]): string[] {
  return [...new Set(codes.map(courseSubject))].sort();
}

export function courseLevel(code: string): number {
  const num = parseInt(code.split(" ")[1] ?? "0", 10);
  return Math.floor(num / 100) * 100;
}

export function levelsFromCodes(codes: string[]): number[] {
  return [...new Set(codes.map(courseLevel))].filter(l => l <= 400).sort((a, b) => a - b);
}

function collectRequirementInfo(requirementGroups: RequirementGroup[]) {
  const codes = new Set<string>();
  const rules: RequirementRule[] = [];
  const subjects = new Set<string>();

  const addCode = (code: string) => {
    codes.add(code);
    subjects.add(courseSubject(code));
  };

  const scanSubGroup = (sub: SubGroup) => {
    if (sub.requiredCourse) addCode(sub.requiredCourse);
    sub.courses?.forEach(addCode);
    sub.rules?.forEach((rule) => {
      rules.push(rule);
      rule.prefixes?.forEach((prefix) => subjects.add(prefix));
    });
    sub.subGroups?.forEach(scanSubGroup);
  };

  requirementGroups.forEach((group) => {
    group.courses?.forEach(addCode);
    group.rules?.forEach((rule) => {
      rules.push(rule);
      rule.prefixes?.forEach((prefix) => subjects.add(prefix));
    });
    group.subGroups?.forEach(scanSubGroup);
  });

  return { codes, rules, subjects };
}

function buildExploreCourseSet(exploreCodes: string[]): Set<string> {
  const result = new Set<string>(exploreCodes);

  for (const code of exploreCodes) {
    getAncestors(code).forEach((c) => { if (COURSE_DATA[c]) result.add(c); });
    getDescendants(code).forEach((c) => { if (COURSE_DATA[c]) result.add(c); });
  }

  return result;
}

function keepConnectedExploreCourses(codes: string[], pinnedCodes: Set<string>): string[] {
  const visible = new Set(codes);
  const adjacency = new Map<string, Set<string>>();

  const connect = (a: string, b: string) => {
    if (!adjacency.has(a)) adjacency.set(a, new Set());
    if (!adjacency.has(b)) adjacency.set(b, new Set());
    adjacency.get(a)!.add(b);
    adjacency.get(b)!.add(a);
  };

  for (const code of visible) {
    const course = COURSE_DATA[code];
    if (!course) continue;

    for (const prereq of getAllRequisiteCourseCodes(course.prereqs)) {
      if (visible.has(prereq)) connect(code, prereq);
    }
  }

  const connected = new Set<string>();
  const queue = Array.from(pinnedCodes).filter((code) => visible.has(code));

  while (queue.length > 0) {
    const code = queue.shift()!;
    if (connected.has(code)) continue;
    connected.add(code);
    adjacency.get(code)?.forEach((next) => {
      if (!connected.has(next)) queue.push(next);
    });
  }

  return codes.filter((code) => connected.has(code));
}

export const MAJOR_ID_MAP_INV: Record<string, string> = {
  "computer-science":                  "cs",
  "software-engineering":              "se",
  "data-science":                      "ds",
  "mathematics":                       "math",
  "statistics":                        "stat",
  "combinatorics-and-optimization":     "co",
  "actuarial-science":                 "actsc",
  "applied-mathematics":               "amath",
  "pure-mathematics":                  "pmath",
};

export const FACULTY_ID_MAP: Record<string, string> = {
  "mathematics": "math",
  "arts":        "arts",
  "engineering": "eng",
  "science":     "sci",
  "environment": "env",
  "health":      "hea",
};

// ── Persisted slice ───────────────────────────────────────────────────────────

interface PersistedSlice {
  activeFacultyId:       FacultyId;
  activeMajorId:         MajorId;
  activeSubMajorId:      SubMajorId | null;
  activeSubjects:        Set<string> | null;
  exploreActiveSubjects: Set<string> | null;
  activeLevels:          Set<number> | null;
  exploreActiveLevels:   Set<number> | null;
  completedCourses:      Set<string>;
  plannedCourses:        Set<string>;
  termPlan:              TermPlan;
  termPlanEditedByUser:  boolean;
  theme:                 "dark" | "light";
  tierFilter:            TierFilter;
}

// ── Full state shape ──────────────────────────────────────────────────────────

interface GradGraphState extends PersistedSlice {
  // ── Ephemeral UI ─────────────────────────────────────────────────────────────
  selectedNode:      string | null;
  highlightedNodes:  Set<string>;
  highlightedEdges:  Set<string>;
  activeTab:         "graph" | "planner" | "progress" | "chat" | "help" | "explore";
  searchOpen:        boolean;
  transform:         CanvasTransform;
  antireqWarning:    string | null;

  /** Show only completed/planned courses + their prerequisites on the graph. */
  showMyCourses: boolean;
  /** When non-null, GraphCanvas will pan to center on this course code. */
  panToNode:     string | null;

  /** Explore mode: browse any course from the full catalog (not just active major). */
  exploreMode:          boolean;
  /** Up to 5 course codes pinned in explore mode. */
  exploreCodes:         string[];
  /** True when user tries to add a 6th explore course — shows overflow popup. */
  exploreOverflowPopup: boolean;

  // ── Actions ───────────────────────────────────────────────────────────────────
  setActiveFaculty:        (id: FacultyId) => void;
  setActiveMajor:          (id: MajorId) => void;
  resetTermPlan:           () => void;
  setActiveSubMajor:       (id: SubMajorId | null) => void;
  toggleCompleted:         (code: string) => void;
  togglePlanned:           (code: string) => void;
  setSelectedNode:         (code: string | null) => void;
  setHighlight:            (nodes: Set<string>, edges: Set<string>) => void;
  clearSelection:          () => void;
  setActiveTab:            (tab: "graph" | "planner" | "progress" | "chat" | "help" | "explore") => void;
  toggleTheme:             () => void;
  setSearchOpen:           (open: boolean) => void;
  setTransform:            (t: CanvasTransform | ((prev: CanvasTransform) => CanvasTransform)) => void;
  moveCourseToTerm:        (code: string, term: string) => void;
  toggleSubject:           (subject: string) => void;
  isolateSubject:          (subject: string) => void;
  clearSubjectFilter:      () => void;
  toggleLevel:             (level: number) => void;
  clearLevelFilter:        () => void;
  setTierFilter:           (tier: TierFilter) => void;
  toggleMyCourses:         () => void;
  setPanToNode:            (code: string | null) => void;
  toggleExploreMode:       () => void;
  addExploreCode:          (code: string) => void;
  removeExploreCode:       (code: string) => void;
  setExploreOverflowPopup: (show: boolean) => void;
  applyShareSnapshot:      (snapshot: ShareSnapshotV1) => void;

  // ── Derived queries ───────────────────────────────────────────────────────────
  getTermPlannedCourses: () => Set<string>;
  getMajorCourses:    () => string[];
  getFilteredCourses: () => string[];
  getCourseStatus:    (code: string) => CourseStatus;
  checkAntireqs:      () => void;
  isCourseInCurriculum: (code: string) => boolean;
}

// ── Custom storage ────────────────────────────────────────────────────────────

const setAwareStorage = createJSONStorage<PersistedSlice>(() => localStorage, {
  replacer: (_key, value) => (value instanceof Set ? [...value] : value),
  reviver:  (key, value) => {
    if ((key === "completedCourses" || key === "plannedCourses") && Array.isArray(value)) {
      return new Set<string>(value as string[]);
    }
    return value;
  },
});

// ── Store ─────────────────────────────────────────────────────────────────────

export const useStore = create<GradGraphState>()(
  persist<GradGraphState, [], [], PersistedSlice>(
    (set, get) => ({
      // ── Persisted ─────────────────────────────────────────────────────────────
      activeFacultyId:  DEFAULT_FACULTY_ID,
      activeMajorId:    DEFAULT_MAJOR_ID,
      activeSubMajorId: (Object.keys(SUB_MAJOR_REGISTRY[DEFAULT_MAJOR_ID] ?? {})[0] as SubMajorId) ?? null,
      activeSubjects:   topSubjectsForMajor(MAJORS[DEFAULT_MAJOR_ID]?.requirementGroups ?? [], 5),
      exploreActiveSubjects: topSubjectsForMajor(MAJORS[DEFAULT_MAJOR_ID]?.requirementGroups ?? [], 5),
      activeLevels:     new Set([100, 200, 300, 400]),
      exploreActiveLevels: new Set([100, 200, 300, 400]),
      completedCourses: new Set([]),
      plannedCourses:   new Set([]),
      termPlan:              { "1A": [], "1B": [], "2A": [], "2B": [], "3A": [], "3B": [], "4A": [], "4B": [] },
      termPlanEditedByUser:  false,
      theme:                 "dark",
      tierFilter:            "all",

      // ── Ephemeral ─────────────────────────────────────────────────────────────
      selectedNode:     null,
      highlightedNodes: new Set(),
      highlightedEdges: new Set(),
      activeTab:        "graph",
      searchOpen:       false,
      transform:        { x: 0, y: 0, scale: 1 },
      antireqWarning:   null,
      showMyCourses:    false,
      panToNode:        null,
      exploreMode:          false,
      exploreCodes:         [],
      exploreOverflowPopup: false,

      // ── Actions ───────────────────────────────────────────────────────────────

      setActiveFaculty: (id) => {
        const faculty = FACULTIES[id];
        if (!faculty) return;
        const firstMajorId  = (faculty.majorIds[0] as MajorId) ?? DEFAULT_MAJOR_ID;
        const subMap        = SUB_MAJOR_REGISTRY[firstMajorId];
        const firstSubId    = subMap ? (Object.keys(subMap)[0] as SubMajorId) : null;
        const activeMajor   = (subMap && firstSubId ? subMap[firstSubId] : MAJORS[firstMajorId]);
        set({
          activeFacultyId:  id,
          activeMajorId:    firstMajorId,
          activeSubMajorId: firstSubId,
          selectedNode:     null,
          highlightedNodes: new Set(),
          highlightedEdges: new Set(),
          transform:        { x: 0, y: 0, scale: 1 },
          activeSubjects:   topSubjectsForMajor(activeMajor?.requirementGroups ?? [], 5),
          activeLevels:     new Set([100, 200, 300, 400]),
          tierFilter:       "all",
          showMyCourses:    false,
          panToNode:        null,
        });
      },

      setActiveMajor: (id) => {
        const major      = MAJORS[id];
        if (!major) return;
        const subMap     = SUB_MAJOR_REGISTRY[id];
        const firstSubId = subMap ? (Object.keys(subMap)[0] as SubMajorId) : null;
        const activeMajor = (subMap && firstSubId ? subMap[firstSubId] : major);
        set({
          activeFacultyId:  MAJOR_TO_FACULTY[id] ?? DEFAULT_FACULTY_ID,
          activeMajorId:    id,
          activeSubMajorId: firstSubId,
          selectedNode:     null,
          highlightedNodes: new Set(),
          highlightedEdges: new Set(),
          transform:        { x: 0, y: 0, scale: 1 },
          activeSubjects:   topSubjectsForMajor(activeMajor.requirementGroups, 5),
          activeLevels:     new Set([100, 200, 300, 400]),
          tierFilter:       "all",
          showMyCourses:    false,
          panToNode:        null,
        });
      },

      resetTermPlan: () => {
        const { activeMajorId, activeSubMajorId } = get();
        const subMajorMap = SUB_MAJOR_REGISTRY[activeMajorId];

        const major = (subMajorMap && activeSubMajorId && subMajorMap[activeSubMajorId])
          ? subMajorMap[activeSubMajorId]
          : (MAJORS[activeMajorId]);
        if (!major) return;
        set({ termPlan: major.defaultTermPlan as TermPlan, termPlanEditedByUser: false });
      },

      setActiveSubMajor: (id) => {
        const { activeMajorId } = get();
        const subMajorMap = SUB_MAJOR_REGISTRY[activeMajorId];
        const resolved = (id && subMajorMap?.[id]) ?? MAJORS[activeMajorId];
        set({
          activeSubMajorId: id,
          selectedNode:     null,
          highlightedNodes: new Set(),
          highlightedEdges: new Set(),
          activeSubjects:   resolved ? topSubjectsForMajor(resolved.requirementGroups, 5) : null,
          activeLevels:     new Set([100, 200, 300, 400]),
        });
      },

      toggleCompleted: (code) => {
        set((state) => {
          const next = new Set(toSet(state.completedCourses));
          if (next.has(code)) next.delete(code);
          else next.add(code);
          return { completedCourses: next };
        });
        get().checkAntireqs();
      },

      togglePlanned: (code) => {
        set((state) => {
          const next = new Set(toSet(state.plannedCourses));
          if (next.has(code)) next.delete(code);
          else next.add(code);
          return { plannedCourses: next };
        });
        get().checkAntireqs();
      },

      setSelectedNode:  (code)         => set({ selectedNode: code }),
      setHighlight:     (nodes, edges) => set({ highlightedNodes: nodes, highlightedEdges: edges }),
      clearSelection:   ()             => set({ selectedNode: null, highlightedNodes: new Set(), highlightedEdges: new Set() }),
      setActiveTab: (tab) => set((state) => {
        if (state.activeTab === tab) return {};
        return {
          activeTab:   tab,
          exploreMode: tab === "explore",
          ...(tab !== "explore" ? { exploreOverflowPopup: false } : {}),
          // Recenter graph when switching TO it from another tab
          ...(tab === "graph" ? { 
            transform: { x: 0, y: 0, scale: 1 },
            panToNode: null 
          } : {}),
        };
      }),
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      setSearchOpen:    (open)         => set({ searchOpen: open }),

      setTransform: (t) =>
        set((state) => ({
          transform: typeof t === "function" ? t(state.transform) : t,
        })),

      moveCourseToTerm: (code, term) => {
        set((state) => {
          const next = {} as TermPlan;
          for (const [t, cs] of Object.entries(state.termPlan) as [keyof TermPlan, string[]][]) {
            next[t] = cs.filter((c) => c !== code);
          }
          const key = term as keyof TermPlan;
          if (key in next) next[key] = [...next[key], code];
          return { termPlan: next, termPlanEditedByUser: true };
        });
        get().checkAntireqs();
      },

      // ── Subject filter ─────────────────────────────────────────────────────

      toggleSubject: (subject) =>
        set((state) => {
          const majorCodes  = get().getMajorCourses();
          const allSubjects = subjectsFromCodes(majorCodes);
          const isExplore   = state.exploreMode;
          const currentSet  = isExplore ? state.exploreActiveSubjects : state.activeSubjects;
          
          let nextArr = currentSet ? Array.from(currentSet) : allSubjects.slice(0, 5);
          const isAdding = !nextArr.includes(subject);
          
          if (isAdding) {
            if (nextArr.length >= 5) nextArr.shift();
            nextArr.push(subject);
          } else {
            if (nextArr.length <= 1) return {};
            nextArr = nextArr.filter(s => s !== subject);
          }
          
          const nextSet = new Set(nextArr);
          return isExplore ? { exploreActiveSubjects: nextSet } : { activeSubjects: nextSet };
        }),

      isolateSubject: (subject) => 
        set((state) => state.exploreMode 
          ? { exploreActiveSubjects: new Set([subject]) } 
          : { activeSubjects: new Set([subject]) }),

      clearSubjectFilter: () => {
        const majorCodes = get().getMajorCourses();
        const subjects = subjectsFromCodes(majorCodes);
        const setVal = new Set(subjects.slice(0, 5));
        set((state) => state.exploreMode 
          ? { exploreActiveSubjects: setVal } 
          : { activeSubjects: setVal });
      },

      toggleLevel: (level) =>
        set((state) => {
          const isExplore  = state.exploreMode;
          const sourceCodes = isExplore
            ? Array.from(buildExploreCourseSet(state.exploreCodes))
            : get().getMajorCourses();
          const allLevels  = new Set(levelsFromCodes(sourceCodes));
          const current    = (isExplore ? state.exploreActiveLevels : state.activeLevels) ?? allLevels;
          const next       = new Set(current);
          
          if (next.has(level)) next.delete(level);
          else next.add(level);
          
          // Reset to "all" (null) only when everything is selected
          const allSelected = [...allLevels].every((l) => next.has(l));
          const nextSet = allSelected ? null : next;
          
          return isExplore ? { exploreActiveLevels: nextSet } : { activeLevels: nextSet };
        }),

      clearLevelFilter: () => 
        set((state) => state.exploreMode ? { exploreActiveLevels: null } : { activeLevels: null }),

      setTierFilter:      (tier)    => set({ tierFilter: tier }),
      toggleMyCourses:    ()        => set((state) => ({ showMyCourses: !state.showMyCourses })),
      setPanToNode:       (code)    => set({ panToNode: code }),

      toggleExploreMode: () =>
        set((state) => ({
          exploreMode:          !state.exploreMode,
          exploreCodes:         [],
          exploreOverflowPopup: false,
          selectedNode:         null,
          highlightedNodes:     new Set(),
          highlightedEdges:     new Set(),
        })),

      addExploreCode: (code) =>
        set((state) => {
          if (state.exploreCodes.includes(code)) return {};
          if (state.exploreCodes.length >= 5) return { exploreOverflowPopup: true };
          return { exploreCodes: [...state.exploreCodes, code] };
        }),

      removeExploreCode: (code) =>
        set((state) => ({ exploreCodes: state.exploreCodes.filter((c) => c !== code) })),

      setExploreOverflowPopup: (show) => set({ exploreOverflowPopup: show }),

      applyShareSnapshot: (snapshot) => {
        const activeMajorId = MAJORS[snapshot.activeMajorId] ? snapshot.activeMajorId : DEFAULT_MAJOR_ID;
        const subMap = SUB_MAJOR_REGISTRY[activeMajorId];
        const activeSubMajorId = subMap
          ? (snapshot.activeSubMajorId && subMap[snapshot.activeSubMajorId]
            ? snapshot.activeSubMajorId
            : (Object.keys(subMap)[0] as SubMajorId) ?? null)
          : null;

        const activeMajor = activeSubMajorId && subMap
          ? subMap[activeSubMajorId]
          : MAJORS[activeMajorId];
        const activeFacultyId = MAJOR_TO_FACULTY[activeMajorId] ?? (
          FACULTIES[snapshot.activeFacultyId] ? snapshot.activeFacultyId : DEFAULT_FACULTY_ID
        );

        const validCourseCodes = new Set(Object.keys(COURSE_DATA));
        const uniqueValidCourses = (codes: string[]) => [...new Set(codes)].filter((code) => validCourseCodes.has(code));
        const completedCourses = new Set(uniqueValidCourses(snapshot.completedCourses));
        const plannedCourses = new Set(uniqueValidCourses(snapshot.plannedCourses).filter((code) => !completedCourses.has(code)));
        const termPlan = {} as TermPlan;

        for (const term of SHARE_TERMS) {
          termPlan[term] = uniqueValidCourses(Array.isArray(snapshot.termPlan[term]) ? snapshot.termPlan[term] : []);
        }

        set({
          activeFacultyId,
          activeMajorId,
          activeSubMajorId,
          activeSubjects: topSubjectsForMajor(activeMajor?.requirementGroups ?? [], 5),
          exploreActiveSubjects: topSubjectsForMajor(activeMajor?.requirementGroups ?? [], 5),
          completedCourses,
          plannedCourses,
          termPlan,
          termPlanEditedByUser: snapshot.termPlanEditedByUser || Object.values(termPlan).some((courses) => courses.length > 0),
          activeTab: "planner",
          selectedNode: null,
          highlightedNodes: new Set(),
          highlightedEdges: new Set(),
          antireqWarning: null,
        });

        get().checkAntireqs();
      },

      // ── Derived queries ────────────────────────────────────────────────────

      /** Returns the flat set of all course codes placed in any term bucket. */
      getTermPlannedCourses: (): Set<string> => {
        const { termPlan } = get();
        return new Set(Object.values(termPlan).flat());
      },

      getMajorCourses: (): string[] => {
        const { activeMajorId, activeSubMajorId, activeTab } = get();

        // 1. Resolve Major
        const subMajorMap = SUB_MAJOR_REGISTRY[activeMajorId];

        const major = (subMajorMap && activeSubMajorId && subMajorMap[activeSubMajorId])
          ? subMajorMap[activeSubMajorId]
          : (MAJORS[activeMajorId]);

        if (!major) return Object.keys(COURSE_DATA);

        const codes = new Set<string>();

        // 2. Updated Eligibility Helper
        // Separating "Major Restrictiveness" from "Requirement Satisfaction"
        const satisfiesMajorRestrictions = (code: string) => {
          const course = COURSE_DATA[code];
          if (!course) return false;

          const majorShortId   = MAJOR_ID_MAP_INV[activeMajorId];
          const subMajorShortId = activeSubMajorId ? (MAJOR_ID_MAP_INV[activeSubMajorId] || activeSubMajorId) : null;
          const facultyShortId = FACULTY_ID_MAP[major.faculty];

          // 1. Block explicit exclusions
          const exclusions = course.exclMajors || [];
          if (exclusions.includes(activeMajorId)) return false;
          if (majorShortId && exclusions.includes(majorShortId)) return false;
          if (facultyShortId && exclusions.includes(facultyShortId)) return false;
          if (activeSubMajorId && exclusions.includes(activeSubMajorId)) return false;
          if (subMajorShortId && exclusions.includes(subMajorShortId)) return false;

          // 2. Check Whitelist
          const whitelist = course.majors || [];
          const isAllowed = 
            whitelist.includes("any") || 
            whitelist.includes(activeMajorId) || 
            (majorShortId && whitelist.includes(majorShortId)) ||
            (facultyShortId && whitelist.includes(facultyShortId)) ||
            (activeSubMajorId && whitelist.includes(activeSubMajorId)) ||
            (subMajorShortId && whitelist.includes(subMajorShortId));

          return isAllowed;
        };

        // 3. STEP 1: Mine Explicit Course Lists & Rule Subjects
        const allGroups = major.requirementGroups || [];
        const requirementInfo = collectRequirementInfo(allGroups);
        const explicitRequirementCodes = new Set(requirementInfo.codes);
        requirementInfo.codes.forEach((code) => codes.add(code));

        // 4. STEP 2: Expand to ALL courses from every mentioned subject.
        // If any course from a subject appears explicitly in the curriculum,
        // the entire subject is relevant (e.g. all CS courses belong in CS major).
        // Only hard-block on explicit exclMajors — not the whitelist, which can
        // be wrong due to parser bugs in the refresh script.
        const mentionedSubjects = new Set(Array.from(codes).map(c => c.split(" ")[0]));
        requirementInfo.subjects.forEach(s => mentionedSubjects.add(s));

        Object.keys(COURSE_DATA).forEach(courseCode => {
          if (!mentionedSubjects.has(courseCode.split(" ")[0])) return;
          const course = COURSE_DATA[courseCode];
          if (course && satisfiesMajorRestrictions(courseCode)) {
            codes.add(courseCode);
          }
        });

        // The planner is a forward-looking workspace, so include every course
        // this program/faculty can plausibly take, not only requirement subjects.
        if (activeTab === "planner") {
          Object.keys(COURSE_DATA).forEach((courseCode) => {
            if (satisfiesMajorRestrictions(courseCode)) codes.add(courseCode);
          });
        }

        // 5. STEP 3: Mine Rules (e.g. "any STAT 400+" elective buckets).
        // In graph view, restrict to mentioned subjects only to avoid EARTH/ECON noise.
        const allMajorRules = requirementInfo.rules;

        Object.keys(COURSE_DATA).forEach(courseCode => {
          if (matchesAnyRule(courseCode, allMajorRules) && satisfiesMajorRestrictions(courseCode)) {
            if (activeTab !== "graph" || mentionedSubjects.has(courseCode.split(" ")[0])) {
              codes.add(courseCode);
            }
          }
        });

        // 6. STEP 4: BFS Prerequisite Expansion
        // Ensure we show the paths to get to these required courses
        const queue = Array.from(codes);
        const processed = new Set<string>();

        while (queue.length > 0) {
          const code = queue.shift()!;
          if (processed.has(code)) continue;
          processed.add(code);

          const course = COURSE_DATA[code];
          if (!course || !course.prereqs) continue;

          // Flatten nested prereqs (using your existing logic)
          const deps = getAllRequisiteCourseCodes(course.prereqs);

          deps.forEach(dep => {
            if (COURSE_DATA[dep] && satisfiesMajorRestrictions(dep)) {
              if (!codes.has(dep)) {
                codes.add(dep);
                queue.push(dep);
              }
            }
          });
        }

        // 7. STEP 5: Pruning Unreachable Courses
        // If a course requires prerequisites that aren't allowed for this major,
        // it's unreachable and should be removed.
        let changed = true;
        while (activeTab !== "planner" && changed) {
          changed = false;
          for (const code of codes) {
            if (explicitRequirementCodes.has(code)) continue;
            const course = COURSE_DATA[code];
            if (!course || !course.prereqs || course.prereqs.length === 0) continue;
            
            // A course is unreachable if its prerequisite tree cannot be satisfied 
            // by the remaining set of allowed courses.
            if (!areRequisitesSatisfied(course.prereqs, codes)) {
              codes.delete(code);
              changed = true;
            }
          }
        }

        return Array.from(codes);
      },

      isCourseInCurriculum: (code: string): boolean => {
        const { activeMajorId, activeSubMajorId } = get();
        const subMajorMap = SUB_MAJOR_REGISTRY[activeMajorId];

        // Mirror the same fallback logic as ProgressAudit's resolveActiveCurriculum
        let major;
        if (subMajorMap) {
          const sub = activeSubMajorId ? subMajorMap[activeSubMajorId] : null;
          const defaultSub = activeMajorId === "math"
            ? subMajorMap["stat"]
            : Object.values(subMajorMap)[0];
          major = sub ?? defaultSub;
        } else {
          major = MAJORS[activeMajorId as keyof typeof MAJORS] ?? null;
        }

        if (!major) return false;

        const scan = (sub: SubGroup): boolean => {
          if (sub.requiredCourse === code) return true;
          if (sub.courses?.includes(code)) return true;
          return sub.subGroups?.some(scan) ?? false;
        };

        return major.requirementGroups.some((group: RequirementGroup) => {
          if (group.courses?.includes(code)) return true;
          return group.subGroups?.some(scan) ?? false;
        });
      },

      getFilteredCourses: (): string[] => {
        const { activeMajorId, activeSubMajorId, activeSubjects, activeLevels, exploreActiveLevels, tierFilter, showMyCourses, exploreMode, exploreCodes } = get();

        // Explore mode: show pinned courses + everything before and after them.
        if (exploreMode) {
          if (exploreCodes.length === 0) return [];
          const result = buildExploreCourseSet(exploreCodes);
          const pinnedCodes = new Set(exploreCodes);

          let filtered = Array.from(result);

          // Apply filters in explore mode, but keep pinned courses visible.
          if (exploreActiveLevels !== null && exploreActiveLevels.size > 0) {
            filtered = filtered.filter(c => {
              if (pinnedCodes.has(c)) return true;
              return exploreActiveLevels.has(courseLevel(c));
            });
          }
          return keepConnectedExploreCourses(filtered, pinnedCodes);
        }

        const subMajorMap = SUB_MAJOR_REGISTRY[activeMajorId];

        const major = (subMajorMap && activeSubMajorId && subMajorMap[activeSubMajorId])
          ? subMajorMap[activeSubMajorId]
          : (MAJORS[activeMajorId]);

        let codes = get().getMajorCourses();

        if (tierFilter !== "all" && major) {
          const tierSet = new Set<string>();
          for (const group of major.requirementGroups) {
            const isRequired = group.type === "required";
            if (tierFilter === "required") {
              if (isRequired) group.courses.forEach((c: string) => tierSet.add(c));
            } else if (tierFilter === "standard") {
              if (isRequired && (group.tier === "standard" || group.tier === undefined)) {
                group.courses.forEach((c: string) => tierSet.add(c));
              }
            } else if (tierFilter === "advanced") {
              if (isRequired && (group.tier === "advanced" || group.tier === undefined)) {
                group.courses.forEach((c: string) => tierSet.add(c));
              }
            }
          }
          codes = codes.filter((c) => tierSet.has(c));
        }

        if (activeSubjects !== null) {
          const explicitRequirementCodes = major
            ? collectRequirementInfo(major.requirementGroups).codes
            : new Set<string>();
          codes = codes.filter((c) => activeSubjects.has(courseSubject(c)) || explicitRequirementCodes.has(c));
        }

        if (activeLevels !== null) {
          codes = codes.filter((c) => activeLevels.has(courseLevel(c)));
        }

        // "My Plan" filter: narrow to completed/planned courses + their prerequisites
        if (showMyCourses) {
          const { completedCourses, plannedCourses } = get();
          const termPlanned = get().getTermPlannedCourses();
          const base = new Set([...completedCourses, ...plannedCourses, ...termPlanned]);

          const expanded = new Set(base);
          const queue = [...base];
          while (queue.length > 0) {
            const c = queue.shift()!;
            const course = COURSE_DATA[c];
            if (!course) continue;
            const deps = getAllRequisiteCourseCodes(course.prereqs);
            for (const dep of deps) {
              if (!expanded.has(dep) && COURSE_DATA[dep]) {
                expanded.add(dep);
                queue.push(dep);
              }
            }
          }
          codes = codes.filter((c) => expanded.has(c));
        }

        return codes;
      },

      getCourseStatus: (code): CourseStatus => {
        const completedCourses  = toSet(get().completedCourses);
        const plannedCourses    = toSet(get().plannedCourses);
        const termPlannedCourses = get().getTermPlannedCourses();

        if (completedCourses.has(code))   return "completed";
        // A course is "planned" if it's in the explicit planned set OR in any term bucket
        if (plannedCourses.has(code) || termPlannedCourses.has(code)) return "planned";

        const course = COURSE_DATA[code];
        if (!course || course.prereqs.length === 0) return "available";

        const unlocked = areRequisitesSatisfied(course.prereqs, completedCourses);
        return unlocked ? "available" : "locked";
      },

      checkAntireqs: () => {
        const completedCourses = toSet(get().completedCourses);
        const plannedCourses   = toSet(get().plannedCourses);
        const termPlanned      = new Set(Object.values(get().termPlan).flat());
        const all = new Set([...completedCourses, ...plannedCourses, ...termPlanned]);

        for (const code of all) {
          const course = COURSE_DATA[code];
          if (!course) continue;
          for (const anti of course.antireqs) {
            if (all.has(anti)) {
              set({ antireqWarning: `⚠️ Antirequisite conflict: ${code} and ${anti} cannot both be taken.` });
              return;
            }
          }
        }
        set({ antireqWarning: null });
      },
    }),
    {
      name:          "gradgraph-storage",
      storage:       setAwareStorage,
      skipHydration: true,

      partialize: (state): PersistedSlice => ({
        activeFacultyId:       state.activeFacultyId,
        activeMajorId:         state.activeMajorId,
        activeSubMajorId:      state.activeSubMajorId,
        activeSubjects:        state.activeSubjects,
        exploreActiveSubjects: state.exploreActiveSubjects,
        activeLevels:          state.activeLevels,
        exploreActiveLevels:   state.exploreActiveLevels,
        completedCourses:      state.completedCourses,
        plannedCourses:        state.plannedCourses,
        termPlan:              state.termPlan,
        termPlanEditedByUser:  state.termPlanEditedByUser,
        theme:                 state.theme,
        tierFilter:            state.tierFilter,
      }),

      onRehydrateStorage: () => (rehydrated) => {
        if (!rehydrated) return;
        rehydrated.completedCourses = toSet(rehydrated.completedCourses);
        rehydrated.plannedCourses   = toSet(rehydrated.plannedCourses);
        rehydrated.activeSubjects   = toSet(rehydrated.activeSubjects);
        rehydrated.exploreActiveSubjects = toSet(rehydrated.exploreActiveSubjects);
        rehydrated.activeLevels = toSet<number>(rehydrated.activeLevels);
        rehydrated.exploreActiveLevels = toSet<number>(rehydrated.exploreActiveLevels);

        // Reset stale major IDs from previous data shape
        if (!MAJORS[rehydrated.activeMajorId]) {
          rehydrated.activeMajorId = DEFAULT_MAJOR_ID;
        }
        // Auto-select first sub-major for majors that require one
        const subMap = SUB_MAJOR_REGISTRY[rehydrated.activeMajorId];
        if (subMap) {
          const firstSubId = Object.keys(subMap)[0] as SubMajorId ?? null;
          if (!rehydrated.activeSubMajorId || !subMap[rehydrated.activeSubMajorId]) {
            rehydrated.activeSubMajorId = firstSubId;
          }
        }
      },
    }
  )
);
