// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const MECHANICAL_ENGINEERING_REQS: RequirementGroup[] = [
  {
    title: "Core Requirements",
    type: "required",
    color: "#A855F7",
    core: true,
    courses: [
      "CHE 102",
      "MATH 115",
      "MATH 116",
      "ME 100",
      "MATH 118",
      "ME 100B",
      "ME 101",
      "ME 115",
      "ME 123",
      "ME 200A",
      "ME 201",
      "ME 202",
      "ME 219",
      "ME 230",
      "ME 269",
      "ME 200B",
      "ME 203",
      "ME 212",
      "ME 220",
      "ME 250",
      "ME 262",
      "ME 300A",
      "ME 303",
      "ME 321",
      "ME 340",
      "ME 351",
      "ME 354",
      "ME 300B",
      "ME 322",
      "ME 353",
      "ME 360",
      "ME 362",
      "ME 380",
      "MSE 261",
      "ME 400A",
      "GENE 403",
      "ME 481",
      "ME 400B",
      "GENE 404",
      "ME 482"
    ]
  },
  {
    title: "Ethics List",
    type: "complex",
    color: "#EC4899",
    courses: [],
    subGroups: [
      {
        type: "at-most",
        count: 1,
        courses: ["PHIL 315"]
      }
    ]
  },
  {
    title: "Technical Electives List",
    type: "complex",
    color: "#38BDF8",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 4,
        courses: ["AE 572", "AE 573", "CIVE 460", "ECE 481", "ECE 484", "ECE 486", "ECE 488", "ME 423", "ME 435", "ME 436", "ME 452", "ME 456", "ME 459", "ME 524", "ME 526", "ME 531", "ME 533", "ME 535", "ME 538", "ME 540", "ME 547", "ME 548", "ME 555", "ME 557", "ME 559", "ME 561", "ME 562", "ME 563", "ME 564", "ME 566", "ME 567", "ME 571", "ME 572", "ME 573", "ME 574", "ME 595", "ME 596", "ME 597", "ME 598", "ME 599", "MTE 420", "MTE 421", "MTE 460", "MTE 484", "MTE 544", "MTE 545", "MTE 546", "SYDE 553"]
      },
      {
        type: "at-least",
        count: 2,
        courses: ["BME 522", "ECE 305", "ECE 406", "ECE 457A", "ECE 457B", "ECE 459", "ECE 495", "MSE 331", "MSE 431", "MSE 432", "MSE 446", "MSE 452", "MSE 551", "MSE 555", "SYDE 522", "SYDE 532", "SYDE 543", "SYDE 548", "SYDE 572", "SYDE 584"]
      }
    ]
  }
];
