// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const SOCIAL_DEVELOPMENT_STUDIES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "SDS 131R",
      "SDS 150R",
      "SDS 250R",
      "SDS 251R",
      "SOCWK 120R"
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
        courses: ["PSYCH 101", "PSYCH 101R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 253", "PSYCH 253R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["SOC 101", "SOC 101R"]
      }
    ]
  }
];
