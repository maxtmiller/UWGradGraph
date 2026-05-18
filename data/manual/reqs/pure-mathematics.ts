
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const PURE_MATHEMATICS_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Pure Mathematics Core",
        type: "complex",
        core: true,
        color: "#C084FC",
        courses: [],
        subGroups: [
            {
                title: "Required Pure Math",
                type: "at-least",
                count: 5,
                courses: ["PMATH 347", "PMATH 348", "PMATH 351", "PMATH 352", "PMATH 450"]
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
            },
            {
                title: "Geometry & Topology",
                type: "at-most",
                count: 1,
                courses: ["PMATH 365", "PMATH 367"]
            },
        ]
    },
    {
        title: "Advanced PMATH Electives",
        type: "elective",
        color: "#dbcf62",
        minCourses: 3,
        courses: [],
        rules: [{ 
            prefixes: ["PMATH"], 
            minLevel: 400 
        }]
    },
    {
        title: "Upper-Year Math Electives",
        type: "elective",
        color: "#f09662",
        minCourses: 2,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"], 
            minLevel: 400 
        }]
    }
];
