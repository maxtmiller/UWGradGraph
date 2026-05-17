import { useState } from "react";
import { useStore } from "../lib/store";
import { COURSE_DATA } from "../data/courses";
import { MAJORS } from "../data/majors";
import { Requisite } from "../types/index"
import { getConnectedNodes, getHighlightedEdges } from "../lib/graph";

// Scan all course data once to infer relationships for incomplete courses
function inferRelationships(code: string) {
  const inferredLeadsTo: string[] = [];
  const inferredAntireqs: string[] = [];

  const collectCodes = (req: string | Requisite): string[] => {
    if (typeof req === "string") return [req];
    return req.reqs.flatMap(collectCodes);
  };

  for (const c of Object.values(COURSE_DATA)) {
    const prereqCodes = c.prereqs.flatMap(collectCodes);
    if (prereqCodes.includes(code)) inferredLeadsTo.push(c.code);
    if (c.antireqs.includes(code)) inferredAntireqs.push(c.code);
  }

  return { inferredLeadsTo, inferredAntireqs };
}

const TERM_KEYS = ["1A","1B","2A","2B","3A","3B","4A","4B"] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function CourseDetailPanel() {
  const {
    selectedNode, completedCourses, plannedCourses, termPlan, activeMajorId,
    toggleCompleted, togglePlanned, moveCourseToTerm,
    setSelectedNode, setHighlight, clearSelection, setPanToNode,
  } = useStore();

  const [showTermPicker, setShowTermPicker] = useState(false);

  if (!selectedNode) return null;
  const course = COURSE_DATA[selectedNode];

  // ── Stub panel for courses not yet in COURSE_DATA ─────────────────────────
  if (!course) {
    const { inferredLeadsTo, inferredAntireqs } = inferRelationships(selectedNode);
    return (
      <div
        className="slide-in"
        style={{
          position: "absolute", top: 16, right: 16, width: 260,
          background: "rgba(15,23,42,0.95)", border: "1px solid rgba(249,115,22,0.3)",
          borderRadius: 12, padding: 16, backdropFilter: "blur(12px)", zIndex: 10,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#FB923C" }}>
            {selectedNode}
          </div>
          <button onClick={clearSelection} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ fontSize: 10, color: "#FB923C", background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 6, padding: "6px 8px", marginBottom: 12 }}>
          This course hasn't been fully added yet. Details like prerequisites and description may be incomplete.
        </div>
        {inferredLeadsTo.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>
              Inferred — Unlocks
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {inferredLeadsTo.map((c) => (
                <button key={c} onClick={() => { const cn = getConnectedNodes(c); setSelectedNode(c); setHighlight(cn, getHighlightedEdges(cn)); setPanToNode(c); }}
                  style={{ padding: "2px 8px", borderRadius: 4, border: "1px solid #334155", background: "transparent", color: "#64748B", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
        {inferredAntireqs.length > 0 && (
          <div>
            <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>
              Inferred — Anti-requisites
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {inferredAntireqs.map((c) => (
                <span key={c} style={{ padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(249,115,22,0.3)", color: "#FB923C", fontSize: 10 }}>{c}</span>
              ))}
            </div>
          </div>
        )}
        {inferredLeadsTo.length === 0 && inferredAntireqs.length === 0 && (
          <div style={{ fontSize: 10, color: "#334155" }}>No relationships could be inferred from existing course data.</div>
        )}
      </div>
    );
  }

  // Compute program restriction info for this course
  const programRestriction = (() => {
    const majorsList = course.majors ?? [];
    const exclList   = course.exclMajors ?? [];
    if (exclList.includes(activeMajorId)) {
      const name = MAJORS[activeMajorId as keyof typeof MAJORS]?.name ?? activeMajorId;
      return { type: "excluded" as const, message: `Not available to ${name} students` };
    }
    const specificMajors = majorsList.filter((id): id is string => id !== "any");
    if (specificMajors.length > 0 && !specificMajors.includes(activeMajorId)) {
      const names = specificMajors
        .map((id) => MAJORS[id as keyof typeof MAJORS]?.name ?? id)
        .slice(0, 4);
      const suffix = specificMajors.length > 4 ? ` +${specificMajors.length - 4} more` : "";
      return { type: "restricted" as const, message: `Only for: ${names.join(", ")}${suffix}` };
    }
    return null;
  })();

  const navigateTo = (code: string) => {
    setShowTermPicker(false);
    const connected = getConnectedNodes(code);
    setSelectedNode(code);
    setHighlight(connected, getHighlightedEdges(connected));
    setPanToNode(code);
  };

  // Determine term plan status for this course
  const courseInTerm = (Object.entries(termPlan) as [string, string[]][])
    .find(([, codes]) => codes.includes(course.code))?.[0] ?? null;
  const isTermPlanned = courseInTerm !== null;

  return (
    <div
      className="slide-in"
      style={{
        position:       "absolute",
        top:            16,
        right:          16,
        width:          260,
        background:     "rgba(15,23,42,0.95)",
        border:         "1px solid rgba(255,213,79,0.3)",
        borderRadius:   12,
        padding:        16,
        backdropFilter: "blur(12px)",
        zIndex:         10,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#FFD54F" }}>
            {course.code}
          </div>
          <div style={{ fontSize: 10, color: "#64748B", marginTop: 2 }}>{course.title}</div>
        </div>
        <button
          onClick={clearSelection}
          style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 18, lineHeight: 1 }}
        >
          ×
        </button>
      </div>

      {/* Program restriction info */}
      {programRestriction && (
        <div style={{
          marginBottom:  10,
          padding:       "6px 8px",
          background:    programRestriction.type === "excluded"
            ? "rgba(239,68,68,0.08)" : "rgba(96,165,250,0.08)",
          border:        programRestriction.type === "excluded"
            ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(96,165,250,0.2)",
          borderRadius:  6,
          fontSize:      10,
          color:         programRestriction.type === "excluded" ? "#FCA5A5" : "#93C5FD",
        }}>
          {programRestriction.message}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <ActionButton
          active={completedCourses.has(course.code)}
          activeLabel="✓ Completed"
          inactiveLabel="Mark Done"
          activeColor="#4ADE80"
          onClick={() => toggleCompleted(course.code)}
        />
        {/* Plan It — opens term picker or removes from term plan */}
        <div style={{ flex: 1, position: "relative" }}>
          <button
            onClick={() => {
              if (isTermPlanned) {
                moveCourseToTerm(course.code, "");
              } else if (plannedCourses.has(course.code)) {
                togglePlanned(course.code);
              } else {
                setShowTermPicker((v) => !v);
              }
            }}
            style={{
              width:        "100%",
              padding:      "6px",
              borderRadius: 6,
              border:       `1px solid ${isTermPlanned || plannedCourses.has(course.code) ? "#60A5FA" : "#334155"}`,
              background:   isTermPlanned || plannedCourses.has(course.code) ? "#60A5FA1A" : "transparent",
              color:        isTermPlanned || plannedCourses.has(course.code) ? "#60A5FA" : "#64748B",
              fontSize:     10,
              cursor:       "pointer",
              fontFamily:   "inherit",
              transition:   "all 0.15s",
            }}
          >
            {isTermPlanned ? `★ Term ${courseInTerm}` : plannedCourses.has(course.code) ? "★ Planned" : "Plan It"}
          </button>
          {showTermPicker && !isTermPlanned && !plannedCourses.has(course.code) && (
            <TermPicker
              onSelect={(term) => { moveCourseToTerm(course.code, term); setShowTermPicker(false); }}
              onClose={() => setShowTermPicker(false)}
            />
          )}
        </div>
      </div>

      {/* Prerequisites */}
      {course.prereqs.length > 0 && (
        <Section title="Prerequisites">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {course.prereqs.map((req, i) => (
              <RequisiteDisplay 
                key={i} 
                item={req} 
                completedCourses={completedCourses} 
                navigateTo={navigateTo} 
              />
            ))}
          </div>
        </Section>
      )}

      {/* Unlocks */}
      {course.leadsTo.length > 0 && (
        <Section title="Unlocks">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {course.leadsTo.map((c) => (
              <span
                key={c}
                onClick={() => navigateTo(c)}
                style={{ fontSize: 10, color: "#60A5FA", border: "1px solid #60A5FA30",
                         borderRadius: 4, padding: "2px 6px", cursor: "pointer" }}
              >
                {c}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Antirequisites */}
      {course.antireqs.length > 0 && (
        <div style={{ marginTop: 8, padding: "6px 8px", background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6 }}>
          <div style={{ fontSize: 9, color: "#F87171", marginBottom: 2 }}>Antirequisites</div>
          <div style={{ fontSize: 10, color: "#FCA5A5" }}>{course.antireqs.join(", ")}</div>
        </div>
      )}

      {/* UW Flow Link */}
      <a
        href={`https://uwflow.com/course/${course.code.toLowerCase().replace(/\s+/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ 
          marginTop: 12, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          gap: 8,
          padding: "8px", 
          background: "rgba(255, 213, 79, 0.05)", 
          border: "1px solid rgba(255, 213, 79, 0.2)", 
          borderRadius: 8,
          textDecoration: "none",
          transition: "all 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 213, 79, 0.1)";
          e.currentTarget.style.borderColor = "rgba(255, 213, 79, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 213, 79, 0.05)";
          e.currentTarget.style.borderColor = "rgba(255, 213, 79, 0.2)";
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: "#FFD54F", letterSpacing: "0.02em" }}>
          View on UW Flow
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase",
                    letterSpacing: "0.08em", marginBottom: 4 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function ActionButton({
  active, activeLabel, inactiveLabel, activeColor, onClick,
}: {
  active: boolean; activeLabel: string; inactiveLabel: string;
  activeColor: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex:         1,
        padding:      "6px",
        borderRadius: 6,
        border:       `1px solid ${active ? activeColor : "#334155"}`,
        background:   active ? `${activeColor}1A` : "transparent",
        color:        active ? activeColor : "#64748B",
        fontSize:     10,
        cursor:       "pointer",
        fontFamily:   "inherit",
        transition:   "all 0.15s",
      }}
    >
      {active ? activeLabel : inactiveLabel}
    </button>
  );
}


// ── Term picker ───────────────────────────────────────────────────────────────

function TermPicker({ onSelect, onClose }: { onSelect: (t: string) => void; onClose: () => void }) {
  return (
    <>
      {/* Invisible backdrop to close on outside click */}
      <div
        style={{ position: "fixed", inset: 0, zIndex: 40 }}
        onClick={onClose}
      />
      <div
        style={{
          position:       "absolute",
          top:            "calc(100% + 4px)",
          left:           0,
          right:          0,
          background:     "rgba(10,15,30,0.98)",
          border:         "1px solid #334155",
          borderRadius:   8,
          padding:        10,
          zIndex:         50,
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase",
                      letterSpacing: "0.08em", marginBottom: 6 }}>
          Select term
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          {TERM_KEYS.map((t) => (
            <button
              key={t}
              onClick={() => onSelect(t)}
              style={{
                padding:      "5px",
                borderRadius: 5,
                border:       "1px solid #334155",
                background:   "transparent",
                color:        "#94A3B8",
                fontSize:     10,
                cursor:       "pointer",
                fontFamily:   "inherit",
                transition:   "all 0.12s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#60A5FA";
                e.currentTarget.style.color = "#60A5FA";
                e.currentTarget.style.background = "#60A5FA12";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#334155";
                e.currentTarget.style.color = "#94A3B8";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// 1. Create a sub-component to handle the recursive rendering
const RequisiteDisplay = ({ 
  item, 
  depth = 0,
  completedCourses, 
  navigateTo 
}: { 
  item: string | Requisite, 
  depth?: number,
  completedCourses: Set<string>, 
  navigateTo: (c: string) => void 
}) => {
  // Base Case: A course code string
  if (typeof item === "string") {
    const isDone = completedCourses.has(item);
    return (
      <span
        onClick={() => navigateTo(item)}
        style={{
          color: isDone ? "#4ADE80" : "#94A3B8",
          marginRight: 6,
          cursor: "pointer",
          textDecoration: isDone ? "none" : "underline",
          textDecorationColor: "#334155",
          fontSize: 10,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {item}
      </span>
    );
  }

  // Recursive Case: A nested logical group (AND/OR)
  return (
    <div style={{ 
      // Force nested blocks to start on a new line
      display: "block",
      marginTop: 4,
      marginBottom: 2,
      paddingLeft: 10,
      borderLeft: "1px solid #334155",
    }}>
      <div style={{ 
        fontSize: 9, 
        fontWeight: 700, 
        color: item.type === "OR" ? "#FFD54F" : "#60A5FA", 
        marginBottom: 2,
        opacity: 0.8 
      }}>
        {item.type}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        {item.reqs.map((sub, i) => (
          <RequisiteDisplay 
            key={i} 
            item={sub} 
            depth={depth + 1}
            completedCourses={completedCourses} 
            navigateTo={navigateTo} 
          />
        ))}
      </div>
    </div>
  );
};
