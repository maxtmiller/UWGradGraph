
import { RequirementGroup } from "@/types";

const BCS_MATH_CORE: RequirementGroup = {
  title: "Mathematics Core",
  type: "complex",
  core: true,
  color: "#f0499a",
  courses: [], 
  subGroups: [
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
      title: "Honours Algebra",
      type: "at-most",
      count: 1,
      courses: ["MATH 135", "MATH 145"]
    },
    {
      title: "Linear Algebra 1",
      type: "at-most",
      count: 1,
      courses: ["MATH 136", "MATH 146"]
    },
    {
      title: "Combinatorics",
      type: "at-most",
      count: 1,
      courses: ["MATH 239", "MATH 249"],
    },
    {
      title: "Probability",
      type: "at-most",
      count: 1,
      courses: ["STAT 230", "STAT 240"]
    },
    {
      title: "Statistics",
      type: "at-most",
      count: 1,
      courses: ["STAT 231", "STAT 241"]
    }
  ]
};

const BCS_CS_CORE: RequirementGroup = {
  title: "Computer Science Core",
  type: "complex",
  core: true,
  color: "#38BDF8",
  courses: [], 
  subGroups: [
        {
            title: "Mandatory CS Core",
            type: "at-least",
            count: 3,
            courses: ["CS 136L", "CS 341", "CS 350"]
        },
        {
            title: "First-Year Intro (Pick 1)",
            type: "at-most",
            count: 1,
            courses: ["CS 115", "CS 135", "CS 145"]
        },
        {
            title: "Elementary Algorithm Design",
            type: "at-least",
            count: 1,
            courses: ["CS 136", "CS 146"]
        },
        {
            title: "Data Structures (Pick 1)",
            type: "at-most",
            count: 1,
            courses: ["CS 240", "CS 240E"]
        },
        {
            title: "Sequential Programs (Pick 1)",
            type: "at-most",
            count: 1,
            courses: ["CS 241", "CS 241E"]
        },
        {
            title: "Logic and Computation (Pick 1)",
            type: "at-most",
            count: 1,
            courses: ["CS 245", "CS 245E"]
        },
        {
            title: "Object-Oriented Development (Pick 1)",
            type: "at-most",
            count: 1,
            courses: ["CS 246", "CS 246E"]
        },
        {
            title: "Computer Organization (Pick 1)",
            type: "at-most",
            count: 1,
            courses: ["CS 251", "CS 251E"]
        }
    ]
};

export const COMPUTER_SCIENCE_REQS: RequirementGroup[] = [
    BCS_MATH_CORE,
    BCS_CS_CORE,
    {
        title: "General CS Electives (300/400 Level)",
        type: "elective",
        color: "#FCD34D",
        minCourses: 3,
        courses: [],
        rules: [{ 
            prefixes: ["CS"], 
            minLevel: 340, 
            maxLevel: 489 
        }]
    },
    {
        title: "Advanced CS Electives (400 Level)",
        type: "elective",
        color: "#81C784",
        minCourses: 2,
        courses: [],
        rules: [{ 
            prefixes: ["CS"], 
            minLevel: 440, 
            maxLevel: 489 
        }]
    },
    {
        title: "Final CS/Specialized Elective",
        type: "complex",
        color: "#4DB6AC",
        courses: [],
        subGroups: [
            {
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    {
                        title: "Specialized Options (Pick 1)",
                        type: "at-most",
                        count: 1,
                        courses: ["CO 487", "CS 499T", "STAT 440"],
                    },
                    {
                        title: "Advanced CS Options",
                        type: "elective",
                        count: 1,
                        courses: [],
                        rules: [{ prefixes: ["CS"], minLevel: 440 }]
                    }
                ]
            }
        ]
    },
    {    
        title: "Elective Requirement",
        type: "complex",
        color: "#e87b37",
        minCourses: 8,
        courses: [],
        subGroups: [
            {
                title: "Arts & Business",
                type: "elective",
                count: 2,
                courses: [],
                rules: [
                    { prefixes: ["BET", "BUS", "COMM", "STV"] },
                ]
            },
            {
                title: "Science, Health & Environment",
                type: "elective",
                count: 2,
                courses: [],
                rules: [
                    {
                        prefixes: [
                            "SCI", "BIOL", "CHEM", "PHYS", "EARTH",
                            "HEALTH", "KIN", "GERON",
                            "PLAN", "ENVS", "ERS", "GEOG", "ENBUS"
                        ]
                    }
                ]
            },
            {
                title: "Additional Electives",
                type: "elective",
                count: 4,
                courses: [],
                rules: [
                    { prefixes: ["BET", "BUS", "COMM", "STV"] }
                ]
            }
        ]
    }
]
