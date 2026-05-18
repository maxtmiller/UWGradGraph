// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const CLIMATE_AND_ENVIRONMENTAL_CHANGE_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "EARTH 121",
      "ENVS 131",
      "ENVS 178",
      "ENVS 195",
      "ENVS 200",
      "ENVS 278",
      "GDS 181",
      "GEOG 102",
      "GEOG 205",
      "GEOG 209",
      "GEOG 390",
      "GEOG 417",
      "GEOG 427"
    ]
  },
  {
    title: "Required Courses — Additional",
    type: "complex",
    color: "#38BDF8",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 3,
        courses: ["AVIA 370", "EARTH 343", "GEOG 303", "GEOG 304", "GEOG 305", "GEOG 320", "EARTH 305"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["BIOL 220", "BIOL 240"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CHEM 120", "PHYS 111"]
      },
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
        courses: ["GEOG 207", "SCI 205"]
      },
      {
        type: "at-least",
        count: 2,
        courses: ["GEOG 307", "GEOG 314", "GEOG 359"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 104", "MATH 127"]
      }
    ]
  }
];
