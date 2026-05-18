
import { RequirementGroup } from "@/types";

export const MATHEMATICAL_STUDIES_REQS: RequirementGroup[] = [
    {
        title: "Mathematics Core",
        type: "complex",
        core: true,
        color: "#ee46b9",
        courses: [],
        subGroups: [
            {
                title: "CS 1: Functional Programming",
                type: "at-most",
                count: 1,
                courses: ["CS 115", "CS 135", "CS 145"]
            },
            {
                title: "CS 2: Algorithms & Data",
                type: "at-most",
                count: 1,
                courses: ["CS 116", "CS 136", "CS 146"]
            },
            {
                title: "Linear Algebra 1",
                type: "at-most",
                count: 1,
                courses: ["MATH 106", "MATH 136", "MATH 146"]
            },
            {
                title: "Calculus 1",
                type: "at-most",
                count: 1,
                courses: ["MATH 127", "MATH 137", "MATH 147"]
            },
            {
                title: "Calculus 2",
                type: "at-most",
                count: 1,
                courses: ["MATH 128", "MATH 138", "MATH 148"]
            },
            {
                title: "Honours Algebra (Proofs)",
                type: "at-most",
                count: 1,
                courses: ["MATH 135", "MATH 145"]
            },
            {
                title: "Upper-Level Math Choice",
                type: "at-most",
                count: 1,
                courses: ["MATH 207", "MATH 229", "MATH 237", "MATH 239", "MATH 247", "MATH 249"]
            },
            {
                title: "Linear Algebra 2",
                type: "at-most",
                count: 1,
                courses: ["MATH 225", "MATH 235", "MATH 245"]
            },
            {
                title: "Probability",
                type: "at-most",
                count: 1,
                courses: ["STAT 220", "STAT 230", "STAT 240"]
            },
            {
                title: "Statistics",
                type: "at-most",
                count: 1,
                courses: ["STAT 221", "STAT 231", "STAT 241"]
            }
        ]
    },
    {
        title: "Advanced Math Electives",
        type: "elective",
        color: "#e78a38",
        minCourses: 10,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"],
            minLevel: 300 
        }]
    }

];
