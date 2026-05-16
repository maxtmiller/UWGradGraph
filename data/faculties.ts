import type { Faculty, FacultyId, FacultyMap } from "@/types";

export const FACULTIES: FacultyMap = {
  mathematics: {
    id:          "mathematics",
    name:        "Faculty of Mathematics",
    shortName:   "Mathematics",
    color:       "#FFD54F",
    description: "Canada's largest math and CS education centre — CS, Data Science, and 15+ Mathematics specializations.",
    subjects:    "CS · MATH · STAT · CO · PMATH",
    majorIds:    ["cs", "ds", "math"],
  },
  engineering: {
    id:          "engineering",
    name:        "Faculty of Engineering",
    shortName:   "Engineering",
    color:       "#A855F7",
    description: "Software design, reliability, and engineering process. Joint program with the Faculty of Mathematics.",
    subjects:    "CS · ECE · SE · MATH",
    majorIds:    ["se"],
  },
};

export const FACULTY_LIST: Faculty[] = Object.values(FACULTIES);
export const DEFAULT_FACULTY_ID: FacultyId = "mathematics";
