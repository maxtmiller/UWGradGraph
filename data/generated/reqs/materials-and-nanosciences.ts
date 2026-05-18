// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const MATERIALS_AND_NANOSCIENCES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "CHEM 121",
      "CHEM 121L",
      "CHEM 125",
      "CHEM 125L",
      "CHEM 140",
      "CHEM 250L",
      "CHEM 254",
      "CHEM 266L",
      "CHEM 356",
      "CS 114",
      "MATH 127",
      "MATH 128",
      "MATH 227",
      "MATH 228",
      "MNS 101",
      "MNS 102",
      "MNS 201L",
      "MNS 211",
      "MNS 221",
      "MNS 321",
      "MNS 322",
      "MNS 331",
      "MNS 410",
      "MNS 431",
      "PHYS 121",
      "PHYS 121L",
      "PHYS 122",
      "PHYS 122L",
      "PHYS 242",
      "PHYS 249",
      "PHYS 260A",
      "PHYS 334"
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
        courses: ["CHEM 264", "CHEM 266"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CHEM 350", "PHYS 359"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["COMMST 193", "ENGL 193"]
      }
    ]
  }
];
