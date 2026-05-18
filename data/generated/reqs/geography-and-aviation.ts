// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const GEOGRAPHY_AND_AVIATION_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "AVIA 100",
      "AVIA 121",
      "AVIA 141",
      "AVIA 142",
      "AVIA 210",
      "AVIA 222",
      "AVIA 223",
      "AVIA 243",
      "AVIA 244",
      "AVIA 245",
      "AVIA 317",
      "AVIA 324",
      "AVIA 325",
      "AVIA 346",
      "AVIA 347",
      "AVIA 370",
      "AVIA 426",
      "CS 100",
      "ENVS 131",
      "ENVS 178",
      "ENVS 195",
      "ENVS 200",
      "ENVS 278",
      "GDS 181",
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
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GDS 271", "GDS 281", "PLAN 281"]
      }
    ]
  }
];
