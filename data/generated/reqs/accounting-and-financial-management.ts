// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const ACCOUNTING_AND_FINANCIAL_MANAGEMENT_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "AFM 111",
      "AFM 112",
      "AFM 113",
      "AFM 132",
      "AFM 182",
      "AFM 191",
      "AFM 205",
      "AFM 206",
      "AFM 207",
      "AFM 208",
      "AFM 241",
      "AFM 244",
      "AFM 274",
      "AFM 285",
      "AFM 291",
      "AFM 321",
      "AFM 335",
      "AFM 373",
      "AFM 391",
      "AFM 433",
      "AFM 480",
      "BET 100",
      "COMMST 111",
      "ECON 101",
      "ECON 102"
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
        courses: ["ACTSC 127", "AFM 121", "AFM 127"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ACTSC 291", "AFM 272", "AFM 273"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AFM 311", "SFM 309"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AFM 323", "AFM 341", "AFM 345", "AFM 346", "STAT 374"]
      }
    ]
  }
];
