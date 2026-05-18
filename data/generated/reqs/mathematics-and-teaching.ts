// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const MATHEMATICS_AND_TEACHING_REQS: RequirementGroup[] = [
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
      "ACTSC 221",
      "CS 234",
      "MTHEL 206"
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
        courses: ["AMATH 250", "AMATH 251", "AMATH 343"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AMATH 331", "AMATH 332", "PMATH 331", "PMATH 332", "PMATH 333", "PMATH 351", "PMATH 352"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CO 250", "CO 255"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CO 380", "CO 480"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["CS 230", "CS 330", "CS 338", "CS 370", "CS 371", "CS 430", "CS 436"]
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
        courses: ["PMATH 320", "PMATH 321", "PMATH 330", "PMATH 340", "PMATH 432", "PMATH 440"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PMATH 334", "PMATH 336", "PMATH 347", "PMATH 348"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 101", "PSYCH 101R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 211", "PSYCH 212", "PSYCH 212R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["STAT 331", "STAT 332", "STAT 333"]
      }
    ]
  }
];
