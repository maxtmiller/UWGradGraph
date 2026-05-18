// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const ECONOMICS_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "ECON 101",
      "ECON 102",
      "ECON 211",
      "ECON 221",
      "ECON 290",
      "ECON 306",
      "ECON 322",
      "ECON 323",
      "ECON 391",
      "ECON 393"
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
        courses: ["ECON 406", "ECON 407", "ECON 408", "ECON 409"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ECON 201"]
      }
    ]
  }
];
