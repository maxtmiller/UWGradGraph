// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const MEDICINAL_CHEMISTRY_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "BIOL 130",
      "CHEM 121",
      "CHEM 121L",
      "CHEM 125",
      "CHEM 125L",
      "CHEM 140",
      "CHEM 200",
      "CHEM 212",
      "CHEM 220",
      "CHEM 220L",
      "CHEM 221",
      "CHEM 224L",
      "CHEM 233",
      "CHEM 240",
      "CHEM 250L",
      "CHEM 257",
      "CHEM 264",
      "CHEM 265",
      "CHEM 265L",
      "CHEM 310",
      "CHEM 331",
      "CHEM 340L",
      "CHEM 360",
      "CHEM 360L",
      "CHEM 381",
      "CHEM 382L",
      "CHEM 383",
      "CHEM 464",
      "CHEM 494A",
      "CHEM 494B",
      "MATH 127",
      "MATH 128"
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
