// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const GEOGRAPHY_AND_ENVIRONMENTAL_MANAGEMENT_REQS: RequirementGroup[] = [
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
      "ENVS 278",
      "GDS 181",
      "GEOG 100",
      "GEOG 102",
      "GEOG 390"
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
        courses: ["GDS 271", "GDS 281", "PLAN 281"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GEOG 202", "GEOG 225"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GEOG 205", "GEOG 209"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GEOG 207", "SCI 205"]
      }
    ]
  }
];
