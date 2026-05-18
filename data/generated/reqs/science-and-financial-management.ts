// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const SCIENCE_AND_FINANCIAL_MANAGEMENT_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "AFM 112",
      "AFM 113",
      "AFM 121",
      "AFM 182",
      "AFM 191",
      "AFM 273",
      "AFM 274",
      "AFM 285",
      "AFM 291",
      "AFM 321",
      "AFM 335",
      "AFM 373",
      "AFM 391",
      "AFM 433",
      "ECON 101",
      "ECON 102",
      "SCBUS 122",
      "SCBUS 225"
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
        count: 2,
        courses: ["AFM 205", "AFM 206", "AFM 207", "AFM 208"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AFM 323", "AFM 341", "AFM 345", "AFM 346", "STAT 374"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["COMMST 193", "ENGL 193"]
      }
    ]
  }
];
