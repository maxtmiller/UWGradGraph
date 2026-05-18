// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const ELECTRICAL_ENGINEERING_REQS: RequirementGroup[] = [
  {
    title: "Core Requirements",
    type: "required",
    color: "#A855F7",
    core: true,
    courses: [
      "ECE 105",
      "ECE 150",
      "ECE 190",
      "ECE 198",
      "MATH 115",
      "MATH 117",
      "COMMST 192",
      "ECE 102",
      "ECE 106",
      "ECE 108",
      "ECE 124",
      "ECE 140",
      "ECE 192",
      "MATH 119",
      "ECE 109",
      "ECE 201",
      "ECE 204",
      "ECE 222",
      "ECE 240",
      "ECE 250",
      "ECE 205",
      "MATH 211",
      "ECE 202",
      "ECE 203",
      "ECE 207",
      "ECE 231",
      "ECE 260",
      "ECE 298",
      "ECE 206",
      "MATH 212",
      "ECE 301",
      "ECE 318",
      "ECE 340",
      "ECE 375",
      "ECE 380",
      "ECE 302",
      "ECE 307",
      "ECE 401",
      "ECE 498A",
      "GENE 403",
      "ECE 402",
      "ECE 498B",
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
    title: "Natural Science List",
    type: "complex",
    color: "#38BDF8",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 2,
        courses: ["BIOL 110", "BIOL 130", "BIOL 130L", "BIOL 150", "BIOL 165", "BIOL 211", "BIOL 220", "BIOL 239", "BIOL 240", "BIOL 240L", "BIOL 241", "BIOL 273", "BIOL 280", "BIOL 373", "BIOL 373L", "CHE 102", "CHE 161", "CHEM 123", "CHEM 123L", "CHEM 209", "CHEM 237", "CHEM 237L", "CHEM 254", "CHEM 262", "CHEM 262L", "CHEM 266", "CHEM 356", "EARTH 121", "EARTH 122", "EARTH 123", "EARTH 221", "EARTH 270", "EARTH 281", "ECE 305", "ECE 403", "ECE 404", "ENVE 275", "ENVS 200", "NE 222", "PHYS 233", "PHYS 234", "PHYS 263", "PHYS 275", "PHYS 280", "PHYS 334", "PHYS 375", "PHYS 380", "PSYCH 207", "PSYCH 261", "PSYCH 306", "SCI 238", "SCI 250"]
      }
    ]
  },
  {
    title: "Technical Electives List",
    type: "complex",
    color: "#FCD34D",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 2,
        courses: ["ECE 313", "ECE 331", "ECE 360", "ECE 373"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ECE 320", "ECE 351", "ECE 356", "ECE 358"]
      },
      {
        type: "at-least",
        count: 3,
        courses: ["ECE 406", "ECE 407", "ECE 409", "ECE 414", "ECE 416", "ECE 417", "ECE 423", "ECE 432", "ECE 433", "ECE 444", "ECE 445", "ECE 451", "ECE 452", "ECE 453", "ECE 454", "ECE 455", "ECE 457A", "ECE 457B", "ECE 457C", "ECE 457D", "ECE 458", "ECE 459", "ECE 462", "ECE 463", "ECE 464", "ECE 467", "ECE 474", "ECE 475", "ECE 477", "ECE 481", "ECE 486", "ECE 487", "ECE 488", "ECE 493", "ECE 495", "ECE 499"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["BME 411", "BME 522", "BME 581", "CHE 522", "CHE 524", "ME 351", "ME 459", "ME 547", "MSE 331", "MSE 431", "MSE 432", "MSE 435", "MSE 446", "MSE 452", "MSE 541", "MSE 546", "MTE 544", "NE 345", "SYDE 411", "SYDE 522", "SYDE 531", "SYDE 542", "SYDE 544", "SYDE 552", "SYDE 556", "SYDE 572", "SYDE 575"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ACTSC 446", "CO 250", "CO 342", "CO 456", "CO 463", "CO 466", "CS 343", "CS 349", "CS 442", "CS 448", "CS 452", "CS 480", "CS 484", "CS 485", "CS 486", "CS 488", "ECE 224", "ECE 252", "ECE 327", "ECE 350", "STAT 340", "STAT 341", "STAT 440", "STAT 441", "STAT 444"]
      }
    ]
  }
];
