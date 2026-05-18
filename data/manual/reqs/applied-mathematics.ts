
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const APPLIED_MATHEMATICS_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Applied Mathematics Core",
        type: "complex",
        core: true,
        color: "#60A5FA",
        courses: [],
        subGroups: [
            {
                title: "Differential Equations & Computation",
                type: "at-least",
                count: 3,
                courses: ["AMATH 231", "AMATH 342", "AMATH 353"]
            },
            {
                title: "Calculus 3 Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            },
            {
                title: "Intro Computational Math",
                type: "at-most",
                count: 1,
                courses: ["AMATH 242", "CS 371"]
            },
            {
                title: "Intro Differential Equations",
                type: "at-most",
                count: 1,
                courses: ["AMATH 250", "AMATH 251"]
            },
            {
                title: "Analysis Options",
                type: "at-most",
                count: 1,
                courses: [
                    "AMATH 331", "AMATH 332", "PMATH 331", 
                    "PMATH 332", "PMATH 333", "PMATH 351", "PMATH 352"
                ]
            }
        ]
    },
    {
        title: "Theoretical Mechanics or AMATH Elective",
        type: "required",
        color: "#7797ef",
        minSubGroups: 1,
        courses: [],
        subGroups: [
            {
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    {
                        title: "Theoretical Mechanics",
                        type: "at-least",
                        count: 1,
                        courses: ["AMATH 271"],
                    },
                    {
                        title: "AMATH Elective",
                        type: "elective",
                        count: 1,
                        courses: [
                            "AMATH 271", "AMATH 333", "AMATH 343", "AMATH 345", 
                            "AMATH 361", "AMATH 362", "AMATH 373", "AMATH 382", 
                            "AMATH 383", "AMATH 390", "AMATH 391", "PMATH 343"
                        ]
                    }
                ]
            },
        ]
    },
    {
        title: "Advanced AMATH Electives (400-level)",
        type: "elective",
        color: "#ec8484",
        minCourses: 3,
        courses: [
            "AMATH 442", "AMATH 445", "AMATH 451", "AMATH 453", 
            "AMATH 455", "AMATH 456", "AMATH 463", "AMATH 473", 
            "AMATH 474", "AMATH 475", "AMATH 477", "AMATH 495", "AMATH 499"
        ]
    },
    {
        title: "Additional AMATH Elective",
        type: "elective",
        color: "#f09662",
        minCourses: 1,
        courses: [],
        rules: [{ prefixes: ["AMATH"], minLevel: 300 }]
    },
    {
        title: "Subject Concentration (4 from one code)",
        type: "elective",
        color: "#6ce788",
        minCourses: 4,
        courses: [],
        rules: [{ 
            prefixes: [
                "AE", "BIOL", "BME", "SYDE", "CHE", "CHEM", "CIVE", 
                "EARTH", "ECE", "ECON", "ENVE", "GEOE", "GEOG", 
                "ME", "MTE", "MNS", "MSE", "NE", "PHYS"
            ] 
        }]
    }
];
