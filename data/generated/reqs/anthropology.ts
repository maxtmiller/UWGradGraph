// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const ANTHROPOLOGY_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "ANTH 204"
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
        courses: ["ANTH 201", "CLAS 221"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ANTH 202", "ANTH 221", "ANTH 241", "ANTH 245", "ANTH 251", "ANTH 290"]
      }
    ]
  }
];
