
import { RequirementGroup } from "@/types";

export const DATA_SCIENCE_BCS_REQS: RequirementGroup[] = [
    {
        title: "Mathematics Core",
        type: "complex",
        core: true,
        color: "#ea4592",
        courses: [],
        subGroups: [
            { title: "Algebra 1", type: "at-most", count: 1, courses: ["MATH 135", "MATH 145"] },
            { title: "Linear Algebra 1", type: "at-most", count: 1, courses: ["MATH 136", "MATH 146"] },
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
            { title: "Elementary Algorithm Design",type: "at-most", count: 1, courses: ["CS 136", "CS 146"] },
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
                count: 8,
                courses: [
                    "CS 136L", "CS 341", "CS 348", "CS 350", 
                    "CS 451", "STAT 330", "STAT 331", "STAT 341"
                ]
            },
            {
                title: "Machine Learning & AI Specialization",
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    {
                        title: "ML Focus (480 + 1 Elective)",
                        type: "at-least",
                        count: 2,
                        requiredCourse: "CS 480",
                        courses: ["CS 480", "CS 448", "CS 454", "CS 484", "CS 485", "CS 486"]
                    },
                    {
                        title: "Foundations Focus (485 + 1 Elective)",
                        type: "at-least",
                        count: 2,
                        requiredCourse: "CS 485",
                        courses: ["CS 485", "CS 448", "CS 454", "CS 480", "CS 484", "CS 486"]
                    },
                    {
                        title: "AI Focus (486 + 1 Elective)",
                        type: "at-least",
                        count: 2,
                        requiredCourse: "CS 486",
                        courses: ["CS 486", "CS 448", "CS 454", "CS 480", "CS 484", "CS 485"]
                    }
                ]
            },
            {
                title: "Advanced Statistical Learning (Pick 2)",
                type: "at-least",
                count: 2,
                courses: ["STAT 431", "STAT 440", "STAT 441", "STAT 442", "STAT 443", "STAT 444"]
            },
        ]
    },
    {
        title: "Advanced CS Electives (300 / 400 Level)",
        type: "elective",
        color: "#81C784",
        minCourses: 2,
        courses: [],
        rules: [{ 
            prefixes: ["CS"], 
            minLevel: 340, 
            maxLevel: 489 
        }]
    },
    {
        title: "Final CS/Specialized Elective",
        type: "complex",
        color: "#4DB6AC",
        courses: [],
        subGroups: [
            {
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    {
                        title: "Capstone/Thesis Elective",
                        type: "at-most",
                        count: 1,
                        courses: ["CO 487", "CS 499T", "STAT 440"],
                    },
                    {
                        title: "Advanced CS Options",
                        type: "elective",
                        count: 1,
                        courses: [],
                        rules: [{ prefixes: ["CS"], minLevel: 440 }]
                    }
                ]
            }
        ]
    },
    {    
        title: "Elective Requirement",
        type: "complex",
        color: "#e87b37",
        minCourses: 8,
        courses: [],
        subGroups: [
            {
                title: "Arts & Business",
                type: "elective",
                count: 2,
                courses: [],
                rules: [
                    { prefixes: ["BET", "BUS", "COMM", "STV"] },
                ]
            },
            {
                title: "Science, Health & Environment",
                type: "elective",
                count: 2,
                courses: [],
                rules: [
                    {
                        prefixes: [
                            "SCI", "BIOL", "CHEM", "PHYS", "EARTH",
                            "HEALTH", "KIN", "GERON",
                            "PLAN", "ENVS", "ERS", "GEOG", "ENBUS"
                        ]
                    }
                ]
            },
            {
                title: "Additional Electives",
                type: "elective",
                count: 4,
                courses: [],
                rules: [
                    { prefixes: ["BET", "BUS", "COMM", "STV"] }
                ]
            }
        ]
    }
];