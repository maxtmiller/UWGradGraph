// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const COMMUNICATION_STUDIES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "COMMST 100",
      "COMMST 101",
      "COMMST 223",
      "COMMST 226",
      "COMMST 228",
      "COMMST 399"
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
        courses: ["COMMST 220", "THPERF 220"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["BLKST 224", "COMMST 224", "THPERF 224"]
      }
    ]
  }
];
