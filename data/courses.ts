import type { CourseMap, MajorId, Requisite } from "../types";

// ── Raw Course Records ────────────────────────────────────────────────────────
// Each course lists which majors include it via the `majors` field.
// `leadsTo` is computed at build time from prereq relationships.

type RawCourse = Omit<CourseMap[string], "leadsTo">;

const RAW_COURSES: RawCourse[] = [

  // ── CS Courses ───────────────────────────────────────

  { code: "CS 100",  title: "Introduction to Computing Through Applications", units: 0.5, 
    prereqs: [], antireqs: ["CS 240E","CS 241E","CS 245E","CS 246E","CS 251E","CS 240","CS 241","CS 245","CS 246","CS 251", "CS 341","CS 350","CS 343","CS 346","CS348","CS349","CS 360","CS 365","CS 370","CS 371","CS 383","CS 398","CS 399", "CS 442","CS 444","CS 445","CS 446","CS 447","CS 448","CS 449", "CS 450","CS 451","CS 452","CS 453","CS 454","CS 456", "CS 457","CS 459", "CS 462","CS 466","CS 467","CS 475","CS 476","CS 479", "CS 480","CS 482","CS 484","CS 485","CS 486","CS 487","CS 488","CS 489", "CS 490","CS 492","CS 493","CS 494","CS 497"],
    tags: ["core"], majors: ["other"], exclMajors: ["cs","ds","math","se"] },

  { code: "CS 105",  title: "Introduction to Computer Programming 1", units: 0.5, 
    prereqs: [], antireqs: ["BME 121","CS 115","CS 135","CS 137","CS 145","CIVE 121","ECE 150","MSE 121","MTE 121","NE 111","SYDE 121","CHE 121","GENE 121","MSCI 121","PHYS 236"],
    tags: ["core"], majors: ["any"], exclMajors: ["cs","ds","math"] },

  { code: "CS 106",  title: "Introduction to Computer Programming 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CS 105"] }], 
    antireqs: ["BME 121","CS 115","CS 135","CS 137","CS 145","CIVE 121","ECE 150","MSE 121","MTE 121","NE 111","SYDE 121","CHE 121","GENE 121","MSCI 121"],
    tags: ["core"], majors: ["any"], exclMajors: ["cs","ds","math"] },

  { code: "CS 114",  title: "Principles of Computing for Science", units: 0.5, 
    prereqs: [], 
    antireqs: ["BME 121","CHEM 120","CIVE 121","CS 116","CS 135","CS 136","CS 138","CS 145","CS 146","ECE 150","ME 101","MSE 121","MTE 121","NE 111","SYDE 121","GENE 121","MSCI 121","PHYS 236"],
    tags: ["core"], majors: ["any"], exclMajors: ["cs","ds","math"] },

  { code: "CS 115",  title: "Introduction to Computer Science 1", units: 0.5, 
    prereqs: [], 
    antireqs: ["BME 121","CIVE 121","CS 135","CS 137","CS 145","ECE 150","ME 101","MSE 121","MTE 121","NE 111","SYDE 121","CHE 121","GENE 121","MSCI 121","PHYS 139"],
    tags: ["core"], majors: ["any"], exclMajors: ["cs","ds","se"] },

  { code: "CS 116",  title: "Introduction to Computer Science 2", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 115","MATH 135","MATH 145"] }], 
    antireqs: ["CS 114","CS 136","CS 137","CS 138","CS 146","MSE 240","NE 111","MSCI 240","PHYS 236","PHYS 239"],
    tags: ["core"], majors: ["any"], exclMajors: ["cs","ds","se"] },

  { code: "CS 135",  title: "Designing Functional Programs", units: 0.5, 
    prereqs: [], 
    antireqs: ["AE 121","BME 121","CIVE 121","CS 115","CS 137","CS 138","CS 145","ECE 150","ME 101","MSE 121","SYDE 121","MSCI 121","PHYS 236"],
    tags: ["core"], majors: ["cs","ds","math"], offered: ["F","W","S"] },

  { code: "CS 136",  title: "Elementary Algorithm Design", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 115","CS 116","CS 135","CS 145"] }], 
    antireqs: ["CS 137","CS 138","CS 146","PHYS 239"],
    tags: ["core"], majors: ["cs","ds","math"] },

  { code: "CS 136L",  title: "Tools and Techniques for Software Development", units: 0.25, 
    prereqs: [{ type: "OR", reqs: ["CS 115","CS 116","CS 135","CS 145"] }, { type: "OR", reqs: ["CS 136","CS 146"] }], 
    antireqs: [""],
    tags: ["core"], majors: ["cs","ds","math"] },

  { code: "CS 137",  title: "Programming Principles", units: 0.5, 
    prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "CS 138",  title: "Introduction to Data Abstraction and Implementation", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 137"] }], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "CS 145",  title: "Designing Functional Programs (Advanced Level)", units: 0.5, 
    prereqs: [], antireqs: ["CS 115","CS 135","CS 137","CS 138"],
    tags: ["core","advanced"], majors: ["cs","ds","math"] },

  { code: "CS 146",  title: "Elementary Algorithm Design (Advanced Level)", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CS 145"] }], antireqs: ["CS 116","CS 136","CS 137","CS 138"],
    tags: ["core","advanced"], majors: ["cs","ds","math"] },

  { code: "CS 230",  title: "Introduction to Computers and Computer Systems", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 116","CS 136","CS 138","CS 146","CS 114","CS 115","CS 135","CS 145"] }],
    antireqs: ["BME 393","CS 241","CS 241E","CS 251","CS 251E","SYDE 192","BME 292"],
    tags: ["core"], majors: ["math"] },

  { code: "CS 231",  title: "Algorithmic Problem Solving", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 116","CS 136","CS 138","CS 146","CS 114","CS 115","CS 135","CS 145"] }],
    antireqs: ["BME 122","CS 341","ECE 250","MSE 240","MTE 140","SYDE 223","MSCI 240"],
    tags: ["core"], majors: ["math"] },

  { code: "CS 234",  title: "Data Types and Structures", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 116","CS 136","CS 138","CS 146","CS 114","CS 115","CS 135","CS 145"] }],
    antireqs: ["BME 122","CS 341","ECE 250","MSE 240","MTE 140","SYDE 223","MSCI 240"],
    tags: ["core"], majors: ["math"] },

  { code: "CS 240",  title: "Data Structures & Data Management", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 245","CS 245E","SE 212"] }, { type: "OR", reqs: ["CS 241","CS 24E","CS 246","CS 246E","CS 247"] }, { type: "OR", reqs: ["STAT 206","STAT 230","STAT 240"] }],
    antireqs: ["BME 122","CS 234","CS 240E","ECE 250","MTE 140","SYDE 223"],
    tags: ["core"], majors: ["cs","ds","se"] },

  { code: "CS 240E",  title: "Data Structures & Data Management (Enriched)", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 136","CS 138","CS 146"] }, { type: "OR", reqs: ["STAT 206","STAT 230","STAT 240"] }],
    antireqs: ["CS 234","CS 240","ECE 250"],
    tags: ["core"], majors: ["cs","ds","se"] },

  { code: "CS 241",  title: "Foundations of Sequential Programs",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["CS 138","CS 136","CS 146","CS 246","CS 246E"] }], antireqs: ["CS 230","CS 241E","ECE 351"],
    tags: ["core"], majors: ["cs","se","ds"] },
    
  { code: "CS 241E",  title: "Foundations of Sequential Programs (Enriched)",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["CS 138","CS 136","CS 146"] }], antireqs: ["CS 230","CS 241","ECE 351"],
    tags: ["core","advanced"], majors: ["cs","se","ds"] },

  { code: "CS 245",  title: "Logic & Computation", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 136","CS 138","CS 146"] }, { type: "OR", reqs: ["MATH 135","MATH 145"] }],
    antireqs: ["CS 245E","ECE 208","PMATH 330","SE 212"],
    tags: ["core"], majors: ["cs","ds","math"] },

  { code: "CS 245E",  title: "Logic & Computation (Enriched)", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 136","CS 146"] }],
    antireqs: ["CS 245","ECE 208","PMATH 330","SE 212"],
    tags: ["core"], majors: ["cs","ds","math"] },

  { code: "CS 246",  title: "Object-Oriented Software Development", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 136","CS 138","CS 146"] }], 
    antireqs: ["CS 246E","CS 247","MSE 342","SYDE 322","MSCI 342"],
    tags: ["core"], majors: ["cs","ds","math"] },

  { code: "CS 246E",  title: "Object-Oriented Software Development (Enriched)", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 136","CS 146"] }], antireqs: ["CS 246","SYDE 322"],
    tags: ["core"], majors: ["cs","ds","math"] },

  { code: "CS 247",  title: "Software Engineering Principles", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 241","CS 241E"] }], 
    antireqs: ["CS 246","CS 246E","MSE 342","SYDE 322","MSCI 342"],
    tags: ["core"], majors: ["se"] },

  { code: "CS 251",  title: "Computer Organization & Design", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 136","CS 138","CS 146"] }], 
    antireqs: ["BME 393","CS 251E","ECE 222","ME 262","MTE 262","SYDE 192","BME 292"],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 251E",  title: "Computer Organization & Design (Enriched)", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 136","CS 146"] }], 
    antireqs: ["BME 393","CS 251","ECE 222","ME 262","MTE 262","SYDE 192","BME 292"],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 330",  title: "Management Information Systems", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 106","CS 116","CS 136","CS 138","CS 146","CS 114","CS 115","CS 135","CS 145"] }], 
    antireqs: ["AFM 241","CS 490","BUS 415W","BUS 486W"],
    tags: ["data"], majors: ["math"] },

  { code: "CS 335",  title: "Computational Methods in Business and Finance", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 116","CS 136","CS 138","CS 146","CS 114","CS 115","CS 135","CS 145"] }, { type: "OR", reqs: ["MATH 136","MATH 146","MATH 106"] }, { type: "OR", reqs: ["MATH 237","MATH 247"] }, { type: "OR", reqs: ["STAT 206","STAT 231","STAT 241"] }], 
    antireqs: ["AMATH 242","CS 271","CS 371","MTE 204"],
    tags: ["data"], majors: ["math"] },

  { code: "CS 338",  title: "Computer Applications in Business: Databases", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 230","CS 231","CS 234","CS 246","CS 246E","CS 330",{ type: "AND", reqs: ["AFM 341", { type: "OR", reqs: ["CS 116, CS 136, CS 146"] }] }] }], 
    antireqs: [],
    tags: ["data"], majors: ["math"] },

  { code: "CS 341",  title: "Algorithms", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }, { type: "OR", reqs: ["CS 245","CS 245E","SE 212"] }, { type: "OR", reqs: ["MATH 239","MATH 249"] }, { type: "OR", reqs: ["STAT 206","STAT 230", "STAT 240"] }], 
    antireqs: ["CS 348","CS 448","MSCI 346"],
    tags: ["core","theory"], majors: ["cs","se","ds"] },

  { code: "CS 343",  title: "Concurrent and Parallel Programming", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 350","SE 350"] }], antireqs: [],
    tags: ["core","theory"], majors: ["cs","se","ds"] },

  { code: "CS 346",  title: "Application Development", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 246","CS 246E","CS 247"] }], antireqs: [],
    tags: ["core","theory"], majors: ["cs","se","ds"] },

  { code: "CS 348",  title: "Introduction to Database Management", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }],
    antireqs: ["CS 338","ECE 356","ECE 456","MSCI 346"],
    tags: ["core","theory"], majors: ["cs","se","ds"] },

  { code: "CS 349",  title: "User Interfaces", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 241","CS 241E"] }, { type: "OR", reqs: ["MATH 115","MATH 136","MATH 146"] }],
    antireqs: [],
    tags: ["core","theory"], majors: ["cs","se","ds"] },

  { code: "CS 350",  title: "Operating Systems", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }, { type: "OR", reqs: ["CS 241","CS 241E"] }, { type: "OR", reqs: ["CS 246","CS 246E"] }, { type: "OR", reqs: ["CS 251","CS 251E","ECE 222"] }],
    antireqs: ["ECE 350","MTE 241","SE 350","ECE 254"],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 360",  title: "Introduction to the Theory of Computing", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }, { type: "OR", reqs: ["CS 241","CS 241E"] }, { type: "OR", reqs: ["MATH 239","MATH 249"] }],
    antireqs: ["CS 365"],
    tags: ["theory"], majors: ["cs","ds","se"] },

  { code: "CS 365",  title: "Models of Computation", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }, { type: "OR", reqs: ["CS 241","CS 241E"] }, { type: "OR", reqs: ["MATH 239","MATH 249"] }],
    antireqs: ["CS 360"],
    tags: ["theory"], majors: ["cs","ds","se"] },

  { code: "CS 370",  title: "Numerical Computation", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 116","CS 136","CS 138","CS 146"] }, { type: "OR", reqs: ["CS 114","CS 115","CS 135","CS 145"] }, { type: "OR", reqs: ["MATH 235","MATH 245"] }, { type: "OR", reqs: ["MATH 237","MATH 247"] }],
    antireqs: ["CS 335","CS 370","ECE 204","MTE 204"],
    tags: ["numerical"], majors: ["cs","ds","se","math"] },

  { code: "CS 371",  title: "Introduction to Computational Mathematics", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146"] }, { type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148"] }, { type: "OR", reqs: ["CS 231","CS 234","CS 241","CS 241E","CS 246","CS 246E"] }],
    antireqs: ["AMATH 242","CIVE 121","CS 335","CS 370","ECE 204","MTE 204","CHEM 121"],
    tags: ["numerical"], majors: ["cs","ds","se","math"] },

  { code: "CS 383",  title: "Computational Digital Art Studio", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }, { type: "OR", reqs: ["FINE 228","FINE 247"] }],
    antireqs: ["FINE 383"],
    tags: ["creative"], majors: ["cs","ds","se","math"] },

  { code: "CS 398",  title: "Topics in Computer Science", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }, { type: "OR", reqs: ["CS 246","CS 246E","CS 247"] }],
    antireqs: [],
    tags: ["numerical"], majors: ["cs","ds","se",] },

  { code: "CS 399",  title: "Readings in Computer Science", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }, { type: "OR", reqs: ["CS 246","CS 246E","CS 247"] }],
    antireqs: [],
    tags: ["numerical"], majors: ["cs","ds","se",] },

  { code: "CS 430",  title: "Applications Software Engineering", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 330"] }], antireqs: ["CS 446","ECE 452","SE 464"],
    tags: ["data"], majors: ["math"], term: "3A" },

  { code: "CS 431",  title: "Data-Intensive Distributed Analytics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 231","CS 234","CS 341"] }, { type: "OR", reqs: ["CS 251","CS 251E","CS 330"] }],
    antireqs: ["CS 451"],
    tags: ["data"], majors: ["math"] },

  { code: "CS 436",  title: "Networks and Distributed Computer Systems", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 230","CS 241","CS 241E","CS 246","CS 246E","CS 251","CS 251E"] }],
    antireqs: ["CS 454","CS 456","ECE 358","ECE 416","ECE 454"],
    tags: ["systems"], majors: ["math"] },

  { code: "CS 442",  title: "Principles of Programming Languages",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["CS 241","CS 241E"] }, { type: "OR", reqs: ["CS 245","CS 245E","SE 212"] }, { type: "OR", reqs: ["CS 246","CS 246E","CS 247"] }],
    antireqs: [],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 444",  title: "Compiler Construction",
    units: 0.5, prereqs: [{ type: "AND", reqs: ["CS 350","SE 350"] }], antireqs: [],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 445",  title: "Software Requirements Specification and Analysis",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["CS 341","CS 350"] }],
    antireqs: ["ECE 451","SE 463"],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 446",  title: "Software Design and Architectures",
    units: 0.5, prereqs: [{ type: "AND", reqs: ["CS 350"] }],
    antireqs: ["ECE 453","CS 430","SE 464"],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 447",  title: "Database Systems Implementation",
    units: 0.5, prereqs: [{ type: "AND", reqs: ["CS 350"] }],
    antireqs: ["ECE 452","SE 465"],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 448",  title: "Software Testing, Quality Assurance, and Maintenance",
    units: 0.5, prereqs: [{ type: "AND", reqs: ["CS 348"] }, { type: "OR", reqs: ["CS 350","SE 350"] }],
    antireqs: [],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 449",  title: "Human-Computer Interaction",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }, { type: "OR", reqs: ["CS 241","CS 241E"] }],
    antireqs: ["SYDE 548","SYDE 348"],
    tags: ["systems"], majors: ["cs","ds","se"], term: "3B" },

  { code: "CS 450",  title: "Computer Architecture", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 245","CS 245E","SE 212"] }, { type: "OR", reqs: ["CS 350","SE 350"] }],
    antireqs: ["ECE 320","ECE 429"],
    tags: ["systems"], majors: ["cs","ds","se"] },

  { code: "CS 451",  title: "Data-Intensive Distributed Computing", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CS 341","CS 348"] }, { type: "OR", reqs: ["CS 350","SE 350"] }],
    antireqs: [],
    tags: ["systems"], majors: ["cs","ds","se"] },

  { code: "CS 452",  title: "Real-time Programming",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["CS 350","SE 350"] }], antireqs: [],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 453",  title: "Software and Systems Security",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["CS 350","SE 350"] }], antireqs: ["CS 489"],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 454",  title: "Distributed Systems",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["CS 350","SE 350"] }], antireqs: ["ECE 454"],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 456",  title: "Computer Networks",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["CS 350","SE 350"] }],
    antireqs: ["CS 436","ECE 358","ECE 416"],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 457",  title: "System Performance Evaluation", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 246","CS 246E","CS 247"] }, { type: "OR", reqs: ["STAT 206","STAT 231","STAT 241"] }],
    antireqs: [],
    tags: ["systems"], majors: ["cs","se","ds"] },

  { code: "CS 459",  title: "Privacy, Cryptography, Network and Data Security", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 350","SE 350"] }, { type: "OR", reqs: ["MATH 135","MATH 145"] }],
    antireqs: ["CS 454","CS 456","CS 489"],
    tags: ["security"], majors: ["cs","se","ds"] },

  { code: "CS 462",  title: "Formal Languages and Parsing", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 360","CS 365"] }],
    antireqs: [],
    tags: ["systems"], majors: ["cs","ds","se"] },

  { code: "CS 466",  title: "Algorithm Design and Analysis", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 341"] }],
    antireqs: [],
    tags: ["design"], majors: ["cs","ds","se"] },

  { code: "CS 467",  title: "Introduction to Quantum Information Processing", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 235", "MATH 245"] }],
    antireqs: ["CO 481", "PHYS 467"],
    tags: ["quantum"], majors: ["cs","ds","se","math"], term: "3A" },

  { code: "CS 475",  title: "Computational Linear Algebra", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["AMATH 242","CS 370","CS 371"] }],
    antireqs: [],
    tags: ["numerical"], majors: ["cs","ds","se","math"] },

  { code: "CS 476",  title: "Numerical Computation for Financial Modelling", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["AMATH 242","CS 370","CS 371"] }, { type: "OR", reqs: ["STAT 231","STAT 241","STAT 206"] }],
    antireqs: ["ACTSC 447"],
    tags: ["numerical"], majors: ["cs","ds","se","math"] },

  { code: "CS 479",  title: "Neural Networks", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["AMATH 242","CS 335","CS 370","CS 371"] }, { type: "OR", reqs: ["STAT 231","STAT 241","STAT 206"] }],
    antireqs: ["AMATH 449"],
    tags: ["ml"], majors: ["cs","ds","se","math"] },

  { code: "CS 480",  title: "Introduction to Machine Learning", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 341"] }, { type: "OR", reqs: ["STAT 206","STAT 231","STAT241"] }],
    antireqs: ["MSE 446","MSCI 446"],
    tags: ["ml"], majors: ["cs","ds","se"] },

  { code: "CS 482",  title: "Computational Techniques in Biological Sequence Analysis", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 341"] }, { type: "OR", reqs: ["STAT 206","STAT 231","STAT241"] }],
    antireqs: [],
    tags: ["numerical"], majors: ["cs","ds","se","math"] },

  { code: "CS 484",  title: "Computational Vision", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["AMATH 242","CS 370","CS 371","MATH 235","MATH 245"] }, { type: "OR", reqs: ["STAT 206","STAT 230","STAT240"] }],
    antireqs: [],
    tags: ["ml"], majors: ["cs","ds","se"] },

  { code: "CS 485",  title: "Statistical and Computational Foundations of Machine Learning", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 341"] }, { type: "OR", reqs: ["STAT 206","STAT 230","STAT240"] }],
    antireqs: [],
    tags: ["ml"], majors: ["cs","ds","se"] },

  { code: "CS 486",  title: "Introduction to Artificial Intelligence", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 341"] }, { type: "OR", reqs: ["STAT 206","STAT 231","STAT241"] }],
    antireqs: ["SYDE 522"],
    tags: ["ai"], majors: ["cs","ds","se"] },

  { code: "CS 487",  title: "Introduction to Symbolic Computation", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 231","CS 234","CS 240","CS 240E"] }],
    antireqs: [],
    tags: ["numerical"], majors: ["cs","ds","math"] },

  { code: "CS 488",  title: "Introduction to Computer Graphics", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 341"] }, { type: "OR", reqs: ["CS 350","SE 350"] }, { type: "OR", reqs: ["CS 370","CS 371"] }],
    antireqs: [],
    tags: ["graphics"], majors: ["cs","ds","se"] },

  { code: "CS 489",  title: "Advanced Topics in Computer Science", units: 0.5,
    prereqs: [], antireqs: [],
    tags: ["system"], majors: ["cs","ds","se"], term: "3B" },

  { code: "CS 490",  title: "Information Systems Management", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 350","SE 350"] }], antireqs: ["BUS415W","BUS486W"],
    tags: ["systems"], majors: ["cs","ds","se"] },

  { code: "CS 492",  title: "The Social Implications of Computing", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CS 240","CS 240E"] }], antireqs: [],
    tags: ["social"], majors: ["cs","ds","se"] },

  { code: "CS 493",  title: "Team Project 1", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 341","CS 350"] }], antireqs: [],
    tags: ["project"], majors: ["cs","ds"] },

  { code: "CS 494",  title: "Team Project 2", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 493"] }], antireqs: [],
    tags: ["project"], majors: ["cs","ds"] },

  { code: "CS 497",  title: "Multidisciplinary Studies in Computer Science", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["CS 493"] }], antireqs: [],
    tags: ["system"], majors: ["cs","ds","se"], term: "3B" },


  // ── Software Engineering specific ─────────────────────────────────────────
  
  { code: "SE 101",  title: "Introduction to Methods of Software Engineering",
    units: 0.25, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "SE 102",  title: "Seminar",
    units: 0.0, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "SE 201",  title: "Seminar",
    units: 0.0, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "SE 202",  title: "Seminar",
    units: 0.0, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "SE 212",  title: "Logic & Computation", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CS 138","MATH 135"] }], 
    antireqs: ["CS 245","CS 245E","ECE 208","PMATH 330"],
    tags: ["se","core"], majors: ["se"], exclMajors: ["cs","ds","math"] },

  { code: "SE 301",  title: "Seminar",
    units: 0.0, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "SE 302",  title: "Seminar",
    units: 0.0, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "SE 350",  title: "Operating Systems", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ECE 222"] }, { type: "OR", reqs: ["CS 240","CS 240E"] }, { type: "OR", reqs: ["CS 246","CS 246E","CS 247"] }], 
    antireqs: ["CS 350","MTE 241","ECE 254","ECE 354"],
    tags: ["core","se"], majors: ["se"] },

  { code: "SE 380",  title: "Introduction to Feedback Control", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["MATH 213"] }], antireqs: ["ECE 380","ME 360","MTE 360","SYDE 352"],
    tags: ["se","core"], majors: ["se"] },
  
  { code: "SE 390",  title: "Design Project Planning", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PD 10"] }, { type: "OR", reqs: ["CS240", "CS240E"] }, { type: "OR", reqs: ["CS246", "CS246E", "CS247"] }],
    antireqs: [],
    tags: ["se"], majors: ["se"] },

  { code: "SE 401",  title: "Seminar",
    units: 0.0, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "SE 402",  title: "Seminar",
    units: 0.0, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "SE 463",  title: "Software Project Management, Requirements, and Analysis", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 246","CS 246E","CS 247","ECE 250","MSE 342","SYDE 322"] }, { type: "AND", reqs: ["MSCI 342"] }], 
    antireqs: ["CS 445","ECE 451"],
    tags: ["se","core"], majors: ["se"] },

  { code: "SE 464",  title: "Software Design and Architectures", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 246","CS 246E","CS 247"] }], antireqs: ["CS 446","ECE 452"],
    tags: ["se","core"], majors: ["se"] },

  { code: "SE 465",  title: "Software Testing and Quality Assurance", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 246","CS 246E","CS 247"] }], antireqs: ["CS 447","ECE 453"],
    tags: ["se","core"], majors: ["se"] },

  { code: "SE 490",  title: "Design Project 1", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["SE 390"] }], antireqs: [],
    tags: ["project"], majors: ["se"] },

  { code: "SE 491",  title: "Design Project 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["SE 490"] }], antireqs: [],
    tags: ["project"], majors: ["se"] },
    
  { code: "SE 498",  title: "Advanced Topics in Software Engineering", units: 0.5, 
    prereqs: [], antireqs: [],
    tags: ["se"], majors: ["se"], term: "3B" },

  { code: "SE 499",  title: "Project", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["SE 490"] }], antireqs: [],
    tags: ["project"], majors: ["se"], term: "4A" },


  // ── Math shared base ──────────────────────────────────────────────────────

  { code: "MATH 103",  title: "Introductory Algebra for Arts and Social Science", units: 0.5, 
    prereqs: [],
    antireqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146","NE 112"],
    tags: ["core"], majors: ["other"] },

  { code: "MATH 104",  title: "Introductory Calculus for Arts and Social Science", units: 0.5, 
    prereqs: [], antireqs: ["MATH 127","MATH 137","MATH 147"],
    tags: ["core"], majors: ["other"] },

  { code: "MATH 106",  title: "Applied Linear Algebra 1", units: 0.5, 
    prereqs: [], antireqs: ["MATH 114","MATH 115","MATH 136","MATH 146","NE 112"],
    tags: ["core"], majors: ["any"], exclMajors: ["cs","ds","se"] },

  { code: "MATH 114",  title: "Linear Algebra for Science",
    units: 0.5, prereqs: [], antireqs: ["MATH 106","MATH 115","MATH 136","MATH 146","NE 112"],
    tags: ["core"], majors: ["other"] }, 

  { code: "MATH 115",  title: "Linear Algebra for Engineering",
    units: 0.5, prereqs: [], antireqs: ["MATH 106","MATH 114","MATH 136","MATH 146","NE 112"],
    tags: ["core"], majors: ["se"] },

  { code: "MATH 116",  title: "Calculus 1 for Engineering",
    units: 0.5, prereqs: [], antireqs: ["MATH 117","MATH 127","MATH 137","MATH 147"],
    tags: ["core"], majors: ["other"], exclMajors: ["se"] },

  { code: "MATH 117",  title: "Calculus 1 for Engineering",
    units: 0.5, prereqs: [], antireqs: ["MATH 116","MATH 124","MATH 127","MATH 137","MATH 147"],
    tags: ["core"], majors: ["se"] },

  { code: "MATH 118",  title: "Calculus 2 for Engineering", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 116","MATH 117","MATH 127","MATH 137","MATH 147"] }],
    antireqs: ["MATH 119","MATH 128","MATH 138","MATH 148"],
    tags: ["core"], majors: ["other"], exclMajors: ["se"] },

  { code: "MATH 119",  title: "Calculus 2 for Engineering", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 116","MATH 117","MATH 127","MATH 137","MATH 147"] }],
    antireqs: ["MATH 118","MATH 128","MATH 138,","MATH 148"],
    tags: ["core"], majors: ["se"] },

  { code: "MATH 124",  title: "Calculus and Vector Algebra for Kinesiology", units: 0.5, 
    prereqs: [],  antireqs: ["MATH 116","MATH 117","MATH 127","MATH 137","MATH 147"],
    tags: ["core"], majors: ["other"], exclMajors: ["math"] },

  { code: "MATH 127",  title: "Calculus 1 for the Sciences", units: 0.5, 
    prereqs: [],
    antireqs: ["MATH 116","MATH 117","MATH 127","MATH 137","MATH 147","MATH 109"],
    tags: ["core"], majors: ["any"], exclMajors: ["cs","ds","se"] },

  { code: "MATH 128",  title: "Calculus 2 for the Sciences", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 116","MATH 117","MATH 127","MATH 137","MATH 147"] }],
    antireqs: ["MATH 118","MATH 119","MATH 138","MATH 148"],
    tags: ["core"], majors: ["any"] },

  { code: "MATH 135", title: "Algebra for Honours Mathematics", units: 0.5,
    prereqs: [], antireqs: ["MATH 145"],
    tags: ["math"], majors: ["cs","ds","se","math"] },

  { code: "MATH 136", title: "Linear Algebra 1 for Honours Mathematics", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 135","MATH 145"]}],
    antireqs: ["MATH 106","MATH 114","MATH 115","MATH 146","NE 112"],
    tags: ["math"], majors: ["cs","ds","math"] },

  { code: "MATH 137", title: "Calculus 1 for Honours Mathematics",
    units: 0.5, prereqs: [], antireqs: ["MATH 116","MATH 117","MATH 127","MATH 147"],
    tags: ["math"], majors: ["cs","ds","math"] },

  { code: "MATH 138", title: "Calculus 2 for Honours Mathematics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 147","MATH 116","MATH 117","MATH 127","MATH 137"] }],
    antireqs: ["MATH 118","MATH 119","MATH 128","MATH 148"],
    tags: ["math"], majors: ["cs","ds","math"] },

  { code: "MATH 145", title: "Algebra (Advanced Level)",
    units: 0.5, prereqs: [], antireqs: ["MATH 135"],
    tags: ["math","advanced"], majors: ["cs","ds","math"] },

  { code: "MATH 146", title: "Algebra Linear Algebra 1 (Advanced Level)", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["MATH 145"] }],
    antireqs: ["MATH 106","MATH 114","MATH 115","MATH 136","NE 112"],
    tags: ["math","advanced"], majors: ["cs","ds","math"] },

  { code: "MATH 147", title: "Calculus 1 (Advanced Level)", units: 0.5,
    prereqs: [],
    antireqs: ["MATH 116","MATH 117","MATH 124","MATH 127","MATH 137"],
    tags: ["math","advanced"], majors: ["cs","ds","math"] },

  { code: "MATH 148", title: "Calculus 2 (Advanced Level)", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["MATH 147"] }],
    antireqs: ["MATH 118","MATH 119","MATH 128","MATH 138"],
    tags: ["math","advanced"], majors: ["cs","ds","math"] },

  { code: "MATH 207", title: "Calculus 3 (Non-Specialist Level)", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 128","MATH 138","MATH 148"] }],
    antireqs: ["AMATH 231","MATH 212","MATH 217","MATH 227","MATH 237","MATH 247","NE 217","MATH 212N"],
    tags: ["math","advanced"], majors: ["cs","ds","math"] },

  { code: "MATH 211", title: "Advanced Calculus 1 for Electrical and Computer Engineers", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["MATH 119"] }],
    antireqs: ["ECE 205","AMATH 250","MATH 218","MATH 228"],
    tags: ["math","advanced"], majors: ["any"], exclMajors: ["cs","ds","math"] },

  { code: "MATH 212", title: "Adv Calculus 2 for Electrical Engineers", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["ECE 205","MATH 211"] }],
    antireqs: ["ECE 206","AMATH 231","MATH 207","MATH 217","MATH 227","MATH 237","MATH 247"],
    tags: ["math","advanced"], majors: ["any"], exclMajors: ["cs","ds","math"] },

  { code: "MATH 213", title: "Signals, Systems, and Differential Equations", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138"] }],
    antireqs: ["AMATH 250","AMATH 251","ECE 205","MATH 211","MATH 218","MATH 228"],
    tags: ["math"], majors: ["any"] },

  { code: "MATH 215", title: "Linear Algebra for Engineering", units: 0.5,
    prereqs: [],
    antireqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146","NE 112"],
    tags: ["math"], majors: ["other"], term: "2A" },

  { code: "MATH 217", title: "Calculus 3 for Chemical Engineering", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["MATH 118"] }],
    antireqs: ["AMATH 231","CIVE 221","ECE 206","MATH 207","MATH 212","MATH 227","MATH 237","MATH 247","ME 201","NE 217","ENVE 221","MATH 212N"],
    tags: ["math"], majors: ["any"], exclMajors: ["cs","ds","math"] },
  
  { code: "MATH 218", title: "Differential Equations for Engineers", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148","SYDE 112"] }],
    antireqs: ["AMATH 250","AMATH 251","AMATH 350","AMATH 251","CIVE 222","ECE 205","ENVE 223","MATH 211","MATH 228","ME 203","NE 217","SYDE 211","MATH 212N"],
    tags: ["math"], majors: ["other"] },

  { code: "MATH 225", title: "Applied Linear Algebra 2", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 136","MATH 146"] }],
    antireqs: ["MATH 235","MATH 245"],
    tags: ["math"], majors: ["other"] },

  { code: "MATH 227", title: "Calculus 3 for Honours Physics", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 128","MATH 138"] }],
    antireqs: ["AMATH 231","ECE 206","MATH 207","MATH 212","MATH 217","MATH 237","MATH 247","NE 217","MATH 212N"],
    tags: ["math"], majors: ["other"] },

  { code: "MATH 228", title: "Differential Equations for Physics and Chemistry", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 128","MATH 138"] }],
    antireqs: ["AMATH 250","AMATH 251","AMATH 350"],
    tags: ["math"], majors: ["other"], exclMajors: ["cs","ds","math"] },

  { code: "MATH 229", title: "Introduction to Combinatorics (Non-Specialist Level)", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146"] }],
    antireqs: ["MATH 239","MATH 249","CO 220"],
    tags: ["math"], majors: ["other"], exclMajors: ["cs","ds","math"] },

  { code: "MATH 235", title: "Linear Algebra 2 for Honours Mathematics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 146","MATH 136","MATH 106","MATH 114","MATH 115","MATH 128","MATH 138","MATH 148"] }],
    antireqs: ["MATH 225","MATH 245"],
    tags: ["math"], majors: ["cs","ds","math","se"] },

  { code: "MATH 237", title: "Calculus 3 for Honours Mathematics",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146"] }, { type: "OR", reqs: ["MATH 148","MATH 138","MATH 128"] }],
    antireqs: ["ECE 206","MATH 207","MATH 212","MATH 217","MATH 227","MATH 247","MATH 212N"],
    tags: ["math"], majors: ["cs","ds","math","se"] },

  { code: "MATH 239", title: "Introduction to Combinatorics",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 136","MATH 146"] }, { type: "OR", reqs: ["MATH 135","MATH 145"] }],
    antireqs: ["MATH 229","MATH 249","CO 220"],
    tags: ["math"], majors: ["cs","ds","math","se"] },

  { code: "MATH 245", title: "Linear Algebra 2 (Advanced Level)", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["MATH 146"] }], antireqs: ["MATH 225","MATH 235"],
    tags: ["math","advanced"], majors: ["cs","ds","math","se"] },

  { code: "MATH 247", title: "Calculus 3 (Advanced Level)", units: 0.5,
    prereqs: [{ type: "AND", reqs: ["MATH 146","MATH 148"] }], antireqs: ["MATH 237"],
    tags: ["math","advanced"], majors: ["cs","ds","math","se"] },

  { code: "MATH 249", title: "Introduction to Combinatorics (Advanced Level)",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["MATH 145","MATH 135"] }, { type: "OR", reqs: ["MATH 136","MATH 146"] }], 
    antireqs: ["MATH 229","MATH 239","CO 220"],
    tags: ["math","advanced"], majors: ["cs","ds","math","se"] },


  // ── Pure Math specific ────────────────────────────────────────────────────

  { code: "PMATH 320", title: "Euclidean Geometry", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146","NE 112"] }, { type: "OR", reqs: ["MATH 104","MATH 116","MATH 117","MATH 124","MATH 127","MATH 137","MATH 147","MATH 1O9"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["any"] },

  { code: "PMATH 321", title: "Non-Euclidean Geometry", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146","MATH 215","NE 112"] }, { type: "OR", reqs: ["MATH 104","MATH 116","MATH 117","MATH 124","MATH 127","MATH 137","MATH 147","MATH 1O9"] }], 
    antireqs: ["PMATH 360"],
    tags: ["pmath"], majors: ["any"] },

  { code: "PMATH 330", title: "Introduction to Mathematical Logic", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 135","MATH 145"] }, { type: "OR", reqs: ["MATH 225","MATH 235","MATH 245"] }], 
    antireqs: ["CS 245","CS 245E","SE 212"],
    tags: ["pmath"], majors: ["math"] },

  { code: "PMATH 331", title: "Applied Real Analysis", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }], 
    antireqs: ["PMATH 333","PMATH 351"],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 332", title: "Applied Complex Analysis", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }], 
    antireqs: ["AMATH 332","PHYS 365","PMATH 352"],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 333", title: "Introduction to Real Analysis", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["MATH 237"] }, { type: "OR", reqs: ["MATH 235","MATH 245"] }], 
    antireqs: ["MATH 247","PMATH 351"],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },
  
  { code: "PMATH 334", title: "Introduction to Rings and Fields with Applications", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 235","MATH 245"] }], 
    antireqs: ["PMATH 348"],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 336", title: "Introduction to Group Theory with Applications", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 235","MATH 245"] }], 
    antireqs: ["PMATH 347"],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 340", title: "Elementary Number Theory", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 135","MATH 145","MATH 225"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 343", title: "Introduction to the Mathematics of Quantum Information", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 235","MATH 245"] }, { type: "OR", reqs: ["STAT 230","STAT 240"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 347", title: "Groups and Rings", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 235","MATH 245"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 348", title: "Fields and Galois Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 347"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 351", title: "Real Analysis", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 247","PMATH 333"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 352", title: "Complex Analysis", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 247","PMATH 333"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 365", title: "Differential Geometry", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 235","MATH 245"] }, { type: "OR", reqs: ["MATH 237","MATH 247"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 367", title: "Topology", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["PMATH 336","PMATH 347"] }, { type: "AND", reqs: ["PMATH 351"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 370", title: "Chaos and Fractals", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146","MATH 225"] }, { type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148"] }], 
    antireqs: [],
    tags: ["pmath"], majors: ["any"] },

  { code: "PMATH 390", title: "Readings in Pure Mathematics", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["pmath","reading"], majors: ["any"] },

  { code: "PMATH 432", title: "Mathematical Logic", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 347"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 433", title: "Model Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 432"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 434", title: "Set Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 432"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 440", title: "Analytic Number Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 352"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 441", title: "Algebraic Number Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 348"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 445", title: "Representations of Finite Groups", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 347"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 446", title: "Introduction to Commutative Algebra", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 348"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 450", title: "Measure Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 351"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 453", title: "Functional Analysis", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 450"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 454", title: "Fourier Analysis", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 450"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 455", title: "Convex Analysis and Geometry", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 351"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 457", title: "Topological Dynamics and Ergodic Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 367","PMATH 450"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 464", title: "Introduction to Algebraic Geometry", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 348"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 465", title: "Smooth Manifolds", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["PMATH 365","PMATH 367"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 467", title: "Algebraic Topology", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PMATH 367"]}], 
    antireqs: [],
    tags: ["pmath"], majors: ["cs","ds","math","se"] },

  { code: "PMATH 499", title: "Readings in Pure Mathematics", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["pmath","reading"], majors: ["any"] },


  // ── Combinatorics ────────────────────────────────────────────────────────────

  { code: "CO 227", title: " Introduction to Optimization (Non-Specialist Level)", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146"] }],
    antireqs: ["CO 250","CO 255","CO 352"],
    tags: ["co"], majors: ["any"], exclMajors: ["math"] },

  { code: "CO 250", title: "Introduction to Optimization", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146"] }],
    antireqs: ["CO 227","CO 255"],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 255", title: "Introduction to Optimization (Advanced Level)", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 235","MATH 245"] }, { type: "OR", reqs: ["MATH 237","MATH 247"] }],
    antireqs: ["CO 227","CO 250","CO 352"],
    tags: ["co","advanced"], majors: ["cs","math","ds","se"] },

  { code: "CO 327", title: "Deterministic OR Models (Non-Specialist Level)", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["CO 227","CO 250","CO 255","CO 352"] } ],
    antireqs: ["CO 370"],
    tags: ["co"], majors: ["any"], exclMajors: ["math"] },

  { code: "CO 330", title: "Combinatorial Enumeration", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 239","MATH 249"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 331", title: "Coding Theory", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 225","MATH 235","MATH 245"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 342", title: "Introduction to Graph Theory", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 239","MATH 249"] }], antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 351", title: "Network Flow Theory", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CO 250","CO 255","CO 352"] }], 
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 353", title: "Computational Discrete Optimization", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CO 250","CO 255","CO 352"] }], 
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 367", title: "Nonlinear Optimization", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CO 250","CO 255","CO 352"] }, { type: "OR", reqs: ["MATH 138","MATH 148","MATH 128"] }], 
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 370", title: "Deterministic OR Models", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CO 250","CO 255","CO 352"] }], 
    antireqs: ["CO 327"],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 372", title: "Portfolio Optimization Models", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ACTSC 291","ACTSC 372","AFM 272","ECON 371","ACTSC 371","BUS 393W"] }, { type: "OR", reqs: ["CO 227","CO 250","CO 255","CO 352"] }], 
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 380", title: "Mathematical Discovery and Invention", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 136","MATH 146"] }, { type: "OR", reqs: ["MATH 135","MATH 145"] }, { type: "OR", reqs: ["MATH 138","MATH 148"] }], 
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"], term: "3A" },

  { code: "CO 430", title: "Algebraic Enumeration", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CO 330"] }], 
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 431", title: "Symmetric Functions", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["PMATH 336","PMATH 347"] }], 
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 432", title: "Information Theory and Applications", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CO 250","CO 255","CS 231","CS 341"] }, { type: "OR", reqs: ["MATH 239","MATH 249"] }, { type: "OR", reqs: ["STAT 230","STAT 240"] }], 
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"], term: "3A" },

  { code: "CO 434", title: "Combinatorial Designs", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["PMATH 336","PMATH 347","PMATH 346"] }], 
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 439", title: "Topics in Combinatorics", units: 0.5, 
    prereqs: [], antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 440", title: "Topics in Graph Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CO 342"] }], antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 442", title: "Graph Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CO 342"] }, { type: "OR", reqs: ["MATH 235","MATH 245"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },
  
  { code: "CO 444", title: "Algebraic Graph Theory", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 239","MATH 249"] }, { type: "OR", reqs: ["PMATH 336","PMATH 347","PMATH 346"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 446", title: "Matroid Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CO 342"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 450", title: "Combinatorial Optimization", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CO 255","CO 351"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 452", title: "Integer Programming", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CO 255","CO 351"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 454", title: "Scheduling", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 229","MATH 239","MATH 249"] }, { type: "OR", reqs: ["CO 227","CO 250","CS 255","CO 352"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 456", title: "Introduction to Game Theory", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 229","MATH 239","MATH 249"] }, { type: "OR", reqs: ["CO 227","CO 250","CS 255","CO 352"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 463", title: "Convex Optimization and Analysis", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 331","PMATH 331","PMATH 333","PMATH 351"] }, { type: "OR", reqs: ["CO 255","CO 367"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 466", title: "Continuous Optimization", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CO 255",{ type: "OR", reqs: ["CO 250","CO 352"] }] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 471", title: "Semidefinite Optimization", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 331","PMATH 331","PMATH 333","PMATH 351"] }, { type: "OR", reqs: ["CO 255","CO 367"] }, { type: "OR", reqs: ["MATH 239","MATH 249"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 480", title: "History of Mathematics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ECE 108","MATH 135","MATH 145"] }, { type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146"] }, { type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"], term: "3A" },

  { code: "CO 481", title: "Introduction to Quantum Information Processing", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 235","MATH 245"] }],
    antireqs: ["CS 467","PHYS 467"],
    tags: ["co"], majors: ["cs","math","ds","se"], term: "3A" },

  { code: "CO 485", title: "The Mathematics of Public-Key Cryptography", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["PMATH 334","PMATH 336","PMATH 347","PMATH 348","PMATH 345","PMATH 346"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"] },

  { code: "CO 487", title: "Applied Cryptography", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 116","CS 136","CS 138","CS 146"] }, { type: "OR", reqs: ["MATH 135","MATH 145"] }, { type: "OR", reqs: ["STAT 206","STAT 220","STAT 230","STAT 240"] }],
    antireqs: [],
    tags: ["co"], majors: ["cs","math","ds","se"], term: "3A" },


  // ── Applied Mathematics ────────────────────────────────────────────────────────────

  { code: "AMATH 231", title: "Calculus 4", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }],
    antireqs: ["ECE 206","MATH 207","MATH 212","MATH 217","MATH 227"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 242", title: "Introduction to Computational Mathematics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: [{ type: "OR", reqs: ["CS 116","CS 136","CS 138","CS 146"] },{ type: "AND", reqs: ["CS 114", { type: "OR", reqs: ["CS 115","CS 135","CS 145"] }] }] }, { type: "OR", reqs: ["CS 235","CS 245"] }, { type: "OR", reqs: ["CS 237","CS 247"] }],
    antireqs: ["CS 371","CS 335","CS 370","ECE 204","MTE 204"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 250", title: "Introduction to Differential Equations", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146","NE 112"] }, { type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148"] }],
    antireqs: ["AMATH 251","AMATH 350","MATH 128","MATH 228"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 251", title: "Introduction to Differential Equations (Advanced Level)", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 114","MATH 115","MATH 136","MATH 146","NE 112"] }, { type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148"] }],
    antireqs: ["AMATH 250","AMATH 350","MATH 128","MATH 228"],
    tags: ["amath","advanced"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 271", title: "Introduction to Theoretical Mechanics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 128","MATH 138","MATH 148"] }, { type: "OR", reqs: ["AMATH 250","AMATH 251","MATH 228"] }, { type: "OR", reqs: ["MATH 227","MATH 237","MATH 247"] }],
    antireqs: ["PHYS 263"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 331", title: "Applied Real Analysis", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }],
    antireqs: ["PMATH 333","PMATH 351"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 332", title: "Applied Complex Analysis", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }],
    antireqs: ["PMATH 332","PHYS 365","PMATH 352"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 333", title: "Calculus on Manifolds for Applied Mathematics and Physics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 231","MATH 227","PMATH 365"] }, { type: "OR", reqs: ["MATH 114","MATH 136","MATH 146"] }],
    antireqs: [],
    tags: ["amath"], majors: ["any"] },

  { code: "AMATH 342", title: "Computational Methods for Differential Equations", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 242","CS 370","CS 371"] }, { type: "OR", reqs: ["AMATH 250","AMATH 251","AMATH 350","MATH 218","MATH 228"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 343", title: "Discrete Models in Applied Mathematics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 128","MATH 138","MATH 148"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 345", title: "Data-Driven Mathematical Models", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251","MATH 228"] }, { type: "OR", reqs: ["CS 114","CS 116","CS 136","CS 146"] }, { type: "OR", reqs: ["PHYS 267","STAT 202","STAT 206","STAT 221","STAT 231","STAT 241"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 350", title: "Differential Equations for Business and Economics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 136","MATH 146"] }, { type: "OR", reqs: ["MATH 237","MATH 247"] }, { type: "OR", reqs: ["STAT 230","STAT 240"] }, { type: "OR", reqs: ["ACTSC 291","ACTSS 372","AFM 272","ECON 371",{ type: "AND", reqs: ["ACTSC 371","BUS 393W"] }] }],
    antireqs: ["AMATH 250","AMATH 251","AMATH 353","CIVE 222","ECE 205","ENVE 223","MATH 211","MATH 218","MATH 228","ME 203","PHYS 364","SYDE 211"],
    tags: ["amath"], majors: ["cs","math","ds","se"], term: "3A" },

  { code: "AMATH 351", title: "Ordinary Differential Equations", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251","AMATH 350"], }, { type: "OR", reqs: ["MATH 237","MATH 247"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"], term: "3A" },

  { code: "AMATH 353", title: "Partial Differential Equations 1", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["AMATH 231"], }, { type: "OR", reqs: ["AMATH 250","AMATH 251","ECE 205","MATH 211","MATH 218","MATH 228"] }],
    antireqs: ["AMATH 350","PHYS 364"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 361", title: "Continuum Mechanics", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["AMATH 231"], }, { type: "OR", reqs: ["AMATH 271","PHYS 263"] }, { type: "AND", reqs: ["AMATH 351"] }, { type: "OR", reqs: ["AMATH 353","PHYS 364"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 362", title: "Mathematics of Climate Change", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251","AMATH 350","MATH 211","MATH 213","MATH 218","MATH 228"] }, { type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148"] }, { type: "OR", reqs: ["STAT 202","STAT 206","STAT 220","STAT 230","STAT 240"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 373", title: "Quantum Theory 1", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["AMATH 231"], }, { type: "OR", reqs: ["AMATH 271","PHYS 263"] }],
    antireqs: ["PHYS 334"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 382", title: "Computational Modelling of Cellular Systems", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148","SYDE 112"] }],
    antireqs: ["BIOL 382"],
    tags: ["amath"], majors: ["cs","math","ds","se"], term: "3A" },

  { code: "AMATH 383", title: "Introduction to Mathematical Biology", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 106","MATH 136","MATH 146"] }, { type: "OR", reqs: ["AMATH 250","AMATH 251","AMATH 350","MATH 218","MATH 228"] }, { type: "OR", reqs: ["STAT 202","STAT 206","STAT 211","STAT 220","STAT 230","STAT 231","STAT 241"] }],
    antireqs: ["BIOL 382"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 390", title: "Mathematics and Music", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"], term: "3A" },

  { code: "AMATH 391", title: "Data Analysis with Fourier and Wavelet Methods", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 231","ECE 207","PHYS 364","SYDE 252"] }, { type: "OR", reqs: ["MATH 114","MATH 115","MATH 136","MATH 146","SYDE 114"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 442", title: "Computational Methods for Partial Differential Equations", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["AMATH 342"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 445", title: "Scientific Machine Learning", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251","AMATH 350","ECE 205","MATH 211","MATH 218","MATH 228"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 449", title: "Neural Networks", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 230","STAT 240","STAT 206"] }, { type: "OR", reqs: ["AMATH 242","CS 335","CS 370","CS 371"] }],
    antireqs: ["CS 479"],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 451", title: "Introduction to Dynamical Systems", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 453", title: "Partial Differential Equations 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["AMATH 353"] }, { type: "OR", reqs: ["AMATH 250","AMATH 251"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 455", title: "Control Theory", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251"] }, { type: "OR", reqs: ["AMATH 332","PMATH 332","PMATH 352"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 456", title: "Calculus of Variations", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }, { type: "OR", reqs: ["AMATH 250","AMATH 251","ECE 205","MATH 211","MATH 218","MATH 228"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"], term: "3B" },

  { code: "AMATH 463", title: "Fluid Mechanics", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["AMATH 361"] }, { type: "OR", reqs: ["AMATH 353","PHYS 364"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 473", title: "Quantum Theory 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["AMATH 231","PMATH 343"] }, { type: "OR", reqs: ["AMATH 373","PHYS 334"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 474", title: "Quantum Theory 3: Quantum Information and Foundations", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 473","PHYS 454"] }],
    antireqs: ["PHYS 484"],
    tags: ["amath"], majors: ["cs","math","ds","se","other"], term: "4A" },

  { code: "AMATH 475", title: "Introduction to General Relativity", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 321","MATH 227","other"] }, { type: "OR", reqs: ["AMATH 271","PHYS 263"] }],
    antireqs: ["PHYS 476"],
    tags: ["amath"], majors: ["cs","math","ds","se"], term: "4A" },

  { code: "AMATH 477", title: "Stochastic Processes for Applied Mathematic", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251","ECE 205","MATH 211","MATH 218","MATH 228"] }, { type: "OR", reqs: ["STAT 230","STAT 240"] }],
    antireqs: [],
    tags: ["amath"], majors: ["cs","math","ds","se"] },

  { code: "AMATH 499", title: "Research Project", units: 0.5, 
    prereqs: [], antireqs: [],
    tags: ["amath","project"], majors: ["math"], term: "4A" },
  

  // ── Statistics ────────────────────────────────────────────────────────────

  { code: "STAT 202", title: "Introductory Statistics for Scientists", units: 0.5, 
    prereqs: [], antireqs: ["STAT 220","MATH 230"],
    tags: ["stat"], majors: ["other"] },

  { code: "STAT 206", title: "Statistics for Software Engineering", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 115","MATH 119"] }], antireqs: [],
    tags: ["stat"], majors: ["se"] },

  { code: "STAT 211", title: "Introductory Statistics and Sampling for Accounting", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["MATH 109"] }], antireqs: [],
    tags: ["stat"], majors: ["other"] },

  { code: "STAT 220", title: "Probability (Non-Specialist Level)", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148"] }], 
    antireqs: ["STAT 202","STAT 23O","STAT 240"],
    tags: ["stat"], majors: ["any"], exclMajors: ["cs","ds","math","se"] },

  { code: "STAT 221", title: "Statistics (Non-Specialist Level)", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 128","MATH 138","MATH 148"] }, { type: "OR", reqs: ["STAT 220","STAT 230","STAT 240"] }], 
    antireqs: ["STAT 231","STAT 241"],
    tags: ["stat"], majors: ["any"], exclMajors: ["cs","ds","math","se"] },

  { code: "STAT 230", title: "Probability", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 116","MATH 117","MATH 137","MATH 147","MATH 128","MATH 118","MATH 119","MATH 138","MATH 148"] }], 
    antireqs: ["STAT 221","STAT 241"],
    tags: ["stat"], majors: ["cs","se","ds","math"] },

  { code: "STAT 231", title: "Statistics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 118","MATH 119","MATH 128","MATH 138","MATH 148"] }, { type: "OR", reqs: ["STAT 220","STAT 230","STAT 240"] }],
    antireqs: ["STAT 241"],
    tags: ["stat"], majors: ["cs","ds","math"] },

  { code: "STAT 240", title: "Probability (Advanced Level)", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 137","MATH 147","MATH138","MATH 148"] }], 
    antireqs: ["STAT 220","STAT 230"],
    tags: ["stat","advanced"], majors: ["cs","ds","math","se"] },

  { code: "STAT 241", title: "Probability (Advanced Level)", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH138","MATH 148","STAT 230","STAT 240"] }], 
    antireqs: ["STAT 221","STAT 231"],
    tags: ["stat","advanced"], majors: ["cs","ds","math"] },

  { code: "STAT 316", title: "Introduction to Statistical Problem Solving", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ECON 221","ENVS 278","HLTH 204","KIN 232","LS 280","PSCI 314", "PHSYCH 292","REC 371","SDS 250R","SOC 280","PSCI 214"] }], 
    antireqs: ["STAT 331","STAT 371"],
    tags: ["stat"], majors: ["any"], exclMajors: ["cs","ds","math"] },

  { code: "STAT 321", title: "Regression and Forecasting (Non-Specialist Level)", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["MATH 225","MATH 235","MATH 245"] }, { type: "OR", reqs: ["STAT 221","STAT 231","STAT241"] }],
    antireqs: ["AFM 323","STAT 331","STAT 371","STAT 373","STAT 374","STAT 443"],
    tags: ["stat"], majors: ["any"], exclMajors: ["cs","ds","math"] },

  { code: "STAT 322", title: "Sampling and Experimental Design (Non-Specialist Level)", units: 0.5,
    prereqs: [{ type: "OR", reqs: ["STAT 221","STAT 231","STAT 241"] }],
    antireqs: ["STAT 332","STAT 372"],
    tags: ["stat"], majors: ["any"], exclMajors: ["cs","ds","math"] },

  { code: "STAT 330", title: "Mathematical Statistics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }, { type: "OR", reqs: ["STAT 230","STAT 240"] }, { type: "OR", reqs: ["STAT 231","STAT 241"] }], 
    antireqs: ["STAT 334"],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 331", title: "Applied Linear Models", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 235","MATH 245"] }, { type: "OR", reqs: ["STAT 231","STAT 241","SYDE 212"] }], 
    antireqs: ["AFM 323","ECON 421","STAT 321","STAT 371","STAT 373","STAT 374","SYDE 334"],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 332", title: "Sampling and Experimental Design", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 231","STAT 241","SYDE 212"] }], 
    antireqs: ["BIOL 361","STAT 322","STAT 372"],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 333", title: "Stochastic Processes 1", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }, { type: "OR", reqs: ["STAT 230","STAT 240"] }], 
    antireqs: ["STAT 334"],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 334", title: "Probability Models for Business and Accounting", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }, { type: "OR", reqs: ["STAT 230","STAT 240"] }, { type: "OR", reqs: ["STAT 231","STAT 241"] }], 
    antireqs: ["STAT 330","STAT 333"],
    tags: ["stat"], majors: ["other"] },

  { code: "STAT 337", title: "Introduction to Biostatistics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 221","STAT 231","STAT 241"] }], 
    antireqs: ["HLTH 333","STAT 232"],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 340", title: "Stochastic Simulation Methods", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 116","CS 136","CS 138","CS 145","SYDE 221"] }, { type: "OR", reqs: ["STAT 230","STAT 240"] }, { type: "OR", reqs: ["STAT 231","STAT 241"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 341", title: "Computational Statistics and Data Analysis", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 237","MATH 247"] }, { type: "OR", reqs: ["STAT 230","STAT 240"] }, { type: "OR", reqs: ["STAT 231","STAT 241"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 371", title: "Applied Linear Models and Process Improvement for Business", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 235","MATH 245"] }, { type: "OR", reqs: ["STAT 231","STAT 241"] }], 
    antireqs: ["STAT 321","STAT 331","STAT 373","STAT 374"],
    tags: ["stat"], majors: ["other"] },

  { code: "STAT 372", title: "Survey Sampling and Experimental Design Techniques for Business", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 231","STAT 241"] }], 
    antireqs: ["STAT 322","STAT 332"],
    tags: ["stat"], majors: ["other"] },

  { code: "STAT 373", title: "Regression and Forecasting Methods in Finance", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["MATH 136"] }, { type: "OR", reqs: ["STAT 231","STAT 241"] }], 
    antireqs: ["AFM 323","STAT 321","STAT 331","STAT 371","STAT 374","STAT 443"],
    tags: ["stat"], majors: ["other"] },

  { code: "STAT 374", title: "Quantitative Foundations for Finance", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["MATH 136"] }, { type: "OR", reqs: ["STAT 231","STAT 241"] }], 
    antireqs: ["AFM 323","STAT 321","STAT 331","STAT 371","STAT 374","STAT 443"],
    tags: ["stat"], majors: ["other"] },

  { code: "STAT 430", title: "Experimental Design", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 331","STAT 371"] }, { type: "OR", reqs: ["STAT 332","STAT 372"] }], 
    antireqs: ["BIOL 461","PYSCH 391"],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 431", title: "Generalized Linear Models and their Applications", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 330"] }, { type: "OR", reqs: ["STAT 331","STAT 371"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 433", title: "Stochastic Processes 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 333"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 435", title: "Statistical Methods for Process Improvements", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 332","STAT 372"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 436", title: "Introduction to the Analysis of Spatial Data in Health Research", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 431"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 437", title: "Statistical Methods for Life History Analysis", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 431"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 438", title: "Advanced Methods in Biostatistics", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 431"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 440", title: "Computational Inference", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 330","STAT 341"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 441", title: "Statistical Learning - Classification", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 341"] }, { type: "OR", reqs: ["STAT 331","STAT 371"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 442", title: "Data Visualization", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 341"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },
    
  { code: "STAT 443", title: "Forecasting", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 331","STAT 371","SYDE 334"] }], 
    antireqs: ["STAT 321","STAT 373"],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 444", title: "Statistical Learning - Advanced Regression", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 341"] }, { type: "OR", reqs: ["STAT 331","STAT 371"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 450", title: "Estimation and Hypothesis Testing", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 330"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 454", title: "Sampling Theory and Practice", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 332","STAT 372"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 464", title: "Topics in Probability Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 333"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },

  { code: "STAT 466", title: "Topics in Statistics 1", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 330","STAT 331"] }], 
    antireqs: [],
    tags: ["stat"], majors: ["cs","ds","math","se"] },


  // ── Actuarial Science ────────────────────────────────────────────────────────────

  { code: "ACTSC 127", title: "Introduction to Global Capital Markets and Financial Analytics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CS 115","CS 135"] }], 
    antireqs: ["AFM 127","AFM 121","CFM 101"],
    tags: ["actsc"], majors: ["other"] },

  { code: "ACTSC 221", title: "Introductory Financial Mathematics (Non-Specialist Level)", units: 0.5, 
    prereqs: [], antireqs: ["ACTSC 231","CIVE 392","CIVE 292"],
    tags: ["actsc"], majors: ["any"], exclMajors: ["other"], term: "2A" },

  { code: "ACTSC 231", title: "Introductory Financial Mathematics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["MATH 137","MATH 147"] }, { type: "OR", reqs: ["STAT 220","STAT 230","STAT 240"] }], 
    antireqs: ["ACTSC 221","ACTSC 232"],
    tags: ["actsc"], majors: ["other"], term: "2A" },

  { code: "ACTSC 232", title: "Life Contingencies 1", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 230","STAT 240"] }, { type: "AND", reqs: ["ACTSC 231"] }], 
    antireqs: ["ACTSC 331"],
    tags: ["actsc"], majors: ["any"] },

  { code: "ACTSC 291", title: "Global Capital Markets and Financial Analytics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 230","STAT 240"] }, { type: "AND", reqs: ["ACTSC 231"] }], 
    antireqs: ["AFM 272","ACTSC 372","AFM 273","ECON 371"],
    tags: ["actsc"], majors: ["other"] },

  { code: "ACTSC 331", title: "Life Contingencies 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ACTSC 232"] }], 
    antireqs: [],
    tags: ["actsc"], majors: ["other"] },

  { code: "ACTSC 362", title: "Introduction to Property and Casualty Practice", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ACTSC 231"] }, { type: "OR", reqs: ["STAT 220","STAT 231","STAT 241"] }], 
    antireqs: [],
    tags: ["actsc"], majors: ["other"] },

  { code: "ACTSC 363", title: "Casualty and Health Insurance Mathematics 1", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 330"] }], 
    antireqs: [],
    tags: ["actsc"], majors: ["math"] },

  { code: "ACTSC 372", title: "Investment Science and Corporate Finance", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ACTSC 231"] }, { type: "OR", reqs: ["MATH 235","MATH 245"] }, { type: "OR", reqs: ["MATH 237","MATH 247"] }], 
    antireqs: ["ACTSC 291","ACTSC 391","AFM 272","AFM 273","AFM 274","AFM 275","ECON 371","MATBUS 371","AFM 372","BUS 393W"],
    tags: ["actsc"], majors: ["math"] },

  { code: "ACTSC 391", title: "Corporate Finance", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ACTSC 291","AFM 272"] }], 
    antireqs: ["AFM 275","ACTSC 372","ECON 371","AFM 372"],
    tags: ["actsc"], majors: ["other"] },

  { code: "ACTSC 431", title: "Casualty and Health Insurance Mathematics 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["STAT 330"] }, { type: "OR", reqs: ["STAT 331","STAT 371","STAT 373"] }, { type: "AND", reqs: ["ACTSC 363"] }], 
    antireqs: [],
    tags: ["actsc"], majors: ["other"] },

  { code: "ACTSC 432", title: "Credibility and Risk Theory", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ACTSC 363","STAT 330","STAT 333"] }], 
    antireqs: [],
    tags: ["actsc"], majors: ["other"] },

  { code: "ACTSC 445", title: "Quantitative Enterprise Risk Management", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ACTSC 372","BUS 393W"] }, { type: "OR", reqs: [{ type: "AND", reqs: ["STAT 330","STAT 333"]},"STAT 334"] }], 
    antireqs: ["AFM 422","MATBUS 472","BUS 433W","BUS 439W"],
    tags: ["actsc"], majors: ["other"] },

  { code: "ACTSC 446", title: "Mathematics of Financial Markets", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ACTSC 372","BUS 393W"] }, { type: "AND", reqs: ["STAT 333","STAT 334"] }], 
    antireqs: ["AFM 322","ECON 372","MATBUS 470","BUS 423W"],
    tags: ["actsc"], majors: ["math"] },

  { code: "ACTSC 447", title: "Numerical Computation for Financial Modelling", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 242","CS 370","CS 371"] }, { type: "OR", reqs: ["STAT 231","STAT 241","STAT 206"] }], 
    antireqs: ["CS 476"],
    tags: ["actsc"], majors: ["any"] },

  { code: "ACTSC 453", title: "Basic Pension Mathematics", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ACTSC 331"] }], 
    antireqs: [],
    tags: ["actsc"], majors: ["math"] },

  { code: "ACTSC 454", title: "Longevity and Mortality Using Predictive Analytics", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ACTSC 331","STAT 330"] }], 
    antireqs: [],
    tags: ["actsc"], majors: ["math"] },

  { code: "ACTSC 455", title: "Life Contingencies 3", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ACTSC 331"] }], 
    antireqs: ["ACTSC 446"],
    tags: ["actsc"], majors: ["math"] },

  { code: "ACTSC 456", title: "Statistical Learning in Actuarial Science", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STAT 331","STAT 371","STAT 373"] }], 
    antireqs: ["STAT 441"],
    tags: ["actsc"], majors: ["math"] },

  { code: "ACTSC 468", title: "Readings in Actuarial Science 1", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["actsc"], majors: ["math"] },

  { code: "ACTSC 469", title: "Readings in Actuarial Science 2", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["actsc"], majors: ["math"] },

  { code: "ACTSC 489", title: "Advanced Topics in Actuarial Science", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["actsc"], majors: ["math"], term: "3B" },

  
  // ── Computing and Financial Management ────────────────────────────────────────────────────────────

  { code: "CFM 101", title: "Introduction to Financial Markets and Data Analytics", units: 0.5, 
    prereqs: [], 
    antireqs: ["ACTSC 127","AFM 121","AFM 127","COMM 101"],
    tags: ["cfm"], majors: ["cs"] },

  { code: "CFM 301", title: "Financial Data Analytics", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CFM 101"] }, { type: "OR", reqs: ["ACTSC 291","AFM 272"] }], 
    antireqs: [],
    tags: ["cfm"], majors: ["cs"] },

  { code: "CFM 401", title: "Topics in Financial Technology", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["CFM 301"] }], 
    antireqs: [],
    tags: ["cfm"], majors: ["cs"] },


  // ── Mathematics Business ────────────────────────────────────────────────────────────

  { code: "MATBUS 371", title: "Introduction to Corporate Finance", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ACTSC 221","ACTSC 231"] }, { type: "OR", reqs: ["STAT 231","STAT 241"] }], 
    antireqs: ["ACTSC 291","ACTSC 372","ACTSC 391","AFM 272","AFM 273","AFM 274","AFM 275","ECON 371","ACTSC 371","AFM 372","BUS 283W"],
    tags: ["matbus"], majors: ["math"] },

  { code: "MATBUS 470", title: "Derivatives", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ACTSC 372","ACTSC 391","AFM 275","ACTSC 371","AFM 372","BUS 393W"] }, { type: "OR", reqs: ["STAT 333","STAT 334"] }], 
    antireqs: ["ACTSC 446","AFM 322","ECON 372","AFM 474","BUS 423W","STAT 446"],
    tags: ["matbus"], majors: ["math"] },

  { code: "MATBUS 471", title: "Fixed Income Securities", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ACTSC 231"] }, { type: "OR", reqs: ["ACTSC 372","ACTSC 391","AFM 275","AFM 372","BUS 393W"] }], 
    antireqs: ["AFM 425","AFM 475","BUS 449W"],
    tags: ["matbus"], majors: ["math"] },

  { code: "MATBUS 472", title: "Risk Management", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ACTSC 372","ACTSC 391","AFM 275","AFM 372","BUS 393W"] }], 
    antireqs: ["AFM 445","AFM 422","BUS 433W"],
    tags: ["matbus"], majors: ["math"] },


  // ── Other Courses ──────────────────────────────────────────────────────

  { code: "ECE 105", title: "Classical Mechanics",
    units: 0.5, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "ECE 124", title: "Digital Circuits & Systems",
    units: 0.5, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "ECE 140", title: "Digital Circuits & Systems",
    units: 0.5, prereqs: [], antireqs: ["AE 123","CIVE 123","ENVE 123","GEOE 123","GENE 123","ME 123","MTE 120","NE 140"],
    tags: ["core"], majors: ["se"] },

  { code: "ECE 192", title: "Engineering Economics and Impact on Society",
    units: 0.25, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "ECE 222", title: "Digital Computers",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["BME 393","ECE 124","MTE 262","SYDE 192"] }, { type: "OR", reqs: ["BME 121","CS 115","CS 135","CS 137","CS 145","ECE 150","MSE 121","MTE 121","SYDE 121"] }], antireqs: [],
    tags: ["systems"], majors: ["se"] },

  { code: "ECE 358", title: "Computer Networks",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["BME 213","ECE 203","MTE 201","NE 215","STAT 206","SYDE 212"] }], antireqs: [],
    tags: ["systems","core"], majors: ["cs","ds","se","math"] },

  { code: "CHEM 102",  title: "Chemistry for Engineers",
    units: 0.5, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["cs","se","ds","math"] },

  { code: "PHYS 115", title: "Mechanics",
    units: 0.5, prereqs: [], antireqs: ["PHYS 111","PHYS 121"],
    tags: ["core"], majors: ["cs","se","ds","math"] },

  { code: "PHYS 121", title: "Mechanics",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["MATH 104","MATH 127","MATH 137","MATH 147"] }], 
    antireqs: ["ECE 105","PHYS 111","PHYS 115"],
    tags: ["core"], majors: ["cs","se","ds","math"] },

  { code: "PHYS 122", title: "Waves, Electricity and Magnetism",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["PHYS 111","ECE 105","PHYS 115","PHYS 121"] }, { type: "OR", reqs: ["MATH 127","MATH 137","MATH 147"] }], 
    antireqs: ["PHYS 112","PHYS 125"],
    tags: ["core"], majors: ["any"] },

  { code: "PHYS 242", title: "Electricity and Magnetism 1",
    units: 0.5, prereqs: [{ type: "AND", reqs: ["PHYS 122"] }, { type: "OR", reqs: ["MATH 128","MATH 138","MATH 148"] }, { type: "OR", reqs: ["MATH 127","AMATH 231"] }], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "PHYS 234", title: "Quantum Physics 1", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["PHYS 122"] }, { type: "OR", reqs: ["MATH 114","MATH 136","PHYS 249"] }, { type: "OR", reqs: ["MATH 128","MATH 138","MATH 148"] }, { type: "OR", reqs: ["AMATH 250","AMATH 251","MATH 228"] }], 
    antireqs: ["CHEM 356","PHYS 233","ECE 405","NE 232"],
    tags: ["core"], majors: ["any"] },

  { code: "PHYS 334", title: "Quantum Physics 2", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251","MATH 228"] }, { type: "OR", reqs: ["CHEM 356","PHYS 234"] }, { type: "OR", reqs: ["MATH 227","MATH 237","MATH 247"] }], 
    antireqs: ["AMATH 373"],
    tags: ["core"], majors: ["any"] },

  { code: "PHYS 454", title: "Quantum Physics 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["AMATH 231","PMATH 343"] }, { type: "OR", reqs: ["AMATH 373","PHYS 334"] }], 
    antireqs: ["AMATH 473"],
    tags: ["core"], majors: ["any"] },

  { code: "PHYS 476", title: "Introduction to General Relativity", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 231","MATH 227"] }, { type: "OR", reqs: ["AMATH 271","PHYS 263","AMATH 261"] }], 
    antireqs: ["AMATH 475"],
    tags: ["core"], majors: ["any"], term: "4A" },

  { code: "PHYS 359", title: "Statistical Mechanics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["CHEM 254","ECE 403","ME 250","PHYS 358"] }, { type: "OR", reqs: ["CHEM 356","PHYS 233","PHYS 234","AMATH 373"] }, { type: "OR", reqs: ["CS 114","CS 116","CS 136","CS 146","PHYS 236"] }], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "PHYS 484", title: "Quantum Theory 3: Quantum Information and Foundations", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 473","PHYS 454"] }], 
    antireqs: ["AMATH 474"],
    tags: ["core"], majors: ["any"], term: "4A" },

  { code: "PHYS 358", title: "Thermal Physics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251","MATH 228"] }, { type: "OR", reqs: ["MATH 227","MATH 237","MATH 247"] }, { type: "OR", reqs: ["PHYS 112","PHYS 122"] }], 
    antireqs: ["CHEM 254","ECE 403"],
    tags: ["core"], majors: ["any"], term: "4A" },

  { code: "ECE 403", title: "Thermal Physics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: [{ type: "AND", reqs: ["ECE 105","ECE 106"] }, { type: "OR", reqs: ["PHYS 112","PHYS 122"] }] }, { type: "OR", reqs: [{ type: "OR", reqs: ["ECE 205","MATH 211"] }, { type: "AND", reqs: [{ type: "OR", reqs: ["AMATH 250","AMATH 251","MATH 228"] }, { type: "OR", reqs: ["MATH 227","MATH 237","MATH 247"] }] }] }], 
    antireqs: ["CHEM 254","ME 250","ME 354","MTE 309","PHYS 358","SYDE 381"],
    tags: ["core"], majors: ["any"], term: "4A" },

  { code: "MSE 343", title: "Human-Computer Interaction",
    units: 0.5, prereqs: [{ type: "OR", reqs: ["BME 121","CS 137","ECE 150","MTE 121","SYDE 121"] }], antireqs: ["CS 449"],
    tags: ["core"], majors: ["se"] },

  { code: "GENE 403", title: "Interdisciplinary Design Project 1",
    units: 0.5, prereqs: [], antireqs: [],
    tags: ["core"], majors: ["se"] },

  { code: "ENGL 378", title: "Professional Communications in Statistics and Actuarial Science", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["COMMST 100","COMMST 223","EMLS 101R","EMLS 102R","EMLS 129R","ENGL 109","ENGL 129R"] }, { type: "OR", reqs: ["ACTSC 331","STAT 331","STAT 371"] }], 
    antireqs: [],
    tags: ["core"], majors: ["math","ds"] },

  { code: "AFM 101", title: "Introduction to Financial Accounting", units: 0.5, 
    prereqs: [], 
    antireqs: ["AFM 123","AFM 191","ARBUS 102","BUS127W","BUS227W","MSCI262"],
    tags: ["core"], majors: ["any"], exclMajors: [] },

  { code: "ECON 101", title: "Introduction to Microeconomics", units: 0.5, 
    prereqs: [], 
    antireqs: ["COMM 103","ECON 100"],
    tags: ["core"], majors: ["any"], exclMajors: [] },

  { code: "ECON 102", title: "Introduction to Macroeconomics", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "ECON 290", title: "Models of Choice in Competitive Markets", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["COMM 103","ECON 100","ECON 101"] }, { type: "OR", reqs: ["ECON 211","MATH 128","MATH 138","MATH 148"] }, { type: "OR", reqs: ["ARTS 280", "ECON 221", "ENVS 278", "KIN 232", "LS 280", "PSCI 314", "PSYCH 292", "REC 371", "SDS 250R", "SOC 280", "SRF 230", "STAT 202", "STAT 206", "STAT 211", "STAT 220", "STAT 230", "STAT 240", "KIN 222", "PSCI 214", "SMF 230", "SWREN 250R"] }], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "ECON 306", title: "Macroeconomics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ECON 102","ECON 391"]}],
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "ECON 391", title: "Equilibrium in Market Economies", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ECON 290"]}],
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "ECON 393", title: "Market Failures", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ECON 391"]}],
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "ECON 472", title: "Senior Honours Essay", units: 0.5, 
    prereqs: [],
    antireqs: [],
    tags: ["core"], majors: ["any"], term: "4A" },

  { code: "ECON 491", title: "Advanced Microeconomics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ECON 392","ECON 393"]}],
    antireqs: [],
    tags: ["core"], majors: ["any"], term: "4A" },

  { code: "ECON 496", title: "Advanced Macroeconomics", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ECON 306","ECON 393"]}, { type: "OR", reqs: ["ECON 323","STAT 221","STAT 231","STAT 241"]}],
    antireqs: [],
    tags: ["core"], majors: ["any"], term: "4A" },

  { code: "ECON 406", title: "Money and Banking 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ECON 306","ECON 393"]}, { type: "OR", reqs: [{ type: "AND", reqs: ["ECON 323"]}, { type: "OR", reqs: ["STAT 221","STAT 231","STAT 241"]}]}],
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "ECON 407", title: "Economic Growth and Development 2", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ECON 306","ECON 393"]}, { type: "OR", reqs: ["ECON 323","STAT 221","STAT 231","STAT 241"]}],
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "ECON 408", title: "Business Cycles", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ECON 306","ECON 393"]}, { type: "OR", reqs: ["ECON 323","STAT 221","STAT 231","STAT 241"]}],
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "ECON 409", title: "Workers, Jobs, and Wages", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ECON 306","ECON 393"]}, { type: "OR", reqs: ["ECON 323","STAT 221","STAT 231","STAT 241"]}],
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "MTHEL 131", title: "Introduction to Actuarial Practice", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "AFM 424", title: "Equity Investments", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ACTSC 291","ACTSC 372","AFM 272","AFM 273","ECON 371"]}], 
    antireqs: ["BUS 473W"],
    tags: ["core"], majors: ["any"] },

  { code: "BIOL 239", title: "Genetics", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "HLTH 101", title: "Introduction to Health 1", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "AFM 102", title: "Introduction to Managerial Accounting", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AFM 101","AFM 191","BUS 127W","BUS 227W"]}], 
    antireqs: ["AFM 123","AFM 182","ARBUS 102","BUS 247W","MSCI 262"],
    tags: ["core"], majors: ["any"] },

  { code: "BUS 111W", title: "Understanding the Business Environment (WLU)", units: 0.5, 
    prereqs: [], 
    antireqs: ["AFM 131","ARBUS 101"],
    tags: ["core"], majors: ["any"] },

  { code: "BUS 121W", title: "Critical Thinking and Communication Skills (WLU)", units: 0.5, 
    prereqs: [], 
    antireqs: ["COMM 102"],
    tags: ["core"], majors: ["any"] },

  { code: "BUS 381W", title: "Strategic Management I (WLU)", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["BUS 121W"]}, { type: "OR", reqs: ["AFM 131","BUS 111W"]}, { type: "OR", reqs: ["ACTSC 291","AFM 272","ECON 371","MATBUS 371","ACTSC 371","AFM 271","BUS 383W"]}], 
    antireqs: ["BUS 481W"],
    tags: ["core"], majors: ["any"] },

  { code: "COMM 431", title: "Project Management", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["AFM 102"]}, { type: "OR", reqs: ["MSE 211","PSYCH 238","MSCI 211"]}], 
    antireqs: [],
    tags: ["core"], majors: ["any"], term: "3A" },

  { code: "COMM 432", title: "Electronic Business", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["ARBUS 302","MGMT 244","BUS 352W"]}, { type: "OR", reqs: ["CS 330","CS 490"]}], 
    antireqs: ["AFM 443"],
    tags: ["core"], majors: ["any"], term: "3A" },

  { code: "MSE 211", title: "Organizational Behaviour", units: 0.5, 
    prereqs: [], 
    antireqs: ["AFM 280","PSYCH 238","SCBUS 225","BUS 288W","MSCI 211"],
    tags: ["core"], majors: ["any"], exclMajors: [] },

  { code: "MSE 311", title: "Organizational Design and Technology", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "AFM 231", title: "Business Law", units: 0.5, 
    prereqs: [], 
    antireqs: ["LS 283","AFM 335","CIVE 491","BUS 231W","COMM 231","GENE 411","ME 401","MTHEL 100"],
    tags: ["core"], majors: ["any"], exclMajors: [] },

  { code: "LS 283", title: "Business Law", units: 0.5, 
    prereqs: [], 
    antireqs: ["AFM 231","AFM 335","CIVE 491","BUS 231W","COMM 231","GENE 411","ME 401","MTHEL 100"],
    tags: ["core"], majors: ["any"], exclMajors: [] },

  { code: "ARBUS 302", title: "Principles of Marketing", units: 0.5, 
    prereqs: [{ type: "AND", reqs: ["ECON 101"] }], 
    antireqs: ["MGMT 244","ARBUS 302","ENBUS 211","GBDA 304","BUS 352W","ECON 344","ENBUS 311","MGMT 344"],
    tags: ["core"], majors: ["any"], exclMajors: [], term: "2A" },

  { code: "BUS 252W", title: "Introduction to Marketing Management (WLU)", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["AFM 131","ARBUS 101","BUS 111W"] }], 
    antireqs: ["ARBUS 302","MGMT 244","BUS 229W","ECON 344","MGMT 344"],
    tags: ["core"], majors: ["any"], exclMajors: [] },

  { code: "MGMT 244", title: "Principles of Marketing", units: 0.5, 
    prereqs: [], 
    antireqs: ["ARBUS 302","ENBUS 302","GBDA 304","BUS 352W","ECON 344","ENBUS 311"],
    tags: ["core"], majors: ["any"], term: "2B" },

  { code: "STV 100", title: "Society, Technology and Values: Introduction", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "STV 201", title: "Society, Technology and Values: Special Topics", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "STV 202", title: "Design and Society", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "STV 205", title: "Cybernetics and Society", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "STV 208", title: "Artificial Intelligence and Society: Impact, Ethics, and Equity", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

  { code: "STV 210", title: "The Computing Society", units: 0.5, 
    prereqs: [], 
    antireqs: ["HIST 212"],
    tags: ["core"], majors: ["any"] },

  { code: "STV 302", title: "Information Technology and Society", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STV 100","STV 201","STV 202","STV 205","STV 208","STV 210"] }], 
    antireqs: [],
    tags: ["core"], majors: ["any"], term: "3A" },

  { code: "STV 304", title: "Technology in Canadian Society", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STV 100","STV 201","STV 202","STV 205","STV 208","STV 210"] }], 
    antireqs: [],
    tags: ["core"], majors: ["any"], term: "3A" },

  { code: "STV 305", title: "Technology, Society and the Modern City", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STV 100","STV 201","STV 202","STV 205","STV 208","STV 210"] }], 
    antireqs: [],
    tags: ["core"], majors: ["any"], term: "3A" },

  { code: "STV 306", title: "Biotechnology and Society", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STV 100","STV 201","STV 202","STV 205","STV 208","STV 210"] }], 
    antireqs: [],
    tags: ["core"], majors: ["any"], term: "3A" },

  { code: "STV 400", title: "Society, Technology and Values: Senior Project", units: 0.5, 
    prereqs: [], 
    antireqs: [],
    tags: ["core"], majors: ["any"], term: "4A" },

  { code: "STV 401", title: "Society, Technology and Values: Advanced Topics", units: 0.5, 
    prereqs: [{ type: "OR", reqs: ["STV 100","STV 201","STV 202","STV 205","STV 208","STV 210","STV 302","STV 304","STV 305","STV 306"] }], 
    antireqs: [],
    tags: ["core"], majors: ["any"] },

];

// ── Build CourseMap (with computed leadsTo) ───────────────────────────────────

function buildCourseMap(): CourseMap {
  const map: CourseMap = {};

  // First pass: seed all entries with empty leadsTo
  for (const raw of RAW_COURSES) {
    // Guard against duplicate codes (MATH 138 appeared twice above in the draft)
    if (!map[raw.code]) {
      map[raw.code] = { ...raw, leadsTo: [] };
    } else {
      // Merge majors if the same code appears more than once
      map[raw.code].majors = [
        ...new Set([...map[raw.code].majors, ...raw.majors]),
      ] as MajorId[];
    }
  }

  // Second pass: compute leadsTo from prereq edges
  const extractFromTree = (item: Requisite): string[] => {
    // If reqs doesn't exist for some reason, return empty
    if (!item.reqs) return [];

    return item.reqs.flatMap((sub) => {
      // If the sub-item is a string (Course Code), return it in an array
      if (typeof sub === "string") {
        return [sub];
      }
      // If it's a nested Requisite object, recurse
      return extractFromTree(sub);
    });
  };

  /**
   * Helper to handle the top-level array of Requisites
   */
  const getAllPrereqCodes = (prereqs: Requisite[] | []): string[] => {
    return prereqs.flatMap((req) => extractFromTree(req));
  };

  // Second pass: compute leadsTo
  for (const course of Object.values(map)) {
    const allDepCodes = getAllPrereqCodes(course.prereqs);

    for (const depCode of allDepCodes) {
      // Ensure the dependency exists in our map and avoid duplicate entries
      if (map[depCode] && !map[depCode].leadsTo.includes(course.code)) {
        map[depCode].leadsTo.push(course.code);
      }
    }
  }

  return map;
}

export const COURSE_DATA: CourseMap = buildCourseMap();

// ── Tag Colors ────────────────────────────────────────────────────────────────

export const TAG_COLORS: Record<string, string> = {
  core:      "#FFD54F",
  systems:   "#64B5F6",
  theory:    "#CE93D8",
  ml:        "#80DEEA",
  stat:      "#A5D6A7",
  math:      "#FFAB91",
  pmath:     "#F9A8D4",
  co:        "#FCD34D",
  se:        "#F48FB1",
  security:  "#FF8A65",
  advanced:  "#B39DDB",
  numerical: "#80CBC4",
  data:      "#6EE7B7",
};

export const COURSE_COLORS: Record<string, string> = {
  // Math Faculty (Pink/Purple Spectrum)
  CS:    "#EC4899", // Bright Pink
  MATH:  "#E879F9", // Fuchsia
  STAT:  "#8B5CF6", // Violet (Adjusted for uniqueness)
  ACTSC: "#A855F7", // Deep Purple
  CO:    "#818CF8", // Indigo
  AMATH: "#6366F1", // Royal Blue
  PMATH: "#4F46E5", // Deep Blue
  CFM:   "#EC4899", // Darker Pink

  // Engineering Faculty (Blue/Cyan/Dark Green Spectrum)
  SE:    "#A855F7", // Sky Blue
  ECE:   "#0EA5E9", // Ocean Blue
  SYDE:  "#2DD4BF", // Teal
  MTE:   "#06B6D4", // Cyan
  ME:    "#0891B2", // Dark Cyan
  CHE:   "#065F46", // Emerald
  NE:    "#14B8A6", // Mint
  MGMT:  "#22D3EE", // Light Cyan
  MSE:   "#075985", // Navy Engineering
  GENE:  "#334155", // Slate (General Engineering)
  ENVE:  "#0D9488", // Dark Teal (Environmental Engineering)

  // Science Faculty (Green/Orange Spectrum)
  SCI:   "#4ADE80", // Light Green
  BIOL:  "#22C55E", // Green
  CHEM:  "#16A34A", // Dark Green
  PHYS:  "#FB923C", // Orange
  EARTH: "#92400E", // Brown (Earth/Geology)

  // Arts/Environment/Humanities (Yellow/Red/Earth Spectrum)
  AFM:   "#FACC15", // Gold/Yellow
  ECON:  "#F59E0B", // Amber
  ARBUS: "#D97706", // Dark Amber
  HEALTH:"#F87171", // Soft Red
  PLAN:  "#A3E635", // Lime
  ENVS:  "#65A30D", // Olive (Environment)
  ERS:   "#4D7C0F", // Deep Forest (Environment/Resources)
  GEOG:  "#84CC16", // Bright Lime (Geography)
  ENBUS: "#CA8A04", // Mustard (Environment & Business)
  
  // Communication & Languages
  COMMST:"#FDA4AF", // Rose (Communication)
  ENGL:  "#FB7185", // Soft Crimson (English)
  EMLS:  "#F43F5E", // Deep Rose (English Language)
  
  // Humanities & Social Sciences
  PHIL:  "#64748B", // Steel Blue (Philosophy)
  PSYCH: "#FCA5A5", // Salmon (Psychology)
  PSCI:  "#EF4444", // Red (Political Science)
  PACS:  "#34D399", // Seafoam (Peace and Conflict)
  RCS:   "#D4D4D8", // Light Gray (Religious/Cultural)
  THPERF:"#C084FC", // Lavender (Theatre/Performance)

  // Professional Development (Neutral)
  PD:    "#94A3B8", // Slate Gray
};

// ── Status Colors ─────────────────────────────────────────────────────────────

export const STATUS_COLORS: Record<string, string> = {
  completed: "#4ADE80",
  planned:   "#60A5FA",
  available: "#94A3B8",
  locked:    "#334155",
};
