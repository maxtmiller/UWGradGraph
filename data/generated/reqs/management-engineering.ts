// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const MANAGEMENT_ENGINEERING_REQS: RequirementGroup[] = [
  {
    title: "Core Requirements",
    type: "required",
    color: "#A855F7",
    core: true,
    courses: [
      "CHE 102",
      "MATH 115",
      "MATH 116",
      "MSE 100",
      "MSE 121",
      "GENE 123",
      "MATH 118",
      "MSE 100B",
      "MSE 131",
      "PHYS 115",
      "COMMST 192",
      "UCR 192E",
      "MSE 200A",
      "MSE 240",
      "MSE 251",
      "MSE 261",
      "MSE 271",
      "MSE 200B",
      "MSE 232",
      "MSE 245",
      "MSE 253",
      "MSE 263",
      "MSE 211",
      "MSE 300A",
      "MSE 334",
      "MSE 342",
      "MSE 431",
      "MSE 446",
      "MSE 300B",
      "MSE 302",
      "MSE 332",
      "MSE 333",
      "MSE 343",
      "MSE 400A",
      "MSE 434",
      "GENE 403",
      "MSE 401",
      "MSE 311",
      "MSE 400B",
      "GENE 404",
      "MSE 402"
    ]
  },
  {
    title: "Natural Science List",
    type: "complex",
    color: "#EC4899",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 3,
        courses: ["BIOL 110", "BIOL 130", "BIOL 150", "BIOL 165", "BIOL 211", "BIOL 220", "BIOL 239", "BIOL 240", "BIOL 273", "CHE 161", "CHEM 262", "EARTH 121", "EARTH 122", "EARTH 123", "EARTH 221", "ENVS 200", "PHYS 112", "PHYS 122", "PHYS 175", "PHYS 223", "PHYS 233", "PHYS 275", "PSYCH 207", "PSYCH 261", "SCI 238", "SCI 250"]
      }
    ]
  },
  {
    title: "Technical Electives List",
    type: "required",
    color: "#38BDF8",
    core: true,
    courses: [
      "CIVE 343",
      "CIVE 440",
      "ECE 252",
      "ECE 358",
      "ECE 406",
      "ECE 451",
      "ECE 452",
      "ECE 453",
      "ECE 454",
      "ECE 457A",
      "ECE 457C",
      "ECE 458",
      "ECE 459",
      "MTE 241",
      "SE 463",
      "SE 464",
      "SE 465",
      "STAT 331",
      "STAT 341",
      "STAT 435",
      "STAT 440",
      "STAT 443",
      "STAT 444",
      "SYDE 535",
      "SYDE 542",
      "SYDE 543",
      "SYDE 548",
      "SYDE 552",
      "SYDE 572",
      "SYDE 577"
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
        count: 4,
        courses: ["MSE 433", "MSE 435", "MSE 436", "MSE 452", "MSE 531", "MSE 541", "MSE 543", "MSE 546", "MSE 551", "MSE 555", "MSE 598"]
      }
    ]
  }
];
