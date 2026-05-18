// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const BIOCHEMISTRY_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "BIOL 130",
      "BIOL 130L",
      "BIOL 235",
      "BIOL 239",
      "BIOL 240",
      "BIOL 240L",
      "BIOL 241",
      "BIOL 331",
      "BIOL 342",
      "BIOL 432",
      "BIOL 439",
      "BIOL 443",
      "CHEM 121",
      "CHEM 121L",
      "CHEM 125",
      "CHEM 125L",
      "CHEM 140",
      "CHEM 200",
      "CHEM 214",
      "CHEM 220",
      "CHEM 220L",
      "CHEM 233",
      "CHEM 233L",
      "CHEM 257",
      "CHEM 264",
      "CHEM 265",
      "CHEM 265L",
      "CHEM 331",
      "CHEM 335L",
      "MATH 127",
      "MATH 128",
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
        courses: ["CHEM 224L", "CHEM 360L"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["COMMST 193", "ENGL 193"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PHYS 111", "PHYS 121"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PHYS 112", "PHYS 122"]
      }
    ]
  }
];
