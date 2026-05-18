// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const FINE_ARTS_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "FINE 100",
      "FINE 327",
      "FINE 407",
      "FINE 472",
      "FINE 473",
      "VCULT 101",
      "VCULT 209",
      "VCULT 319",
      "FINE 309",
      "FINE 312",
      "FINE 315"
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
        count: 4,
        courses: ["FINE 202", "FINE 204", "FINE 220", "FINE 221", "FINE 222", "FINE 223", "FINE 224", "FINE 225", "FINE 226", "FINE 227", "FINE 228", "FINE 230", "FINE 231", "FINE 232", "FINE 243", "FINE 246", "FINE 247", "FINE 271", "FINE 272", "VCULT 293"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["FINE 309", "FINE 312", "FINE 315"]
      }
    ]
  }
];
