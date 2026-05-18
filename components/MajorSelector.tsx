"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { MAJOR_META, SUB_MAJOR_REGISTRY } from "@/data/majors";
import { FACULTY_LIST, FACULTIES } from "@/data/faculties";
import type { FacultyId, MajorId, SubMajorId } from "@/types";

function totalProgramsForFaculty(majorIds: string[]): number {
  return majorIds.reduce((sum, id) => {
    const subCount = Object.keys(SUB_MAJOR_REGISTRY[id] ?? {}).length;
    return sum + (subCount > 0 ? subCount : 1);
  }, 0);
}
type Panel = "faculty" | "major" | "submajor" | null;

// ── Sub-components ────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10" fill="none"
      style={{ transition: "transform 0.15s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
    >
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Separator() {
  return (
    <span style={{ color: "#334155", fontSize: 14, fontWeight: 300, userSelect: "none", padding: "0 2px" }}>
      /
    </span>
  );
}

interface PillProps {
  label: string;
  color: string;
  open: boolean;
  filled?: boolean;
  onClick: () => void;
}

function Pill({ label, color, open, filled, onClick }: PillProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display:      "flex",
        alignItems:   "center",
        gap:          5,
        padding:      filled ? "4px 10px" : "4px 8px",
        borderRadius: 6,
        border:       filled ? "none" : `1px solid ${color}33`,
        background:   filled ? `${color}22` : "rgba(15,23,42,0.4)",
        color:        filled ? color : "#94A3B8",
        fontSize:     11,
        fontWeight:   filled ? 600 : 400,
        fontFamily:   "'DM Mono', monospace",
        cursor:       "pointer",
        whiteSpace:   "nowrap",
        transition:   "background 0.15s, border-color 0.15s, color 0.15s",
        maxWidth:     180,
        overflow:     "hidden",
        textOverflow: "ellipsis",
        outline:      "none",
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", minWidth: 0 }}>{label}</span>
      <Chevron open={open} />
    </button>
  );
}

interface DropdownProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  minWidth?: number;
}

function Dropdown({ children, align = "center", minWidth = 220 }: DropdownProps) {
  const alignStyle: React.CSSProperties =
    align === "left"  ? { left: 0 } :
    align === "right" ? { right: 0 } :
    { left: "50%", transform: "translateX(-50%)" };

  return (
    <div style={{
      position:     "absolute",
      top:          "calc(100% + 6px)",
      ...alignStyle,
      minWidth,
      maxHeight:    320,
      overflowY:    "auto",
      background:   "rgba(10,15,30,0.97)",
      border:       "1px solid #1E293B",
      borderRadius: 8,
      boxShadow:    "0 8px 32px rgba(0,0,0,0.5)",
      zIndex:       200,
      padding:      4,
    }}>
      {children}
    </div>
  );
}

interface ItemProps {
  label: string;
  sublabel?: string;
  color: string;
  active: boolean;
  onClick: () => void;
}

function Item({ label, sublabel, color, active, onClick }: ItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            8,
        width:          "100%",
        padding:        "7px 10px",
        borderRadius:   5,
        border:         "none",
        background:     active ? `${color}20` : hovered ? "rgba(255,255,255,0.04)" : "transparent",
        color:          active ? color : hovered ? "#CBD5E1" : "#64748B",
        fontSize:       11,
        fontFamily:     "'DM Mono', monospace",
        cursor:         "pointer",
        textAlign:      "left",
        transition:     "background 0.1s, color 0.1s",
        whiteSpace:     "nowrap",
        overflow:       "hidden",
      }}
    >
      <span
        style={{
          width:        6, height: 6,
          borderRadius: "50%",
          background:   active ? color : "#334155",
          flexShrink:   0,
          transition:   "background 0.1s",
        }}
      />
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", flexGrow: 1 }}>{label}</span>
      {sublabel && (
        <span style={{ fontSize: 9, color: "#334155", flexShrink: 0 }}>{sublabel}</span>
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function MajorSelector() {
  const {
    activeFacultyId,
    activeMajorId,
    activeSubMajorId,
    setActiveFaculty,
    setActiveMajor,
    setActiveSubMajor,
  } = useStore();

  const [open, setOpen] = useState<Panel>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const activeFaculty = FACULTIES[activeFacultyId];
  const activeMeta    = MAJOR_META[activeMajorId];
  const subMajorMap   = SUB_MAJOR_REGISTRY[activeMajorId];
  const accentColor   = activeMeta?.color ?? "#FFD54F";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (panel: Panel) => setOpen(prev => prev === panel ? null : panel);

  return (
    <div
      ref={rootRef}
      style={{ display: "flex", alignItems: "center", gap: 4, position: "relative" }}
    >

      {/* ── Faculty picker ───────────────────────────────────────────────── */}
      <div style={{ position: "relative" }}>
        <Pill
          label={activeFaculty?.shortName ?? "Faculty"}
          color={activeFaculty?.color ?? "#64748B"}
          open={open === "faculty"}
          onClick={() => toggle("faculty")}
        />
        {open === "faculty" && (
          <Dropdown align="left" minWidth={230}>
            {FACULTY_LIST.map(f => (
              <Item
                key={f.id}
                label={f.name.replace("Faculty of ", "")}
                sublabel={`${totalProgramsForFaculty(f.majorIds)}`}
                color={f.color}
                active={f.id === activeFacultyId}
                onClick={() => { setActiveFaculty(f.id as FacultyId); setOpen(null); }}
              />
            ))}
          </Dropdown>
        )}
      </div>

      <Separator />

      {/* ── Major picker ─────────────────────────────────────────────────── */}
      <div style={{ position: "relative" }}>
        <Pill
          label={activeMeta?.label ?? activeMajorId}
          color={accentColor}
          open={open === "major"}
          filled
          onClick={() => toggle("major")}
        />
        {open === "major" && (
          <Dropdown align="center" minWidth={240}>
            {(activeFaculty?.majorIds ?? []).map(id => {
              const meta = MAJOR_META[id];
              if (!meta) return null;
              return (
                <Item
                  key={id}
                  label={meta.label}
                  color={meta.color}
                  active={id === activeMajorId}
                  onClick={() => { setActiveMajor(id as MajorId); setOpen(null); }}
                />
              );
            })}
          </Dropdown>
        )}
      </div>

      {/* ── Specialization picker (only when sub-majors exist) ───────────── */}
      {subMajorMap && (
        <>
          <Separator />
          <div style={{ position: "relative" }}>
            <Pill
              label={
                activeSubMajorId && subMajorMap[activeSubMajorId]
                  ? (subMajorMap[activeSubMajorId] as { name: string }).name
                  : "Specialization"
              }
              color={accentColor}
              open={open === "submajor"}
              onClick={() => toggle("submajor")}
            />
            {open === "submajor" && (
              <Dropdown align="right" minWidth={220}>
                {Object.entries(subMajorMap).map(([id, sub]) => (
                  <Item
                    key={id}
                    label={(sub as { name: string }).name}
                    color={accentColor}
                    active={id === activeSubMajorId}
                    onClick={() => { setActiveSubMajor(id as SubMajorId); setOpen(null); }}
                  />
                ))}
              </Dropdown>
            )}
          </div>
        </>
      )}

    </div>
  );
}
