import { RequirementGroup } from "@/types";


const MATH_CORE: RequirementGroup = {
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

export const STAT_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Statistics Core",
        type: "required",
        core: true,
        color: "#A5D6A7",
        courses: ["ENGL 378", "STAT 330", "STAT 331", "STAT 332", "STAT 333"],
    },
    {
        title: "Math & CS Options",
        type: "complex",
        color: "#FCD34D",
        courses: [],
        subGroups: [
            {
                title: "Calculus 4 / DEs / Combinatorics (Pick 1)",
                type: "at-most",
                count: 1,
                courses: [
                    "AMATH 231", "AMATH 242", "AMATH 250", "AMATH 251", 
                    "AMATH 350", "CS 371", "MATH 239", "MATH 249"
                ]
            },
            {
                title: "Calculus 3 (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            }
        ]
    },
    {
        title: "400-level STAT Electives",
        type: "elective",
        minCourses: 2,
        color: "#81C784",
        courses: [],
        rules: [{ 
            prefixes: ["STAT"], 
            minLevel: 400 
        }]
    },
    {
        title: "Additional 300/400 STAT",
        type: "elective",
        minCourses: 1,
        color: "#A5D6A7",
        courses: [],
        rules: [{ 
            prefixes: ["STAT"], 
            minLevel: 300 
        }]
    },
    {
        title: "Advanced STAT or CS Machine Learning",
        type: "complex",
        color: "#4DB6AC",
        courses: [],
        minCourses: 1,
        subGroups: [
            {
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    {
                        title: "ML Options",
                        type: "at-most",
                        count: 1,
                        courses: ["CS 457", "CS 485", "CS 486"],
                    },
                    {
                        title: "Advanced STAT Options",
                        type: "elective",
                        count: 1,
                        courses: [],
                        rules: [{ prefixes: ["STAT"], minLevel: 400 }]
                    }
                ]
            }
        ],
    },
    {
        title: "Upper-Year Math Electives",
        type: "elective",
        minCourses: 4,
        color: "#90CAF9",
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
        color: "#BBDEFB",
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"]
        }]
    }
];

export const CO_REQS: RequirementGroup[] = [
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

export const PMATH_REQS: RequirementGroup[] = [
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

export const ACTSCI_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Actuarial Science Core",
        type: "complex",
        core: true,
        color: "#F87171",
        courses: [],
        subGroups: [
            {
                title: "Required Major Courses",
                type: "at-least",
                count: 15,
                courses: [
                    "ACTSC 231", "ACTSC 232", "ACTSC 331", "ACTSC 363", "ACTSC 372",
                    "ACTSC 431", "ACTSC 446", "AFM 101", "ECON 101", "ECON 102",
                    "ENGL 378", "MTHEL 131", "STAT 330", "STAT 331", "STAT 333"
                ]
            },
            {
                title: "Differential Equations (Pick 1)",
                type: "at-most",
                count: 1,
                courses: ["AMATH 250", "AMATH 251", "AMATH 350"]
            },
            {
                title: "Calculus 3 Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            },
            {
                title: "Computational/Stochastic Simulation",
                type: "at-most",
                count: 1,
                courses: ["STAT 340", "STAT 341"]
            }
        ]
    },
    {
        title: "Advanced ACTSCI Electives",
        type: "elective",
        color: "#A5D6A7",
        minCourses: 2,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC"], 
            minLevel: 400 
        }]
    },
    {
        title: "Upper-Year Math Elective",
        type: "elective",
        color:  "#f09662",
        minCourses: 1,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"], 
            minLevel: 300 
        }]
    },
    {
        title: "Advanced ACTSC or Finance/Stats",
        type: "elective",
        color: "#dbcf62",
        minCourses: 2,
        courses: ["AFM 424", "STAT 431", "STAT 433", "STAT 441", "STAT 443"],
        rules: [{ 
            prefixes: ["ACTSC"], 
            minLevel: 300 
        }]
    }
];

export const AMATH_REQS: RequirementGroup[] = [
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

export const AMATH_SCI_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "AMATH with SCI Comp Core",
        type: "complex",
        core: true,
        color: "#38BDF8",
        courses: [],
        subGroups: [
            {
                title: "Required Foundational Courses",
                type: "at-least",
                count: 3,
                courses: ["AMATH 231", "AMATH 445", "CS 234"]
            },
            {
                title: "Intro Computational Math",
                type: "at-most",
                count: 1,
                courses: ["AMATH 242", "CS 371"]
            },
            {
                title: "Differential Equations",
                type: "at-most",
                count: 1,
                courses: ["AMATH 250", "AMATH 251"]
            },
            {
                title: "Computational Modeling Choice",
                type: "at-most",
                count: 1,
                courses: ["AMATH 342", "AMATH 345", "AMATH 449", "CS 479"]
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
            },
        ]
    },
    {
        title: "Upper-Year AMATH Electives",
        type: "elective",
        color: "#dfec78",
        minCourses: 2,
        courses: [],
        rules: [{ prefixes: ["AMATH"], minLevel: 300 }]
    },
    {
        title: "Advanced AMATH (400-level)",
        type: "elective",
        color: "#e8b260",
        minCourses: 1,
        courses: [],
        rules: [{ prefixes: ["AMATH"], minLevel: 400 }]
    },
    {
        title: "Specialization List 1",
        type: "complex",
        color: "#f3a3e4",
        courses: [],
        subGroups: [
            {
                title: "Specialization List 1",
                type: "at-least",
                count: 4,
                courses: [
                    "AMATH 342", "AMATH 391", "AMATH 442", "AMATH 449", 
                    "AMATH 477", "CO 367", "CO 466", "CS 231", "CS 467", 
                    "CS 475", "CS 479", "PMATH 343", "STAT 331", 
                    "STAT 341", "STAT 441", "STAT 444"
                ],
            }
        ]
    }
];

export const BIOSTAT_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Biostatistics Core",
        type: "complex",
        core: true,
        color: "#10B981",
        courses: [],
        subGroups: [
            {
                title: "Required Major Courses",
                type: "at-least",
                count: 9,
                courses: [
                    "ENGL 378", "STAT 330", "STAT 331", "STAT 332", "STAT 333",
                    "STAT 337", "STAT 431", "STAT 437", "STAT 438"
                ]
            },
            {
                title: "Calculus 3 Options",
                type: "at-most",
                count: 1,
                courses: ["MATH 237", "MATH 247"]
            },
            {
                title: "Math Computation & Combinatorics",
                type: "at-most",
                count: 1,
                courses: [
                    "AMATH 231", "AMATH 242", "AMATH 250", "AMATH 251", 
                    "AMATH 350", "CS 371", "MATH 239", "MATH 249"
                ]
            },
            {
                title: "Life Science Elective",
                type: "at-most",
                count: 1,
                courses: ["BIOL 239", "HLTH 101"]
            },
        ]
    },
    {
        title: "Upper-Year STAT Electives",
        type: "elective",
        color: "#ef8181",
        minCourses: 2,
        courses: [],
        rules: [{ prefixes: ["STAT"], minLevel: 300 }]
    },
    {
        title: "Upper-Year Math Electives",
        type: "elective",
        color: "#efb881",
        minCourses: 2,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"], 
            minLevel: 300 
        }]
    },
    {
        title: "General Math Electives",
        type: "elective",
        color: "#dfe863",
        minCourses: 3,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"] 
        }]
    }
];

export const COMP_MATH_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Computational Mathematics Core",
        type: "complex",
        core: true,
        color: "#0EA5E9",
        courses: [],
        subGroups: [
            {
                title: "Required CS & Systems",
                type: "at-least",
                count: 2,
                courses: ["CS 230", "CS 234"]
            },
            {
                title: "Intro Computational Math",
                type: "at-most",
                count: 1,
                courses: ["AMATH 242", "CS 371"]
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
            }
        ]
    },
    {
        title: "List 1: Core Breadth (Pick 2)",
        type: "complex",
        color: "#94b7ef",
        minCourses: 2,
        minSubGroups: 2,
        courses: [],
        subGroups: [
            { title: "Differential Equations", type: "at-most", count: 1, courses: ["AMATH 250", "AMATH 251", "AMATH 350"] },
            { title: "Optimization", type: "at-most", count: 1, courses: ["CO 250", "CO 255"] },
            { title: "Logic", type: "at-most", count: 1, courses: ["CS 245", "CS 245E", "PMATH 330", "PMATH 432"] },
            { title: "OOP Software Dev", type: "at-most", count: 1, courses: ["CS 246", "CS 246E"] }
        ]
    },
    {
        title: "List 2: Applied Computation",
        type: "complex",
        color: "#6ee8de",
        minCourses: 2,
        courses: [],
        subGroups: [
            {
                title: "Direct Computational Options",
                type: "at-least",
                count: 0,
                courses: ["AMATH 342", "CS 475", "PMATH 370"]
            },
            { title: "Discrete Opt (Max 1)", type: "at-most", count: 1, courses: ["CO 353", "CO 367"] },
            { title: "Stochastic/Stats (Max 1)", type: "at-most", count: 1, courses: ["STAT 340", "STAT 341"] }
        ]
    },
    {
        title: "Lists 2 & 3: Advanced Electives",
        type: "elective",
        color: "#5ef5a7",
        courses: [],
        subGroups: [
            {
                type: "at-least",
                count: 2,
                courses: [
                    "ACTSC 447",
                    "AMATH 442", "AMATH 449", "AMATH 455", "AMATH 477",
                    "CO 450", "CO 452", "CO 454", 
                    "CO 456", "CO 463", "CO 466", "CO 471", "CO 485", "CO 487",
                    "CS 341", "CS 431", "CS 451", "CS 466", "CS 476", "CS 479", 
                    "CS 480", "CS 482", "CS 485", "CS 487", "STAT 440", "STAT 441", 
                    "STAT 442", "STAT 444"
                ]
            },
            {
                type: "at-least",
                count: 2,
                courses: [
                    "ACTSC 447", "AMATH 343", "AMATH 382", "AMATH 383", "AMATH 391", 
                    "AMATH 442", "AMATH 449", "AMATH 455", "AMATH 477", "BIOL 382",
                    "CO 351", "CO 370", "CO 372", "CO 450", "CO 452", "CO 454", 
                    "CO 456", "CO 463", "CO 466", "CO 471", "CO 485", "CO 487",
                    "CS 341", "CS 431", "CS 451", "CS 466", "CS 476", "CS 479", 
                    "CS 480", "CS 482", "CS 485", "CS 487", "STAT 440", "STAT 441", 
                    "STAT 442", "STAT 444"
                ]
            }
        ]
    },
    {
        title: "Non-Math Subject Electives",
        type: "elective",
        color: "#90ed65",
        minCourses: 3,
        courses: [],
        rules: [{ 
            prefixes: [
                "AE", "BIOL", "BME", "CHE", "CHEM", "CIVE", "EARTH", "ECE", 
                "ECON", "ENVE", "GEOE", "ME", "MNS", "MSE", "MTE", "NE", "PHYS", "SYDE"
            ] 
        }]
    }
];

export const IT_MGMT_REQS: RequirementGroup[] = [
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

export const MATH_ECON_REQS: RequirementGroup[] = [
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

export const MATH_FIN_REQS: RequirementGroup[] = [
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

export const MATH_OP_REQS: RequirementGroup[] = [
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

export const MATH_PHYS_REQS: RequirementGroup[] = [
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

export const MATH_STUD_REQS: RequirementGroup[] = [
    {
        title: "Mathematics Core",
        type: "complex",
        core: true,
        color: "#ee46b9",
        courses: [],
        subGroups: [
            {
                title: "CS 1: Functional Programming",
                type: "at-most",
                count: 1,
                courses: ["CS 115", "CS 135", "CS 145"]
            },
            {
                title: "CS 2: Algorithms & Data",
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
                title: "Honours Algebra (Proofs)",
                type: "at-most",
                count: 1,
                courses: ["MATH 135", "MATH 145"]
            },
            {
                title: "Upper-Level Math Choice",
                type: "at-most",
                count: 1,
                courses: ["MATH 207", "MATH 229", "MATH 237", "MATH 239", "MATH 247", "MATH 249"]
            },
            {
                title: "Linear Algebra 2",
                type: "at-most",
                count: 1,
                courses: ["MATH 225", "MATH 235", "MATH 245"]
            },
            {
                title: "Probability",
                type: "at-most",
                count: 1,
                courses: ["STAT 220", "STAT 230", "STAT 240"]
            },
            {
                title: "Statistics",
                type: "at-most",
                count: 1,
                courses: ["STAT 221", "STAT 231", "STAT 241"]
            }
        ]
    },
    {
        title: "Advanced Math Electives",
        type: "elective",
        color: "#e78a38",
        minCourses: 10,
        courses: [],
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"],
            minLevel: 300 
        }]
    }

];

export const MATH_TEACH_REQS: RequirementGroup[] = [
    MATH_CORE,
    {
        title: "Mathematics/Teaching Specialization",
        type: "complex",
        color: "#10B981",
        courses: [],
        subGroups: [
            {
                title: "Required Pedagogy & Computing",
                type: "at-least",
                count: 3,
                courses: ["ACTSC 221", "CS 234", "MTHEL 206"]
            },
            {
                title: "Differential Equations Choice",
                type: "at-most",
                count: 1,
                courses: ["AMATH 250", "AMATH 251", "AMATH 343"]
            },
            {
                title: "Optimization Choice",
                type: "at-most",
                count: 1,
                courses: ["CO 250", "CO 255"]
            },
            {
                title: "Applications of Computing",
                type: "at-most",
                count: 1,
                courses: ["CS 230", "CS 330", "CS 338", "CS 370", "CS 371", "CS 430", "CS 436"]
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
                title: "Introductory Psychology",
                type: "at-most",
                count: 1,
                courses: ["PSYCH 101", "PSYCH 101R"]
            },
            {
                title: "Developmental/Educational Psychology",
                type: "at-most",
                count: 1,
                courses: ["PSYCH 211", "PSYCH 212", "PSYCH 212R"]
            }
        ]
    },
    {
        title: "Advanced Math Core",
        type: "complex",
        color: "",
        courses: [],
        subGroups: [
            {
                title: "Geometry & Logic",
                type: "at-most",
                count: 1,
                courses: ["PMATH 320", "PMATH 321", "PMATH 330", "PMATH 340", "PMATH 432", "PMATH 440"]
            },
            {
                title: "Algebraic Structures",
                type: "at-most",
                count: 1,
                courses: ["PMATH 334", "PMATH 336", "PMATH 347", "PMATH 348"]
            },
            {
                title: "Analysis Options",
                type: "at-most",
                count: 1,
                courses: ["AMATH 331", "AMATH 332", "PMATH 331", "PMATH 332", "PMATH 333", "PMATH 351", "PMATH 352"]
            },
            {
                title: "Advanced Statistics",
                type: "at-most",
                count: 1,
                courses: ["STAT 331", "STAT 332", "STAT 333"]
            },
            {
                title: "Math History & Discovery",
                type: "at-most",
                count: 1,
                courses: ["CO 380", "CO 480"]
            }
        ]
    },
    {
        title: "Upper-Year Math Units",
        type: "elective",
        color: "#d8e84b",
        minCourses: 8,
        courses: [],
        canDoubleCount: true,
        rules: [{ 
            prefixes: ["ACTSC", "AMATH", "CO", "CS", "MATBUS", "MATH", "PMATH", "STAT"],
            minLevel: 300 
        }]
    }
];

export const DS_BMATH_REQS: RequirementGroup[] = [
    {
        title: "Mathematics Core",
        type: "complex",
        core: true,
        color: "#ea4592",
        courses: [],
        subGroups: [
            { title: "Algebra 1", type: "at-most", count: 1, courses: ["MATH 135", "MATH 145"] },
            { title: "Linear Algebra 1", type: "at-most", count: 1, courses: ["MATH 106", "MATH 136", "MATH 146"] },
            { title: "Calculus 1", type: "at-most", count: 1, courses: ["MATH 127", "MATH 137", "MATH 147"] },
            { title: "Calculus 2", type: "at-most", count: 1, courses: ["MATH 128", "MATH 138", "MATH 148"] },
            { title: "Linear Algebra 2", type: "at-most", count: 1, courses: ["MATH 235", "MATH 245"] },
            { title: "Calculus 3", type: "at-most", count: 1, courses: ["MATH 237", "MATH 247"] },
            { title: "Combinatorics", type: "at-most", count: 1, courses: ["MATH 239", "MATH 249"] },
            { title: "Probability", type: "at-most", count: 1, courses: ["STAT 230", "STAT 240"] },
            { title: "Statistics", type: "at-most", count: 1, courses: ["STAT 231", "STAT 241"] }
        ]
    },
    {
        title: "Computer Science Core",
        type: "complex",
        core: true,
        color: "#8745ea",
        courses: [],
        subGroups: [
            { title: "CS 1", type: "at-most", count: 1, courses: ["CS 115", "CS 135", "CS 145"] },
            { title: "Elementary Algorithm Design", type: "at-most", count: 1, courses: ["CS 136", "CS 146"] },
            { title: "Data Structures", type: "at-most", count: 1, courses: ["CS 240", "CS 240E"] },
            { title: "Sequential Programs", type: "at-most", count: 1, courses: ["CS 241", "CS 241E"] },
            { title: "Logic & Computation", type: "at-most", count: 1, courses: ["CS 245", "CS 245E"] },
            { title: "Object-Oriented", type: "at-most", count: 1, courses: ["CS 246", "CS 246E"] },
            { title: "Computer Org", type: "at-most", count: 1, courses: ["CS 251", "CS 251E"] }
        ]
    },
    {
        title: "Data Science Core",
        type: "complex",
        core: true,
        color: "#2563EB",
        courses: [],
        subGroups: [
            {
                title: "Required Foundational Core",
                type: "at-least",
                count: 12,
                courses: [
                    "CS 136L","CS 230","CS 231","CS 234","CS 338","CS 431",
                    "DATSC 401","ENGL 378","PHIL 228","STAT 331","STAT 341","STAT 442"
                ]
            },
            {
                title: "Advanced Data & Optimization (Pick 2)",
                type: "at-least",
                count: 2,
                courses: ["AMATH 345","AMATH 391","CO 353","CO 365","CO 367","CO 370"]
            },
            {
                title: "Machine Learning & AI Specialization",
                type: "at-least",
                count: 2,
                courses: ["AMATH 445","STAT 441","STAT 443","STAT 444"]
            },
            {
                title: "Optimization Course",
                type: "at-most",
                count: 1,
                courses: ["CO 250","CO 255"],
            },
            {
                title: "Differential Equations Course",
                type: "at-most",
                count: 1,
                courses: ["AMATH 231","AMATH 250","AMATH 251"]
            }
        ]
    },
    {
        title: "Specialized Statistics Options",
        type: "complex",
        color: "#8B5CF6",
        courses: [],
        subGroups: [
            {
                type: "or",
                count: 2,
                courses: [],
                subGroups: [
                    {
                        title: "Computational Math Pair",
                        type: "at-least",
                        count: 2,
                        courses: [],
                        subGroups: [
                            {
                                title: "AMATH Path",
                                type: "at-least",
                                count: 1,
                                courses: ["AMATH 242", "CS 335", "CS 370", "CS 371"]
                            },
                            {
                                title: "Neural Networks Path",
                                type: "at-least",
                                count: 1,
                                courses: ["AMATH 449","CS 479"]
                            }
                        ],
                    },
                    {
                        title: "Statistical Inference Pair",
                        type: "at-least",
                        count: 2,
                        requiredCourse: "STAT 330",
                        courses: ["STAT 431", "STAT 440"],
                    },
                    {
                        title: "Experimental Design Pair",
                        type: "at-least",
                        count: 2,
                        requiredCourse: "STAT 332",
                        courses: ["STAT 430", "STAT 454"],
                    }
                ]
            }
        ]
    }
];

