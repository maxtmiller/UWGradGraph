"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { MAJORS, MAJOR_META, SUB_MAJOR_REGISTRY } from "@/data/majors";
import Sidebar           from "@/components/Sidebar";
import GraphCanvas       from "@/components/GraphCanvas";
import CourseDetailPanel from "@/components/CourseDetailPanel";
import TermPlanner       from "@/components/TermPlanner";
import ProgressAudit     from "@/components/ProgressAudit";
import ChatPanel         from "@/components/ChatPanel";
import SearchPalette     from "@/components/SearchPalette";
import MajorSelector     from "@/components/MajorSelector";
import WelcomeOverlay    from "@/components/WelcomeOverlay";
import HelpPage          from "@/components/HelpPage";

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = "graph" | "planner" | "progress" | "chat" | "help";

const TABS: { key: Tab; label: string }[] = [
  { key: "graph",    label: "Graph"    },
  { key: "planner",  label: "Planner"  },
  { key: "progress", label: "Progress" },
  { key: "chat",     label: "✦ Ask AI" },
  { key: "help",     label: "? Help"   },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GradGraphPage() {
  const {
    activeMajorId,
    activeSubMajorId,
    activeTab,
    setActiveTab,
    searchOpen,
    setSearchOpen,
    antireqWarning,
    clearSelection,
    theme,
    toggleTheme,
  } = useStore();

  const subMajorMap  = SUB_MAJOR_REGISTRY[activeMajorId];
  const activeMajor  = (subMajorMap && activeSubMajorId && subMajorMap[activeSubMajorId])
    ? subMajorMap[activeSubMajorId]
    : MAJORS[activeMajorId];
  const headerColor  = MAJOR_META[activeMajorId]?.color ?? activeMajor?.color ?? "#FFD54F";

  // Dynamically track the header height so content is never obscured
  const headerRef = useRef<HTMLElement>(null);
  const [headerH, setHeaderH] = useState(90);
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    setHeaderH(el.offsetHeight);
    const ro = new ResizeObserver(() => setHeaderH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Global keyboard shortcuts ─────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        clearSelection();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen, clearSelection]);

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>

      {/* ── First-visit welcome overlay ───────────────────────────────────── */}
      <WelcomeOverlay />

      {/* ── Fixed header ──────────────────────────────────────────────────── */}
      <header ref={headerRef} style={{
        position:       "fixed",
        top: 0, left: 0, right: 0,
        zIndex:         100,
        background:     "var(--gg-header)",
        borderBottom:   "1px solid rgba(255,213,79,0.2)",
        backdropFilter: "blur(10px)",
        padding:        "10px 24px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        gap:            16,
        transition:     "background 0.2s",
      }}>
        {/* Left: wordmark + dynamic subtitle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <span style={{
            fontFamily:    "'Syne', sans-serif",
            fontSize:      22,
            fontWeight:    800,
            color:         "#FFD54F",
            letterSpacing: "-0.5px",
          }}>
            UW<span style={{ color: "#60A5FA" }}>GRAD</span>GRAPH
          </span>
          <span style={{
            fontSize:    11,
            color:       headerColor,
            borderLeft:  "1px solid #1E293B",
            paddingLeft: 16,
          }}>
            {activeMajor?.name ?? ""}
          </span>
        </div>

        {/* Centre: major selector pill group */}
        <MajorSelector />

        {/* Right: tab bar + search */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
          {TABS.map(({ key, label }) => (
            <TabButton
              key={key}
              label={label}
              active={activeTab === key}
              onClick={() => setActiveTab(key)}
              highlight={key === "chat"}
            />
          ))}
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              padding:      "6px 14px",
              borderRadius: 6,
              border:       "1px solid var(--gg-border-2)",
              background:   "var(--gg-surface)",
              color:        "var(--gg-text-3)",
              cursor:       "pointer",
              fontFamily:   "inherit",
              fontSize:     11,
              transition:   "background 0.2s, border-color 0.2s",
            }}
          >
            ⌘K Search
          </button>

          {/* ── Theme toggle ──────────────────────────────────────────────── */}
          {/* <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              padding:      "6px 10px",
              borderRadius: 6,
              border:       "1px solid var(--gg-border-2)",
              background:   "var(--gg-surface)",
              color:        "var(--gg-text-3)",
              cursor:       "pointer",
              fontSize:     13,
              lineHeight:   1,
              transition:   "background 0.2s, border-color 0.2s",
            }}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button> */}
        </div>
      </header>

      {/* ── Antirequisite conflict banner ─────────────────────────────────── */}
      {antireqWarning && (
        <div
          className="slide-in"
          style={{
            position:       "fixed",
            top:            headerH + 8,
            left:           "50%",
            transform:      "translateX(-50%)",
            zIndex:         200,
            background:     "rgba(239,68,68,0.15)",
            border:         "1px solid rgba(239,68,68,0.5)",
            borderRadius:   8,
            padding:        "10px 20px",
            fontSize:       12,
            color:          "#FCA5A5",
            backdropFilter: "blur(10px)",
            whiteSpace:     "nowrap",
          }}
        >
          {antireqWarning}
        </div>
      )}

      {/* ── Main body (below fixed header) ───────────────────────────────── */}
      <div style={{ paddingTop: headerH, display: "flex", height: "100vh" }}>
        <Sidebar />

        <main style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {activeTab === "graph" && (
            <>
              <GraphCanvas />
              <CourseDetailPanel />
            </>
          )}
          {activeTab === "planner"  && <TermPlanner />}
          {activeTab === "progress" && <ProgressAudit />}
          {activeTab === "chat"     && <ChatPanel />}
          {activeTab === "help"     && <HelpPage />}
        </main>
      </div>

      {/* ── ⌘K search palette (portal-like, renders over everything) ─────── */}
      <SearchPalette />
    </div>
  );
}

// ── TabButton ─────────────────────────────────────────────────────────────────

function TabButton({
  label, active, onClick, highlight = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding:       "6px 14px",
        borderRadius:  6,
        border:        "1px solid",
        fontSize:      11,
        fontFamily:    "inherit",
        cursor:        "pointer",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        transition:    "all 0.15s",
        background:    active ? "#FFD54F" : highlight ? "rgba(255,213,79,0.06)" : "transparent",
        color:         active ? "#0A0F1E" : highlight ? "#FFD54F" : "var(--gg-text-4)",
        borderColor:   active ? "#FFD54F" : highlight ? "rgba(255,213,79,0.25)" : "var(--gg-border)",
        fontWeight:    active ? 600       : highlight ? 500 : 400,
      }}
    >
      {label}
    </button>
  );
}