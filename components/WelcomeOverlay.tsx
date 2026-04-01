"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MajorId } from "../types";
import { useStore } from "../lib/store";

// ── Major options ─────────────────────────────────────────────────────────────

const MAJOR_OPTIONS: {
  id: MajorId;
  label: string;
  fullName: string;
  color: string;
  desc: string;
  courses: string;
}[] = [
  {
    id:       "cs",
    label:    "CS",
    fullName: "Computer Science",
    color:    "#EC4899",
    desc:     "Algorithms, systems, theory, and software — the broadest technical degree at Waterloo.",
    courses:  "CS · MATH · STAT",
  },
  {
    id:       "se",
    label:    "SE",
    fullName: "Software Engineering",
    color:    "#A855F7",
    desc:     "Software design, reliability, and engineering process in the Faculty of Engineering.",
    courses:  "CS · ECE · SE · MATH",
  },
  {
    id:       "ds",
    label:    "DS",
    fullName: "Data Science",
    color:    "#80DEEA",
    desc:     "Statistics and computation at scale — choose the Math-based or CS-based stream.",
    courses:  "CS · STAT · MATH",
  },
  {
    id:       "math",
    label:    "MATH",
    fullName: "Mathematics",
    color:    "#FCD34D",
    desc:     "Pure Math, Applied Math, Statistics, CO, Actuarial Science and more — 15 specializations.",
    courses:  "MATH · STAT · CO · PMATH",
  },
];

// ── Floating node data (matches cover.html vibe) ──────────────────────────────

const NODE_DATA = [
  { code: "CS 245",   title: "Logic & Computation",  badge: "REQUIRED", color: "#FFD54F" },
  { code: "MATH 239", title: "Combinatorics",         badge: "REQUIRED", color: "#FCD34D" },
  { code: "STAT 230", title: "Probability",           badge: "REQUIRED", color: "#80DEEA" },
  { code: "CS 341",   title: "Algorithms",            badge: "CORE",     color: "#FFD54F" },
  { code: "ECE 124",  title: "Digital Circuits",      badge: "REQUIRED", color: "#F48FB1" },
  { code: "CO 250",   title: "Optimization",          badge: "ELECTIVE", color: "#60A5FA" },
  { code: "CS 486",   title: "Artificial Intelligence",badge:"ELECTIVE", color: "#A78BFA" },
  { code: "STAT 443", title: "Forecasting",           badge: "PLANNED",  color: "#80DEEA" },
  { code: "CS 348",   title: "Databases",             badge: "PLANNED",  color: "#FFD54F" },
  { code: "PMATH 351",title: "Real Analysis",         badge: "ELECTIVE", color: "#FCD34D" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function WelcomeOverlay() {
  const { setActiveMajor } = useStore();

  // SSR-safe: don't render on server, check localStorage after mount
  const [status, setStatus] = useState<"loading" | "visible" | "hidden">("loading");
  // const [visible,  setVisible]  = useState(false);
  const [selected, setSelected] = useState<MajorId>("cs");
  const [exiting,  setExiting]  = useState(false);
  const nodesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.removeAttribute("data-welcome");
    if (!localStorage.getItem("gradgraph_seen")) {
      setStatus("visible");
    } else {
      setStatus("hidden");
    }
  }, []);

  // Spawn floating nodes
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
        background: rgba(15,23,42,0.85);
        border: 1.5px solid ${d.color}40;
        display: flex; flex-direction: column;
        padding: 10px 14px; gap: 4px;
        left: ${Math.random() * 85 + 5}%;
        bottom: ${Math.random() * 30 - 10}%;
        opacity: 0;
        pointer-events: none;
        animation: gradgraph-float ${16 + Math.random() * 12}s linear ${Math.random() * -8}s 1 forwards;
      `;
      el.innerHTML = `
        <div style="font-family:'DM Mono',monospace;font-size:12px;font-weight:500;color:${d.color}">${d.code}</div>
        <div style="font-size:9px;color:#475569">${d.title}</div>
        <div style="font-size:7px;border:1px solid ${d.color}60;border-radius:3px;padding:1px 4px;width:fit-content;margin-top:2px;color:${d.color}">${d.badge}</div>
      `;
      layer.appendChild(el);
      setTimeout(() => el.remove(), 28000);
    }

    // Stagger initial nodes
    for (let i = 0; i < 8; i++) setTimeout(spawn, i * 900);
    const interval = setInterval(spawn, 1800);
    return () => clearInterval(interval);
  }, [status]);

  function handleStart() {
    setActiveMajor(selected);
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

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes gradgraph-float {
          0%   { opacity: 0; transform: translateY(0px); }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.45; }
          100% { opacity: 0; transform: translateY(-120px) translateX(15px); }
        }
        @keyframes gg-blob-pulse {
          from { opacity: 0.12; transform: scale(1); }
          to   { opacity: 0.22; transform: scale(1.08); }
        }
        @keyframes gg-grid-drift {
          from { background-position: 0 0; }
          to   { background-position: 60px 60px; }
        }
        @keyframes gg-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gg-fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .gg-major-card:hover {
          transform: translateY(-3px) !important;
        }
      `}</style>

      {/* Full-screen overlay */}
      <div style={{
        position:   "fixed",
        inset:      0,
        zIndex:     1000,
        background: "#060B14",
        overflow:   "hidden",
        animation:  exiting ? "gg-fade-out 0.5s ease forwards" : undefined,
      }}>

        {/* Animated grid */}
        <div style={{
          position:        "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg,rgba(0,229,255,0.04) 1px, transparent 1px)",
          backgroundSize:  "60px 60px",
          animation:       "gg-grid-drift 40s linear infinite",
        }} />

        {/* Glow blobs */}
        <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:"#FFD54F", filter:"blur(120px)", opacity:0.15, top:-200, left:-100, animation:"gg-blob-pulse 8s ease-in-out infinite alternate" }} />
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"#00E5FF", filter:"blur(120px)", opacity:0.12, top:400, right:-80, animation:"gg-blob-pulse 8s ease-in-out infinite alternate", animationDelay:"-3s" }} />
        <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"#4ADE80", filter:"blur(120px)", opacity:0.10, bottom:-100, left:"40%", animation:"gg-blob-pulse 8s ease-in-out infinite alternate", animationDelay:"-6s" }} />

        {/* Floating node layer */}
        <div ref={nodesRef} style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }} />

        {/* Content */}
        <div style={{
          position:       "absolute", inset: 0,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          gap:            40,
          padding:        "0 24px",
          zIndex:         10,
        }}>

          {/* Badge */}
          <div style={{
            display:      "inline-flex", alignItems: "center", gap: 10,
            background:   "rgba(255,213,79,0.08)",
            border:       "1px solid rgba(255,213,79,0.25)",
            borderRadius: 40,
            padding:      "6px 18px 6px 10px",
            animation:    "gg-fade-up 0.7s ease 0.1s both",
          }}>
            <div style={{
              width:10, height:10, borderRadius:"50%",
              background:"#FFD54F",
            }} />
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#FFD54F", letterSpacing:"0.1em" }}>
              UNIVERSITY OF WATERLOO
            </span>
          </div>

          {/* Wordmark */}
          <div style={{ textAlign:"center", animation:"gg-fade-up 0.7s ease 0.2s both" }}>
            <div style={{
              fontFamily:    "'Syne', sans-serif",
              fontSize:      "clamp(42px, 6vw, 72px)",
              fontWeight:    900,
              letterSpacing: "-2px",
              lineHeight:    1,
              color:         "#FFD54F",
            }}>
              UW<span style={{ color:"#60A5FA" }}>GRAD</span>GRAPH
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize:   13,
              color:      "#475569",
              marginTop:  10,
              letterSpacing: "0.05em",
            }}>
              Visualize your degree. Plan every term. Know what's next.
            </div>
          </div>

          {/* Major selector */}
          <div style={{ animation:"gg-fade-up 0.7s ease 0.35s both", width:"100%", maxWidth:820 }}>
            <div style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      10,
              color:         "#475569",
              letterSpacing: "0.12em",
              textAlign:     "center",
              marginBottom:  14,
              textTransform: "uppercase",
            }}>
              Choose your program to get started
            </div>

            <div style={{
              display:             "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap:                 12,
            }}>
              {MAJOR_OPTIONS.map((m) => {
                const active = selected === m.id;
                return (
                  <button
                    key={m.id}
                    className="gg-major-card"
                    onClick={() => setSelected(m.id)}
                    style={{
                      background:    active ? `${m.color}12` : "rgba(15,23,42,0.7)",
                      border:        `1.5px solid ${active ? m.color : "rgba(255,255,255,0.07)"}`,
                      borderRadius:  12,
                      padding:       "20px 18px",
                      cursor:        "pointer",
                      textAlign:     "left",
                      transition:    "all 0.18s",
                      display:       "flex",
                      flexDirection: "column",
                      gap:           8,
                      backdropFilter:"blur(8px)",
                      transform:     "translateY(0)",
                      outline:       "none",
                    }}
                  >
                    {/* Label + check */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span style={{
                        fontFamily:    "'Syne', sans-serif",
                        fontSize:      22,
                        fontWeight:    800,
                        color:         active ? m.color : "#94A3B8",
                        letterSpacing: "-0.5px",
                      }}>
                        {m.label}
                      </span>
                      {active && (
                        <div style={{
                          width:10, height:10, borderRadius:"50%",
                          background: m.color,
                          boxShadow:  `0 0 8px ${m.color}88`,
                        }} />
                      )}
                    </div>

                    {/* Full name */}
                    <div style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize:   11,
                      color:      active ? "#CBD5E1" : "#475569",
                      fontWeight: 500,
                    }}>
                      {m.fullName}
                    </div>

                    {/* Description */}
                    <div style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize:   10,
                      color:      "#334155",
                      lineHeight: 1.5,
                    }}>
                      {m.desc}
                    </div>

                    {/* Subject tags */}
                    <div style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize:   9,
                      color:      active ? m.color : "#334155",
                      marginTop:  4,
                      letterSpacing: "0.08em",
                    }}>
                      {m.courses}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Get Started button */}
          <div style={{ animation:"gg-fade-up 0.7s ease 0.5s both" }}>
            <button
              onClick={handleStart}
              style={{
                padding:       "14px 48px",
                borderRadius:  10,
                border:        "none",
                background:    MAJOR_OPTIONS.find(m => m.id === selected)?.color ?? "#FFD54F",
                color:         "#0A0F1E",
                fontFamily:    "'Syne', sans-serif",
                fontWeight:    800,
                fontSize:      15,
                letterSpacing: "0.04em",
                cursor:        "pointer",
                transition:    "all 0.18s",
                boxShadow:     `0 0 32px ${MAJOR_OPTIONS.find(m => m.id === selected)?.color ?? "#FFD54F"}55`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              Get Started →
            </button>
          </div>

          {/* Footer note */}
          <div style={{
            fontFamily:   "'DM Mono', monospace",
            fontSize:     10,
            color:        "#1E293B",
            letterSpacing:"0.06em",
            animation:    "gg-fade-up 0.7s ease 0.6s both",
          }}>
            You can switch programs anytime from the header.
          </div>

        </div>
      </div>
    </>
  );
}
