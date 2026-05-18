
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const MATHEMATICAL_FINANCE_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Mathematical Finance Core",
        type: "complex",
        core: true,
        color: "#48afde",
        courses: [],
        subGroups: [
            {
                title: "Required Theory & Finance",
                type: "at-least",
                count: 10,
                courses: [
                    "ACTSC 231", "ACTSC 372", "ACTSC 445", "ACTSC 446", "PMATH 351",
                    "PMATH 450", "STAT 330", "STAT 331", "STAT 333", "STAT 443"
                ]
            }
            
        ]
    },
    {
        title: "Advanced Mathematics Core",
        type: "complex",
        core: true,
        color: "#9d48de",
        courses: [],
        subGroups: [
            {
                title: "Calculus 3 / Intro Analysis",
                type: "at-most",
                count: 1,
                courses: ["MATH 247", "MATH 237", "PMATH 333"]
            },
            {
                title: "Computational Math Options",
                type: "at-most",
                count: 1,
                courses: ["AMATH 242", "CS 335", "CS 371"]
            },
            {
                title: "Differential Equations Choice",
                type: "at-most",
                count: 1,
                courses: ["AMATH 250", "AMATH 251", "AMATH 350"]
            },
            {
                title: "Advanced Math Elective",
                type: "at-most",
                count: 1,
                courses: ["AMATH 351", "CO 250", "CO 255", "PMATH 352"]
            },
            {
                title: "Numerical / Modeling Elective",
                type: "at-most",
                count: 1,
                courses: ["ACTSC 447", "AMATH 353", "CO 372", "CS 476", "PMATH 453"]
            },
            
        ]
    },
    {
        title: "Economics Core",
        type: "complex",
        core: true,
        color: "#dfc24c",
        courses: [],
        subGroups: [
            {
                title: "Microeconomics Options",
                type: "at-most",
                count: 1,
                courses: ["ECON 101", "ECON 120W"]
            },
            {
                title: "Macroeconomics Options",
                type: "at-most",
                count: 1,
                courses: ["ECON 102", "ECON 140W"]
            },
            {
                title: "Intermediate Micro Options",
                type: "at-most",
                count: 1,
                courses: ["ECON 201", "ECON 260W"]
            }
        ]
    },
    {
        title: "Accounting & Finance Core",
        type: "complex",
        core: true,
        color: "#e07939",
        courses: [],
        subGroups: [
            {
                title: "Financial Accounting Options",
                type: "at-most",
                count: 1,
                courses: ["AFM 101", "BUS 127W"]
            },
            {
                title: "Managerial Accounting Options",
                type: "at-most",
                count: 1,
                courses: ["AFM 102", "BUS 247W"]
            },
            {
                title: "Business Intro Options",
                type: "at-most",
                count: 1,
                courses: ["AFM 131", "ARBUS 101", "BUS 111W"]
            },
        ]
    }
];
