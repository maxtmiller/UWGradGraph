import { useState, useMemo, useRef, useCallback } from "react";
import { useStore } from "../lib/store";
import { COURSE_DATA, TAG_COLORS, STATUS_COLORS } from "../data/courses";
import { getConnectedNodes, getHighlightedEdges } from "../lib/graph";

const QUICK_PICKS = ["CS 135","CS 246","CS 341","CS 350","CS 480","STAT 230"];

// ── Component ─────────────────────────────────────────────────────────────────

export default function SearchPalette() {
  const {
    searchOpen, setSearchOpen, setActiveTab, setSelectedNode, setHighlight,
    getCourseStatus, setPanToNode,
    exploreMode, exploreCodes, addExploreCode, setExploreOverflowPopup,
  } = useStore();
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const scrollRef = useRef<HTMLDivElement>(null);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
    setVisibleCount(8);
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q     = query.toLowerCase().trim();
    const qNorm = q.replace(/\s+/g, "");

    const m = qNorm.match(/^([a-z]*)(\d*)$/);
    const qLetters = m?.[1] ?? "";
    const qDigits  = m?.[2] ?? "";

    const codeMatches: (typeof COURSE_DATA)[string][] = [];
    const titleMatches: (typeof COURSE_DATA)[string][] = [];

    for (const c of Object.values(COURSE_DATA)) {
      const codeNorm  = c.code.toLowerCase().replace(/\s+/g, "");
      const cm        = codeNorm.match(/^([a-z]+)(\d+.*)$/);
      const cLetters  = cm?.[1] ?? codeNorm;
      const cDigits   = cm?.[2] ?? "";
      const lettersOk = qLetters === "" || cLetters.startsWith(qLetters);
      const digitsOk  = qDigits  === "" || cDigits.startsWith(qDigits);

      if (lettersOk && digitsOk && (qLetters !== "" || qDigits !== "")) {
        codeMatches.push(c);
      } else if (c.title.toLowerCase().split(/\s+/).some((w) => w.startsWith(q))) {
        titleMatches.push(c);
      }
    }

    // Exact subject match (e.g. "LS 221") before partial (e.g. "LSC 100")
    codeMatches.sort((a, b) => {
      const aExact = a.code.toLowerCase().replace(/\s+/g, "").startsWith(qLetters + (qDigits || "")) ? 0 : 1;
      const bExact = b.code.toLowerCase().replace(/\s+/g, "").startsWith(qLetters + (qDigits || "")) ? 0 : 1;
      return aExact - bExact || a.code.localeCompare(b.code);
    });

    return [...codeMatches, ...titleMatches];
  }, [query]);

  const navigate = (code: string) => {
    closeSearch();
    setActiveTab("graph");
    
    // Only highlight connections if the course is actually in the current graph
    const isVisible = useStore.getState().getMajorCourses().includes(code);
    setSelectedNode(code);
    
    if (isVisible) {
      const connected = getConnectedNodes(code);
      setHighlight(connected, getHighlightedEdges(connected));
    } else {
      setHighlight(new Set(), new Set());
    }
    
    setPanToNode(code);
  };

  const addToExplore = (code: string) => {
    if (exploreCodes.length >= 5) {
      setExploreOverflowPopup(true);
      closeSearch();
      return;
    }
    addExploreCode(code);
    closeSearch();
    const connected = getConnectedNodes(code);
    setSelectedNode(code);
    setHighlight(connected, getHighlightedEdges(connected));
    setPanToNode(code);
  };

  const onSelect = exploreMode ? addToExplore : navigate;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
      setVisibleCount((n) => Math.min(n + 8, results.length));
    }
  }, [results.length]);

  if (!searchOpen) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 500,
               background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
               display: "flex", alignItems: "flex-start", justifyContent: "center",
               paddingTop: 100 }}
      onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
    >
      <div
        className="slide-in"
        style={{ width: 520, background: "#0F172A", border: "1px solid rgba(255,213,79,0.3)",
                 borderRadius: 12, overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.8)" }}
      >
        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", gap: 10,
                      padding: "12px 16px", borderBottom: "1px solid #1E293B" }}>
          <span style={{ color: exploreMode ? "#A78BFA" : "#FFD54F", fontSize: 16 }}>
            {exploreMode ? "✦" : "⌘"}
          </span>
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(8);
            }}
            placeholder={exploreMode ? "Search any course to explore…" : "Search courses by code or title…"}
            style={{ flex: 1, background: "none", border: "none", outline: "none",
                     color: "#E2E8F0", fontSize: 14, fontFamily: "'DM Mono', monospace" }}
          />
          <KbdHint label="ESC" />
        </div>

        {/* Results */}
        <div ref={scrollRef} onScroll={handleScroll} style={{ maxHeight: 360, overflow: "auto" }}>
          {!query && (
            <QuickPicks picks={QUICK_PICKS} getCourseStatus={getCourseStatus} onSelect={onSelect} />
          )}
          {query && results.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: "#475569", fontSize: 12 }}>
              No courses found for &quot;{query}&quot;
            </div>
          )}
          {results.slice(0, visibleCount).map((course) => (
            <ResultRow
              key={course.code}
              code={course.code}
              title={course.title}
              tags={course.tags}
              status={getCourseStatus(course.code)}
              onSelect={() => onSelect(course.code)}
            />
          ))}
          {query && visibleCount < results.length && (
            <div style={{ padding: "8px 16px", textAlign: "center", color: "#475569", fontSize: 11 }}>
              {results.length - visibleCount} more — scroll to load
            </div>
          )}
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
