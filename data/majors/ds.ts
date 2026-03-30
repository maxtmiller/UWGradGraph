import type { Major, MajorId, MajorMap, SubMajorId } from "../../types";
import { DS_BCS_REQS } from "../reqs/cs";
import { DS_BCS_PLAN } from "../terms/cs";
import { DS_BMATH_REQS } from "../reqs/math"
import { DS_BMATH_PLAN } from "../terms/math";


// ── Major Definitions ─────────────────────────────────────────────────────────
// Each major owns its requirement groups and a suggested default term plan.
// The graph and progress audit derive their views entirely from whichever
// major is active in the store — no component hardcodes a major directly.

const DS_BCS: Major = {
  id:      "ds",
  name:    "Data Science (BCS)",
  faculty: "Mathematics",
  color:   "#80DEEA",

  requirementGroups: DS_BCS_REQS,

  defaultTermPlan: DS_BCS_PLAN,
};

const DS_BMATH: Major = {
  id:      "ds",
  name:    "Data Science (BMath)",
  faculty: "Mathematics",
  color:   "#80DEEA",

  requirementGroups: DS_BMATH_REQS,

  defaultTermPlan: DS_BMATH_PLAN,
};


export const DS_SUB_MAJORS: Record<SubMajorId, Major> = {
  dsbmath: DS_BMATH,
  dsbcs: DS_BCS,
};
