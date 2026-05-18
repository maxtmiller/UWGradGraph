// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const MEDIEVAL_STUDIES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "MEDVL 252",
      "MEDVL 491"
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
        courses: ["CLAS 105", "MEDVL 105"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["HIST 260", "MEDVL 260"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["HIST 422", "HIST 450"]
      }
    ]
  }
];
