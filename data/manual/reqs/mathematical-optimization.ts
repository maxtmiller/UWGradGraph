
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const MATHEMATICAL_OPTIMIZATION_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Mathematical Optimization Core",
        type: "complex",
        core: true,
        color: "#8B5CF6",
        courses: [],
        subGroups: [
            {
                title: "Required Modeling & Business",
                type: "at-least",
                count: 5,
                courses: ["AFM 101", "CO 370", "ECON 101", "MSE 211", "STAT 340"]
            },
            {
                title: "Information Systems Management",
                type: "at-most",
                count: 1,
                courses: ["CS 330", "CS 490"]
            }
        ]
    },
    {
        title: "Advanced Mathematics Core",
        type: "complex",
        core: true,
        color: "#eef65c",
        courses: [],
        subGroups: [
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
                title: "Optimization Choice",
                type: "at-most",
                count: 1,
                courses: ["CO 250", "CO 255"]
            },
            {
                title: "Intro Computational Math",
                type: "at-most",
                count: 1,
                courses: ["AMATH 242", "CS 370", "CS 371"]
            },
        ]
    },
    {
        title: "Advanced Optimization Electives",
        type: "complex",
        color: "",
        courses: [],
        subGroups: [
            {
                title: "Advanced Optimization Electives",
                type: "at-least",
                count: 3,
                courses: [
                    "CO 342", "CO 351", "CO 353", "CO 367", "CO 372", 
                    "CO 450", "CO 452", "CO 454", "CO 456", "CO 463", 
                    "CO 466", "CO 471"
                ]
            }
        ]
    },
    {
        title: "Operations Research Specialization",
        type: "complex",
        core: true,
        color: "#63f1bd",
        courses: [],
        subGroups: [
            {
                title: "Required Foundational Courses",
                type: "at-least",
                count: 3,
                courses: ["CS 234", "STAT 331", "STAT 333"]
            },
            {
                title: "Management & Macro (Pick 2)",
                type: "at-least",
                count: 2,
                courses: ["AFM 102", "ECON 102", "MSE 311", "MSE 432"]
            },
            {
                title: "Advanced Statistics & Applications",
                type: "at-most",
                count: 1,
                courses: [
                    "AMATH 250", "AMATH 251", "CO 487", "CS 338", 
                    "CS 430", "STAT 332", "STAT 433", "STAT 435", "STAT 443"
                ]
            },
            {
                title: "Network Flow & Discrete Opt",
                type: "at-most",
                count: 1,
                courses: ["CO 351", "CO 353"]
            },
            {
                title: "Advanced Optimization (Requires CO 255)",
                type: "at-most",
                count: 1,
                requiredCourse: "CO 255",
                courses: [
                    "CO 450", "CO 452", "CO 454", "CO 456", 
                    "CO 459", "CO 463", "CO 466", "CO 471"
                ]
            },
            {
                title: "Major Math Electives",
                type: "elective",
                count: 2,
                courses: [],
                rules: [{ 
                    prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"] 
                }]
            }
        ]
    },
    {
        title: "Business Specialization",
        type: "complex",
        core: true,
        color: "#e44747",
        courses: [],
        subGroups: [
            {
                title: "Required Business & Operations Core",
                type: "at-least",
                count: 11,
                courses: [
                    "ACTSC 231", "AFM 102", "BUS 111W", "BUS 121W", "BUS 252W",
                    "BUS 381W", "CS 338", "ECON 102", "MSE 432", "STAT 371", 
                    "STAT 372"
                ]
            },
            {
                title: "Operations Electives (Pick 2)",
                type: "at-least",
                count: 2,
                courses: [
                    "AMATH 350", "BUS 435W", "BUS 445W", "BUS 455W", "BUS 485W",
                    "CS 230", "CS 234", "MSE 311", "MSE 436", "STAT 440",
                    "STAT 442", "STAT 444"
                ]
            }
        ]
    }
];
