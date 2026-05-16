"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { FacultyId, MajorId, SubMajorId } from "../types";
import { useStore } from "../lib/store";
import { FACULTY_LIST, FACULTIES } from "../data/faculties";
import { MAJOR_META, SUB_MAJOR_REGISTRY } from "../data/majors";

// ── Floating node data ────────────────────────────────────────────────────────

const NODE_DATA = [
  { code: "CS 245",    title: "Logic & Computation",     badge: "REQUIRED", color: "#FFD54F" },
  { code: "MATH 239",  title: "Combinatorics",           badge: "REQUIRED", color: "#FCD34D" },
  { code: "STAT 230",  title: "Probability",             badge: "REQUIRED", color: "#80DEEA" },
  { code: "CS 341",    title: "Algorithms",              badge: "CORE",     color: "#FFD54F" },
  { code: "ECE 124",   title: "Digital Circuits",        badge: "REQUIRED", color: "#F48FB1" },
  { code: "CO 250",    title: "Optimization",            badge: "ELECTIVE", color: "#60A5FA" },
  { code: "CS 486",    title: "Artificial Intelligence", badge: "ELECTIVE", color: "#A78BFA" },
  { code: "STAT 443",  title: "Forecasting",             badge: "PLANNED",  color: "#80DEEA" },
  { code: "CS 348",    title: "Databases",               badge: "PLANNED",  color: "#FFD54F" },
  { code: "PMATH 351", title: "Real Analysis",           badge: "ELECTIVE", color: "#FCD34D" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function WelcomeOverlay() {
  const { setActiveMajor, setActiveSubMajor } = useStore();

  const [status,      setStatus]      = useState<"loading" | "visible" | "hidden">("loading");
  const [exiting,     setExiting]     = useState(false);
  const [selFaculty,  setSelFaculty]  = useState<FacultyId>("mathematics");
  const [selMajor,    setSelMajor]    = useState<MajorId>("cs");
  const [selSubMajor, setSelSubMajor] = useState<SubMajorId | null>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.removeAttribute("data-welcome");
    if (!localStorage.getItem("gradgraph_seen")) {
      setStatus("visible");
    } else {
      setStatus("hidden");
    }
  }, []);

  // Floating background nodes — kept at low opacity so they don't compete with UI
  useEffect(() => {
    if (status === "hidden") return;
    const layer = nodesRef.current;
    if (!layer) return;

    function spawn() {
      if (!layer) return;
      const d = NODE_DATA[Math.floor(Math.random() * NODE_DATA.length)];
      const el = document.createElement("div");
      el.style.cssText = `
        position: absolute;
        border-radius: 10px;
        background: rgba(6,11,20,0.6);
        border: 1px solid ${d.color}25;
        display: flex; flex-direction: column;
        padding: 10px 14px; gap: 4px;
        left: ${Math.random() * 85 + 5}%;
        bottom: ${Math.random() * 30 - 10}%;
        opacity: 0;
        pointer-events: none;
        animation: gradgraph-float ${16 + Math.random() * 12}s linear ${Math.random() * -8}s 1 forwards;
      `;
      el.innerHTML = `
        <div style="font-family:'DM Mono',monospace;font-size:12px;font-weight:500;color:${d.color}88">${d.code}</div>
        <div style="font-size:9px;color:#334155">${d.title}</div>
        <div style="font-size:7px;border:1px solid ${d.color}30;border-radius:3px;padding:1px 4px;width:fit-content;margin-top:2px;color:${d.color}66">${d.badge}</div>
      `;
      layer.appendChild(el);
      setTimeout(() => el.remove(), 28000);
    }

    for (let i = 0; i < 6; i++) setTimeout(spawn, i * 1100);
    const interval = setInterval(spawn, 2200);
    return () => clearInterval(interval);
  }, [status]);

  function handleFacultySelect(facultyId: FacultyId) {
    const faculty = FACULTIES[facultyId];
    const firstMajor = faculty?.majorIds[0] ?? "cs";
    setSelFaculty(facultyId);
    setSelMajor(firstMajor);
    setSelSubMajor(null);
  }

  function handleMajorSelect(majorId: MajorId) {
    setSelMajor(majorId);
    setSelSubMajor(null);
  }

  function handleStart() {
    const subMajorMap = SUB_MAJOR_REGISTRY[selMajor];
    const resolvedSubMajor = selSubMajor ?? (subMajorMap ? Object.keys(subMajorMap)[0] : null);
    setActiveMajor(selMajor);
    if (resolvedSubMajor) setActiveSubMajor(resolvedSubMajor);
    setExiting(true);
    setTimeout(() => {
      localStorage.setItem("gradgraph_seen", "1");
      setStatus("hidden");
    }, 500);
  }

  if (status === "loading") {
    return <div style={{ position: "fixed", inset: 0, background: "#060B14", zIndex: 9999 }} />;
  }
  if (status === "hidden") return null;

  const faculty      = FACULTIES[selFaculty];
  const majorMeta    = MAJOR_META[selMajor];
  const subMajorMap  = SUB_MAJOR_REGISTRY[selMajor];
  const subMajorKeys = subMajorMap ? Object.keys(subMajorMap) : [];
  const accentColor  = majorMeta?.color ?? faculty.color;

  return (
    <>
      <style>{`
        @keyframes gradgraph-float {
          0%   { opacity: 0; transform: translateY(0px); }
          10%  { opacity: 0.35; }
          90%  { opacity: 0.2; }
          100% { opacity: 0; transform: translateY(-100px) translateX(10px); }
        }
        @keyframes gg-blob-pulse {
          from { opacity: 0.10; transform: scale(1); }
          to   { opacity: 0.18; transform: scale(1.08); }
        }
        @keyframes gg-grid-drift {
          from { background-position: 0 0; }
          to   { background-position: 60px 60px; }
        }
        @keyframes gg-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gg-fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .gg-fac-btn:hover  { border-color: var(--btn-color) !important; background: color-mix(in srgb, var(--btn-color) 10%, transparent) !important; }
        .gg-prog-btn:hover { border-color: var(--btn-color) !important; background: color-mix(in srgb, var(--btn-color) 10%, transparent) !important; }
        /* Scroll rows — centered when content fits, scroll when it overflows */
        .gg-hscroll { overflow-x: auto; overflow-y: visible; }
        .gg-hscroll::-webkit-scrollbar { height: 3px; }
        .gg-hscroll::-webkit-scrollbar-track { background: transparent; }
        .gg-hscroll::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 4px; }
        .gg-hscroll-inner {
          display: flex;
          gap: 10px;
          width: max-content;
          min-width: 100%;
          justify-content: center;
          padding-bottom: 4px;
        }
      `}</style>

      <div style={{
        position:   "fixed",
        inset:      0,
        zIndex:     1000,
        background: "#060B14",
        overflow:   "hidden",
        animation:  exiting ? "gg-fade-out 0.5s ease forwards" : undefined,
      }}>
        {/* Grid */}
        <div style={{
          position:        "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(0,229,255,0.03) 1px, transparent 1px)",
          backgroundSize:  "60px 60px",
          animation:       "gg-grid-drift 40s linear infinite",
        }} />

        {/* Glow blobs */}
        <div style={{ position:"absolute", zIndex:0, width:700, height:700, borderRadius:"50%", background:"#FFD54F", filter:"blur(140px)", opacity:0.10, top:-200, left:-100, animation:"gg-blob-pulse 8s ease-in-out infinite alternate" }} />
        <div style={{ position:"absolute", zIndex:0, width:500, height:500, borderRadius:"50%", background:"#00E5FF", filter:"blur(140px)", opacity:0.08, top:400, right:-80, animation:"gg-blob-pulse 8s ease-in-out infinite alternate", animationDelay:"-3s" }} />
        <div style={{ position:"absolute", zIndex:0, width:400, height:400, borderRadius:"50%", background:"#4ADE80", filter:"blur(140px)", opacity:0.06, bottom:-100, left:"40%", animation:"gg-blob-pulse 8s ease-in-out infinite alternate", animationDelay:"-6s" }} />

        {/* Floating nodes — z-index 1, well below content */}
        <div ref={nodesRef} style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none", overflow:"hidden" }} />

        {/* Scrollable content column */}
        <div style={{
          position:      "absolute", inset: 0,
          zIndex:        10,
          overflowY:     "auto",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          padding:       "48px 32px",
          gap:           28,
        }}>

          {/* Badge */}
          <div style={{
            display:      "inline-flex", alignItems: "center", gap: 10, flexShrink: 0,
            background:   "rgba(255,213,79,0.07)",
            border:       "1px solid rgba(255,213,79,0.2)",
            borderRadius: 40,
            padding:      "6px 18px 6px 10px",
            animation:    "gg-fade-up 0.6s ease 0.05s both",
          }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#FFD54F" }} />
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#FFD54F", letterSpacing:"0.12em" }}>
              UNIVERSITY OF WATERLOO
            </span>
          </div>

          {/* Wordmark */}
          <div style={{ textAlign:"center", animation:"gg-fade-up 0.6s ease 0.12s both", flexShrink:0 }}>
            <div style={{
              fontFamily:    "'Syne', sans-serif",
              fontSize:      "clamp(38px, 5vw, 64px)",
              fontWeight:    900,
              letterSpacing: "-2px",
              lineHeight:    1,
              color:         "#FFD54F",
            }}>
              UW<span style={{ color:"#60A5FA" }}>GRAD</span>GRAPH
            </div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#4B5563", marginTop:8, letterSpacing:"0.05em" }}>
              Visualize your degree. Plan every term. Know what's next.
            </div>
          </div>

          {/* ── Step 1: Faculty ───────────────────────────────────────────── */}
          <div style={{ width:"100%", maxWidth:860, flexShrink:0, animation:"gg-fade-up 0.6s ease 0.22s both" }}>
            <StepLabel>1 — Choose your faculty</StepLabel>
            <div className="gg-hscroll">
              <div className="gg-hscroll-inner">
                {FACULTY_LIST.map((fac) => {
                  const active = selFaculty === fac.id;
                  return (
                    <button
                      key={fac.id}
                      className="gg-fac-btn"
                      onClick={() => handleFacultySelect(fac.id)}
                      style={{
                        "--btn-color": fac.color,
                        flexShrink:    0,
                        width:         250,
                        background:    active ? `${fac.color}18` : "rgba(13,19,33,0.9)",
                        border:        `1.5px solid ${active ? fac.color : "#1E293B"}`,
                        borderRadius:  12,
                        padding:       "18px 20px",
                        cursor:        "pointer",
                        textAlign:     "left",
                        transition:    "border-color 0.18s, background 0.18s",
                        display:       "flex",
                        flexDirection: "column",
                        gap:           8,
                        outline:       "none",
                      } as React.CSSProperties}
                    >
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color: active ? fac.color : "#94A3B8" }}>
                          {fac.shortName}
                        </span>
                        {active && (
                          <div style={{ width:7, height:7, borderRadius:"50%", background:fac.color, boxShadow:`0 0 8px ${fac.color}` }} />
                        )}
                      </div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color: active ? "#94A3B8" : "#64748B", lineHeight:1.6 }}>
                        {fac.description}
                      </div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color: active ? `${fac.color}CC` : "#475569", letterSpacing:"0.08em" }}>
                        {fac.subjects}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Step 2: Program ───────────────────────────────────────────── */}
          <div style={{ width:"100%", maxWidth:860, flexShrink:0, animation:"gg-fade-up 0.6s ease 0.32s both" }}>
            <StepLabel>2 — Choose your program</StepLabel>
            <div className="gg-hscroll">
              <div className="gg-hscroll-inner">
                {faculty.majorIds.map((majorId) => {
                  const meta        = MAJOR_META[majorId];
                  const active      = selMajor === majorId;
                  const hasSubMajors = !!SUB_MAJOR_REGISTRY[majorId];
                  if (!meta) return null;
                  return (
                    <button
                      key={majorId}
                      className="gg-prog-btn"
                      onClick={() => handleMajorSelect(majorId)}
                      style={{
                        "--btn-color": meta.color,
                        flexShrink:    0,
                        width:         210,
                        background:    active ? `${meta.color}18` : "rgba(13,19,33,0.9)",
                        border:        `1.5px solid ${active ? meta.color : "#1E293B"}`,
                        borderRadius:  12,
                        padding:       "16px 18px",
                        cursor:        "pointer",
                        textAlign:     "left",
                        transition:    "border-color 0.18s, background 0.18s",
                        display:       "flex",
                        flexDirection: "column",
                        gap:           6,
                        outline:       "none",
                      } as React.CSSProperties}
                    >
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color: active ? meta.color : "#94A3B8", letterSpacing:"-0.5px" }}>
                          {meta.label}
                        </span>
                        {active && (
                          <div style={{ width:7, height:7, borderRadius:"50%", background:meta.color, boxShadow:`0 0 8px ${meta.color}` }} />
                        )}
                      </div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color: active ? "#CBD5E1" : "#94A3B8", fontWeight:500 }}>
                        {meta.fullName}
                      </div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color: active ? "#64748B" : "#475569", lineHeight:1.6 }}>
                        {meta.description}
                      </div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:"0.07em", color: active ? `${meta.color}CC` : "#475569", marginTop:2 }}>
                        {hasSubMajors && active
                          ? `${Object.keys(SUB_MAJOR_REGISTRY[majorId]).length} specializations →`
                          : meta.subjects}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Step 3: Specialization (conditional) ──────────────────────── */}
          {subMajorKeys.length > 0 && (
            <div style={{ width:"100%", maxWidth:860, flexShrink:0, animation:"gg-fade-up 0.4s ease both" }}>
              <StepLabel>3 — Choose your specialization</StepLabel>
              <div style={{ position:"relative", display:"inline-flex", alignItems:"center" }}>
                <select
                  value={selSubMajor ?? subMajorKeys[0]}
                  onChange={(e) => setSelSubMajor(e.target.value)}
                  style={{
                    appearance:   "none",
                    background:   "rgba(13,19,33,0.95)",
                    border:       `1.5px solid ${accentColor}60`,
                    borderRadius: 8,
                    color:        "#E2E8F0",
                    fontSize:     12,
                    padding:      "9px 40px 9px 14px",
                    cursor:       "pointer",
                    fontFamily:   "'DM Mono', monospace",
                    outline:      "none",
                    minWidth:     280,
                  }}
                >
                  {subMajorKeys.map((key) => (
                    <option key={key} value={key} style={{ background:"#0D1321", color:"#E2E8F0" }}>
                      {subMajorMap[key].name}
                    </option>
                  ))}
                </select>
                <div style={{ position:"absolute", right:13, pointerEvents:"none", fontSize:9, color:accentColor }}>▼</div>
              </div>
            </div>
          )}

          {/* ── Get Started ───────────────────────────────────────────────── */}
          <div style={{ flexShrink:0, animation:"gg-fade-up 0.6s ease 0.44s both" }}>
            <button
              onClick={handleStart}
              style={{
                padding:       "14px 52px",
                borderRadius:  10,
                border:        "none",
                background:    accentColor,
                color:         "#060B14",
                fontFamily:    "'Syne', sans-serif",
                fontWeight:    800,
                fontSize:      15,
                letterSpacing: "0.04em",
                cursor:        "pointer",
                transition:    "transform 0.15s, box-shadow 0.15s",
                boxShadow:     `0 0 28px ${accentColor}44`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 40px ${accentColor}66`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 28px ${accentColor}44`;
              }}
            >
              Get Started →
            </button>
          </div>

          {/* Footer */}
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#334155", letterSpacing:"0.06em", flexShrink:0, animation:"gg-fade-up 0.6s ease 0.52s both", paddingBottom:8 }}>
            You can switch programs anytime from the header.
          </div>

        </div>
      </div>
    </>
  );
}

// ── Helper ────────────────────────────────────────────────────────────────────

function StepLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily:    "'DM Mono', monospace",
      fontSize:      9,
      color:         "#475569",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      marginBottom:  10,
    }}>
      {children}
    </div>
  );
}
