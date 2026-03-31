import type { CourseStatus } from "../types";
import { COURSE_DATA, TAG_COLORS, STATUS_COLORS } from "../data/courses";

// ── Props ─────────────────────────────────────────────────────────────────────

interface CourseNodeProps {
  code:        string;
  status:      CourseStatus;
  isSelected:  boolean;
  isDimmed:    boolean;
  isNextUp?:   boolean;
  isConflict?: boolean;
  onClick:     (code: string) => void;
  style?:      React.CSSProperties;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const BORDER_COLORS: Record<CourseStatus, string> = {
  completed: "#4ADE80",
  planned:   "#60A5FA",
  available: "#334155",
  locked:    "#1E293B",
};

const GLOW_CLASS: Record<CourseStatus, string> = {
  completed: "glow-green",
  planned:   "glow-blue",
  available: "",
  locked:    "",
};

const STATUS_LABEL: Record<CourseStatus, string> = {
  completed: "✓ DONE",
  planned:   "PLANNED",
  available: "",
  locked:    "LOCKED",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function CourseNode({
  code, status, isSelected, isDimmed, isNextUp, isConflict, onClick, style,
}: CourseNodeProps) {
  const course = COURSE_DATA[code];
  if (!course) return null;

  const borderColor = isSelected ? "#FFD54F" : isConflict ? "#F97316" : isNextUp ? "#F97316" : BORDER_COLORS[status];
  const glowClass   = isSelected ? "glow-gold" : isConflict ? "" : GLOW_CLASS[status];
  const labelText   = isConflict ? "ANTIREQ ✕" : STATUS_LABEL[status];
  const tagColor    = TAG_COLORS[course.tags[0]] ?? "#64748B";
  const isLocked    = status === "locked";

  return (
    <div
      className={`node-card ${glowClass}`}
      style={{
        position:        "absolute",
        width:           180,
        height:          80,
        background:      isConflict ? "rgba(249,115,22,0.08)" : isLocked ? "rgba(15,23,42,0.6)" : isNextUp ? "rgba(249,115,22,0.06)" : "rgba(15,23,42,0.9)",
        border:          `1.5px solid ${borderColor}`,
        boxShadow:       isConflict ? "0 0 12px rgba(249,115,22,0.3)" : undefined,
        borderRadius:    10,
        padding:         "10px 12px",
        cursor:          "pointer",
        opacity:         isDimmed ? 0.2 : 1,
        transition:      "all 0.2s ease",
        backdropFilter:  "blur(8px)",
        userSelect:      "none",
        boxSizing:       "border-box",
        ...style,
      }}
      onClick={(e) => { e.stopPropagation(); onClick(code); }}
    >
      {/* Header row: code + tag dot */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <span style={{
          fontFamily:  "'DM Mono', monospace",
          fontWeight:  500,
          fontSize:    12,
          color:       isSelected ? "#FFD54F" : isConflict ? "#F97316" : isLocked ? "#475569" : "#E2E8F0",
        }}>
          {code}
        </span>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: tagColor, flexShrink: 0 }} />
      </div>

      {/* Title */}
      <div style={{
        fontSize:           10,
        color:              isLocked ? "#334155" : "#64748B",
        lineHeight:         1.3,
        overflow:           "hidden",
        display:            "-webkit-box",
        WebkitLineClamp:    2,
        WebkitBoxOrient:    "vertical" as const,
      }}>
        {course.title}
      </div>

      {/* Status badge */}
      {labelText && (
        <div style={{ position: "absolute", bottom: 6, right: 8 }}>
          <span style={{
            fontSize:     8,
            color:        isConflict ? "#F97316" : STATUS_COLORS[status],
            border:       `1px solid ${isConflict ? "#F9731660" : `${STATUS_COLORS[status]}60`}`,
            borderRadius: 3,
            padding:      "1px 4px",
          }}>
            {labelText}
          </span>
        </div>
      )}
      {/* Next-up badge (only when not in conflict) */}
      {isNextUp && !isConflict && (
        <div style={{ position: "absolute", top: 6, right: 8 }}>
          <span style={{
            fontSize:     7,
            color:        "#F97316",
            border:       "1px solid #F9731660",
            borderRadius: 3,
            padding:      "1px 4px",
            letterSpacing: "0.05em",
          }}>
            NEXT
          </span>
        </div>
      )}
    </div>
  );
}
