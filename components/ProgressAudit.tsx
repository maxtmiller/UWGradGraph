"use client";

import { useMemo, useState } from "react";
import { useStore } from "../lib/store";
import { MAJORS, ALL_DEGREES, SUB_MAJOR_REGISTRY } from "../data/majors";
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

// All majors + sub-majors as a flat list for "best fit" ranking
// const ALL_DEGREES: { major: Major; parentLabel: string }[] = [
//   { major: MAJORS["cs"], parentLabel: "CS" },
//   { major: MAJORS["se"], parentLabel: "SE" },
//   ...Object.values(DS_SUB_MAJORS).map((m) => ({ major: m, parentLabel: "DS" })),
//   ...Object.values(MATH_SUB_MAJORS).map((m) => ({ major: m, parentLabel: "Math" })),
// ];

const MAJOR_CHIPS = [
  { id: "cs",   label: "CS",   color: "#FFD54F" },
  { id: "se",   label: "SE",   color: "#F48FB1" },
  { id: "ds",   label: "DS",   color: "#80DEEA" },
  { id: "math", label: "Math", color: "#FCD34D" },
] as const;

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
    getCourseStatus,
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

  if (!curriculum) {
    return <div style={{ padding: 24, color: "#64748B" }}>Select a major to begin audit.</div>;
  }

  const highlightGroup = (result: AuditGroupResult) => {
    const codes =
      result.claimedCourses.size > 0
        ? result.claimedCourses
        : new Set(result.displayCourses);
    if (codes.size === 0) return;
    setActiveTab("graph");
    setSelectedNode([...codes][0]);
    setHighlight(codes, getHighlightedEdges(codes));
  };

  const goToGraph = (code: string) => {
    setActiveTab("graph");
    const connected = getConnectedNodes(code);
    setSelectedNode(code);
    setHighlight(connected, getHighlightedEdges(connected));
  };

  const subtitle = [curriculum.name, curriculum.faculty].filter(Boolean).join(" · Faculty of ");

  return (
    <div style={{ padding: 24, overflow: "auto", height: "100%", boxSizing: "border-box" }}>
      {/* Degree Explorer */}
      <DegreeExplorer completedCourses={completedCourses} allPlanned={allPlanned} />

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize:   20,
          fontWeight: 800,
          color:      curriculum.color,
          margin:     "0 0 4px",
        }}>
          {curriculum.name}
        </h2>
        <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>
          {subtitle} · Degree Audit
        </p>
      </div>

      {auditResults.map((result) => (
        <RequirementGroupCard
          key={result.group.title}
          result={result}
          completedCourses={completedCourses}
          getCourseStatus={getCourseStatus}
          onGroupClick={highlightGroup}
          onCourseClick={goToGraph}
        />
      ))}
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

function DegreeExplorer({ completedCourses, allPlanned }: { completedCourses: Set<string>; allPlanned: Set<string> }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Rank all degrees by pct descending
  const ranked = useMemo(() =>
    ALL_DEGREES
      .map(({ major, parentLabel }) => ({ major, parentLabel, ...getDegreeProgress(major, completedCourses, allPlanned) }))
      .sort((a, b) => b.pct - a.pct),
    [completedCourses, allPlanned]
  );

  const top3 = ranked.slice(0, 3);
  const rest  = ranked.slice(3);

  // Per-major-chip sparkline pct (best sub-major or the major itself)
  const chipPct = useMemo(() => {
    const map: Record<string, number> = {};

    for (const { id } of MAJOR_CHIPS) {
      // 1. Check if this ID has sub-majors in our registry
      const subMap = SUB_MAJOR_REGISTRY[id];

      if (subMap) {
        // 2. Nested Major: Find the highest completion % among all its sub-majors
        const subPercentages = Object.values(subMap).map((m) => 
          getDegreeProgress(m as Major, completedCourses, allPlanned).pct
        );
        map[id] = Math.max(0, ...subPercentages);
      } else {
        // 3. Flat Major: Just check the single curriculum in MAJORS
        const major = MAJORS[id as keyof typeof MAJORS];
        map[id] = major ? getDegreeProgress(major, completedCourses, allPlanned).pct : 0;
      }
    }

    return map;
  }, [completedCourses, allPlanned]);

  return (
    <div style={{ marginBottom: 28, background: "rgba(15,23,42,0.7)", border: "1px solid #1E293B", borderRadius: 12, padding: 16 }}>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "#94A3B8", margin: "0 0 12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Degree Explorer
      </h2>

      {/* Best Fit */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
          Best Match
        </div>
        {top3.map(({ major, parentLabel, done, planned, total, pct }) => (
          <div key={major.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 9, color: "#475569", width: 32, flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>{parentLabel}</span>
            <DegreeMiniBar label={major.name} done={done} plannedDone={planned} total={total} color={major.color} />
            <span style={{ fontSize: 10, color: major.color, fontWeight: 600, flexShrink: 0, width: 32, textAlign: "right" }}>{pct}%</span>
          </div>
        ))}

        {/* Expand rest */}
        {rest.length > 0 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            style={{ background: "none", border: "none", color: "#475569", fontSize: 10, cursor: "pointer", padding: "2px 0", fontFamily: "inherit", marginTop: 2 }}
          >
            {showAll ? "▲ Show less" : `▼ View ${rest.length} other degree paths`}
          </button>
        )}
        {showAll && rest.map(({ major, parentLabel, done, planned, total, pct }) => (
          <div key={major.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 9, color: "#475569", width: 32, flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>{parentLabel}</span>
            <DegreeMiniBar label={major.name} done={done} plannedDone={planned} total={total} color={major.color} />
            <span style={{ fontSize: 10, color: major.color, fontWeight: 600, flexShrink: 0, width: 32, textAlign: "right" }}>{pct}%</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#1E293B", marginBottom: 12 }} />

      {/* Major chips with sparklines */}
      <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
        Explore by Major
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: expandedId ? 12 : 0 }}>
        {MAJOR_CHIPS.map(({ id, label, color }) => {
          const isOpen = expandedId === id;
          const pct    = chipPct[id] ?? 0;
          return (
            <button
              key={id}
              onClick={() => setExpandedId(isOpen ? null : id)}
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          8,
                padding:      "5px 10px",
                borderRadius: 20,
                border:       `1px solid ${isOpen ? color : "#334155"}`,
                background:   isOpen ? `${color}15` : "transparent",
                color:        isOpen ? color : "#64748B",
                cursor:       "pointer",
                fontSize:     11,
                fontFamily:   "'DM Mono', monospace",
                transition:   "all 0.15s",
              }}
            >
              {label}
              <Sparkline pct={pct} color={isOpen ? color : "#334155"} />
              <span style={{ fontSize: 10, fontWeight: 600 }}>{pct}%</span>
            </button>
          );
        })}
      </div>

      {/* Accordion expansion */}
      {expandedId && <MajorAccordion majorId={expandedId} completedCourses={completedCourses} allPlanned={allPlanned} />}
    </div>
  );
}

function MajorAccordion({ majorId, completedCourses, allPlanned }: {
  majorId: string; completedCourses: Set<string>; allPlanned: Set<string>;
}) {
  const entries = useMemo(() => {
    // 1. Get the sub-major map from the registry
    const subMap = SUB_MAJOR_REGISTRY[majorId];
    
    const source: Major[] = subMap 
      ? Object.values(subMap) 
      : (MAJORS[majorId as keyof typeof MAJORS] ? [MAJORS[majorId as keyof typeof MAJORS]] : []);

    return source
      .map((major) => ({ 
        major, 
        ...getDegreeProgress(major, completedCourses, allPlanned) 
      }))
      .sort((a, b) => b.pct - a.pct);
  }, [majorId, completedCourses, allPlanned]);

  const color = MAJOR_CHIPS.find((c) => c.id === majorId)?.color ?? "#FFD54F";

  return (
    <div style={{ borderTop: "1px solid #1E293B", paddingTop: 12 }}>
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
  getCourseStatus,
  onGroupClick,
  onCourseClick,
}: {
  result:           AuditGroupResult;
  completedCourses: Set<string>;
  getCourseStatus:  (code: string) => string;
  onGroupClick:     (result: AuditGroupResult) => void;
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