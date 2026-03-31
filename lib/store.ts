import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { 
  CourseStatus, MajorId, SubMajorId, TierFilter, TermPlan, CanvasTransform, 
  RequirementRule, SubGroup, RequirementGroup 
} from "../types";
import { COURSE_DATA } from "../data/courses";
import { MAJORS, SUB_MAJOR_REGISTRY, DEFAULT_MAJOR_ID } from "../data/majors";
import { matchesAnyRule } from "./audit";

// ── Module-level helpers ───────────────────────────────────────────────────────

function toSet(value: unknown): Set<string> {
  if (value instanceof Set) return value;
  if (Array.isArray(value)) return new Set<string>(value);
  return new Set<string>();
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
  return [...new Set(codes.map(courseLevel))].sort((a, b) => a - b);
}

// ── Persisted slice ───────────────────────────────────────────────────────────

interface PersistedSlice {
  activeMajorId:         MajorId;
  completedCourses:      Set<string>;
  plannedCourses:        Set<string>;
  termPlan:              TermPlan;
  /** True once the user has manually edited the term plan (drag/drop).
   *  When true, switching majors no longer resets the term plan. */
  termPlanEditedByUser:  boolean;
  theme:                 "dark" | "light";
}

// ── Full state shape ──────────────────────────────────────────────────────────

interface GradGraphState extends PersistedSlice {
  // ── Ephemeral UI ─────────────────────────────────────────────────────────────
  selectedNode:      string | null;
  highlightedNodes:  Set<string>;
  highlightedEdges:  Set<string>;
  activeTab:         "graph" | "planner" | "progress" | "chat" | "help";
  searchOpen:        boolean;
  transform:         CanvasTransform;
  antireqWarning:    string | null;
  activeSubjects:    Set<string> | null;
  activeLevels:      Set<number> | null;
  tierFilter:        TierFilter;

  /**
   * The currently selected sub-major (e.g. "stat", "co").
   * Only meaningful when activeMajorId === "math".
   * null means no sub-major is selected (show the base Math major).
   * Ephemeral — resets to null when the active major changes.
   */
  activeSubMajorId:  SubMajorId | null;

  /** Show only completed/planned courses + their prerequisites on the graph. */
  showMyCourses: boolean;
  /** When non-null, GraphCanvas will pan to center on this course code. */
  panToNode:     string | null;

  // ── Actions ───────────────────────────────────────────────────────────────────
  setActiveMajor:     (id: MajorId) => void;
  resetTermPlan:      () => void;
  setActiveSubMajor:  (id: SubMajorId | null) => void;
  toggleCompleted:    (code: string) => void;
  togglePlanned:      (code: string) => void;
  setSelectedNode:    (code: string | null) => void;
  setHighlight:       (nodes: Set<string>, edges: Set<string>) => void;
  clearSelection:     () => void;
  setActiveTab:       (tab: "graph" | "planner" | "progress" | "chat" | "help") => void;
  toggleTheme:        () => void;
  setSearchOpen:      (open: boolean) => void;
  setTransform:       (t: CanvasTransform | ((prev: CanvasTransform) => CanvasTransform)) => void;
  moveCourseToTerm:   (code: string, term: string) => void;
  toggleSubject:      (subject: string) => void;
  isolateSubject:     (subject: string) => void;
  clearSubjectFilter: () => void;
  toggleLevel:        (level: number) => void;
  clearLevelFilter:   () => void;
  setTierFilter:      (tier: TierFilter) => void;
  toggleMyCourses:    () => void;
  setPanToNode:       (code: string | null) => void;

  // ── Derived queries ───────────────────────────────────────────────────────────
  getTermPlannedCourses: () => Set<string>;
  getMajorCourses:    () => string[];
  getFilteredCourses: () => string[];
  getCourseStatus:    (code: string) => CourseStatus;
  checkAntireqs:      () => void;
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

const initialMajor = MAJORS[DEFAULT_MAJOR_ID];

// ── Store ─────────────────────────────────────────────────────────────────────

export const useStore = create<GradGraphState>()(
  persist<GradGraphState, [], [], PersistedSlice>(
    (set, get) => ({
      // ── Persisted ─────────────────────────────────────────────────────────────
      activeMajorId:    DEFAULT_MAJOR_ID,
      completedCourses: new Set([]),
      plannedCourses:   new Set([]),
      termPlan:              { "1A": [], "1B": [], "2A": [], "2B": [], "3A": [], "3B": [], "4A": [], "4B": [] },
      termPlanEditedByUser:  false,
      theme:                 "dark",

      // ── Ephemeral ─────────────────────────────────────────────────────────────
      selectedNode:     null,
      highlightedNodes: new Set(),
      highlightedEdges: new Set(),
      activeTab:        "graph",
      searchOpen:       false,
      transform:        { x: 0, y: 0, scale: 1 },
      antireqWarning:   null,
      activeSubjects:   null,
      activeLevels:     null,
      tierFilter:       "all",
      activeSubMajorId: null,
      showMyCourses:    false,
      panToNode:        null,

      // ── Actions ───────────────────────────────────────────────────────────────

      setActiveMajor: (id) => {
        const major = MAJORS[id];
        if (!major) return;
        const { termPlanEditedByUser } = get();
        set({
          activeMajorId:    id,
          activeSubMajorId: null,
          selectedNode:     null,
          highlightedNodes: new Set(),
          highlightedEdges: new Set(),
          transform:        { x: 0, y: 0, scale: 1 },
          activeSubjects:   null,
          activeLevels:     null,
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
        set({
          activeSubMajorId: id,
          // Clear graph state so stale highlights from the previous sub-major
          // don't persist when the audit requirement groups change
          selectedNode:     null,
          highlightedNodes: new Set(),
          highlightedEdges: new Set(),
        });
      },

      toggleCompleted: (code) => {
        set((state) => {
          const next = new Set(toSet(state.completedCourses));
          next.has(code) ? next.delete(code) : next.add(code);
          return { completedCourses: next };
        });
        get().checkAntireqs();
      },

      togglePlanned: (code) => {
        set((state) => {
          const next = new Set(toSet(state.plannedCourses));
          next.has(code) ? next.delete(code) : next.add(code);
          return { plannedCourses: next };
        });
        get().checkAntireqs();
      },

      setSelectedNode:  (code)         => set({ selectedNode: code }),
      setHighlight:     (nodes, edges) => set({ highlightedNodes: nodes, highlightedEdges: edges }),
      clearSelection:   ()             => set({ selectedNode: null, highlightedNodes: new Set(), highlightedEdges: new Set() }),
      setActiveTab:     (tab)          => set({ activeTab: tab }),
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      setSearchOpen:    (open)         => set({ searchOpen: open }),

      setTransform: (t) =>
        set((state) => ({
          transform: typeof t === "function" ? t(state.transform) : t,
        })),

      moveCourseToTerm: (code, term) =>
        set((state) => {
          const next = {} as TermPlan;
          for (const [t, cs] of Object.entries(state.termPlan) as [keyof TermPlan, string[]][]) {
            next[t] = cs.filter((c) => c !== code);
          }
          const key = term as keyof TermPlan;
          if (key in next) next[key] = [...next[key], code];
          return { termPlan: next, termPlanEditedByUser: true };
        }),

      // ── Subject filter ─────────────────────────────────────────────────────

      toggleSubject: (subject) =>
        set((state) => {
          const majorCodes  = get().getMajorCourses();
          const allSubjects = new Set(subjectsFromCodes(majorCodes));
          const current     = state.activeSubjects ?? allSubjects;
          const next        = new Set(current);
          next.has(subject) ? next.delete(subject) : next.add(subject);
          const allSelected = [...allSubjects].every((s) => next.has(s));
          return { activeSubjects: allSelected ? null : next };
        }),

      isolateSubject:     (subject) => set({ activeSubjects: new Set([subject]) }),
      clearSubjectFilter: ()        => set({ activeSubjects: null }),

      toggleLevel: (level) =>
        set((state) => {
          const majorCodes = get().getMajorCourses();
          const allLevels  = new Set(levelsFromCodes(majorCodes));
          const current    = state.activeLevels ?? allLevels;
          const next       = new Set(current);
          next.has(level) ? next.delete(level) : next.add(level);
          // Reset to "all" only when everything is selected
          const allSelected = [...allLevels].every((l) => next.has(l));
          return { activeLevels: allSelected ? null : next };
        }),
      clearLevelFilter:   ()        => set({ activeLevels: null }),

      setTierFilter:      (tier)    => set({ tierFilter: tier }),
      toggleMyCourses:    ()        => set((state) => ({ showMyCourses: !state.showMyCourses })),
      setPanToNode:       (code)    => set({ panToNode: code }),

      // ── Derived queries ────────────────────────────────────────────────────

      /** Returns the flat set of all course codes placed in any term bucket. */
      getTermPlannedCourses: (): Set<string> => {
        const { termPlan } = get();
        return new Set(Object.values(termPlan).flat());
      },

      getMajorCourses: (): string[] => {
        const { activeMajorId, activeSubMajorId } = get();

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

          // 1. Block explicit exclusions
          if (course.exclMajors?.includes(activeMajorId)) return false;
          if (activeSubMajorId && course.exclMajors?.includes(activeMajorId)) return false;

          // 2. Check Whitelist
          const whitelist = course.majors || [];
          const isAllowed = 
            whitelist.includes("any") || 
            whitelist.includes(activeMajorId) || 
            (activeSubMajorId && whitelist.includes(activeMajorId));

          // 3. Handle 'other' logic
          // If it's marked 'other', it MUST be explicitly whitelisted to show up.
          if (whitelist.includes("other") && !isAllowed) return false;

          return isAllowed;
        };

        // 3. STEP 1: Mine Explicit Course Lists
        const allGroups = major.requirementGroups || [];
        
        const processSubGroup = (sub: SubGroup) => {
          sub.courses?.forEach(c => codes.add(c));
          sub.subGroups?.forEach(processSubGroup);
        };

        allGroups.forEach((group: RequirementGroup) => {
          group.courses?.forEach(c => codes.add(c));
          group.subGroups?.forEach(processSubGroup);
        });

        // 4. STEP 2: Mine Rules (The "Any STAT 400+" Logic)
        // We iterate through ALL courses in the database and check if they match 
        // any rule defined in the major's requirements.
        const allMajorRules: RequirementRule[] = [];
        
        // Collect all rules from groups and subgroups
        const collectRules = (sub: SubGroup) => {
          if (sub.rules) allMajorRules.push(...sub.rules);
          sub.subGroups?.forEach(collectRules);
        };
        
        allGroups.forEach((group: RequirementGroup)  => {
          if (group.rules) allMajorRules.push(...group.rules);
          group.subGroups?.forEach(collectRules);
        });

        // Now, check every course against these rules
        Object.keys(COURSE_DATA).forEach(courseCode => {
          if (matchesAnyRule(courseCode, allMajorRules) && satisfiesMajorRestrictions(courseCode)) {
            codes.add(courseCode);
          }
        });

        // 5. STEP 3: BFS Prerequisite Expansion
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
          const deps: string[] = course.prereqs.flatMap((req: any) => 
            (req.reqs ? req.reqs.filter((r: any) => typeof r === "string") : req.courses ?? [])
          );

          deps.forEach(dep => {
            if (COURSE_DATA[dep] && satisfiesMajorRestrictions(dep)) {
              if (!codes.has(dep)) {
                codes.add(dep);
                queue.push(dep);
              }
            }
          });
        }

        return Array.from(codes);
      },

      getFilteredCourses: (): string[] => {
        const { activeMajorId, activeSubMajorId, activeSubjects, activeLevels, tierFilter, showMyCourses } = get();

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
          codes = codes.filter((c) => activeSubjects.has(courseSubject(c)));
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
            const deps: string[] = course.prereqs.flatMap((req: any) =>
              req.reqs ? req.reqs.filter((r: any) => typeof r === "string") : (req.courses ?? [])
            );
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

        const unlocked = course.prereqs.every((req: any) =>
          req.type === "OR"
            ? (req.reqs ?? req.courses ?? []).some((c: any) =>
                typeof c === "string" ? completedCourses.has(c) : false)
            : (req.reqs ?? req.courses ?? []).every((c: any) =>
                typeof c === "string" ? completedCourses.has(c) : false)
        );
        return unlocked ? "available" : "locked";
      },

      checkAntireqs: () => {
        const completedCourses = toSet(get().completedCourses);
        const plannedCourses   = toSet(get().plannedCourses);
        const all = new Set([...completedCourses, ...plannedCourses]);

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
        activeMajorId:        state.activeMajorId,
        completedCourses:     state.completedCourses,
        plannedCourses:       state.plannedCourses,
        termPlan:             state.termPlan,
        termPlanEditedByUser: state.termPlanEditedByUser,
        theme:                state.theme,
      }),

      onRehydrateStorage: () => (rehydrated) => {
        if (!rehydrated) return;
        rehydrated.completedCourses = toSet(rehydrated.completedCourses);
        rehydrated.plannedCourses   = toSet(rehydrated.plannedCourses);
      },
    }
  )
);