// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const GEOSPATIAL_DATA_SCIENCE_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "CS 234",
      "CS 338",
      "ENVS 131",
      "ENVS 178",
      "ENVS 195",
      "ENVS 200",
      "ENVS 278",
      "GDS 181",
      "GDS 187",
      "GDS 271",
      "GDS 287",
      "GDS 371",
      "GDS 387",
      "GDS 471",
      "GEOG 102",
      "GEOG 390",
      "MATH 106",
      "MATH 114",
      "GEOG 490A",
      "GEOG 490B"
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
        courses: ["AVIA 270", "GDS 270"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 115", "CS 135"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 116", "CS 136"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GDS 281", "PLAN 281"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GDS 318", "PLAN 353"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GDS 381", "PLAN 381"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GDS 481", "PLAN 481"]
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
