import { useState, useMemo, useEffect } from "react";
import { useStore } from "../lib/store";
import { COURSE_DATA, TAG_COLORS, STATUS_COLORS } from "../data/courses";
import { getConnectedNodes, getHighlightedEdges } from "../lib/graph";

const QUICK_PICKS = ["CS 135","CS 246","CS 341","CS 350","CS 480","STAT 230"];

// ── Component ─────────────────────────────────────────────────────────────────

export default function SearchPalette() {
  const { searchOpen, setSearchOpen, setActiveTab, setSelectedNode, setHighlight, getCourseStatus, setPanToNode, clearSubjectFilter, clearLevelFilter } = useStore();
  const [query, setQuery] = useState("");

  // Reset query on close
  useEffect(() => { if (!searchOpen) setQuery(""); }, [searchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return Object.values(COURSE_DATA)
      .filter((c) => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const navigate = (code: string) => {
    setSearchOpen(false);
    setActiveTab("graph");
    clearSubjectFilter();
    clearLevelFilter();
    const connected = getConnectedNodes(code);
    setSelectedNode(code);
    setHighlight(connected, getHighlightedEdges(connected));
    setPanToNode(code);
  };

  if (!searchOpen) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 500,
               background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
               display: "flex", alignItems: "flex-start", justifyContent: "center",
               paddingTop: 100 }}
      onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
    >
      <div
        className="slide-in"
        style={{ width: 520, background: "#0F172A", border: "1px solid rgba(255,213,79,0.3)",
                 borderRadius: 12, overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.8)" }}
      >
        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", gap: 10,
                      padding: "12px 16px", borderBottom: "1px solid #1E293B" }}>
          <span style={{ color: "#FFD54F", fontSize: 16 }}>⌘</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses by code or title…"
            style={{ flex: 1, background: "none", border: "none", outline: "none",
                     color: "#E2E8F0", fontSize: 14, fontFamily: "'DM Mono', monospace" }}
          />
          <KbdHint label="ESC" />
        </div>

        {/* Results */}
        <div style={{ maxHeight: 360, overflow: "auto" }}>
          {!query && (
            <QuickPicks picks={QUICK_PICKS} getCourseStatus={getCourseStatus} onSelect={navigate} />
          )}
          {query && results.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: "#475569", fontSize: 12 }}>
              No courses found for "{query}"
            </div>
          )}
          {results.map((course) => (
            <ResultRow
              key={course.code}
              code={course.code}
              title={course.title}
              tags={course.tags}
              status={getCourseStatus(course.code)}
              onSelect={() => navigate(course.code)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function KbdHint({ label }: { label: string }) {
  return (
    <span style={{ fontSize: 10, color: "#334155", border: "1px solid #334155",
                   borderRadius: 4, padding: "2px 6px" }}>
      {label}
    </span>
  );
}

function QuickPicks({
  picks, getCourseStatus, onSelect,
}: { picks: string[]; getCourseStatus: (c: string) => string; onSelect: (c: string) => void }) {
  return (
    <div style={{ padding: 12 }}>
      <div style={{ fontSize: 9, color: "#475569", textTransform: "uppercase",
                    letterSpacing: "0.1em", marginBottom: 6 }}>
        Quick picks
      </div>
      {picks.map((code) => (
        <ResultRow
          key={code}
          code={code}
          title={COURSE_DATA[code]?.title ?? ""}
          tags={COURSE_DATA[code]?.tags ?? []}
          status={getCourseStatus(code)}
          onSelect={() => onSelect(code)}
        />
      ))}
    </div>
  );
}

function ResultRow({
  code, title, tags, status, onSelect,
}: {
  code: string; title: string; tags: string[];
  status: string; onSelect: () => void;
}) {
  const color = STATUS_COLORS[status] ?? "#94A3B8";

  return (
    <div
      onClick={onSelect}
      style={{ padding: "10px 16px", cursor: "pointer", display: "flex",
               alignItems: "center", gap: 12, transition: "background 0.1s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#1E293B"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500,
                      fontSize: 13, color: "#E2E8F0" }}>
          {code}
        </div>
        <div style={{ fontSize: 11, color: "#64748B", whiteSpace: "nowrap",
                      overflow: "hidden", textOverflow: "ellipsis" }}>
          {title}
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
        {tags.map((t) => (
          <span
            key={t}
            style={{ fontSize: 9, color: TAG_COLORS[t] ?? "#64748B",
                     border: `1px solid ${TAG_COLORS[t] ?? "#64748B"}40`,
                     borderRadius: 4, padding: "1px 5px" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
