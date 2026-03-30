"use client";

import { useMemo } from "react";
import { useStore, subjectsFromCodes, levelsFromCodes } from "../lib/store";
import { MAJORS } from "../data/majors";
import { TAG_COLORS, COURSE_COLORS } from "../data/courses";
import type { TierFilter } from "../types";

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
    tierFilter,
    showMyCourses,
    getMajorCourses,
    toggleSubject,
    toggleLevel,
    clearLevelFilter,
    setTierFilter,
    toggleMyCourses,
  } = useStore();

  const major = MAJORS[activeMajorId];

  // Subjects drawn from the FULL major pool, not the filtered one,
  // so chips don't disappear when you apply a tier filter.
  const majorCodes = useMemo(() => getMajorCourses(), [activeMajorId]);
  const subjects   = useMemo(() => subjectsFromCodes(majorCodes), [majorCodes]);
  const levels     = useMemo(() => levelsFromCodes(majorCodes), [majorCodes]);

  const allLevelsActive = activeLevels === null;

  // Only show tier selector when the major actually has tiered groups
  const hasTiers = major.requirementGroups.some((g) => g.tier !== undefined);

  return (
    <div
      style={{
        position:      "absolute",
        top:           12,
        left:          12,
        right:         292,
        zIndex:        20,
        display:       "flex",
        flexDirection: "column",
        gap:           6,
        pointerEvents: "none",
      }}
    >
      {/* ── Tier selector ─────────────────────────────────────────────────── */}
      {hasTiers && (
        <div style={{ display: "flex", gap: 3, pointerEvents: "auto" }}>
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

      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 12, 
        pointerEvents: "auto", 
        // width: "100%", 
        boxSizing: "border-box",
        paddingRight: 8 
      }}>

        {/* Row 1: Subject Specific Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {subjects.map((subject) => {
            const active = activeSubjects === null || (activeSubjects?.has(subject) ?? false);
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

        {/* Row 2: Level Chips + My Plan (Combined) */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          alignItems: "center", 
          gap: 3, 
          width: "100%" 
        }}>
          {/* 1. The Levels */}
          {levels.map((level) => {
            const active = allLevelsActive || (activeLevels?.has(level) ?? false);
            return (
              <Chip
                key={level}
                label={`${level / 100}xx`}
                active={active}
                color={major.color}
                onClick={() => toggleLevel(level)}
                title={`Toggle ${level / 100}xx level courses`}
              />
            );
          })}

          {/* 2. The Spacer: Pushes the next item to the far right */}
          <div style={{ flexGrow: 1 }} />

          {/* 3. The Roadmap Chip: Now on the same line as 1xx, 2xx, etc. */}
          <Chip
            label="My Roadmap"
            active={showMyCourses}
            color="#A78BFA"
            onClick={toggleMyCourses}
            title="Show only completed & planned courses with their prerequisites"
            // style={{ marginRight: 15 }} 
          />
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