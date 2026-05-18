// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const THEATRE_AND_PERFORMANCE_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "THPERF 101",
      "THPERF 243",
      "THPERF 244",
      "THPERF 271",
      "THPERF 400"
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
        courses: ["COMMST 102", "COMMST 149", "DAC 209", "THPERF 100", "THPERF 102", "THPERF 149"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["COMMST 282", "COMMST 378", "THPERF 282", "THPERF 378"]
      },
      {
        type: "at-least",
        count: 2,
        courses: ["THPERF 306", "THPERF 307", "THPERF 316", "THPERF 317", "THPERF 406", "THPERF 407", "THPERF 416", "THPERF 417"]
      }
    ]
  }
];
