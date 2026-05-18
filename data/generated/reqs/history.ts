// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { RequirementGroup } from "@/types";

export const HISTORY_REQS: RequirementGroup[] = [
  {
    title: "Required Courses",
    type: "required",
    color: "#EC4899",
    core: true,
    courses: [
      "HIST 250"
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
        courses: ["CLAS 210", "CLAS 251", "CLAS 252", "GSJ 347", "HIST 210", "HIST 236", "HIST 242", "HIST 252", "HIST 260", "HIST 262", "HIST 304", "HIST 317", "HIST 329", "HIST 347", "HIST 348", "HIST 379", "LS 236", "MEDVL 260", "MEDVL 304", "RCS 342", "RCS 343", "RCS 344", "SRF 317"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["EASIA 220R", "HIST 209", "HIST 221", "HIST 225", "HIST 226", "HIST 231R", "HIST 253", "HIST 254", "HIST 256", "HIST 269", "HIST 277", "HIST 324", "HIST 328", "HIST 342", "HIST 350", "HIST 351", "HIST 374", "HIST 389", "LS 237", "SDS 205R"]
      },
      {
        type: "at-most",
        count: 1,
        courses: ["HIST 228", "HIST 232", "HIST 235", "HIST 246", "HIST 268", "HIST 275", "HIST 276", "HIST 311", "HIST 312", "HIST 318", "HIST 321", "HIST 322", "HIST 323", "HIST 369", "LS 331", "PACS 203", "PSCI 369", "RCS 240", "SRF 318"]
      }
    ]
  }
];
