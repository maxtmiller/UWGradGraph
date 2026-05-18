// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const SOCIAL_WORK_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "SWREN 411R",
      "SWREN 414R",
      "SWREN 422R",
      "SWREN 423R",
      "SWREN 424R",
      "SWREN 434R",
      "SWREN 470R",
      "SWREN 441R",
      "SWREN 442R",
      "SWREN 443R"
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
        courses: ["SWREN 431R", "SWREN 471R", "SWREN 472R", "SWREN 490R"]
      }
    ]
  }
];
