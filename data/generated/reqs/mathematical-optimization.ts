// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const MATHEMATICAL_OPTIMIZATION_REQS: RequirementGroup[] = [
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
    type: "complex",
    color: "#EC4899",
    courses: [],
    subGroups: [
      {
        type: "at-most",
        count: 1,
        courses: ["AFM 101", "CO 370", "ECON 101", "MSE 211", "STAT 340"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AMATH 242", "CS 370", "CS 371"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CO 250", "CO 255"]
      },
      {
        type: "at-least",
        count: 3,
        courses: ["CO 342", "CO 351", "CO 353", "CO 367", "CO 372", "CO 450", "CO 452", "CO 454", "CO 456", "CO 463", "CO 466", "CO 471"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 330", "CS 490"]
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
      }
    ]
  }
];
