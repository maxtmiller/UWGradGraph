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

function buildReqGroupMajorSets(): Map<MajorId, Set<string>> {
  const allMajors = Object.entries(MAJORS) as Array<[MajorId, Major]>;
  const mathSubMajors = Object.values(SUB_MAJOR_REGISTRY["mathematics"] ?? {});
  
  const entries: Array<[MajorId, Major]> = [
    ...allMajors,
    ...mathSubMajors.map(m => [m.id as MajorId, m] as [MajorId, Major]),
  ].filter(Boolean);

  const map = new Map<MajorId, Set<string>>();
  for (const [id, major] of entries) {
    if (!id || !major) continue;
    const existing = map.get(id) ?? new Set<string>();
    for (const code of collectCodesInMajor(major)) existing.add(code);
    map.set(id, existing);
  }
  return map;
}

export const COURSE_DATA: CourseMap = buildCourseMap();

// After initial build, derive major memberships from req groups for courses
// whose `majors` field was set to ["any"] by the refresh script (unrestricted courses).
// Courses already carrying specific program restrictions are left unchanged.
;(function deriveMajorsFromReqGroups() {
  const reqSets = buildReqGroupMajorSets();
  const courseToMajors = new Map<string, Set<MajorId>>();

  for (const [majorId, codes] of reqSets) {
    for (const code of codes) {
      if (!courseToMajors.has(code)) courseToMajors.set(code, new Set());
      courseToMajors.get(code)!.add(majorId);
    }
  }

  for (const course of Object.values(COURSE_DATA)) {
    if (!course.majors.includes("any")) continue; // already has specific restrictions
    const derived = courseToMajors.get(course.code);
    if (derived && derived.size > 0) {
      course.majors = [...derived] as (MajorId | "any")[];
    }
    // Courses not in any req group stay as "any"
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
  // Math Faculty (Pink/Purple Spectrum)
  CS:    "#EC4899", // Bright Pink
  MATH:  "#E879F9", // Fuchsia
  STAT:  "#8B5CF6", // Violet (Adjusted for uniqueness)
  ACTSC: "#A855F7", // Deep Purple
  CO:    "#818CF8", // Indigo
  AMATH: "#6366F1", // Royal Blue
  PMATH: "#4F46E5", // Deep Blue
  CFM:   "#EC4899", // Darker Pink

  // Engineering Faculty (Blue/Cyan/Dark Green Spectrum)
  SE:    "#A855F7", // Sky Blue
  ECE:   "#0EA5E9", // Ocean Blue
  SYDE:  "#2DD4BF", // Teal
  MTE:   "#06B6D4", // Cyan
  ME:    "#0891B2", // Dark Cyan
  CHE:   "#065F46", // Emerald
  NE:    "#14B8A6", // Mint
  MGMT:  "#22D3EE", // Light Cyan
  MSE:   "#075985", // Navy Engineering
  GENE:  "#334155", // Slate (General Engineering)
  ENVE:  "#0D9488", // Dark Teal (Environmental Engineering)

  // Science Faculty (Green/Orange Spectrum)
  SCI:   "#4ADE80", // Light Green
  BIOL:  "#22C55E", // Green
  CHEM:  "#16A34A", // Dark Green
  PHYS:  "#FB923C", // Orange
  EARTH: "#92400E", // Brown (Earth/Geology)

  // Arts/Environment/Humanities (Yellow/Red/Earth Spectrum)
  AFM:   "#FACC15", // Gold/Yellow
  ECON:  "#F59E0B", // Amber
  ARBUS: "#D97706", // Dark Amber
  HEALTH:"#F87171", // Soft Red
  PLAN:  "#A3E635", // Lime
  ENVS:  "#65A30D", // Olive (Environment)
  ERS:   "#4D7C0F", // Deep Forest (Environment/Resources)
  GEOG:  "#84CC16", // Bright Lime (Geography)
  ENBUS: "#CA8A04", // Mustard (Environment & Business)
  
  // Communication & Languages
  COMMST:"#FDA4AF", // Rose (Communication)
  ENGL:  "#FB7185", // Soft Crimson (English)
  EMLS:  "#F43F5E", // Deep Rose (English Language)
  
  // Humanities & Social Sciences
  PHIL:  "#64748B", // Steel Blue (Philosophy)
  PSYCH: "#FCA5A5", // Salmon (Psychology)
  PSCI:  "#EF4444", // Red (Political Science)
  PACS:  "#34D399", // Seafoam (Peace and Conflict)
  RCS:   "#D4D4D8", // Light Gray (Religious/Cultural)
  THPERF:"#C084FC", // Lavender (Theatre/Performance)

  // Professional Development (Neutral)
  PD:    "#94A3B8", // Slate Gray
};

// ── Status Colors ─────────────────────────────────────────────────────────────

export const STATUS_COLORS: Record<string, string> = {
  completed: "#4ADE80",
  planned:   "#60A5FA",
  available: "#94A3B8",
  locked:    "#334155",
};
