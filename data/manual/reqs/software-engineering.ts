
import { RequirementGroup } from "@/types";

export const SOFTWARE_ENGINEERING_REQS: RequirementGroup[] = [
    {
        title:   "Software Engineering Core",
        core: true,
        type:    "required",
        color:   "#A855F7",
        courses: [
            "CS 137","CHE 102","MATH 115","MATH 117","MATH 135","SE 101",
            "CS 138","ECE 124","ECE 140","ECE 192","MATH 119","SE 102",
            "CS 241","ECE 222","SE 201","SE 212","STAT 206","ECE 105","PHYS 115","PHYS 121",
            "CS 240","CS 247","CS 348","MATH 239","SE 202",
            "CS 341","MATH 213","SE 301","SE 350","SE 464","SE 465",
            "CS 343","ECE 358","SE 302","SE 380","SE 463","CS 349","CS 449","MSE 343",
            "SE 401","GENE 403","SE 490",
            "SE 402","GENE 404","SE 491"
        ],
    },
    {
        title: "Communication Eelective",
        type: "elective",
        minCourses: 1,
        color: "#f6ab51",
        courses: [
            "COMMST 100", "COMMST 223", "EMLS 101R", "EMLS 102R", "EMLS 129R", "ENGL 109", "ENGL 119", 
            "ENGL 129R", "ENGL 209", "ENGL 210E"
        ]
    },
    {
        title: "Natural Science Electives",
        type: "elective",
        minCourses: 3,
        color: "#5feaa4",
        courses: [],
        subGroups: [
            {
                title: "Intro Cell Biology",
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    { title: "Lecture + Lab", type: "at-least", count: 2, courses: ["BIOL 130", "BIOL 130L"] },
                    { title: "Lecture Only", type: "at-least", count: 1, courses: ["BIOL 130"] }
                ]
            },
            {
                title: "Microbiology",
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    { title: "Lecture + Lab", type: "at-least", count: 2, courses: ["BIOL 240", "BIOL 240L"] },
                    { title: "Lecture Only", type: "at-least", count: 1, courses: ["BIOL 240"] }
                ]
            },
            {
                title: "Human Physiology 2",
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    { title: "Lecture + Lab", type: "at-least", count: 2, courses: ["BIOL 373", "BIOL 373L"] },
                    { title: "Lecture Only", type: "at-least", count: 1, courses: ["BIOL 373"] }
                ]
            },
            {
                title: "General Chemistry 2",
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    { title: "Lecture + Lab", type: "at-least", count: 2, courses: ["CHEM 123", "CHEM 123L"] },
                    { title: "Lecture Only", type: "at-least", count: 1, courses: ["CHEM 123"] }
                ]
            },
            {
                title: "Intro Biochemistry",
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    { title: "Lecture + Lab", type: "at-least", count: 2, courses: ["CHEM 237", "CHEM 237L"] },
                    { title: "Lecture Only", type: "at-least", count: 1, courses: ["CHEM 237"] }
                ]
            },
            {
                title: "Organic Chemistry (Eng)",
                type: "or",
                count: 1,
                courses: [],
                subGroups: [
                    { title: "Lecture + Lab", type: "at-least", count: 2, courses: ["CHEM 262", "CHEM 262L"] },
                    { title: "Lecture Only", type: "at-least", count: 1, courses: ["CHEM 262"] }
                ]
            },
            {
                title: "Other Science Electives",
                type: "elective",
                count: 3,
                courses: [
                    "AMATH 382", "BIOL 110", "BIOL 150", "BIOL 165", "BIOL 211", "BIOL 220",
                    "BIOL 239", "BIOL 241", "BIOL 273", "BIOL 280", "BIOL 365", "BIOL 376", 
                    "BIOL 382", "BIOL 469", "BIOL 476", "BIOL 489", "CHE 161", "CHEM 209", 
                    "CHEM 254", "CHEM 266", "CHEM 356", "CS 482", "EARTH 121", "EARTH 122", 
                    "EARTH 123", "EARTH 221", "EARTH 270", "EARTH 281", "ECE 106", "ECE 231", 
                    "ECE 305", "ECE 403", "ECE 404", "ENVE 275", "ENVS 200", "NE 222", "PHYS 122", 
                    "PHYS 124", "PHYS 175", "PHYS 233", "PHYS 234", "PHYS 263", "PHYS 275", 
                    "PHYS 280", "PHYS 334", "PHYS 335", "PHYS 375", "PHYS 380", "PHYS 468", 
                    "PSYCH 207", "PSYCH 261", "PSYCH 306", "PSYCH 307", "SCI 200", "SCI 201", 
                    "SCI 238", "SCI 250"
                ]
            }
        ]
    },
    {
        title: "Technical Electives",
        type: "elective",
        minCourses: 1,
        color: "#CE93D8",
        courses:    [
            "AMATH 242", "AMATH 449",
            "CS 360", "CS 365", "CS 370", "CS 371",
            "CS 442", "CS 444", "CS 448", "CS 450", "CS 451", "CS 452", "CS 453", "CS 454", "CS 457", "CS 459",
            "CS 462", "CS 466", "CS 479", "CS 480", "CS 484", "CS 485", "CS 486", "CS 487", "CS 488", "CS 489"
        ],
    },
    {
        title: "List 2",
        type: "elective",
        color: "#e25f5f",
        minCourses: 1,
        courses: [
            "ECE 313", "ECE 320", "ECE 327", "ECE 340", "ECE 405A", "ECE 405B", "ECE 405C", "ECE 405D", "ECE 409", 
            "ECE 416", "ECE 417", "ECE 423", "ECE 454", "ECE 455", "ECE 457A", "ECE 457B", "ECE 457C", "ECE 458", 
            "ECE 459", "ECE 481", "ECE 486", "ECE 488", "ECE 493", "ECE 495"
        ]
    },
    {
        title: "List 1 / List 2 / List 3",
        type: "elective",
        color: "#efea5f",
        minCourses: 2,
        courses: [
            "AMATH 242", "AMATH 449",
            "CS 360", "CS 365", "CS 370", "CS 371",
            "CS 442", "CS 444", "CS 448", "CS 450", "CS 451", "CS 452", "CS 453", "CS 454", "CS 457", "CS 459",
            "CS 462", "CS 466", "CS 479", "CS 480", "CS 484", "CS 485", "CS 486", "CS 487", "CS 488", "CS 489",

            "ECE 313", "ECE 320", "ECE 327", "ECE 340", "ECE 405A", "ECE 405B", "ECE 405C", "ECE 405D", "ECE 409", 
            "ECE 416", "ECE 417", "ECE 423", "ECE 454", "ECE 455", "ECE 457A", "ECE 457B", "ECE 457C", "ECE 458", 
            "ECE 459", "ECE 481", "ECE 486", "ECE 488", "ECE 493", "ECE 495",

            "BIOL 487", "CO 331", "CO 342", "CO 351", "CO 353", "CO 367", "CO 456", "CO 481", "CO 485", "CO 487", 
            "CS 467", "MSE 343", "MSE 446", "MSE 543", "MTE 544", "MTE 546", "PHYS 467", "SE 498", "STAT 440", 
            "STAT 441", "STAT 442", "STAT 444", "SYDE 533", "SYDE 543", "SYDE 548", "SYDE 552", "SYDE 556", "SYDE 575"
        ]
    },
    {
        title: "Sustainability-realted Requirement",
        type: "elective",
        color: "#74f25b",
        minCourses: 1,
        canDoubleCount: true,
        courses: [
            "ENBUS 211", "ENVS 105", "ENVS 205", "ENVS 220", "ERS 215", "ERS 253", "ERS 270", "ERS 320", "ERS 361", 
            "ERS 370", "GEOG 361", "GEOG 459", "THPERF 374"
        ]
    },
    {
        title: "Additional Requirements",
        type: "elective",
        color: "#5ad8e6",
        minCourses: 1,
        courses: [
            "BIOL 489", "EARTH 270", "ENBUS 102", "ENBUS 211", "ENGL 248", "ENVS 105", "ENVS 200", "ENVS 205", 
            "ENVS 220", "ERS 215", "ERS 225", "ERS 253", "ERS 270", "ERS 294", "ERS 310", "ERS 316", "ERS 320", 
            "ERS 328", "ERS 361", "ERS 370", "ERS 372", "ERS 404", "GEOG 203", "GEOG 207", "GEOG 225", "GEOG 361", 
            "GEOG 459", "PACS 310", "PHIL 224", "PLAN 451", "PSCI 432", "RCS 285", "SCI 200", "SCI 201", "THPERF 374"
        ]
    }
];
