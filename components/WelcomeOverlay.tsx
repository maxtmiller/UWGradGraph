"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import type { MajorId, SubMajorId } from "../types";
import { useStore } from "../lib/store";
import { FACULTY_LIST, FACULTIES } from "../data/faculties";
import { MAJOR_META, SUB_MAJOR_REGISTRY } from "../data/majors";
import { SHARE_HASH_PREFIX } from "../lib/share";

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

function subscribeWelcomeSeen() {
  const notify = () => undefined;
  window.addEventListener("hashchange", notify);
  return () => window.removeEventListener("hashchange", notify);
}

function getWelcomeSeenSnapshot() {
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  if (hash.startsWith(SHARE_HASH_PREFIX)) return "hidden";
  return localStorage.getItem("gradgraph_seen") ? "hidden" : "visible";
}

function getWelcomeSeenServerSnapshot() {
  return "checking";
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WelcomeOverlay() {
  const { setActiveMajor, setActiveSubMajor } = useStore();

  const storedStatus = useSyncExternalStore(
    subscribeWelcomeSeen,
    getWelcomeSeenSnapshot,
    getWelcomeSeenServerSnapshot,
  );
  const [dismissed,   setDismissed]   = useState(false);
  const status = dismissed ? "hidden" : storedStatus;
  const [exiting,     setExiting]     = useState(false);
  const [facIdx,      setFacIdx]      = useState(0);           // index into FACULTY_LIST
  const [slideDir,    setSlideDir]    = useState<"left"|"right"|null>(null); // animation direction
  const [animKey,     setAnimKey]     = useState(0);           // bumped to retrigger animation
  const [selMajor,    setSelMajor]    = useState<MajorId>("cs");
  const [selSubMajor, setSelSubMajor] = useState<SubMajorId | null>(null);
  const [majorSearch, setMajorSearch] = useState("");
  const nodesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.documentElement.removeAttribute("data-welcome");
  }, []);

  // Floating background nodes
  useEffect(() => {
    if (status === "hidden") return;
    const layer = nodesRef.current;
    if (!layer) return;
    function spawn() {
      if (!layer) return;
      const d = NODE_DATA[Math.floor(Math.random() * NODE_DATA.length)];
      const el = document.createElement("div");
      el.style.cssText = `
        position:absolute;border-radius:10px;background:rgba(6,11,20,0.6);
        border:1px solid ${d.color}25;display:flex;flex-direction:column;
        padding:10px 14px;gap:4px;left:${Math.random()*85+5}%;
        bottom:${Math.random()*30-10}%;opacity:0;pointer-events:none;
        animation:gradgraph-float ${16+Math.random()*12}s linear ${Math.random()*-8}s 1 forwards;
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

  const navigateFaculty = useCallback((dir: -1 | 1) => {
    const next = facIdx + dir;
    if (next < 0 || next >= FACULTY_LIST.length) return;
    setSlideDir(dir === 1 ? "left" : "right");
    setAnimKey((k) => k + 1);
    setFacIdx(next);
    const fac = FACULTIES[FACULTY_LIST[next].id];
    setSelMajor((fac?.majorIds[0] ?? "cs") as MajorId);
    setSelSubMajor(null);
    setMajorSearch("");
  }, [facIdx]);

  function handleMajorSelect(majorId: MajorId) {
    setSelMajor(majorId);
    setSelSubMajor(null);
    setMajorSearch("");
  }

  function handleStart() {
    const subMajorMap = SUB_MAJOR_REGISTRY[selMajor];
    const resolvedSubMajor = selSubMajor ?? (subMajorMap ? Object.keys(subMajorMap)[0] : null);
    setActiveMajor(selMajor);
    if (resolvedSubMajor) setActiveSubMajor(resolvedSubMajor);
    setExiting(true);
    setTimeout(() => {
      localStorage.setItem("gradgraph_seen", "1");
      setDismissed(true);
    }, 500);
  }

  if (status === "checking" || status === "hidden") return null;

  const facData      = FACULTY_LIST[facIdx];
  const faculty      = FACULTIES[facData.id];
  const majorMeta    = MAJOR_META[selMajor];
  const subMajorMap  = SUB_MAJOR_REGISTRY[selMajor];
  const subMajorKeys = subMajorMap ? Object.keys(subMajorMap) : [];
  const accentColor  = majorMeta?.color ?? facData.color;

  const query       = majorSearch.trim().toLowerCase();
  const allMajorIds = faculty.majorIds as MajorId[];
  const filteredIds = query
    ? allMajorIds.filter((id) => {
        const m = MAJOR_META[id];
        return (
          m?.label?.toLowerCase().includes(query) ||
          m?.fullName?.toLowerCase().includes(query) ||
          m?.description?.toLowerCase().includes(query)
        );
      })
    : allMajorIds;

  const canPrev = facIdx > 0;
  const canNext = facIdx < FACULTY_LIST.length - 1;

  // Slide-in keyframe name depends on direction
  const slideInAnim  = slideDir === "left"  ? "gg-slide-in-left"  : "gg-slide-in-right";

  return (
    <>
      <style>{`
        @keyframes gradgraph-float {
          0%   { opacity:0; transform:translateY(0); }
          10%  { opacity:0.35; }
          90%  { opacity:0.2; }
          100% { opacity:0; transform:translateY(-100px) translateX(10px); }
        }
        @keyframes gg-blob-pulse {
          from { opacity:0.10; transform:scale(1); }
          to   { opacity:0.18; transform:scale(1.08); }
        }
        @keyframes gg-grid-drift {
          from { background-position:0 0; }
          to   { background-position:60px 60px; }
        }
        @keyframes gg-fade-up {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes gg-fade-out { from{opacity:1} to{opacity:0} }
        @keyframes gg-shimmer {
          0%   { background-position:-200% center; }
          100% { background-position:200% center; }
        }
        @keyframes gg-dot-ping {
          0%   { transform:scale(1); opacity:1; }
          60%  { transform:scale(2.2); opacity:0; }
          100% { transform:scale(1); opacity:0; }
        }
        @keyframes gg-card-in {
          from { opacity:0; transform:translateY(8px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes gg-row-in {
          from { opacity:0; transform:translateX(-5px); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* Faculty card slide transitions */
        @keyframes gg-slide-in-left {
          from { opacity:0; transform:translateX(52px) scale(0.97); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }
        @keyframes gg-slide-in-right {
          from { opacity:0; transform:translateX(-52px) scale(0.97); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }

        .gg-shimmer-text {
          background:linear-gradient(90deg,#FFD54F 0%,#FFF8DC 40%,#FFD54F 60%,#FFD54F 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:gg-shimmer 4s linear infinite;
        }
        .gg-shimmer-blue {
          background:linear-gradient(90deg,#60A5FA 0%,#BAE6FD 40%,#60A5FA 60%,#60A5FA 100%);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:gg-shimmer 4s linear infinite;animation-delay:-2s;
        }
        .gg-dot-ping { animation:gg-dot-ping 1.8s ease-out infinite; }

        /* Arrow buttons */
        .gg-arrow-btn {
          display:flex;align-items:center;justify-content:center;
          width:38px;height:38px;border-radius:50%;
          border:1.5px solid #1E293B;background:rgba(13,19,33,0.9);
          color:#4B5A6E;cursor:pointer;flex-shrink:0;outline:none;
          transition:border-color 0.18s,color 0.18s,background 0.18s,transform 0.15s,box-shadow 0.18s;
        }
        .gg-arrow-btn:not(:disabled):hover {
          border-color:#4B5A6E;color:#E2E8F0;
          background:rgba(24,36,56,0.95);
          transform:scale(1.1);
          box-shadow:0 0 16px rgba(0,0,0,0.4);
        }
        .gg-arrow-btn:not(:disabled):active { transform:scale(0.96); }
        .gg-arrow-btn:disabled { opacity:0.18;cursor:default; }

        /* Pip dots */
        .gg-pip {
          width:6px;height:6px;border-radius:50%;
          background:#1A2535;border:none;cursor:pointer;padding:0;
          transition:background 0.25s,transform 0.25s,width 0.25s;
        }
        .gg-pip[data-active="true"] {
          background:var(--fac-color,#FFD54F);
          transform:scale(1.2);
          width:18px;
          border-radius:4px;
        }

        /* Search */
        .gg-search {
          width:100%;background:transparent;border:none;outline:none;
          color:#E2E8F0;font-family:'DM Mono',monospace;font-size:12px;
          padding:10px 36px 10px 38px;box-sizing:border-box;
        }
        .gg-search::placeholder { color:#2A3D55; }

        /* Major list */
        .gg-major-list {
          max-height:264px;overflow-y:auto;
          display:grid;grid-template-columns:1fr 1fr;gap:1px;padding:4px;
        }
        .gg-major-list::-webkit-scrollbar { width:3px; }
        .gg-major-list::-webkit-scrollbar-track { background:transparent; }
        .gg-major-list::-webkit-scrollbar-thumb { background:#1A2535;border-radius:4px; }

        .gg-major-row {
          display:flex;align-items:center;gap:10px;
          padding:8px 12px;border-radius:8px;
          cursor:pointer;border:none;background:transparent;
          width:100%;text-align:left;outline:none;
          transition:background 0.13s;
          animation:gg-row-in 0.2s ease both;
        }
        .gg-major-row:hover { background:rgba(255,255,255,0.045); }
        .gg-major-row[data-active="true"] { background:rgba(255,255,255,0.07); }

        .gg-start-btn { transition:transform 0.15s,box-shadow 0.15s; }
        .gg-start-btn:hover { transform:scale(1.04); }
      `}</style>

      <div style={{ position:"fixed", inset:0, zIndex:1000, background:"#060B14", overflow:"hidden", animation:exiting?"gg-fade-out 0.5s ease forwards":undefined }}>

        {/* Grid */}
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:"linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", animation:"gg-grid-drift 40s linear infinite" }} />
        {/* Blobs */}
        <div style={{ position:"absolute", zIndex:0, width:700, height:700, borderRadius:"50%", background:"#FFD54F", filter:"blur(140px)", opacity:0.10, top:-200, left:-100, animation:"gg-blob-pulse 8s ease-in-out infinite alternate" }} />
        <div style={{ position:"absolute", zIndex:0, width:500, height:500, borderRadius:"50%", background:"#00E5FF", filter:"blur(140px)", opacity:0.08, top:400, right:-80, animation:"gg-blob-pulse 8s ease-in-out infinite alternate", animationDelay:"-3s" }} />
        <div style={{ position:"absolute", zIndex:0, width:400, height:400, borderRadius:"50%", background:"#4ADE80", filter:"blur(140px)", opacity:0.06, bottom:-100, left:"40%", animation:"gg-blob-pulse 8s ease-in-out infinite alternate", animationDelay:"-6s" }} />
        <div ref={nodesRef} style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none", overflow:"hidden" }} />

        {/* Content */}
        <div style={{ position:"absolute", inset:0, zIndex:10, overflowY:"auto", display:"flex", flexDirection:"column", alignItems:"center", padding:"48px 32px", gap:32 }}>

          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, flexShrink:0, background:"rgba(255,213,79,0.07)", border:"1px solid rgba(255,213,79,0.18)", borderRadius:40, padding:"6px 18px 6px 10px", animation:"gg-fade-up 0.6s ease 0.05s both" }}>
            <div style={{ position:"relative", width:8, height:8 }}>
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#FFD54F" }} />
              <div className="gg-dot-ping" style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#FFD54F" }} />
            </div>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#FFD54F", letterSpacing:"0.12em" }}>UNIVERSITY OF WATERLOO</span>
          </div>

          {/* Wordmark */}
          <div style={{ textAlign:"center", animation:"gg-fade-up 0.6s ease 0.12s both", flexShrink:0 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(38px,5vw,64px)", fontWeight:900, letterSpacing:"-2px", lineHeight:1 }}>
              <span className="gg-shimmer-text">UW</span>
              <span className="gg-shimmer-blue">GRAD</span>
              <span className="gg-shimmer-text">GRAPH</span>
            </div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#4B5563", marginTop:10, letterSpacing:"0.06em" }}>
              Visualize your degree. Plan every term. Know what&apos;s next.
            </div>
          </div>

          {/* ── Step 1: Faculty switcher ──────────────────────────────── */}
          <div style={{ width:"100%", maxWidth:900, flexShrink:0, animation:"gg-fade-up 0.6s ease 0.22s both" }}>
            <StepLabel>1 — Choose your faculty</StepLabel>

            <div style={{ display:"flex", alignItems:"center", gap:14 }}>

              {/* Left arrow */}
              <button className="gg-arrow-btn" disabled={!canPrev} onClick={() => navigateFaculty(-1)} aria-label="Previous faculty">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Faculty card — single, animated */}
              <div style={{ flex:1, overflow:"hidden" }}>
                <div
                  key={animKey}
                  style={{
                    background:    `linear-gradient(135deg, ${facData.color}18 0%, rgba(10,16,28,0.96) 55%)`,
                    border:        `1.5px solid ${facData.color}55`,
                    borderRadius:  16,
                    padding:       "22px 28px",
                    position:      "relative",
                    overflow:      "hidden",
                    animation:     slideDir ? `${slideInAnim} 0.32s cubic-bezier(0.22,1,0.36,1) both` : "gg-fade-up 0.4s ease both",
                    boxShadow:     `0 0 0 1px ${facData.color}18, 0 12px 40px ${facData.color}12`,
                  }}
                  
                >
                  {/* Top color bar */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(to right, transparent 0%, ${facData.color} 30%, ${facData.color} 70%, transparent 100%)` }} />

                  {/* Background glow */}
                  <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:facData.color, filter:"blur(80px)", opacity:0.07, pointerEvents:"none" }} />

                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
                    <div style={{ flex:1 }}>
                      {/* Faculty name */}
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:900, color:facData.color, letterSpacing:"-0.5px", lineHeight:1.1, marginBottom:8 }}>
                        {facData.shortName}
                      </div>
                      {/* Description */}
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#64748B", lineHeight:1.65, marginBottom:10, maxWidth:560 }}>
                        {facData.description}
                      </div>
                      {/* Subject tags */}
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:`${facData.color}99`, letterSpacing:"0.1em" }}>
                        {facData.subjects}
                      </div>
                    </div>

                    {/* Counter badge */}
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, flexShrink:0 }}>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:`${facData.color}66`, letterSpacing:"0.1em", border:`1px solid ${facData.color}25`, borderRadius:6, padding:"3px 10px" }}>
                        {faculty.majorIds.length} PROGRAMS
                      </div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#2A3D55", letterSpacing:"0.08em" }}>
                        {facIdx + 1} of {FACULTY_LIST.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right arrow */}
              <button className="gg-arrow-btn" disabled={!canNext} onClick={() => navigateFaculty(1)} aria-label="Next faculty">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Pip dots */}
            <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:14, alignItems:"center" }}>
              {FACULTY_LIST.map((fac, i) => (
                <button
                  key={fac.id}
                  className="gg-pip"
                  data-active={i === facIdx ? "true" : undefined}
                  style={{ "--fac-color": facData.color } as React.CSSProperties}
                  onClick={() => {
                    if (i === facIdx) return;
                    setSlideDir(i > facIdx ? "left" : "right");
                    setAnimKey((k) => k + 1);
                    setFacIdx(i);
                  }}
                  aria-label={FACULTY_LIST[i].shortName}
                />
              ))}
            </div>
          </div>

          {/* ── Step 2: Major selector ────────────────────────────────── */}
          <div style={{ width:"100%", maxWidth:900, flexShrink:0, animation:"gg-fade-up 0.6s ease 0.32s both" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <StepLabel>2 — Choose your program</StepLabel>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#2A3D55", letterSpacing:"0.06em" }}>
                {filteredIds.length}{query ? ` of ${allMajorIds.length}` : ""} programs
              </span>
            </div>

            <div style={{ background:"rgba(10,16,28,0.9)", border:`1.5px solid ${accentColor}28`, borderRadius:14, overflow:"hidden", transition:"border-color 0.3s" }}>

              {/* Search */}
              <div style={{ display:"flex", alignItems:"center", borderBottom:"1px solid #0C1623", position:"relative" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ position:"absolute", left:16, pointerEvents:"none", opacity:0.25 }}>
                  <circle cx="6" cy="6" r="4.5" stroke="#94A3B8" strokeWidth="1.4"/>
                  <path d="M9.5 9.5L12.5 12.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input className="gg-search" placeholder="Search programs..." value={majorSearch} onChange={(e) => setMajorSearch(e.target.value)} />
                {majorSearch && (
                  <button onClick={() => setMajorSearch("")} style={{ position:"absolute", right:14, background:"none", border:"none", color:"#334155", cursor:"pointer", fontSize:18, lineHeight:1, padding:"2px 4px", transition:"color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color="#94A3B8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color="#334155")}>×</button>
                )}
              </div>

              {/* Active selection strip */}
              {selMajor && majorMeta && !query && (
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 16px", borderBottom:"1px solid #0C1623", background:`${accentColor}0C`, transition:"background 0.3s" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:accentColor, flexShrink:0, boxShadow:`0 0 6px ${accentColor}AA` }} />
                  <span style={{ fontFamily:"'Syne',sans-serif", fontSize:11, fontWeight:800, color:accentColor, letterSpacing:"-0.2px" }}>{majorMeta.label}</span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#4B5A6E" }}>{majorMeta.fullName}</span>
                  {SUB_MAJOR_REGISTRY[selMajor] && (
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, color:`${accentColor}88`, border:`1px solid ${accentColor}25`, borderRadius:4, padding:"1px 6px", marginLeft:"auto", letterSpacing:"0.06em" }}>
                      {Object.keys(SUB_MAJOR_REGISTRY[selMajor]).length} SPEC
                    </span>
                  )}
                </div>
              )}

              {/* 2-col list */}
              <div className="gg-major-list">
                {filteredIds.length === 0 ? (
                  <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"28px 0", fontFamily:"'DM Mono',monospace", fontSize:11, color:"#2A3D55", letterSpacing:"0.06em" }}>
                    No programs match &ldquo;{majorSearch}&rdquo;
                  </div>
                ) : (
                  filteredIds.map((majorId, idx) => {
                    const meta    = MAJOR_META[majorId];
                    const active  = selMajor === majorId;
                    const hasSpec = !!SUB_MAJOR_REGISTRY[majorId];
                    if (!meta) return null;
                    return (
                      <button key={majorId} className="gg-major-row" data-active={active?"true":undefined}
                        onClick={() => handleMajorSelect(majorId)}
                        style={{ animationDelay:`${Math.min(idx,24)*0.022}s` }}>
                        <div style={{ width:7, height:7, borderRadius:"50%", flexShrink:0, background:active?meta.color:`${meta.color}45`, boxShadow:active?`0 0 7px ${meta.color}88`:"none", transition:"background 0.15s,box-shadow 0.15s" }} />
                        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:800, color:active?meta.color:"#64748B", letterSpacing:"-0.2px", minWidth:32, flexShrink:0, transition:"color 0.15s" }}>{meta.label}</span>
                        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:active?"#B8C7DC":"#3D5166", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", transition:"color 0.15s" }}>{meta.fullName}</span>
                        {hasSpec && (
                          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:8, letterSpacing:"0.06em", color:active?`${meta.color}AA`:"#243347", border:`1px solid ${active?meta.color+"35":"#172130"}`, borderRadius:4, padding:"1px 5px", flexShrink:0, transition:"color 0.15s,border-color 0.15s" }}>
                            {Object.keys(SUB_MAJOR_REGISTRY[majorId]).length}
                          </span>
                        )}
                        {active && (
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink:0 }}>
                            <path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke={meta.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* ── Step 3: Specialization ───────────────────────────────── */}
          {subMajorKeys.length > 0 && (
            <div style={{ width:"100%", maxWidth:900, flexShrink:0, animation:"gg-card-in 0.4s ease both" }}>
              <StepLabel>3 — Choose your specialization</StepLabel>
              <div style={{ position:"relative", display:"inline-flex", alignItems:"center" }}>
                <select
                  value={selSubMajor ?? subMajorKeys[0]}
                  onChange={(e) => setSelSubMajor(e.target.value)}
                  style={{ appearance:"none", background:"rgba(13,19,33,0.95)", border:`1.5px solid ${accentColor}45`, borderRadius:50, color:"#E2E8F0", fontSize:12, padding:"10px 44px 10px 18px", cursor:"pointer", fontFamily:"'DM Mono',monospace", outline:"none", minWidth:280, boxShadow:`0 0 14px ${accentColor}15` }}
                >
                  {subMajorKeys.map((key) => (
                    <option key={key} value={key} style={{ background:"#0D1321", color:"#E2E8F0" }}>{subMajorMap[key].name}</option>
                  ))}
                </select>
                <div style={{ position:"absolute", right:16, pointerEvents:"none", fontSize:10, color:accentColor }}>▼</div>
              </div>
            </div>
          )}

          {/* ── Get Started ──────────────────────────────────────────── */}
          <div style={{ flexShrink:0, animation:"gg-fade-up 0.6s ease 0.44s both" }}>
            <button className="gg-start-btn" onClick={handleStart}
              style={{ padding:"14px 56px", borderRadius:50, border:`1px solid ${accentColor}60`, background:`linear-gradient(135deg,${accentColor} 0%,${accentColor}CC 100%)`, color:"#060B14", fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:14, letterSpacing:"0.08em", cursor:"pointer", boxShadow:`0 0 32px ${accentColor}44,0 4px 20px rgba(0,0,0,0.4)` }}>
              Get Started →
            </button>
          </div>

          {/* Footer */}
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#1E2D40", letterSpacing:"0.06em", flexShrink:0, animation:"gg-fade-up 0.6s ease 0.52s both", paddingBottom:8 }}>
            You can switch programs anytime from the header.
          </div>

        </div>
      </div>
    </>
  );
}

function StepLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#475569", letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:10 }}>
      {children}
    </div>
  );
}
