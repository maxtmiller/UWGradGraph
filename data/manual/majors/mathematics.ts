
import type { Major } from "../../../types";

import { COMPUTER_SCIENCE_REQS  } from "../reqs/computer-science";
import { COMPUTER_SCIENCE_PLAN } from "../terms/computer-science";
import { DATA_SCIENCE_BCS_REQS  } from "../reqs/data-science-bcs";
import { DATA_SCIENCE_BCS_PLAN } from "../terms/data-science-bcs";
import { ACTUARIAL_SCIENCE_REQS  } from "../reqs/actuarial-science";
import { ACTUARIAL_SCIENCE_PLAN } from "../terms/actuarial-science";
import { APPLIED_MATHEMATICS_WITH_SCIENTIFIC_COMPUTING_AND_SCIENTIFIC_MACHINE_LEARNING_REQS  } from "../reqs/applied-mathematics-with-scientific-computing-and-scientific-machine-learning";
import { APPLIED_MATHEMATICS_WITH_SCIENTIFIC_COMPUTING_AND_SCIENTIFIC_MACHINE_LEARNING_PLAN } from "../terms/applied-mathematics-with-scientific-computing-and-scientific-machine-learning";
import { APPLIED_MATHEMATICS_REQS  } from "../reqs/applied-mathematics";
import { APPLIED_MATHEMATICS_PLAN } from "../terms/applied-mathematics";
import { BIOSTATISTICS_REQS  } from "../reqs/biostatistics";
import { BIOSTATISTICS_PLAN } from "../terms/biostatistics";
import { COMBINATORICS_AND_OPTIMIZATION_REQS  } from "../reqs/combinatorics-and-optimization";
import { COMBINATORICS_AND_OPTIMIZATION_PLAN } from "../terms/combinatorics-and-optimization";
import { COMPUTATIONAL_MATHEMATICS_REQS  } from "../reqs/computational-mathematics";
import { COMPUTATIONAL_MATHEMATICS_PLAN } from "../terms/computational-mathematics";
import { DATA_SCIENCE_BMATH_REQS  } from "../reqs/data-science-bmath";
import { DATA_SCIENCE_BMATH_PLAN } from "../terms/data-science-bmath";
import { INFORMATION_TECHNOLOGY_MANAGEMENT_REQS  } from "../reqs/information-technology-management";
import { INFORMATION_TECHNOLOGY_MANAGEMENT_PLAN } from "../terms/information-technology-management";
import { MATHEMATICAL_ECONOMICS_REQS  } from "../reqs/mathematical-economics";
import { MATHEMATICAL_ECONOMICS_PLAN } from "../terms/mathematical-economics";
import { MATHEMATICAL_FINANCE_REQS  } from "../reqs/mathematical-finance";
import { MATHEMATICAL_FINANCE_PLAN } from "../terms/mathematical-finance";
import { MATHEMATICAL_OPTIMIZATION_REQS  } from "../reqs/mathematical-optimization";
import { MATHEMATICAL_OPTIMIZATION_PLAN } from "../terms/mathematical-optimization";
import { MATHEMATICAL_PHYSICS_REQS  } from "../reqs/mathematical-physics";
import { MATHEMATICAL_PHYSICS_PLAN } from "../terms/mathematical-physics";
import { MATHEMATICAL_STUDIES_REQS  } from "../reqs/mathematical-studies";
import { MATHEMATICAL_STUDIES_PLAN } from "../terms/mathematical-studies";
import { MATHEMATICS_AND_TEACHING_REQS  } from "../reqs/mathematics-and-teaching";
import { MATHEMATICS_AND_TEACHING_PLAN } from "../terms/mathematics-and-teaching";
import { PURE_MATHEMATICS_REQS  } from "../reqs/pure-mathematics";
import { PURE_MATHEMATICS_PLAN } from "../terms/pure-mathematics";
import { STATISTICS_REQS  } from "../reqs/statistics";
import { STATISTICS_PLAN } from "../terms/statistics";

const ComputerScience: Major = {
  id:                "computer-science",
  name:              "Computer Science",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: COMPUTER_SCIENCE_REQS,
  defaultTermPlan:   COMPUTER_SCIENCE_PLAN,
};


const DataScience: Major = {
  id:                "data-science",
  name:              "Data Science (BCS)",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: DATA_SCIENCE_BCS_REQS,
  defaultTermPlan:   DATA_SCIENCE_BCS_PLAN,
};

const ActuarialScience: Major = {
  id:                "actuarial-science",
  name:              "Actuarial Science",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: ACTUARIAL_SCIENCE_REQS,
  defaultTermPlan:   ACTUARIAL_SCIENCE_PLAN,
};

const AppliedMathematicsWithScientificComputingAndScientificMachineLearning: Major = {
  id:                "applied-mathematics-with-scientific-computing-and-scientific-machine-learning",
  name:              "Applied Mathematics with Scientific Comp & ML",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: APPLIED_MATHEMATICS_WITH_SCIENTIFIC_COMPUTING_AND_SCIENTIFIC_MACHINE_LEARNING_REQS,
  defaultTermPlan: APPLIED_MATHEMATICS_WITH_SCIENTIFIC_COMPUTING_AND_SCIENTIFIC_MACHINE_LEARNING_PLAN,
};

const AppliedMathematics: Major = {
  id:                "applied-mathematics",
  name:              "Applied Mathematics",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: APPLIED_MATHEMATICS_REQS,
  defaultTermPlan:   APPLIED_MATHEMATICS_PLAN,
};

const Biostatistics: Major = {
  id:                "biostatistics",
  name:              "Biostatistics",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: BIOSTATISTICS_REQS,
  defaultTermPlan:   BIOSTATISTICS_PLAN,
};

const CombinatoricsAndOptimization: Major = {
  id:                "combinatorics-and-optimization",
  name:              "Combinatorics and Optimization",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: COMBINATORICS_AND_OPTIMIZATION_REQS,
  defaultTermPlan:   COMBINATORICS_AND_OPTIMIZATION_PLAN,
};

const ComputationalMathematics: Major = {
  id:                "computational-mathematics",
  name:              "Computational Mathematics",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: COMPUTATIONAL_MATHEMATICS_REQS,
  defaultTermPlan:   COMPUTATIONAL_MATHEMATICS_PLAN,
};

const DataScienceBmath: Major = {
  id:                "data-science",
  name:              "Data Science (BMATH)",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: DATA_SCIENCE_BMATH_REQS,
  defaultTermPlan:   DATA_SCIENCE_BMATH_PLAN,
};

const InformationTechnologyManagement: Major = {
  id:                "information-technology-management",
  name:              "Information Technology Management",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: INFORMATION_TECHNOLOGY_MANAGEMENT_REQS,
  defaultTermPlan:   INFORMATION_TECHNOLOGY_MANAGEMENT_PLAN,
};

const MathematicalEconomics: Major = {
  id:                "mathematical-economics",
  name:              "Mathematical Economics",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: MATHEMATICAL_ECONOMICS_REQS,
  defaultTermPlan:   MATHEMATICAL_ECONOMICS_PLAN,
};

const MathematicalFinance: Major = {
  id:                "mathematical-finance",
  name:              "Mathematical Finance",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: MATHEMATICAL_FINANCE_REQS,
  defaultTermPlan:   MATHEMATICAL_FINANCE_PLAN,
};

const MathematicalOptimization: Major = {
  id:                "mathematical-optimization",
  name:              "Mathematical Optimization",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: MATHEMATICAL_OPTIMIZATION_REQS,
  defaultTermPlan:   MATHEMATICAL_OPTIMIZATION_PLAN,
};

const MathematicalPhysics: Major = {
  id:                "mathematical-physics",
  name:              "Mathematical Physics",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: MATHEMATICAL_PHYSICS_REQS,
  defaultTermPlan:   MATHEMATICAL_PHYSICS_PLAN,
};

const MathematicalStudies: Major = {
  id:                "mathematical-studies",
  name:              "Mathematical Studies",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: MATHEMATICAL_STUDIES_REQS,
  defaultTermPlan:   MATHEMATICAL_STUDIES_PLAN,
};

const MathematicsAndTeaching: Major = {
  id:                "mathematics-and-teaching",
  name:              "Mathematics and Teaching",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: MATHEMATICS_AND_TEACHING_REQS,
  defaultTermPlan:   MATHEMATICS_AND_TEACHING_PLAN,
};

const PureMathematics: Major = {
  id:                "pure-mathematics",
  name:              "Pure Mathematics",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: PURE_MATHEMATICS_REQS,
  defaultTermPlan:   PURE_MATHEMATICS_PLAN,
};

const Statistics: Major = {
  id:                "statistics",
  name:              "Statistics",
  faculty:           "mathematics",
  color:             "#FFD54F",
  requirementGroups: STATISTICS_REQS,
  defaultTermPlan:   STATISTICS_PLAN,
};

export const MATHEMATICS_MAJORS: Record<string, Major> = {
  "computer-science": ComputerScience,
  "data-science": DataScience
};
export const MATHEMATICS_SUB_MAJORS: Record<string, Major> = {
  "actuarial-science": ActuarialScience,
  "applied-mathematics": AppliedMathematics,
  "applied-mathematics-with-scientific-computing-and-scientific-machine-learning": AppliedMathematicsWithScientificComputingAndScientificMachineLearning,
  "biostatistics": Biostatistics,
  "combinatorics-and-optimization": CombinatoricsAndOptimization,
  "computational-mathematics": ComputationalMathematics,
  "data-science-bmath": DataScienceBmath,
  "information-technology-management": InformationTechnologyManagement,
  "mathematical-economics": MathematicalEconomics,
  "mathematical-finance": MathematicalFinance,
  "mathematical-optimization": MathematicalOptimization,
  "mathematical-physics": MathematicalPhysics,
  "mathematical-studies": MathematicalStudies,
  "mathematics-and-teaching": MathematicsAndTeaching,
  "pure-mathematics": PureMathematics,
  "statistics": Statistics
};
