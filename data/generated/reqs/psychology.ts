// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const PSYCHOLOGY_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "PSYCH 207",
      "PSYCH 211",
      "PSYCH 238",
      "PSYCH 261",
      "PSYCH 291",
      "PSYCH 292"
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
        courses: ["PSYCH 101", "PSYCH 101R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 253", "PSYCH 253R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 257", "PSYCH 257R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 420", "PSYCH 451", "PSYCH 453", "PSYCH 454", "PSYCH 457", "PSYCH 458", "PSYCH 459", "PSYCH 461", "PSYCH 462", "PSYCH 463", "PSYCH 470", "PSYCH 485"]
      }
    ]
  }
];
