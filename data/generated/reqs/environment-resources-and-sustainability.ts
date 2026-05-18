// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const ENVIRONMENT_RESOURCES_AND_SUSTAINABILITY_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "ENVS 131",
      "ENVS 178",
      "ENVS 195",
      "ENVS 200",
      "ERS 101",
      "ERS 102",
      "ERS 201",
      "ERS 202",
      "ERS 215",
      "ERS 300",
      "ERS 301",
      "ERS 302",
      "ERS 400",
      "ERS 402"
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
        courses: ["ERS 403A", "ERS 403B"]
      }
    ]
  }
];
