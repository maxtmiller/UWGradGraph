"use client";

import { useStore } from "@/lib/store";
import { MAJORS, MAJOR_META, SUB_MAJOR_REGISTRY } from "@/data/majors";
import { FACULTY_LIST, FACULTIES } from "@/data/faculties";
import type { FacultyId, MajorId, SubMajorId } from "@/types";

// ── Component ─────────────────────────────────────────────────────────────────

export default function MajorSelector() {
  const {
    activeFacultyId,
    activeMajorId,
    activeSubMajorId,
    setActiveFaculty,
    setActiveMajor,
    setActiveSubMajor,
  } = useStore();

  const activeFaculty  = FACULTIES[activeFacultyId];
  const activeMajor    = MAJORS[activeMajorId as keyof typeof MAJORS];
  const subMajorMap    = SUB_MAJOR_REGISTRY[activeMajorId];
  const accentColor    = MAJOR_META[activeMajorId]?.color ?? activeMajor?.color ?? "#FFD54F";

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"center" }}>

      {/* ── Row 1: Faculty tabs ──────────────────────────────────────────── */}
      <div role="tablist" style={{
        display:      "flex",
        gap:          3,
        background:   "rgba(15,23,42,0.5)",
        border:       "1px solid #1E293B",
        borderRadius: 6,
        padding:      3,
      }}>
        {FACULTY_LIST.map((faculty) => {
          const active = faculty.id === activeFacultyId;
          return (
            <button
              key={faculty.id}
              onClick={() => setActiveFaculty(faculty.id as FacultyId)}
              style={{
                padding:      "3px 10px",
                borderRadius: 4,
                border:       "none",
                fontSize:     10,
                cursor:       "pointer",
                fontWeight:   active ? 600 : 400,
                fontFamily:   "'DM Mono', monospace",
                background:   active ? `${faculty.color}20` : "transparent",
                color:        active ? faculty.color : "#475569",
                transition:   "all 0.15s ease",
                letterSpacing:"0.04em",
              }}
            >
              {faculty.shortName}
            </button>
          );
        })}
      </div>

      {/* ── Row 2: Major tabs + optional sub-major dropdown ─────────────── */}
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <div role="tablist" style={{
          display:      "flex",
          gap:          4,
          background:   "rgba(15,23,42,0.6)",
          border:       "1px solid #1E293B",
          borderRadius: 8,
          padding:      4,
        }}>
          {(activeFaculty?.majorIds ?? []).map((majorId) => {
            const meta   = MAJOR_META[majorId];
            const active = majorId === activeMajorId;
            if (!meta) return null;
            return (
              <button
                key={majorId}
                onClick={() => setActiveMajor(majorId as MajorId)}
                style={{
                  padding:    "4px 12px",
                  borderRadius: 5,
                  border:     "none",
                  fontSize:   11,
                  cursor:     "pointer",
                  fontWeight: active ? 600 : 400,
                  background: active ? meta.color : "transparent",
                  color:      active ? "#0A0F1E" : "#64748B",
                  transition: "all 0.15s ease",
                }}
              >
                {meta.label}
              </button>
            );
          })}
        </div>

        {/* Sub-major dropdown — only when the active major has specializations */}
        {subMajorMap && (
          <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
            <select
              value={activeSubMajorId ?? Object.keys(subMajorMap)[0]}
              onChange={(e) => setActiveSubMajor(e.target.value as SubMajorId)}
              style={{
                appearance:   "none",
                background:   "rgba(15,23,42,0.8)",
                border:       `1px solid ${accentColor}4D`,
                borderRadius: 6,
                color:        accentColor,
                fontSize:     10,
                padding:      "4px 24px 4px 8px",
                cursor:       "pointer",
                fontFamily:   "inherit",
                outline:      "none",
                maxWidth:     160,
              }}
            >
              {Object.entries(subMajorMap).map(([id, sub]) => (
                <option key={id} value={id}>
                  {(sub as { name: string }).name}
                </option>
              ))}
            </select>
            <div style={{ position:"absolute", right:8, pointerEvents:"none", fontSize:8, color:accentColor, opacity:0.6 }}>
              ▼
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
