"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useStore } from "../lib/store";
import { MAJORS, ALL_DEGREES, SUB_MAJOR_REGISTRY } from "../data/majors";
import { runAudit, groupTarget } from "../lib/audit";
import type { Major } from "../types";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatAction {
  type: "markCompleted" | "markPlanned" | "addToTerm";
  code: string;
  term?: string;
  label: string;
}

type ContentSegment =
  | { kind: "text"; text: string }
  | { kind: "action"; action: ChatAction };

// ── Helpers ───────────────────────────────────────────────────────────────────

const ACTION_RE = /<gradgraph-action>([\s\S]*?)<\/gradgraph-action>/g;

function parseContent(text: string): ContentSegment[] {
  const segments: ContentSegment[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  ACTION_RE.lastIndex = 0;
  while ((match = ACTION_RE.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ kind: "text", text: text.slice(last, match.index) });
    }
    try {
      const action = JSON.parse(match[1]) as ChatAction;
      segments.push({ kind: "action", action });
    } catch {
      segments.push({ kind: "text", text: match[0] });
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    segments.push({ kind: "text", text: text.slice(last) });
  }
  return segments;
}

function describeRules(rules: { prefixes?: string[]; minLevel?: number; maxLevel?: number }[]): string {
  return rules.map((r) => {
    const prefix = r.prefixes?.join("/") ?? "any subject";
    if (r.minLevel !== undefined && r.maxLevel !== undefined)
      return `any ${prefix} ${r.minLevel}–${r.maxLevel}`;
    if (r.minLevel !== undefined)
      return `any ${prefix} ${r.minLevel}+ (i.e. ${r.minLevel / 100}xx and above)`;
    if (r.maxLevel !== undefined)
      return `any ${prefix} up to ${r.maxLevel}`;
    return `any ${prefix} course`;
  }).join("; or ");
}

function buildRequirementSummary(major: Major, completed: Set<string>, allPlanned: Set<string>): string {
  const results = runAudit(major.requirementGroups, completed, allPlanned);
  return results
    .map((r) => {
      const { group: g, completedDoneCount, plannedDoneCount, claimedCourses, plannedClaimedCourses } = r;
      const total = groupTarget(g);
      const filled = completedDoneCount + plannedDoneCount;
      const fulfilled = completedDoneCount >= total;
      const partiallyFulfilled = !fulfilled && filled >= total;
      const status = fulfilled
        ? "✓ FULFILLED"
        : partiallyFulfilled
        ? `⟳ FULFILLED WITH PLANNED COURSES (${completedDoneCount} completed + ${plannedDoneCount} planned = ${filled}/${total})`
        : `✗ INCOMPLETE (${completedDoneCount} completed + ${plannedDoneCount} planned = ${filled}/${total} needed)`;

      const typeLabel =
        g.type === "required"    ? `all ${total} required` :
        g.type === "elective"    ? `choose ${total}` :
        g.type === "list-one-of" ? "choose 1" : `${total} courses`;

      const lines: string[] = [`${g.title} [${typeLabel}] — ${status}`];

      // Show which courses are actually counting toward this group
      if (claimedCourses.size > 0) {
        const claimed = [...claimedCourses].map((c) =>
          plannedClaimedCourses.has(c) ? `${c} (planned)` : `${c} (completed)`
        ).join(", ");
        lines.push(`  Counting toward this group: ${claimed}`);
      }

      // Show static eligible courses (if any)
      if (g.courses.length > 0) {
        const list = g.courses.slice(0, 20).join(", ");
        const overflow = g.courses.length > 20 ? ` (+${g.courses.length - 20} more)` : "";
        lines.push(`  Static eligible courses: ${list}${overflow}`);
      }

      // Show dynamic rules — IMPORTANT: these mean ANY matching course qualifies
      if (g.rules && g.rules.length > 0) {
        lines.push(`  Rule-based eligibility: ${describeRules(g.rules)} — ANY course matching these rules counts`);
      }

      // Propagate rules from subGroups too
      const subRules = g.subGroups?.flatMap((sg) => sg.rules ?? []) ?? [];
      if (subRules.length > 0) {
        lines.push(`  Sub-group rules: ${describeRules(subRules)}`);
      }

      return lines.join("\n");
    })
    .join("\n\n");
}

const ALL_MAJOR_NAMES = ALL_DEGREES.map(d => d.major).join(", ");

const SUGGESTIONS = [
  "What courses do I still need to complete my degree?",
  "What are the prerequisites for CS 341?",
  "Which electives count toward my major?",
  "Add CS 245 to my 2A term",
  "Mark MATH 135 as completed",
  "How does my progress compare across Math specializations?",
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChatPanel() {
  const {
    activeMajorId,
    activeSubMajorId,
    completedCourses,
    plannedCourses,
    termPlan,
    toggleCompleted,
    togglePlanned,
    moveCourseToTerm,
  } = useStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [streaming, setStreaming] = useState(false);
  const [pendingAction, setPendingAction] = useState<ChatAction | null>(null);
  const [pendingTerm, setPendingTerm]     = useState<string>("");
  const [confirmedActions, setConfirmedActions] = useState<Set<string>>(new Set());

  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef  = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Resolve active major
  const activeMajor: Major | null = useMemo(() => {
    const subMap = SUB_MAJOR_REGISTRY[activeMajorId];

    if (subMap) {
      const defaultId = activeMajorId === "math" ? "stat" : "dsbcs";

      const resolvedId = activeSubMajorId ?? defaultId;
      
      return subMap[resolvedId] ?? Object.values(subMap)[0] ?? null;
    }

    return MAJORS[activeMajorId as keyof typeof MAJORS] ?? null;
  }, [activeMajorId, activeSubMajorId]);

  const allPlanned = useMemo(
    () => new Set([...plannedCourses, ...Object.values(termPlan).flat()]),
    [plannedCourses, termPlan],
  );

  const context = useMemo(() => ({
    activeMajorName:    activeMajor?.name ?? activeMajorId,
    completedCourses:   [...completedCourses],
    plannedCourses:     [...allPlanned],
    termPlan,
    requirementSummary: activeMajor ? buildRequirementSummary(activeMajor, completedCourses, allPlanned) : "",
    availableMajors:    ALL_MAJOR_NAMES,
  }), [activeMajor, activeMajorId, completedCourses, allPlanned, termPlan]);

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          context,
        }),
        signal: ctrl.signal,
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const reader  = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: acc },
        ]);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  };

  const executeAction = (action: ChatAction, term?: string) => {
    const key = JSON.stringify(action);
    if (action.type === "markCompleted") {
      toggleCompleted(action.code);
    } else if (action.type === "markPlanned") {
      if (term) {
        moveCourseToTerm(action.code, term);
      } else {
        togglePlanned(action.code);
      }
    } else if (action.type === "addToTerm" && action.term) {
      moveCourseToTerm(action.code, action.term);
    }
    setConfirmedActions((prev) => new Set([...prev, key]));
    setPendingAction(null);
    setPendingTerm("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#080D1A" }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{
        padding:      "14px 20px",
        borderBottom: "1px solid #1E293B",
        display:      "flex",
        alignItems:   "center",
        gap:          10,
        flexShrink:   0,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "rgba(255,213,79,0.12)",
          border:     "1px solid rgba(255,213,79,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14,
        }}>
          ✦
        </div>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#FFD54F" }}>
            GradGraph Assistant
          </div>
          <div style={{ fontSize: 10, color: "#475569" }}>
            Ask about your {activeMajor?.name ?? "degree"} requirements
          </div>
        </div>
      </div>

      {/* ── Messages ───────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 0" }}>

        {messages.length === 0 && (
          <div style={{ paddingBottom: 20 }}>
            <p style={{ fontSize: 12, color: "#475569", marginBottom: 16, lineHeight: 1.6 }}>
              Ask me anything about your degree requirements, course prerequisites, or how to plan your schedule.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  style={{
                    textAlign:    "left",
                    padding:      "8px 12px",
                    borderRadius: 8,
                    border:       "1px solid #1E293B",
                    background:   "rgba(15,23,42,0.6)",
                    color:        "#64748B",
                    fontSize:     11,
                    cursor:       "pointer",
                    fontFamily:   "inherit",
                    transition:   "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#FFD54F40";
                    e.currentTarget.style.color = "#94A3B8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1E293B";
                    e.currentTarget.style.color = "#64748B";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg}
            isStreaming={streaming && i === messages.length - 1 && msg.role === "assistant"}
            confirmedActions={confirmedActions}
            onActionRequest={setPendingAction}
          />
        ))}

        <div ref={bottomRef} style={{ height: 20 }} />
      </div>

      {/* ── Suggestion pills ───────────────────────────────────────────────── */}
      {messages.length > 0 && (
        <div style={{
          padding:    "8px 20px 0",
          flexShrink: 0,
          display:    "flex",
          gap:        6,
          flexWrap:   "wrap",
          borderTop:  "1px solid #1E293B",
        }}>
          {SUGGESTIONS.slice(0, 4).map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={streaming}
              style={{
                padding:      "3px 10px",
                borderRadius: 20,
                border:       "1px solid #1E293B",
                background:   "transparent",
                color:        "#475569",
                fontSize:     10,
                cursor:       streaming ? "default" : "pointer",
                fontFamily:   "inherit",
                transition:   "all 0.15s",
                whiteSpace:   "nowrap",
              }}
              onMouseEnter={(e) => { if (!streaming) { e.currentTarget.style.borderColor = "#FFD54F40"; e.currentTarget.style.color = "#94A3B8"; }}}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1E293B"; e.currentTarget.style.color = "#475569"; }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Input ──────────────────────────────────────────────────────────── */}
      <div style={{
        padding:      "8px 20px 16px",
        flexShrink:   0,
      }}>
        <div style={{
          display:      "flex",
          gap:          8,
          alignItems:   "flex-end",
          background:   "rgba(15,23,42,0.8)",
          border:       "1px solid #334155",
          borderRadius: 10,
          padding:      "8px 10px",
        }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about your degree requirements…"
            rows={1}
            style={{
              flex:       1,
              background: "none",
              border:     "none",
              outline:    "none",
              color:      "#E2E8F0",
              fontSize:   12,
              fontFamily: "'DM Mono', monospace",
              resize:     "none",
              lineHeight: 1.5,
              maxHeight:  120,
              overflowY:  "auto",
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || streaming}
            style={{
              padding:      "5px 10px",
              borderRadius: 6,
              border:       "none",
              background:   !input.trim() || streaming ? "#1E293B" : "#FFD54F",
              color:        !input.trim() || streaming ? "#334155" : "#0A0F1E",
              fontSize:     11,
              fontWeight:   600,
              cursor:       !input.trim() || streaming ? "default" : "pointer",
              fontFamily:   "inherit",
              flexShrink:   0,
              transition:   "all 0.15s",
            }}
          >
            {streaming ? "…" : "Send"}
          </button>
        </div>
        <div style={{ fontSize: 9, color: "#334155", marginTop: 6, textAlign: "center" }}>
          Enter to send · Shift+Enter for newline · Only UW degree topics
        </div>
      </div>

      {/* ── Confirmation modal ─────────────────────────────────────────────── */}
      {pendingAction && (
        <div
          style={{
            position:   "fixed",
            inset:      0,
            zIndex:     500,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => { setPendingAction(null); setPendingTerm(""); }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="slide-in"
            style={{
              background:   "#0F172A",
              border:       "1px solid rgba(255,213,79,0.3)",
              borderRadius: 12,
              padding:      24,
              width:        320,
              boxShadow:    "0 25px 50px rgba(0,0,0,0.8)",
            }}
          >
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#FFD54F", marginBottom: 8 }}>
              Confirm Change
            </div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 16, lineHeight: 1.5 }}>
              {pendingAction.label}
            </div>

            {/* Term picker for markPlanned */}
            {pendingAction.type === "markPlanned" && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: "#475569", marginBottom: 8 }}>
                  Add to term (optional — also places it in the Term Planner):
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
                  {(["1A","1B","2A","2B","3A","3B","4A","4B"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setPendingTerm(pendingTerm === t ? "" : t)}
                      style={{
                        padding:      "5px 4px",
                        borderRadius: 5,
                        border:       `1px solid ${pendingTerm === t ? "#60A5FA" : "#334155"}`,
                        background:   pendingTerm === t ? "#60A5FA1A" : "transparent",
                        color:        pendingTerm === t ? "#60A5FA" : "#64748B",
                        fontSize:     10,
                        cursor:       "pointer",
                        fontFamily:   "inherit",
                        transition:   "all 0.12s",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => executeAction(pendingAction, pendingTerm || undefined)}
                style={{
                  flex:         1,
                  padding:      "8px",
                  borderRadius: 6,
                  border:       "none",
                  background:   "#FFD54F",
                  color:        "#0A0F1E",
                  fontSize:     11,
                  fontWeight:   700,
                  cursor:       "pointer",
                  fontFamily:   "inherit",
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => { setPendingAction(null); setPendingTerm(""); }}
                style={{
                  flex:         1,
                  padding:      "8px",
                  borderRadius: 6,
                  border:       "1px solid #334155",
                  background:   "transparent",
                  color:        "#64748B",
                  fontSize:     11,
                  cursor:       "pointer",
                  fontFamily:   "inherit",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MarkdownComponents ────────────────────────────────────────────────────────

const MD_COMPONENTS = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p style={{ margin: "0 0 8px", lineHeight: 1.65 }}>{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong style={{ color: "#FFD54F", fontWeight: 600 }}>{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em style={{ color: "#94A3B8", fontStyle: "italic" }}>{children}</em>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul style={{ margin: "4px 0 8px", paddingLeft: 16, listStyleType: "none" }}>{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol style={{ margin: "4px 0 8px", paddingLeft: 18 }}>{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li style={{ margin: "3px 0", display: "flex", gap: 6, alignItems: "flex-start" }}>
      <span style={{ color: "#FFD54F", flexShrink: 0, marginTop: 1 }}>·</span>
      <span>{children}</span>
    </li>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#FFD54F", margin: "12px 0 6px" }}>{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#E2E8F0", margin: "10px 0 5px" }}>{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8", margin: "8px 0 4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{children}</h3>
  ),
  code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) =>
    inline ? (
      <code style={{
        background:   "rgba(255,213,79,0.1)",
        border:       "1px solid rgba(255,213,79,0.2)",
        borderRadius: 4,
        padding:      "1px 5px",
        fontSize:     11,
        color:        "#FFD54F",
        fontFamily:   "'DM Mono', monospace",
      }}>{children}</code>
    ) : (
      <pre style={{
        background:   "rgba(0,0,0,0.3)",
        border:       "1px solid #1E293B",
        borderRadius: 6,
        padding:      "8px 12px",
        margin:       "6px 0",
        overflowX:    "auto",
        fontSize:     11,
        fontFamily:   "'DM Mono', monospace",
        color:        "#CBD5E1",
      }}>
        <code>{children}</code>
      </pre>
    ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote style={{
      borderLeft:  "2px solid #FFD54F40",
      paddingLeft: 10,
      margin:      "6px 0",
      color:       "#64748B",
      fontStyle:   "italic",
    }}>{children}</blockquote>
  ),
  hr: () => <hr style={{ border: "none", borderTop: "1px solid #1E293B", margin: "10px 0" }} />,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "#60A5FA", textDecoration: "underline" }}>{children}</a>
  ),
} as Record<string, React.ComponentType<Record<string, unknown>>>;

// ── MessageBubble ─────────────────────────────────────────────────────────────

function MessageBubble({
  message,
  isStreaming,
  confirmedActions,
  onActionRequest,
}: {
  message:          Message;
  isStreaming:      boolean;
  confirmedActions: Set<string>;
  onActionRequest:  (action: ChatAction) => void;
}) {
  const isUser = message.role === "user";
  const segments = useMemo(() => parseContent(message.content), [message.content]);

  return (
    <div style={{
      marginBottom:   16,
      display:        "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
    }}>
      <div style={{
        maxWidth:     "88%",
        padding:      isUser ? "8px 12px" : "10px 14px",
        borderRadius: isUser ? "12px 12px 2px 12px" : "2px 12px 12px 12px",
        background:   isUser ? "rgba(255,213,79,0.12)" : "rgba(15,23,42,0.8)",
        border:       `1px solid ${isUser ? "rgba(255,213,79,0.25)" : "#1E293B"}`,
        fontSize:     12,
        lineHeight:   1.6,
        color:        isUser ? "#FFD54F" : "#CBD5E1",
        wordBreak:    "break-word",
      }}>
        {isUser ? (
          <span style={{ fontFamily: "inherit" }}>{message.content}</span>
        ) : (
          <>
            {segments.map((seg, i) => {
              if (seg.kind === "text") {
                return (
                  <ReactMarkdown key={i} components={MD_COMPONENTS}>
                    {seg.text}
                  </ReactMarkdown>
                );
              }

              const actionKey = JSON.stringify(seg.action);
              const confirmed = confirmedActions.has(actionKey);

              return (
                <div
                  key={i}
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          6,
                    margin:       "6px 0",
                    padding:      "7px 12px",
                    borderRadius: 8,
                    border:       `1px solid ${confirmed ? "#4ADE8050" : "rgba(255,213,79,0.3)"}`,
                    background:   confirmed ? "rgba(74,222,128,0.08)" : "rgba(255,213,79,0.06)",
                    cursor:       confirmed ? "default" : "pointer",
                    fontSize:     11,
                    color:        confirmed ? "#4ADE80" : "#FFD54F",
                    transition:   "all 0.15s",
                  }}
                  onClick={() => !confirmed && onActionRequest(seg.action)}
                >
                  <span style={{ fontSize: 13 }}>{confirmed ? "✓" : "⚡"}</span>
                  <span style={{ flex: 1 }}>{seg.action.label}</span>
                  {!confirmed && (
                    <span style={{ fontSize: 9, color: "#64748B" }}>click to apply</span>
                  )}
                </div>
              );
            })}
            {isStreaming && (
              <span style={{ opacity: 0.4, fontFamily: "'DM Mono', monospace" }}>▌</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
