// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const ARCHITECTURAL_ENGINEERING_REQS: RequirementGroup[] = [
  {
    title: "Core Requirements",
    type: "required",
    color: "#A855F7",
    core: true,
    courses: [
      "AE 100",
      "AE 101",
      "AE 104",
      "AE 115",
      "CHE 102",
      "MATH 116",
      "AE 105",
      "AE 121",
      "AE 125",
      "AE 199",
      "MATH 118",
      "AE 123",
      "AE 200",
      "AE 204",
      "AE 221",
      "AE 224",
      "AE 280",
      "AE 298",
      "COMMST 191",
      "AE 205",
      "AE 223",
      "AE 225",
      "AE 265",
      "AE 299",
      "AE 279",
      "AE 300",
      "AE 353",
      "AE 377",
      "AE 398",
      "AE 311",
      "AE 303",
      "AE 325",
      "AE 399",
      "AE 392",
      "AE 400",
      "AE 491",
      "AE 498",
      "AE 425",
      "AE 499"
    ]
  },
  {
    title: "Natural Science List",
    type: "complex",
    color: "#EC4899",
    courses: [],
    subGroups: [
      {
        type: "at-most",
        count: 1,
        courses: ["BIOL 130", "BIOL 150", "BIOL 240", "BIOL 273", "CHE 161", "CHEM 209", "CHEM 262", "EARTH 221", "EARTH 270", "EARTH 281", "ENVS 200", "SCI 206", "SCI 207", "SCI 238", "SCI 250"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["KIN 100", "KIN 100L"]
      }
    ]
  },
  {
    title: "Technical Electives List",
    type: "required",
    color: "#38BDF8",
    core: true,
    courses: [
      "AE 497",
      "CIVE 422",
      "CIVE 484",
      "CIVE 497",
      "CIVE 505",
      "PLAN 484"
    ]
  },
  {
    title: "Technical Electives List — Additional",
    type: "complex",
    color: "#FCD34D",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 3,
        courses: ["AE 301", "AE 315", "AE 405", "AE 450", "AE 495", "AE 572", "AE 573", "ARCH 570", "CIVE 332", "ME 436", "ME 452", "ME 567", "ME 572", "ME 573", "SYDE 532"]
      },
      {
        type: "at-least",
        count: 2,
        courses: ["ARCH 463", "CIVE 413", "CIVE 414", "CIVE 415", "CIVE 460", "CIVE 495", "CIVE 512", "CIVE 596", "ME 574"]
      }
    ]
  }
];
