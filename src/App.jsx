import React, { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "./data/portfolioData";

const FIGMA_DECK_URL =
  "https://embed.figma.com/slides/rrAhQ5fBTULZu49L04zUZ8/jpmcpublic-slides?node-id=2-16488&embed-host=share";

const CASEY_AI_URL =
  "https://embed.figma.com/deck/498Pw3UvKwQErQY2WQHJji/Casey-AI?node-id=1-90832&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share";

const AI_FRAMER_URL =
  "https://sanjanavenkat.framer.website/works/aifirstinterfaces-2";

const USER_NEEDS_FRAMER_URL =
  "https://sanjanavenkat.framer.website/works/chase-hl-public-2";

const MARKETING_TILES_URL =
  "https://sanjanavenkat.framer.website/works/marketing-tiles-2";

const APPLY_SYSTEMS_URL =
  "https://sanjanavenkat.framer.website/works/chase-apply-2";

const TRAVEL_DNA_URL = "https://travel-dna-kohl.vercel.app/";

const RESUME_URL = "/SanjanaVenkat_ProductDesign_Resume.pdf";
const GITHUB_URL = "https://github.com/sanjana-venkat";

const BODY = "[font-family:'Open_Sans',sans-serif]";
const HEADING = "[font-family:'Plus_Jakarta_Sans',sans-serif]";
const TYPEWRITE = "[font-family:'JetBrains_Mono',monospace]";

const PILLS = [
  "how i uncover user needs",
  "let's talk AI",
  "product strategy thinking",
  "designing systems at scale",
  "how i ship fast",
  "tell me your story",
  "how i get exec-buy in",
];

const CONTENT = {
  "how i uncover user needs": `I look beyond surface-level metrics to understand the intent behind user behavior. At JPMC, we were a small team trying to reduce drop-offs in an application flow.

Tired of not seeing drastic impact, we went deep into the data and I made a funnel visualization that revealed something simple but important:

We were missing a huge part of the market.

That one artifact:
• Secured $10K+ in investment
• Got the 3rd highest Home Lending business case
• Aligned leadership around the redesign

Then through exit surveys, heat maps, and extensive A/B testing, we defined a need-based segmentation strategy.`,

  "let's talk AI": `I believe good design is about getting closer to human intent, and with AI, that gap gets smaller.

What excites me most is conversational AI because voice captures uncertainty, evolving thoughts and emotional context

Better than static interfaces.

At JPMC, I worked on AI across multiple surfaces:

• Personalization model
  drove a 17% CTR lift through dynamic content adaptation

• Casey AI
  handled 1,000+ customer conversations and acted as both a digital re-engagement strategy and lead qualifier for the business

• ChatGPT + Gemini integrations
  prototypes used by leadership to communicate future product direction

I also use AI as a thinking partner in my workflow to rapidly explore, prototype, and refine ideas.`,

  "product strategy thinking": `In bigger companies, it's hard to avoid disagreeing and going through multiple iterations, but I learnt that defining the problem early and aligning all stakeholders helps us ship fast.

At JPMC, I shaped the personalization framework by combining research, behavioral signals, and need-based segmentation. Instead of treating users as static personas, we looked at what they needed in the moment.

That thinking helped the team move from "personalized content" to personalized recommendations:
• what does this customer need right now?
• what signal tells us that?
• how should the experience respond?

That's why I am so excited to unlock more possibilities with AI as we bring in real-time personalization with more data to build accurate recommendations.`,

  "designing systems at scale": `When I first joined the team, a lot of the work was focused on reducing drop-offs. I had ideas from competitive analysis, but I kept running into important constraints:

• we do not have that data to pre-fill information
• we cannot make this fully self-service
• human advisors still need to be part of the journey

That pushed me to learn the backend and map the full Apply & Fulfillment ecosystem. I created a service design blueprint that became a living document for all stakeholders.

It helped designers think beyond "change the content" or "add bigger tiles" and start designing around:
• user confidence
• operational handoffs
• self-service moments
• backend dependencies`,

  "how i ship fast": `I move quickly by combining systems thinking, rapid prototyping, and close engineering collaboration.

At JPMC, I analyzed edge cases for 20+ offers and built a plug-and-play offer template using atomic design principles.

In close collaboration with engineering, we launched it quickly.

The result:
• Zero additional design/dev lift for an offer page
• Accelerated marketing velocity by 3 sprints
• Scaled across multiple use cases

I also prototype with tools like Codex, Google AI Studio, Claude, and Google Stitch.

This portfolio itself was concepted, designed, and built in 2 days as an interactive pre-interview experience. Before AI tools, I was already building product ideas and prototypes in 24-hour hackathons, often as the only designer on the team.`,

  "tell me your story": `Here's how it happened.

I joined Paycom as an Associate Product Designer and threw myself into the work completely.

Not just doing my job, I became one of the founding members of a brand new subteam, helping build something from scratch while most people were still finding their footing.

Then JPMC reached out.

Turns out I had helped someone with a presentation at a conference I organized in college, and that stuck with them.

I joined as a Senior Product Designer and moved quickly into AI initiatives, marketing strategy, personalization systems, and scalable design foundations.

I learn by doing, and I do a lot :).`,

  "how i get exec-buy in": `I learnt that empathy is not just used in design, but also with stakeholders.

Instead of trying to convince stakeholders, I start from where they are and we walk together toward a new shared vision.

At JPMC, we built ChatGPT + Gemini prototypes in under a week.

The output was not just a feature. It was a story that an executive leader used that work to present to senior leadership, including CEO Jamie Dimon.

When I present, I focus on:
• What the opportunity is
• Why it matters
• What decision needs to be made

Because I learned that good design doesn't work unless people understand it.`,
};

const USER_NEEDS_REST = `The first outcome wasn't perfectly clean. Overall lead submit decreased. So I went deep into the data again and found the breakthrough:

38% increase in lead initiation with clearer Apply messaging.

In a few sprints, we pushed toward redesigning the full journey and got design system modernization onto the roadmap.

Today, the experience is live and evolving with AI.`;

const PROJECTS = [
  { slug: "b2c", label: "B2C", title: "Uncover User Needs", url: USER_NEEDS_FRAMER_URL },
  { slug: "ai-personalization", label: "personalized marketing", title: "Product Strategy Thinking", url: MARKETING_TILES_URL },
  { slug: "service-design", label: "Service Design", title: "Designing Systems at Scale", url: APPLY_SYSTEMS_URL },
  { slug: "ai-chat-journeys", label: "AI chat journeys", title: "AI Chat Journeys", url: AI_FRAMER_URL },
  { slug: "conversational-agentic-ai", label: "Agentic Conversational AI", title: "Casey AI", url: CASEY_AI_URL },
  { slug: "exec-pitch", label: "Exec Pitch", title: "Executive Buy-in", url: FIGMA_DECK_URL },
  { slug: "vibe-coding", label: "Vibe Coding", title: "Travel DNA", url: TRAVEL_DNA_URL },
];

/* ─── TIMELINE DATA ─── */
const TIMELINE_ITEMS = [
  { year: "2019", label: "Best Presenter Award",  sub: "First publication on Temple Architecture",             heart: false, isNow: false, img: "/2019.png"  },
  { year: "2020", label: "UTD Psychology & Design",sub: "Studied human behavior through a design lens",         heart: false, isNow: false, img: "/2020.jpg"  },
  { year: "2021", label: "Chetna",                sub: "Raised $10K+ for South Asian mental health",           heart: false, isNow: false, img: "/2021.jpg"  },
  { year: "2022", label: "Dialexa",               sub: "Explored AR travel experiences for DTour",             heart: false, isNow: false, img: "/2022-1.jpg"},
  { year: "2022", label: "VP, UX Club",           sub: "Ran design events with Paycom, Bottle Rocket + Intuit",heart: false, isNow: false, img: "/2022.jpg"  },
  { year: "2023", label: "Paycom",                sub: "Joined a new B2B enterprise design subteam",           heart: false, isNow: false, img: "/2023.jpg"  },
  { year: "2024", label: "JPMC · Senior PD",      sub: "Owned apply flow, HELOC 0-to-1 and AI initiatives",   heart: false, isNow: false, img: "/2024.jpg"  },
  { year: "2025", label: "JP Morgan Chase",       sub: "Led Marketing + AI and exec-facing Gemini concepts",  heart: false, isNow: false, img: "/2025.jpg"  },
  { year: "2026", label: "Married · Bay Area",    sub: "Moved to the Bay Area for a new chapter",             heart: true,  isNow: false, img: "/2026.jpg"  },
  { year: "NOW",  label: "Design Engineer",       sub: "Building polished AI product ideas fast",             heart: false, isNow: true,  img: null         },
];

/* ─── ICONS ─── */
function ChevronLeftIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18L9 12l6-6" />
    </svg>
  );
}
function ChevronRightIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
function MailIcon({ className = "h-[18px] w-[18px]" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  );
}
function ChatIcon({ className = "h-6 w-6" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}
function CloseIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M7 5h3v14H7V5Zm7 0h3v14h-3V5Z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

/* ─── TYPEWRITER ─── */
let _chatScrollEl = null;

function Typewriter({ text, shouldStart, onDone, instant = false }) {
  const cleanText = (text || "").trim();
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
  }, [cleanText]);

  useEffect(() => {
    if (instant) {
      setDisplayed(cleanText);
      setDone(true);
      setTimeout(() => onDoneRef.current?.(), 0);
      return;
    }
    if (!shouldStart) return;
    if (done) return;

    setDisplayed("");
    let iv;
    const delay = setTimeout(() => {
      let i = 0;
      iv = setInterval(() => {
        i++;
        setDisplayed(cleanText.slice(0, i));
        if (_chatScrollEl) _chatScrollEl.scrollTop = _chatScrollEl.scrollHeight;
        if (i >= cleanText.length) {
          clearInterval(iv);
          setDone(true);
          setTimeout(() => onDoneRef.current?.(), 250);
        }
      }, 15);
    }, 350);

    return () => { clearTimeout(delay); clearInterval(iv); };
  }, [cleanText, shouldStart, instant, done]);

  return (
    <p className={`whitespace-pre-line text-[14px] leading-[1.8] text-[#221B16] ${TYPEWRITE}`}>
      {displayed}
      {!done && <span className="animate-pulse text-[#A5522A]">|</span>}
    </p>
  );
}

/* ─── HELPERS ─── */
function SegmentationDiagram() {
  return <img src="/segmentation.png" alt="Audience segmentation framework" className="mt-8 w-full object-contain" />;
}
function JourneyMapPreview() {
  return (
    <a href={APPLY_SYSTEMS_URL} target="_blank" rel="noreferrer" className="mt-8 block overflow-hidden rounded-[28px] border border-[#E4E2E1] bg-white transition hover:-translate-y-1 hover:shadow-sm">
      <img src="/journey-map.png" alt="Service design journey map" className="w-full object-contain" />
    </a>
  );
}
function CircleIconButton({ children, onClick, ariaLabel, className = "" }) {
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white p-0 leading-none text-[#6B625C] transition hover:text-[#A5522A] ${className}`}>
      <span className="flex h-full w-full items-center justify-center leading-none">{children}</span>
    </button>
  );
}

/* ─── MODALS ─── */
function FramerModal({ title, url, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${BODY}`}>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <CircleIconButton onClick={onClose} ariaLabel="Close project"><ChevronLeftIcon /></CircleIconButton>
          <h2 className={`min-w-0 text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px] ${HEADING}`}>{title}</h2>
        </div>
        <div className="overflow-hidden rounded-[28px] bg-white">
          <iframe src={url} title={title} className="h-[82vh] w-full rounded-[24px] border-0 bg-white" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

function WorkBrowserModal({ onClose, initialSlug = "b2c" }) {
  const getBySlug = (slug) => PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];
  const [activeProject, setActiveProject] = useState(() => getBySlug(initialSlug));
  const select = (p) => { setActiveProject(p); window.history.replaceState(null, "", `#work=${p.slug}`); };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${BODY}`}>
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mb-6 flex items-center gap-4">
          <CircleIconButton onClick={onClose} ariaLabel="Close work browser"><ChevronLeftIcon /></CircleIconButton>
          <h2 className={`min-w-0 text-[32px] font-semibold leading-[1.03] tracking-[-0.04em] text-[#9C3F14] ${HEADING}`}>My Work</h2>
        </div>
        <div className="no-scrollbar mb-6 flex gap-3 overflow-x-auto pb-2">
          {PROJECTS.map((p) => (
            <button key={p.slug} onClick={() => select(p)}
              className={`shrink-0 rounded-full border px-6 py-3 text-[14px] font-medium transition sm:px-7 sm:text-[15px] ${
                activeProject.slug === p.slug ? "border-[#9C3F14] bg-white text-[#9C3F14]" : "border-[#E4E2E1] bg-white text-[#6B625C] hover:border-[#9C3F14] hover:text-[#9C3F14]"
              } ${HEADING}`}>
              {p.label}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-[32px] bg-white w-full">
          <iframe key={activeProject.url} src={activeProject.url} title={activeProject.title} className="h-[80vh] w-full border-0 bg-white" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

/* ─── HERO TILE ─── */
function HeroTile() {
  return (
    <div className="relative overflow-hidden rounded-[32px] p-8 flex flex-col justify-center"
      style={{ background: "rgba(156, 63, 20, 0.17)", minHeight: "219px", paddingRight: "220px" }}>
      <h1 className={`font-semibold leading-[1.2] tracking-[-0.02em] text-[#9C3F14] whitespace-nowrap ${HEADING}`} style={{ fontSize: "40px" }}>
        Sanjana Venkat
      </h1>
      <p className="mt-2 text-[16px] leading-[1.5]" style={{ color: "#57423A" }}>
        I turn ambiguity into direction. Let me show you.
      </p>
      <div className="absolute overflow-hidden"
        style={{ width: "200px", height: "240px", bottom: "-55px", right: "32px", borderRadius: "22px",
          border: "8px solid #FFFFFF", boxShadow: "0px 2.8px 4.2px -0.7px rgba(0,0,0,0.1)", transform: "rotate(9.83deg)", zIndex: 30 }}>
        <img src="/profile.jpg" alt="Sanjana Venkat" className="w-full h-full object-cover object-center" />
      </div>
    </div>
  );
}

/* ─── WHAT I BELIEVE TILE ─── */
function WhatIBelieveTile() {
  return (
    <article className={`rounded-[32px] bg-white p-6 text-[14px] h-full flex flex-col justify-between ${BODY}`} style={{ minHeight: "220px" }}>
      <div>
        <p className={`mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] ${HEADING}`}>what i believe in</p>
        <p className="leading-[1.65] text-[#5F5149]">i believe good products don't just solve problems. they reveal ones people didn't know they had.</p>
        <p className="mt-4 leading-[1.65] text-[#5F5149]">with AI and personalization, that gap gets smaller. But the real work is still human: listening, framing, building things that help people move forward.</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="mailto:sanjanavnkt20@gmail.com" aria-label="Email Sanjana"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] bg-white p-0 leading-none text-[#6B625C] transition hover:border-[#A5522A] hover:text-[#A5522A]">
            <span className="flex h-full w-full items-center justify-center leading-none"><MailIcon /></span>
          </a>
          <a href="https://www.linkedin.com/in/sanjana-venkat/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] bg-white p-0 text-[13px] font-semibold leading-none text-[#6B625C] transition hover:border-[#A5522A] hover:text-[#A5522A] ${HEADING}`}>
            <span className="flex h-full w-full items-center justify-center leading-none">in</span>
          </a>
        </div>
        <a href="/SanjanaVenkat_ProductDesign_Resume.pdf" target="_blank" rel="noreferrer"
          className={`inline-flex items-center gap-1 text-[13px] text-[#8A817B] underline underline-offset-4 hover:text-[#A5522A] transition ${HEADING}`}>
          resume →
        </a>
      </div>
    </article>
  );
}

/* ─── NAV TILE (My Story / Timeline) ─── */

const IDLE_SCRIBBLES = [
  `M 20,55 C 40,30 60,75 85,50 C 110,25 130,70 155,48 C 180,26 200,68 225,46 C 250,24 265,58 285,42`,
  `M 15,62 C 38,38 58,78 80,54 C 102,30 125,72 148,50 C 171,28 192,66 215,48 C 238,30 258,62 278,50`,
  `M 25,48 C 48,26 68,70 92,46 C 116,22 138,66 162,44 C 186,22 206,64 230,44 C 254,24 270,56 290,40`,
];

// Scribble path: tangled knot that starts messy and ends at x=295 (same as line)
const SCRIBBLE_PATH = "M 95 38 C 78 20, 58 26, 72 44 C 88 66, 122 24, 101 18 C 76 12, 58 56, 91 58 C 130 60, 145 28, 118 30 C 95 32, 98 51, 132 44 C 178 34, 231 38, 295 38";
const SCRIBBLE_LEN = 600;

const LINE_PATH = "M 20 38 L 295 38";
const LINE_LEN = 275;

function NavTile() {
  const [active, setActive]     = useState(false);
  const [step, setStep]         = useState(0);
  /*
    phase values:
      "idle"     — not hovered
      "scribble" — step 0 only: scribble draws in (600ms)
      "line"     — scribble swaps out, clean line draws in (450ms)
      "content"  — dot + image + text slide in from right simultaneously
      "hold"     — visible, waiting before advancing
  */
  const [phase, setPhase]       = useState("idle");
  // imgVisible is separate from phase so image appears AFTER content slides in
  const [imgVisible, setImgVisible] = useState(false);
  const timers = useRef([]);

  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after    = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); };

  const runStep = (s, isFirst) => {
    clearAll();
    setStep(s);
    setImgVisible(false);

    const item = TIMELINE_ITEMS[s];
    const hold = item.isNow ? 4000 : item.heart ? 3200 : 2400;

    if (isFirst) {
      // Step 0: scribble draws → hard-swap to line → dot+text slide in → image appears
      setPhase("scribble");
      after(() => setPhase("line"),    600);   // scribble done, line begins drawing
      after(() => setPhase("content"), 1050);  // line done, content+dot slide in
      after(() => setImgVisible(true), 1450);  // image fades in ~400ms after content lands
      after(() => setPhase("hold"),    1350);
      after(() => runStep(1, false),   1350 + hold);
    } else {
      // Steps 1+: line redraws, then content+dot slide in, then image
      setPhase("line");
      after(() => setPhase("content"), 450);
      after(() => setImgVisible(true), 850);
      after(() => setPhase("hold"),    600);
      after(() => runStep((s + 1) % TIMELINE_ITEMS.length, false), 600 + hold);
    }
  };

  const startAnimation = () => {
    if (active) return;
    setActive(true);
    runStep(0, true);
  };

  const stopAnimation = () => {
    clearAll();
    setActive(false);
    setStep(0);
    setPhase("idle");
    setImgVisible(false);
  };

  useEffect(() => () => clearAll(), []);

  const item        = TIMELINE_ITEMS[step];
  const showLine    = phase === "line" || phase === "content" || phase === "hold";
  const showContent = phase === "content" || phase === "hold";

  return (
    <div
      className={`rounded-[32px] bg-white h-full flex flex-col overflow-hidden relative select-none cursor-pointer ${BODY}`}
      style={{ minHeight: "220px" }}
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
      onClick={startAnimation}
    >
      {/* ── IDLE STATE ── */}
      {!active && (
        <div className="absolute inset-0 flex flex-col px-6 pt-6 pb-5">
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] mb-4 ${HEADING}`}>my story</p>
          <div className="flex-1 relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet">
              {IDLE_SCRIBBLES.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="#D4CBC6"
                  strokeWidth={0.9 + i * 0.25} strokeLinecap="round" opacity={0.6 + i * 0.12} />
              ))}
            </svg>
            <p className={`absolute bottom-0 left-0 text-[10px] text-[#C0B8B4] ${HEADING}`}>hover to explore</p>
          </div>
        </div>
      )}

      {/* ── ACTIVE STATE ── */}
      {active && (
        <>
          <p className={`pt-5 px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] shrink-0 ${HEADING}`}>
            my story
          </p>

          <div className="relative flex-1" style={{ minHeight: 0 }}>

            {/* SVG: scribble → line → dot */}
            <svg
              className="absolute left-0 right-0"
              style={{ top: "22px", width: "100%", height: "60px", overflow: "visible" }}
              viewBox="0 0 320 60"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* SCRIBBLE — only in phase "scribble", removed instantly when phase changes */}
              {phase === "scribble" && (
                <path
                  key="scribble"
                  d={SCRIBBLE_PATH}
                  fill="none" stroke="#2F2F2F" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{
                    strokeDasharray: SCRIBBLE_LEN,
                    strokeDashoffset: SCRIBBLE_LEN,
                    animation: `navScribbleDraw 0.6s cubic-bezier(0.4,0,0.6,1) forwards`,
                  }}
                />
              )}

              {/* LINE — appears instantly when scribble exits, draws itself in */}
              {showLine && (
                <line
                  key={`line-${step}`}
                  x1="20" y1="30" x2="295" y2="30"
                  stroke="#2F2F2F" strokeWidth="1.3" strokeLinecap="round"
                  style={{
                    strokeDasharray: LINE_LEN,
                    strokeDashoffset: LINE_LEN,
                    animation: `navLineDraw 0.45s cubic-bezier(0.4,0,0.2,1) forwards`,
                  }}
                />
              )}

              {/* DOT — slides in from right with content */}
              {showContent && !item.heart && (
                <circle
                  key={`dot-${step}`}
                  cx="157" cy="30"
                  r={item.isNow ? "5.5" : "4"}
                  fill={item.isNow ? "#D96F45" : "white"}
                  stroke={item.isNow ? "#D96F45" : "#2F2F2F"}
                  strokeWidth="1.6"
                  style={{
                    animation: "navDotSlide 0.48s cubic-bezier(0.22,1,0.36,1) forwards",
                    filter: item.isNow ? "drop-shadow(0 0 6px rgba(217,111,69,0.5))" : "none",
                  }}
                />
              )}

              {/* HEARTS for marriage step */}
              {showContent && item.heart && (
                <g key={`hearts-${step}`} style={{ animation: "navDotSlide 0.48s cubic-bezier(0.22,1,0.36,1) forwards" }}>
                  <path d="M 144,30 C 144,25 147,23 150,27 C 153,23 156,25 156,30 C 156,35 150,40 150,40 C 150,40 144,35 144,30Z" fill="#D96F45" />
                  <path d="M 158,30 C 158,25 161,23 164,27 C 167,23 170,25 170,30 C 170,35 164,40 164,40 C 164,40 158,35 158,30Z" fill="#D96F45" />
                </g>
              )}
            </svg>

            {/* CONTENT TEXT — slides in from right */}
            {showContent && (
              <div
                key={`content-${step}`}
                className="absolute left-0 right-0 px-6"
                style={{
                  top: "88px",
                  animation: "navContentSlide 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
                }}
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className={`text-[20px] font-bold leading-none ${item.isNow ? "text-[#D96F45]" : "text-[#1A1A1A]"} ${HEADING}`}>
                    {item.isNow ? "NOW" : item.year}
                  </span>
                  <span className={`text-[12px] font-semibold text-[#9A8176] ${HEADING}`}>{item.label}</span>
                </div>
                <p className="mt-1 text-[12px] leading-[1.5] text-[#5F5149]" style={{ maxWidth: "260px" }}>
                  {item.sub}
                </p>
              </div>
            )}

            {/* IMAGE — fades + slides up after content lands. Hidden on "NOW" step (no img) */}
            {item.img && (
              <div
                key={`img-${step}`}
                className="absolute overflow-hidden"
                style={{
                  /*
                    Positioned bottom-right of the tile, slightly tilted.
                    Taller than before: 118px height.
                  */
                  bottom: "12px",
                  right: "16px",
                  width: "96px",
                  height: "118px",
                  borderRadius: "18px",
                  border: "5px solid #FFFFFF",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.13)",
                  transform: imgVisible ? "rotate(-4deg) translateY(0)" : "rotate(-4deg) translateY(14px)",
                  opacity: imgVisible ? 1 : 0,
                  transition: "opacity 0.35s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)",
                  zIndex: 10,
                }}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        @keyframes navScribbleDraw {
          from { stroke-dashoffset: ${SCRIBBLE_LEN}; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes navLineDraw {
          from { stroke-dashoffset: ${LINE_LEN}; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes navDotSlide {
          from { opacity: 0; transform: translateX(80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes navContentSlide {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── MY WORK TILE ─── */
const WORK_PREVIEWS = [
  { src: "/marketing-preview.png", label: "personalized marketing", projectKey: "marketing-tiles" },
  { src: "/ai-chat-preview.png",   label: "AI Chat Journeys",       projectKey: "ai-framer"       },
  { src: "/outdone-preview.png",   label: "Outdone", isNew: true,   projectKey: "travel-dna"      },
];

function MyWorkTile({ onOpenProject }) {
  return (
    <div className={`group relative w-full rounded-[32px] bg-white flex flex-col text-left overflow-hidden ${BODY}`}>
      <p className={`pt-7 px-7 pb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] shrink-0 ${HEADING}`}>my work</p>
      <div style={{ display: "flex", gap: "12px", marginLeft: "-12px", marginRight: "-12px", marginBottom: "-2px" }}>
        {WORK_PREVIEWS.map((proj) => (
          <div key={proj.label} className="relative flex-1 overflow-hidden"
            style={{ height: "200px", borderRadius: "16px 16px 0 0",
              border: "5px solid rgba(221,192,182,0.45)", borderBottom: "none",
              boxShadow: "0px 2.8px 4.2px -0.7px rgba(0,0,0,0.1)", background: "#EDEAE7",
              minWidth: 0, cursor: "pointer" }}
            onClick={() => onOpenProject(proj.projectKey)}>
            <img src={proj.src} alt={proj.label} className="w-full h-full object-cover object-top"
              onError={(e) => { e.target.style.opacity = "0"; }} />
            <div className="absolute inset-0 flex items-end transition-opacity duration-200 opacity-0 hover:opacity-100"
              style={{ background: "rgba(0,0,0,0.5)" }}>
              <p className={`px-4 py-3 text-[11px] font-bold tracking-[0.14em] uppercase text-white ${HEADING}`}>{proj.label}</p>
            </div>
            {proj.isNew && (
              <div className={`absolute top-3 right-3 px-2.5 py-1 bg-white rounded-full text-[8px] font-bold tracking-[0.9px] uppercase text-black ${HEADING}`}>New</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── TESTIMONIAL TILE ─── */
function TestimonialTile() {
  const [index, setIndex]     = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quote, name, title]  = TESTIMONIALS[index] || [];

  useEffect(() => {
    if (!TESTIMONIALS.length || isPaused) return;
    const t = setInterval(() => setIndex((c) => (c + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(t);
  }, [isPaused]);

  return (
    <article className={`relative rounded-[32px] bg-white p-7 text-[13px] ${BODY}`} style={{ height: "100%", overflow: "hidden" }}>
      <p className={`mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] ${HEADING}`}>what people say about me</p>
      <div key={index} className="animate-[slideIn_0.35s_ease_forwards]" style={{ height: "130px", overflow: "hidden" }}>
        <p className="italic leading-[1.55] text-[#4F4741]"
          style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          "{quote}"
        </p>
        <p className={`mt-3 text-[14px] font-semibold text-[#111827] ${HEADING}`}>{name}</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF]">{title}</p>
      </div>
      <div className="mt-4 flex gap-3 pr-14">
        {TESTIMONIALS.map((_, i) => (
          <span key={i} className={`h-3 rounded-full transition-all duration-300 ${index === i ? "w-10 bg-[#D96F45]" : "w-3 bg-[#EEF0F3]"}`} />
        ))}
      </div>
      <button type="button" onClick={() => setIsPaused((c) => !c)}
        aria-label={isPaused ? "Play testimonials" : "Pause testimonials"}
        className="absolute bottom-7 right-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] bg-white p-0 leading-none text-[#6B625C] transition hover:border-[#A5522A] hover:text-[#A5522A]">
        <span className="flex h-full w-full items-center justify-center leading-none">
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </span>
      </button>
    </article>
  );
}

/* ─── CHAT COMPONENTS ─── */
function ResponseLinks({ active, openProjectForActivePill }) {
  if (active === "let's talk AI") {
    return (
      <div className="flex flex-wrap gap-x-6 gap-y-3 px-2 pt-4 animate-[fadeUp_0.35s_ease_forwards]">
        <button onClick={() => openProjectForActivePill("ai-framer")} className={`inline-flex text-[14px] font-medium text-[#8A817B] underline underline-offset-4 transition-colors hover:text-[#A5522A] ${HEADING}`}>
          AI chat journeys →
        </button>
        <button onClick={() => openProjectForActivePill("casey-ai")} className={`inline-flex text-[14px] font-medium text-[#8A817B] underline underline-offset-4 transition-colors hover:text-[#A5522A] ${HEADING}`}>
          what's casey AI? →
        </button>
      </div>
    );
  }
  const ctaText = (() => {
    if (active === "how i get exec-buy in")      return "walk me through the project →";
    if (active === "product strategy thinking")  return "show me the strategy work →";
    if (active === "how i uncover user needs")   return "show me the work →";
    if (active === "designing systems at scale") return "show me the system →";
    if (active === "how i ship fast")            return "what have you been building? →";
    return "";
  })();
  if (!ctaText) return null;
  return (
    <div className="px-2 pt-4 animate-[fadeUp_0.35s_ease_forwards]">
      <button onClick={() => openProjectForActivePill()} className={`inline-flex text-[14px] font-medium text-[#8A817B] underline underline-offset-4 transition-colors hover:text-[#A5522A] ${HEADING}`}>
        {ctaText}
      </button>
    </div>
  );
}

function ChatConversation({ active, showThinking, showResponse, showPills, showUserNeedsRest, onTypeDone, openProjectForActivePill, instant = false }) {
  return (
    <>
      <div className="mb-6 flex justify-end">
        <div className={`rounded-[48px_48px_0px_48px] bg-[#A5522A] px-6 py-3 text-[14px] leading-[1.8] text-white animate-[messageSend_0.35s_ease_forwards] ${TYPEWRITE}`}>
          {active}
        </div>
      </div>
      {showThinking && (
        <div className="rounded-[0px_36px_36px_36px] bg-white p-5 animate-[fadeUp_0.25s_ease_forwards] sm:p-6">
          <div className={`flex items-center gap-2 text-[12px] text-[#8A817B] ${HEADING}`}>
            <span className="h-2 w-2 rounded-full bg-[#A5522A] animate-pulse" />
            thinking
          </div>
        </div>
      )}
      {showResponse && (
        <>
          <div className="rounded-[0px_36px_36px_36px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards] sm:p-6">
            <Typewriter text={CONTENT?.[active] || ""} shouldStart={showResponse} onDone={onTypeDone} instant={instant} />
            {active === "how i uncover user needs" && showUserNeedsRest && <SegmentationDiagram />}
            {showPills && active === "designing systems at scale" && <JourneyMapPreview />}
          </div>
          {active === "how i uncover user needs" && showUserNeedsRest && (
            <div className="mt-5 rounded-[0px_36px_36px_36px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards] sm:p-6">
              <p className={`whitespace-pre-line break-words text-[14px] leading-[1.8] text-[#221B16] ${TYPEWRITE}`}>{USER_NEEDS_REST}</p>
            </div>
          )}
          {showPills && <ResponseLinks active={active} openProjectForActivePill={openProjectForActivePill} />}
        </>
      )}
    </>
  );
}

function MobileChatModal({ active, setActive, showThinking, showResponse, showPills, showUserNeedsRest, onTypeDone, openProjectForActivePill, onClose, instant }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className={`fixed inset-0 z-[60] flex flex-col bg-[#FFF8F5] ${BODY}`}>
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-10 flex items-start justify-between gap-3 px-4 pt-4">
        <div className="pointer-events-auto max-w-[calc(100%-72px)] rounded-[999px] border border-[#E4E2E1] bg-white px-7 py-5 shadow-sm">
          <div className="flex items-center gap-2">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A8176] ${HEADING}`}>ask me</p>
            <button type="button" onClick={() => setShowHint((c) => !c)} aria-label="Toggle hint"
              className="flex h-4 w-4 items-center justify-center p-0 leading-none text-[#8A817B] transition hover:text-[#A5522A]">
              <ChevronRightIcon className={`h-4 w-4 transition-transform duration-300 ${showHint ? "rotate-90" : ""}`} />
            </button>
          </div>
          {showHint && <p className="mt-2 text-[13px] text-[#6B625C] animate-[fadeUp_0.25s_ease_forwards]">Tap a chip to send a question.</p>}
        </div>
        <div className="pointer-events-auto">
          <CircleIconButton onClick={onClose} ariaLabel="Close chat" className="shadow-sm"><CloseIcon /></CircleIconButton>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-32 pt-28">
        <ChatConversation active={active} showThinking={showThinking} showResponse={showResponse}
          showPills={showPills} showUserNeedsRest={showUserNeedsRest}
          onTypeDone={onTypeDone} openProjectForActivePill={openProjectForActivePill} instant={instant} />
      </div>
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#FFF8F5] via-[#FFF8F5]/95 to-transparent px-4 pb-5 pt-8">
        <div className="pointer-events-auto no-scrollbar flex gap-2 overflow-x-auto">
          {PILLS.map((pill) => (
            <button key={pill} onClick={() => setActive(pill)}
              className={`shrink-0 rounded-full border bg-white px-4 py-2 text-[11px] transition ${
                active === pill ? "border-[#A5522A] text-[#A5522A]" : "border-[#E4E2E1] text-[#6B625C] hover:border-[#D8C5BB]"
              } ${HEADING}`}>
              {pill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function PortfolioHome() {
  const chatCardRef   = useRef(null);
  const chatScrollRef = useRef(null);

  const [active, setActive]                     = useState(PILLS[0]);
  const [cursor, setCursor]                     = useState({ x: 0, y: 0 });
  const [projectOpen, setProjectOpen]           = useState(null);
  const [workProjectSlug, setWorkProjectSlug]   = useState("b2c");
  const [mobileChatOpen, setMobileChatOpen]     = useState(false);

  // Chat display state
  const [showThinking, setShowThinking]         = useState(false);
  const [showResponse, setShowResponse]         = useState(false);
  const [showPills, setShowPills]               = useState(false);
  const [showUserNeedsRest, setShowUserNeedsRest] = useState(false);
  // instant=true on first load so text appears without typing
  const [instant, setInstant]                   = useState(true);
  const isFirstLoad                             = useRef(true);

  /* Favicon + title */
  useEffect(() => {
    const rm = () => document.querySelectorAll("link[rel*='icon'],link[rel='apple-touch-icon']").forEach((l) => l.parentNode?.removeChild(l));
    const add = (rel, href) => { const l = document.createElement("link"); l.rel = rel; l.type = "image/jpeg"; l.href = `${href}?v=${Date.now()}`; document.head.appendChild(l); };
    rm(); add("icon", "/logo.jpg"); add("shortcut icon", "/logo.jpg"); add("apple-touch-icon", "/logo.jpg");
    document.title = "Sanjana Venkat";
  }, []);

  /* Deep-link via hash */
  useEffect(() => {
    const hash = window.location.hash || "";
    if (hash.startsWith("#work=")) {
      setWorkProjectSlug(hash.replace("#work=", "") || "b2c");
      setProjectOpen("work-browser");
    }
  }, []);

  /* Chat response logic */
  useEffect(() => {
    if (isFirstLoad.current) {
      // First load: skip thinking, show text instantly with pills
      isFirstLoad.current = false;
      setInstant(true);
      setShowThinking(false);
      setShowResponse(true);
      setShowPills(true);
      setShowUserNeedsRest(active === "how i uncover user needs");
      return;
    }

    // Subsequent pill clicks: animate normally
    setInstant(false);
    setShowPills(false);
    setShowResponse(false);
    setShowUserNeedsRest(false);
    setShowThinking(true);

    const t = setTimeout(() => {
      setShowThinking(false);
      setShowResponse(true);
    }, 850);

    return () => clearTimeout(t);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTypeDone = () => {
    if (active === "how i uncover user needs") setShowUserNeedsRest(true);
    setShowPills(true);
  };

  const handlePillSelect = (pill) => {
    if (pill === active) return;
    chatCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(pill);
  };

  const openWorkProject = (slug) => {
    setWorkProjectSlug(slug);
    window.history.replaceState(null, "", `#work=${slug}`);
    setProjectOpen("work-browser");
  };

  const openProjectForActivePill = (override) => {
    setMobileChatOpen(false);
    if (override === "ai-framer")  { openWorkProject("ai-chat-journeys"); return; }
    if (override === "casey-ai")   { openWorkProject("conversational-agentic-ai"); return; }
    if (active === "how i uncover user needs")   { openWorkProject("b2c"); return; }
    if (active === "let's talk AI")              { openWorkProject("ai-chat-journeys"); return; }
    if (active === "product strategy thinking")  { openWorkProject("ai-personalization"); return; }
    if (active === "designing systems at scale") { openWorkProject("service-design"); return; }
    if (active === "how i ship fast")            { openWorkProject("vibe-coding"); return; }
    if (active === "how i get exec-buy in")      { openWorkProject("exec-pitch"); }
  };

  const closeWorkBrowser = () => {
    setProjectOpen(null);
    if (window.location.hash.startsWith("#work=")) window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <main
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`relative min-h-screen w-full overflow-x-hidden bg-[#F7F4F2] px-4 py-6 text-[#221B16] sm:px-8 sm:py-10 ${BODY}`}
    >
      {/* Modals */}
      {projectOpen === "work-browser" && <WorkBrowserModal initialSlug={workProjectSlug} onClose={closeWorkBrowser} />}
      {projectOpen === "ai-framer"       && <FramerModal title="AI Chat Journeys"           url={AI_FRAMER_URL}         onClose={() => setProjectOpen(null)} />}
      {projectOpen === "casey-ai"        && <FramerModal title="Casey AI"                   url={CASEY_AI_URL}          onClose={() => setProjectOpen(null)} />}
      {projectOpen === "marketing-tiles" && <FramerModal title="Product Strategy Thinking"  url={MARKETING_TILES_URL}   onClose={() => setProjectOpen(null)} />}
      {projectOpen === "apply-systems"   && <FramerModal title="Designing Systems at Scale" url={APPLY_SYSTEMS_URL}     onClose={() => setProjectOpen(null)} />}

      {mobileChatOpen && (
        <MobileChatModal
          active={active} setActive={setActive}
          showThinking={showThinking} showResponse={showResponse}
          showPills={showPills} showUserNeedsRest={showUserNeedsRest}
          onTypeDone={handleTypeDone} openProjectForActivePill={openProjectForActivePill}
          onClose={() => setMobileChatOpen(false)}
          instant={instant}
        />
      )}

      {/* Mobile FAB */}
      <button type="button" onClick={() => setMobileChatOpen(true)} aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#A5522A] p-0 leading-none text-white shadow-lg transition hover:scale-105 md:hidden">
        <span className="flex h-full w-full items-center justify-center leading-none"><ChatIcon /></span>
      </button>

      {/* Cursor glow */}
      <div className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full bg-orange-200/25 blur-3xl transition-transform duration-150"
        style={{ left: cursor.x - 150, top: cursor.y - 150 }} />

      <div className="relative z-10 mx-auto w-full max-w-[1280px]">

        {/* ── DESKTOP GRID ── */}
        <div className="hidden lg:grid"
          style={{ gridTemplateColumns: "480px 1fr 1fr", gridTemplateRows: "auto auto auto", gap: "14px" }}>

          {/* Chat: col 1, rows 1-2 */}
          <div ref={chatCardRef} className="rounded-[32px] bg-white overflow-hidden flex flex-col relative"
            style={{ gridColumn: "1", gridRow: "1 / 3", height: "520px" }}>
            <div className="px-6 pt-6 pb-3 shrink-0">
              <p className={`text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] ${HEADING}`}>ask me</p>
            </div>
            <div ref={(el) => { chatScrollRef.current = el; _chatScrollEl = el; }}
              className="flex-1 overflow-y-auto px-6 no-scrollbar"
              style={{ paddingBottom: showPills ? "64px" : "16px" }}>
              <ChatConversation active={active} showThinking={showThinking} showResponse={showResponse}
                showPills={showPills} showUserNeedsRest={showUserNeedsRest}
                onTypeDone={handleTypeDone} openProjectForActivePill={openProjectForActivePill}
                instant={instant} />
            </div>
            {showPills && (
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 animate-[fadeUp_0.45s_ease_forwards]" style={{ background: "none" }}>
                <div className="no-scrollbar overflow-x-auto">
                  <div className="flex gap-2" style={{ width: "max-content" }}>
                    {PILLS.map((pill) => (
                      <button key={pill} onClick={() => handlePillSelect(pill)}
                        className={`rounded-full border px-4 py-2 text-[11px] whitespace-nowrap transition hover:scale-[1.02] backdrop-blur-sm ${
                          active === pill ? "bg-white/90 border-[#A5522A] text-[#A5522A]" : "bg-white/90 border-[#E4E2E1] text-[#6B625C] hover:border-[#D8C5BB]"
                        } ${HEADING}`}>
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hero: col 2-3, row 1 */}
          <div style={{ gridColumn: "2 / 4", gridRow: "1" }} className="relative overflow-visible">
            <HeroTile />
          </div>

          {/* NavTile: col 2, row 2 */}
          <div style={{ gridColumn: "2", gridRow: "2" }}>
            <NavTile />
          </div>

          {/* What I Believe: col 3, row 2 */}
          <div style={{ gridColumn: "3", gridRow: "2" }}>
            <WhatIBelieveTile />
          </div>

          {/* My Work: col 1-2, row 3 */}
          <div style={{ gridColumn: "1 / 3", gridRow: "3" }}>
            <MyWorkTile onOpenProject={(key) => {
              const m = { "marketing-tiles": "ai-personalization", "ai-framer": "ai-chat-journeys", "travel-dna": "vibe-coding" };
              openWorkProject(m[key] || "b2c");
            }} />
          </div>

          {/* Testimonials: col 3, row 3 */}
          <div style={{ gridColumn: "3", gridRow: "3" }}>
            <TestimonialTile />
          </div>
        </div>

        {/* ── MOBILE STACK ── */}
        <div className="flex flex-col gap-4 lg:hidden">
          <HeroTile />
          <NavTile />
          <WhatIBelieveTile />
          <MyWorkTile onOpenProject={(key) => {
            const m = { "marketing-tiles": "ai-personalization", "ai-framer": "ai-chat-journeys", "travel-dna": "vibe-coding" };
            openWorkProject(m[key] || "b2c");
          }} />
          <TestimonialTile />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        @keyframes modalIn { from { opacity:0; transform:translateY(18px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(8px); }  to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(18px); } to { opacity:1; transform:translateX(0); } }
        @keyframes messageSend    { from { opacity:0; transform:translateY(10px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes answerBubbleIn { from { opacity:0; transform:translateY(14px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes glow { 0%{box-shadow:0 0 0 0 rgba(217,111,69,0.6);} 50%{box-shadow:0 0 0 12px rgba(217,111,69,0);} 100%{box-shadow:0 0 0 0 rgba(217,111,69,0);} }

        html, body { font-family:'Open Sans',sans-serif; background:#F7F4F2; }
        h1,h2,h3,h4,h5,h6,button { font-family:'Plus Jakarta Sans',sans-serif; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .no-scrollbar { scrollbar-width:none; -ms-overflow-style:none; }
        .no-scrollbar::-webkit-scrollbar { display:none; }
      `}</style>
    </main>
  );
}
