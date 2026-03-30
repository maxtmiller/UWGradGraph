import type { Major, MajorId, MajorMap, SubMajorId } from "../../types";
import { 
  ACTSCI_REQS, AMATH_REQS, AMATH_SCI_REQS, BIOSTAT_REQS, CO_REQS, COMP_MATH_REQS, DS_BMATH_REQS, 
  IT_MGMT_REQS, MATH_ECON_REQS, MATH_FIN_REQS, MATH_OP_REQS, MATH_PHYS_REQS, MATH_STUD_REQS, 
  MATH_TEACH_REQS, PMATH_REQS, STAT_REQS 
} from "../reqs/math"
import { 
  ACTSCI_PLAN, AMATH_PLAN, AMATH_SCI_PLAN, BIOSTAT_PLAN, CO_PLAN, COMP_MATH_PLAN, DS_BMATH_PLAN, 
  IT_MGMT_PLAN, MATH_ECON_PLAN, MATH_FIN_PLAN, MATH_OP_PLAN, MATH_PHYS_PLAN, MATH_STUD_PLAN, 
  MATH_TEACH_PLAN, PMATH_PLAN, STAT_PLAN 
} from "../terms/math";


// ── Major Definitions ─────────────────────────────────────────────────────────
// Each major owns its requirement groups and a suggested default term plan.
// The graph and progress audit derive their views entirely from whichever
// major is active in the store — no component hardcodes a major directly.

const STATISTICS: Major = {
  id:      "math",
  name:    "Statistics",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: STAT_REQS,

  defaultTermPlan: STAT_PLAN,
};

const COMBINATORICS: Major = {
  id:      "math",
  name:    "Combinatorics & Optimization",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: CO_REQS,

  defaultTermPlan: CO_PLAN,
};

const PURE_MATHS: Major = {
  id:      "math",
  name:    "Pure Mathematics",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: PMATH_REQS,

  defaultTermPlan: PMATH_PLAN,
};

const ACTSCI: Major = {
  id:      "math",
  name:    "Acturial Science",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: ACTSCI_REQS,

  defaultTermPlan: ACTSCI_PLAN,
};

const AMATH: Major = {
  id:      "math",
  name:    "Applied Mathematics",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: AMATH_REQS,

  defaultTermPlan: AMATH_PLAN,
};

const AMATH_SCI: Major = {
  id:      "math",
  name:    "Applied Mathematics with Scientific Comp & ML",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: AMATH_SCI_REQS,

  defaultTermPlan: AMATH_SCI_PLAN,
};

const BIOSTAT: Major = {
  id:      "math",
  name:    "Biostatistics",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: BIOSTAT_REQS,

  defaultTermPlan: BIOSTAT_PLAN,
};

const COMP_MATH: Major = {
  id:      "math",
  name:    "Computational Mathematics",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: COMP_MATH_REQS,

  defaultTermPlan: COMP_MATH_PLAN,
};

const IT_MGMT: Major = {
  id:      "math",
  name:    "Information Technology Management",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: IT_MGMT_REQS,

  defaultTermPlan: IT_MGMT_PLAN,
};

const MATH_ECON: Major = {
  id:      "math",
  name:    "Mathematics Economics",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: MATH_ECON_REQS,

  defaultTermPlan: MATH_ECON_PLAN,
};

const MATH_FIN: Major = {
  id:      "math",
  name:    "Mathematics Finance",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: MATH_FIN_REQS,

  defaultTermPlan: MATH_FIN_PLAN,
};

const MATH_OP: Major = {
  id:      "math",
  name:    "Mathematics Optimization",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: MATH_OP_REQS,

  defaultTermPlan: MATH_OP_PLAN,
};

const MATH_PHYS: Major = {
  id:      "math",
  name:    "Mathematics Physics",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: MATH_PHYS_REQS,

  defaultTermPlan: MATH_PHYS_PLAN,
};

const MATH_STUD: Major = {
  id:      "math",
  name:    "Mathematics Studies",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: MATH_STUD_REQS,

  defaultTermPlan: MATH_STUD_PLAN,
};

const MATH_TEACH: Major = {
  id:      "math",
  name:    "Mathematics / Teaching",
  faculty: "Mathematics",
  color:   "#E879F9",

  requirementGroups: MATH_TEACH_REQS,

  defaultTermPlan: MATH_TEACH_PLAN,
};


export const MATH_SUB_MAJORS: Record<SubMajorId, Major> = {
  stat: STATISTICS,
  co: COMBINATORICS,
  pmath: PURE_MATHS,
  actsc: ACTSCI,
  amath: AMATH,
  amathsci: AMATH_SCI,
  biostat: BIOSTAT,
  compmath: COMP_MATH,
  itmgmt: IT_MGMT,
  mathecon: MATH_ECON,
  mathfin: MATH_FIN,
  mathop: MATH_OP,
  mathphys: MATH_PHYS,
  mathstud: MATH_STUD,
  mathteach: MATH_TEACH,
};
