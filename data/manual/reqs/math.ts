import { RequirementGroup } from "@/types";

export const MATH_CORE: RequirementGroup = {
  title: "Mathematics Core",
  type: "complex",
  core: true,
  color: "#f0499a",
  courses: [], 
  subGroups: [
    {
      title: "Computer Science 1",
      type: "at-most",
      count: 1,
      courses: ["CS 115", "CS 135", "CS 145"]
    },
    {
      title: "Computer Science 2",
      type: "at-most",
      count: 1,
      courses: ["CS 116", "CS 136", "CS 146"]
    },
    {
      title: "Linear Algebra 1",
      type: "at-most",
      count: 1,
      courses: ["MATH 106", "MATH 136", "MATH 146"]
    },
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
      title: "Linear Algebra 2",
      type: "at-most",
      count: 1,
      courses: ["MATH 235", "MATH 245"]
    },
    {
      title: "Calculus 3 / Combinatorics",
      type: "at-least",
      count: 1,
      canDoubleCount: true,
      courses: ["MATH 239", "MATH 237", "MATH 247", "MATH 249"],
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

