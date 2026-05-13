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

const WAYFARER_URL =
  "https://wayfarer-b1xt7lhgb-sanjanavnkt20-5780s-projects.vercel.app/";

const RESUME_URL = "/SanjanaVenkat_ProductDesigner_Resume.pdf";
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
  "how i get exec-buy in"
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

That thinking helped the team move from “personalized content” to personalized recommendations:
• what does this customer need right now?
• what signal tells us that?
• how should the experience respond?

That's why I am so excited to unlock more possibilities with AI as we bring in real-time personalization with more data to build accurate recommendations.`,

  "designing systems at scale": `When I first joined the team, a lot of the work was focused on reducing drop-offs. I had ideas from competitive analysis, but I kept running into important constraints:

• we do not have that data to pre-fill information
• we cannot make this fully self-service
• human advisors still need to be part of the journey

That pushed me to learn the backend and map the full Apply & Fulfillment ecosystem. I created a service design blueprint that became a living document for all stakeholders.

It helped designers think beyond “change the content” or “add bigger tiles” and start designing around:
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

  "tell me your story": `Here’s how it happened.

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

Because I learned that good design doesn't work unless people understand it.`
};

const USER_NEEDS_REST = `The first outcome wasn’t perfectly clean. Overall lead submit decreased. So I went deep into the data again and found the breakthrough:

38% increase in lead initiation with clearer Apply messaging.

In a few sprints, we pushed toward redesigning the full journey and got design system modernization onto the roadmap.

Today, the experience is live and evolving with AI.`;

const PROJECTS = [
  { label: "user needs", title: "How I Uncover User Needs", url: USER_NEEDS_FRAMER_URL },
  { label: "product strategy", title: "Product Strategy Thinking", url: MARKETING_TILES_URL },
  { label: "systems at scale", title: "Designing Systems at Scale", url: APPLY_SYSTEMS_URL },
  { label: "AI chat journeys", title: "AI Chat Journeys", url: AI_FRAMER_URL },
  { label: "Casey AI", title: "Casey AI", url: CASEY_AI_URL },
  { label: "exec buy-in", title: "Executive Buy-in", url: FIGMA_DECK_URL },
  { label: "Wayfarer", title: "Wayfarer", url: WAYFARER_URL }
];

function ChevronLeftIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18L9 12l6-6" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-4 w-4" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
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

function Typewriter({ text, shouldStart, onDone }) {
  const cleanText = (text || "").trim();
  const [displayed, setDisplayed] = useState("");
  const [typedText, setTypedText] = useState(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!shouldStart) return;

    if (typedText === cleanText) {
      setDisplayed(cleanText);
      return;
    }

    setDisplayed("");
    let interval;

    const startDelay = setTimeout(() => {
      let index = 0;

      interval = setInterval(() => {
        setDisplayed(cleanText.slice(0, index + 1));
        index += 1;

        if (index >= cleanText.length) {
          clearInterval(interval);
          setTypedText(cleanText);
          setDisplayed(cleanText);
          setTimeout(() => onDoneRef.current?.(), 250);
        }
      }, 15);
    }, 350);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [cleanText, shouldStart, typedText]);

  return (
    <p className={`whitespace-pre-line text-[14px] leading-[1.8] text-[#221B16] ${TYPEWRITE}`}>
      {displayed}
      {typedText !== cleanText && <span className="animate-pulse text-[#A5522A]">|</span>}
    </p>
  );
}

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
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white p-0 leading-none text-[#6B625C] transition hover:text-[#A5522A] ${className}`}>
      <span className="flex h-full w-full items-center justify-center leading-none">{children}</span>
    </button>
  );
}

function FramerModal({ title, url, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${BODY}`}>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <CircleIconButton onClick={onClose} ariaLabel="Close project">
            <ChevronLeftIcon />
          </CircleIconButton>

          <h2 className={`min-w-0 text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px] ${HEADING}`}>
            {title}
          </h2>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white">
          <iframe src={url} title={title} className="h-[82vh] w-full rounded-[24px] border-0 bg-white" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

function WorkBrowserModal({ onClose }) {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${BODY}`}>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-6 flex items-center gap-4">
          <CircleIconButton onClick={onClose} ariaLabel="Close work browser">
            <ChevronLeftIcon />
          </CircleIconButton>

          <h2 className={`min-w-0 text-[42px] font-semibold leading-[0.95] tracking-[-0.06em] text-[#9C3F14] sm:text-[56px] ${HEADING}`}>
            My Work
          </h2>
        </div>

        <div className="no-scrollbar mb-6 flex gap-3 overflow-x-auto pb-2">
          {PROJECTS.map((project) => (
            <button
              key={project.label}
              onClick={() => setActiveProject(project)}
              className={`shrink-0 rounded-full border px-6 py-3 text-[14px] font-medium transition sm:px-7 sm:text-[15px] ${
                activeProject.label === project.label
                  ? "border-[#9C3F14] bg-white text-[#9C3F14]"
                  : "border-[#E4E2E1] bg-white text-[#6B625C] hover:border-[#9C3F14] hover:text-[#9C3F14]"
              } ${HEADING}`}
            >
              {project.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[32px] bg-white">
          <iframe key={activeProject.url} src={activeProject.url} title={activeProject.title} className="h-[80vh] w-full border-0 bg-white" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

function FigmaDeckModal({ onClose }) {
  return <FramerModal title="Chase HL Public" url={FIGMA_DECK_URL} onClose={onClose} />;
}

function WhatIBelieveCard() {
  return (
    <article className={`rounded-[32px] border border-[#E4E2E1] bg-white p-7 text-[14px] transition-all duration-300 hover:-translate-y-1 ${BODY}`}>
      <p className={`mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] ${HEADING}`}>
        what i believe in
      </p>

      <p className="leading-[1.65] text-[#5F5149]">
        i believe good products don’t just solve problems. they reveal ones people didn’t know they had.
      </p>

      <p className="mt-6 leading-[1.65] text-[#5F5149]">
        with AI and personalization, that gap gets smaller. But the real work is still human: listening, framing, building things that help people move forward.
      </p>

      <div className="mt-7 flex items-center gap-4">
        <a href="mailto:sanjanavnkt20@gmail.com" aria-label="Email Sanjana" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] bg-white p-0 leading-none text-[#6B625C] transition hover:border-[#A5522A] hover:text-[#A5522A]">
          <span className="flex h-full w-full items-center justify-center leading-none"><MailIcon /></span>
        </a>

        <a href="https://www.linkedin.com/in/sanjana-venkat/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] bg-white p-0 text-[13px] font-semibold leading-none text-[#6B625C] transition hover:border-[#A5522A] hover:text-[#A5522A] ${HEADING}`}>
          <span className="flex h-full w-full items-center justify-center leading-none">in</span>
        </a>
      </div>
    </article>
  );
}

function HorizontalTimeline() {
  const items = [
    ["2023", "B.S. Psychology, Design concentration", "UT Dallas • Understanding human behavior and design principles to build better experiences.", false],
    ["2023", "Associate Product Designer", "Paycom • Founding member of a new subteam. Focused on B2B enterprise solutions and design system.", false],
    ["2024 — PRESENT", "Senior Product Designer", "JP Morgan Chase • Leading Marketing and AI initiatives. Building 0-to-1 product and driving impact across the ecosystem.", true]
  ];

  return (
    <section className={`h-full min-h-[360px] rounded-[32px] border border-[#E4E2E1] bg-white p-8 transition-all duration-300 hover:-translate-y-1 ${BODY}`}>
      <p className={`mb-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] ${HEADING}`}>
        timeline
      </p>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="absolute left-0 top-[18px] hidden h-px w-full bg-[#E8D8D0] md:block" />

        {items.map(([year, title, body, isActive]) => (
          <div key={title} className="relative pt-10">
            <span className={`absolute left-0 top-[12px] h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2 ${isActive ? "bg-[#D96F45] animate-glow" : "bg-[#E4E2E1]"}`} />

            <p className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${HEADING} ${isActive ? "text-[#D96F45]" : "text-[#9CA3AF]"}`}>
              {year}
            </p>

            <p className={`mt-2 text-[16px] font-semibold leading-tight text-[#221B16] ${HEADING}`}>
              {title}
            </p>

            <p className="mt-2 text-[12px] leading-[1.45] text-[#7A706A]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quote, name, title] = TESTIMONIALS[index] || [];

  useEffect(() => {
    if (!TESTIMONIALS.length || isPaused) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 5200);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <article className={`relative h-full min-h-[360px] rounded-[32px] border border-[#E4E2E1] bg-white p-8 text-[13px] transition-all duration-300 hover:-translate-y-1 ${BODY}`}>
      <p className={`mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] ${HEADING}`}>
        what people say about me
      </p>

      <div key={index} className="min-h-[235px] animate-[slideIn_0.35s_ease_forwards]">
        <p className="italic leading-[1.55] text-[#4F4741]">“{quote}”</p>
        <p className={`mt-5 text-[14px] font-semibold text-[#111827] ${HEADING}`}>{name}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF]">{title}</p>
      </div>

      <div className="mt-5 flex gap-3 pr-14">
        {TESTIMONIALS.map((_, dotIndex) => (
          <span key={dotIndex} className={`h-3 rounded-full transition-all duration-300 ${index === dotIndex ? "w-10 bg-[#D96F45]" : "w-3 bg-[#EEF0F3]"}`} />
        ))}
      </div>

      <button type="button" onClick={() => setIsPaused((current) => !current)} aria-label={isPaused ? "Play testimonials" : "Pause testimonials"} className="absolute bottom-7 right-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] bg-white p-0 leading-none text-[#6B625C] transition hover:border-[#A5522A] hover:text-[#A5522A]">
        <span className="flex h-full w-full items-center justify-center leading-none">
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </span>
      </button>
    </article>
  );
}

function ResponseLinks({ active, openProjectForActivePill }) {
  if (active === "let's talk AI") {
    return (
      <div className="flex flex-wrap gap-x-6 gap-y-3 px-2 pt-4 animate-[fadeUp_0.35s_ease_forwards]">
        <button onClick={() => openProjectForActivePill("ai-framer")} className={`inline-flex text-[14px] font-medium text-[#8A817B] underline underline-offset-4 transition-colors hover:text-[#A5522A] ${HEADING}`}>
          AI chat journeys →
        </button>

        <button onClick={() => openProjectForActivePill("casey-ai")} className={`inline-flex text-[14px] font-medium text-[#8A817B] underline underline-offset-4 transition-colors hover:text-[#A5522A] ${HEADING}`}>
          what’s casey AI? →
        </button>
      </div>
    );
  }

  const ctaText = (() => {
    if (active === "how i get exec-buy in") return "walk me through the project →";
    if (active === "product strategy thinking") return "show me the strategy work →";
    if (active === "how i uncover user needs") return "show me the work →";
    if (active === "designing systems at scale") return "show me the system →";
    if (active === "how i ship fast") return "what have you been building? →";
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

function ChatConversation({ active, showThinking, showResponse, showPills, showUserNeedsRest, onTypeDone, openProjectForActivePill }) {
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
            <Typewriter text={CONTENT?.[active] || ""} shouldStart={showResponse} onDone={onTypeDone} />

            {active === "how i uncover user needs" && showUserNeedsRest && <SegmentationDiagram />}

            {showPills && active === "designing systems at scale" && <JourneyMapPreview />}
          </div>

          {active === "how i uncover user needs" && showUserNeedsRest && (
            <div className="mt-5 rounded-[0px_36px_36px_36px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards] sm:p-6">
              <p className={`whitespace-pre-line break-words text-[14px] leading-[1.8] text-[#221B16] ${TYPEWRITE}`}>
                {USER_NEEDS_REST}
              </p>
            </div>
          )}

          {showPills && <ResponseLinks active={active} openProjectForActivePill={openProjectForActivePill} />}
        </>
      )}
    </>
  );
}

function MobileChatModal({ active, setActive, showThinking, showResponse, showPills, showUserNeedsRest, onTypeDone, openProjectForActivePill, onClose }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col bg-[#FFF8F5] ${BODY}`}>
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-10 flex items-start justify-between gap-3 px-4 pt-4">
        <div className="pointer-events-auto relative max-w-[calc(100%-72px)] rounded-[999px] border border-[#E4E2E1] bg-white px-7 py-5 pr-12 shadow-sm">
          <div className="min-w-0">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A8176] ${HEADING}`}>
              ask sanjana
            </p>

            {showHint && (
              <p className="mt-2 text-[13px] text-[#6B625C] animate-[fadeUp_0.25s_ease_forwards]">
                Tap a chip to send a question.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowHint((current) => !current)}
            aria-label={showHint ? "Hide hint" : "Show hint"}
            className={`absolute right-7 top-1/2 inline-flex -translate-y-1/2 items-center justify-center text-[18px] font-medium leading-none text-[#8A817B] transition hover:text-[#A5522A] ${HEADING}`}
          >
            <span className={`leading-none transition-transform duration-300 ${showHint ? "rotate-90" : ""}`}>
              ›
            </span>
          </button>
        </div>

        <div className="pointer-events-auto">
          <CircleIconButton onClick={onClose} ariaLabel="Close chat" className="shadow-sm">
            <CloseIcon />
          </CircleIconButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-32 pt-28">
        <ChatConversation
          active={active}
          showThinking={showThinking}
          showResponse={showResponse}
          showPills={showPills}
          showUserNeedsRest={showUserNeedsRest}
          onTypeDone={onTypeDone}
          openProjectForActivePill={openProjectForActivePill}
        />
      </div>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#FFF8F5] via-[#FFF8F5]/95 to-transparent px-4 pb-5 pt-8">
        <div className="pointer-events-auto no-scrollbar flex gap-2 overflow-x-auto">
          {PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => setActive(pill)}
              className={`shrink-0 rounded-full border bg-white px-4 py-2 text-[11px] transition ${
                active === pill
                  ? "border-[#A5522A] text-[#A5522A]"
                  : "border-[#E4E2E1] text-[#6B625C] hover:border-[#D8C5BB]"
              } ${HEADING}`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioHome() {
  const chatCardRef = useRef(null);
  const [active, setActive] = useState(PILLS[0]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [projectOpen, setProjectOpen] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [showUserNeedsRest, setShowUserNeedsRest] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  useEffect(() => {
    const existingIcon = document.querySelector("link[rel='icon']") || document.createElement("link");

    existingIcon.setAttribute("rel", "icon");
    existingIcon.setAttribute("type", "image/jpeg");
    existingIcon.setAttribute("href", "/logo.jpg");

    if (!existingIcon.parentNode) {
      document.head.appendChild(existingIcon);
    }
  }, []);

  useEffect(() => {
    setShowPills(false);
    setShowResponse(false);
    setShowUserNeedsRest(false);
    setShowThinking(true);

    const timer = setTimeout(() => {
      setShowThinking(false);
      setShowResponse(true);
      setHasLoaded(true);
    }, hasLoaded ? 850 : 1200);

    return () => clearTimeout(timer);
  }, [active, hasLoaded]);

  const handleTypeDone = () => {
    if (active === "how i uncover user needs") {
      setShowUserNeedsRest(true);
    }

    setShowPills(true);
  };

  const handlePillSelect = (pill) => {
    if (pill === active) return;
    chatCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(pill);
  };

  const handleNav = (item) => {
    if (item === "my work") {
      setProjectOpen("work-browser");
      return;
    }

    if (item === "what are you building now") {
      window.open(WAYFARER_URL, "_blank");
      return;
    }

    if (item === "resume") {
      window.open(RESUME_URL, "_blank");
      return;
    }

    if (item === "github") {
      window.open(GITHUB_URL, "_blank");
      return;
    }

    if (item === "contact") {
      window.open("https://www.linkedin.com/in/sanjana-venkat/", "_blank");
    }
  };

  const openProjectForActivePill = (override) => {
    setMobileChatOpen(false);

    if (override === "ai-framer") {
      setProjectOpen("ai-framer");
      return;
    }

    if (override === "casey-ai") {
      setProjectOpen("casey-ai");
      return;
    }

    if (active === "how i uncover user needs") {
      setProjectOpen("user-needs");
      return;
    }

    if (active === "let's talk AI") {
      setProjectOpen("ai-framer");
      return;
    }

    if (active === "product strategy thinking") {
      setProjectOpen("marketing-tiles");
      return;
    }

    if (active === "designing systems at scale") {
      setProjectOpen("apply-systems");
      return;
    }

    if (active === "how i ship fast") {
      window.open(WAYFARER_URL, "_blank");
      return;
    }

    if (active === "how i get exec-buy in") {
      setProjectOpen("figma-deck");
    }
  };

  return (
    <main onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })} className={`relative min-h-screen w-full overflow-x-hidden bg-[#F8F7F6] px-4 py-6 text-[#221B16] sm:px-8 sm:py-10 ${BODY}`}>
      {projectOpen === "work-browser" && <WorkBrowserModal onClose={() => setProjectOpen(null)} />}

      {projectOpen === "user-needs" && <FramerModal title="How I Uncover User Needs" url={USER_NEEDS_FRAMER_URL} onClose={() => setProjectOpen(null)} />}

      {projectOpen === "figma-deck" && <FigmaDeckModal onClose={() => setProjectOpen(null)} />}

      {projectOpen === "ai-framer" && <FramerModal title="AI Chat Journeys" url={AI_FRAMER_URL} onClose={() => setProjectOpen(null)} />}

      {projectOpen === "casey-ai" && <FramerModal title="Casey AI" url={CASEY_AI_URL} onClose={() => setProjectOpen(null)} />}

      {projectOpen === "marketing-tiles" && <FramerModal title="Product Strategy Thinking" url={MARKETING_TILES_URL} onClose={() => setProjectOpen(null)} />}

      {projectOpen === "apply-systems" && <FramerModal title="Designing Systems at Scale" url={APPLY_SYSTEMS_URL} onClose={() => setProjectOpen(null)} />}

      {mobileChatOpen && (
        <MobileChatModal
          active={active}
          setActive={setActive}
          showThinking={showThinking}
          showResponse={showResponse}
          showPills={showPills}
          showUserNeedsRest={showUserNeedsRest}
          onTypeDone={handleTypeDone}
          openProjectForActivePill={openProjectForActivePill}
          onClose={() => setMobileChatOpen(false)}
        />
      )}

      <button type="button" onClick={() => setMobileChatOpen(true)} aria-label="Open chat" className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#A5522A] p-0 leading-none text-white shadow-lg transition hover:scale-105 md:hidden">
        <span className="flex h-full w-full items-center justify-center leading-none"><ChatIcon /></span>
      </button>

      <div className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full bg-orange-200/25 blur-3xl transition-transform duration-150" style={{ left: cursor.x - 150, top: cursor.y - 150 }} />

      <section className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[280px_1fr]">
        <aside className="flex flex-col gap-8">
          <div>
            <h1 className={`text-[32px] font-semibold leading-[1.03] tracking-[-0.04em] text-[#A5522A] ${HEADING}`}>
              Sanjana
              <br />
              Venkat
            </h1>

            <p className="mt-3 max-w-[240px] text-[16px] leading-[1.45] text-[#5F5149]">
              I turn ambiguity into direction. Let me show you.
            </p>
          </div>

          <nav>
            <p className={`mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7B6258] ${HEADING}`}>
              or start here:
            </p>

            <div className="flex flex-col gap-3">
              {["my work", "what are you building now", "resume", "github", "contact"].map((item) => (
                <button key={item} onClick={() => handleNav(item)} className={`w-full rounded-full border border-[#E4E2E1] bg-white px-5 py-3 text-left text-[14px] font-medium text-[#221B16] transition hover:scale-[1.02] hover:border-[#D8C5BB] ${HEADING}`}>
                  {item}
                </button>
              ))}
            </div>
          </nav>

          <div className="overflow-hidden rounded-[32px] border border-[#E4E2E1] bg-white">
            <img src="/profile.jpg" alt="Sanjana Venkat" className="h-[290px] w-full object-cover grayscale transition-all duration-500 hover:scale-[1.035] hover:grayscale-0" />
          </div>

          <WhatIBelieveCard />
        </aside>

        <section ref={chatCardRef} className="hidden rounded-[32px] border border-[#E4E2E1] bg-white p-4 transition-all duration-300 sm:p-6 md:block">
          <ChatConversation
            active={active}
            showThinking={showThinking}
            showResponse={showResponse}
            showPills={showPills}
            showUserNeedsRest={showUserNeedsRest}
            onTypeDone={handleTypeDone}
            openProjectForActivePill={openProjectForActivePill}
          />

          {showPills && (
            <div className="mt-6 flex flex-wrap gap-3 animate-[fadeUp_0.45s_ease_forwards]">
              {PILLS.map((pill) => (
                <button key={pill} onClick={() => handlePillSelect(pill)} className={`rounded-full border px-5 py-2 text-[12px] transition hover:scale-[1.04] ${
                    active === pill
                      ? "border-[#A5522A] bg-white text-[#A5522A]"
                      : "border-[#E4E2E1] bg-white text-[#6B625C] hover:border-[#D8C5BB]"
                  } ${HEADING}`}>
                  {pill}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 gap-8 lg:col-span-2 lg:grid-cols-[1.15fr_0.85fr]">
          <HorizontalTimeline />
          <TestimonialCarousel />
        </section>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(18px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes messageSend {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes answerBubbleIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes glow {
          0% { box-shadow: 0 0 0 0 rgba(217,111,69,0.6); }
          50% { box-shadow: 0 0 0 12px rgba(217,111,69,0); }
          100% { box-shadow: 0 0 0 0 rgba(217,111,69,0); }
        }

        html,
        body {
          font-family: 'Open Sans', sans-serif;
          background: #F8F7F6;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        button {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
