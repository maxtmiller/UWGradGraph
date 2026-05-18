// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const PLANNING_REQS: RequirementGroup[] = [
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
      "ENVS 201",
      "ENVS 278",
      "PLAN 100",
      "PLAN 103",
      "PLAN 107",
      "PLAN 110",
      "PLAN 133",
      "PLAN 202",
      "PLAN 205",
      "PLAN 210",
      "PLAN 246",
      "PLAN 300",
      "PLAN 348",
      "PLAN 375",
      "PLAN 401",
      "PLAN 405",
      "PLAN 452",
      "PLAN 471"
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
        courses: ["GDS 281", "PLAN 281"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GEOG 368", "PLAN 341"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GEOG 441", "GEOG 445", "PLAN 441", "PLAN 442", "PLAN 443", "PLAN 445"]
      }
    ]
  }
];
