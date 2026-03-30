import type { Major, MajorId, MajorMap, SubMajorId } from "../../types";
import { CS_REQS } from "../reqs/cs";
import { CS_PLAN } from "../terms/cs";


// ── Major Definitions ─────────────────────────────────────────────────────────
// Each major owns its requirement groups and a suggested default term plan.
// The graph and progress audit derive their views entirely from whichever
// major is active in the store — no component hardcodes a major directly.

export const CS: Major = {
  id:      "cs",
  name:    "Computer Science",
  faculty: "Mathematics",
  color:   "#EC4899",

  requirementGroups: CS_REQS,

  defaultTermPlan: CS_PLAN,
};

