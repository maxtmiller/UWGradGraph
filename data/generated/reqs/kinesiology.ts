// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const KINESIOLOGY_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "BIOL 130",
      "BIOL 273",
      "CHEM 120",
      "HEALTH 107",
      "KIN 100",
      "KIN 100L",
      "KIN 104",
      "KIN 104L",
      "KIN 120",
      "KIN 121",
      "KIN 121L",
      "KIN 146",
      "KIN 202",
      "KIN 202L",
      "KIN 204",
      "KIN 204L",
      "KIN 217",
      "KIN 221",
      "KIN 221L",
      "KIN 232",
      "KIN 255",
      "KIN 255L",
      "PHYS 111"
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
        courses: ["KIN 432", "KIN 470"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 101", "PSYCH 101R"]
      }
    ]
  }
];
