// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const SEXUALITIES_RELATIONSHIPS_AND_FAMILIES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "SRF 101",
      "SRF 205",
      "SRF 207",
      "SRF 208",
      "SRF 220",
      "SRF 230",
      "SRF 310",
      "SRF 400"
    ]
  },
  {
    title: "Required Courses — Additional",
    type: "complex",
    color: "#38BDF8",
    courses: [],
    subGroups: [
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 236", "SRF 204"]
      },
      {
        type: "at-least",
        count: 2,
        courses: ["PSYCH 354", "PSYCH 354R", "SRF 304", "SRF 305", "SRF 306", "SRF 307", "SRF 365", "SRF 366"]
      }
    ]
  }
];
