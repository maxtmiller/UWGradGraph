"use client";

import { useState, useMemo } from "react";
import { COURSE_DATA } from "../data/courses";
import { useStore, courseSubject, subjectsFromCodes } from "../lib/store";
import { areRequisitesSatisfied } from "../lib/requisites";
import type { TermKey } from "../types";

const TERMS: TermKey[] = ["1A","1B","2A","2B","3A","3B","4A","4B"];

// ── Planner-local status ──────────────────────────────────────────────────────
// The term planner uses its own 3-state visual (not the global 4-state status)
// so that planned courses never show blue here — only on the graph.
//
//   completed  → green  (user has marked done)
//   available  → #64748B medium gray (prereqs satisfied, can be taken next)
//   locked     → #2D3748 dark gray  (prereqs not yet done)

type PlannerStatus = "completed" | "available" | "locked";

function getPlannerStatus(code: string, completed: Set<string>): PlannerStatus {
  if (completed.has(code)) return "completed";
  const course = COURSE_DATA[code];
  if (!course || course.prereqs.length === 0) return "available";
  const prereqsMet = areRequisitesSatisfied(course.prereqs, completed);
  return prereqsMet ? "available" : "locked";
}

const PLANNER_COLORS: Record<PlannerStatus, string> = {
  completed: "#4ADE80",
  available: "#64748B",
  locked:    "#2D3748",
};

// ─────────────────────────────────────────────────────────────────────────────
// TermPlanner
// ─────────────────────────────────────────────────────────────────────────────

export default function TermPlanner() {
  const {
    termPlan,
    completedCourses,
    termPlanEditedByUser,
    getMajorCourses,
    moveCourseToTerm,
    toggleCompleted,
    resetTermPlan,
  } = useStore();

  // Subject filter for the unplanned pool (local state — no need to persist)
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const plannedCodes = useMemo(
    () => new Set(Object.values(termPlan).flat()),
    [termPlan]
  );

  // Scope everything to the active major/sub-major
  const majorCodes    = getMajorCourses();
  const majorCodesSet = useMemo(() => new Set(majorCodes), [majorCodes]);

  // Unplanned = major courses not yet placed in any term bucket
  const unplanned = useMemo(
    () => majorCodes.filter((c) => !plannedCodes.has(c)),
    [majorCodes, plannedCodes]
  );

  const unplannedSubjects = useMemo(
    () => subjectsFromCodes(unplanned),
    [unplanned]
  );

  const visibleUnplanned = useMemo(() => {
    let filtered = unplanned;
    if (activeSubjectFilter.size > 0)
      filtered = filtered.filter((c) => activeSubjectFilter.has(courseSubject(c)));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) => c.toLowerCase().includes(q) || (COURSE_DATA[c]?.title.toLowerCase().includes(q) ?? false)
      );
    }
    return filtered;
  }, [unplanned, activeSubjectFilter, searchQuery]);

  const handleDrop = (e: React.DragEvent, term: string) => {
    e.preventDefault();
    const code = e.dataTransfer.getData("course");
    if (code) moveCourseToTerm(code, term);
  };

  const toggleSubjectFilter = (subject: string) => {
    setActiveSubjectFilter((prev) => {
      const next = new Set(prev);
      if (next.has(subject)) next.delete(subject);
      else next.add(subject);
      return next;
    });
  };

  return (
    <div style={{ padding: 24, overflow: "auto", height: "100%", boxSizing: "border-box" }}>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start" }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800,
                       color: "#FFD54F", margin: 0 }}>
            Term Planner
          </h2>
          <p style={{ fontSize: 11, color: "#64748B", margin: "4px 0 0" }}>
            Drag courses into terms · click ✓ to mark done
          </p>
        </div>

        {/* Load default / Clear buttons */}
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={resetTermPlan}
            title="Load the recommended default schedule for the current major"
            style={{
              padding:      "5px 12px",
              borderRadius: 6,
              border:       "1px solid rgba(255,213,79,0.3)",
              background:   "rgba(255,213,79,0.06)",
              color:        "#FFD54F",
              fontSize:     10,
              fontFamily:   "inherit",
              cursor:       "pointer",
              transition:   "all 0.15s",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#FFD54F80";
              e.currentTarget.style.background = "rgba(255,213,79,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,213,79,0.3)";
              e.currentTarget.style.background = "rgba(255,213,79,0.06)";
            }}
          >
            ✦ Load Sample Plan
          </button>
          {termPlanEditedByUser && (
            <button
              onClick={() => {
                const empty = { "1A": [], "1B": [], "2A": [], "2B": [], "3A": [], "3B": [], "4A": [], "4B": [] };
                useStore.setState({ termPlan: empty as import("../types").TermPlan, termPlanEditedByUser: false });
              }}
              title="Clear all courses from the term planner"
              style={{
                padding:      "5px 12px",
                borderRadius: 6,
                border:       "1px solid #334155",
                background:   "transparent",
                color:        "#64748B",
                fontSize:     10,
                fontFamily:   "inherit",
                cursor:       "pointer",
                transition:   "all 0.15s",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#475569";
                e.currentTarget.style.color = "#94A3B8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#334155";
                e.currentTarget.style.color = "#64748B";
              }}
            >
              ↺ Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Term grid ─────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {TERMS.map((term) => {
          const courses    = (termPlan[term] ?? []).filter((c) => majorCodesSet.has(c));
          const totalUnits = courses.reduce((s, c) => s + (COURSE_DATA[c]?.units ?? 0), 0);
          return (
            <TermBucket
              key={term}
              term={term}
              courses={courses}
              totalUnits={totalUnits}
              completedCourses={completedCourses}
              onDrop={handleDrop}
              onToggleDone={toggleCompleted}
            />
          );
        })}
      </div>

      {/* ── Unplanned pool ────────────────────────────────────────────────── */}
      {unplanned.length > 0 && (
        <div style={{ marginTop: 24 }}>
          {/* Section header + subject filter chips + search */}
          <div style={{ display: "flex", alignItems: "center", gap: 8,
                        marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, color: "#64748B", textTransform: "uppercase",
                           letterSpacing: "0.1em", flexShrink: 0 }}>
              Unplanned
            </span>

            {/* "All" chip */}
            <FilterChip
              label="All"
              active={activeSubjectFilter.size === 0}
              onClick={() => setActiveSubjectFilter(new Set())}
              color="#64748B"
            />

            {unplannedSubjects.map((subject) => (
              <FilterChip
                key={subject}
                label={subject}
                active={activeSubjectFilter.has(subject)}
                onClick={() => toggleSubjectFilter(subject)}
                color="#94A3B8"
              />
            ))}

            {/* Search input — pushed to the far right */}
            <div style={{ marginLeft: "auto", position: "relative", flexShrink: 0 }}>
              <span style={{
                position: "absolute", left: 7, top: "50%", transform: "translateY(-50%)",
                fontSize: 10, color: "#475569", pointerEvents: "none",
              }}>⌕</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…"
                style={{
                  paddingLeft:    22,
                  paddingRight:   searchQuery ? 22 : 8,
                  paddingTop:     3,
                  paddingBottom:  3,
                  background:     "var(--gg-overlay)",
                  border:         "1px solid var(--gg-border)",
                  borderRadius:   5,
                  color:          "#E2E8F0",
                  fontSize:       10,
                  fontFamily:     "'DM Mono', monospace",
                  outline:        "none",
                  width:          140,
                  transition:     "border-color 0.15s",
                }}
                onFocus={(e)  => { e.currentTarget.style.borderColor = "#475569"; }}
                onBlur={(e)   => { e.currentTarget.style.borderColor = "#2D3748"; }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position:   "absolute", right: 5, top: "50%",
                    transform:  "translateY(-50%)",
                    background: "none", border: "none",
                    color:      "#475569", cursor: "pointer",
                    fontSize:   11, lineHeight: 1, padding: 0,
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Pills */}
          <div
            style={{ minHeight: 48, background: "var(--gg-overlay)", borderRadius: 8,
                     border: "1px dashed var(--gg-border)", padding: "8px", display: "flex",
                     flexWrap: "wrap", gap: 5 }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const code = e.dataTransfer.getData("course");
              // Dropping here removes the course from all terms (back to unplanned)
              if (code) {
                const { termPlan: tp } = useStore.getState();
                const inTerm = Object.entries(tp).find(([, cs]) => (cs as string[]).includes(code));
                if (inTerm) {
                  // Remove from its term by moving to a non-existent key — cleaner: dispatch directly
                  useStore.setState((state) => {
                    const next = {} as typeof state.termPlan;
                    for (const [t, cs] of Object.entries(state.termPlan) as [TermKey, string[]][]) {
                      next[t] = cs.filter((c) => c !== code);
                    }
                    return { termPlan: next, termPlanEditedByUser: true };
                  });
                }
              }
            }}
          >
            {visibleUnplanned.length === 0 && (
              <span style={{ fontSize: 10, color: "#334155", fontStyle: "italic",
                             padding: "4px 6px" }}>
                {activeSubjectFilter.size > 0 ? "No courses match filter" : "All courses planned"}
              </span>
            )}
            {visibleUnplanned.map((code) => {
              const status = getPlannerStatus(code, completedCourses);
              return (
                <UnplannedPill
                  key={code}
                  code={code}
                  status={status}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TermBucket
// ─────────────────────────────────────────────────────────────────────────────

function TermBucket({
  term, courses, totalUnits, completedCourses, onDrop, onToggleDone,
}: {
  term:             string;
  courses:          string[];
  totalUnits:       number;
  completedCourses: Set<string>;
  onDrop:           (e: React.DragEvent, term: string) => void;
  onToggleDone:     (code: string) => void;
}) {
  const allDone  = courses.length > 0 && courses.every((c) => completedCourses.has(c));
  return (
    <div
      style={{
        background:   "var(--gg-surface-a)",
        border:       `1px solid ${allDone ? "#4ADE8030" : "var(--gg-border)"}`,
        borderRadius: 10,
        padding:      12,
        minHeight:    160,
        transition:   "border-color 0.3s, background 0.2s",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, term)}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid var(--gg-border)" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
                       color: allDone ? "#4ADE80" : "#FFD54F" }}>
          {term}
          {allDone && <span style={{ marginLeft: 4, fontSize: 10 }}>✓</span>}
        </span>
        <span style={{ fontFamily: "'DM Mono'", fontSize: 9, color: "#475569" }}>
          {totalUnits.toFixed(1)} units
        </span>
      </div>

      {/* Course pills */}
      {courses.map((code) => {
        const status = getPlannerStatus(code, completedCourses);
        return (
          <TermPill
            key={code}
            code={code}
            status={status}
            onToggleDone={() => onToggleDone(code)}
          />
        );
      })}

      {courses.length === 0 && (
        <div style={{ fontSize: 10, color: "#334155", textAlign: "center",
                      marginTop: 28, fontStyle: "italic" }}>
          Drop courses here
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TermPill — course inside a term bucket, with ✓ toggle
// ─────────────────────────────────────────────────────────────────────────────

function TermPill({
  code, status, onToggleDone,
}: {
  code:         string;
  status:       PlannerStatus;
  onToggleDone: () => void;
}) {
  const color = PLANNER_COLORS[status];
  const isDone = status === "completed";

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("course", code)}
      style={{
        padding:      "5px 6px 5px 8px",
        marginBottom: 4,
        borderRadius: 6,
        border:       `1px solid ${color}35`,
        background:   isDone ? `${color}10` : "rgba(255,255,255,0.02)",
        cursor:       "grab",
        display:      "flex",
        alignItems:   "center",
        gap:          6,
        transition:   "all 0.15s",
      }}
    >
      {/* Course info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color }}>
          {code}
        </span>
        {status === "locked" && (
          <span style={{ fontSize: 8, color: "#475569", marginLeft: 5 }}>prereqs needed</span>
        )}
      </div>

      {/* Mark-done button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleDone(); }}
        title={isDone ? "Mark as not done" : "Mark as done"}
        style={{
          width:          18,
          height:         18,
          borderRadius:   4,
          border:         `1px solid ${isDone ? "#4ADE8060" : "#334155"}`,
          background:     isDone ? "#4ADE8015" : "transparent",
          color:          isDone ? "#4ADE80"   : "#334155",
          fontSize:       10,
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
          transition:     "all 0.15s",
          fontFamily:     "inherit",
          padding:        0,
          lineHeight:     1,
        }}
        onMouseEnter={(e) => {
          if (!isDone) {
            e.currentTarget.style.borderColor = "#4ADE8060";
            e.currentTarget.style.color = "#4ADE8080";
          }
        }}
        onMouseLeave={(e) => {
          if (!isDone) {
            e.currentTarget.style.borderColor = "#334155";
            e.currentTarget.style.color = "#334155";
          }
        }}
      >
        ✓
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// UnplannedPill — draggable pill in the unplanned pool
// ─────────────────────────────────────────────────────────────────────────────

function UnplannedPill({ code, status }: { code: string; status: PlannerStatus }) {
  const color   = PLANNER_COLORS[status];

  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("course", code)}
      title={`${code} — ${COURSE_DATA[code]?.title ?? ""}${status === "locked" ? " (prereqs not met)" : ""}`}
      style={{
        padding:      "4px 9px",
        borderRadius: 5,
        border:       `1px solid ${color}30`,
        background:   status === "locked" ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.03)",
        cursor:       "grab",
        fontSize:     10,
        color,
        display:      "flex",
        alignItems:   "center",
        gap:          5,
        opacity:      status === "locked" ? 0.6 : 1,
        transition:   "opacity 0.15s",
      }}
    >
      <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{code}</span>
      {status === "locked" && (
        <span style={{ fontSize: 8, color: "#475569" }}>🔒</span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FilterChip — subject filter toggle in the unplanned section
// ─────────────────────────────────────────────────────────────────────────────

function FilterChip({
  label, active, onClick, color,
}: {
  label:   string;
  active:  boolean;
  onClick: () => void;
  color:   string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding:        "2px 8px",
        borderRadius:   4,
        border:         `1px solid ${active ? color : "#2D3748"}`,
        background:     active ? `${color}15` : "transparent",
        color:          active ? color : "#475569",
        fontSize:       9,
        fontFamily:     "inherit",
        fontWeight:     active ? 600 : 400,
        cursor:         "pointer",
        letterSpacing:  "0.05em",
        textTransform:  "uppercase",
        transition:     "all 0.15s",
        flexShrink:     0,
      }}
    >
      {label}
    </button>
  );
}
