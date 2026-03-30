"use client";

import { useStore } from "@/lib/store";
import { MAJORS, MAJOR_LIST, SUB_MAJOR_REGISTRY } from "@/data/majors";
import type { MajorId, SubMajorId } from "@/types";

// ── Component ─────────────────────────────────────────────────────────────────

export default function MajorSelector() {
  const { activeMajorId, activeSubMajorId, setActiveMajor, setActiveSubMajor } = useStore();

  const major = MAJORS[activeMajorId as keyof typeof MAJORS];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div role="tablist" style={{
        display: "flex", gap: 4, background: "rgba(15,23,42,0.6)",
        border: "1px solid #1E293B", borderRadius: 8, padding: 4,
      }}>
        {MAJOR_LIST.map((major) => {
          const active = major.id === activeMajorId;
          return (
            <button
              key={major.id}
              onClick={() => setActiveMajor(major.id as MajorId)}
              style={{
                padding: "4px 12px", borderRadius: 5, border: "none", fontSize: 11,
                cursor: "pointer", fontWeight: active ? 600 : 400,
                background: active ? major.color : "transparent",
                color: active ? "#0A0F1E" : "#64748B",
                transition: "all 0.15s ease",
              }}
            >
              {MAJOR_LABELS[major.id as MajorId]}
            </button>
          );
        })}
      </div>

      {/* ── Sub-Major Dropdown (Only for Math) ─────────────────────────── */}
      {SUB_MAJOR_REGISTRY[activeMajorId] && (
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <select
            value={activeSubMajorId || ""}
            onChange={(e) => setActiveSubMajor(e.target.value)}
            style={{
              appearance: "none",
              background: "rgba(15,23,42,0.8)",
              // Use the current major's color if available, otherwise default to gold
              border: `1px solid ${major?.color || "#FCD34D"}4D`, 
              borderRadius: 6,
              color: major?.color || "#FCD34D",
              fontSize: 10,
              padding: "4px 24px 4px 8px",
              cursor: "pointer",
              fontFamily: "inherit",
              outline: "none"
            }}
          >
            {/* Dynamically map the options based on the activeMajorId.
              We add an empty option first if no sub-major is selected.
            */}
            {/* {!activeSubMajorId && <option value="">Select Specialization...</option>} */}
            
            {Object.entries(SUB_MAJOR_REGISTRY[activeMajorId]).map(([id, sub]) => (
              <option key={id} value={id}>
                {sub.name}
              </option>
            ))}
          </select>

          {/* Custom Chevron Icon - Color matches the border */}
          <div style={{ 
            position: "absolute", 
            right: 8, 
            pointerEvents: "none", 
            fontSize: 8, 
            color: major?.color || "#FCD34D", 
            opacity: 0.6 
          }}>
            ▼
          </div>
        </div>
      )}
    </div>
  );
}

// ── Short display labels ──────────────────────────────────────────────────────

const MAJOR_LABELS: Record<MajorId, string> = {
  cs:   "CS",
  se:   "SE",
  ds:   "DS",
  math: "Math",
};
