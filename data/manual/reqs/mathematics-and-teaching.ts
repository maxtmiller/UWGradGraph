
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const MATHEMATICS_AND_TEACHING_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Mathematics/Teaching Specialization",
        type: "complex",
        color: "#10B981",
        courses: [],
        subGroups: [
            {
                title: "Required Pedagogy & Computing",
                type: "at-least",
                count: 3,
                courses: ["ACTSC 221", "CS 234", "MTHEL 206"]
            },
            {
                title: "Differential Equations Choice",
                type: "at-most",
                count: 1,
                courses: ["AMATH 250", "AMATH 251", "AMATH 343"]
            },
            {
                title: "Optimization Choice",
                type: "at-most",
                count: 1,
                courses: ["CO 250", "CO 255"]
            },
            {
                title: "Applications of Computing",
                type: "at-most",
                count: 1,
                courses: ["CS 230", "CS 330", "CS 338", "CS 370", "CS 371", "CS 430", "CS 436"]
            },
            {
                title: "Calculus 3 Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            },
            {
                title: "Combinatorics Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 239", "MATH 249"]
            },
            {
                title: "Introductory Psychology",
                type: "at-most",
                count: 1,
                courses: ["PSYCH 101", "PSYCH 101R"]
            },
            {
                title: "Developmental/Educational Psychology",
                type: "at-most",
                count: 1,
                courses: ["PSYCH 211", "PSYCH 212", "PSYCH 212R"]
            }
        ]
    },
    {
        title: "Advanced Math Core",
        type: "complex",
        color: "",
        courses: [],
        subGroups: [
            {
                title: "Geometry & Logic",
                type: "at-most",
                count: 1,
                courses: ["PMATH 320", "PMATH 321", "PMATH 330", "PMATH 340", "PMATH 432", "PMATH 440"]
            },
            {
                title: "Algebraic Structures",
                type: "at-most",
                count: 1,
                courses: ["PMATH 334", "PMATH 336", "PMATH 347", "PMATH 348"]
            },
            {
                title: "Analysis Options",
                type: "at-most",
                count: 1,
                courses: ["AMATH 331", "AMATH 332", "PMATH 331", "PMATH 332", "PMATH 333", "PMATH 351", "PMATH 352"]
            },
            {
                title: "Advanced Statistics",
                type: "at-most",
                count: 1,
                courses: ["STAT 331", "STAT 332", "STAT 333"]
            },
            {
                title: "Math History & Discovery",
                type: "at-most",
                count: 1,
                courses: ["CO 380", "CO 480"]
            }
        ]
    },
    {
        title: "Upper-Year Math Units",
        type: "elective",
        color: "#d8e84b",
        minCourses: 8,
        courses: [],
        canDoubleCount: true,
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"],
            minLevel: 300 
        }]
    }
];
