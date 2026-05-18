
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const APPLIED_MATHEMATICS_WITH_SCIENTIFIC_COMPUTING_AND_SCIENTIFIC_MACHINE_LEARNING_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "AMATH with SCI Comp Core",
        type: "complex",
        core: true,
        color: "#38BDF8",
        courses: [],
        subGroups: [
            {
                title: "Required Foundational Courses",
                type: "at-least",
                count: 3,
                courses: ["AMATH 231", "AMATH 445", "CS 234"]
            },
            {
                title: "Intro Computational Math",
                type: "at-most",
                count: 1,
                courses: ["AMATH 242", "CS 371"]
            },
            {
                title: "Differential Equations",
                type: "at-most",
                count: 1,
                courses: ["AMATH 250", "AMATH 251"]
            },
            {
                title: "Computational Modeling Choice",
                type: "at-most",
                count: 1,
                courses: ["AMATH 342", "AMATH 345", "AMATH 449", "CS 479"]
            },
            {
                title: "Optimization Choice",
                type: "at-most",
                count: 1,
                courses: ["CO 250", "CO 255"]
            },
            {
                title: "Calculus 3 Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            },
        ]
    },
    {
        title: "Upper-Year AMATH Electives",
        type: "elective",
        color: "#dfec78",
        minCourses: 2,
        courses: [],
        rules: [{ prefixes: ["AMATH"], minLevel: 300 }]
    },
    {
        title: "Advanced AMATH (400-level)",
        type: "elective",
        color: "#e8b260",
        minCourses: 1,
        courses: [],
        rules: [{ prefixes: ["AMATH"], minLevel: 400 }]
    },
    {
        title: "Specialization List 1",
        type: "complex",
        color: "#f3a3e4",
        courses: [],
        subGroups: [
            {
                title: "Specialization List 1",
                type: "at-least",
                count: 4,
                courses: [
                    "AMATH 342", "AMATH 391", "AMATH 442", "AMATH 449", 
                    "AMATH 477", "CO 367", "CO 466", "CS 231", "CS 467", 
                    "CS 475", "CS 479", "PMATH 343", "STAT 331", 
                    "STAT 341", "STAT 441", "STAT 444"
                ],
            }
        ]
    }
];
