import type { Major, MajorId, MajorMap, SubMajorId } from "../../types";
import { SE_REQS } from "../reqs/se";
import { SE_PLAN } from "../terms/se";


// ── Major Definitions ─────────────────────────────────────────────────────────
// Each major owns its requirement groups and a suggested default term plan.
// The graph and progress audit derive their views entirely from whichever
// major is active in the store — no component hardcodes a major directly.

export const SE: Major = {
  id:      "se",
  name:    "Software Engineering",
  faculty: "Engineering",
  color:   "#A855F7",

  requirementGroups: SE_REQS,

  defaultTermPlan: SE_PLAN,
};

