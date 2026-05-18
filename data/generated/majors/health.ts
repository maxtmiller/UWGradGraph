// AUTO-GENERATED — do not edit by hand.
// Run `npm run refresh-courses` to update.
// Last refreshed: 2026-05-18

import type { Major } from "../../../types";

import { HEALTH_SCIENCES_REQS  } from "../reqs/health-sciences";
import { HEALTH_SCIENCES_PLAN } from "../terms/health-sciences";
import { KINESIOLOGY_REQS  } from "../reqs/kinesiology";
import { KINESIOLOGY_PLAN } from "../terms/kinesiology";
import { PUBLIC_HEALTH_REQS  } from "../reqs/public-health";
import { PUBLIC_HEALTH_PLAN } from "../terms/public-health";
import { RECREATION_AND_LEISURE_STUDIES_REQS  } from "../reqs/recreation-and-leisure-studies";
import { RECREATION_AND_LEISURE_STUDIES_PLAN } from "../terms/recreation-and-leisure-studies";
import { RECREATION_LEADERSHIP_AND_HEALTH_REQS  } from "../reqs/recreation-leadership-and-health";
import { RECREATION_LEADERSHIP_AND_HEALTH_PLAN } from "../terms/recreation-leadership-and-health";
import { SPORT_AND_RECREATION_MANAGEMENT_REQS  } from "../reqs/sport-and-recreation-management";
import { SPORT_AND_RECREATION_MANAGEMENT_PLAN } from "../terms/sport-and-recreation-management";
import { THERAPEUTIC_RECREATION_REQS  } from "../reqs/therapeutic-recreation";
import { THERAPEUTIC_RECREATION_PLAN } from "../terms/therapeutic-recreation";

const HealthSciences: Major = {
  id:                "health-sciences",
  name:              "Health Sciences",
  faculty:           "health",
  color:             "#60A5FA",
  requirementGroups: HEALTH_SCIENCES_REQS,
  defaultTermPlan:   HEALTH_SCIENCES_PLAN,
};

const Kinesiology: Major = {
  id:                "kinesiology",
  name:              "Kinesiology",
  faculty:           "health",
  color:             "#60A5FA",
  requirementGroups: KINESIOLOGY_REQS,
  defaultTermPlan:   KINESIOLOGY_PLAN,
};

const PublicHealth: Major = {
  id:                "public-health",
  name:              "Public Health",
  faculty:           "health",
  color:             "#60A5FA",
  requirementGroups: PUBLIC_HEALTH_REQS,
  defaultTermPlan:   PUBLIC_HEALTH_PLAN,
};

const RecreationAndLeisureStudies: Major = {
  id:                "recreation-and-leisure-studies",
  name:              "Recreation and Leisure Studies",
  faculty:           "health",
  color:             "#60A5FA",
  requirementGroups: RECREATION_AND_LEISURE_STUDIES_REQS,
  defaultTermPlan:   RECREATION_AND_LEISURE_STUDIES_PLAN,
};

const RecreationLeadershipAndHealth: Major = {
  id:                "recreation-leadership-and-health",
  name:              "Recreation, Leadership, and Health",
  faculty:           "health",
  color:             "#60A5FA",
  requirementGroups: RECREATION_LEADERSHIP_AND_HEALTH_REQS,
  defaultTermPlan:   RECREATION_LEADERSHIP_AND_HEALTH_PLAN,
};

const SportAndRecreationManagement: Major = {
  id:                "sport-and-recreation-management",
  name:              "Sport and Recreation Management",
  faculty:           "health",
  color:             "#60A5FA",
  requirementGroups: SPORT_AND_RECREATION_MANAGEMENT_REQS,
  defaultTermPlan:   SPORT_AND_RECREATION_MANAGEMENT_PLAN,
};

const TherapeuticRecreation: Major = {
  id:                "therapeutic-recreation",
  name:              "Therapeutic Recreation",
  faculty:           "health",
  color:             "#60A5FA",
  requirementGroups: THERAPEUTIC_RECREATION_REQS,
  defaultTermPlan:   THERAPEUTIC_RECREATION_PLAN,
};

export const HEALTH_MAJORS: Record<string, Major> = {
  "health-sciences": HealthSciences,
  "kinesiology": Kinesiology,
  "public-health": PublicHealth,
  "recreation-and-leisure-studies": RecreationAndLeisureStudies,
  "recreation-leadership-and-health": RecreationLeadershipAndHealth,
  "sport-and-recreation-management": SportAndRecreationManagement,
  "therapeutic-recreation": TherapeuticRecreation
};
