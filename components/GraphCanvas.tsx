import { useEffect, useRef, useMemo, useCallback } from "react";
import CourseNode from "./CourseNode";
import FilterBar  from "./FilterBar";
import { COURSE_DATA } from "../data/courses";
import { MAJORS, SUB_MAJOR_REGISTRY } from "../data/majors";
import { RequirementGroup, SubGroup } from "../types"
import {
  computeLayout, buildEdges, getCanvasDimensions,
  getConnectedNodes, getHighlightedEdges,
} from "../lib/graph";

import { useStore } from "../lib/store";

// ── Component ─────────────────────────────────────────────────────────────────

export default function GraphCanvas() {
  const {
    activeMajorId,
    activeSubMajorId,
    activeSubjects,
    activeLevels,
    tierFilter,
    completedCourses,
    plannedCourses,
    termPlan,
    showMyCourses,
    selectedNode, highlightedNodes, highlightedEdges,
    transform,
    panToNode, setPanToNode,
    setSelectedNode, setHighlight, clearSelection, setTransform,
    getCourseStatus, getFilteredCourses,
  } = useStore();

  const canvasRef    = useRef<HTMLDivElement>(null);
  const isPanningRef = useRef(false);
  const panStart     = useRef<{ x: number; y: number } | null>(null);

  // Re-derive visible codes whenever any filter changes.
  const visibleCodes = useMemo(
    () => new Set(getFilteredCourses()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeMajorId, activeSubMajorId, activeSubjects, activeLevels, tierFilter, showMyCourses, completedCourses, plannedCourses, getFilteredCourses]
  );

  // Courses that are "next up" — available (unlocked) and still needed for the degree.
  // Rules:
  //   required group   → highlight each available course individually (all are needed)
  //   list-one-of      → highlight available courses only if group not yet satisfied
  //   elective         → highlight only if group unsatisfied AND ≤3 options remain
  //   or subgroup      → skip entirely if any branch is already satisfied
  //   at-most/exactly  → highlight only if still short of the required count, ≤3 remain
  const nextUpCodes = useMemo(() => {
    const subMap = SUB_MAJOR_REGISTRY[activeMajorId];
    const major = (subMap && activeSubMajorId && subMap[activeSubMajorId])
      ? subMap[activeSubMajorId]
      : (MAJORS[activeMajorId as keyof typeof MAJORS] ?? null);

    if (!major) return new Set<string>();

    const next = new Set<string>();

    // Returns how many courses in a list are already completed or planned
    const doneCount = (courses: string[]) =>
      courses.filter((c) => {
        const s = getCourseStatus(c);
        return s === "completed" || s === "planned";
      }).length;

    const findAvailableInGroup = (group: RequirementGroup | SubGroup) => {
      const groupType   = (group as RequirementGroup).type;  // defined on top-level groups
      const subType     = (group as SubGroup).type;           // defined on subgroups
      const courses     = group.courses ?? [];
      const subGroups   = group.subGroups ?? [];

      const available = courses.filter(
        (c) => visibleCodes.has(c) && getCourseStatus(c) === "available"
      );

      if (groupType === "required") {
        // Every listed course is individually required — highlight all available.
        available.forEach((c) => next.add(c));
        // Recurse into any subgroups.
        subGroups.forEach((sg) => findAvailableInGroup(sg));

      } else if (groupType === "list-one-of") {
        // Exactly one must be chosen — skip if already satisfied.
        if (doneCount(courses) === 0 && available.length > 0 && available.length <= 3) {
          available.forEach((c) => next.add(c));
        }

      } else if (groupType === "elective") {
        // Need minCourses — skip if group already has enough done.
        const needed = (group as RequirementGroup).minCourses ?? 1;
        if (doneCount(courses) < needed && available.length > 0 && available.length <= 3) {
          available.forEach((c) => next.add(c));
        }

      } else if (groupType === "complex") {
        // Driven by subGroups — recurse.
        subGroups.forEach((sg) => findAvailableInGroup(sg));

      } else if (subType === "or") {
        // OR combinator: if any branch is already satisfied, skip all branches.
        const anyBranchDone = subGroups.some((sg) => {
          const sgCourses = sg.courses ?? [];
          return doneCount(sgCourses) >= (sg.count || 1);
        });
        if (!anyBranchDone) {
          subGroups.forEach((sg) => findAvailableInGroup(sg));
        }

      } else if (subType === "and") {
        // AND combinator: all branches required — recurse into each.
        subGroups.forEach((sg) => findAvailableInGroup(sg));

      } else if (subType === "at-most" || subType === "exactly") {
        // Pick exactly/at-most N — skip if already satisfied.
        const needed = (group as SubGroup).count ?? 1;
        if (doneCount(courses) < needed && available.length > 0 && available.length <= 3) {
          available.forEach((c) => next.add(c));
        }

      } else if (subType === "at-least") {
        // Need at least N — skip if already satisfied, elective-style.
        const needed = (group as SubGroup).count ?? 1;
        if (doneCount(courses) < needed && available.length > 0 && available.length <= 3) {
          available.forEach((c) => next.add(c));
        }
        // Note: elective subType subGroups have no static courses to highlight.
      }
    };

    major.requirementGroups.forEach((group: RequirementGroup) => findAvailableInGroup(group));

    return next;
  }, [activeMajorId, activeSubMajorId, visibleCodes, completedCourses, plannedCourses]);

  // Courses in antirequisite conflict (completed/planned/termPlan vs each other)
  const antireqConflicts = useMemo(() => {
    const termPlanned = new Set(Object.values(termPlan).flat());
    const all = new Set([...completedCourses, ...plannedCourses, ...termPlanned]);
    const conflicts = new Set<string>();
    for (const code of all) {
      const course = COURSE_DATA[code];
      if (!course) continue;
      for (const anti of course.antireqs) {
        if (all.has(anti)) {
          conflicts.add(code);
          conflicts.add(anti);
        }
      }
    }
    return conflicts;
  }, [completedCourses, plannedCourses, termPlan]);

  const positions = useMemo(() => computeLayout([...visibleCodes]), [visibleCodes]);

  // 3. Dimensions based on new layout
  const { width: canvasW, height: canvasH } = useMemo(
    () => getCanvasDimensions(positions), 
    [positions]
  );

  const edges = useMemo(
    () => buildEdges(visibleCodes, positions, highlightedEdges, selectedNode, highlightedNodes),
    [visibleCodes, positions, highlightedEdges, selectedNode, highlightedNodes]
  );

  // ── Pan to node ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!panToNode) return;
    const pos = positions[panToNode];
    if (!pos) { setPanToNode(null); return; }
    const container = canvasRef.current;
    const viewW = container?.clientWidth  ?? 800;
    const viewH = container?.clientHeight ?? 600;
    const NODE_W = 180, NODE_H = 80;
    const scale = transform.scale;
    setTransform({
      x: viewW / 2 - (pos.x + NODE_W / 2) * scale,
      y: viewH / 2 - (pos.y + NODE_H / 2) * scale,
      scale,
    });
    setPanToNode(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panToNode, positions]);

  // ── Node click ──────────────────────────────────────────────────────────────
  const handleNodeClick = useCallback((code: string) => {
    if (selectedNode === code) { clearSelection(); return; }
    const connected = getConnectedNodes(code);
    const edgeSet   = getHighlightedEdges(connected);
    setSelectedNode(code);
    setHighlight(connected, edgeSet);
  }, [selectedNode, setSelectedNode, setHighlight, clearSelection]);

  // ── Wheel zoom ──────────────────────────────────────────────────────────────
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setTransform((t) => ({ ...t, scale: Math.min(2, Math.max(0.3, t.scale * factor)) }));
  }, [setTransform]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // ── Pan ───────────────────────────────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isPanningRef.current = true;
    panStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanningRef.current || !panStart.current) return;
    setTransform({ ...transform, x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
  };
  const handleMouseUp = () => { isPanningRef.current = false; panStart.current = null; };

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>

      {/* ── Filter bar (sits above the canvas, does not pan/zoom) ─────────── */}
      <FilterBar />

      {/* ── Pannable / zoomable canvas ──────────────────────────────────── */}
      <div
        ref={canvasRef}
        style={{ width: "100%", height: "100%", overflow: "hidden", position: "absolute",
                 inset: 0, cursor: isPanningRef.current ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => clearSelection()}
      >
        {/* Dot-grid background */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Transformed world */}
        <div style={{
          transform:       `translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`,
          transformOrigin: "0 0",
          position:        "absolute",
          width:           canvasW,
          height:          canvasH,
        }}>
          {/* SVG Edges */}
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                        pointerEvents: "none", overflow: "visible" }}>
            <defs>
              <marker id="arrow"      markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#1E3A5F" />
              </marker>
              <marker id="arrow-gold" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#FFD54F" />
              </marker>
            </defs>

            {edges.map(({ key, x1, y1, x2, y2, mx, isSelected }) => (
              <path
                key={key}
                d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
                fill="none"
                stroke={isSelected ? "#FFD54F" : "#1E3A5F"}
                strokeWidth={isSelected ? 2 : 1}
                opacity={selectedNode ? (isSelected ? 1 : 0.15) : 0.5}
                markerEnd={isSelected ? "url(#arrow-gold)" : "url(#arrow)"}
                style={{ transition: "all 0.2s" }}
              />
            ))}
          </svg>

          {/* Course Nodes */}
          {[...visibleCodes].map((code) => {
            const pos = positions[code];
            if (!pos) return null;
            const status     = getCourseStatus(code);
            const isSelected = selectedNode === code;
            const isDimmed   = !!selectedNode && !highlightedNodes.has(code) && selectedNode !== code;

            return (
              <CourseNode
                key={code}
                code={code}
                status={status}
                isSelected={isSelected}
                isDimmed={isDimmed}
                isNextUp={!isSelected && !isDimmed && nextUpCodes.has(code)}
                isConflict={antireqConflicts.has(code)}
                onClick={handleNodeClick}
                style={{ left: pos.x, top: pos.y }}
              />
            );
          })}
        </div>

        {/* Zoom controls */}
        <div style={{ position: "absolute", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 4 }}>
          {([["＋", 1.25], ["⊙", "reset"], ["−", 0.8]] as [string, number | "reset"][]).map(([label, factor]) => (
            <button
              key={label}
              onClick={(e) => {
                e.stopPropagation();
                if (factor === "reset") { setTransform({ x: 0, y: 0, scale: 1 }); return; }
                setTransform((t) => ({ ...t, scale: Math.min(2, Math.max(0.3, t.scale * factor)) }));
              }}
              style={{ width: 32, height: 32, background: "rgba(15,23,42,0.9)", border: "1px solid #334155",
                       borderRadius: 6, color: "#94A3B8", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Empty state when all courses filtered out */}
        {visibleCodes.size === 0 && (
          <div style={{
            position:   "absolute", inset: 0,
            display:    "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            color:      "#334155", pointerEvents: "none",
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>◎</div>
            <div style={{ fontSize: 13 }}>No courses match the current filters</div>
          </div>
        )}
      </div>
    </div>
  );
}
