"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { RequirementGroup, SubGroup, RequirementRule } from "../types";
import { groupTarget } from "../lib/audit";

// ─────────────────────────────────────────────────────────────────────────────
// Human-readable content generation
// ─────────────────────────────────────────────────────────────────────────────

const MAX_INLINE_COURSES = 10;

interface TooltipLine {
  kind:    "heading" | "bullet" | "courses" | "rule" | "note";
  text:    string;
  courses?: string[];  // only for kind === "courses"
}

function ruleToText(rule: RequirementRule): string {
  const parts: string[] = [];
  
  const prefixPart = rule.prefixes?.length
    ? rule.prefixes.join("/")
    : "any subject";

  const levelPart =
    rule.minLevel !== undefined && rule.maxLevel !== undefined
      ? (rule.minLevel === rule.maxLevel ? `${rule.minLevel}-level` : `${rule.minLevel}–${rule.maxLevel} level`)
      : rule.minLevel !== undefined
      ? `${rule.minLevel}+ level`
      : rule.maxLevel !== undefined
      ? `up to ${rule.maxLevel} level`
      : "";

  parts.push(prefixPart);
  if (levelPart) parts.push(levelPart);

  return parts.join(" ");
}

function subGroupToLines(sub: SubGroup, depth = 0): TooltipLine[] {
  const lines: TooltipLine[] = [];
  const indent = "  ".repeat(depth);
  const label = sub.title ?? subGroupDefaultLabel(sub);

  // 1. Recursive groups (AND/OR)
  if (sub.type === "and" || sub.type === "or") {
    lines.push({ kind: "bullet", text: `${indent}${sub.type === "and" ? "All of:" : "One of:"}` });
    for (const child of sub.subGroups ?? []) {
      lines.push(...subGroupToLines(child, depth + 1));
    }
    return lines;
  }

  // 2. Multi-Rule/Elective Logic
  // Check if it's an elective or a hybrid leaf node
  const hasCourses = sub.courses && sub.courses.length > 0;
  const hasRules = sub.rules && sub.rules.length > 0;

  // Header for this subgroup
  const extraFlags: string[] = [];
  if (sub.canDoubleCount) extraFlags.push("can double-count");
  if (sub.countMultiplier && sub.countMultiplier > 1) extraFlags.push(`×${sub.countMultiplier} weight`);
  const flagText = extraFlags.length ? ` (${extraFlags.join(", ")})` : "";

  // If it's a complex elective requirement
  if (hasRules && !hasCourses) {
    const ruleTexts = sub.rules!.map(ruleToText).join(" or ");
    lines.push({ kind: "rule", text: `${indent}${sub.count}× ${ruleTexts}${flagText}` });
  } 
  // If it's a specific list of courses
  else if (hasCourses) {
    const countLabel = sub.type === "at-most" ? "Up to " : sub.type === "at-least" ? "Min " : "";
    const totalLabel = `${indent}${countLabel}${sub.count} from ${label}${flagText}`;
    
    if (sub.courses.length <= MAX_INLINE_COURSES) {
      lines.push({ kind: "courses", text: totalLabel, courses: sub.courses });
    } else {
      lines.push({ kind: "bullet", text: `${totalLabel} (${sub.courses.length} courses total)` });
    }

    // IMPORTANT: If this specific course list ALSO has rules (e.g. "One of these, but must be 300-level")
    if (hasRules) {
      sub.rules!.forEach(r => {
        lines.push({ kind: "note", text: `${indent}  Constraint: Must be ${ruleToText(r)}` });
      });
    }
  }

  return lines;
}

function subGroupDefaultLabel(sub: SubGroup): string {
  if (sub.type === "at-most")  return sub.count === 1 ? "One of"  : `Up to ${sub.count} of`;
  if (sub.type === "at-least") return `At least ${sub.count} of`;
  return sub.count === 1 ? "One of" : `${sub.count} of`;
}

function buildTooltipContent(group: RequirementGroup): TooltipLine[] {
  const lines: TooltipLine[] = [];
  const target = groupTarget(group);

  // 1. Summary Header
  const summaryText = group.title || (
    group.type === "required" ? `All ${target} required` :
    group.type === "list-one-of" ? `Choose 1 of ${group.subGroups?.length || group.courses.length}` :
    `Complete ${target} course${target !== 1 ? "s" : ""}`
  );
  lines.push({ kind: "heading", text: summaryText });

  // 2. SubGroups (Buckets)
  if (group.subGroups?.length) {
    group.subGroups.forEach(sub => lines.push(...subGroupToLines(sub, 0)));
  }

  // 3. Independent Course Lists (Only if no subgroups exist to avoid duplication)
  if (!group.subGroups?.length && group.courses?.length > 0) {
    lines.push({ 
      kind: "courses", 
      text: group.courses.length > MAX_INLINE_COURSES ? `${group.courses.length} Options:` : "Courses:", 
      courses: group.courses 
    });
  }

  // 4. Global Rules (Always show these)
  if (group.rules?.length) {
    group.rules.forEach(rule => {
      lines.push({ kind: "rule", text: `Global Rule: ${ruleToText(rule)}` });
    });
  }

  // 5. Contextual Notes
  if (group.canDoubleCount) lines.push({ kind: "note", text: "Double-counting permitted" });
//   if (group.description) lines.push({ kind: "note", text: group.description });

  return lines;
}

// ─────────────────────────────────────────────────────────────────────────────
// Portal tooltip
// ─────────────────────────────────────────────────────────────────────────────

interface TooltipPosition {
  top:       number;
  left:      number;
  arrowSide: "left" | "right";
}

function computePosition(anchor: DOMRect, tooltipW: number, tooltipH: number): TooltipPosition {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const GAP = 10;

  // Prefer opening to the right of the icon
  let left = anchor.right + GAP;
  let arrowSide: "left" | "right" = "left";

  if (left + tooltipW > vw - 8) {
    // Flip left
    left = anchor.left - tooltipW - GAP;
    arrowSide = "right";
  }

  // Vertical: align top to icon, clamp to viewport
  let top = anchor.top - 8;
  top = Math.max(8, Math.min(top, vh - tooltipH - 8));

  return { top, left, arrowSide };
}

// ─────────────────────────────────────────────────────────────────────────────
// HelpIcon — the "?" button + tooltip trigger
// ─────────────────────────────────────────────────────────────────────────────

interface HelpIconProps {
  group: RequirementGroup;
  color: string;
}

export default function RequirementHelpIcon({ group, color }: HelpIconProps) {
  const [visible, setVisible]   = useState(false);
  const [pos, setPos]           = useState<TooltipPosition | null>(null);
  const iconRef                 = useRef<HTMLButtonElement>(null);
  const tooltipRef              = useRef<HTMLDivElement>(null);
  const hideTimer               = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lines = buildTooltipContent(group);

  const show = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisible(true);
    // Compute position after paint
    // requestAnimationFrame(() => {
    //   if (!iconRef.current || !tooltipRef.current) return;
    //   const anchor  = iconRef.current.getBoundingClientRect();
    //   const ttRect  = tooltipRef.current.getBoundingClientRect();
    //   setPos(computePosition(anchor, ttRect.width, ttRect.height));
    // });
    setTimeout(() => {
      if (!iconRef.current || !tooltipRef.current) return;
      const anchor = iconRef.current.getBoundingClientRect();
      const ttRect = tooltipRef.current.getBoundingClientRect();
      setPos(computePosition(anchor, ttRect.width, ttRect.height));
    }, 0);
  }, []);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 120);
  }, []);

  // Close on Escape or outside click
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setVisible(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible]);

  return (
    <>
      {/* ── Help icon button ─────────────────────────────────────────── */}
      <button
        ref={iconRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-label={`Requirements for ${group.title}`}
        style={{
          width:          18,
          height:         18,
          borderRadius:   "50%",
          border:         `1px solid ${color}50`,
          background:     `${color}12`,
          color:          `${color}cc`,
          fontSize:       10,
          fontWeight:     700,
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
          transition:     "all 0.15s",
          lineHeight:     1,
          fontFamily:     "inherit",
          padding:        0,
        }}
        // className="
        //     /* Base State */
        //     bg-[var(--group-color)]/10 border-[var(--group-color)]/30 text-[var(--group-color)]/80
        //     /* Hover State - Equivalent to your 'Capture' logic */
        //     hover:bg-[var(--group-color)]/25 hover:border-[var(--group-color)]/90 hover:text-[var(--group-color)]
        // "
        onMouseOverCapture={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background     = `${color}25`;
          (e.currentTarget as HTMLButtonElement).style.borderColor    = `${color}90`;
          (e.currentTarget as HTMLButtonElement).style.color          = color;
        }}
        onMouseOutCapture={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background     = `${color}12`;
          (e.currentTarget as HTMLButtonElement).style.borderColor    = `${color}50`;
          (e.currentTarget as HTMLButtonElement).style.color          = `${color}cc`;
        }}
      >
        ?
      </button>

      {/* ── Portal tooltip ──────────────────────────────────────────── */}
      {visible && (
        <TooltipPortal
          ref={tooltipRef}
          lines={lines}
          color={color}
          pos={pos}
          onMouseEnter={() => { if (hideTimer.current) clearTimeout(hideTimer.current); }}
          onMouseLeave={hide}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TooltipPortal — rendered into document.body via createPortal
// ─────────────────────────────────────────────────────────────────────────────

import { forwardRef } from "react";
import { createPortal } from "react-dom";

const TooltipPortal = forwardRef<
  HTMLDivElement,
  {
    lines:        TooltipLine[];
    color:        string;
    pos:          TooltipPosition | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  }
>(function TooltipPortal({ lines, color, pos, onMouseEnter, onMouseLeave }, ref) {
  const TOOLTIP_W = 280;

  const style: React.CSSProperties = {
    position:       "fixed",
    zIndex:         9999,
    width:          TOOLTIP_W,
    // Hidden until position is known (avoids flash at 0,0)
    opacity:        pos ? 1 : 0,
    top:            pos?.top  ?? -9999,
    left:           pos?.left ?? -9999,
    transition:     pos ? "opacity 0.12s ease" : "none",
    pointerEvents:  "auto",
  };

  const content = (
    <div
      ref={ref}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Arrow */}
      {pos && (
        <div style={{
          position:    "absolute",
          top:         16,
          ...(pos.arrowSide === "left"
            ? { left: -6 }
            : { right: -6 }),
          width:       0,
          height:      0,
          borderTop:   "6px solid transparent",
          borderBottom:"6px solid transparent",
          ...(pos.arrowSide === "left"
            ? { borderRight: `6px solid rgba(30,42,64,0.98)` }
            : { borderLeft:  `6px solid rgba(30,42,64,0.98)` }),
        }} />
      )}

      {/* Card */}
      <div style={{
        background:     "rgba(15,23,42,0.98)",
        border:         `1px solid ${color}35`,
        borderRadius:   10,
        padding:        "12px 14px",
        backdropFilter: "blur(16px)",
        boxShadow:      `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)`,
        
        maxWidth:       "100%",
        overflowWrap:   "anywhere",
        wordBreak:      "normal",
      }}>
        {lines.map((line, i) => (
          <TooltipLine key={i} line={line} color={color} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );

  // Only portal when document is available (SSR guard)
  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
});

// ─────────────────────────────────────────────────────────────────────────────
// Individual line renderers
// ─────────────────────────────────────────────────────────────────────────────

function TooltipLine({
  line, color, isFirst,
}: {
  line:    TooltipLine;
  color:   string;
  isFirst: boolean;
}) {
  if (line.kind === "heading") {
    return (
      <div style={{
        fontSize:     11,
        fontWeight:   600,
        color:        color,
        marginBottom: 8,
        paddingBottom: 7,
        borderBottom: `1px solid ${color}20`,
        fontFamily:   "'Syne', sans-serif",
        letterSpacing: "0.01em",
      }}>
        {line.text}
      </div>
    );
  }

  if (line.kind === "courses") {
    return (
      <div style={{ marginBottom: 6 }}>
        {line.text && (
          <div style={{ fontSize: 9, color: "#64748B", textTransform: "uppercase",
                        letterSpacing: "0.08em", marginBottom: 4 }}>
            {line.text}
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {(line.courses ?? []).map((c) => (
            <span key={c} style={{
              fontSize:     9,
              fontFamily:   "'DM Mono', monospace",
              color:        "#CBD5E1",
              background:   "rgba(255,255,255,0.06)",
              border:       "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
              padding:      "2px 5px",
            }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (line.kind === "rule") {
    return (
      <div style={{
        fontSize:     10,
        color:        "#94A3B8",
        marginBottom: 4,
        display:      "flex",
        alignItems:   "flex-start",
        gap:          5,
      }}>
        <span style={{ color: color, flexShrink: 0, marginTop: 1 }}>◆</span>
        <span>{line.text}</span>
      </div>
    );
  }

  if (line.kind === "bullet") {
    // Detect indentation (leading spaces)
    const depth  = (line.text.match(/^( +)/) ?? ["",""])[1].length / 2;
    const text   = line.text.trimStart();
    return (
      <div style={{
        fontSize:     10,
        color:        "#94A3B8",
        marginBottom: 4,
        paddingLeft:  depth * 10,
        display:      "flex",
        alignItems:   "flex-start",
        gap:          5,
      }}>
        <span style={{ color: "#475569", flexShrink: 0, marginTop: 1 }}>
          {depth > 0 ? "›" : "·"}
        </span>
        <span>{text}</span>
      </div>
    );
  }

  // note
  return (
    <div style={{
      fontSize:     9,
      color:        "#475569",
      marginTop:    6,
      paddingTop:   6,
      borderTop:    "1px solid rgba(255,255,255,0.06)",
      fontStyle:    "italic",
      display:      "flex",
      gap:          4,
      alignItems:   "flex-start",
    }}>
      <span style={{ flexShrink: 0 }}>ℹ</span>
      <span>{line.text}</span>
    </div>
  );
}
