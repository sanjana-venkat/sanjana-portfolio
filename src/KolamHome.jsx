import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TESTIMONIALS } from "./data/portfolioData";
import "./kolam.css";

const SECTION_META = {
  sanjana: { number: "01", label: "Sanjana", preview: "About me", path: 1 },
  story: { number: "02", label: "Story", preview: "How I got here", path: 2 },
  snippets: { number: "03", label: "Snippets", preview: "Selected work and chat", path: 3 },
  statements: { number: "04", label: "Statements", preview: "How I think", path: 4 },
};

const PATHS = [
  "M156 127 C164 120 171 112 176 105 C187 92 191 81 188 70 C185 58 173 54 164 58 C155 63 154 76 158 86 C162 98 176 107 185 117 C195 129 199 143 192 151 C184 160 169 157 160 149 C151 141 148 133 156 127",
  "M156 127 C142 116 126 105 113 94 C101 84 89 71 76 63 C63 56 49 56 44 69 C39 81 42 91 52 99 C64 110 79 109 90 101 C103 92 111 74 125 63 C138 52 151 55 155 68 C160 85 151 99 138 109 C122 121 104 132 88 141",
  "M156 127 C140 132 124 140 108 149 C94 157 78 163 65 154 C52 146 45 135 49 124 C53 113 65 108 77 112 C93 116 106 125 116 136 C101 146 85 157 70 168 C58 177 50 189 53 204 C56 218 67 229 80 228 C91 227 97 213 93 201 C89 189 77 181 65 174",
  "M62 132 C75 130 90 137 103 145 C118 155 128 170 141 181 C153 192 163 201 176 211 C188 219 203 221 212 215 C221 209 222 199 214 192 C204 183 188 184 177 190 C165 197 153 211 141 220 C130 228 116 227 108 217 C99 207 102 192 111 182 C123 168 140 157 155 149 C169 141 181 133 192 124",
];

const DOTS = [[84,84],[130,84],[176,84],[84,130],[130,130],[176,130],[84,176],[130,176],[176,176]];
const DOT_SECTIONS = { sanjana: [2,5], story: [0,1], snippets: [3,6], statements: [4,7,8] };

const STORY_POINTS = [
  { year: "2020", title: "Psychology + design", copy: "Studied how people think, feel and make decisions at UTD.", image: "/2020.jpg" },
  { year: "2023", title: "Paycom", copy: "Joined an enterprise product team and focused on systems that helped teams move faster.", image: "/2023.jpg" },
  { year: "2024", title: "JPMorgan Chase", copy: "Owned application experiences, personalization work and AI product concepts.", image: "/2024.jpg" },
  { year: "2026", title: "Frisco to San Francisco", copy: "Moved to the Bay Area and started a new chapter.", image: "/2026.png" },
  { year: "Now", title: "Design engineer", copy: "Building polished AI product ideas fast.", image: "/2026.jpg" },
];

const SHORTCUTS = [
  { slug: "ai-personalization", title: "RecSys", image: "/marketing-preview.png", copy: "Recommendations built around what someone needs now." },
  { slug: "model-design", title: "Personalized travel", image: "/outdone-preview.png", copy: "Mood and context become a day someone can follow." },
  { slug: "muesli", title: "Speech-to-text", image: "/muesli-preview.jpg", copy: "A clearer local-first dictation experience." },
];

function CursorGlow({ focused }) {
  const glowRef = useRef(null);
  const target = useRef({ x: -400, y: -400 });
  const current = useRef({ x: -400, y: -400 });
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) return undefined;
    const move = event => { target.current = { x: event.clientX, y: event.clientY }; };
    const leave = () => { target.current = { x: -400, y: -400 }; };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    let frame;
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * .08;
      current.current.y += (target.current.y - current.current.y) * .08;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${current.current.x - 170}px, ${current.current.y - 170}px, 0)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerleave", leave); cancelAnimationFrame(frame); };
  }, []);
  return <div ref={glowRef} className={`portfolio-cursor-glow ${focused ? "is-focused" : ""}`} aria-hidden="true" />;
}

function OriginWordplay() {
  const [phase, setPhase] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 4 : 0);
  const timers = useRef([]);
  const play = () => {
    timers.current.forEach(clearTimeout);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setPhase(4);
    setPhase(0);
    timers.current = [setTimeout(() => setPhase(1), 450), setTimeout(() => setPhase(2), 850), setTimeout(() => setPhase(3), 1250), setTimeout(() => setPhase(4), 1500)];
  };
  useEffect(() => {
    timers.current = [setTimeout(() => setPhase(1), 450), setTimeout(() => setPhase(2), 850), setTimeout(() => setPhase(3), 1250), setTimeout(() => setPhase(4), 1500)];
    return () => timers.current.forEach(clearTimeout);
  }, []);
  return <button type="button" className="canvas-origin" onClick={play} aria-label="Replay Frisco to San Francisco"><span className={phase >= 2 ? "is-in" : ""}>san&nbsp;</span>fr<span className={phase >= 1 ? "is-in" : ""}>an</span>cisco,&nbsp;<i className={phase >= 3 ? "is-out" : ""}>tx</i><b className={phase >= 4 ? "is-in" : ""}>ca</b></button>;
}

function IntroKolam({ introStage, focusSection }) {
  const focusedPath = focusSection ? SECTION_META[focusSection].path : null;
  const pencilPath = introStage > 0 && introStage < 9 ? Math.min(Math.floor((introStage - 1) / 2), PATHS.length - 1) : null;
  return (
    <svg className="kolam-svg" viewBox="0 0 260 260" role="img" aria-label="A pulli kolam drawn around nine dots">
      <g className="kolam-svg-dots" aria-hidden="true">{DOTS.map(([cx,cy], index) => <circle key={index} cx={cx} cy={cy} r="3.2" style={{ "--dot-delay": `${index * 42}ms` }} className={focusSection && !DOT_SECTIONS[focusSection].includes(index) ? "is-dim" : ""} />)}</g>
      <g className="kolam-svg-paths" aria-hidden="true">{PATHS.map((path, index) => <path key={index} d={path} pathLength="1" className={`${introStage >= index * 2 + 1 ? "is-drawn" : ""} ${focusedPath && focusedPath !== index + 1 ? "is-dim" : ""} ${focusedPath === index + 1 ? "is-bright" : ""}`} />)}</g>
      {pencilPath !== null && <g key={pencilPath} className="kolam-pencil" aria-hidden="true">
        <rect x="-11" y="-2.6" width="9" height="5.2" rx="1" />
        <path d="M-2 -2.6 L3 0 L-2 2.6 Z" />
        <path className="kolam-pencil-lead" d="M1.2 -.9 L3 0 L1.2 .9 Z" />
        <animateMotion path={PATHS[pencilPath]} dur="550ms" fill="freeze" rotate="auto" />
      </g>}
    </svg>
  );
}

function SectionLabels({ active, onHover, onSelect }) {
  return <nav className="kolam-section-labels" aria-label="Portfolio sections">{Object.entries(SECTION_META).map(([id, meta]) => <button key={id} type="button" className={`is-${id} ${active === id ? "is-active" : ""}`} onMouseEnter={() => onHover(id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(id)} onBlur={() => onHover(null)} onClick={() => onSelect(id)}><span>{meta.number}</span><strong>{meta.label}</strong><small>{meta.preview}</small></button>)}</nav>;
}

function SelectedWorkShortcuts({ onOpenProject }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <aside className={`selected-work-shortcuts ${mobileOpen ? "is-open" : ""}`}><button type="button" className="selected-work-toggle" onClick={() => setMobileOpen(value => !value)}>Selected work <span>↘</span></button><p>Selected work</p><div>{SHORTCUTS.map(project => <button key={project.slug} type="button" onClick={() => onOpenProject(project.slug)}><span>{project.title}</span><small>{project.copy}</small><img src={project.image} alt="" /></button>)}</div></aside>;
}

function SanjanaSection() {
  return <div className="sanjana-section"><p className="section-eyebrow">Sanjana</p><h1>Sanjana</h1><h2>I turn ambiguity into reality. Let me show you.</h2><p className="section-lead">Product designer + builder designing AI interfaces, recommendation systems, and model behavior.</p><nav><a href="https://www.linkedin.com/in/sanjana-venkat/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/sanjana-venkat" target="_blank" rel="noreferrer">GitHub</a><a href="/SanjanaVenkat_Design-Engineer_Resume1.pdf" target="_blank" rel="noreferrer">Résumé</a><a href="mailto:sanjanavnkt20@gmail.com">Email</a></nav><p className="section-bio">I studied psychology because I loved thinking about how people think. That curiosity never left; it found a new home in product design and in the systems I build to get closer to what someone needs.</p></div>;
}

function StorySection() {
  const [selected, setSelected] = useState(0);
  const point = STORY_POINTS[selected];
  return <div className="story-section"><div className="story-heading"><p className="section-eyebrow">Story</p><h2>How I got here</h2><OriginWordplay /></div><div className="story-timeline" role="list">{STORY_POINTS.map((item,index) => <button key={item.year} type="button" role="listitem" aria-current={selected === index} onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)}><span>{item.year}</span><i /></button>)}</div><div className="story-detail"><img key={point.image} src={point.image} alt="" /><div><p>{point.year}</p><h3>{point.title}</h3><span>{point.copy}</span></div></div></div>;
}

function SnippetsSection({ chat, onOpenProject }) {
  return <div className="snippets-section"><header><p className="section-eyebrow">Snippets</p><h2>Work, process and things I build</h2><div><span><strong>9 to 5</strong> Enterprise product design</span><span><strong>5 to 9</strong> Independent products + AI experiments</span></div></header><div className="snippet-projects">{SHORTCUTS.map(project => <button key={project.slug} type="button" onClick={() => onOpenProject(project.slug)}><img src={project.image} alt="" /><span>{project.title}</span></button>)}</div><p className="chat-invitation">Ask me about my work, process, AI projects, or what I would bring to your team.</p>{chat}</div>;
}

function StatementsSection() {
  return <div className="statements-section"><p className="section-eyebrow">Statements</p><h2>What people say</h2><div>{TESTIMONIALS.slice(0,3).map(([quote,name,title]) => <blockquote key={name}><p>“{quote}”</p><footer><strong>{name}</strong><span>{title}</span></footer></blockquote>)}</div></div>;
}

export default function KolamHome({ chat, onOpenProject }) {
  const reduced = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const seen = window.sessionStorage.getItem("kolamIntroSeen") === "true";
  const [introStage, setIntroStage] = useState(reduced || seen ? 9 : 0);
  const [checkpoint, setCheckpoint] = useState(null);
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const timers = useRef([]);
  const complete = introStage >= 9;
  const focusSection = active || hovered;

  const skipIntro = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setIntroStage(9); setCheckpoint(null);
    window.sessionStorage.setItem("kolamIntroSeen", "true");
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  useEffect(() => {
    if (complete) return undefined;
    const schedule = [[450,1],[1000,2,"Sanjana"],[1450,3],[2000,4,"Story"],[2450,5],[3000,6,"Snippets"],[3450,7],[4000,8,"Statements"],[4750,9]];
    timers.current = schedule.map(([delay,stage,label]) => setTimeout(() => { setIntroStage(stage); setCheckpoint(label || null); if (stage === 9) window.sessionStorage.setItem("kolamIntroSeen", "true"); }, delay));
    return () => timers.current.forEach(clearTimeout);
  }, [complete]);

  useEffect(() => {
    const key = event => {
      if (!complete && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); skipIntro(); }
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [complete, skipIntro]);

  const content = { sanjana: <SanjanaSection />, story: <StorySection />, snippets: <SnippetsSection chat={chat} onOpenProject={onOpenProject} />, statements: <StatementsSection /> };

  return <main className={`portfolio-canvas ${complete ? "is-complete" : "is-intro"} ${active ? `has-active active-${active}` : ""}`} onPointerDown={event => { if (!complete && !event.target.closest("button")) skipIntro(); }}>
    <CursorGlow focused={focusSection} />
    {active && <button type="button" className="canvas-dismiss" aria-label="Return to central kolam" onClick={() => setActive(null)} />}
    <header className="canvas-header"><p>Sanjana Venkat</p><span>Product designer + builder</span></header>
    {complete && <SelectedWorkShortcuts onOpenProject={onOpenProject} />}
    <div className="kolam-anchor"><IntroKolam introStage={introStage} focusSection={focusSection} />{checkpoint && !complete && <span className="checkpoint-label">{checkpoint}</span>}{complete && <SectionLabels active={active} onHover={setHovered} onSelect={id => setActive(current => current === id ? null : id)} />}</div>
    {!complete && <button type="button" className="skip-intro" onClick={skipIntro}>Skip intro</button>}
    {complete && !active && <p className="explore-instruction">Explore a side</p>}
    {complete && active && <section className={`canvas-content content-${active}`}><button type="button" className="close-section" onClick={() => setActive(null)} aria-label="Close section">Close</button>{content[active]}</section>}
  </main>;
}
