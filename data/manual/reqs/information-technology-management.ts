
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const INFORMATION_TECHNOLOGY_MANAGEMENT_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Business & IT Core ",
        type: "complex",
        core: true,
        color: "#beb36c",
        courses: [],
        subGroups: [
            {
                type: "at-least",
                count: 19,
                courses: [
                    "AFM 101", "AFM 102", "BUS 111W", "BUS 121W", "BUS 381W",
                    "COMM 431", "COMM 432", "CS 230", "CS 330", "CS 338",
                    "CS 430", "CS 436", "ECON 101", "ECON 102", "MSE 211",
                    "MSE 311", "STAT 371", "STAT 372", "STV 202"
                ],
            }
        ]
    },
    {
        title: "IT Management Core",
        type: "complex",
        core: true,
        color: "#F59E0B",
        courses: [],
        subGroups: [
            
            {
                title: "Financial Math Options",
                type: "at-most",
                count: 1,
                courses: ["ACTSC 221", "ACTSC 231"]
            },
            {
                title: "Business Law Options",
                type: "at-most",
                count: 1,
                courses: ["AFM 231", "LS 283"]
            },
            {
                title: "Marketing Options",
                type: "at-most",
                count: 1,
                courses: ["ARBUS 302", "BUS 252W", "MGMT 244"]
            },
            {
                title: "Optimization Choice",
                type: "at-most",
                count: 1,
                courses: ["CO 250", "CO 255"]
            },
            {
                title: "Combinatorics Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 239", "MATH 249"]
            },
            
        ]
    },
    {
        title: "STV Senior Options",
        type: "elective",
        color: "#ac7847",
        minCourses: 1,
        courses: ["STV 302", "STV 304", "STV 305", "STV 306", "STV 400", "STV 401"]
    },
    {
        title: "Upper-Year Math Elective",
        type: "elective",
        color: "#d891ee",
        minCourses: 1,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"], 
            minLevel: 300 
        }]
    },
    {
        title: "General Math Electives",
        type: "elective",
        color: "#7bd7f1",
        minCourses: 3,
        courses: [],
        rules: [{ 
            prefixes: [
                "ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT",
                "AE", "BIOL", "BME", "CHE", "CHEM", "CIVE", "EARTH", "ECE", 
                "ECON", "ENVE", "GEOE", "ME", "MNS", "MSE", "MTE", "NE", "PHYS", "SYDE"
            ] 
        }]
    }
];
