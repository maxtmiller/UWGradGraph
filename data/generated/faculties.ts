// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { FacultyMap } from "@/types";

export const FACULTIES: FacultyMap = {
  "arts": {
    id:          "arts",
    name:        "Faculty of Arts",
    shortName:   "Arts",
    color:       "#F97316",
    description: "Faculty of Arts programs at the University of Waterloo.",
    subjects:    "ACTSC · AFM · ANTH · ARBUS · ARTS · BET · BLKST · CI",
    majorIds:    ["accounting-and-financial-management", "anthropology", "arts-and-business", "classical-studies", "classics", "communication-arts-and-design-practice", "communication-studies", "economics", "english", "fine-arts", "french", "gender-and-social-justice", "german", "global-business-and-digital-arts", "history", "legal-studies", "liberal-studies", "medieval-studies", "music", "peace-and-conflict-studies", "philosophy", "political-science", "psychology", "religion-culture-and-spirituality", "sexualities-relationships-and-families", "social-development-studies", "social-work", "sociology", "spanish", "theatre-and-performance", "visual-culture"],
  },
  "mathematics": {
    id:          "mathematics",
    name:        "Faculty of Mathematics",
    shortName:   "Mathematics",
    color:       "#FFD54F",
    description: "Faculty of Mathematics programs at the University of Waterloo.",
    subjects:    "ACTSC · AFM · AMATH · ARBUS · BIOL · BUS · CFM · CO",
    majorIds:    ["mathematics", "computer-science", "computing-and-financial-management", "data-science"],
  },
  "engineering": {
    id:          "engineering",
    name:        "Faculty of Engineering",
    shortName:   "Engineering",
    color:       "#A855F7",
    description: "Faculty of Engineering programs at the University of Waterloo.",
    subjects:    "ACTSC · AE · AMATH · ARBUS · ARCH · BIOL · BME · CHE",
    majorIds:    ["architectural-engineering", "architectural-studies", "biomedical-engineering", "chemical-engineering", "civil-engineering", "computer-engineering", "electrical-engineering", "environmental-engineering", "geological-engineering", "management-engineering", "mechanical-engineering", "mechatronics-engineering", "nanotechnology-engineering", "software-engineering", "systems-design-engineering"],
  },
  "science": {
    id:          "science",
    name:        "Faculty of Science",
    shortName:   "Science",
    color:       "#4ADE80",
    description: "Faculty of Science programs at the University of Waterloo.",
    subjects:    "ACTSC · AFM · AMATH · ANTH · ARBUS · AVIA · BET · BIOL",
    majorIds:    ["biochemistry", "biological-and-medical-physics", "biology", "biomedical-sciences", "chemistry", "earth-sciences", "environmental-sciences", "materials-and-nanosciences", "mathematical-physics-science", "medical-sciences", "medicinal-chemistry", "optometry", "pharmacy", "physics", "physics-and-astronomy", "psychology-science", "science", "science-and-aviation", "science-and-business", "science-and-financial-management"],
  },
  "environment": {
    id:          "environment",
    name:        "Faculty of Environment",
    shortName:   "Environment",
    color:       "#34D399",
    description: "Faculty of Environment programs at the University of Waterloo.",
    subjects:    "AFM · ARBUS · AVIA · BIOL · CHEM · COMMST · CS · EARTH",
    majorIds:    ["climate-and-environmental-change", "environment-and-business", "environment-resources-and-sustainability", "geography-and-aviation", "geography-and-environmental-management", "geospatial-data-science", "international-development", "knowledge-integration", "planning", "sustainability-and-financial-management"],
  },
  "health": {
    id:          "health",
    name:        "Faculty of Health",
    shortName:   "Health",
    color:       "#60A5FA",
    description: "Faculty of Health programs at the University of Waterloo.",
    subjects:    "AFM · ARBUS · BET · BIOL · BUS · CHEM · ENGL · ENVS",
    majorIds:    ["health-sciences", "kinesiology", "public-health", "recreation-and-leisure-studies", "recreation-leadership-and-health", "sport-and-recreation-management", "therapeutic-recreation"],
  }
};

export const FACULTY_LIST = Object.values(FACULTIES);
export const DEFAULT_FACULTY_ID = "arts";
