// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const RECREATION_LEADERSHIP_AND_HEALTH_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "ENVS 205",
      "HEALTH 107",
      "REC 100",
      "REC 101",
      "REC 120",
      "REC 201",
      "REC 215",
      "REC 219",
      "REC 230",
      "REC 280",
      "REC 256",
      "REC 318",
      "REC 356",
      "REC 371",
      "REC 373",
      "REC 405",
      "REC 420",
      "REC 456"
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
        courses: ["ENGL 210F", "ENGL 210G"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GSJ 260", "HLTH 260"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["LS 271", "PACS 202", "PACS 313"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSCI 100", "SDS 231R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 101", "PSYCH 101R"]
      }
    ]
  }
];
