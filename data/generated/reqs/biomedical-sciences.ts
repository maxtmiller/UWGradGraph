// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const BIOMEDICAL_SCIENCES_REQS: RequirementGroup[] = [
  {
    title: "Elective Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "BIOL 403",
      "BIOL 414",
      "BIOL 434",
      "BIOL 439",
      "BIOL 441",
      "BIOL 442",
      "BIOL 444",
      "BIOL 449",
      "BIOL 465",
      "BIOL 469",
      "BIOL 472",
      "BIOL 473",
      "BIOL 476",
      "BIOL 499A",
      "BIOL 499B"
    ]
  },
  {
    title: "Elective Courses — Additional",
    type: "complex",
    color: "#38BDF8",
    courses: [],
    subGroups: [
      {
        type: "at-least",
        count: 2,
        courses: ["BIOL 331", "BIOL 335L", "BIOL 341", "BIOL 348L", "BIOL 354", "BIOL 355", "BIOL 359", "BIOL 361", "BIOL 365", "GERON 355"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ANTH 204", "ANTH 222", "CS 200", "ENGL 209", "GERON 220", "GSJ 232", "HIST 209", "HLTH 101", "HLTH 102", "HLTH 220", "HLTH 340", "HLTH 341", "KIN 301", "KIN 308", "KIN 312", "KIN 343", "KIN 407", "LS 226", "MATH 128", "PSYCH 101", "PSYCH 101R", "PSYCH 261", "SDS 150R", "SOC 101", "SOC 101R", "SOC 248", "SOC 249"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["ARBUS 202", "INDEV 300", "PHIL 121", "PHIL 215", "PHIL 218J", "PHIL 219J", "PHIL 221", "PHIL 224", "PHIL 226", "PHIL 227", "PHIL 319J", "PHIL 321J"]
      }
    ]
  }
];
