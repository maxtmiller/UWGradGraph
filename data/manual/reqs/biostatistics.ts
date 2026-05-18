
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const BIOSTATISTICS_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Biostatistics Core",
        type: "complex",
        core: true,
        color: "#10B981",
        courses: [],
        subGroups: [
            {
                title: "Required Major Courses",
                type: "at-least",
                count: 9,
                courses: [
                    "ENGL 378", "STAT 330", "STAT 331", "STAT 332", "STAT 333",
                    "STAT 337", "STAT 431", "STAT 437", "STAT 438"
                ]
            },
            {
                title: "Calculus 3 Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            },
            {
                title: "Math Computation & Combinatorics",
                type: "at-most",
                count: 1,
                courses: [
                    "AMATH 231", "AMATH 242", "AMATH 250", "AMATH 251", 
                    "AMATH 350", "CS 371", "MATH 239", "MATH 249"
                ]
            },
            {
                title: "Life Science Elective",
                type: "at-most",
                count: 1,
                courses: ["BIOL 239", "HLTH 101"]
            },
        ]
    },
    {
        title: "Upper-Year STAT Electives",
        type: "elective",
        color: "#ef8181",
        minCourses: 2,
        courses: [],
        rules: [{ prefixes: ["STAT"], minLevel: 300 }]
    },
    {
        title: "Upper-Year Math Electives",
        type: "elective",
        color: "#efb881",
        minCourses: 2,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"], 
            minLevel: 300 
        }]
    },
    {
        title: "General Math Electives",
        type: "elective",
        color: "#dfe863",
        minCourses: 3,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"] 
        }]
    }
];
