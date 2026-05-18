// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const ENVIRONMENT_AND_BUSINESS_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "ENBUS 102",
      "ENBUS 103",
      "ENBUS 104",
      "ENBUS 112",
      "ENBUS 202",
      "ENBUS 203",
      "ENBUS 204",
      "ENBUS 211",
      "ENBUS 302",
      "ENBUS 306",
      "ENBUS 310",
      "ENVS 105",
      "ENVS 131",
      "ENVS 178",
      "ENVS 195",
      "ENVS 200",
      "ENVS 201",
      "ENVS 220",
      "ENVS 278",
      "ERS 215",
      "GEOG 202",
      "ENBUS 409A",
      "ENBUS 409B",
      "ENVS 403A",
      "ENVS 403B"
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
        type: "at-least",
        count: 2,
        courses: ["ARBUS 202", "ENBUS 304", "ENBUS 308", "ENBUS 309", "ENBUS 314", "ENBUS 315", "ENBUS 375", "HRM 200", "PHIL 215"]
      }
    ]
  }
];
