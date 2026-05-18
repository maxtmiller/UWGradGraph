
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const STATISTICS_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Statistics Core",
        type: "required",
        core: true,
        color: "#A5D6A7",
        courses: ["ENGL 378", "STAT 330", "STAT 331", "STAT 332", "STAT 333"],
    },
    {
        title: "Math & CS Options",
        type: "complex",
        color: "#FCD34D",
        courses: [],
        subGroups: [
            {
                title: "Calculus 4 / DEs / Combinatorics (Pick 1)",
                type: "at-most",
                count: 1,
                courses: [
                    "AMATH 231", "AMATH 242", "AMATH 250", "AMATH 251", 
                    "AMATH 350", "CS 371", "MATH 239", "MATH 249"
                ]
            },
            {
                title: "Calculus 3 (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            }
        ]
    },
    {
        title: "400-level STAT Electives",
        type: "elective",
        minCourses: 2,
        color: "#81C784",
        courses: [],
        rules: [{ 
            prefixes: ["STAT"], 
            minLevel: 400 
        }]
    },
    {
        title: "Additional 300/400 STAT",
        type: "elective",
        minCourses: 1,
        color: "#A5D6A7",
        courses: [],
        rules: [{ 
            prefixes: ["STAT"], 
            minLevel: 300 
        }]
    },
    {
        title: "Advanced STAT or CS Machine Learning",
        type: "complex",
        color: "#4DB6AC",
        courses: [],
        minCourses: 1,
        subGroups: [
            {
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    {
                        title: "ML Options",
                        type: "at-most",
                        count: 1,
                        courses: ["CS 457", "CS 485", "CS 486"],
                    },
                    {
                        title: "Advanced STAT Options",
                        type: "elective",
                        count: 1,
                        courses: [],
                        rules: [{ prefixes: ["STAT"], minLevel: 400 }]
                    }
                ]
            }
        ],
    },
    {
        title: "Upper-Year Math Electives",
        type: "elective",
        minCourses: 4,
        color: "#90CAF9",
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"],
            minLevel: 300 
        }]
    },
    {
        title: "General Math Electives",
        type: "elective",
        minCourses: 3,
        color: "#BBDEFB",
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"]
        }]
    }
];
