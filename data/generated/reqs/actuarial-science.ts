// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const ACTUARIAL_SCIENCE_REQS: RequirementGroup[] = [
  {
    title: "BMath Core — Required Courses",
    type: "complex",
    color: "#EC4899",
    core: true,
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
        courses: ["CS 116", "CS 136", "CS 146"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 106", "MATH 136", "MATH 146"]
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
        courses: ["MATH 207", "MATH 229", "MATH 237", "MATH 239", "MATH 247", "MATH 249"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 245", "CS 245E", "MATH 225", "MATH 235", "MATH 245"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["STAT 220", "STAT 230", "STAT 240"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["STAT 221", "STAT 231", "STAT 241"]
      }
    ]
  },
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "ACTSC 231",
      "ACTSC 232",
      "ACTSC 331",
      "ACTSC 363",
      "ACTSC 372",
      "ACTSC 431",
      "ACTSC 446",
      "AFM 101",
      "ECON 101",
      "ECON 102",
      "ENGL 378",
      "MTHEL 131",
      "STAT 330",
      "STAT 331",
      "STAT 333",
      "STAT 341"
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
        courses: ["AMATH 250", "AMATH 251", "AMATH 350"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 237", "MATH 247"]
      },
      {
        type: "at-least",
        count: 2,
        courses: ["AFM 424", "STAT 431", "STAT 433", "STAT 440", "STAT 441", "STAT 443", "STAT 444"]
      }
    ]
  }
];
