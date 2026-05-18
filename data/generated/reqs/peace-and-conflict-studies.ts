// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const PEACE_AND_CONFLICT_STUDIES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "PACS 401"
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
        courses: ["PACS 201", "PACS 202", "PACS 203"]
      },
      {
        type: "at-least",
        count: 3,
        courses: ["PACS 311", "PACS 313", "PACS 316", "PACS 318", "PACS 321", "PACS 323", "PACS 324", "PACS 326", "PACS 327", "PACS 329", "PACS 331", "PACS 332", "PSCI 352"]
      }
    ]
  }
];
