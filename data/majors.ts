import type { Major, MajorId, MajorMap, SubMajorId } from "../types";
import { CS } from "./majors/cs";
import { DS_SUB_MAJORS } from "./majors/ds";
import { MATH_SUB_MAJORS } from "./majors/math";
import { SE } from "./majors/se";

export const SUB_MAJOR_REGISTRY: Record<string, Record<string, any>> = {
  math: MATH_SUB_MAJORS,
  ds:   DS_SUB_MAJORS,
};

export const MAJORS: MajorMap = { cs: CS, se: SE, ds: DS_SUB_MAJORS["dsbcs"], math: MATH_SUB_MAJORS["stat"] };

export const MAJOR_LIST: Major[] = Object.values(MAJORS);

export const DEFAULT_MAJOR_ID: MajorId = "cs";

export const ALL_DEGREES = [
  { id: "cs", major: MAJORS["cs"], parentLabel: "CS" },
  { id: "se", major: MAJORS["se"], parentLabel: "SE" },
  ...Object.entries(DS_SUB_MAJORS).map(([key, m]) => ({ 
    id: `ds-${key}`, 
    major: m, 
    parentLabel: "DS" 
  })),
  ...Object.entries(MATH_SUB_MAJORS).map(([key, m]) => ({ 
    id: `math-${key}`, 
    major: m, 
    parentLabel: "Math" 
  })),
];
