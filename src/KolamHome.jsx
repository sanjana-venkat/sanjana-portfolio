import { useEffect, useMemo, useRef, useState } from "react";
import { TESTIMONIALS } from "./data/portfolioData";
import "./kolam.css";

const STEPS = [
  { id: 1, label: "Bio", paneTitle: "A little about me" },
  { id: 2, label: "My story", paneTitle: "My story" },
  { id: 3, label: "Work and chat", paneTitle: "Work + chat" },
  { id: 4, label: "Statements", paneTitle: "Statements" },
];

const ENTERPRISE_WORK = [
  { slug: "b2c", title: "Chase MyHome", outcome: "Uncover User Needs", image: "/chasepublic-header.jpg" },
  { slug: "ai-personalization", title: "Intent-based Recommendations", outcome: "RecSys", image: "/marketing-preview.png" },
  { slug: "service-design", title: "Designing Systems at Scale", outcome: "Service Design", image: "/chasepublic-solution.jpg" },
  { slug: "ai-chat-journeys", title: "Agentic Search Experiences", outcome: "AI Search Interfaces", image: "/ai-chat-preview.png" },
  { slug: "conversational-agentic-ai", title: "Casey Conversational AI", outcome: "Conversational AI", image: "/ai-chat-preview.png" },
  { slug: "exec-pitch", title: "Executive Buy-in", outcome: "Exec Pitch", image: "/jpmc-slides/5.png" },
];

const BUILDER_WORK = [
  { slug: "muesli", title: "Muesli", outcome: "Speech-to-Text", image: "/muesli-preview.jpg", badge: "open source" },
  { slug: "model-design", title: "Outdone", outcome: "Personalized Travel", image: "/outdone-preview.png", badge: "built + shipped" },
];

function getInitialState() {
  const queryStep = Number(new URLSearchParams(window.location.search).get("step"));
  if (queryStep >= 1 && queryStep <= 4) return { drawn: queryStep, active: queryStep };
  if (window.location.hash === "#work") return { drawn: 3, active: 3 };
  const saved = Number(window.sessionStorage.getItem("kolamDrawnCount") || 0);
  const drawn = Math.min(4, Math.max(0, saved));
  return { drawn, active: drawn || 0 };
}

function OriginWordplay() {
  const [phase, setPhase] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 4 : 0);
  const timers = useRef([]);

  const play = () => {
    timers.current.forEach(clearTimeout);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase(4);
      return;
    }
    setPhase(0);
    timers.current = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2300),
    ];
  };

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timers.current = [
        setTimeout(() => setPhase(1), 900),
        setTimeout(() => setPhase(2), 1400),
        setTimeout(() => setPhase(3), 2000),
        setTimeout(() => setPhase(4), 2300),
      ];
    }
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <button type="button" className="kolam-origin" onClick={play} aria-label="Replay the move from Frisco, Texas to San Francisco, California">
      <span className={`kolam-grow ${phase >= 2 ? "is-in" : ""}`}>san&nbsp;</span>
      fr<span className={`kolam-grow ${phase >= 1 ? "is-in" : ""}`}>an</span>cisco,&nbsp;
      <span className={`kolam-origin-state ${phase >= 3 ? "is-out" : ""}`}>tx</span>
      <span className={`kolam-origin-state kolam-origin-ca ${phase >= 4 ? "is-in" : ""}`}>ca</span>
    </button>
  );
}

function PulliGrid() {
  return <div className="kolam-pulli-grid" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <span key={index} className={index === 4 ? "is-center" : ""} />)}</div>;
}

function BioPane() {
  return (
    <div className="kolam-bio">
      <div className="kolam-bio-top">
        <img src="/profile.jpg" alt="Sanjana Venkat" />
        <div>
          <p className="kolam-kicker">Product designer + builder</p>
          <p className="kolam-intro">I turn ambiguity into direction. Let me show you.</p>
          <p>Designing AI interfaces, recommendation systems and model behavior.</p>
        </div>
      </div>
      <nav className="kolam-contact-links" aria-label="Contact and profile links">
        <a href="mailto:sanjanavnkt20@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/sanjana-venkat/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/sanjana-venkat" target="_blank" rel="noreferrer">GitHub</a>
        <a href="/SanjanaVenkat_Design-Engineer_Resume1.pdf" target="_blank" rel="noreferrer">Resume</a>
      </nav>
      <details className="kolam-beliefs">
        <summary>what I believe</summary>
        <div>
          <p>I study psychology because I love thinking about how people think. And that curiosity never left, it just found a new home in product design.</p>
          <p>I always tried to get closer to user needs and intent with data analytics, user research, or recently model design to classify, filter and map responses. With good design, I want to meet users where they are and also take them where they want to be.</p>
        </div>
      </details>
    </div>
  );
}

function titleTilt(title) {
  const sum = [...title].reduce((total, character) => total + character.charCodeAt(0), 0);
  return ((sum % 5) - 2) * 0.75;
}

function PulliMark() {
  return <span className="kolam-card-pulli" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</span>;
}

function WorkCard({ project, variant, onOpenProject }) {
  const tilt = variant === "sparked" ? titleTilt(project.title) : 0;
  return (
    <button type="button" className={`kolam-work-card is-${variant}`} style={{ "--card-tilt": `${tilt}deg` }} onClick={() => onOpenProject(project.slug)}>
      <div className="kolam-work-image"><img src={project.image} alt="" /></div>
      <div className="kolam-work-copy">
        <p>{project.outcome}</p>
        <h4>{project.title}</h4>
      </div>
      {project.badge && <span className="kolam-work-badge">{project.badge}</span>}
      {variant === "sparked" && <PulliMark />}
    </button>
  );
}

function WorkShelf({ id, title, eyebrow, projects, variant, onOpenProject }) {
  return (
    <section id={id} className="kolam-work-shelf">
      <header><p>{eyebrow}</p><h3>{title}</h3></header>
      <div className="kolam-work-grid">{projects.map(project => <WorkCard key={project.slug} project={project} variant={variant} onOpenProject={onOpenProject} />)}</div>
    </section>
  );
}

function WorkPane({ chat, onOpenProject }) {
  return (
    <div className="kolam-work-pane">
      <div className="kolam-shelf-jumps">
        <a href="#kolam-nine-to-five"><span>9 to 5</span> Enterprise work</a>
        <a href="#kolam-five-to-nine"><span>5 to 9</span> Things I build</a>
      </div>
      <WorkShelf id="kolam-nine-to-five" title="9 to 5" eyebrow="enterprise · cross-functional · executive visibility" projects={ENTERPRISE_WORK} variant="composed" onOpenProject={onOpenProject} />
      <WorkShelf id="kolam-five-to-nine" title="5 to 9" eyebrow="builder · hackathons · shipped for fun" projects={BUILDER_WORK} variant="sparked" onOpenProject={onOpenProject} />
      <section className="kolam-chat-section" aria-label="Ask Sanjana"><header><p>ask me</p><h3>Want the longer version?</h3></header>{chat}</section>
    </div>
  );
}

function StatementsPane() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [quote, name, title] = TESTIMONIALS[index] || [];
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => setIndex(current => (current + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(timer);
  }, [paused]);
  return (
    <div className="kolam-statements">
      <blockquote key={index}><p>“{quote}”</p><footer><strong>{name}</strong><span>{title}</span></footer></blockquote>
      <div className="kolam-testimonial-controls">
        <div>{TESTIMONIALS.map((_, dotIndex) => <button key={dotIndex} type="button" onClick={() => setIndex(dotIndex)} aria-label={`Show statement ${dotIndex + 1}`} aria-current={index === dotIndex} />)}</div>
        <button type="button" onClick={() => setPaused(current => !current)}>{paused ? "Play" : "Pause"}</button>
      </div>
    </div>
  );
}

export default function KolamHome({ story, chat, onOpenProject }) {
  const initial = useMemo(() => getInitialState(), []);
  const [drawnCount, setDrawnCount] = useState(initial.drawn);
  const [frameStep, setFrameStep] = useState(initial.active);
  const [activeStep, setActiveStep] = useState(initial.active);
  const [frameVisible, setFrameVisible] = useState(true);
  const [paneVisible, setPaneVisible] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [nudge, setNudge] = useState(false);
  const paneRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    [1, 2, 3, 4].forEach(step => { const image = new Image(); image.src = `/kolam/step${step}.png`; });
  }, []);

  useEffect(() => {
    if (drawnCount >= 4) return undefined;
    const timer = setTimeout(() => {
      setNudge(true);
      setTimeout(() => setNudge(false), 1000);
    }, 8000);
    return () => clearTimeout(timer);
  }, [drawnCount]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const showStep = target => {
    if (transitioning || target < 1 || target > 4 || target > Math.max(drawnCount + 1, drawnCount)) return;
    timers.current.forEach(clearTimeout);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nextDrawn = Math.max(drawnCount, target);
    if (reduced) {
      setFrameStep(target);
      setActiveStep(target);
      setDrawnCount(nextDrawn);
      window.sessionStorage.setItem("kolamDrawnCount", String(nextDrawn));
      return;
    }
    setTransitioning(true);
    setFrameVisible(false);
    setPaneVisible(false);
    timers.current = [
      setTimeout(() => {
        setFrameStep(target);
        setDrawnCount(nextDrawn);
        window.sessionStorage.setItem("kolamDrawnCount", String(nextDrawn));
      }, 250),
      setTimeout(() => setActiveStep(target), 300),
      setTimeout(() => setPaneVisible(true), 440),
      setTimeout(() => setFrameVisible(true), 500),
      setTimeout(() => {
        setTransitioning(false);
        if (window.innerWidth < 768) paneRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 950),
    ];
  };

  const advance = () => showStep(Math.min(4, drawnCount + 1));

  const onKeyDown = event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const target = Math.min(Math.max(1, activeStep + direction), drawnCount);
    if (target) showStep(target);
  };

  const panes = {
    1: <BioPane />,
    2: story,
    3: <WorkPane chat={chat} onOpenProject={onOpenProject} />,
    4: <StatementsPane />,
  };

  return (
    <main className="kolam-home" onKeyDown={onKeyDown}>
      <header className="kolam-site-header">
        <div><p className="kolam-name">Sanjana Venkat</p><OriginWordplay /></div>
        <p>Product designer and builder</p>
      </header>
      <p className="kolam-invitation">A kolam is drawn one stroke at a time. So am I.</p>
      <div className="kolam-layout">
        <section className="kolam-stage" aria-label="Interactive four-step kolam">
          <div className={`kolam-medallion ${frameVisible ? "is-visible" : ""} ${nudge ? "is-nudging" : ""}`}>
            {frameStep === 0 ? <PulliGrid /> : <img src={`/kolam/step${frameStep}.png`} alt={`Kolam drawing, step ${frameStep} of 4`} />}
            {drawnCount < 4 ? <button type="button" className="kolam-center-control" onClick={advance} aria-label={`Draw kolam stroke ${drawnCount + 1} and reveal ${STEPS[drawnCount].label}`}><span /></button> : <div className="kolam-hotspots">{[[1, "right"], [2, "top"], [3, "left"], [4, "bottom"]].map(([step, position]) => <button key={step} type="button" className={`is-${position}`} aria-label={`Show ${STEPS[step - 1].label}`} onClick={() => showStep(step)} />)}</div>}
          </div>
          <p className="kolam-progress" aria-live="polite">{drawnCount < 4 ? `${drawnCount} of 4 · tap the center dot` : "the kolam is complete"}</p>
          <div className="kolam-step-dots" aria-label="Kolam sections">{STEPS.map(step => <button key={step.id} type="button" disabled={step.id > drawnCount} aria-label={`Show ${step.label}`} aria-current={activeStep === step.id} onClick={() => showStep(step.id)}><span>{step.id}</span></button>)}</div>
        </section>
        <section ref={paneRef} className={`kolam-pane ${paneVisible ? "is-visible" : ""}`} aria-live="polite">
          {activeStep === 0 ? <div className="kolam-empty-pane"><p>Start at the center dot.</p><h1>Each line opens another part of my work.</h1><button type="button" onClick={advance}>Draw the first stroke</button></div> : <><header className="kolam-pane-header"><p>0{activeStep}</p><h2>{STEPS[activeStep - 1].paneTitle}</h2><span /></header>{panes[activeStep]}</>}
        </section>
      </div>
    </main>
  );
}
