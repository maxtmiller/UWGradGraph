// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const PUBLIC_HEALTH_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "HEALTH 107",
      "HEALTH 150",
      "HLTH 101",
      "HLTH 102",
      "HLTH 103",
      "HLTH 104",
      "HLTH 202",
      "HLTH 204",
      "HLTH 205",
      "HLTH 230",
      "HLTH 301",
      "HLTH 303",
      "HLTH 333",
      "HLTH 355",
      "HLTH 370",
      "HLTH 410"
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
        courses: ["ENGL 109", "ENGL 140R", "ENGL 210C", "ENGL 210E", "ENGL 210F", "ENGL 210G", "ENGL 210H", "ENGL 210I", "ENGL 210J"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GERON 201", "HLTH 201"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GERON 220", "HLTH 220"]
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
        courses: ["GSJ 380", "HLTH 380"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["GSJ 401", "HLTH 401"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["HLTH 335", "STAT 316"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["HLTH 344", "HLTH 350", "HLTH 433", "HLTH 435", "HLTH 442", "HLTH 443", "HLTH 451", "HLTH 453", "HLTH 455", "HLTH 458", "HLTH 475"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["HLTH 403", "HLTH 421", "HLTH 427", "HLTH 430", "HLTH 432A", "HLTH 432B", "HLTH 448", "HLTH 449", "HLTH 450", "HLTH 454", "HLTH 472", "HLTH 474", "HLTH 479", "HLTH 481"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["PSYCH 101", "PSYCH 101R"]
      }
    ]
  }
];
