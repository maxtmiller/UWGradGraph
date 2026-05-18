// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const BIOLOGICAL_AND_MEDICAL_PHYSICS_REQS: RequirementGroup[] = [
  {
    title: "Elective Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "PHYS 263",
      "PHYS 334",
      "PHYS 342",
      "PHYS 349",
      "PHYS 457",
      "PHYS 483"
    ]
  },
  {
    title: "Elective Courses — Additional",
    type: "complex",
    color: "#38BDF8",
    courses: [],
    subGroups: [
      {
        type: "at-most",
        count: 1,
        courses: ["AMATH 382", "BIOL 201", "BIOL 239", "BIOL 240", "BIOL 240L", "BIOL 266", "BIOL 273", "BIOL 308", "BIOL 373", "BIOL 373L", "BIOL 382"]
      }
    ]
  }
];
