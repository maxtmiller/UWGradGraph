// ── Prerequisite Requirement ──────────────────────────────────────────────────

export type RequisiteLogic = "AND" | "OR";

export interface Requisite {
  type: RequisiteLogic;
  reqs: (string | Requisite)[];
}

export interface Course {
  code: string;
  title: string;
  units: number;
  prereqs: Requisite[] | [];
  antireqs: string[];
  /** Domain tags for visual colour-coding (e.g. "core", "ml", "systems") */
  tags: string[];
  /** Which major IDs include this course in their curriculum */
  majors: (MajorId | "any" | "other")[];
  exclMajors?: (MajorId | "other")[];
  offered?: string[];
  term?: string;
  /** Computed at init: courses that list this one as a prerequisite */
  leadsTo: string[];
}

export type CourseMap = Record<string, Course>;

// ── Faculty / Major / SubMajor ────────────────────────────────────────────────

export type FacultyId = string;
export type MajorId   = string;
export type SubMajorId = string;

export interface Faculty {
  id:          FacultyId;
  /** Full official name — "Faculty of Mathematics" */
  name:        string;
  /** Short name used in compact UI — "Mathematics" */
  shortName:   string;
  color:       string;
  description: string;
  /** Display subjects line — "CS · MATH · STAT" */
  subjects:    string;
  /** Ordered list of major IDs that belong to this faculty */
  majorIds:    MajorId[];
}

export type FacultyMap = Record<FacultyId, Faculty>;

export type RequirementTier = "standard" | "advanced" | "lower";


// ─────────────────────────────────────────────────────────────────────────────
// Dynamic rule  (used by both SubGroup and RequirementGroup)
// ─────────────────────────────────────────────────────────────────────────────
 
/**
 * A course satisfies a rule when ALL specified predicates match.
 * Multiple RequirementRule objects in an array are OR-ed
 * (a course only needs to satisfy one rule in the array).
 *
 * Examples
 *   { prefixes: ["STAT"], minLevel: 400 }          → any STAT 4XX
 *   { prefixes: ["CS","MATH"], minLevel: 300 }      → any CS 3XX+ or MATH 3XX+
 *   { minLevel: 400, maxLevel: 499 }                → any 4XX from any faculty
 */
export interface RequirementRule {
  prefixes?: string[];
  minLevel?: number;
  maxLevel?: number;
}
 
// ─────────────────────────────────────────────────────────────────────────────
// SubGroup
// ─────────────────────────────────────────────────────────────────────────────
 
/**
 * SubGroupType controls how the allocator processes this node:
 *
 *   "at-most"   — claim UP TO `count` from `courses[]`.
 *                 Remaining eligible courses stay in the pool (classic
 *                 "pick-one-of" bucket inside a core requirements block).
 *
 *   "at-least"  — claim AT LEAST `count` from `courses[]` (soft floor; more is OK).
 *
 *   "exactly"   — claim EXACTLY `count` from `courses[]`.
 *
 *   "and"       — ALL child `subGroups` must be satisfied.
 *                 `courses[]` and `count` are unused at this level.
 *
 *   "or"        — ANY ONE child `subGroup` must be satisfied.
 *                 Useful for "take path A (course X + course Y) or path B (course Z)".
 *
 *   "elective"  — rule-driven: `count` courses matching `rules[]` are claimed.
 *                 Like an inline elective bucket nested inside a complex group.
 */
export type SubGroupType =
  | "at-most"
  | "at-least"
  | "exactly"
  | "and"
  | "or"
  | "elective";
 
export interface SubGroup {
  /** Optional label shown in the Progress Audit UI. */
  title?: string;
 
  type: SubGroupType;
 
  /**
   * Number of courses this slot requires / allows.
   * Ignored for `"and"` / `"or"` (their count comes from child subGroups).
   */
  count: number;


  requiredCourse?: string;
  excludedCourses?: string;
 
  /**
   * Static list of eligible course codes for leaf nodes
   * (`"at-most"` / `"at-least"` / `"exactly"`).
   * Empty for combinator nodes (`"and"` / `"or"`) and `"elective"` nodes.
   */
  courses: string[];
 
  /**
   * Child sub-buckets for combinator types (`"and"` / `"or"`) and
   * for complex nested requirements.
   * The allocator recurses into these before handling `courses[]`.
   */
  subGroups?: SubGroup[];
 
  /**
   * Dynamic rule predicates for `"elective"` sub-nodes.
   * Any course in the pool matching ANY rule is eligible.
   */
  rules?: RequirementRule[];
 
  /**
   * When true, courses claimed by this subGroup are NOT removed from the
   * global pool after allocation, allowing them to also count toward a
   * later RequirementGroup.
   *
   * Use case: "Your MATH 237 counts toward both Core Math and Math Electives."
   */
  canDoubleCount?: boolean;
 
  /**
   * Each course claimed from this subGroup contributes `countMultiplier`
   * slots toward the parent group's target (default 1).
   *
   * Use case: "A thesis course counts as 2 elective credits."
   */
  countMultiplier?: number;
}
 
// ─────────────────────────────────────────────────────────────────────────────
// RequirementGroup
// ─────────────────────────────────────────────────────────────────────────────
 
/**
 * RequirementGroupType:
 *
 *   "required"    — every course in `courses[]` must be taken.
 *
 *   "elective"    — at least `minCourses` from `courses[]` and/or `rules[]`.
 *
 *   "list-one-of" — exactly one course from `courses[]` must be chosen.
 *
 *   "complex"     — driven by `subGroups[]` and/or `rules[]`.
 *                   `minCourses` is the total slots the group contributes.
 *                   Use `minSubGroups` to express "choose N of these buckets".
 */
export type RequirementGroupType = "required" | "elective" | "list-one-of" | "complex";
 
export interface RequirementGroup {
  title:   string;
  type:    RequirementGroupType;
  color:   string;
  core?: boolean;
 
  /** Curriculum stream (used by the graph FilterBar tier selector). */
  tier?: RequirementTier;
 
  /** Static list of eligible course codes (empty for rule-only / complex groups). */
  courses: string[];
 
  /**
   * Minimum number of courses needed to satisfy this group.
   * Used by `"elective"` and `"complex"` types.
   */
  minCourses?: number;
 
  /**
   * For `"complex"` groups with `subGroups`: how many subGroups must be
   * satisfied (successfully allocated).  Omit or set to `subGroups.length`
   * to require ALL subGroups.
   *
   * Example: 5 subGroups, minSubGroups = 3 → "choose any 3 of these 5 buckets".
   */
  minSubGroups?: number;
 
  /**
   * Dynamic rule predicates.  Any completed course matching ANY rule is
   * eligible for this group.  Rules are processed AFTER `courses[]` and
   * `subGroups[]` in the allocator.
   */
  rules?: RequirementRule[];
 
  /**
   * Ordered sub-buckets.  The allocator processes them in declaration order
   * (highest priority first) with scarcity-aware course selection.
   */
  subGroups?: SubGroup[];
 
  /**
   * When true, courses claimed by this group are NOT removed from the global
   * pool, so they can also satisfy a later RequirementGroup.
   * Applied at the group level (all sub-allocations inside inherit this).
   */
  canDoubleCount?: boolean;
}


// ── Major / SubMajor ────────────────────────────────────────────────────────────

export interface Major {
  id:                MajorId;
  name:              string;
  faculty:           FacultyId;
  color:             string;
  requirementGroups: RequirementGroup[];
  defaultTermPlan:   Record<string, string[]>;
}

export interface SubMajor {
  id:                SubMajorId;
  name:              string;
  faculty:           FacultyId;
  color:             string;
  requirementGroups: RequirementGroup[];
  defaultTermPlan:   Record<string, string[]>;
}

export type MajorMap = Record<MajorId, Major>;
export type SubMajorMap = Record<SubMajorId, SubMajor>;

// ── Node / Edge ───────────────────────────────────────────────────────────────
 
export interface NodePosition { x: number; y: number; }
export type PositionMap = Record<string, NodePosition>;
 
export interface GraphEdge {
  key: string;
  x1: number; y1: number;
  x2: number; y2: number;
  mx: number;
  isSelected: boolean;
}
 
// ── Course Status ─────────────────────────────────────────────────────────────
 
export type CourseStatus = "completed" | "planned" | "available" | "locked";
 
// ── Term Planner ──────────────────────────────────────────────────────────────
 
export type TermKey = "1A" | "1B" | "2A" | "2B" | "3A" | "3B" | "4A" | "4B";
export type TermPlan = Record<TermKey, string[]>;
 
// ── Canvas Transform ──────────────────────────────────────────────────────────
 
export interface CanvasTransform { x: number; y: number; scale: number; }
 
// ── Filter ────────────────────────────────────────────────────────────────────
 
export type TierFilter = "all" | "required" | "lower" | "standard" | "advanced";
 
// ── Audit ─────────────────────────────────────────────────────────────────────
 
/** Result of running the allocation engine for one RequirementGroup. */
export interface AuditGroupResult {
  group:          RequirementGroup;
  /** Total slots filled (completed + planned). */
  doneCount:      number;
  /** Slots filled by completed courses only. */
  completedDoneCount: number;
  /** Slots filled by planned courses only. */
  plannedDoneCount:   number;
  /** Total slots this group requires. */
  target:         number;
  /** Courses to display as pills (static list, or dynamically discovered). */
  displayCourses: string[];
  /** The specific completed courses allocated to this group by the engine. */
  claimedCourses: Set<string>;
  /** The subset of claimedCourses that are planned (not yet completed). */
  plannedClaimedCourses: Set<string>;
}
