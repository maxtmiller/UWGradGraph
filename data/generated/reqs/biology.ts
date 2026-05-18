// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const BIOLOGY_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "BIOL 110",
      "BIOL 130",
      "BIOL 130L",
      "BIOL 239",
      "BIOL 240",
      "BIOL 240L",
      "BIOL 273",
      "BIOL 308",
      "BIOL 359",
      "CHEM 120",
      "CHEM 120L",
      "CHEM 123",
      "CHEM 123L",
      "CHEM 237",
      "CHEM 237L",
      "CHEM 266",
      "CHEM 266L",
      "MATH 127",
      "STAT 202"
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
        courses: ["PHYS 111", "PHYS 121"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["COMMST 193", "ENGL 193"]
      }
    ]
  }
];
