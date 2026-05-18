
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const ACTUARIAL_SCIENCE_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Actuarial Science Core",
        type: "complex",
        core: true,
        color: "#F87171",
        courses: [],
        subGroups: [
            {
                title: "Required Major Courses",
                type: "at-least",
                count: 15,
                courses: [
                    "ACTSC 231", "ACTSC 232", "ACTSC 331", "ACTSC 363", "ACTSC 372",
                    "ACTSC 431", "ACTSC 446", "AFM 101", "ECON 101", "ECON 102",
                    "ENGL 378", "MTHEL 131", "STAT 330", "STAT 331", "STAT 333"
                ]
            },
            {
                title: "Differential Equations (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["AMATH 250", "AMATH 251", "AMATH 350"]
            },
            {
                title: "Calculus 3 Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            },
            {
                title: "Computational/Stochastic Simulation",
                type: "at-most",
                count: 1,
                courses: ["STAT 340", "STAT 341"]
            }
        ]
    },
    {
        title: "Advanced ACTSCI Electives",
        type: "elective",
        color: "#A5D6A7",
        minCourses: 2,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC"], 
            minLevel: 400 
        }]
    },
    {
        title: "Upper-Year Math Elective",
        type: "elective",
        color:  "#f09662",
        minCourses: 1,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"], 
            minLevel: 300 
        }]
    },
    {
        title: "Advanced ACTSC or Finance/Stats",
        type: "elective",
        color: "#dbcf62",
        minCourses: 2,
        courses: ["AFM 424", "STAT 431", "STAT 433", "STAT 441", "STAT 443"],
        rules: [{ 
            prefixes: ["ACTSC"], 
            minLevel: 300 
        }]
    }
];
