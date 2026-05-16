import type { Major, MajorId, MajorMap, FacultyId } from "../types";
import { CS } from "./majors/cs";
import { DS_SUB_MAJORS } from "./majors/ds";
import { MATH_SUB_MAJORS } from "./majors/math";
import { SE } from "./majors/se";

// ── Sub-major registry (majors that have specializations) ─────────────────────

export const SUB_MAJOR_REGISTRY: Record<string, Record<string, any>> = {
  math: MATH_SUB_MAJORS,
  ds:   DS_SUB_MAJORS,
};

// ── Top-level major map (fallback / non-sub-major access) ─────────────────────

export const MAJORS: MajorMap = {
  cs:   CS,
  se:   SE,
  ds:   DS_SUB_MAJORS["dsbcs"],
  math: MATH_SUB_MAJORS["stat"],
};

export const MAJOR_LIST: Major[] = Object.values(MAJORS);

export const DEFAULT_MAJOR_ID: MajorId = "cs";

// ── Faculty membership lookup ──────────────────────────────────────────────────

export const MAJOR_TO_FACULTY: Record<MajorId, FacultyId> = {
  cs:   "mathematics",
  se:   "engineering",
  ds:   "mathematics",
  math: "mathematics",
};

// ── Per-major display metadata (used by WelcomeOverlay and MajorSelector) ─────

export const MAJOR_META: Record<MajorId, {
  label:       string;
  fullName:    string;
  color:       string;
  description: string;
  subjects:    string;
  facultyId:   FacultyId;
}> = {
  cs: {
    label:       "CS",
    fullName:    "Computer Science",
    color:       "#EC4899",
    description: "Algorithms, systems, theory, and software — the broadest technical degree at Waterloo.",
    subjects:    "CS · MATH · STAT",
    facultyId:   "mathematics",
  },
  se: {
    label:       "SE",
    fullName:    "Software Engineering",
    color:       "#A855F7",
    description: "Software design, reliability, and engineering process in the Faculty of Engineering.",
    subjects:    "CS · ECE · SE · MATH",
    facultyId:   "engineering",
  },
  ds: {
    label:       "DS",
    fullName:    "Data Science",
    color:       "#80DEEA",
    description: "Statistics and computation at scale — choose the Math-based or CS-based stream.",
    subjects:    "CS · STAT · MATH",
    facultyId:   "mathematics",
  },
  math: {
    label:       "Math",
    fullName:    "Mathematics",
    color:       "#FCD34D",
    description: "Pure Math, Applied Math, Statistics, CO, Actuarial Science and more — 15 specializations.",
    subjects:    "MATH · STAT · CO · PMATH",
    facultyId:   "mathematics",
  },
};

// ── Legacy flat degree list (used by ProgressAudit degree explorer) ───────────

export const ALL_DEGREES = [
  { id: "cs", major: MAJORS["cs"], parentLabel: "CS" },
  { id: "se", major: MAJORS["se"], parentLabel: "SE" },
  ...Object.entries(DS_SUB_MAJORS).map(([key, m]) => ({
    id: `ds-${key}`,
    major: m,
    parentLabel: "DS",
  })),
  ...Object.entries(MATH_SUB_MAJORS).map(([key, m]) => ({
    id: `math-${key}`,
    major: m,
    parentLabel: "Math",
  })),
];
