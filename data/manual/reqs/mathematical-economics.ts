
import { RequirementGroup } from "@/types";
import { MATH_CORE } from "@/data/manual/reqs/math"

export const MATHEMATICAL_ECONOMICS_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Advanced Math Core (Min 60% Avg)",
        type: "complex",
        core: true,
        color: "#942b71",
        courses: [],
        subGroups: [
            {
                title: "Math Theory Core",
                type: "at-least",
                count: 3,
                courses: ["AMATH 350", "STAT 331", "STAT 443"]
            },
            {
                title: "Analysis Options",
                type: "at-most",
                count: 1,
                courses: ["AMATH 331", "PMATH 331", "PMATH 333", "PMATH 351"]
            },
            {
                title: "Optimization Choice",
                type: "at-most",
                count: 1,
                courses: ["CO 250", "CO 255"]
            },
            {
                title: "Calculus 3 Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            }
        ]
    },
    {
        title: "Economics Core (Min 70% Avg)",
        type: "complex",
        core: true,
        color: "#06B6D4",
        courses: [],
        subGroups: [
            {
                title: "Economics Core",
                type: "at-least",
                count: 9,
                courses: [
                    "ECON 101", "ECON 102", "ECON 290", "ECON 306", 
                    "ECON 391", "ECON 393", "ECON 472", "ECON 491", "ECON 496"
                ]
            },
            {
                title: "Advanced ECON Theory",
                type: "at-most",
                count: 1,
                courses: ["ECON 406", "ECON 407", "ECON 408", "ECON 409"]
            }
        ]
    },
    {
        title: "Upper-Year ECON Electives",
        type: "elective",
        color: "#f0f066",
        minCourses: 4,
        courses: [],
        rules: [{ prefixes: ["ECON"], minLevel: 300 }]
    },
    {
        title: "Major Math Electives",
        type: "elective",
        color: "#58dfb9",
        minCourses: 7,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"] 
        }]
    },
    {
        title: "General Degree Electives",
        type: "elective",
        color: "#ee6767",
        minCourses: 2,
        courses: [],
        rules: [{ prefixes: [] }] 
    }
];
