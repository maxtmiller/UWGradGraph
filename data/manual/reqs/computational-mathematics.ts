
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const COMPUTATIONAL_MATHEMATICS_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Computational Mathematics Core",
        type: "complex",
        core: true,
        color: "#0EA5E9",
        courses: [],
        subGroups: [
            {
                title: "Required CS & Systems",
                type: "at-least",
                count: 2,
                courses: ["CS 230", "CS 234"]
            },
            {
                title: "Intro Computational Math",
                type: "at-most",
                count: 1,
                courses: ["AMATH 242", "CS 371"]
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
            }
        ]
    },
    {
        title: "List 1: Core Breadth (Pick 2)",
        type: "complex",
        color: "#94b7ef",
        minCourses: 2,
        minSubGroups: 2,
        courses: [],
        subGroups: [
            { title: "Differential Equations", type: "at-most", count: 1, courses: ["AMATH 250", "AMATH 251", "AMATH 350"] },
            { title: "Optimization", type: "at-most", count: 1, courses: ["CO 250", "CO 255"] },
            { title: "Logic", type: "at-most", count: 1, courses: ["CS 245", "CS 245E", "PMATH 330", "PMATH 432"] },
            { title: "OOP Software Dev", type: "at-most", count: 1, courses: ["CS 246", "CS 246E"] }
        ]
    },
    {
        title: "List 2: Applied Computation",
        type: "complex",
        color: "#6ee8de",
        minCourses: 2,
        courses: [],
        subGroups: [
            {
                title: "Direct Computational Options",
                type: "at-least",
                count: 0,
                courses: ["AMATH 342", "CS 475", "PMATH 370"]
            },
            { title: "Discrete Opt (Max 1)", type: "at-most", count: 1, courses: ["CO 353", "CO 367"] },
            { title: "Stochastic/Stats (Max 1)", type: "at-most", count: 1, courses: ["STAT 340", "STAT 341"] }
        ]
    },
    {
        title: "Lists 2 & 3: Advanced Electives",
        type: "elective",
        color: "#5ef5a7",
        courses: [],
        subGroups: [
            {
                type: "at-least",
                count: 2,
                courses: [
                    "ACTSC 447",
                    "AMATH 442", "AMATH 449", "AMATH 455", "AMATH 477",
                    "CO 450", "CO 452", "CO 454", 
                    "CO 456", "CO 463", "CO 466", "CO 471", "CO 485", "CO 487",
                    "CS 341", "CS 431", "CS 451", "CS 466", "CS 476", "CS 479", 
                    "CS 480", "CS 482", "CS 485", "CS 487", "STAT 440", "STAT 441", 
                    "STAT 442", "STAT 444"
                ]
            },
            {
                type: "at-least",
                count: 2,
                courses: [
                    "ACTSC 447", "AMATH 343", "AMATH 382", "AMATH 383", "AMATH 391", 
                    "AMATH 442", "AMATH 449", "AMATH 455", "AMATH 477", "BIOL 382",
                    "CO 351", "CO 370", "CO 372", "CO 450", "CO 452", "CO 454", 
                    "CO 456", "CO 463", "CO 466", "CO 471", "CO 485", "CO 487",
                    "CS 341", "CS 431", "CS 451", "CS 466", "CS 476", "CS 479", 
                    "CS 480", "CS 482", "CS 485", "CS 487", "STAT 440", "STAT 441", 
                    "STAT 442", "STAT 444"
                ]
            }
        ]
    },
    {
        title: "Non-Math Subject Electives",
        type: "elective",
        color: "#90ed65",
        minCourses: 3,
        courses: [],
        rules: [{ 
            prefixes: [
                "AE", "BIOL", "BME", "CHE", "CHEM", "CIVE", "EARTH", "ECE", 
                "ECON", "ENVE", "GEOE", "ME", "MNS", "MSE", "MTE", "NE", "PHYS", "SYDE"
            ] 
        }]
    }
];
