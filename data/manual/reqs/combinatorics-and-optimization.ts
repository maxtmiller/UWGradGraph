
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const COMBINATORICS_AND_OPTIMIZATION_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Combinatorics Core",
        type: "required",
        core: true,
        color: "#A5D6A7",
        courses: [],
        subGroups: [
            {
                title: "Optimization Intro (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["CO 250", "CO 255"]
            },
            {
                title: "Enumeration or Graph Theory (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["CO 330", "CO 342"]
            },
            {
                title: "Combinatorics Intro (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["MATH 239", "MATH 249"]
            },
            {
                title: "Group Theory (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["PMATH 336", "PMATH 347"]
            }
        ]
    },
    {
        title: "Optimization Depth",
        type: "complex",
        color: "#FCD34D",
        minCourses: 1,
        courses: [],
        subGroups: [
            {
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    {
                        title: "Standard Optimization (Pick 1)",
                        type: "at-most",
                        count: 1,
                        courses: ["CO 351", "CO 353", "CO 367"]
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
                    }
                ]
            },
        ]
    },
    {
        title: "CO Major Electives",
        type: "elective",
        minCourses: 3,
        color: "#90CAF9",
        courses: [
            "CO 330", "CO 331", "CO 342", "CO 351", "CO 353", "CO 367",
            "CO 430", "CO 431", "CO 432", "CO 434", "CO 439", "CO 440",
            "CO 442", "CO 444", "CO 446", "CO 450", "CO 452", "CO 454",
            "CO 456", "CO 459", "CO 463", "CO 466", "CO 471", "CO 481",
            "CO 485", "CO 486", "CO 487", "CS 467", "PHYS 467"
        ]
    },
    {
        title: "Upper-Year Non-CO Math Electives",
        type: "elective",
        minCourses: 2,
        color: "#7ae69c",
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CS", "MATBUS", "MATH", "PMATH", "STAT"],
            minLevel: 300,
        }]
    },
    {
        title: "Additional 300/400 Math Electives",
        type: "elective",
        minCourses: 1,
        color: "#73bddf",
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"],
            minLevel: 300 
        }]
    },
    {
        title: "General Math Electives",
        type: "elective",
        minCourses: 3,
        color: "#dbcf62",
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"]
        }]
    },
    {
        title: "Theoretical Math & CS Core",
        type: "complex",
        core: true,
        minSubGroups: 3, 
        color: "#EF9A9A",
        courses: [],
        subGroups: [
            { title: "CS 462", type: "at-most", count: 1, courses: ["CS 462"] },
            { title: "CS 466", type: "at-most", count: 1, courses: ["CS 466"] },
            { title: "CS 487", type: "at-most", count: 1, courses: ["CS 487"] },
            {
                title: "Real Analysis (Max 1)", 
                type: "at-most", 
                count: 1, 
                courses: ["AMATH 331", "PMATH 331", "PMATH 333", "PMATH 351"] 
            },
            { 
                title: "Complex Analysis (Max 1)", 
                type: "at-most", 
                count: 1, 
                courses: ["AMATH 332", "PMATH 332", "PMATH 352"] 
            },
            { 
                title: "Calculus 3 (Max 1)", 
                type: "at-most", 
                count: 1, 
                courses: ["MATH 237", "MATH 247"] 
            },
            { 
                title: "Rings & Fields (Max 1)", 
                type: "at-most", 
                count: 1, 
                courses: ["PMATH 334", "PMATH 348"] 
            },
            { 
                title: "Number Theory (Max 1)", 
                type: "at-most", 
                count: 1, 
                courses: ["PMATH 340", "PMATH 440", "PMATH 441"] 
            }
        ]
    }
];
