import type { Major } from "../../../types";
import { SOFTWARE_ENGINEERING_REQS  } from "../reqs/software-engineering";
import { SOFTWARE_ENGINEERING_PLAN } from "../terms/software-engineering";


// ── Major Definitions ─────────────────────────────────────────────────────────
// Each major owns its requirement groups and a suggested default term plan.
// The graph and progress audit derive their views entirely from whichever
// major is active in the store — no component hardcodes a major directly.

const SoftwareEngineering: Major = {
  id:                "software-engineering",
  name:              "Software Engineering",
  faculty:           "engineering",
  color:             "#A855F7",
  requirementGroups: SOFTWARE_ENGINEERING_REQS,
  defaultTermPlan:   SOFTWARE_ENGINEERING_PLAN,
};

export const ENGINEERING_MAJORS: Record<string, Major> = {
  "software-engineering": SoftwareEngineering,
};
