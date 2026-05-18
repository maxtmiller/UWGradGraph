// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const SOCIOLOGY_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "SOC 202",
      "SOC 302"
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
        courses: ["LS 221", "SOC 221"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["LS 280", "SOC 280"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["LS 322", "SOC 322"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["SOC 101", "SOC 101R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["SOC 401", "SOC 405", "SOC 406", "SOC 408", "SOC 416", "SOC 418"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["SOC 499A", "SOC 499B"]
      }
    ]
  }
];
