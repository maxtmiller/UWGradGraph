// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const FRENCH_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "FR 192A",
      "FR 192B",
      "FR 250",
      "FR 251",
      "FR 252",
      "FR 276",
      "FR 296",
      "FR 297",
      "FR 303",
      "FR 351",
      "FR 452"
    ]
  },
  {
    title: "Required Courses — Additional",
    type: "complex",
    color: "#38BDF8",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 2,
        courses: ["FR 332", "FR 343", "FR 354", "FR 363", "FR 365", "FR 367", "FR 373", "FR 375", "FR 399A", "FR 410", "FR 424", "FR 471", "FR 473", "FR 484", "FR 485", "FR 486", "FR 487"]
      }
    ]
  }
];
