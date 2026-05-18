// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const CHEMISTRY_REQS: RequirementGroup[] = [
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
      "CHEM 200",
      "CHEM 212",
      "CHEM 220",
      "CHEM 220L",
      "CHEM 221",
      "CHEM 233",
      "CHEM 240",
      "CHEM 250L",
      "CHEM 254",
      "CHEM 264",
      "CHEM 265",
      "CHEM 265L",
      "CHEM 313L",
      "CHEM 356",
      "MATH 127",
      "MATH 128",
      "CHEM 494A",
      "CHEM 494B"
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
        count: 2,
        courses: ["CHEM 224L", "CHEM 310L", "CHEM 340L", "CHEM 350L", "CHEM 360L"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CHEM 224L", "CHEM 310L", "CHEM 340L", "CHEM 350L", "CHEM 360L"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CHEM 310", "CHEM 313"]
      },
      {
        type: "at-least",
        count: 2,
        courses: ["CHEM 310", "CHEM 313", "CHEM 323", "CHEM 331", "CHEM 350", "CHEM 360", "CHEM 370"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["COMMST 193", "ENGL 193"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PHYS 111", "PHYS 121"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PHYS 112", "PHYS 122"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CHEM 266", "CHEM 266L", "CHEM 267", "CHEM 267L"]
      }
    ]
  },
  {
    title: "Approved Courses List",
    type: "complex",
    color: "#FCD34D",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 2,
        courses: ["CHEM 209", "CHEM 224L", "CHEM 310", "CHEM 310L", "CHEM 313", "CHEM 323", "CHEM 331", "CHEM 333", "CHEM 340L", "CHEM 350", "CHEM 350L", "CHEM 357", "CHEM 360", "CHEM 360L", "CHEM 363", "CHEM 370", "CHEM 381", "CHEM 382L", "CHEM 383", "CHEM 400", "CHEM 404", "CHEM 430", "CHEM 432", "CHEM 433", "CHEM 464", "CHEM 481", "CHEM 494A", "CHEM 494B"]
      }
    ]
  }
];
