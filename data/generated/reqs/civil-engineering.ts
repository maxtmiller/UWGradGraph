// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const CIVIL_ENGINEERING_REQS: RequirementGroup[] = [
  {
    title: "Core Requirements",
    type: "required",
    color: "#A855F7",
    core: true,
    courses: [
      "CHE 102",
      "CIVE 100",
      "CIVE 104",
      "MATH 116",
      "CIVE 115",
      "COMMST 191",
      "CIVE 105",
      "CIVE 199",
      "MATH 118",
      "AE 123",
      "CIVE 121",
      "CIVE 153",
      "CIVE 204",
      "CIVE 224",
      "CIVE 241",
      "CIVE 265",
      "CIVE 298",
      "CIVE 221",
      "CIVE 205",
      "CIVE 222",
      "CIVE 230",
      "CIVE 280",
      "CIVE 299",
      "AE 392",
      "CIVE 332",
      "CIVE 341",
      "CIVE 398",
      "AE 311",
      "CIVE 353",
      "CIVE 382",
      "CIVE 303",
      "CIVE 375",
      "CIVE 399",
      "CIVE 400",
      "CIVE 491",
      "CIVE 498",
      "CIVE 401",
      "CIVE 499"
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
      "BIOL 462",
      "CIVE 306",
      "CIVE 422",
      "CIVE 440",
      "CIVE 484",
      "CIVE 497",
      "CIVE 505",
      "CIVE 507",
      "EARTH 444",
      "EARTH 458",
      "ENVE 277",
      "ENVE 279",
      "ENVE 376",
      "ENVE 383",
      "ENVE 417",
      "ENVE 418",
      "ENVE 573",
      "ME 559",
      "GDS 371",
      "GDS 381",
      "GEOG 209",
      "GEOG 305",
      "GEOG 402",
      "GEOG 453",
      "PLAN 381",
      "PLAN 416",
      "PLAN 453",
      "PLAN 477",
      "PLAN 478",
      "PLAN 483",
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
        courses: ["AE 450", "AE 572", "AE 573", "AE 585", "CIVE 343", "CIVE 354", "CIVE 413", "CIVE 414", "CIVE 415", "CIVE 460", "CIVE 495", "CIVE 512", "CIVE 517", "CIVE 542", "CIVE 554", "CIVE 583", "CIVE 596", "EARTH 438", "ENVE 481", "ENVE 577", "ENVE 583", "ENVE 585", "GEOE 354", "GEOE 554", "ME 572", "ME 573", "ME 574", "SYDE 533"]
      }
    ]
  }
];
