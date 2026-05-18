// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const HEALTH_SCIENCES_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "BIOL 130",
      "BIOL 130L",
      "BIOL 239",
      "BIOL 273",
      "BIOL 373",
      "CHEM 120",
      "CHEM 120L",
      "CHEM 123",
      "CHEM 123L",
      "HEALTH 107",
      "HLTH 101",
      "HLTH 102",
      "HLTH 104",
      "HLTH 204",
      "HLTH 205",
      "HLTH 217",
      "HLTH 230",
      "HLTH 333",
      "HLTH 340",
      "HLTH 341",
      "HLTH 370",
      "HLTH 410",
      "HLTH 480"
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
        courses: ["GERON 201", "HLTH 201"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GERON 245", "HLTH 245"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GSJ 260", "HLTH 260"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GERON 310", "HLTH 310", "KIN 310"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GSJ 380", "HLTH 380"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["BIOL 201", "BIOL 240", "BIOL 302", "BIOL 308", "BIOL 355", "BIOL 376", "BIOL 403", "BIOL 473", "HLTH 290", "HLTH 358", "HLTH 421", "HLTH 430", "HLTH 458", "HLTH 461", "HLTH 465", "HLTH 471", "KIN 100", "KIN 146", "KIN 308", "KIN 312", "KIN 343", "KIN 404", "KIN 406"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["HLTH 303", "HLTH 344", "HLTH 350", "HLTH 433", "HLTH 435", "HLTH 442", "HLTH 443", "HLTH 451", "HLTH 453", "HLTH 455", "HLTH 458", "HLTH 461", "HLTH 475"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["HLTH 335", "STAT 316"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 101", "PSYCH 101R"]
      }
    ]
  }
];
