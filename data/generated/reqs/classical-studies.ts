// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const CLASSICAL_STUDIES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "CLAS 233"
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
        courses: ["CLAS 241", "CLAS 242", "VCULT 241", "VCULT 242"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CLAS 251", "HIST 242"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CLAS 252", "HIST 252"]
      }
    ]
  }
];
