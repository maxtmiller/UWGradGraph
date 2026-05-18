// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const CHEMICAL_ENGINEERING_REQS: RequirementGroup[] = [
  {
    title: "Core Requirements",
    type: "required",
    color: "#A855F7",
    core: true,
    courses: [
      "CHE 100",
      "CHE 102",
      "CHE 120",
      "CHE 180",
      "MATH 115",
      "MATH 116",
      "CHE 101",
      "CHE 161",
      "CHE 181",
      "CHE 191",
      "MATH 118",
      "PHYS 115",
      "CHE 200",
      "CHE 220",
      "CHE 230",
      "CHE 290",
      "CHEM 262",
      "CHEM 262L",
      "MATH 217",
      "CHE 211",
      "CHE 225",
      "CHE 241",
      "CHE 291",
      "MATH 218",
      "CHE 312",
      "CHE 314",
      "CHE 322",
      "CHE 330",
      "CHE 380",
      "CHE 390",
      "CHE 313",
      "CHE 331",
      "CHE 341",
      "CHE 361",
      "CHE 383",
      "CHE 450",
      "CHE 480",
      "CHE 490",
      "CHE 482",
      "GENE 403",
      "CHE 491",
      "CHE 483",
      "GENE 404"
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
        courses: ["ARBUS 202", "PHIL 215", "PHIL 219J", "PHIL 315"]
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
        count: 2,
        courses: ["CHE 500", "CHE 514", "CHE 516", "CHE 520", "CHE 521", "CHE 522", "CHE 523", "CHE 524", "CHE 541", "CHE 543", "CHE 560", "CHE 561", "CHE 562", "CHE 564", "CHE 565", "CHE 571", "CHE 572", "CHE 574"]
      },
      {
        type: "at-least",
        count: 2,
        courses: ["CHE 499", "EARTH 456", "EARTH 458", "EARTH 459", "ENVE 376", "ENVE 573", "ENVE 577", "ME 362", "ME 435", "ME 452", "ME 459", "ME 531", "ME 533", "ME 559", "ME 566", "ME 571", "MSE 332", "MSE 431", "MSE 432", "MSE 551", "NE 352", "NE 451", "SYDE 531"]
      }
    ]
  }
];
