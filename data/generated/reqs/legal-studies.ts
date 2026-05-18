// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const LEGAL_STUDIES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "LS 101"
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
        courses: ["LS 300", "SOC 370"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["LS 322", "SOC 322"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["LS 401", "LS 402", "LS 403", "LS 405", "LS 431", "LS 496"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["SOC 101", "SOC 101R"]
      }
    ]
  }
];
