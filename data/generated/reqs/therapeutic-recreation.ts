// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const THERAPEUTIC_RECREATION_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "HEALTH 107",
      "HEALTH 150",
      "REC 100",
      "REC 101",
      "REC 120",
      "REC 151",
      "REC 201",
      "REC 251",
      "REC 252",
      "REC 253",
      "REC 351",
      "REC 357",
      "REC 371",
      "REC 373",
      "REC 405",
      "REC 420",
      "REC 450",
      "REC 455"
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
        courses: ["GERON 245", "HLTH 245"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 101", "PSYCH 101R"]
      }
    ]
  }
];
