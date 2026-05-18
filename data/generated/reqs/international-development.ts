// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const INTERNATIONAL_DEVELOPMENT_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "ECON 101",
      "ECON 102",
      "ENBUS 309",
      "ENVS 105",
      "ENVS 178",
      "ENVS 195",
      "ENVS 278",
      "ERS 215",
      "ERS 315",
      "GEOG 101",
      "INDEV 100",
      "INDEV 101",
      "INDEV 200",
      "INDEV 202",
      "INDEV 212",
      "INDEV 302",
      "INDEV 308",
      "MSE 211",
      "PLAN 100"
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
        courses: ["GSJ 222", "INDEV 300", "INTEG 221", "PHIL 202", "PHIL 227", "PHIL 291"]
      }
    ]
  }
];
