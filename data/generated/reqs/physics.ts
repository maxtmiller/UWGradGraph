// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const PHYSICS_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "CS 114",
      "MATH 127",
      "MATH 128",
      "MATH 227",
      "MATH 228",
      "PHYS 121",
      "PHYS 121L",
      "PHYS 122",
      "PHYS 122L",
      "PHYS 160L",
      "PHYS 223",
      "PHYS 234",
      "PHYS 242",
      "PHYS 249",
      "PHYS 260A",
      "PHYS 260B",
      "PHYS 263",
      "PHYS 267",
      "PHYS 357",
      "PHYS 360A",
      "PHYS 364",
      "PHYS 360B",
      "PHYS 370L",
      "PHYS 391L",
      "PHYS 460A",
      "PHYS 460B"
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
        count: 4,
        courses: ["PHYS 334", "PHYS 342", "PHYS 356", "PHYS 363", "PHYS 365", "PHYS 376"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["BIOL 110", "BIOL 130", "BIOL 130L", "BIOL 150", "BIOL 165", "BIOL 201", "BIOL 211", "BIOL 220", "BIOL 239", "BIOL 240", "BIOL 240L", "BIOL 241", "BIOL 251", "BIOL 273", "CHEM 120", "CHEM 120L", "CHEM 123", "CHEM 123L", "EARTH 121", "EARTH 121L", "EARTH 122", "EARTH 122L"]
      }
    ]
  }
];
