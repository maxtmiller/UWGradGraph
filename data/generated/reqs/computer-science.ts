// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const COMPUTER_SCIENCE_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "CS 136L",
      "CS 341",
      "CS 350"
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
        courses: ["CS 115", "CS 135", "CS 145"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 136", "CS 146"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 240", "CS 240E"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 241", "CS 241E"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 245", "CS 245E"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 246", "CS 246E"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 251", "CS 251E"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 127", "MATH 137", "MATH 147"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 128", "MATH 138", "MATH 148"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 135", "MATH 145"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 136", "MATH 146"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 239", "MATH 249"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["STAT 230", "STAT 240"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["STAT 231", "STAT 241"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CO 487", "CS 499T", "STAT 440"]
      }
    ]
  }
];
