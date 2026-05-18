import type { CourseMap, MajorId, Requisite, Major, SubGroup } from "../types";
import { RAW_COURSES } from "./raw_courses";
import { MAJORS, SUB_MAJOR_REGISTRY } from "./majors";


// ── Build CourseMap (with computed leadsTo) ───────────────────────────────────

function buildCourseMap(): CourseMap {
  const map: CourseMap = {};

  // First pass: seed all entries with empty leadsTo
  for (const raw of RAW_COURSES) {
    // Guard against duplicate codes (MATH 138 appeared twice above in the draft)
    if (!map[raw.code]) {
      map[raw.code] = { ...raw, leadsTo: [] };
    } else {
      // Merge majors if the same code appears more than once
      map[raw.code].majors = [
        ...new Set([...map[raw.code].majors, ...raw.majors]),
      ] as MajorId[];
    }
  }

  // Second pass: compute leadsTo from prereq edges
  const extractFromTree = (item: Requisite): string[] => {
    // If reqs doesn't exist for some reason, return empty
    if (!item.reqs) return [];

    return item.reqs.flatMap((sub) => {
      // If the sub-item is a string (Course Code), return it in an array
      if (typeof sub === "string") {
        return [sub];
      }
      // If it's a nested Requisite object, recurse
      return extractFromTree(sub);
    });
  };

  /**
   * Helper to handle the top-level array of Requisites
   */
  const getAllPrereqCodes = (prereqs: Requisite[] | []): string[] => {
    return prereqs.flatMap((req) => extractFromTree(req));
  };

  // Second pass: compute leadsTo
  for (const course of Object.values(map)) {
    const allDepCodes = getAllPrereqCodes(course.prereqs);

    for (const depCode of allDepCodes) {
      // Ensure the dependency exists in our map and avoid duplicate entries
      if (map[depCode] && !map[depCode].leadsTo.includes(course.code)) {
        map[depCode].leadsTo.push(course.code);
      }
    }
  }

  return map;
}

// ── Major → explicit course codes (from req groups) ──────────────────────────

function collectCodesInMajor(major: Major): Set<string> {
  const codes = new Set<string>();

  function walkSubGroup(sg: SubGroup) {
    for (const c of sg.courses) codes.add(c);
    for (const child of sg.subGroups ?? []) walkSubGroup(child);
  }

  for (const group of major.requirementGroups) {
    for (const c of group.courses) codes.add(c);
    for (const sg of group.subGroups ?? []) walkSubGroup(sg);
  }
  return codes;
}

const MAJOR_ID_MAP: Record<string, string> = {
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

export const COURSE_DATA: CourseMap = buildCourseMap();

const FACULTY_ID_MAP: Record<string, string> = {
  "mathematics": "math",
  "arts":        "arts",
  "engineering": "eng",
  "science":     "sci",
  "environment": "env",
  "health":      "hea",
};

// After initial build, derive major memberships from req groups for courses
// whose `majors` field was set to ["any"] by the refresh script (unrestricted courses).
// Courses already carrying specific program restrictions are left unchanged.
;(function deriveMajorsFromReqGroups() {
  const allMajors = Object.entries(MAJORS) as Array<[MajorId, Major]>;
  const mathSubMajors = Object.values(SUB_MAJOR_REGISTRY["mathematics"] ?? {});
  const entries: Array<[MajorId, Major]> = [
    ...allMajors,
    ...mathSubMajors.map(m => [m.id as MajorId, m] as [MajorId, Major]),
  ].filter(Boolean);

  const courseToMajors = new Map<string, Set<string>>();

  for (const [majorId, major] of entries) {
    if (!majorId || !major) continue;
    const codes = collectCodesInMajor(major);
    const facultyShortId = FACULTY_ID_MAP[major.faculty];
    const majorShortId = MAJOR_ID_MAP[majorId];

    for (const code of codes) {
      if (!courseToMajors.has(code)) courseToMajors.set(code, new Set());
      const set = courseToMajors.get(code)!;
      set.add(majorId);
      if (majorShortId) set.add(majorShortId);
      if (facultyShortId) set.add(facultyShortId);
    }
  }

  for (const course of Object.values(COURSE_DATA)) {
    if (!course.majors.includes("any")) continue; 
    const derived = courseToMajors.get(course.code);
    if (derived && derived.size > 0) {
      course.majors = Array.from(derived) as (MajorId | "any")[];
    }
  }
})();

// ── Tag Colors ────────────────────────────────────────────────────────────────

export const TAG_COLORS: Record<string, string> = {
  core:      "#FFD54F",
  systems:   "#64B5F6",
  theory:    "#CE93D8",
  ml:        "#80DEEA",
  stat:      "#A5D6A7",
  math:      "#FFAB91",
  pmath:     "#F9A8D4",
  co:        "#FCD34D",
  se:        "#F48FB1",
  security:  "#FF8A65",
  advanced:  "#B39DDB",
  numerical: "#80CBC4",
  data:      "#6EE7B7",
};

export const COURSE_COLORS: Record<string, string> = {
  // --- Math/CS Faculty (Pink/Purple) ---
  ACTSC: "#9333EA", // Violet
  ACTSCI:"#9333EA",
  AMATH: "#A855F7", // Purple
  CFM:   "#C026D3", // Fuchsia
  CO:    "#D946EF", // Magenta
  CS:    "#F43F5E", // Rose
  MATH:  "#E11D48", // Red-Pink
  PMATH: "#BE185D", // Dark Rose
  STAT:  "#7C3AED", // Indigo

  // --- Engineering Faculty (Blue/Cyan/Steel) ---
  AE:    "#0891B2", // Cyan
  ARCH:  "#15803D", // Green (Structure/Earth)
  BME:   "#06B6D4", // Teal
  CHE:   "#0369A1", // Ocean Blue
  CIVE:  "#0284C7", // Bright Blue
  ECE:   "#0EA5E9", // Sky Blue
  ENVE:  "#0891B2", // Cyan
  GENE:  "#475569", // Slate/Steel
  GEOE:  "#059669", // Emerald
  ME:    "#0284C7", // Bright Blue
  MGMT:  "#38BDF8", // Light Blue
  MSE:   "#0C4A6E", // Navy Blue
  NE:    "#22D3EE", // Bright Cyan
  SE:    "#3B82F6", // Blue
  SYDE:  "#0891B2", // Cyan
  MTE:   "#0EA5E9", // Sky Blue

  // --- Science Faculty (Nature/Green/Orange) ---
  BIOL:  "#16A34A", // Forest Green
  CHEM:  "#15803D", // Green
  EARTH: "#B45309", // Brown/Earth
  PHYS:  "#EA580C", // Burnt Orange
  SCI:   "#22C55E", // Green

  // --- Arts/Env/Health/Humanities ---
  AB:    "#E11D48",
  AFM:   "#CA8A04", // Mustard
  AHS:   "#F43F5E",
  ANTH:  "#D97706", // Dark Amber
  APPLS: "#C026D3",
  ARABIC:"#7C3AED",
  ARBUS: "#B45309",
  ARTS:  "#EF4444",
  ASL:   "#3B82F6",
  AVIA:  "#059669",
  BET:   "#F472B6",
  BLKST: "#8B5CF6",
  BUS:   "#FACC15",
  CDNST: "#F97316",
  CHINA: "#EF4444",
  CI:    "#14B8A6",
  CLAS:  "#6366F1",
  COMM:  "#F472B6",
  COMMST:"#F472B6",
  CM:    "#8B5CF6",
  CMW:   "#EC4899",
  COGSCI:"#3B82F6",
  CROAT: "#F472B6",
  DAC:   "#D946EF",
  DRAMA: "#F59E0B",
  DUTCH: "#10B981",
  EASIA: "#E11D48",
  ECON:  "#D97706",
  ELPE:  "#7C3AED",
  EMLS:  "#F43F5E",
  ENBUS: "#CA8A04",
  ENGL:  "#E11D48",
  ENVS:  "#65A30D",
  ERS:   "#4D7C0F",
  GEOG:  "#84CC16",
  HEALTH:"#F87171",
  KIN:   "#F43F5E", // Kinetic
  MATBUS:"#10B981",
  MTHEL: "#F59E0B",
  PACS:  "#34D399",
  PD:    "#94A3B8",
  PHIL:  "#64748B",
  PLAN:  "#A3E635",
  PSCI:  "#EF4444",
  PSYCH: "#FCA5A5",
  RCS:   "#D4D4D8",
  THPERF:"#C084FC",
};
// ── Status Colors ─────────────────────────────────────────────────────────────

export const STATUS_COLORS: Record<string, string> = {
  completed: "#4ADE80",
  planned:   "#60A5FA",
  available: "#94A3B8",
  locked:    "#334155",
};
