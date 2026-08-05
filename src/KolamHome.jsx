import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TESTIMONIALS } from "./data/portfolioData";
import "./kolam.css";

const SECTION_META = {
  sanjana: { number: "01", label: "Sanjana", preview: "About me", path: 1 },
  story: { number: "02", label: "Story", preview: "How I got here", path: 2 },
  snippets: { number: "03", label: "Snippets", preview: "Selected work and chat", path: 3 },
  statements: { number: "04", label: "Statements", preview: "How I think", path: 4 },
};

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
  const complete = introStage >= 9;
  return <div className={`kolam-motion ${focusSection ? "is-focused" : ""}`} role="img" aria-label="A pulli kolam drawn by hand around nine dots">{complete ? <img src="/kolam/kolam-final.png?v=2" alt="" /> : <video autoPlay muted playsInline preload="auto" src="/kolam/kolam-drawing.webm?v=2" />}</div>;
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
  const [chatOpen, setChatOpen] = useState(false);
  return <div className="snippets-section"><header><p className="section-eyebrow">Snippets</p><h2>Work, process and things I build</h2><div><span><strong>9 to 5</strong> Enterprise product design</span><span><strong>5 to 9</strong> Independent products + AI experiments</span></div></header><div className="snippet-projects">{SHORTCUTS.map(project => <button key={project.slug} type="button" onClick={() => onOpenProject(project.slug)}><img src={project.image} alt="" /><span>{project.title}</span></button>)}</div><div className="snippet-chat-entry"><p>Ask me about my work, process, AI projects, or what I would bring to your team.</p><button type="button" onClick={() => setChatOpen(value => !value)}>{chatOpen ? "Hide chat" : "Open chat"}</button></div>{chatOpen && <div className="snippet-chat-panel">{chat}</div>}</div>;
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
    const schedule = [[500,1],[1250,2,"Sanjana"],[1750,3],[2500,4,"Story"],[3000,5],[3650,6,"Snippets"],[4150,7],[4850,8,"Statements"],[5650,9]];
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
