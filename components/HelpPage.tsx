"use client";

import type { CSSProperties, ReactNode } from "react";

type Accent = "gold" | "blue" | "green" | "purple" | "orange" | "red" | "cyan";

const ACCENTS: Record<Accent, string> = {
  gold:   "#FFD54F",
  blue:   "#60A5FA",
  green:  "#4ADE80",
  purple: "#A78BFA",
  orange: "#FB923C",
  red:    "#F87171",
  cyan:   "#80DEEA",
};

const WORKFLOW = [
  {
    n: "01",
    title: "Choose a program",
    body: "Use the header major selector for CS, SE, DS, or Math. Programs with specializations expose a sub-major row, such as Statistics, CO, Pure Math, or other Math/DS paths.",
    accent: "gold" as Accent,
  },
  {
    n: "02",
    title: "Read the graph",
    body: "The Graph tab shows the active curriculum. Pan, zoom, click a course, and use the detail panel to inspect prerequisites, antirequisites, restrictions, and unlocks.",
    accent: "blue" as Accent,
  },
  {
    n: "03",
    title: "Mark progress",
    body: "Mark courses complete, mark them planned, or assign them to a term. Completed and planned courses update graph statuses and progress audit counts immediately.",
    accent: "green" as Accent,
  },
  {
    n: "04",
    title: "Plan and audit",
    body: "Use Planner for the 1A-4B term layout, then Progress for degree completion, requirement groups, best-fit programs, and course-to-requirement allocation.",
    accent: "orange" as Accent,
  },
  {
    n: "05",
    title: "Explore or ask",
    body: "Use Explore for courses outside the active major, or Ask AI for degree-specific questions and suggested progress updates that require confirmation.",
    accent: "purple" as Accent,
  },
];

const FEATURE_SECTIONS = [
  {
    id: "graph",
    eyebrow: "Graph",
    title: "Curriculum Map",
    accent: "blue" as Accent,
    bullets: [
      "Nodes are colored by status: completed, planned, available, locked, or conflict.",
      "Clicking a node highlights its prerequisite chain and downstream unlock path.",
      "The right detail panel shows course title, restrictions, prereq logic, unlocks, antireqs, and planning actions.",
      "Next Up courses glow when they are available, still useful for the active degree, and narrow enough to call out.",
    ],
    preview: <GraphPreview />,
  },
  {
    id: "filters",
    eyebrow: "Graph + Explore",
    title: "Filters",
    accent: "purple" as Accent,
    bullets: [
      "Graph mode has subject chips, level chips, stream filters, and My Roadmap.",
      "Explore mode shows level chips for the currently pinned course network.",
      "Level filters keep pinned courses visible and prune disconnected downstream nodes when a connector course is hidden.",
      "My Roadmap narrows the graph to completed/planned courses and their prerequisites.",
    ],
    preview: <FilterPreview />,
  },
  {
    id: "explore",
    eyebrow: "Explore",
    title: "Catalog Exploration",
    accent: "purple" as Accent,
    bullets: [
      "Explore pins up to 5 courses from the full UW catalog, independent of your active major.",
      "Pinned courses render with complete prerequisite chains and connected downstream paths.",
      "Use Cmd/Ctrl+K while in Explore to add courses; remove pinned courses from the chip row.",
      "Explore never changes your completed courses, planned courses, term plan, or active curriculum.",
    ],
    preview: <ExplorePreview />,
  },
  {
    id: "planner",
    eyebrow: "Planner",
    title: "Term Planning",
    accent: "green" as Accent,
    bullets: [
      "Drag courses across 1A through 4B and remove them by dragging back to the unplanned area.",
      "Courses planned from the detail panel appear in the planner and count toward progress.",
      "Load Sample Plan fills the recommended sequence for the active program.",
      "Clear empties the current term plan while preserving completed course history.",
    ],
    preview: <PlannerPreview />,
  },
  {
    id: "progress",
    eyebrow: "Progress",
    title: "Degree Audit",
    accent: "orange" as Accent,
    bullets: [
      "The progress ring separates completed and planned requirement credit.",
      "Requirement cards show fulfilled, in-progress, and incomplete groups.",
      "Degree Explorer ranks sub-majors and programs by fit against your current completed/planned set.",
      "The audit engine assigns courses to requirement slots so one course does not accidentally block a better match.",
    ],
    preview: <ProgressPreview />,
  },
  {
    id: "ai",
    eyebrow: "Ask AI",
    title: "Guided Planning",
    accent: "cyan" as Accent,
    bullets: [
      "Ask questions about remaining requirements, swaps, prerequisites, and planning choices.",
      "The chat receives your active degree, completed courses, planned courses, and audit context.",
      "When the assistant suggests marking courses complete or planned, the app asks for confirmation first.",
      "Use quick suggestion pills for common starting points.",
    ],
    preview: <AiPreview />,
  },
];

const STATUS = [
  { label: "Completed", color: "#4ADE80", body: "You marked the course done." },
  { label: "Planned", color: "#60A5FA", body: "Marked planned or assigned to a term." },
  { label: "Available", color: "#E2E8F0", body: "Prerequisites are currently satisfied." },
  { label: "Locked", color: "#475569", body: "Prerequisites are not satisfied yet." },
  { label: "Conflict", color: "#F97316", body: "Antirequisite clash or incomplete data." },
  { label: "Next Up", color: "#FFFFFF", body: "Available and likely relevant next." },
];

const SHORTCUTS = [
  { key: "Cmd/Ctrl K", body: "Open course search from anywhere." },
  { key: "Esc", body: "Close search and clear graph selection." },
  { key: "Click node", body: "Select a course and open the detail panel." },
  { key: "Scroll", body: "Zoom the graph canvas." },
  { key: "Drag canvas", body: "Pan around the graph." },
];

const FAQ = [
  {
    q: "What is the normal flow?",
    a: "Pick a program, inspect the Graph, mark completed courses, plan future terms, then use Progress to validate requirement coverage. Explore and Ask AI are side tools for discovery and decision support.",
  },
  {
    q: "Does Explore affect my degree plan?",
    a: "No. Explore is separate from the active curriculum and does not mutate completed courses, planned courses, or the term plan.",
  },
  {
    q: "Why did a downstream Explore course disappear after filtering levels?",
    a: "Explore keeps only connected visible paths. If a level filter hides the intermediate connector, the downstream node is pruned so the graph does not show orphan courses.",
  },
  {
    q: "Can one course count for multiple requirements?",
    a: "Some requirement groups allow double counting. The Progress audit handles course assignment centrally so the same course is not consumed incorrectly by the first matching group.",
  },
  {
    q: "Where is my data stored?",
    a: "Completed courses, planned courses, term plan, active program, filters, and theme state are persisted locally in your browser.",
  },
  {
    q: "Is this a replacement for academic advising?",
    a: "No. GradGraph is a planning aid. Always confirm official requirements, substitutions, and edge cases with the UW calendar and your academic advisor.",
  },
];

export default function HelpPage() {
  return (
    <div style={styles.page}>
      <style>{`
        .help-link:hover { color: #F8FAFC !important; border-color: rgba(255,255,255,0.18) !important; background: rgba(255,255,255,0.04) !important; }
        .help-card:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.16) !important; }
        .help-button:hover { border-color: rgba(96,165,250,0.7) !important; background: rgba(96,165,250,0.14) !important; }
      `}</style>

      <section style={styles.hero}>
        <div style={{ minWidth: 0 }}>
          <div style={styles.kicker}>GradGraph Help</div>
          <h1 style={styles.h1}>Plan from graph to audit without losing context.</h1>
          <p style={styles.heroBody}>
            GradGraph is organized around one loop: choose a program, understand the prerequisite graph,
            mark progress, place courses into terms, and verify the degree audit. Explore and Ask AI help
            when you need to look beyond the current curriculum.
          </p>
          <div style={styles.heroActions}>
            <AnchorButton href="#workflow">Start Flow</AnchorButton>
            <AnchorButton href="#features">Feature Map</AnchorButton>
            <AnchorButton href="#faq">FAQ</AnchorButton>
          </div>
        </div>

        <div style={styles.heroPanel}>
          <div style={styles.panelLabel}>Current App Flow</div>
          <FlowRail />
        </div>
      </section>

      <main style={styles.content}>
        <section id="workflow" style={styles.section}>
          <SectionHeader
            eyebrow="Workflow"
            title="The recommended path"
            body="Use the tabs left to right for normal planning. Jump to Explore or Ask AI whenever a question comes up."
          />
          <div style={styles.workflowGrid}>
            {WORKFLOW.map((item) => (
              <article key={item.n} className="help-card" style={cardStyle(item.accent)}>
                <div style={{ ...styles.stepNumber, color: ACCENTS[item.accent] }}>{item.n}</div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="features" style={styles.section}>
          <SectionHeader
            eyebrow="Features"
            title="What each tab does now"
            body="These sections reflect the current app flow, including Explore level filters and connected downstream paths."
          />
          <div style={styles.featureGrid}>
            {FEATURE_SECTIONS.map((feature) => (
              <article key={feature.id} id={feature.id} className="help-card" style={featureStyle(feature.accent)}>
                <div style={styles.featureText}>
                  <div style={{ ...styles.featureEyebrow, color: ACCENTS[feature.accent] }}>{feature.eyebrow}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <ul style={styles.bullets}>
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} style={styles.bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <div style={styles.previewShell}>{feature.preview}</div>
              </article>
            ))}
          </div>
        </section>

        <section style={styles.twoColumn}>
          <div style={styles.section}>
            <SectionHeader eyebrow="Legend" title="Node statuses" body="Colors describe what you can do with a course right now." compact />
            <div style={styles.statusGrid}>
              {STATUS.map((item) => (
                <div key={item.label} style={styles.statusRow}>
                  <span style={{ ...styles.statusDot, background: item.color, boxShadow: item.label === "Next Up" ? "0 0 10px #FFFFFF" : "none" }} />
                  <div>
                    <div style={styles.statusLabel}>{item.label}</div>
                    <div style={styles.statusBody}>{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <SectionHeader eyebrow="Shortcuts" title="Fast controls" body="These work across the main planner experience." compact />
            <div style={styles.shortcutList}>
              {SHORTCUTS.map((item) => (
                <div key={item.key} style={styles.shortcutRow}>
                  <kbd style={styles.kbd}>{item.key}</kbd>
                  <span style={styles.shortcutBody}>{item.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" style={styles.section}>
          <SectionHeader
            eyebrow="FAQ"
            title="Important details"
            body="A few boundaries and behaviors that matter when using GradGraph for real planning."
          />
          <div style={styles.faqGrid}>
            {FAQ.map((item) => (
              <article key={item.q} style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>{item.q}</h3>
                <p style={styles.faqAnswer}>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={styles.about}>
          <div>
            <div style={styles.panelLabel}>About</div>
            <p style={styles.aboutText}>
              Built with Next.js 16, React 19, Zustand, a layered graph layout, and a matching-based
              audit engine. Course and requirement data are planning data, not an official advising record.
            </p>
          </div>
          <div style={styles.socials}>
            <a className="help-link" href="https://www.linkedin.com/in/maximiliantmiller/" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <LinkedInIcon /> LinkedIn
            </a>
            <a className="help-link" href="https://github.com/maxtmiller" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <GitHubIcon /> GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionHeader({ eyebrow, title, body, compact = false }: {
  eyebrow: string;
  title: string;
  body: string;
  compact?: boolean;
}) {
  return (
    <header style={{ marginBottom: compact ? 14 : 18 }}>
      <div style={styles.sectionEyebrow}>{eyebrow}</div>
      <h2 style={compact ? styles.h2Compact : styles.h2}>{title}</h2>
      <p style={styles.sectionBody}>{body}</p>
    </header>
  );
}

function AnchorButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="help-button" href={href} style={styles.anchorButton}>
      {children}
    </a>
  );
}

function FlowRail() {
  const tabs = [
    ["Graph", "Read paths", "blue"],
    ["Explore", "Pin catalog courses", "purple"],
    ["Planner", "Place terms", "green"],
    ["Progress", "Audit fit", "orange"],
    ["Ask AI", "Get guidance", "gold"],
  ] as const;

  return (
    <div style={styles.flowRail}>
      {tabs.map(([tab, body, accent], i) => (
        <div key={tab} style={styles.flowItem}>
          <div style={{ ...styles.flowIndex, borderColor: ACCENTS[accent], color: ACCENTS[accent] }}>{i + 1}</div>
          <div>
            <div style={styles.flowTitle}>{tab}</div>
            <div style={styles.flowBody}>{body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GraphPreview() {
  return (
    <div style={styles.graphPreview}>
      <CourseMini code="CS 136" label="Complete" color="#4ADE80" />
      <Connector />
      <CourseMini code="CS 246" label="Selected" color="#FFD54F" />
      <Connector />
      <CourseMini code="CS 370" label="Unlocks" color="#60A5FA" />
    </div>
  );
}

function FilterPreview() {
  return (
    <div style={styles.stackPreview}>
      <div style={styles.chipRow}>
        {["CS", "MATH", "STAT", "CO"].map((chip, i) => (
          <Chip key={chip} label={chip} active={i < 3} color={["#EC4899", "#FCD34D", "#80DEEA", "#4ADE80"][i]} />
        ))}
      </div>
      <div style={styles.chipRow}>
        {["1xx", "2xx", "3xx", "4xx"].map((chip, i) => (
          <Chip key={chip} label={chip} active={i !== 2} color="#A78BFA" />
        ))}
        <Chip label="My Roadmap" active color="#A78BFA" />
      </div>
      <div style={styles.chipRow}>
        {["All", "Required", "Standard", "Advanced"].map((chip, i) => (
          <Chip key={chip} label={chip} active={i === 0} color="#FFD54F" />
        ))}
      </div>
    </div>
  );
}

function ExplorePreview() {
  return (
    <div style={styles.stackPreview}>
      <div style={styles.pinnedRow}>
        {["CS 246", "MUSIC 140"].map((code) => (
          <span key={code} style={styles.pinnedChip}>{code}<span style={{ color: "#6D5AD0" }}> x</span></span>
        ))}
        <span style={styles.searchChip}>+ Search Cmd K</span>
      </div>
      <div style={styles.explorePath}>
        <CourseMini code="CS 246" label="Pinned" color="#A78BFA" />
        <Connector />
        <CourseMini code="CS 370" label="Connected" color="#60A5FA" />
        <Connector />
        <CourseMini code="CS 475" label="Downstream" color="#60A5FA" />
      </div>
    </div>
  );
}

function PlannerPreview() {
  return (
    <div style={styles.termGrid}>
      {["1A", "1B", "2A", "2B"].map((term, i) => (
        <div key={term} style={styles.termCard}>
          <div style={styles.termTitle}>{term}</div>
          <div style={styles.termCourse}>{["CS 135", "CS 136", "CS 246", "CS 341"][i]}</div>
          <div style={styles.termCourseMuted}>{["MATH 135", "MATH 136", "STAT 230", "CO 250"][i]}</div>
        </div>
      ))}
    </div>
  );
}

function ProgressPreview() {
  return (
    <div style={styles.progressPreview}>
      <div style={styles.progressRing}>68%</div>
      <div style={{ flex: 1 }}>
        <ProgressBar label="Core courses" pct={100} color="#4ADE80" />
        <ProgressBar label="Electives" pct={62} color="#60A5FA" />
        <ProgressBar label="Communication" pct={25} color="#FB923C" />
      </div>
    </div>
  );
}

function AiPreview() {
  return (
    <div style={styles.aiBox}>
      <div style={{ color: "#A78BFA", fontSize: 10, marginBottom: 6 }}>AI</div>
      <div style={{ color: "#CBD5E1", fontSize: 11, lineHeight: 1.6 }}>
        You have 2 CS electives left. CS 475 is reachable from your current path through CS 370.
      </div>
      <div style={styles.aiPills}>
        <span>What is left?</span>
        <span>Compare options</span>
      </div>
    </div>
  );
}

function CourseMini({ code, label, color }: { code: string; label: string; color: string }) {
  return (
    <div style={{ ...styles.courseMini, borderColor: `${color}66` }}>
      <div style={{ color, fontWeight: 700 }}>{code}</div>
      <div style={{ color: "#64748B", fontSize: 9, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Connector() {
  return <div style={styles.connector} />;
}

function Chip({ label, active, color }: { label: string; active: boolean; color: string }) {
  return (
    <span style={{
      ...styles.chip,
      borderColor: active ? color : "#2D3748",
      background: active ? `${color}20` : "rgba(15,23,42,0.75)",
      color: active ? color : "#475569",
    }}>
      {label}
    </span>
  );
}

function ProgressBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={styles.progressLabel}><span>{label}</span><span>{pct}%</span></div>
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#0A66C2" opacity="0.9" />
      <path d="M6.5 9.5h2v8h-2v-8zm1-1.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM10.5 9.5h1.9v1.1c.4-.7 1.3-1.3 2.6-1.3 2.1 0 3 1.3 3 3.4v5.3h-2v-4.8c0-1.1-.4-1.9-1.5-1.9-1.2 0-1.9.9-1.9 2.1v4.6h-2v-8.5z" fill="white" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#E2E8F0" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}

function cardStyle(accent: Accent): CSSProperties {
  return {
    ...styles.card,
    borderColor: `${ACCENTS[accent]}33`,
    background: `linear-gradient(180deg, ${ACCENTS[accent]}10, rgba(15,23,42,0.82))`,
  };
}

function featureStyle(accent: Accent): CSSProperties {
  return {
    ...styles.featureCard,
    borderColor: `${ACCENTS[accent]}2e`,
  };
}

const styles: Record<string, CSSProperties> = {
  page: {
    height: "100%",
    overflowY: "auto",
    background: "var(--gg-base)",
    color: "var(--gg-text-2)",
    fontFamily: "'DM Mono', monospace",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 360px",
    gap: 28,
    padding: "36px 44px 30px",
    borderBottom: "1px solid var(--gg-border)",
    background: "linear-gradient(135deg, rgba(255,213,79,0.08), rgba(96,165,250,0.06) 48%, rgba(167,139,250,0.08))",
  },
  kicker: {
    color: "#FFD54F",
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  h1: {
    margin: 0,
    maxWidth: 720,
    color: "#F8FAFC",
    fontFamily: "'Syne', sans-serif",
    fontSize: 32,
    lineHeight: 1.12,
    fontWeight: 850,
    letterSpacing: 0,
  },
  heroBody: {
    maxWidth: 760,
    margin: "14px 0 0",
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 1.75,
  },
  heroActions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 18,
  },
  anchorButton: {
    padding: "8px 13px",
    borderRadius: 7,
    border: "1px solid rgba(96,165,250,0.32)",
    background: "rgba(15,23,42,0.55)",
    color: "#93C5FD",
    textDecoration: "none",
    fontSize: 10,
    transition: "all 0.15s",
  },
  heroPanel: {
    minWidth: 0,
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    background: "rgba(10,15,30,0.72)",
    padding: 16,
  },
  panelLabel: {
    color: "#64748B",
    fontSize: 9,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  flowRail: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  flowItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 10px",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 8,
    background: "rgba(15,23,42,0.68)",
  },
  flowIndex: {
    width: 24,
    height: 24,
    borderRadius: 6,
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    flexShrink: 0,
  },
  flowTitle: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: 700,
  },
  flowBody: {
    color: "#64748B",
    fontSize: 10,
    marginTop: 2,
  },
  content: {
    maxWidth: 1180,
    padding: "28px 44px 56px",
  },
  section: {
    marginBottom: 32,
  },
  sectionEyebrow: {
    color: "#64748B",
    fontSize: 9,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: 7,
  },
  h2: {
    margin: 0,
    color: "#F1F5F9",
    fontFamily: "'Syne', sans-serif",
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: 0,
  },
  h2Compact: {
    margin: 0,
    color: "#F1F5F9",
    fontFamily: "'Syne', sans-serif",
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: 0,
  },
  sectionBody: {
    margin: "8px 0 0",
    color: "#64748B",
    fontSize: 11,
    lineHeight: 1.65,
    maxWidth: 760,
  },
  workflowGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 10,
  },
  card: {
    border: "1px solid",
    borderRadius: 9,
    padding: 16,
    minHeight: 170,
    transition: "transform 0.15s, border-color 0.15s",
  },
  stepNumber: {
    fontSize: 10,
    marginBottom: 18,
  },
  cardTitle: {
    margin: "0 0 8px",
    color: "#E2E8F0",
    fontFamily: "'Syne', sans-serif",
    fontSize: 14,
    fontWeight: 750,
    letterSpacing: 0,
  },
  cardBody: {
    margin: 0,
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 1.65,
  },
  featureGrid: {
    display: "grid",
    gap: 12,
  },
  featureCard: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 0.85fr)",
    gap: 18,
    alignItems: "stretch",
    border: "1px solid",
    borderRadius: 10,
    background: "rgba(15,23,42,0.74)",
    padding: 18,
    transition: "transform 0.15s, border-color 0.15s",
  },
  featureText: {
    minWidth: 0,
  },
  featureEyebrow: {
    fontSize: 9,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  featureTitle: {
    margin: 0,
    color: "#F1F5F9",
    fontFamily: "'Syne', sans-serif",
    fontSize: 17,
    fontWeight: 800,
    letterSpacing: 0,
  },
  bullets: {
    margin: "12px 0 0",
    paddingLeft: 18,
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 1.75,
  },
  bullet: {
    marginBottom: 6,
  },
  previewShell: {
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 9,
    background: "rgba(2,6,23,0.48)",
    padding: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 132,
    overflow: "hidden",
  },
  twoColumn: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    gap: 18,
  },
  statusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 8,
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 8,
    background: "rgba(15,23,42,0.66)",
  },
  statusDot: {
    width: 11,
    height: 11,
    borderRadius: 999,
    flexShrink: 0,
  },
  statusLabel: {
    color: "#E2E8F0",
    fontSize: 11,
    fontWeight: 700,
  },
  statusBody: {
    color: "#64748B",
    fontSize: 10,
    marginTop: 2,
    lineHeight: 1.45,
  },
  shortcutList: {
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 9,
    overflow: "hidden",
    background: "rgba(15,23,42,0.66)",
  },
  shortcutRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  kbd: {
    minWidth: 92,
    padding: "4px 8px",
    borderRadius: 5,
    border: "1px solid #334155",
    background: "#0F172A",
    color: "#FFD54F",
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    textAlign: "center",
  },
  shortcutBody: {
    color: "#94A3B8",
    fontSize: 11,
  },
  faqGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 10,
  },
  faqItem: {
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 9,
    background: "rgba(15,23,42,0.66)",
    padding: 15,
  },
  faqQuestion: {
    margin: "0 0 8px",
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: 750,
  },
  faqAnswer: {
    margin: 0,
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 1.7,
  },
  about: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
    borderTop: "1px solid var(--gg-border)",
    paddingTop: 22,
  },
  aboutText: {
    margin: 0,
    color: "#64748B",
    fontSize: 11,
    lineHeight: 1.7,
    maxWidth: 720,
  },
  socials: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    flexShrink: 0,
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "9px 12px",
    borderRadius: 7,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(15,23,42,0.62)",
    color: "#94A3B8",
    textDecoration: "none",
    fontSize: 11,
    transition: "all 0.15s",
  },
  graphPreview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  courseMini: {
    minWidth: 88,
    border: "1px solid",
    borderRadius: 8,
    background: "rgba(15,23,42,0.88)",
    padding: "9px 10px",
    fontSize: 11,
    textAlign: "center",
  },
  connector: {
    width: 30,
    height: 1,
    background: "#1E3A5F",
  },
  stackPreview: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
    width: "100%",
  },
  chipRow: {
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
  },
  chip: {
    border: "1px solid",
    borderRadius: 5,
    padding: "3px 8px",
    fontSize: 10,
    whiteSpace: "nowrap",
  },
  pinnedRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  pinnedChip: {
    padding: "4px 9px",
    borderRadius: 5,
    border: "1px solid rgba(167,139,250,0.42)",
    background: "rgba(167,139,250,0.12)",
    color: "#C4B5FD",
    fontSize: 10,
  },
  searchChip: {
    padding: "4px 9px",
    borderRadius: 5,
    border: "1px dashed #334155",
    color: "#64748B",
    fontSize: 10,
  },
  explorePath: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  termGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(70px, 1fr))",
    gap: 7,
    width: "100%",
  },
  termCard: {
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 8,
    background: "rgba(15,23,42,0.8)",
    padding: 8,
  },
  termTitle: {
    color: "#64748B",
    fontSize: 9,
    marginBottom: 6,
  },
  termCourse: {
    color: "#4ADE80",
    border: "1px solid rgba(74,222,128,0.25)",
    borderRadius: 4,
    padding: "3px 5px",
    fontSize: 9,
    marginBottom: 4,
  },
  termCourseMuted: {
    color: "#60A5FA",
    border: "1px solid rgba(96,165,250,0.25)",
    borderRadius: 4,
    padding: "3px 5px",
    fontSize: 9,
  },
  progressPreview: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  progressRing: {
    width: 78,
    height: 78,
    borderRadius: "50%",
    border: "8px solid rgba(251,146,60,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FB923C",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 850,
    flexShrink: 0,
  },
  progressLabel: {
    display: "flex",
    justifyContent: "space-between",
    color: "#94A3B8",
    fontSize: 10,
    marginBottom: 3,
  },
  progressTrack: {
    height: 5,
    borderRadius: 999,
    background: "#1E293B",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  aiBox: {
    width: "100%",
    border: "1px solid rgba(167,139,250,0.22)",
    borderRadius: 9,
    background: "rgba(167,139,250,0.08)",
    padding: 13,
  },
  aiPills: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginTop: 10,
    color: "#A78BFA",
    fontSize: 9,
  },
};
