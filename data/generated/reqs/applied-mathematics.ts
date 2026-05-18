// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const APPLIED_MATHEMATICS_REQS: RequirementGroup[] = [
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
      "AMATH 231",
      "AMATH 342",
      "AMATH 353",
      "AMATH 271"
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
        courses: ["AMATH 242", "CS 371"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AMATH 250", "AMATH 251"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AMATH 333", "AMATH 343", "AMATH 345", "AMATH 361", "AMATH 362", "AMATH 373", "AMATH 382", "AMATH 383", "AMATH 390", "AMATH 391", "PMATH 343"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AMATH 331", "AMATH 332", "PMATH 331", "PMATH 332", "PMATH 333", "PMATH 351", "PMATH 352"]
      },
      {
        type: "at-least",
        count: 3,
        courses: ["AMATH 442", "AMATH 445", "AMATH 446", "AMATH 449", "AMATH 451", "AMATH 453", "AMATH 455", "AMATH 456", "AMATH 462", "AMATH 463", "AMATH 473", "AMATH 474", "AMATH 475", "AMATH 477", "AMATH 490", "AMATH 495", "AMATH 499", "CS 479"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["MATH 237", "MATH 247"]
      }
    ]
  }
];
