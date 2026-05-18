// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const KNOWLEDGE_INTEGRATION_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "COMMST 223",
      "ENVS 131",
      "ENVS 195",
      "INTEG 120",
      "INTEG 121",
      "INTEG 230",
      "INTEG 320",
      "INTEG 321",
      "INTEG 340",
      "INTEG 420A",
      "INTEG 420B",
      "PHIL 145"
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
        courses: ["INTEG 220", "PHIL 290"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["INTEG 221", "PHIL 291"]
      }
    ]
  }
];
