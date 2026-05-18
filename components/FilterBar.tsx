"use client";

import { useMemo } from "react";
import { useStore, subjectsFromCodes, levelsFromCodes } from "../lib/store";
import { MAJORS, DEFAULT_MAJOR_ID } from "../data/majors";
import { COURSE_COLORS, COURSE_DATA } from "../data/courses";
import { getAncestors, getDescendants } from "../lib/graph";
import type { TierFilter } from "../types";

const MAX_EXPLORE = 5;

// ── Constants ─────────────────────────────────────────────────────────────────

const TIER_OPTIONS: { value: TierFilter; label: string; title: string }[] = [
  { value: "all",      label: "All",      title: "Show every course in the major" },
  { value: "required", label: "Required", title: "Show only required courses (all streams)" },
  { value: "lower", label: "Simpler", title: "Show required courses — simpler stream" },
  { value: "standard", label: "Standard", title: "Show required courses — standard stream" },
  { value: "advanced", label: "Advanced", title: "Show required courses — advanced stream" },
];

function subjectColor(subject: string): string {
  return COURSE_COLORS[subject] ?? "#64748B";
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function FilterBar() {
  const {
    activeMajorId,
    activeSubjects,
    activeLevels,
    exploreActiveSubjects,
    exploreActiveLevels,
    tierFilter,
    showMyCourses,
    getMajorCourses,
    toggleSubject,
    toggleLevel,
    setTierFilter,
    toggleMyCourses,
    exploreMode,
    exploreCodes,
    removeExploreCode,
    setSearchOpen,
  } = useStore();

  const major = MAJORS[activeMajorId] ?? MAJORS[DEFAULT_MAJOR_ID];

  const majorCodes = getMajorCourses();
  const subjects   = useMemo(() => subjectsFromCodes(majorCodes), [majorCodes]);
  const exploreContextCodes = useMemo(() => {
    const codes = new Set<string>();
    for (const code of exploreCodes) {
      getAncestors(code).forEach((c) => { if (COURSE_DATA[c]) codes.add(c); });
      getDescendants(code).forEach((c) => { if (COURSE_DATA[c]) codes.add(c); });
    }
    return Array.from(codes);
  }, [exploreCodes]);
  const levels     = useMemo(
    () => levelsFromCodes(exploreMode ? exploreContextCodes : majorCodes),
    [exploreMode, exploreContextCodes, majorCodes]
  );

  const activeSubjectsState = exploreMode ? exploreActiveSubjects : activeSubjects;
  const activeLevelsState   = exploreMode ? exploreActiveLevels : activeLevels;
  const allLevelsActive     = activeLevelsState === null;
  const hasTiers = major.requirementGroups.some((g) => g.tier !== undefined);

  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        gap:           6,
        padding:       "8px 12px 6px",
        background:    "rgba(10,15,30,0.92)",
        borderBottom:  "1px solid rgba(255,255,255,0.05)",
        flexShrink:    0,
      }}
    >
      {/* ── Explore code chips (shown when on explore tab) ────────────────── */}
      {exploreMode && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {exploreCodes.map((code) => (
            <div
              key={code}
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          4,
                padding:      "2px 8px 2px 10px",
                borderRadius: 5,
                border:       "1px solid #A78BFA60",
                background:   "#A78BFA15",
                color:        "#C4B5FD",
                fontSize:     10,
                fontFamily:   "'DM Mono', monospace",
              }}
            >
              {code}
              <button
                onClick={() => removeExploreCode(code)}
                title={`Remove ${code}`}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#6D5AD0", fontSize: 13, lineHeight: 1, padding: "0 0 0 2px",
                }}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              padding:       "2px 9px",
              borderRadius:  5,
              border:        "1px dashed #334155",
              background:    "transparent",
              color:         "#475569",
              fontSize:      10,
              fontFamily:    "inherit",
              cursor:        "pointer",
              letterSpacing: "0.04em",
              whiteSpace:    "nowrap",
              transition:    "all 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.color = "#A78BFA"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.color = "#475569"; }}
          >
            + Search ⌘K ({exploreCodes.length}/{MAX_EXPLORE})
          </button>
        </div>
      )}

      {/* ── Normal filters ───────────────────────────────────────────── */}
      {hasTiers && !exploreMode && (
        <div style={{ display: "flex", gap: 3 }}>
          {TIER_OPTIONS.map(({ value, label, title }) => {
            const active = tierFilter === value;
            return (
              <button
                key={value}
                onClick={() => setTierFilter(value)}
                title={title}
                style={{
                  padding:        "3px 10px",
                  borderRadius:   5,
                  border:         `1px solid ${active ? major.color : "#2D3748"}`,
                  background:     active ? `${major.color}22` : "rgba(15,23,42,0.8)",
                  color:          active ? major.color : "#475569",
                  fontSize:       10,
                  fontFamily:     "inherit",
                  fontWeight:     active ? 600 : 400,
                  cursor:         "pointer",
                  backdropFilter: "blur(6px)",
                  transition:     "all 0.15s",
                  letterSpacing:  "0.04em",
                  whiteSpace:     "nowrap",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12, boxSizing: "border-box", paddingRight: 8 }}>
        {!exploreMode && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {subjects.map((subject) => {
              const active = activeSubjectsState === null || (activeSubjectsState?.has(subject) ?? false);
              return (
                <Chip
                  key={subject}
                  label={subject}
                  active={active}
                  color={subjectColor(subject)}
                  onClick={() => toggleSubject(subject)}
                  title={`Toggle ${subject} courses`}
                />
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 3, width: "100%" }}>
          {levels.map((level) => {
            const active = allLevelsActive || (activeLevelsState?.has(level) ?? false);
            return (
              <Chip
                key={level}
                label={`${level / 100}xx`}
                active={active}
                color={exploreMode ? "#A78BFA" : major.color}
                onClick={() => toggleLevel(level)}
                title={`Toggle ${level / 100}xx level courses`}
              />
            );
          })}
          {!exploreMode && (
            <>
              <div style={{ width: "1px", height: "18px", background: "rgba(255, 255, 255, 0.15)", margin: "0 4px" }} />
              <Chip
                label="My Roadmap"
                active={showMyCourses}
                color="#A78BFA"
                onClick={toggleMyCourses}
                title="Show only completed & planned courses with their prerequisites"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Chip ──────────────────────────────────────────────────────────────────────

function Chip({
  label, active, color, onClick, title, style, // 1. Added style prop here
}: {
  label: string; active: boolean; color: string;
  onClick: () => void; title: string;
  style?: React.CSSProperties; // 2. Added type definition
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        // Default Styles
        padding:        "3px 9px",
        borderRadius:   5,
        border:         `1px solid ${active ? color : "#2D3748"}`,
        background:     active ? `${color}20` : "rgba(15,23,42,0.75)",
        color:          active ? color : "#475569",
        fontSize:       10,
        fontFamily:     "inherit",
        fontWeight:     active ? 600 : 400,
        cursor:         "pointer",
        backdropFilter: "blur(6px)",
        transition:     "all 0.15s",
        letterSpacing:  "0.04em",
        whiteSpace:     "nowrap",
        
        // 3. Override with passed-in styles
        ...style, 
      }}
    >
      {label}
    </button>
  );
}
