// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const ARTS_AND_BUSINESS_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "ARBUS 200",
      "ARBUS 300",
      "ARBUS 400",
      "COMMST 204",
      "ECON 101",
      "ENGL 210F"
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
        courses: ["AFM 131", "ARBUS 101"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AFM 333", "ARBUS 301"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ARBUS 202", "PHIL 215"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ARBUS 302", "MGMT 244"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ARBUS 303", "MGMT 345"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ARTS 280", "ECON 221", "LS 280", "PSCI 314", "PSYCH 292", "SDS 250R", "SOC 280", "SRF 230"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["HIST 113", "PSCI 231"]
      }
    ]
  }
];
