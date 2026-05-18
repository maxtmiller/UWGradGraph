
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const MATHEMATICAL_PHYSICS_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Mathematical Physics Core",
        type: "complex",
        core: true,
        color: "#6366F1",
        courses: [],
        subGroups: [
            {
                title: "Required Math & Physics Foundational",
                type: "at-least",
                count: 7,
                courses: [
                    "AMATH 231", "AMATH 271", "AMATH 353", "AMATH 361", 
                    "PHYS 121", "PHYS 122", "PHYS 242"
                ]
            },
            {
                title: "Calculus 3 Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            },
            {
                title: "Computational Math Options",
                type: "at-most",
                count: 1,
                courses: ["AMATH 242", "AMATH 345", "AMATH 391", "AMATH 445", "CS 371"]
            },
            {
                title: "Intro Differential Equations",
                type: "at-most",
                count: 1,
                courses: ["AMATH 250", "AMATH 251"]
            }
        ]
    },
    {
        title: "Advanced Mathematical Physics",
        type: "complex",
        core: true,
        color: "#6366F1",
        courses: [],
        subGroups: [
            {
                title: "Real Analysis Options",
                type: "at-most",
                count: 1,
                courses: ["AMATH 331", "PMATH 331", "PMATH 333", "PMATH 351"]
            },
            {
                title: "Complex Analysis Options",
                type: "at-most",
                count: 1,
                courses: ["AMATH 332", "PMATH 332", "PMATH 352"]
            },
            {
                title: "Quantum Physics Sequence",
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    {
                        title: "AMATH Quantum Path",
                        type: "at-least",
                        count: 1,
                        courses: ["AMATH 373"]
                    },
                    {
                        title: "PHYS Quantum Path",
                        type: "at-least",
                        count: 2,
                        courses: ["PHYS 234", "PHYS 334"]
                    }
                ]
            },
            {
                title: "Advanced Quantum (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["AMATH 473", "PHYS 454"]
            },
            {
                title: "General Relativity (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["AMATH 475", "PHYS 476"]
            },
            {
                title: "Thermal/Statistical Physics",
                type: "at-most",
                count: 1,
                courses: ["ECE 403", "PHYS 358"]
            },
            {
                title: "Theoretical Physics Electives (Pick 2)",
                type: "at-least",
                count: 2,
                courses: ["AMATH 333", "AMATH 474", "PHYS 359", "PHYS 484"]
            }
        ]
    },
    {
        title: "Major Electives",
        type: "complex",
        color: "#ea4e4e",
        courses: [],
        subGroups: [
            {
                title: "Any Major Electives",
                type: "elective",
                count: 3,
                courses: [],
                rules: [
                    { prefixes: ["AMATH", "PHYS"] }
                ]
            },
            {
                title: "Advanced Major Electives",
                type: "elective",
                count: 3,
                courses: [],
                rules: [
                    { prefixes: ["AMATH", "PHYS"], minLevel: 300 }
                ]
            }
        ]
    }
];
