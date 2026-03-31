"use client";

import { useState } from "react";

// ── Tour steps ────────────────────────────────────────────────────────────────

const TOUR_STEPS = [
  {
    title: "Selecting Your Program",
    tab: "Header",
    color: "#FFD54F",
    visual: (
      <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
        {["CS","SE","DS","Math"].map((m,i) => (
          <div key={m} style={{
            padding: "6px 16px", borderRadius:6, fontSize:11,
            fontFamily:"'Syne',sans-serif", fontWeight:800,
            background: i===0 ? "rgba(236,72,153,0.15)" : "transparent",
            border: `1px solid ${i===0?"#EC4899":"#1E293B"}`,
            color: i===0?"#EC4899":"#475569",
          }}>{m}</div>
        ))}
        <div style={{
          marginLeft:8, padding:"4px 12px", borderRadius:20,
          background:"rgba(96,165,250,0.12)", border:"1px solid rgba(96,165,250,0.3)",
          fontSize:10, color:"#60A5FA", fontFamily:"'DM Mono',monospace"
        }}>Statistics ▾</div>
      </div>
    ),
    desc: "Use the major pills in the header to switch between CS, SE, DS, and Math. For Math and DS, a second row of sub-major chips appears — pick your specialization (e.g. Statistics, Pure Math, CO). Switching resets graph state but preserves your completed/planned courses.",
  },
  {
    title: "Graph View — Course Nodes",
    tab: "Graph",
    color: "#60A5FA",
    visual: (
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        {[
          { label:"CS 245", sub:"Logic", color:"#4ADE80",  badge:"COMPLETED" },
          { label:"CS 341", sub:"Algorithms", color:"#60A5FA", badge:"PLANNED" },
          { label:"CS 486", sub:"AI", color:"#E2E8F0", badge:"AVAILABLE" },
          { label:"CS 499", sub:"Topics", color:"#475569", badge:"LOCKED" },
          { label:"CS 490", sub:"Conflict", color:"#F97316", badge:"CONFLICT" },
        ].map(n => (
          <div key={n.label} style={{
            borderRadius:8, border:`1.5px solid ${n.color}55`,
            background:"rgba(15,23,42,0.9)", padding:"10px 14px", minWidth:100,
          }}>
            <div style={{ fontSize:12, fontWeight:600, color:n.color, fontFamily:"'DM Mono',monospace" }}>{n.label}</div>
            <div style={{ fontSize:9, color:"#475569", marginTop:2 }}>{n.sub}</div>
            <div style={{ marginTop:6, fontSize:8, padding:"2px 6px", borderRadius:3,
              background:`${n.color}20`, color:n.color, width:"fit-content",
              border:`1px solid ${n.color}40` }}>{n.badge}</div>
          </div>
        ))}
      </div>
    ),
    desc: "Every course is a node. Color indicates status — green = completed, blue = planned, white = available (prerequisites met), dark = locked (prerequisites missing), orange = antirequisite conflict. Click any node to highlight its full prerequisite chain and everything it unlocks.",
  },
  {
    title: "Graph View — Pan, Zoom & Next Up",
    tab: "Graph",
    color: "#60A5FA",
    visual: (
      <div style={{ display:"flex", gap:16, alignItems:"center" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <div style={{ fontSize:10, color:"#475569", fontFamily:"'DM Mono',monospace" }}>Scroll to zoom</div>
          <div style={{ fontSize:10, color:"#475569", fontFamily:"'DM Mono',monospace" }}>Click + drag to pan</div>
          <div style={{ fontSize:10, color:"#475569", fontFamily:"'DM Mono',monospace" }}>Click node to highlight chain</div>
          <div style={{ fontSize:10, color:"#475569", fontFamily:"'DM Mono',monospace" }}>Esc to deselect</div>
        </div>
        <div style={{ width:1, height:60, background:"rgba(255,255,255,0.07)" }} />
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <div style={{ fontSize:10, color:"#94A3B8", fontFamily:"'DM Mono',monospace", marginBottom:4 }}>Next Up (pulsing glow)</div>
          <div style={{
            borderRadius:8, border:"1.5px solid #E2E8F055",
            background:"rgba(15,23,42,0.9)", padding:"8px 12px",
            boxShadow:"0 0 12px rgba(255,255,255,0.15), 0 0 24px rgba(255,255,255,0.05)",
          }}>
            <div style={{ fontSize:11, fontWeight:600, color:"#E2E8F0", fontFamily:"'DM Mono',monospace" }}>CS 245</div>
            <div style={{ fontSize:9, color:"#475569", marginTop:2 }}>Logic & Computation</div>
          </div>
        </div>
      </div>
    ),
    desc: "Scroll to zoom in/out, click-drag to pan. Courses that glow with a white pulse are \"Next Up\" — they're unlocked, still needed for your degree, and have few enough options that they're worth calling out. The algorithm checks each requirement group type: required courses always glow, electives only glow when ≤3 options remain and the group isn't already satisfied.",
  },
  {
    title: "Marking Courses Complete or Planned",
    tab: "Graph → Detail Panel",
    color: "#4ADE80",
    visual: (
      <div style={{ display:"flex", gap:8 }}>
        <button style={{
          padding:"8px 18px", borderRadius:6, border:"1px solid #4ADE80",
          background:"rgba(74,222,128,0.15)", color:"#4ADE80",
          fontSize:11, fontFamily:"'DM Mono',monospace", cursor:"default"
        }}>✓ Mark Complete</button>
        <button style={{
          padding:"8px 18px", borderRadius:6, border:"1px solid #60A5FA",
          background:"rgba(96,165,250,0.15)", color:"#60A5FA",
          fontSize:11, fontFamily:"'DM Mono',monospace", cursor:"default"
        }}>+ Mark Planned</button>
        <button style={{
          padding:"8px 18px", borderRadius:6, border:"1px solid #A78BFA",
          background:"rgba(167,139,250,0.15)", color:"#A78BFA",
          fontSize:11, fontFamily:"'DM Mono',monospace", cursor:"default"
        }}>📋 Add to Term</button>
      </div>
    ),
    desc: "Click any course node to open the Course Detail Panel on the right. From there, mark it as Completed (green), Planned (blue), or add it to a specific term in your planner. Marking a course changes its graph color immediately and recalculates which downstream courses are now available. The panel also shows prerequisites (AND/OR trees), antirequisites, and everything the course unlocks.",
  },
  {
    title: "Filters — Subject, Level & Stream",
    tab: "Graph",
    color: "#A78BFA",
    visual: (
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {[["CS","#EC4899"],["MATH","#FCD34D"],["STAT","#80DEEA"],["CO","#4ADE80"]].map(([s,c])=>(
            <div key={s} style={{
              padding:"3px 9px", borderRadius:5, fontSize:10,
              border:`1px solid ${c}`, background:`${c}20`, color:c,
              fontFamily:"'DM Mono',monospace",
            }}>{s}</div>
          ))}
        </div>
        <div style={{ display:"flex", gap:4 }}>
          {["1xx","2xx","3xx","4xx"].map((l,i)=>(
            <div key={l} style={{
              padding:"3px 9px", borderRadius:5, fontSize:10,
              border:`1px solid ${i<2?"#60A5FA":"#2D3748"}`,
              background:i<2?"rgba(96,165,250,0.12)":"rgba(15,23,42,0.75)",
              color:i<2?"#60A5FA":"#475569",
              fontFamily:"'DM Mono',monospace",
            }}>{l}</div>
          ))}
          <div style={{ width:1, height:18, background:"rgba(255,255,255,0.1)", margin:"0 4px" }} />
          <div style={{
            padding:"3px 9px", borderRadius:5, fontSize:10,
            border:"1px solid #A78BFA", background:"rgba(167,139,250,0.12)", color:"#A78BFA",
            fontFamily:"'DM Mono',monospace",
          }}>My Roadmap</div>
        </div>
        <div style={{ display:"flex", gap:3 }}>
          {["All","Required","Simpler","Standard","Advanced"].map((t,i)=>(
            <div key={t} style={{
              padding:"3px 10px", borderRadius:5, fontSize:10,
              border:`1px solid ${i===0?"#EC4899":"#2D3748"}`,
              background:i===0?"rgba(236,72,153,0.13)":"rgba(15,23,42,0.8)",
              color:i===0?"#EC4899":"#475569",
              fontFamily:"'DM Mono',monospace",
            }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    desc: "Top-left of the graph. Subject chips (CS, MATH, STAT…) toggle departments on/off — all active by default. Level chips (1xx–4xx) filter by course number band. My Roadmap collapses the graph to only your completed/planned courses and their prerequisites. For CS, the stream selector (Simpler/Standard/Advanced) filters to a specific requirement tier. All filters are ephemeral and reset when you switch majors.",
  },
  {
    title: "⌘K Search",
    tab: "Anywhere",
    color: "#FFD54F",
    visual: (
      <div style={{
        background:"rgba(15,23,42,0.95)", border:"1px solid #334155",
        borderRadius:10, padding:"12px 16px", maxWidth:300,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <span style={{ color:"#475569", fontSize:12 }}>🔍</span>
          <span style={{ color:"#94A3B8", fontSize:12, fontFamily:"'DM Mono',monospace" }}>Search courses...</span>
          <div style={{
            marginLeft:"auto", padding:"2px 6px", borderRadius:4,
            background:"#1E293B", color:"#475569", fontSize:9, fontFamily:"'DM Mono',monospace"
          }}>⌘K</div>
        </div>
        {[{code:"CS 245",name:"Logic & Computation"},{code:"CS 246",name:"OOP"},{code:"CS 341",name:"Algorithms"}].map(r=>(
          <div key={r.code} style={{
            display:"flex", gap:10, padding:"6px 8px", borderRadius:5,
            background: r.code==="CS 245"?"rgba(255,213,79,0.08)":"transparent",
            alignItems:"center"
          }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#FFD54F", minWidth:60 }}>{r.code}</span>
            <span style={{ fontSize:10, color:"#475569" }}>{r.name}</span>
          </div>
        ))}
      </div>
    ),
    desc: "Press ⌘K (or Ctrl+K on Windows) from anywhere in the app to open the search palette. Type a course code or title to filter instantly. Selecting a result navigates to the Graph tab, clears all active filters so the course is visible, and pans the canvas to center on that node. Press Escape to dismiss.",
  },
  {
    title: "Term Planner",
    tab: "Planner",
    color: "#34D399",
    visual: (
      <div style={{ display:"flex", gap:6 }}>
        {["1A","1B","2A"].map((term,ti) => (
          <div key={term} style={{
            borderRadius:8, border:"1px solid var(--gg-border)", background:"rgba(15,23,42,0.8)",
            padding:"8px 10px", minWidth:80,
          }}>
            <div style={{ fontSize:9, color:"#475569", fontFamily:"'DM Mono',monospace", marginBottom:6, letterSpacing:"0.1em" }}>{term}</div>
            {([["CS 135","#EC4899"],["MATH 135","#FCD34D"],ti===0?["CS 136","#EC4899"]:["STAT 230","#80DEEA"]] as [string,string][]).map(([c,col])=>(
              <div key={c} style={{
                marginBottom:4, padding:"4px 6px", borderRadius:4,
                border:`1px solid ${col}30`, background:`${col}10`,
                fontSize:9, color:col, fontFamily:"'DM Mono',monospace"
              }}>{c}</div>
            ))}
          </div>
        ))}
        <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", gap:6 }}>
          <div style={{
            padding:"5px 10px", borderRadius:5, border:"1px solid #334155",
            background:"rgba(255,213,79,0.08)", color:"#FFD54F",
            fontSize:9, fontFamily:"'DM Mono',monospace", cursor:"default"
          }}>✦ Load Sample Plan</div>
          <div style={{
            padding:"5px 10px", borderRadius:5, border:"1px solid #334155",
            background:"transparent", color:"#475569",
            fontSize:9, fontFamily:"'DM Mono',monospace", cursor:"default"
          }}>↺ Clear</div>
        </div>
      </div>
    ),
    desc: "Drag and drop courses across 8 terms (1A through 4B). Courses you've marked as planned or completed anywhere in the app also appear here. \"Load Sample Plan\" fills the planner with the recommended course sequence for your major. \"Clear\" empties all terms. Courses added via the Term picker in the AI chat or the Detail Panel also land here.",
  },
  {
    title: "Progress Audit",
    tab: "Progress",
    color: "#FB923C",
    visual: (
      <div style={{ display:"flex", flexDirection:"column", gap:6, maxWidth:340 }}>
        {[
          { label:"Core CS Courses", done:8, total:8, color:"#4ADE80", status:"✓ FULFILLED" },
          { label:"CS Electives (5 of 5)", done:3, total:5, color:"#60A5FA", status:"⟳ IN PROGRESS" },
          { label:"Communications",  done:0, total:2, color:"#F87171", status:"✗ INCOMPLETE" },
        ].map(g => (
          <div key={g.label} style={{
            borderRadius:7, border:`1px solid ${g.color}25`,
            background:"rgba(15,23,42,0.8)", padding:"8px 12px",
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
              <span style={{ fontSize:10, color:"#94A3B8", fontFamily:"'DM Mono',monospace" }}>{g.label}</span>
              <span style={{ fontSize:9, color:g.color, fontFamily:"'DM Mono',monospace" }}>{g.status}</span>
            </div>
            <div style={{ height:4, borderRadius:2, background:"#1E293B", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${(g.done/g.total)*100}%`, background:g.color, borderRadius:2 }} />
            </div>
          </div>
        ))}
      </div>
    ),
    desc: "Shows your completion status for every requirement group in the active degree. Groups are marked ✓ Fulfilled (green), ⟳ In Progress with planned courses (blue), or ✗ Incomplete (red). Uses Hopcroft-Karp maximum bipartite matching under the hood to optimally assign your courses to requirement slots — this ensures a course counting for one group doesn't unfairly block another.",
  },
  {
    title: "Degree Explorer",
    tab: "Progress (top)",
    color: "#FB923C",
    visual: (
      <div style={{ display:"flex", flexDirection:"column", gap:8, maxWidth:360 }}>
        <div style={{ fontSize:9, color:"#475569", fontFamily:"'DM Mono',monospace", letterSpacing:"0.1em" }}>BEST MATCH</div>
        <div style={{ display:"flex", gap:6 }}>
          {[{n:"CS — Statistics",p:72,c:"#EC4899"},{n:"CS — Regular",p:68,c:"#EC4899"},{n:"SE",p:51,c:"#A855F7"}].map(d=>(
            <div key={d.n} style={{
              flex:1, borderRadius:7, border:`1px solid ${d.c}30`,
              background:`${d.c}0a`, padding:"8px 10px",
            }}>
              <div style={{ fontSize:9, color:d.c, fontFamily:"'DM Mono',monospace", marginBottom:4 }}>{d.n}</div>
              <div style={{ height:3, borderRadius:2, background:"#1E293B", overflow:"hidden", marginBottom:3 }}>
                <div style={{ height:"100%", width:`${d.p}%`, background:d.c }} />
              </div>
              <div style={{ fontSize:10, color:d.c, fontFamily:"'Syne',sans-serif", fontWeight:700 }}>{d.p}%</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:6, marginTop:2 }}>
          {[{l:"CS",c:"#EC4899",p:72},{l:"SE",c:"#A855F7",p:51},{l:"DS",c:"#80DEEA",p:44},{l:"Math",c:"#FCD34D",p:31}].map(m=>(
            <div key={m.l} style={{
              flex:1, borderRadius:6, border:`1px solid ${m.c}30`,
              background:"rgba(15,23,42,0.8)", padding:"6px 8px",
            }}>
              <div style={{ fontSize:10, color:m.c, fontFamily:"'Syne',sans-serif", fontWeight:700, marginBottom:4 }}>{m.l}</div>
              <div style={{ height:3, background:"#1E293B", borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${m.p}%`, background:m.c }} />
              </div>
              <div style={{ fontSize:9, color:"#475569", fontFamily:"'DM Mono',monospace", marginTop:3 }}>{m.p}%</div>
            </div>
          ))}
        </div>
      </div>
    ),
    desc: "At the top of the Progress tab. Shows a \"Best Match\" section with the top 3 degrees you're closest to completing, followed by expandable chips for each major family. Click CS, SE, DS, or Math to expand a sorted list of all sub-majors by completion percentage. Great for discovering if your current courses align well with a degree you hadn't considered.",
  },
  {
    title: "AI Chat — Ask About Your Degree",
    tab: "Ask AI",
    color: "#A78BFA",
    visual: (
      <div style={{ display:"flex", flexDirection:"column", gap:8, maxWidth:360 }}>
        <div style={{
          background:"rgba(167,139,250,0.08)", border:"1px solid rgba(167,139,250,0.2)",
          borderRadius:8, padding:"10px 12px",
        }}>
          <div style={{ fontSize:10, color:"#A78BFA", fontFamily:"'DM Mono',monospace", marginBottom:4 }}>✦ AI</div>
          <div style={{ fontSize:11, color:"#CBD5E1", lineHeight:1.6 }}>
            You need <strong style={{color:"#A78BFA"}}>2 more CS electives</strong> at the 400-level. STAT 430 qualifies — it matches the rule <em style={{color:"#60A5FA"}}>any STAT 400+</em> in your electives group.
          </div>
        </div>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          {["What's left for CS?","Can I swap STAT 430 for 440?","Mark CS 341 complete"].map(s=>(
            <div key={s} style={{
              padding:"4px 10px", borderRadius:20, fontSize:9,
              border:"1px solid rgba(167,139,250,0.25)", color:"#A78BFA",
              fontFamily:"'DM Mono',monospace", background:"rgba(167,139,250,0.06)",
            }}>{s}</div>
          ))}
        </div>
      </div>
    ),
    desc: "Switch to the Ask AI tab to chat with an AI assistant that has full context of your degree requirements and your current completion state. It knows which groups are fulfilled, which courses you've planned, and can describe dynamic rules (like \"any STAT 4xx\"). It can also suggest marking courses as complete or planned — you'll see a confirmation dialog before any change is made. Suggestion pills above the input offer quick starting questions.",
  },
];

// ── Section data ──────────────────────────────────────────────────────────────

const SHORTCUTS = [
  { key: "⌘K",      desc: "Open course search palette" },
  { key: "Esc",     desc: "Close search / deselect node" },
  { key: "Click",   desc: "Select node & highlight chain" },
  { key: "Scroll",  desc: "Zoom in / out on graph" },
  { key: "Drag",    desc: "Pan the graph canvas" },
];

const LEGEND = [
  { color: "#4ADE80", label: "Completed",          desc: "You've taken this course" },
  { color: "#60A5FA", label: "Planned",             desc: "Marked planned or in a term" },
  { color: "#E2E8F0", label: "Available",           desc: "Prerequisites met, ready to take" },
  { color: "#475569", label: "Locked",              desc: "Prerequisites not yet satisfied" },
  { color: "#F97316", label: "Conflict / Stub",     desc: "Antireq clash or incomplete data" },
  { color: "#FFFFFF", label: "Next Up (glow)",      desc: "Unlocked & needed for your degree" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function HelpPage() {
  const [tourStep, setTourStep]     = useState<number | null>(null);
  const [openSection, setOpen]      = useState<string | null>("tour");

  const inTour   = tourStep !== null;
  const step     = tourStep !== null ? TOUR_STEPS[tourStep] : null;
  const isFirst  = tourStep === 0;
  const isLast   = tourStep === TOUR_STEPS.length - 1;

  function startTour() { setTourStep(0); setOpen("tour"); }
  function exitTour()  { setTourStep(null); }
  function nextStep()  { if (!isLast)  setTourStep((s) => (s ?? 0) + 1); else exitTour(); }
  function prevStep()  { if (!isFirst) setTourStep((s) => (s ?? 0) - 1); }

  return (
    <div style={{
      height:     "100%",
      overflowY:  "auto",
      background: "var(--gg-base)",
      fontFamily: "'DM Mono', monospace",
      color:      "var(--gg-text-2)",
      transition: "background 0.2s, color 0.2s",
    }}>
      <style>{`
        .help-section-header:hover { background: rgba(255,255,255,0.03) !important; }
        .help-card:hover { border-color: rgba(255,255,255,0.1) !important; }
        a.social-link:hover { border-color: rgba(255,255,255,0.2) !important; background: rgba(255,255,255,0.05) !important; }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div style={{
        background:    "linear-gradient(135deg, rgba(236,72,153,0.06) 0%, rgba(96,165,250,0.06) 100%)",
        borderBottom:  "1px solid var(--gg-border)",
        padding:       "36px 48px 32px",
        display:       "flex",
        alignItems:    "flex-start",
        justifyContent:"space-between",
        gap:           24,
      }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:900, color:"#FFD54F", letterSpacing:"-0.5px" }}>
              UW<span style={{ color:"#60A5FA" }}>GRAD</span>GRAPH
            </span>
            <span style={{
              padding:"3px 10px", borderRadius:20, fontSize:9,
              background:"rgba(255,213,79,0.1)", border:"1px solid rgba(255,213,79,0.25)",
              color:"#FFD54F", letterSpacing:"0.1em",
            }}>HELP & GUIDE</span>
          </div>
          <div style={{ fontSize:12, color:"#475569", lineHeight:1.7, maxWidth:520 }}>
            Everything you need to plan your University of Waterloo degree.<br />
            Use the interactive tour below, or jump to any section.
          </div>
          <button
            onClick={startTour}
            style={{
              marginTop:    16,
              padding:      "10px 24px",
              borderRadius: 7,
              border:       "1px solid rgba(96,165,250,0.4)",
              background:   "rgba(96,165,250,0.1)",
              color:        "#60A5FA",
              fontSize:     11,
              fontFamily:   "inherit",
              cursor:       "pointer",
              letterSpacing:"0.05em",
              transition:   "all 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(96,165,250,0.18)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(96,165,250,0.1)")}
          >
            ▶ Start Interactive Tour ({TOUR_STEPS.length} steps)
          </button>
        </div>

        {/* Socials */}
        <div style={{ display:"flex", flexDirection:"column", gap:8, flexShrink:0 }}>
          <div style={{ fontSize:9, color:"#334155", letterSpacing:"0.12em", marginBottom:2 }}>BUILT BY</div>
          <a
            className="social-link"
            href="https://www.linkedin.com/in/maximiliantmiller/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:"flex", alignItems:"center", gap:10,
              padding:"10px 16px", borderRadius:8,
              border:"1px solid var(--gg-border)", background:"transparent",
              color:"#CBD5E1", textDecoration:"none",
              fontSize:11, transition:"all 0.15s",
            }}
          >
            <LinkedInIcon />
            <div>
              <div style={{ fontWeight:500, color:"#94A3B8" }}>LinkedIn</div>
              <div style={{ fontSize:9, color:"#334155", marginTop:1 }}>Maximilian Miller</div>
            </div>
          </a>
          <a
            className="social-link"
            href="https://github.com/maxtmiller"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:"flex", alignItems:"center", gap:10,
              padding:"10px 16px", borderRadius:8,
              border:"1px solid var(--gg-border)", background:"transparent",
              color:"#CBD5E1", textDecoration:"none",
              fontSize:11, transition:"all 0.15s",
            }}
          >
            <GitHubIcon />
            <div>
              <div style={{ fontWeight:500, color:"#94A3B8" }}>GitHub</div>
              <div style={{ fontSize:9, color:"#334155", marginTop:1 }}>maxtmiller</div>
            </div>
          </a>
        </div>
      </div>

      <div style={{ padding:"0 48px 60px", maxWidth:1100 }}>

        {/* ── Interactive Tour ──────────────────────────────────────────── */}
        <Section id="tour" label="Interactive Tour" open={openSection==="tour"} onToggle={setOpen}>
          {inTour && step ? (
            <div style={{
              borderRadius:   12,
              border:         `1px solid ${step.color}30`,
              background:     `${step.color}08`,
              padding:        "28px 32px",
              position:       "relative",
            }}>
              {/* Progress bar */}
              <div style={{ display:"flex", gap:4, marginBottom:20 }}>
                {TOUR_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTourStep(i)}
                    style={{
                      flex:1, height:3, borderRadius:2, border:"none", cursor:"pointer",
                      background: i <= (tourStep ?? 0) ? step.color : "#1E293B",
                      transition:"all 0.2s", padding:0,
                    }}
                  />
                ))}
              </div>

              <div style={{ display:"flex", gap:28, alignItems:"flex-start", flexWrap:"wrap" }}>
                <div style={{ flex:"1 1 320px" }}>
                  {/* Step label */}
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                    <div style={{
                      padding:"2px 10px", borderRadius:20, fontSize:9,
                      background:`${step.color}18`, border:`1px solid ${step.color}40`,
                      color:step.color, letterSpacing:"0.1em",
                    }}>{step.tab.toUpperCase()}</div>
                    <span style={{ fontSize:9, color:"#334155" }}>
                      Step {(tourStep ?? 0)+1} of {TOUR_STEPS.length}
                    </span>
                  </div>

                  <div style={{
                    fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700,
                    color:"#F1F5F9", marginBottom:12, lineHeight:1.3,
                  }}>
                    {step.title}
                  </div>

                  <div style={{ fontSize:12, color:"#94A3B8", lineHeight:1.8 }}>
                    {step.desc}
                  </div>

                  {/* Nav buttons */}
                  <div style={{ display:"flex", gap:8, marginTop:20 }}>
                    <button
                      onClick={prevStep}
                      disabled={isFirst}
                      style={{
                        padding:"8px 18px", borderRadius:6, fontSize:10,
                        border:"1px solid var(--gg-border)", background:"transparent",
                        color:isFirst?"#1E293B":"#64748B", cursor:isFirst?"default":"pointer",
                        fontFamily:"inherit",
                      }}
                    >← Previous</button>
                    <button
                      onClick={nextStep}
                      style={{
                        padding:"8px 18px", borderRadius:6, fontSize:10,
                        border:`1px solid ${step.color}60`,
                        background:`${step.color}15`, color:step.color,
                        cursor:"pointer", fontFamily:"inherit", fontWeight:500,
                      }}
                    >{isLast ? "Finish Tour ✓" : "Next →"}</button>
                    <button
                      onClick={exitTour}
                      style={{
                        padding:"8px 14px", borderRadius:6, fontSize:10,
                        border:"1px solid var(--gg-border)", background:"transparent",
                        color:"#334155", cursor:"pointer", fontFamily:"inherit",
                        marginLeft:"auto",
                      }}
                    >✕ Exit</button>
                  </div>
                </div>

                {/* Visual mockup */}
                <div style={{
                  flex:"0 0 auto",
                  background:"rgba(10,15,30,0.8)",
                  border:"1px solid var(--gg-border)",
                  borderRadius:10,
                  padding:"20px 22px",
                  minWidth:300,
                }}>
                  <div style={{ fontSize:9, color:"#334155", letterSpacing:"0.1em", marginBottom:12 }}>PREVIEW</div>
                  {step.visual}
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              borderRadius:10, border:"1px solid var(--gg-border)",
              background:"var(--gg-surface)", padding:"20px 24px",
              display:"flex", alignItems:"center", gap:16,
            }}>
              <div style={{ fontSize:24 }}>🗺️</div>
              <div>
                <div style={{ fontSize:12, color:"#94A3B8", marginBottom:4 }}>
                  10-step visual walkthrough of every feature
                </div>
                <button
                  onClick={startTour}
                  style={{
                    padding:"6px 16px", borderRadius:6, fontSize:10,
                    border:"1px solid rgba(96,165,250,0.35)",
                    background:"rgba(96,165,250,0.08)", color:"#60A5FA",
                    cursor:"pointer", fontFamily:"inherit",
                  }}
                >Start Tour →</button>
              </div>
            </div>
          )}
        </Section>

        {/* ── Quick start ───────────────────────────────────────────────── */}
        <Section id="quickstart" label="Quick Start — 5 Steps" open={openSection==="quickstart"} onToggle={setOpen}>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {[
              { n:1, color:"#FFD54F", title:"Pick your major",     desc:"Use the pills in the header to choose CS, SE, DS, or Math. For Math/DS, also pick a specialization in the sub-chip row." },
              { n:2, color:"#4ADE80", title:"Mark what you've done", desc:"Click any course node on the Graph tab to open its detail panel, then hit \"Mark Complete\". Watch how downstream courses unlock." },
              { n:3, color:"#60A5FA", title:"Plan your remaining courses", desc:"Mark courses you intend to take as Planned, or drag them into a term in the Planner tab. Planned courses count toward requirement fulfillment." },
              { n:4, color:"#FB923C", title:"Check your audit",    desc:"Go to the Progress tab to see how many requirement groups are fulfilled. The Degree Explorer at the top shows all programs ranked by fit." },
              { n:5, color:"#A78BFA", title:"Ask the AI",          desc:"Switch to Ask AI and ask anything — \"What's left for CS?\", \"Can I swap STAT 430 for 440?\", or \"Mark CS 341 as planned\"." },
            ].map((s, i, arr) => (
              <div key={s.n} style={{ display:"flex", gap:16, alignItems:"flex-start", padding:"16px 0",
                borderBottom: i<arr.length-1?"1px solid #0F172A":"none" }}>
                <div style={{
                  flexShrink:0, width:28, height:28, borderRadius:"50%",
                  background:`${s.color}18`, border:`1px solid ${s.color}50`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:11, fontWeight:700, color:s.color, fontFamily:"'Syne',sans-serif",
                }}>{s.n}</div>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"#E2E8F0", marginBottom:4 }}>{s.title}</div>
                  <div style={{ fontSize:11, color:"#475569", lineHeight:1.7 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Node color legend ─────────────────────────────────────────── */}
        <Section id="legend" label="Node Color Legend" open={openSection==="legend"} onToggle={setOpen}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:8 }}>
            {LEGEND.map(l => (
              <div key={l.label} className="help-card" style={{
                display:"flex", alignItems:"center", gap:12,
                padding:"12px 14px", borderRadius:8,
                border:"1px solid #0F172A", background:"var(--gg-surface-a)",
                transition:"border-color 0.15s",
              }}>
                <div style={{
                  width:12, height:12, borderRadius:"50%", flexShrink:0,
                  background:l.color,
                  boxShadow: l.label.includes("glow") ? `0 0 8px ${l.color}` : "none",
                }} />
                <div>
                  <div style={{ fontSize:11, color:"#CBD5E1", fontWeight:500 }}>{l.label}</div>
                  <div style={{ fontSize:10, color:"#334155", marginTop:2 }}>{l.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Keyboard shortcuts ────────────────────────────────────────── */}
        <Section id="shortcuts" label="Keyboard Shortcuts" open={openSection==="shortcuts"} onToggle={setOpen}>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {SHORTCUTS.map((s, i, arr) => (
              <div key={s.key} style={{
                display:"flex", alignItems:"center", gap:16, padding:"10px 0",
                borderBottom: i<arr.length-1?"1px solid #0F172A":"none",
              }}>
                <kbd style={{
                  padding:"4px 10px", borderRadius:5,
                  background:"#0F172A", border:"1px solid var(--gg-border)",
                  color:"#FFD54F", fontSize:10, minWidth:70, textAlign:"center",
                  fontFamily:"'DM Mono',monospace", flexShrink:0,
                }}>{s.key}</kbd>
                <span style={{ fontSize:11, color:"#475569" }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <Section id="faq" label="FAQ" open={openSection==="faq"} onToggle={setOpen}>
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {[
              { q:"Does this use official UW data?",
                a:"Course data and degree requirements are manually sourced from the UW undergraduate calendar. They may not reflect the very latest calendar updates — always cross-check with your academic advisor." },
              { q:"Will my progress be saved if I close the tab?",
                a:"Yes. Completed courses, planned courses, term plan, and active major are all saved to localStorage and persist across sessions." },
              { q:"Can a course count toward multiple degree requirements?",
                a:"Some courses are flagged canDoubleCount in the data, which means they can satisfy more than one requirement group simultaneously. The audit engine handles this with a two-pass algorithm." },
              { q:"Why does a course show as locked even though I have the prereqs?",
                a:"Prerequisites use AND/OR trees. A locked course might require you to have completed one branch of an OR requirement that you haven't satisfied yet. Click the node to see the full prereq breakdown in the detail panel." },
              { q:"Can I use this for a minor or exchange courses?",
                a:"The app currently focuses on major requirements only. Minor and elective counting is partially supported via the elective groups in each degree definition." },
            ].map((item, i, arr) => (
              <div key={i} style={{ padding:"14px 0", borderBottom:i<arr.length-1?"1px solid #0F172A":"none" }}>
                <div style={{ fontSize:11, color:"#E2E8F0", fontWeight:500, marginBottom:6 }}>Q: {item.q}</div>
                <div style={{ fontSize:11, color:"#475569", lineHeight:1.7 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── About / Credits ───────────────────────────────────────────── */}
        <Section id="about" label="About & Credits" open={openSection==="about"} onToggle={setOpen}>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ fontSize:11, color:"#475569", lineHeight:1.8 }}>
              UWGradGraph is an open-source degree planning tool for University of Waterloo students.
              Built with <span style={{color:"#60A5FA"}}>Next.js 15</span>, <span style={{color:"#60A5FA"}}>React 19</span>,
              and <span style={{color:"#60A5FA"}}>Zustand</span>. Graph layout uses a{" "}
              <span style={{color:"#A78BFA"}}>BFS topological layering</span> algorithm.
              Degree audit uses <span style={{color:"#A78BFA"}}>Hopcroft-Karp maximum bipartite matching</span> (O(E√V))
              to optimally assign courses to requirement slots. AI chat powered by <span style={{color:"#60A5FA"}}>OpenAI</span>.
            </div>

            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <a
                href="https://www.linkedin.com/in/maximiliantmiller/"
                target="_blank" rel="noopener noreferrer"
                className="social-link"
                style={{
                  display:"flex", alignItems:"center", gap:10,
                  padding:"12px 20px", borderRadius:8,
                  border:"1px solid var(--gg-border)", background:"transparent",
                  color:"#CBD5E1", textDecoration:"none",
                  fontSize:11, transition:"all 0.15s",
                }}
              >
                <LinkedInIcon />
                <div>
                  <div style={{ color:"#0A66C2", fontWeight:500 }}>LinkedIn</div>
                  <div style={{ fontSize:9, color:"#334155" }}>linkedin.com/in/maximiliantmiller</div>
                </div>
              </a>
              <a
                href="https://github.com/maxtmiller"
                target="_blank" rel="noopener noreferrer"
                className="social-link"
                style={{
                  display:"flex", alignItems:"center", gap:10,
                  padding:"12px 20px", borderRadius:8,
                  border:"1px solid var(--gg-border)", background:"transparent",
                  color:"#CBD5E1", textDecoration:"none",
                  fontSize:11, transition:"all 0.15s",
                }}
              >
                <GitHubIcon />
                <div>
                  <div style={{ color:"#E2E8F0", fontWeight:500 }}>GitHub</div>
                  <div style={{ fontSize:9, color:"#334155" }}>github.com/maxtmiller</div>
                </div>
              </a>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}

// ── Section accordion ─────────────────────────────────────────────────────────

function Section({ id, label, open, onToggle, children }: {
  id: string;
  label: string;
  open: boolean;
  onToggle: (id: string | null) => void;
  children: React.ReactNode;
}) {
  return (
    <div style={{ borderBottom:"1px solid var(--gg-border)", marginTop: 8 }}>
      <button
        className="help-section-header"
        onClick={() => onToggle(open ? null : id)}
        style={{
          width:"100%", padding:"16px 4px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          background:"transparent", border:"none", cursor:"pointer",
          color:"#94A3B8", textAlign:"left", transition:"background 0.1s",
          borderRadius:4,
        }}
      >
        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, color: open?"#F1F5F9":"#94A3B8" }}>
          {label}
        </span>
        <span style={{ fontSize:10, color:"#334155", transition:"transform 0.2s",
          transform: open?"rotate(180deg)":"rotate(0deg)", display:"inline-block" }}>▼</span>
      </button>
      {open && (
        <div style={{ paddingBottom:20 }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Social icons ──────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#0A66C2" opacity="0.9"/>
      <path d="M6.5 9.5h2v8h-2v-8zm1-1.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM10.5 9.5h1.9v1.1c.4-.7 1.3-1.3 2.6-1.3 2.1 0 3 1.3 3 3.4v5.3h-2v-4.8c0-1.1-.4-1.9-1.5-1.9-1.2 0-1.9.9-1.9 2.1v4.6h-2v-8.5z" fill="white"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#E2E8F0">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
    </svg>
  );
}
