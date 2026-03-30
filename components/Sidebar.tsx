"use client";

import { useStore } from "../lib/store";
import { COURSE_DATA, STATUS_COLORS } from "../data/courses";
import { MAJORS, SUB_MAJOR_REGISTRY } from "../data/majors";
import { runAudit, groupTarget } from "../lib/audit";
import { getConnectedNodes, getHighlightedEdges } from "../lib/graph";
import type { Major } from "../types";
import { useMemo } from "react";

// ── Resolve the correct major definition ──────────────────────────────────────

function resolveActiveMajor(
  activeMajorId: string,
  activeSubMajorId: string | null
): Major | null {
  const subMap = SUB_MAJOR_REGISTRY[activeMajorId];

  if (subMap && activeSubMajorId) {
    return subMap[activeSubMajorId] ?? MAJORS[activeMajorId as keyof typeof MAJORS] ?? null;
  }

  return MAJORS[activeMajorId as keyof typeof MAJORS] ?? null;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const {
    activeMajorId,
    activeSubMajorId,
    completedCourses,
    plannedCourses,
    termPlan,
    selectedNode,
    getCourseStatus,
    getMajorCourses,
    setSelectedNode,
    setHighlight,
    setActiveTab,
  } = useStore();

  const major        = resolveActiveMajor(activeMajorId, activeSubMajorId ?? null);
  const visibleCodes = getMajorCourses();

  const handleCourseClick = (code: string) => {
    setActiveTab("graph");
    const connected = getConnectedNodes(code);
    setSelectedNode(code);
    setHighlight(connected, getHighlightedEdges(connected));
  };

  const allPlanned = useMemo(
    () => new Set([...plannedCourses, ...Object.values(termPlan).flat()]),
    [plannedCourses, termPlan],
  );

  // Run the full audit so the sidebar shows accurate progress per group.
  const auditResults = useMemo(
    () => (major ? runAudit(major.requirementGroups, completedCourses, allPlanned) : []),
    [major, completedCourses, allPlanned]
  );

  // Total required = sum of all group targets
  const totalRequired = useMemo(
    () => major?.requirementGroups.reduce((sum, g) => sum + groupTarget(g), 0) ?? 0,
    [major]
  );

  const totalCompletedClaimed = useMemo(
    () => auditResults.reduce((sum, r) => sum + r.completedDoneCount, 0),
    [auditResults]
  );

  const totalPlannedClaimed = useMemo(
    () => auditResults.reduce((sum, r) => sum + r.plannedDoneCount, 0),
    [auditResults]
  );

  // Show the first three audit groups as progress bars; the rest are in the audit tab.
  const previewGroups = auditResults.slice(0, 3);

  // 1. Separate the Core groups from the Elective groups
  const { coreGroups, electiveGroup } = useMemo(() => {
    // 1. ADD THIS GUARD: If there's no major, there are no groups.
    if (!major || !auditResults.length) {
      return { coreGroups: [], electiveGroup: null };
    }

    const cores = auditResults.filter(r => r.group.core === true);
    const electives = auditResults.filter(r => r.group.core !== true);

    // 2. Accessing major.name is now safe because of the guard above
    const electiveAggregate = electives.length > 0 ? {
      label:          `${major.name} Electives`,
      done:           electives.reduce((sum, r) => sum + r.completedDoneCount, 0),
      plannedDone:    electives.reduce((sum, r) => sum + r.plannedDoneCount, 0),
      total:          electives.reduce((sum, r) => sum + r.target, 0),
      color:          major.color,
    } : null;

    return { coreGroups: cores, electiveGroup: electiveAggregate };
  }, [auditResults, major]);

  if (!major) return null;

  return (
    <aside style={{
      width:          260,
      background:     "rgba(15,23,42,0.8)",
      borderRight:    "1px solid #1E293B",
      backdropFilter: "blur(10px)",
      display:        "flex",
      flexDirection:  "column",
      overflow:       "hidden",
      flexShrink:     0,
    }}>
      {/* ── Progress section ──────────────────────────────────────────────── */}
      {/* <div style={{ padding: 16, borderBottom: "1px solid #1E293B" }}>
        <Label>Degree Progress</Label>

        {previewGroups.map(({ group, doneCount, target }) => (
          <ProgressBar
            key={group.title}
            label={group.title}
            done={doneCount}
            total={target}
            color={group.color}
          />
        ))} */}

      <div style={{ padding: 16, borderBottom: "1px solid #1E293B" }}>
        <Label>Degree Progress</Label>

        {/* Render specific Core bars */}
        {coreGroups.map(({ group, completedDoneCount, plannedDoneCount, target }) => (
          <ProgressBar
            key={group.title}
            label={group.title}
            done={completedDoneCount}
            plannedDone={plannedDoneCount}
            total={target}
            color={group.color}
          />
        ))}

        {/* Render the single aggregated Electives bar if it exists */}
        {electiveGroup && (
          <ProgressBar
            label={electiveGroup.label}
            done={electiveGroup.done}
            plannedDone={electiveGroup.plannedDone}
            total={electiveGroup.total}
            color={electiveGroup.color}
          />
        )}

        {/* Overall completion counter */}
        <div style={{
          marginTop:    8,
          padding:      "8px 12px",
          background:   `${major.color}10`,
          borderRadius: 8,
          border:       `1px solid ${major.color}25`,
        }}>
          <span style={{ fontSize: 10, color: "#94A3B8" }}>Completed </span>
          <span style={{
            fontSize:   18,
            fontWeight: 700,
            color:      major.color,
            fontFamily: "'Syne', sans-serif",
          }}>
            {totalCompletedClaimed}
          </span>
          {totalPlannedClaimed > 0 && (
            <span style={{ fontSize: 14, fontWeight: 600, color: "#60A5FA", fontFamily: "'Syne', sans-serif" }}>
              +{totalPlannedClaimed}
            </span>
          )}
          <span style={{ fontSize: 10, color: "#64748B" }}>/{totalRequired} required</span>
        </div>
      </div>

      {/* ── Course list ────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: "auto", padding: "12px 0" }}>
        <div style={{ padding: "0 16px", marginBottom: 8 }}>
          <Label>{major.name} Courses</Label>
        </div>

        {visibleCodes.map((code) => {
          const course   = COURSE_DATA[code];
          const status   = getCourseStatus(code);
          const color    = STATUS_COLORS[status];
          const isActive = selectedNode === code;

          return (
            <div
              key={code}
              onClick={() => handleCourseClick(code)}
              style={{
                padding:    "6px 16px",
                cursor:     "pointer",
                display:    "flex",
                alignItems: "center",
                gap:        8,
                background: isActive ? `${major.color}12` : "transparent",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isActive ? `${major.color}12` : "transparent";
              }}
            >
              <div style={{
                width:      6,
                height:     6,
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
              }} />
              <span style={{
                fontSize:   11,
                color:      status === "locked" ? "#475569" : "#CBD5E1",
                fontFamily: "'DM Mono', monospace",
                flexShrink: 0,
              }}>
                {code}
              </span>
              <span style={{
                fontSize:   10,
                color:      "#475569",
                overflow:   "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}>
                {course?.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Legend ────────────────────────────────────────────────────────── */}
      <div style={{ padding: 16, borderTop: "1px solid #1E293B" }}>
        {(["completed","planned","available","locked"] as const).map((status) => (
          <div key={status} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: STATUS_COLORS[status] }} />
            <span style={{ fontSize: 10, color: "#64748B", textTransform: "capitalize" }}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize:      10,
      color:         "#64748B",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      marginBottom:  12,
    }}>
      {children}
    </div>
  );
}

function ProgressBar({
  label, done, plannedDone = 0, total, color,
}: {
  label: string; done: number; plannedDone?: number; total: number; color: string;
}) {
  const completedPct = total > 0 ? Math.min(100, (done / total) * 100) : 0;
  const plannedPct   = total > 0 ? Math.min(100 - completedPct, (plannedDone / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between",
                    fontSize: 11, marginBottom: 4 }}>
        <span style={{
          color:         "#94A3B8",
          overflow:      "hidden",
          whiteSpace:    "nowrap",
          textOverflow:  "ellipsis",
          maxWidth:      170,
        }}>
          {label}
        </span>
        <span style={{ flexShrink: 0 }}>
          <span style={{ color }}>{done}</span>
          {plannedDone > 0 && <span style={{ color: "#60A5FA" }}>+{plannedDone}</span>}
          <span style={{ color: "#64748B" }}>/{total}</span>
        </span>
      </div>
      <div style={{ height: 4, background: "#1E293B", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", display: "flex" }}>
          <div style={{ width: `${completedPct}%`, background: color, transition: "width 0.3s ease" }} />
          <div style={{ width: `${plannedPct}%`, background: `${color}55`, transition: "width 0.3s ease" }} />
        </div>
      </div>
    </div>
  );
}
