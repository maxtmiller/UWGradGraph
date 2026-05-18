// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const DATA_SCIENCE_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "CS 136L",
      "CS 341",
      "CS 348",
      "CS 350",
      "CS 451",
      "STAT 330",
      "STAT 331",
      "STAT 341",
      "CS 251",
      "CS 251E",
      "CS 480",
      "CS 448",
      "CS 454",
      "CS 484",
      "CS 485",
      "CS 486"
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
        courses: ["CS 448", "CS 454", "CS 480", "CS 484", "CS 485"]
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
        courses: ["MATH 235", "MATH 245"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 237", "MATH 247"]
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
        type: "at-least",
        count: 2,
        courses: ["STAT 431", "STAT 440", "STAT 441", "STAT 442", "STAT 443", "STAT 444"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CO 487", "CS 499T", "STAT 440"]
      }
    ]
  }
];
