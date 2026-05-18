// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const SUSTAINABILITY_AND_FINANCIAL_MANAGEMENT_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "AFM 111",
      "AFM 112",
      "AFM 113",
      "AFM 121",
      "AFM 182",
      "AFM 191",
      "AFM 205",
      "AFM 208",
      "AFM 244",
      "AFM 273",
      "AFM 274",
      "AFM 291",
      "AFM 335",
      "AFM 373",
      "AFM 391",
      "ENBUS 103",
      "ENBUS 104",
      "ENVS 195",
      "ENVS 200",
      "SFM 101",
      "SFM 201",
      "SFM 205",
      "SFM 301",
      "SFM 309"
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
        courses: ["AFM 433", "ENBUS 302"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GEOG 207", "SCI 205"]
      }
    ]
  }
];
