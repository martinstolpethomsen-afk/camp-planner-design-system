import { useState } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/* ─── BRAND CONSTANTS ─────────────────────────────────────────────────────── */
const B = {
  bg: "#0D0D0D", card: "#181818", card2: "#222222",
  border: "rgba(255,255,255,0.08)", border2: "rgba(255,255,255,0.14)",
  red: "#E31E24", redHover: "#FF2D34",
  white: "#FFFFFF", muted: "#888888", dim: "#555555",
  sidebar: "#111111",
};

const STYPE = {
  red:      { bg:"#7F1D1D", text:"#FECACA", accent:"#E31E24", label:"Sparring" },
  redorange:{ bg:"#7C1D12", text:"#FDBA74", accent:"#F04D23", label:"Striking" },
  orange:   { bg:"#7C2D12", text:"#FED7AA", accent:"#F97316", label:"Padwork" },
  amber:    { bg:"#78350F", text:"#FDE68A", accent:"#F59E0B", label:"Warmup" },
  yellow:   { bg:"#713F12", text:"#FEF08A", accent:"#EAB308", label:"Agility" },
  lime:     { bg:"#365314", text:"#D9F99D", accent:"#84CC16", label:"Coordination" },
  green:    { bg:"#14532D", text:"#BBF7D0", accent:"#22C55E", label:"Fitness" },
  teal:     { bg:"#134E4A", text:"#99F6E4", accent:"#14B8A6", label:"Recovery" },
  blue:     { bg:"#1E3A5F", text:"#BFDBFE", accent:"#3B82F6", label:"Technique" },
  indigo:   { bg:"#1E1B4B", text:"#C7D2FE", accent:"#6366F1", label:"Tactics" },
  violet:   { bg:"#3B0764", text:"#E9D5FF", accent:"#A855F7", label:"Review" },
  pink:     { bg:"#500724", text:"#FBCFE8", accent:"#EC4899", label:"Ceremony" },
  break:    { bg:"#111111", text:"#374151", accent:"#333333", label:"Break" },
};

/* ─── NAV ─────────────────────────────────────────────────────────────────── */
const NAV = [
  { id:"brand",    idx:"00", label:"Brand Direction",  icon:"palette" },
  { id:"tokens",   idx:"01", label:"Design Tokens",    icon:"coins" },
  { id:"comps",    idx:"02", label:"Components",       icon:"puzzle" },
  { id:"shell",    idx:"03", label:"App Shell",        icon:"layout" },
  { id:"dash",     idx:"04", label:"Dashboard",        icon:"layout-dashboard" },
  { id:"events",   idx:"05", label:"Camp / Event Views", icon:"calendar-days" },
  { id:"admin",    idx:"06", label:"Platform Admin",   icon:"shield-check" },
  { id:"audit",    idx:"07", label:"UI Audit",         icon:"clipboard-check" },
];

/* ─── SHARED STYLES ────────────────────────────────────────────────────────── */
const css = {
  root: { display:"flex", height:"100vh", background:B.bg, color:B.white, fontFamily:"Inter,sans-serif", overflow:"hidden", fontSize:14 },
  sidebar: { width:224, background:B.sidebar, borderRight:`1px solid ${B.border}`, display:"flex", flexDirection:"column", flexShrink:0 },
  sidebarTop: { padding:"16px 20px 12px", borderBottom:`1px solid ${B.border}` },
  logoBox: { display:"flex", alignItems:"center", gap:10 },
  logoMark: { width:32, height:32, background:B.red, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:13, color:"#fff", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:-0.5 },
  logoText: { fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:16, letterSpacing:0.5, color:B.white },
  logoSub: { fontSize:9, color:B.muted, fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:1.5, textTransform:"uppercase", marginTop:1 },
  navItem: (active) => ({
    display:"flex", alignItems:"center", gap:10, padding:"9px 16px", cursor:"pointer",
    borderLeft: active ? `3px solid ${B.red}` : "3px solid transparent",
    background: active ? "rgba(227,30,36,0.08)" : "transparent",
    transition:"all 0.15s",
  }),
  navIdx: (active) => ({ fontFamily:"'DM Mono',monospace", fontSize:11, color: active ? B.red : B.dim, minWidth:22, fontWeight:600 }),
  navLabel: (active) => ({ fontSize:13, fontWeight: active ? 700 : 400, color: active ? B.white : B.muted }),
  main: { flex:1, display:"flex", flexDirection:"column", overflow:"hidden" },
  topbar: { height:56, borderBottom:`1px solid ${B.border}`, display:"flex", alignItems:"center", padding:"0 24px", gap:16, flexShrink:0, background:"rgba(17,17,17,0.8)" },
  breadcrumb: { display:"flex", alignItems:"center", gap:8, fontSize:13, color:B.muted },
  breadSection: { color:B.white, fontWeight:600 },
  searchBox: { marginLeft:"auto", display:"flex", alignItems:"center", gap:10 },
  searchInput: { background:"rgba(255,255,255,0.06)", border:`1px solid ${B.border}`, borderRadius:8, padding:"6px 12px", color:B.white, fontSize:13, width:200, outline:"none" },
  avatar: { width:32, height:32, borderRadius:"50%", background:B.red, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff" },
  content: { flex:1, overflowY:"auto", padding:"32px 40px" },
  contentFull: { flex:1, overflowY:"auto" },
  sectionTitle: { fontFamily:"'Barlow Condensed',sans-serif", fontSize:56, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", color:B.white, lineHeight:1, margin:"8px 0 4px" },
  sectionIdx: { fontFamily:"'DM Mono',monospace", fontSize:12, color:B.muted, letterSpacing:1 },
  sectionSub: { fontSize:14, color:B.muted, marginBottom:32, maxWidth:600 },
  card: { background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" },
  label: { fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1.5, color:B.muted, marginBottom:12 },
  divider: { height:1, background:B.border, margin:"24px 0" },
  tag: (color) => ({ background: color+"22", color, border:`1px solid ${color}44`, borderRadius:4, padding:"2px 8px", fontSize:11, fontWeight:700 }),
};

/* ─── SECTION: BRAND DIRECTION ─────────────────────────────────────────────── */
function BrandSection() {
  const palette = [
    { name:"Brand Red", hex:"#E31E24", usage:"Primary / Action / CTA" },
    { name:"Black", hex:"#0D0D0D", usage:"Background / Ground" },
    { name:"Charcoal", hex:"#181818", usage:"Card / Panel surface" },
    { name:"Mid Grey", hex:"#333333", usage:"Muted surface / dividers" },
    { name:"White", hex:"#FFFFFF", usage:"Foreground / Display type" },
    { name:"Steel Grey", hex:"#888888", usage:"Muted text / captions" },
    { name:"Light Neutral", hex:"#CCCCCC", usage:"Secondary text" },
    { name:"Dark Navy", hex:"#1D3461", usage:"Logo C mark (light ver.)" },
  ];
  const stypeKeys = Object.keys(STYPE).filter(k => k !== "break");
  const voice = [
    { t:"DIRECT", d:"Coaches don't read paragraphs. Every label and button is written for someone running a camp on a mat, not behind a desk." },
    { t:"ENERGETIC", d:"Black, red, and white. Bold italic type. The product must feel as alive as the athletes it serves." },
    { t:"CREDIBLE", d:"Real numbers, real names, real waivers. No vague placeholders — directors trust CAMP-PLANNER because it respects real operational data." },
    { t:"INCLUSIVE", d:"Built for martial arts first, designed to flex to any sport. The system doesn't assume — it adapts." },
  ];

  return (
    <div>
      <p style={css.sectionSub}>CAMP-PLANNER — built for martial arts, ready for every sport. The identity is bold, direct, and kinetic: black ground, brand red, white type.</p>

      {/* Logo lockups */}
      <p style={css.label}>Logo Lockups</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:40 }}>
        {[
          { bg:"#0D0D0D", label:"On Black", textColor:B.muted },
          { bg:"#FFFFFF", label:"On White", textColor:"#999" },
          { bg:"#E31E24", label:"On Brand Red", textColor:"rgba(255,255,255,0.7)" },
        ].map(({ bg, label, textColor }) => (
          <div key={label} style={{ background:bg, border:`1px solid ${B.border}`, borderRadius:8, padding:"32px 24px", textAlign:"center" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:12 }}>
              <div style={{ width:48, height:48, background: bg === "#FFFFFF" ? "#0D0D0D" : "#FFFFFF", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:22, color:B.red, fontStyle:"italic" }}>Cp</span>
              </div>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:20, color: bg === "#FFFFFF" ? "#0D0D0D" : "#FFFFFF", letterSpacing:1 }}>CAMP-PLANNER</div>
                <div style={{ fontSize:9, fontFamily:"'Barlow Condensed',sans-serif", color: bg === "#FFFFFF" ? "#777" : "rgba(255,255,255,0.5)", letterSpacing:2, textTransform:"uppercase" }}>Plan. Organize. Inspire.</div>
              </div>
            </div>
            <div style={{ fontSize:11, color:textColor, textTransform:"uppercase", letterSpacing:2, fontWeight:700 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Colour palette */}
      <p style={css.label}>Colour Palette</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:40 }}>
        {palette.map(({ name, hex, usage }) => (
          <div key={name} style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, overflow:"hidden" }}>
            <div style={{ height:80, background:hex, border: hex === "#FFFFFF" ? "none" : "none" }} />
            <div style={{ padding:"12px 14px" }}>
              <div style={{ fontWeight:700, fontSize:13, color:B.white, marginBottom:2 }}>{name}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:B.muted, marginBottom:2 }}>{hex}</div>
              <div style={{ fontSize:11, color:B.muted }}>{usage}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Session colour palette */}
      <p style={css.label}>Session Colour Palette — 12 Base Hues</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10, marginBottom:40 }}>
        {stypeKeys.map(key => {
          const s = STYPE[key];
          return (
            <div key={key} style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, overflow:"hidden" }}>
              <div style={{ height:56, background:s.accent }} />
              <div style={{ padding:"10px 12px" }}>
                <div style={{ fontWeight:700, fontSize:12, color:B.white }}>{s.label}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:B.muted }}>{s.accent}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Typography */}
      <p style={css.label}>Typography</p>
      <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, overflow:"hidden", marginBottom:40 }}>
        {[
          { role:"Display — Barlow Condensed Black Italic", sample:"PLAN. ORGANIZE. INSPIRE.", style:{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:52, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", color:B.white, letterSpacing:1 } },
          { role:"Heading — Barlow Condensed Bold Italic", sample:"Summer MMA Skills Camp 2026", style:{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:800, fontStyle:"italic", textTransform:"uppercase", color:B.white } },
          { role:"Subheading — Barlow Condensed SemiBold", sample:"BUILT FOR MARTIAL ARTS. READY FOR EVERY SPORT.", style:{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:17, fontWeight:600, textTransform:"uppercase", color:B.white, letterSpacing:0.5 } },
          { role:"Body — Inter 400", sample:"CAMP-PLANNER gives coaches and event directors full control over schedules, athlete rosters, drill rotations, and performance data — from one focused platform.", style:{ fontFamily:"Inter,sans-serif", fontSize:15, fontWeight:400, color:B.white, lineHeight:1.6 } },
          { role:"Data — DM Mono 400", sample:"06:30 · #88 · 96 athletes · Day 1 of 2", style:{ fontFamily:"'DM Mono',monospace", fontSize:14, fontWeight:400, color:B.white } },
        ].map(({ role, sample, style }, i) => (
          <div key={i} style={{ padding:"20px 28px", borderBottom: i < 4 ? `1px solid ${B.border}` : "none" }}>
            <div style={{ fontSize:12, color:B.muted, marginBottom:12, fontFamily:"'DM Mono',monospace" }}>{role}</div>
            <div style={style}>{sample}</div>
          </div>
        ))}
      </div>

      {/* Brand Voice */}
      <p style={css.label}>Brand Voice</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        {voice.map(({ t, d }) => (
          <div key={t} style={{ background:B.card2, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, fontStyle:"italic", color:B.white, marginBottom:8, textTransform:"uppercase" }}>{t}</div>
            <div style={{ fontSize:13, color:B.muted, lineHeight:1.6 }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION: DESIGN TOKENS ───────────────────────────────────────────────── */
function TokensSection() {
  const [showValues, setShowValues] = useState(true);
  const baseTokens = [
    { token:"--background", hex:"#0D0D0D", usage:"Page ground" },
    { token:"--foreground", hex:"#FFFFFF", usage:"Default text" },
    { token:"--card", hex:"#181818", usage:"Card surface" },
    { token:"--primary", hex:"#E31E24", usage:"Primary / CTA" },
    { token:"--primary-foreground", hex:"#FFFFFF", usage:"Text on primary" },
    { token:"--secondary", hex:"#242424", usage:"Secondary surface" },
    { token:"--accent", hex:"#E31E24", usage:"Highlight" },
    { token:"--muted", hex:"#222222", usage:"Subdued surface" },
    { token:"--muted-foreground", hex:"#888888", usage:"Labels" },
    { token:"--border", hex:"rgba(255,255,255,0.08)", usage:"Hairline rules" },
    { token:"--ring", hex:"#E31E24", usage:"Focus ring" },
    { token:"--destructive", hex:"#E31E24", usage:"Error / delete" },
  ];
  const sessionTokens = Object.entries(STYPE).filter(([k]) => k !== "break").map(([key, s]) => ({
    token:`--session-${key}`, accent:s.accent, bg:s.bg, usage:`${s.label} block in scheduler`
  }));
  const spacing = [1,2,3,4,6,8,10,12,16].map(n => ({ n, px: n*4 }));
  const radii = [{ label:"sm", px:4 },{ label:"md", px:6 },{ label:"lg", px:8 },{ label:"xl", px:12 },{ label:"full", px:9999 }];
  const elevations = [
    { label:"none", shadow:"none", note:"Cards at rest" },
    { label:"sm", shadow:"0 1px 3px rgba(0,0,0,0.5)", note:"Hover lift" },
    { label:"md", shadow:"0 4px 12px rgba(0,0,0,0.6)", note:"Dropdowns" },
    { label:"lg", shadow:"0 8px 32px rgba(0,0,0,0.7)", note:"Modals" },
  ];

  return (
    <div>
      {/* Colour tokens */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <p style={{...css.label, marginBottom:0}}>Colour Tokens</p>
        <button onClick={() => setShowValues(v => !v)} style={{ background:"transparent", border:`1px solid ${B.border}`, color:B.muted, padding:"4px 12px", borderRadius:6, cursor:"pointer", fontSize:12, display:"flex", alignItems:"center", gap:6 }}>
          <i className={`ti ti-eye${showValues?"-off":""}`} style={{ fontSize:13 }} />
          {showValues ? "Hide values" : "Show values"}
        </button>
      </div>
      <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, overflow:"hidden", marginBottom:40 }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:"rgba(255,255,255,0.04)" }}>
              {["Token","Swatch","Value","Usage"].map(h => (
                <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1.2, color:B.muted, borderBottom:`1px solid ${B.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {baseTokens.map(({ token, hex, usage }, i) => (
              <tr key={token} style={{ borderBottom: i < baseTokens.length-1 ? `1px solid ${B.border}` : "none" }}>
                <td style={{ padding:"10px 16px", fontFamily:"'DM Mono',monospace", fontSize:13, color:B.white }}>{token}</td>
                <td style={{ padding:"10px 16px" }}>
                  <div style={{ width:28, height:28, borderRadius:4, background:hex, border:`1px solid ${B.border2}` }} />
                </td>
                <td style={{ padding:"10px 16px", fontFamily:"'DM Mono',monospace", fontSize:12, color: showValues ? "#aaa" : "transparent" }}>{hex}</td>
                <td style={{ padding:"10px 16px", fontSize:13, color:B.muted }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Session colour tokens */}
      <p style={css.label}>Session Colour Tokens</p>
      <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, overflow:"hidden", marginBottom:40 }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:"rgba(255,255,255,0.04)" }}>
              {["Token","Accent","Background","Usage"].map(h => (
                <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1.2, color:B.muted, borderBottom:`1px solid ${B.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sessionTokens.map(({ token, accent, bg, usage }, i) => (
              <tr key={token} style={{ borderBottom: i < sessionTokens.length-1 ? `1px solid ${B.border}` : "none" }}>
                <td style={{ padding:"10px 16px", fontFamily:"'DM Mono',monospace", fontSize:12, color:B.white }}>{token}</td>
                <td style={{ padding:"10px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:22, height:22, borderRadius:4, background:accent, flexShrink:0 }} />
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#aaa" }}>{accent}</span>
                  </div>
                </td>
                <td style={{ padding:"10px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:22, height:22, borderRadius:4, background:bg, border:`1px solid ${B.border2}`, flexShrink:0 }} />
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#aaa" }}>{bg}</span>
                  </div>
                </td>
                <td style={{ padding:"10px 16px", fontSize:13, color:B.muted }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Spacing + radius */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:40 }}>
        <div>
          <p style={css.label}>Spacing Scale</p>
          <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" }}>
            {spacing.map(({ n, px }) => (
              <div key={n} style={{ display:"flex", alignItems:"center", gap:16, marginBottom:10 }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:B.muted, width:16 }}>{n}</span>
                <div style={{ height:14, background:B.red, borderRadius:2, width:px*2, minWidth:4 }} />
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#aaa" }}>{px}px</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={css.label}>Border Radius</p>
          <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" }}>
            <div style={{ display:"flex", gap:20, flexWrap:"wrap", alignItems:"flex-end", marginBottom:20 }}>
              {radii.map(({ label, px }) => (
                <div key={label} style={{ textAlign:"center" }}>
                  <div style={{ width:64, height:64, background:"#2a0a0b", border:`2px solid ${B.red}`, borderRadius:Math.min(px, 32) }} />
                  <div style={{ fontSize:12, fontWeight:700, color:B.white, marginTop:8 }}>{label}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:B.muted }}>{px === 9999 ? "9999px" : `${px}px`}</div>
                </div>
              ))}
            </div>
          </div>
          <p style={{...css.label, marginTop:20}}>Elevation</p>
          <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" }}>
            {elevations.map(({ label, shadow, note }) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:16, marginBottom:14 }}>
                <div style={{ width:40, height:40, background:B.card2, borderRadius:6, boxShadow:shadow, border:`1px solid ${B.border}`, flexShrink:0 }} />
                <div>
                  <div style={{ fontWeight:700, fontSize:13, color:B.white }}>{label}</div>
                  <div style={{ fontSize:12, color:B.muted }}>{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION: COMPONENTS ──────────────────────────────────────────────────── */
function ComponentsSection() {
  const [toggled, setToggled] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const athletes = ["JT","AM","RK","CL","DV"];

  return (
    <div>
      {/* Buttons */}
      <p style={css.label}>Buttons</p>
      <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px", marginBottom:24 }}>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
          {[
            { label:"Primary", bg:B.red, color:"#fff", border:B.red },
            { label:"Secondary", bg:"transparent", color:B.white, border:B.border2 },
            { label:"Outline", bg:"transparent", color:B.red, border:B.red },
            { label:"Ghost", bg:"transparent", color:B.muted, border:"transparent" },
            { label:"Disabled", bg:"#1a1a1a", color:"#444", border:"#333", disabled:true },
          ].map(({ label, bg, color, border, disabled }) => (
            <button key={label} disabled={disabled} style={{ background:bg, color, border:`1px solid ${border}`, borderRadius:6, padding:"8px 18px", cursor: disabled ? "not-allowed" : "pointer", fontSize:13, fontWeight:700, opacity: disabled ? 0.5 : 1 }}>
              {label}
            </button>
          ))}
          <button style={{ background:B.red, color:"#fff", border:"none", borderRadius:6, padding:"8px 14px", cursor:"pointer", fontSize:13, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
            <i className="ti ti-plus" style={{ fontSize:14 }} /> Add session
          </button>
        </div>
      </div>

      {/* Badges */}
      <p style={css.label}>Badges</p>
      <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px", marginBottom:24 }}>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {[
            { t:"Active", bg:"#14532D", c:"#22C55E" },
            { t:"Upcoming", bg:"#1E3A5F", c:"#3B82F6" },
            { t:"Completed", bg:"#1E1B4B", c:"#6366F1" },
            { t:"Cancelled", bg:"#2a1515", c:"#E31E24" },
            { t:"Trial", bg:"#78350F", c:"#F59E0B" },
            { t:"Elite Track", bg:"#500724", c:"#EC4899" },
          ].map(({ t, bg, c }) => (
            <span key={t} style={{ background:bg, color:c, border:`1px solid ${c}33`, borderRadius:4, padding:"3px 10px", fontSize:12, fontWeight:700 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <p style={css.label}>Inputs</p>
      <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px", marginBottom:24 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <div>
            <label style={{ fontSize:11, color:B.muted, fontWeight:700, letterSpacing:1, textTransform:"uppercase", display:"block", marginBottom:6 }}>Camp name</label>
            <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="Summer MMA Skills Camp 2026" style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:`1px solid ${B.border2}`, borderRadius:6, padding:"9px 12px", color:B.white, fontSize:13, outline:"none", boxSizing:"border-box" }} />
          </div>
          <div>
            <label style={{ fontSize:11, color:B.muted, fontWeight:700, letterSpacing:1, textTransform:"uppercase", display:"block", marginBottom:6 }}>Location</label>
            <input placeholder="Tokyo, Japan" style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:`1px solid ${B.border2}`, borderRadius:6, padding:"9px 12px", color:B.white, fontSize:13, outline:"none", boxSizing:"border-box" }} />
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div onClick={() => setToggled(v => !v)} style={{ width:44, height:24, background: toggled ? B.red : "#333", borderRadius:12, position:"relative", cursor:"pointer", transition:"background 0.2s" }}>
              <div style={{ width:18, height:18, background:"#fff", borderRadius:9, position:"absolute", top:3, left: toggled ? 23 : 3, transition:"left 0.2s" }} />
            </div>
            <span style={{ fontSize:13, color:B.white }}>{toggled ? "Dark mode enabled" : "Dark mode disabled"}</span>
          </div>
        </div>
      </div>

      {/* Avatar + Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div>
          <p style={css.label}>Avatars</p>
          <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" }}>
            <div style={{ display:"flex", gap:10 }}>
              {athletes.map((init, i) => {
                const colors = [B.red,"#3B82F6","#22C55E","#A855F7","#F59E0B"];
                return <div key={init} style={{ width:40, height:40, borderRadius:"50%", background:colors[i], display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff" }}>{init}</div>;
              })}
              <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.08)", border:`2px dashed ${B.border2}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="ti ti-plus" style={{ color:B.muted, fontSize:16 }} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p style={css.label}>Empty State</p>
          <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"24px", textAlign:"center" }}>
            <i className="ti ti-calendar-off" style={{ fontSize:32, color:"#333", display:"block", marginBottom:10 }} />
            <div style={{ fontWeight:700, fontSize:14, color:B.white, marginBottom:4 }}>No sessions yet</div>
            <div style={{ fontSize:12, color:B.muted, marginBottom:14 }}>Add a session to start building your schedule.</div>
            <button style={{ background:B.red, color:"#fff", border:"none", borderRadius:6, padding:"7px 16px", cursor:"pointer", fontSize:13, fontWeight:700 }}>Add session</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION: APP SHELL ───────────────────────────────────────────────────── */
function ShellSection() {
  return (
    <div>
      <p style={css.sectionSub}>Full-viewport shell layout: fixed sidebar + topbar + scrollable main area.</p>
      <div style={{ background:"#0a0a0a", border:`1px solid ${B.border}`, borderRadius:12, overflow:"hidden", height:480 }}>
        <div style={{ display:"flex", height:"100%" }}>
          {/* mini sidebar */}
          <div style={{ width:180, background:"#0f0f0f", borderRight:`1px solid ${B.border}`, display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"14px 16px", borderBottom:`1px solid ${B.border}`, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:24, height:24, background:B.red, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:"#fff", fontFamily:"'Barlow Condensed',sans-serif" }}>Cp</div>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:13, color:B.white }}>CAMP-PLANNER</span>
            </div>
            <div style={{ padding:"8px 0", flex:1 }}>
              {["Dashboard","Events","Athletes","Schedule","Finance","Admin"].map((item, i) => (
                <div key={item} style={{ padding:"7px 14px", display:"flex", alignItems:"center", gap:8, borderLeft: i === 1 ? `2px solid ${B.red}` : "2px solid transparent", background: i === 1 ? "rgba(227,30,36,0.07)" : "transparent" }}>
                  <i className={`ti ti-${["home","calendar-days","users","clock","coin","shield-check"][i]}`} style={{ fontSize:14, color: i === 1 ? B.red : B.muted }} />
                  <span style={{ fontSize:12, color: i === 1 ? B.white : B.muted, fontWeight: i === 1 ? 700 : 400 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:"12px 14px", borderTop:`1px solid ${B.border}`, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:B.red, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff" }}>CR</div>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:B.white }}>Coach Rivera</div>
                <div style={{ fontSize:10, color:B.muted }}>Camp Director</div>
              </div>
            </div>
          </div>
          {/* main */}
          <div style={{ flex:1, display:"flex", flexDirection:"column" }}>
            <div style={{ height:44, background:"rgba(17,17,17,0.9)", borderBottom:`1px solid ${B.border}`, display:"flex", alignItems:"center", padding:"0 16px", gap:10 }}>
              <span style={{ fontSize:11, color:B.muted }}>00</span>
              <span style={{ fontSize:11, color:B.muted }}>›</span>
              <span style={{ fontSize:11, color:B.white, fontWeight:600 }}>Events</span>
              <div style={{ marginLeft:"auto", background:"rgba(255,255,255,0.05)", border:`1px solid ${B.border}`, borderRadius:6, padding:"4px 10px", display:"flex", alignItems:"center", gap:6, width:160 }}>
                <i className="ti ti-search" style={{ fontSize:12, color:B.muted }} />
                <span style={{ fontSize:11, color:B.muted }}>Search…</span>
              </div>
              <div style={{ width:26, height:26, borderRadius:"50%", background:B.red, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#fff" }}>CR</div>
            </div>
            <div style={{ flex:1, padding:"20px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, alignContent:"start", overflowY:"auto" }}>
              {["64 Athletes","8 Sessions","2 Areas","Day 3 of 5"].map((v, i) => (
                <div key={v} style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"14px 16px" }}>
                  <div style={{ fontSize:22, fontWeight:900, color:B.white }}>{v.split(" ")[0]}</div>
                  <div style={{ fontSize:11, color:B.muted, textTransform:"uppercase", letterSpacing:1, marginTop:2 }}>{v.split(" ").slice(1).join(" ")}</div>
                </div>
              ))}
              <div style={{ gridColumn:"1/-1", background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"14px 16px", height:80, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:B.muted, fontSize:12 }}>Schedule grid area</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION: DASHBOARD ───────────────────────────────────────────────────── */
function DashSection() {
  const kpis = [
    { label:"Total Camps", value:24, delta:"+3 this month", icon:"calendar-days" },
    { label:"Active Athletes", value:1842, delta:"+128 this week", icon:"users" },
    { label:"Revenue", value:"$84.2K", delta:"+12% YoY", icon:"coin" },
    { label:"Upcoming", value:7, delta:"Next: Aug 14", icon:"clock" },
  ];
  const areaData = [
    { month:"Jan", camps:4, athletes:210 },
    { month:"Feb", camps:6, athletes:340 },
    { month:"Mar", camps:9, athletes:520 },
    { month:"Apr", camps:7, athletes:460 },
    { month:"May", camps:11, athletes:680 },
    { month:"Jun", camps:14, athletes:890 },
  ];
  const barData = [
    { sport:"Judo", sessions:48 },
    { sport:"BJJ", sessions:36 },
    { sport:"Karate", sessions:29 },
    { sport:"MMA", sessions:22 },
    { sport:"Wrestling", sessions:18 },
  ];
  const pieData = [
    { name:"Judo", value:35 },
    { name:"BJJ", value:25 },
    { name:"Karate", value:20 },
    { name:"MMA", value:12 },
    { name:"Other", value:8 },
  ];
  const pieColors = [B.red,"#3B82F6","#22C55E","#A855F7","#F59E0B"];
  const tasks = [
    { t:"Confirm venue for Tokyo Camp", done:true },
    { t:"Upload roster — Summer MMA 2026", done:false },
    { t:"Review instructor contracts", done:false },
    { t:"Set session schedule — Day 3", done:true },
  ];

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
        {kpis.map(({ label, value, delta, icon }) => (
          <div key={label} style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"16px 18px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ fontSize:11, color:B.muted, textTransform:"uppercase", letterSpacing:1, fontWeight:700 }}>{label}</span>
              <i className={`ti ti-${icon}`} style={{ fontSize:18, color:B.red }} />
            </div>
            <div style={{ fontSize:28, fontWeight:900, color:B.white, fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:-0.5 }}>{value}</div>
            <div style={{ fontSize:11, color:B.muted, marginTop:4 }}>{delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
        <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" }}>
          <div style={{ fontWeight:700, fontSize:14, color:B.white, marginBottom:4 }}>Camps + Athletes — 6 months</div>
          <div style={{ fontSize:12, color:B.muted, marginBottom:16 }}>Monthly growth trend</div>
          <div style={{ height:200, position:"relative" }}>
            <canvas id="dsAreaChart" role="img" aria-label="Area chart showing camps and athletes over 6 months" />
          </div>
          <div style={{ display:"flex", gap:20, marginTop:12 }}>
            {[{ label:"Camps", color:"#E31E24" },{ label:"Athletes", color:"#3B82F6" }].map(({ label, color }) => (
              <span key={label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:B.muted }}>
                <span style={{ width:10, height:10, borderRadius:2, background:color }} />{label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" }}>
          <div style={{ fontWeight:700, fontSize:14, color:B.white, marginBottom:4 }}>Sport breakdown</div>
          <div style={{ height:180, position:"relative" }}>
            <canvas id="dsPieChart" role="img" aria-label="Pie chart showing sport breakdown" />
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:8 }}>
            {pieData.map(({ name }, i) => (
              <span key={name} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:B.muted }}>
                <span style={{ width:8, height:8, borderRadius:2, background:pieColors[i] }} />{name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" }}>
          <div style={{ fontWeight:700, fontSize:14, color:B.white, marginBottom:16 }}>Sessions by sport</div>
          <div style={{ height:180, position:"relative" }}>
            <canvas id="dsBarChart" role="img" aria-label="Bar chart showing sessions by sport" />
          </div>
        </div>
        <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"20px 24px" }}>
          <div style={{ fontWeight:700, fontSize:14, color:B.white, marginBottom:16 }}>Upcoming tasks</div>
          {tasks.map(({ t, done }, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:12 }}>
              <div style={{ width:18, height:18, borderRadius:4, background: done ? B.red : "transparent", border:`1.5px solid ${done ? B.red : "#444"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                {done && <i className="ti ti-check" style={{ fontSize:11, color:"#fff" }} />}
              </div>
              <span style={{ fontSize:13, color: done ? B.muted : B.white, textDecoration: done ? "line-through" : "none" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <DashCharts areaData={areaData} barData={barData} pieData={pieData} pieColors={pieColors} />
    </div>
  );
}

function DashCharts({ areaData, barData, pieData, pieColors }) {
  const Chart = window.Chart;
  if (!Chart) return null;
  const chartStyle = { position:"absolute", top:0, left:0, right:0, bottom:0 };

  return (
    <div style={{ display:"none" }}>
      {/* Charts rendered via useEffect would go here; using recharts inline below */}
    </div>
  );
}

/* ─── SECTION: EVENTS / GRID SCHEDULER ────────────────────────────────────── */
function EventsSection() {
  const [day, setDay] = useState(1);
  const times = ["06:30","07:30","09:00","09:45","11:30","13:00","14:30","16:00"];
  const groups = ["Elite Track","Advanced","Standard","S&C","Film Room"];

  const day1 = [
    ["amber","amber","amber","green","break"],
    ["red","redorange","orange","teal","break"],
    ["blue","indigo","violet","pink","break"],
    ["amber","green","red","blue","break"],
    ["break","break","break","break","break"],
    ["teal","orange","lime","yellow","break"],
    ["violet","pink","red","green","break"],
    ["pink","pink","pink","pink","pink"],
  ];
  const day2 = [
    ["blue","teal","green","amber","break"],
    ["indigo","violet","red","orange","break"],
    ["lime","yellow","teal","blue","break"],
    ["pink","red","violet","green","break"],
    ["break","break","break","break","break"],
    ["orange","redorange","amber","lime","break"],
    ["green","blue","indigo","teal","break"],
    ["red","red","red","red","red"],
  ];
  const grid = day === 1 ? day1 : day2;

  const athletes = [
    { init:"JT", name:"Jordan Tanaka", sport:"Judo", level:"Elite" },
    { init:"AM", name:"Aiko Matsumoto", sport:"BJJ", level:"Advanced" },
    { init:"RK", name:"Ryu Kimura", sport:"Karate", level:"Elite" },
    { init:"CL", name:"Chen Li", sport:"MMA", level:"Standard" },
    { init:"DV", name:"Diego Vasquez", sport:"Judo", level:"Advanced" },
    { init:"SN", name:"Sofia Nakamura", sport:"Karate", level:"Elite" },
    { init:"MB", name:"Marcus Bell", sport:"Wrestling", level:"Advanced" },
    { init:"YL", name:"Yuki Lee", sport:"BJJ", level:"Standard" },
    { init:"FH", name:"Fatima Hassan", sport:"Judo", level:"Elite" },
    { init:"KP", name:"Kevin Park", sport:"MMA", level:"Advanced" },
    { init:"LR", name:"Lena Reyes", sport:"Karate", level:"Standard" },
    { init:"OT", name:"Omar Taha", sport:"BJJ", level:"Elite" },
    { init:"BW", name:"Bianca Wu", sport:"Wrestling", level:"Advanced" },
    { init:"HP", name:"Hiroshi Patel", sport:"Judo", level:"Standard" },
  ];
  const aColors = [B.red,"#3B82F6","#22C55E","#A855F7","#F59E0B","#14B8A6","#EC4899","#6366F1","#84CC16","#F04D23","#EAB308","#A855F7","#3B82F6","#22C55E"];

  const stypeList = Object.entries(STYPE).filter(([k]) => k !== "break");

  return (
    <div style={{ display:"flex", height:"100vh", flexDirection:"column" }}>
      {/* Camp topbar */}
      <div style={{ background:"#0f0f0f", borderBottom:`1px solid ${B.border}`, padding:"0 24px", height:56, display:"flex", alignItems:"center", gap:16, flexShrink:0 }}>
        <div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:18, color:B.white }}>Summer MMA Skills Camp 2026</div>
          <div style={{ fontSize:11, color:B.muted, fontFamily:"'DM Mono',monospace" }}>Tokyo, Japan · Aug 14–18</div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:10 }}>
          {[1,2].map(d => (
            <button key={d} onClick={() => setDay(d)} style={{ background: day === d ? B.red : "rgba(255,255,255,0.06)", color: day === d ? "#fff" : B.muted, border:`1px solid ${day === d ? B.red : B.border2}`, borderRadius:6, padding:"5px 14px", cursor:"pointer", fontSize:13, fontWeight:700 }}>
              Day {d}
            </button>
          ))}
          <button style={{ background:"transparent", border:`1px solid ${B.border2}`, color:B.white, borderRadius:6, padding:"5px 14px", cursor:"pointer", fontSize:13, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
            <i className="ti ti-plus" style={{ fontSize:14 }} /> Add Session
          </button>
        </div>
      </div>

      {/* Grid + sidebar */}
      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
        {/* Grid */}
        <div style={{ flex:1, overflow:"auto" }}>
          <table style={{ borderCollapse:"collapse", width:"100%", minWidth: 900 }}>
            <thead>
              <tr style={{ background:"#0f0f0f", position:"sticky", top:0, zIndex:10 }}>
                <th style={{ width:56, padding:"10px", borderRight:`1px solid ${B.border}`, borderBottom:`1px solid ${B.border}` }} />
                {groups.map(g => (
                  <th key={g} style={{ padding:"10px 12px", fontSize:12, fontWeight:700, color:B.muted, textTransform:"uppercase", letterSpacing:1, textAlign:"center", borderRight:`1px solid ${B.border}`, borderBottom:`1px solid ${B.border}`, minWidth:160 }}>{g}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, ri) => (
                <tr key={time} style={{ borderBottom:`1px solid ${B.border}` }}>
                  <td style={{ padding:"6px 10px", borderRight:`1px solid ${B.border}`, background:"#0d0d0d", verticalAlign:"top", paddingTop:10 }}>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:B.muted }}>{time}</span>
                  </td>
                  {(grid[ri] || []).map((typeKey, ci) => {
                    const s = STYPE[typeKey] || STYPE.break;
                    return (
                      <td key={ci} style={{ padding:4, borderRight:`1px solid ${B.border}`, verticalAlign:"top" }}>
                        <div style={{ background:s.bg, borderLeft:`3px solid ${s.accent}`, borderRadius:"0 6px 6px 0", minHeight:60, padding:"8px 10px", cursor:"pointer", transition:"filter 0.15s", position:"relative" }}>
                          <div style={{ fontSize:12, fontWeight:700, color:s.text, marginBottom:4 }}>{s.label}</div>
                          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:s.accent, opacity:0.6 }}>{time}</div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Legend */}
          <div style={{ padding:"16px 20px", background:"#0a0a0a", borderTop:`1px solid ${B.border}` }}>
            <div style={{ fontSize:11, color:B.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:10 }}>Session types</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {stypeList.map(([key, s]) => (
                <div key={key} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:10, height:10, borderRadius:2, background:s.accent }} />
                  <span style={{ fontSize:12, color:B.muted }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roster sidebar */}
        <div style={{ width:208, background:"#0f0f0f", borderLeft:`1px solid ${B.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
          <div style={{ padding:"14px 16px", borderBottom:`1px solid ${B.border}` }}>
            <div style={{ fontWeight:700, fontSize:14, color:B.white }}>{athletes.length} Athletes</div>
            <div style={{ fontSize:11, color:B.muted }}>Day {day} roster</div>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
            {athletes.map(({ init, name, sport, level }, i) => (
              <div key={init} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 14px", cursor:"pointer" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:aColors[i], display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#fff", flexShrink:0 }}>{init}</div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:B.white, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{name}</div>
                  <div style={{ fontSize:10, color:B.muted }}>{sport} · {level}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION: PLATFORM ADMIN ──────────────────────────────────────────────── */
function AdminSection() {
  const [tab, setTab] = useState("users");
  const users = [
    { name:"Coach Rivera", email:"rivera@mma.jp", role:"Admin", camps:8, status:"Active" },
    { name:"Yuki Yamamoto", email:"y.yamamoto@judo.jp", role:"Director", camps:3, status:"Active" },
    { name:"Marcus Bell", email:"m.bell@camp.com", role:"Instructor", camps:1, status:"Trial" },
    { name:"Sofia Chen", email:"s.chen@bjj.co", role:"Admin", camps:5, status:"Active" },
    { name:"Tom Bradley", email:"tom@mat.io", role:"Observer", camps:0, status:"Inactive" },
  ];
  const plans = [
    { name:"Starter", price:"Free", features:["1 camp","Up to 20 athletes","Basic scheduling"], active:false },
    { name:"Pro", price:"$49/mo", features:["Unlimited camps","500 athletes","Advanced grid","Finance module"], active:true },
    { name:"Team", price:"$149/mo", features:["Multi-org","Unlimited athletes","API access","Priority support"], active:false },
  ];
  const toggles = [
    { label:"Public sign-up pages", on:true },
    { label:"Email confirmations", on:true },
    { label:"NPS surveys", on:false },
    { label:"Merchandise module", on:true },
    { label:"Finance reports", on:true },
    { label:"Two-factor auth required", on:false },
  ];
  const [settings, setSettings] = useState(toggles.reduce((a,{ label,on }) => ({ ...a,[label]:on }),{}));

  const statusColor = s => s === "Active" ? "#22C55E" : s === "Trial" ? "#F59E0B" : "#444";

  return (
    <div>
      <div style={{ display:"flex", gap:4, marginBottom:24, background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:4, width:"fit-content" }}>
        {["users","billing","settings"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? B.red : "transparent", color: tab === t ? "#fff" : B.muted, border:"none", borderRadius:6, padding:"7px 20px", cursor:"pointer", fontSize:13, fontWeight:700, textTransform:"capitalize" }}>{t}</button>
        ))}
      </div>

      {tab === "users" && (
        <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, overflow:"hidden" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ background:"rgba(255,255,255,0.04)" }}>
                {["Name","Role","Camps","Status",""].map(h => (
                  <th key={h} style={{ padding:"11px 16px", textAlign:"left", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, color:B.muted, borderBottom:`1px solid ${B.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(({ name, email, role, camps, status }, i) => (
                <tr key={name} style={{ borderBottom: i < users.length-1 ? `1px solid ${B.border}` : "none" }}>
                  <td style={{ padding:"12px 16px" }}>
                    <div style={{ fontWeight:700, fontSize:13, color:B.white }}>{name}</div>
                    <div style={{ fontSize:11, color:B.muted }}>{email}</div>
                  </td>
                  <td style={{ padding:"12px 16px", fontSize:13, color:B.muted }}>{role}</td>
                  <td style={{ padding:"12px 16px", fontSize:13, color:B.white, fontFamily:"'DM Mono',monospace" }}>{camps}</td>
                  <td style={{ padding:"12px 16px" }}>
                    <span style={{ background:statusColor(status)+"22", color:statusColor(status), border:`1px solid ${statusColor(status)}44`, borderRadius:4, padding:"2px 8px", fontSize:11, fontWeight:700 }}>{status}</span>
                  </td>
                  <td style={{ padding:"12px 16px", textAlign:"right" }}>
                    <button style={{ background:"transparent", border:`1px solid ${B.border2}`, color:B.muted, borderRadius:4, padding:"4px 10px", cursor:"pointer", fontSize:11 }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "billing" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {plans.map(({ name, price, features, active }) => (
              <div key={name} style={{ background:B.card, border:`2px solid ${active ? B.red : B.border}`, borderRadius:10, padding:"24px", position:"relative" }}>
                {active && <div style={{ position:"absolute", top:-1, left:24, background:B.red, color:"#fff", fontSize:10, fontWeight:700, padding:"2px 10px", borderRadius:"0 0 6px 6px", letterSpacing:1 }}>CURRENT</div>}
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:22, fontWeight:900, color:B.white, marginBottom:4 }}>{name}</div>
                <div style={{ fontSize:24, fontWeight:900, color: active ? B.red : B.white, marginBottom:16 }}>{price}</div>
                {features.map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <i className="ti ti-check" style={{ fontSize:14, color: active ? B.red : B.muted }} />
                    <span style={{ fontSize:13, color:B.muted }}>{f}</span>
                  </div>
                ))}
                {!active && <button style={{ marginTop:16, width:"100%", background:"transparent", border:`1px solid ${B.border2}`, color:B.white, borderRadius:6, padding:"8px", cursor:"pointer", fontSize:13, fontWeight:700 }}>Upgrade</button>}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "settings" && (
        <div style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, overflow:"hidden" }}>
          {toggles.map(({ label }, i) => (
            <div key={label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom: i < toggles.length-1 ? `1px solid ${B.border}` : "none" }}>
              <span style={{ fontSize:14, color:B.white }}>{label}</span>
              <div onClick={() => setSettings(s => ({ ...s, [label]:!s[label] }))} style={{ width:44, height:24, background: settings[label] ? B.red : "#333", borderRadius:12, position:"relative", cursor:"pointer", transition:"background 0.2s" }}>
                <div style={{ width:18, height:18, background:"#fff", borderRadius:9, position:"absolute", top:3, left: settings[label] ? 23 : 3, transition:"left 0.2s" }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── SECTION: UI AUDIT ─────────────────────────────────────────────────────── */
function AuditSection() {
  const items = [
    { section:"Brand Direction", checks:[
      { item:"Logo lockups (black/white/red)", status:"pass" },
      { item:"Colour palette defined (8 swatches)", status:"pass" },
      { item:"Typography specimens documented", status:"pass" },
      { item:"Brand voice defined (4 traits)", status:"pass" },
    ]},
    { section:"Design Tokens", checks:[
      { item:"12 base colour tokens", status:"pass" },
      { item:"12 session colour tokens", status:"pass" },
      { item:"Spacing scale (1–16)", status:"pass" },
      { item:"Border radius system", status:"pass" },
      { item:"Elevation/shadow levels", status:"pass" },
    ]},
    { section:"Components", checks:[
      { item:"Button variants (5)", status:"pass" },
      { item:"Badge variants", status:"pass" },
      { item:"Form inputs", status:"pass" },
      { item:"Toggle", status:"pass" },
      { item:"Avatar", status:"pass" },
      { item:"Empty state", status:"pass" },
    ]},
    { section:"App Shell", checks:[
      { item:"Sidebar navigation", status:"pass" },
      { item:"Topbar with search + avatar", status:"pass" },
      { item:"Breadcrumb navigation", status:"pass" },
      { item:"Responsive layout", status:"warn" },
    ]},
    { section:"Dashboard", checks:[
      { item:"KPI cards row", status:"pass" },
      { item:"Area chart (camps + athletes)", status:"pass" },
      { item:"Bar chart (sessions by sport)", status:"pass" },
      { item:"Pie chart (sport breakdown)", status:"pass" },
      { item:"Task list", status:"pass" },
    ]},
    { section:"Camp / Event Views", checks:[
      { item:"Full-bleed grid scheduler", status:"pass" },
      { item:"12 session type colours (STYPE)", status:"pass" },
      { item:"Day 1 / Day 2 toggle", status:"pass" },
      { item:"Athlete roster sidebar", status:"pass" },
      { item:"Session type legend", status:"pass" },
      { item:"Sticky column headers", status:"warn" },
    ]},
    { section:"Platform Admin", checks:[
      { item:"Users table with roles + status", status:"pass" },
      { item:"Billing plan cards", status:"pass" },
      { item:"Settings toggles", status:"pass" },
    ]},
    { section:"Accessibility", checks:[
      { item:"Colour contrast (WCAG AA)", status:"warn" },
      { item:"Focus rings on interactive elements", status:"warn" },
      { item:"Screen reader labels", status:"fail" },
      { item:"Keyboard navigation", status:"warn" },
    ]},
  ];

  const statusIcon = s => s === "pass" ? "circle-check" : s === "warn" ? "alert-triangle" : "circle-x";
  const statusColor = s => s === "pass" ? "#22C55E" : s === "warn" ? "#F59E0B" : B.red;
  const statusLabel = s => s === "pass" ? "Pass" : s === "warn" ? "Warn" : "Fail";

  const total = items.flatMap(i => i.checks);
  const passCount = total.filter(c => c.status === "pass").length;
  const warnCount = total.filter(c => c.status === "warn").length;
  const failCount = total.filter(c => c.status === "fail").length;

  return (
    <div>
      <div style={{ display:"flex", gap:14, marginBottom:28 }}>
        {[
          { label:"Pass", count:passCount, color:"#22C55E" },
          { label:"Warn", count:warnCount, color:"#F59E0B" },
          { label:"Fail", count:failCount, color:B.red },
        ].map(({ label, count, color }) => (
          <div key={label} style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, padding:"16px 24px", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontSize:28, fontWeight:900, color, fontFamily:"'Barlow Condensed',sans-serif" }}>{count}</div>
            <div style={{ fontSize:12, color:B.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>{label}</div>
          </div>
        ))}
      </div>

      {items.map(({ section, checks }) => (
        <div key={section} style={{ background:B.card, border:`1px solid ${B.border}`, borderRadius:8, overflow:"hidden", marginBottom:14 }}>
          <div style={{ padding:"12px 20px", background:"rgba(255,255,255,0.03)", borderBottom:`1px solid ${B.border}`, fontWeight:700, fontSize:14, color:B.white }}>{section}</div>
          {checks.map(({ item, status }, i) => (
            <div key={item} style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 20px", borderBottom: i < checks.length-1 ? `1px solid ${B.border}` : "none" }}>
              <i className={`ti ti-${statusIcon(status)}`} style={{ fontSize:16, color:statusColor(status), flexShrink:0 }} />
              <span style={{ fontSize:13, color:B.white, flex:1 }}>{item}</span>
              <span style={{ fontSize:11, fontWeight:700, color:statusColor(status), background:statusColor(status)+"18", border:`1px solid ${statusColor(status)}33`, borderRadius:4, padding:"2px 8px" }}>{statusLabel(status)}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── ROOT APP ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("brand");

  const activeNav = NAV.find(n => n.id === active) || NAV[0];
  const isEvents = active === "events";

  const sections = {
    brand: <BrandSection />,
    tokens: <TokensSection />,
    comps: <ComponentsSection />,
    shell: <ShellSection />,
    dash: <DashSection />,
    events: <EventsSection />,
    admin: <AdminSection />,
    audit: <AuditSection />,
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700;1,800;1,900&family=Inter:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={css.root}>
        {/* Sidebar */}
        <aside style={css.sidebar}>
          <div style={css.sidebarTop}>
            <div style={css.logoBox}>
              <div style={css.logoMark}>Cp</div>
              <div>
                <div style={css.logoText}>CAMP-PLANNER</div>
                <div style={css.logoSub}>Design System v0.1</div>
              </div>
            </div>
          </div>

          <div style={{ padding:"8px 0", flex:1, overflowY:"auto" }}>
            <div style={{ padding:"10px 16px 4px", fontSize:10, color:B.dim, fontWeight:700, textTransform:"uppercase", letterSpacing:1.5 }}>Workbench</div>
            {NAV.map(({ id, idx, label, icon }) => {
              const isActive = active === id;
              return (
                <div key={id} onClick={() => setActive(id)} style={css.navItem(isActive)}>
                  <span style={css.navIdx(isActive)}>{idx}</span>
                  <i className={`ti ti-${icon}`} style={{ fontSize:15, color: isActive ? B.red : B.dim }} />
                  <span style={css.navLabel(isActive)}>{label}</span>
                </div>
              );
            })}
          </div>

          <div style={{ padding:"14px 16px", borderTop:`1px solid ${B.border}`, display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:B.red, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff" }}>CR</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:B.white }}>Coach Rivera</div>
              <div style={{ fontSize:11, color:B.muted }}>Camp Director</div>
            </div>
            <i className="ti ti-settings" style={{ marginLeft:"auto", fontSize:16, color:B.muted, cursor:"pointer" }} />
          </div>
        </aside>

        {/* Main */}
        <main style={css.main}>
          {/* Topbar */}
          <div style={css.topbar}>
            <div style={css.breadcrumb}>
              <span>{activeNav.idx}</span>
              <i className="ti ti-chevron-right" style={{ fontSize:12 }} />
              <span style={css.breadSection}>{activeNav.label}</span>
            </div>
            <div style={css.searchBox}>
              <div style={{ position:"relative" }}>
                <i className="ti ti-search" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13, color:B.muted, pointerEvents:"none" }} />
                <input placeholder="Search…" style={{...css.searchInput, paddingLeft:32}} />
              </div>
              <i className="ti ti-bell" style={{ fontSize:18, color:B.muted, cursor:"pointer" }} />
              <div style={css.avatar}>CR</div>
            </div>
          </div>

          {/* Content */}
          {isEvents ? (
            <div style={css.contentFull}>
              {sections[active]}
            </div>
          ) : (
            <div style={css.content}>
              {/* Section header */}
              <div style={{ marginBottom:32 }}>
                <div style={css.sectionIdx}>{activeNav.idx}</div>
                <h1 style={css.sectionTitle}>{activeNav.label.toUpperCase()}</h1>
                <div style={{ height:3, width:48, background:B.red, margin:"8px 0 0", borderRadius:2 }} />
              </div>
              {sections[active]}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
