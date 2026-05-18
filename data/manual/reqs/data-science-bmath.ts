
import { RequirementGroup } from "@/types";

export const DATA_SCIENCE_BMATH_REQS: RequirementGroup[] = [
    {
        title: "Mathematics Core",
        type: "complex",
        core: true,
        color: "#ea4592",
        courses: [],
        subGroups: [
            { title: "Algebra 1", type: "at-most", count: 1, courses: ["MATH 135", "MATH 145"] },
            { title: "Linear Algebra 1", type: "at-most", count: 1, courses: ["MATH 106", "MATH 136", "MATH 146"] },
            { title: "Calculus 1", type: "at-most", count: 1, courses: ["MATH 127", "MATH 137", "MATH 147"] },
            { title: "Calculus 2", type: "at-most", count: 1, courses: ["MATH 128", "MATH 138", "MATH 148"] },
            { title: "Linear Algebra 2", type: "at-most", count: 1, courses: ["MATH 235", "MATH 245"] },
            { title: "Calculus 3", type: "at-most", count: 1, courses: ["MATH 237", "MATH 247"] },
            { title: "Combinatorics", type: "at-most", count: 1, courses: ["MATH 239", "MATH 249"] },
            { title: "Probability", type: "at-most", count: 1, courses: ["STAT 230", "STAT 240"] },
            { title: "Statistics", type: "at-most", count: 1, courses: ["STAT 231", "STAT 241"] }
        ]
    },
    {
        title: "Computer Science Core",
        type: "complex",
        core: true,
        color: "#8745ea",
        courses: [],
        subGroups: [
            { title: "CS 1", type: "at-most", count: 1, courses: ["CS 115", "CS 135", "CS 145"] },
            { title: "Elementary Algorithm Design", type: "at-most", count: 1, courses: ["CS 136", "CS 146"] },
            { title: "Data Structures", type: "at-most", count: 1, courses: ["CS 240", "CS 240E"] },
            { title: "Sequential Programs", type: "at-most", count: 1, courses: ["CS 241", "CS 241E"] },
            { title: "Logic & Computation", type: "at-most", count: 1, courses: ["CS 245", "CS 245E"] },
            { title: "Object-Oriented", type: "at-most", count: 1, courses: ["CS 246", "CS 246E"] },
            { title: "Computer Org", type: "at-most", count: 1, courses: ["CS 251", "CS 251E"] }
        ]
    },
    {
        title: "Data Science Core",
        type: "complex",
        core: true,
        color: "#2563EB",
        courses: [],
        subGroups: [
            {
                title: "Required Foundational Core",
                type: "at-least",
                count: 12,
                courses: [
                    "CS 136L","CS 230","CS 231","CS 234","CS 338","CS 431",
                    "DATSC 401","ENGL 378","PHIL 228","STAT 331","STAT 341","STAT 442"
                ]
            },
            {
                title: "Advanced Data & Optimization (Pick 2)",
                type: "at-least",
                count: 2,
                courses: ["AMATH 345","AMATH 391","CO 353","CO 365","CO 367","CO 370"]
            },
            {
                title: "Machine Learning & AI Specialization",
                type: "at-least",
                count: 2,
                courses: ["AMATH 445","STAT 441","STAT 443","STAT 444"]
            },
            {
                title: "Optimization Course",
                type: "at-most",
                count: 1,
                courses: ["CO 250","CO 255"],
            },
            {
                title: "Differential Equations Course",
                type: "at-most",
                count: 1,
                courses: ["AMATH 231","AMATH 250","AMATH 251"]
            }
        ]
    },
    {
        title: "Specialized Statistics Options",
        type: "complex",
        color: "#8B5CF6",
        courses: [],
        subGroups: [
            {
                type: "or",
                count: 2,
                courses: [],
                subGroups: [
                    {
                        title: "Computational Math Pair",
                        type: "at-least",
                        count: 2,
                        courses: [],
                        subGroups: [
                            {
                                title: "AMATH Path",
                                type: "at-least",
                                count: 1,
                                courses: ["AMATH 242", "CS 335", "CS 370", "CS 371"]
                            },
                            {
                                title: "Neural Networks Path",
                                type: "at-least",
                                count: 1,
                                courses: ["AMATH 449","CS 479"]
                            }
                        ],
                    },
                    {
                        title: "Statistical Inference Pair",
                        type: "at-least",
                        count: 2,
                        requiredCourse: "STAT 330",
                        courses: ["STAT 431", "STAT 440"],
                    },
                    {
                        title: "Experimental Design Pair",
                        type: "at-least",
                        count: 2,
                        requiredCourse: "STAT 332",
                        courses: ["STAT 430", "STAT 454"],
                    }
                ]
            }
        ]
    }
];
