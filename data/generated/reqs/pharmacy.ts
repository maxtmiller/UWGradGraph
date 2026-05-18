// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const PHARMACY_REQS: RequirementGroup[] = [
  {
    title: "Year One",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "PHARM 110",
      "PHARM 120",
      "PHARM 124",
      "PHARM 126",
      "PHARM 127",
      "PHARM 129",
      "PHARM 111",
      "PHARM 125",
      "PHARM 130",
      "PHARM 141",
      "PHARM 151",
      "PHARM 155"
    ]
  },
  {
    title: "Year Two",
    type: "required",
    color: "#38BDF8",
    core: true,
    courses: [
      "PHARM 220",
      "PHARM 221",
      "PHARM 224",
      "PHARM 228",
      "PHARM 230",
      "PHARM 232",
      "PHARM 222",
      "PHARM 223",
      "PHARM 226",
      "PHARM 229",
      "PHARM 290"
    ]
  },
  {
    title: "Year Three",
    type: "required",
    color: "#FCD34D",
    core: true,
    courses: [
      "PHARM 320",
      "PHARM 321",
      "PHARM 326",
      "PHARM 329",
      "PHARM 391"
    ]
  },
  {
    title: "Year Three — Additional",
    type: "complex",
    color: "#81C784",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 2,
        courses: ["PHARM 323", "PHARM 324", "PHARM 330", "PHARM 392"]
      }
    ]
  },
  {
    title: "Year Four",
    type: "required",
    color: "#4DB6AC",
    core: true,
    courses: [
      "PHARM 422",
      "PHARM 425",
      "PHARM 430",
      "PHARM 440",
      "PHARM 450",
      "PHARM 491"
    ]
  }
];
