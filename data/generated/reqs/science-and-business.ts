// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const SCIENCE_AND_BUSINESS_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "BIOL 130",
      "BIOL 235",
      "BIOL 239",
      "BIOL 331",
      "CHEM 120",
      "CHEM 120L",
      "CHEM 123",
      "CHEM 123L",
      "CHEM 237",
      "CHEM 237L",
      "CHEM 333",
      "CS 100",
      "ECON 101",
      "ECON 102",
      "ECON 221",
      "ECON 371",
      "MATH 127",
      "MGMT 220",
      "SCBUS 122",
      "SCBUS 123",
      "SCBUS 223",
      "SCBUS 225",
      "SCBUS 323",
      "SCBUS 423",
      "CHEM 264",
      "CHEM 265",
      "CHEM 265L",
      "CHEM 266",
      "CHEM 266L",
      "CHEM 267"
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
        courses: ["AFM 123", "ARBUS 102"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AFM 131", "ARBUS 101"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["AFM 231", "LS 283"]
      },
      {
        type: "at-least",
        count: 5,
        courses: ["BIOL 308", "BIOL 341", "BIOL 342", "BIOL 345", "BIOL 365", "BIOL 370", "BIOL 371", "BIOL 403", "BIOL 431", "BIOL 432", "BIOL 434", "BIOL 439", "BIOL 441", "BIOL 442", "BIOL 447", "CHEM 430", "CHEM 432", "CHEM 433", "CHEM 464"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["COMMST 193", "ENGL 193"]
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
        courses: ["ACTSC 231", "AFM 333", "ARBUS 301", "BET 300", "ECON 211", "ECON 311", "ECON 361", "ECON 372", "HRM 200", "HRM 301", "INDEV 100", "MSE 311", "MSE 432", "STAT 231", "STAT 333"]
      }
    ]
  }
];
