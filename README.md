# [`UWGradGraph`]()

   

**Visualizing the path from MATH 136 to your dream Data Science career with interactive, real-time course graphs.**

-----

## Demo



-----

## Features

  * **Interactive Prerequisite Graphs:** Trace complex dependency chains across 400+ courses.
  * **Degree Explorer:** Compare progress across CS, SE, and all 15+ Math sub-majors simultaneously.
  * **Smart Requirement Mining:** Recursive rule-matching for "any 3 of" or "400-level" degree constraints.
  * **"Next Up" Optimization:** Identifies immediate bottleneck courses to keep your graduation on track.
  * **Course Status Tracking:** Toggle between Completed, Planned, and Available states in real-time.
  * **Responsive Sub-Major Registry:** Dynamic curriculum switching for specialized Data Science and Math plans.

-----

## Tech Stack

  * **Frontend:** React 18, Next.js (App Router)
  * **State Management:** Zustand with persistence for local plan storage
  * **Styling:** Tailwind CSS + Framer Motion for graph animations
  * **Graph Logic:** Custom BFS engine for prerequisite expansion and "Next Up" filtering
  * **Data Layer:** Static University of Waterloo course data and degree requirement objects
  * **Language:** TypeScript (Strict Mode)

-----

## Local Setup

1.  Clone the repository:

<!-- end list -->

```bash
git clone https://github.com/maxtmiller/UWGradGraph.git
cd UWGradGraph
```

2.  Install dependencies:

<!-- end list -->

```bash
npm install
```

3.  Run the development server:

<!-- end list -->

```bash
npm run dev
```

4.  Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to start planning.

-----

## Next Steps

  * **Official API Integration:** Sync with Quest for automatic "Completed Course" importing.
  * **Co-op Term Scheduler:** Add a calendar view to map out study/work term sequences.
  * **Breadth Requirement Tracker:** Dedicated UI for non-math elective fulfillment.
  * **Collaborative Planning:** Share degree roadmaps with academic advisors via unique URLs.
