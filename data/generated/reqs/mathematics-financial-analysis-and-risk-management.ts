// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const MATHEMATICS_FINANCIAL_ANALYSIS_AND_RISK_MANAGEMENT_REQS: RequirementGroup[] = [
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
      "ACTSC 372",
      "AFM 101",
      "AFM 102",
      "AFM 131",
      "AMATH 350",
      "CO 372",
      "COMM 101",
      "CS 330",
      "ECON 101",
      "ECON 102",
      "MATBUS 471",
      "STAT 371",
      "MATH 237",
      "MATH 247",
      "STAT 330",
      "STAT 333",
      "STAT 334"
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
        courses: ["ACTSC 446", "MATBUS 470"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AFM 231", "LS 283"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CO 250", "CO 255"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 335", "CS 476"]
      }
    ]
  }
];
