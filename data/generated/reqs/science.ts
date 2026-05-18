// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const SCIENCE_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "CHEM 121",
      "CHEM 121L",
      "CHEM 125",
      "CHEM 125L",
      "EARTH 121",
      "EARTH 121L",
      "EARTH 122",
      "EARTH 122L",
      "PHYS 111",
      "PHYS 111L",
      "PHYS 112",
      "PHYS 112L",
      "PHYS 121",
      "PHYS 121L",
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
        courses: ["COMMST 193", "ENGL 193"]
      },
      {
        type: "at-least",
        count: 2,
        courses: ["BIOL 110", "BIOL 130", "BIOL 150", "BIOL 165", "BIOL 201", "BIOL 211", "BIOL 220", "BIOL 239", "BIOL 240", "BIOL 241", "BIOL 251", "BIOL 266", "BIOL 273"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CHEM 120", "CHEM 120L", "CHEM 123", "CHEM 123L"]
      }
    ]
  }
];
