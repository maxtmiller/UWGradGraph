"use client";

import { useMemo, useState } from "react";
import { useStore } from "../lib/store";
import { MAJORS, MAJOR_META, MAJOR_TO_FACULTY, SUB_MAJOR_REGISTRY } from "../data/majors";
import { FACULTIES } from "../data/faculties";
import { runAudit, groupTarget } from "../lib/audit";
import { getConnectedNodes, getHighlightedEdges } from "../lib/graph";
import RequirementHelpIcon from "./RequirementTooltip";
import type { AuditGroupResult, Major } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// Curriculum resolver
// ─────────────────────────────────────────────────────────────────────────────

function resolveActiveCurriculum(
  activeMajorId:    string,
  activeSubMajorId: string | null,
) {
  // 1. Check if this major even has sub-majors (math, ds, etc.)
  const subMajorMap = SUB_MAJOR_REGISTRY[activeMajorId];

  if (subMajorMap) {
    // 2. Try to get the specific sub-major selected
    const sub = activeSubMajorId ? subMajorMap[activeSubMajorId] : null;

    // 3. Fallback logic: 
    // If no sub is selected (or ID is invalid), return a sensible default.
    // For Math, you chose "stat". For others, we can take the first entry.
    const defaultSub = activeMajorId === "math" 
      ? subMajorMap["stat"] 
      : Object.values(subMajorMap)[0];

    return sub ?? defaultSub;
  }

  // 4. If it's a "Flat" major (like CS or SE), just return the main object
  return MAJORS[activeMajorId as keyof typeof MAJORS] ?? null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Degree progress helper
// ─────────────────────────────────────────────────────────────────────────────

function getDegreeProgress(major: Major, completed: Set<string>, planned: Set<string>) {
  const results  = runAudit(major.requirementGroups, completed, planned);
  const done     = results.reduce((s, r) => s + r.completedDoneCount, 0);
  const plannedN = results.reduce((s, r) => s + r.plannedDoneCount,   0);
  const total    = major.requirementGroups.reduce((s, g) => s + groupTarget(g), 0);
  const pct      = total > 0 ? Math.round(((done + plannedN) / total) * 100) : 0;
  return { done, planned: plannedN, total, pct };
}


// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ProgressAudit() {
  const {
    activeMajorId,
    activeSubMajorId,
    completedCourses,
    plannedCourses,
    termPlan,
    setActiveTab,
    setSelectedNode,
    setHighlight,
  } = useStore();

  const curriculum = resolveActiveCurriculum(activeMajorId, activeSubMajorId ?? null);

  const allPlanned = useMemo(
    () => new Set([...plannedCourses, ...Object.values(termPlan).flat()]),
    [plannedCourses, termPlan],
  );

  const auditResults = useMemo(
    () => (curriculum ? runAudit(curriculum.requirementGroups, completedCourses, allPlanned) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeMajorId, activeSubMajorId, completedCourses, allPlanned],
  );

  // Overall degree progress
  const overallProgress = useMemo(() => {
    if (!curriculum) return { done: 0, planned: 0, total: 0, pct: 0 };
    return getDegreeProgress(curriculum as Major, completedCourses, allPlanned);
  }, [curriculum, completedCourses, allPlanned]);

  if (!curriculum) {
    return <div style={{ padding: 24, color: "#64748B" }}>Select a major to begin audit.</div>;
  }

  const goToGraph = (code: string) => {
    setActiveTab("graph");
    const connected = getConnectedNodes(code);
    setSelectedNode(code);
    setHighlight(connected, getHighlightedEdges(connected));
  };

  return (
    <div style={{ padding: 24, overflow: "auto", height: "100%", boxSizing: "border-box" }}>
      {/* ── Degree Progress Overview ─────────────────────────────────────── */}
      <DegreeProgressOverview
        name={curriculum.name}
        color={curriculum.color}
        done={overallProgress.done}
        planned={overallProgress.planned}
        total={overallProgress.total}
        pct={overallProgress.pct}
      />

      {/* Degree Explorer — scoped to sub-majors of the active major */}
      <DegreeExplorer activeMajorId={activeMajorId} completedCourses={completedCourses} allPlanned={allPlanned} />

      {auditResults.map((result) => (
        <RequirementGroupCard
          key={result.group.title}
          result={result}
          completedCourses={completedCourses}
          onCourseClick={goToGraph}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DegreeProgressOverview
// ─────────────────────────────────────────────────────────────────────────────

function DegreeProgressOverview({
  name, color, done, planned, total, pct,
}: { name: string; color: string; done: number; planned: number; total: number; pct: number }) {
  const remaining = Math.max(0, total - done - planned);
  const r = 38;
  const circumference = 2 * Math.PI * r;
  const completedPct = total > 0 ? done / total : 0;
  const plannedPct   = total > 0 ? Math.min(1 - completedPct, planned / total) : 0;
  const completedDash = circumference * completedPct;
  const plannedDash   = circumference * plannedPct;

  const statusLabel =
    pct >= 100 ? "Complete" :
    pct >= 75  ? "Almost there" :
    pct >= 50  ? "Halfway" :
    pct >= 25  ? "In progress" :
    "Just started";

  return (
    <div style={{
      marginBottom:  24,
      background:    "rgba(15,23,42,0.8)",
      border:        `1px solid ${color}30`,
      borderRadius:  14,
      padding:       "20px 24px",
      display:       "flex",
      alignItems:    "center",
      gap:           24,
    }}>
      {/* Ring chart */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <svg width={96} height={96} style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle cx={48} cy={48} r={r} fill="none" stroke="#1E293B" strokeWidth={8} />
          {/* Planned arc */}
          {plannedPct > 0 && (
            <circle
              cx={48} cy={48} r={r} fill="none"
              stroke={`${color}55`} strokeWidth={8}
              strokeDasharray={`${plannedDash} ${circumference - plannedDash}`}
              strokeDashoffset={-completedDash}
              strokeLinecap="round"
            />
          )}
          {/* Completed arc */}
          {completedPct > 0 && (
            <circle
              cx={48} cy={48} r={r} fill="none"
              stroke={color} strokeWidth={8}
              strokeDasharray={`${completedDash} ${circumference - completedDash}`}
              strokeDashoffset={0}
              strokeLinecap="round"
            />
          )}
        </svg>
        <div style={{
          position:   "absolute", inset: 0,
          display:    "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color, lineHeight: 1 }}>
            {pct}%
          </span>
          <span style={{ fontSize: 8, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color, margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {name}
        </h2>
        <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
          <StatChip value={done} label="Completed" color={color} />
          <StatChip value={planned} label="Planned" color="#60A5FA" />
          <StatChip value={remaining} label="Remaining" color="#334155" />
        </div>
        <div style={{ marginTop: 10, height: 4, background: "#1E293B", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", display: "flex" }}>
            <div style={{ width: `${completedPct * 100}%`, background: color, transition: "width 0.5s ease" }} />
            <div style={{ width: `${plannedPct * 100}%`, background: `${color}55`, transition: "width 0.5s ease" }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 9, color: "#334155" }}>{done + planned} of {total} courses</span>
          {planned > 0 && <span style={{ fontSize: 9, color: "#60A5FA60" }}>{planned} planned</span>}
        </div>
      </div>
    </div>
  );
}

function StatChip({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <span style={{ fontSize: 20, fontFamily: "'Syne', sans-serif", fontWeight: 800, color, lineHeight: 1 }}>
        {value}
      </span>
      <span style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DegreeExplorer
// ─────────────────────────────────────────────────────────────────────────────

function Sparkline({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ width: 40, height: 3, background: "var(--gg-border)", borderRadius: 2, overflow: "hidden", flexShrink: 0 }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.4s ease" }} />
    </div>
  );
}

function DegreeMiniBar({ label, done, plannedDone, total, color }: {
  label: string; done: number; plannedDone: number; total: number; color: string;
}) {
  const completedPct = total > 0 ? Math.min(100, (done / total) * 100) : 0;
  const plannedPct   = total > 0 ? Math.min(100 - completedPct, (plannedDone / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <span style={{ fontSize: 10, color: "#94A3B8", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: 220 }}>
          {label}
        </span>
        <span style={{ fontSize: 10, flexShrink: 0, marginLeft: 8 }}>
          <span style={{ color }}>{done}</span>
          {plannedDone > 0 && <span style={{ color: "#60A5FA" }}>+{plannedDone}</span>}
          <span style={{ color: "#475569" }}>/{total}</span>
        </span>
      </div>
      <div style={{ height: 3, background: "var(--gg-border)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", display: "flex" }}>
          <div style={{ width: `${completedPct}%`, background: color, transition: "width 0.4s ease" }} />
          <div style={{ width: `${plannedPct}%`, background: `${color}55`, transition: "width 0.4s ease" }} />
        </div>
      </div>
    </div>
  );
}

function DegreeExplorer({
  activeMajorId,
  completedCourses,
  allPlanned,
}: {
  activeMajorId:    string;
  completedCourses: Set<string>;
  allPlanned:       Set<string>;
}) {
  const [showAll,     setShowAll]     = useState(false);
  const [expandedSib, setExpandedSib] = useState<string | null>(null);

  const subMajorMap = SUB_MAJOR_REGISTRY[activeMajorId];
  const color       = MAJOR_META[activeMajorId]?.color ?? "#FFD54F";

  // Sibling majors — same faculty, excluding the active major
  const facultyId   = MAJOR_TO_FACULTY[activeMajorId];
  const siblingIds  = (FACULTIES[facultyId]?.majorIds ?? []).filter((id) => id !== activeMajorId);

  // Ranked sub-majors for the active major (always computed, guard render below)
  const ranked = useMemo(() => {
    if (!subMajorMap) return [];
    return (Object.values(subMajorMap) as Major[])
      .map((m) => ({ major: m, ...getDegreeProgress(m, completedCourses, allPlanned) }))
      .sort((a, b) => b.pct - a.pct);
  }, [subMajorMap, completedCourses, allPlanned]);

  // Best % per sibling major (for sparkline on chip)
  const siblingPct = useMemo(() => {
    const out: Record<string, number> = {};
    for (const id of siblingIds) {
      const sm = SUB_MAJOR_REGISTRY[id];
      if (sm) {
        out[id] = Math.max(0, ...(Object.values(sm) as Major[]).map(
          (m) => getDegreeProgress(m, completedCourses, allPlanned).pct,
        ));
      } else {
        const m = MAJORS[id as keyof typeof MAJORS];
        out[id] = m ? getDegreeProgress(m, completedCourses, allPlanned).pct : 0;
      }
    }
    return out;
  }, [siblingIds, completedCourses, allPlanned]);

  const hasSubs     = !!subMajorMap;
  const hasSiblings = siblingIds.length > 0;

  // Nothing to show at all
  if (!hasSubs && !hasSiblings) return null;

  const top  = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  return (
    <div style={{ marginBottom: 28, background: "rgba(15,23,42,0.7)", border: "1px solid #1E293B", borderRadius: 12, padding: 16 }}>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "#94A3B8", margin: "0 0 4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Degree Explorer
      </h2>
      <p style={{ fontSize: 9, color: "#475569", margin: "0 0 12px", letterSpacing: "0.05em" }}>
        How your courses fit each specialization
      </p>

      {/* ── Current major sub-majors ─────────────────────────────────────── */}
      {hasSubs && (
        <>
          {top.map(({ major, done, planned, total, pct }) => (
            <div key={major.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <DegreeMiniBar label={major.name} done={done} plannedDone={planned} total={total} color={color} />
              <span style={{ fontSize: 10, color, fontWeight: 600, flexShrink: 0, width: 32, textAlign: "right" }}>{pct}%</span>
            </div>
          ))}
          {rest.length > 0 && (
            <>
              <button
                onClick={() => setShowAll((v) => !v)}
                style={{ background: "none", border: "none", color: "#475569", fontSize: 10, cursor: "pointer", padding: "2px 0", fontFamily: "inherit", marginTop: 2 }}
              >
                {showAll ? "▲ Show less" : `▼ View ${rest.length} more specializations`}
              </button>
              {showAll && rest.map(({ major, done, planned, total, pct }) => (
                <div key={major.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, marginTop: 6 }}>
                  <DegreeMiniBar label={major.name} done={done} plannedDone={planned} total={total} color={color} />
                  <span style={{ fontSize: 10, color, fontWeight: 600, flexShrink: 0, width: 32, textAlign: "right" }}>{pct}%</span>
                </div>
              ))}
            </>
          )}
        </>
      )}

      {/* ── Sibling majors in same faculty ───────────────────────────────── */}
      {hasSiblings && (
        <>
          <div style={{ height: 1, background: "#1E293B", margin: "12px 0" }} />
          <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
            Other programs in this faculty
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {siblingIds.map((id) => {
              const meta   = MAJOR_META[id];
              const pct    = siblingPct[id] ?? 0;
              const isOpen = expandedSib === id;
              if (!meta) return null;
              return (
                <button
                  key={id}
                  onClick={() => setExpandedSib(isOpen ? null : id)}
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          7,
                    padding:      "4px 10px",
                    borderRadius: 20,
                    border:       `1px solid ${isOpen ? meta.color : "#334155"}`,
                    background:   isOpen ? `${meta.color}15` : "transparent",
                    color:        isOpen ? meta.color : "#64748B",
                    cursor:       "pointer",
                    fontSize:     11,
                    fontFamily:   "'DM Mono', monospace",
                    transition:   "all 0.15s",
                  }}
                >
                  {meta.label}
                  <Sparkline pct={pct} color={isOpen ? meta.color : "#334155"} />
                  <span style={{ fontSize: 10, fontWeight: 600 }}>{pct}%</span>
                </button>
              );
            })}
          </div>

          {/* Expanded sibling breakdown */}
          {expandedSib && (
            <SiblingAccordion
              majorId={expandedSib}
              completedCourses={completedCourses}
              allPlanned={allPlanned}
            />
          )}
        </>
      )}
    </div>
  );
}

function SiblingAccordion({
  majorId,
  completedCourses,
  allPlanned,
}: {
  majorId:          string;
  completedCourses: Set<string>;
  allPlanned:       Set<string>;
}) {
  const meta      = MAJOR_META[majorId];
  const color     = meta?.color ?? "#FFD54F";
  const subMap    = SUB_MAJOR_REGISTRY[majorId];

  const entries = useMemo(() => {
    const source: Major[] = subMap
      ? (Object.values(subMap) as Major[])
      : (MAJORS[majorId as keyof typeof MAJORS] ? [MAJORS[majorId as keyof typeof MAJORS]] : []);
    return source
      .map((m) => ({ major: m, ...getDegreeProgress(m, completedCourses, allPlanned) }))
      .sort((a, b) => b.pct - a.pct);
  }, [majorId, subMap, completedCourses, allPlanned]);

  return (
    <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #1E293B" }}>
      {entries.map(({ major, done, planned, total, pct }) => (
        <div key={major.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <DegreeMiniBar label={major.name} done={done} plannedDone={planned} total={total} color={color} />
          <span style={{ fontSize: 10, color, fontWeight: 600, flexShrink: 0, width: 32, textAlign: "right" }}>{pct}%</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RequirementGroupCard
// ─────────────────────────────────────────────────────────────────────────────

function RequirementGroupCard({
  result,
  completedCourses,
  onCourseClick,
}: {
  result:           AuditGroupResult;
  completedCourses: Set<string>;
  onCourseClick:    (code: string) => void;
}) {
  const { group, doneCount, completedDoneCount, plannedDoneCount, target, displayCourses, claimedCourses, plannedClaimedCourses } = result;
  const { title, type, color } = group;

  const completedProgress = target > 0 ? Math.min(1, completedDoneCount / target) : 0;
  const plannedProgress   = target > 0 ? Math.min(1 - completedProgress, plannedDoneCount / target) : 0;
  const isFulfilled = doneCount >= target && target > 0;

  const typeLabel =
    type === "required"    ? "All required" :
    type === "list-one-of" ? `Choose ${target}` :
    type === "complex"     ? `${target} courses required` :
    /* elective */           `${target} required`;

  return (
    <div style={{
      marginBottom: 18,
      background:   "var(--gg-surface-a)",
      border:       `1px solid ${isFulfilled ? `${color}40` : "var(--gg-border)"}`,
      borderRadius: 12,
      padding:      16,
      transition:   "border-color 0.3s, background 0.2s",
    }}>
      {/* ── Card header ─────────────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", marginBottom: 10 }}>

        {/* Left: title + type label — clickable to highlight on graph */}
        <div
          // onClick={() => onGroupClick(result)}
          title="Click to highlight these courses on the graph"
          style={{ cursor: "pointer", flex: 1, minWidth: 0, marginRight: 8 }}
        >
          {/* Flex container for Heading + Icon */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize:   13,
              fontWeight: 700,
              color,
              margin:     "0", // Removed bottom margin to align better with icon
            }}>
              {title}
            </h3>
            
            <RequirementHelpIcon group={group} color={color} />
          </div>

          <span style={{ 
            fontSize: 9, 
            color: "#475569", 
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            display: "block", // Ensures it sits below the title/icon row
            marginTop: "2px" 
          }}>
            {typeLabel}
          </span>
        </div>

        {/* Right: completion counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <span style={{
            fontSize:   11,
            color:      isFulfilled ? color : "#64748B",
            display:    "flex",
            alignItems: "center",
            gap:        4,
          }}>
            {plannedDoneCount > 0
              ? <><span style={{ color: isFulfilled ? color : "#64748B" }}>{completedDoneCount}</span><span style={{ color: "#60A5FA" }}>+{plannedDoneCount}</span>/{target}</>
              : <>{doneCount}/{target}</>
            }
            {isFulfilled && <span style={{ color }}>✓</span>}
          </span>
        </div>
      </div>

      {/* ── Progress bar ────────────────────────────────────────────────── */}
      <div style={{ height: 5, background: "var(--gg-border)", borderRadius: 3,
                    marginBottom: 12, overflow: "hidden" }}>
        <div style={{ height: "100%", display: "flex" }}>
          <div style={{
            width:      `${completedProgress * 100}%`,
            background: color,
            transition: "width 0.5s ease",
          }} />
          <div style={{
            width:      `${plannedProgress * 100}%`,
            background: `${color}55`,
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* ── Course pills ────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {displayCourses.map((code) => (
          <CourseBadge
            key={code}
            code={code}
            isClaimed={claimedCourses.has(code)}
            isPlannedClaimed={plannedClaimedCourses.has(code)}
            isComplete={completedCourses.has(code)}
            color={color}
            onClick={() => onCourseClick(code)}
          />
        ))}

        {doneCount < target && (
          <div style={{
            fontSize:     10,
            color:        "#334155",
            padding:      "4px 10px",
            border:       "1px dashed #334155",
            borderRadius: 6,
            fontStyle:    "italic",
            display:      "flex",
            alignItems:   "center",
          }}>
            {target - doneCount} remaining
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CourseBadge
// ─────────────────────────────────────────────────────────────────────────────

function CourseBadge({
  code, isClaimed, isPlannedClaimed, isComplete, color, onClick,
}: {
  code:             string;
  isClaimed:        boolean;
  isPlannedClaimed: boolean;
  isComplete:       boolean;
  color:            string;
  onClick:          () => void;
}) {
  // isPlannedClaimed: planned and counts toward this group (not yet completed)
  const PLANNED_COLOR = "#60A5FA";

  const borderColor =
    isPlannedClaimed ? `${PLANNED_COLOR}60` :
    isClaimed        ? `${color}60` :
    isComplete       ? `${color}30` :
    "#33415560";

  const bgColor =
    isPlannedClaimed ? `${PLANNED_COLOR}12` :
    isClaimed        ? `${color}12` :
    isComplete       ? `${color}06` :
    "transparent";

  const textColor =
    isPlannedClaimed ? PLANNED_COLOR :
    isClaimed        ? color         :
    isComplete       ? `${color}80`  :
    "#475569";

  const hoverColor = isPlannedClaimed ? PLANNED_COLOR : color;

  const title =
    isPlannedClaimed ? "Planned — will count toward this requirement" :
    isClaimed        ? "Counts toward this requirement" :
    isComplete       ? "Completed — counts toward another requirement" :
                       "Not yet completed";

  return (
    <div
      onClick={onClick}
      title={title}
      style={{
        padding:      "4px 10px",
        borderRadius: 6,
        border:       `1px solid ${borderColor}`,
        borderStyle:  isPlannedClaimed ? "dashed" : "solid",
        background:   bgColor,
        cursor:       "pointer",
        fontSize:     11,
        color:        textColor,
        display:      "flex",
        alignItems:   "center",
        gap:          4,
        transition:   "all 0.15s",
        opacity:      isComplete && !isClaimed && !isPlannedClaimed ? 0.65 : 1,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = hoverColor; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = borderColor; }}
    >
      {isClaimed        && !isPlannedClaimed && <span>✓</span>}
      {isPlannedClaimed && <span style={{ fontSize: 9 }}>◷</span>}
      {isComplete && !isClaimed && !isPlannedClaimed && <span style={{ fontSize: 8 }}>↗</span>}
      {code}
    </div>
  );
}
