// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const SPORT_AND_RECREATION_MANAGEMENT_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "BET 100",
      "HEALTH 107",
      "HRM 200",
      "REC 100",
      "REC 101",
      "REC 120",
      "REC 201",
      "REC 213",
      "REC 215",
      "REC 219",
      "REC 313",
      "REC 371",
      "REC 373",
      "REC 405",
      "REC 413",
      "REC 420"
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
        courses: ["AFM 123", "ARBUS 102"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AFM 131", "ARBUS 101", "BUS 111W"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ARBUS 302", "BUS 252W", "MGMT 244"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["BUS 288W", "MSE 211", "PSYCH 238"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 101", "PSYCH 101R"]
      }
    ]
  }
];
