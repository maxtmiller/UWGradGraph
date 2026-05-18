// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const EARTH_SCIENCES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "CHEM 120",
      "CHEM 120L",
      "CHEM 123",
      "CHEM 123L",
      "EARTH 121",
      "EARTH 121L",
      "EARTH 122",
      "EARTH 122L",
      "EARTH 123",
      "EARTH 221",
      "EARTH 223",
      "EARTH 231",
      "EARTH 232",
      "EARTH 235",
      "EARTH 238",
      "EARTH 260",
      "EARTH 333",
      "EARTH 342",
      "EARTH 390",
      "EARTH 421",
      "EARTH 436A",
      "EARTH 440",
      "EARTH 456",
      "EARTH 458",
      "EARTH 458L",
      "EARTH 459",
      "MATH 127",
      "MATH 128",
      "STAT 202",
      "COMMST 193",
      "ENGL 193",
      "EARTH 436B",
      "PHYS 121",
      "PHYS 121L",
      "PHYS 112",
      "PHYS 112L",
      "PHYS 122",
      "PHYS 122L"
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
        courses: ["CIVE 222", "ENVE 223", "GEOE 223", "MATH 228"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CIVE 353", "GEOE 353"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 106", "MATH 114"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PHYS 111", "PHYS 111L"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 100", "MATH 103", "MATH 104", "MATH 124", "MATH 199"]
      }
    ]
  }
];
