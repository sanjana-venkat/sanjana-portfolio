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
  "https://sanjanavenkat.framer.website/works/marketing-tiles";

const APPLY_SYSTEMS_URL =
  "https://sanjanavenkat.framer.website/works/chase-apply-2";

const WAYFARER_URL =
  "https://wayfarer-b1xt7lhgb-sanjanavnkt20-5780s-projects.vercel.app/";

const RESUME_URL = "/SanjanaVenkat_ProductDesigner_Resume.pdf";
const GITHUB_URL = "https://github.com/sanjana-venkat";

const JAKARTA = "[font-family:'Open_Sans',sans-serif]";
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
  return (
    <img
      src="/segmentation.png"
      alt="Audience segmentation framework"
      className="mt-8 w-full object-contain"
    />
  );
}

function JourneyMapPreview() {
  return (
    <a
      href={APPLY_SYSTEMS_URL}
      target="_blank"
      rel="noreferrer"
      className="mt-8 block overflow-hidden rounded-[28px] border border-[#E4E2E1] bg-white transition hover:-translate-y-1 hover:shadow-sm"
    >
      <img src="/journey-map.png" alt="Service design journey map" className="w-full object-contain" />
    </a>
  );
}

function FramerModal({ title, url, onClose }) {
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${JAKARTA}`}>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[20px] text-[#6B625C] transition hover:text-[#A5522A]"
          >
            ‹
          </button>

          <h2 className={`min-w-0 text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px] ${HEADING}`}>
            {title}
          </h2>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white">
          <iframe
            src={url}
            title={title}
            className="h-[82vh] w-full rounded-[24px] border-0 bg-white"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function WorkBrowserModal({ onClose }) {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${JAKARTA}`}>
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[20px] text-[#6B625C] transition hover:text-[#A5522A]"
          >
            ‹
          </button>

          <h2 className={`min-w-0 text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px] ${HEADING}`}>
            My Work
          </h2>
        </div>

        <div className="mb-5 rounded-[28px] border border-[#E4E2E1] bg-white p-3 sm:rounded-full sm:p-4">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0">
            {PROJECTS.map((project) => (
              <button
                key={project.label}
                onClick={() => setActiveProject(project)}
                className={`shrink-0 rounded-full border px-5 py-2 text-[12px] font-medium transition ${
                  activeProject.label === project.label
                    ? "border-[#9C3F14] bg-[#FFF8F5] text-[#9C3F14]"
                    : "border-[#E4E2E1] bg-white text-[#6B625C] hover:border-[#9C3F14] hover:text-[#9C3F14]"
                } ${HEADING}`}
              >
                {project.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] bg-white">
          <iframe
            key={activeProject.url}
            src={activeProject.url}
            title={activeProject.title}
            className="h-[80vh] w-full border-0 bg-white"
            allowFullScreen
          />
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
    <article className="rounded-[32px] border border-[#E4E2E1] bg-white p-7 text-[14px] transition-all duration-300 hover:-translate-y-1">
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
        <a
          href="mailto:sanjanavnkt20@gmail.com"
          aria-label="Email Sanjana"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] text-[#6B625C] transition hover:border-[#A5522A] hover:text-[#A5522A]"
        >
          ✉
        </a>

        <a
          href="https://www.linkedin.com/in/sanjana-venkat/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] text-[13px] font-semibold text-[#6B625C] transition hover:border-[#A5522A] hover:text-[#A5522A] ${HEADING}`}
        >
          in
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
    <section className="h-full min-h-[360px] rounded-[32px] border border-[#E4E2E1] bg-white p-8 transition-all duration-300 hover:-translate-y-1">
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
  const [quote, name, title] = TESTIMONIALS[index] || [];

  useEffect(() => {
    if (!TESTIMONIALS.length) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 5200);

    return () => clearInterval(timer);
  }, []);

  return (
    <article className="h-full min-h-[360px] rounded-[32px] border border-[#E4E2E1] bg-white p-8 text-[13px] transition-all duration-300 hover:-translate-y-1">
      <p className={`mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] ${HEADING}`}>
        what people say about me
      </p>

      <div key={index} className="min-h-[235px] animate-[slideIn_0.35s_ease_forwards]">
        <p className="italic leading-[1.55] text-[#4F4741]">“{quote}”</p>
        <p className={`mt-5 text-[14px] font-semibold text-[#111827] ${HEADING}`}>{name}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF]">{title}</p>
      </div>

      <div className="mt-5 flex gap-3">
        {TESTIMONIALS.map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={`h-3 rounded-full transition-all duration-300 ${index === dotIndex ? "w-10 bg-[#D96F45]" : "w-3 bg-[#EEF0F3]"}`}
          />
        ))}
      </div>
    </article>
  );
}

function ResponseLinks({ active, openProjectForActivePill }) {
  if (active === "let's talk AI") {
    return (
      <div className="flex flex-wrap gap-x-6 gap-y-3 px-2 pt-4 animate-[fadeUp_0.35s_ease_forwards]">
        <button
          onClick={() => openProjectForActivePill("ai-framer")}
          className="inline-flex text-[14px] font-medium text-[#8A817B] underline underline-offset-4 transition-colors hover:text-[#A5522A]"
        >
          AI chat journeys →
        </button>

        <button
          onClick={() => openProjectForActivePill("casey-ai")}
          className="inline-flex text-[14px] font-medium text-[#8A817B] underline underline-offset-4 transition-colors hover:text-[#A5522A]"
        >
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
      <button
        onClick={() => openProjectForActivePill()}
        className="inline-flex text-[14px] font-medium text-[#8A817B] underline underline-offset-4 transition-colors hover:text-[#A5522A]"
      >
        {ctaText}
      </button>
    </div>
  );
}


function MobileChatModal({ onClose, openProjectForActivePill }) {
  const [mobileActive, setMobileActive] = useState(PILLS[0]);
  const [showMobileThinking, setShowMobileThinking] = useState(true);
  const [showMobileResponse, setShowMobileResponse] = useState(false);
  const [showMobileLinks, setShowMobileLinks] = useState(false);
  const [showMobileUserNeedsRest, setShowMobileUserNeedsRest] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setShowMobileThinking(true);
    setShowMobileResponse(false);
    setShowMobileLinks(false);
    setShowMobileUserNeedsRest(false);

    const timer = setTimeout(() => {
      setShowMobileThinking(false);
      setShowMobileResponse(true);
    }, 650);

    return () => clearTimeout(timer);
  }, [mobileActive]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mobileActive, showMobileThinking, showMobileResponse, showMobileLinks, showMobileUserNeedsRest]);

  const handleMobilePillSelect = (pill) => {
    if (pill === mobileActive) return;
    setMobileActive(pill);
  };

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col bg-[#FFF8F5] ${JAKARTA}`}>
      <div className="flex items-center justify-between border-b border-[#E4E2E1] bg-white/90 px-4 py-4 backdrop-blur">
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A8176] ${HEADING}`}>
            ask me anything
          </p>
          <h2 className={`mt-1 text-[22px] font-semibold tracking-[-0.04em] text-[#9C3F14] ${HEADING}`}>
            Sanjana
          </h2>
        </div>

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[18px] text-[#6B625C]"
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-5">
        <div className="flex justify-end">
          <div className={`max-w-[86%] rounded-[28px_28px_0px_28px] bg-[#A5522A] px-5 py-3 text-[13px] leading-[1.7] text-white animate-[messageSend_0.35s_ease_forwards] ${TYPEWRITE}`}>
            {mobileActive}
          </div>
        </div>

        {showMobileThinking && (
          <div className="max-w-[88%] rounded-[0px_28px_28px_28px] bg-white p-5 animate-[fadeUp_0.25s_ease_forwards]">
            <div className="flex items-center gap-2 text-[12px] text-[#8A817B]">
              <span className="h-2 w-2 rounded-full bg-[#A5522A] animate-pulse" />
              thinking
            </div>
          </div>
        )}

        {showMobileResponse && (
          <>
            <div className="max-w-[94%] rounded-[0px_28px_28px_28px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards]">
              <Typewriter
                text={CONTENT?.[mobileActive] || ""}
                shouldStart={showMobileResponse}
                onDone={() => {
                  if (mobileActive === "how i uncover user needs") {
                    setShowMobileUserNeedsRest(true);
                  }

                  setShowMobileLinks(true);
                }}
              />

              {mobileActive === "how i uncover user needs" && showMobileUserNeedsRest && <SegmentationDiagram />}

              {showMobileLinks && mobileActive === "designing systems at scale" && <JourneyMapPreview />}
            </div>

            {mobileActive === "how i uncover user needs" && showMobileUserNeedsRest && (
              <div className="max-w-[94%] rounded-[0px_28px_28px_28px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards]">
                <p className={`whitespace-pre-line break-words text-[14px] leading-[1.8] text-[#221B16] ${TYPEWRITE}`}>
                  {USER_NEEDS_REST}
                </p>
              </div>
            )}

            {showMobileLinks && (
              <ResponseLinks
                active={mobileActive}
                openProjectForActivePill={(override) => {
                  onClose();
                  openProjectForActivePill(override, mobileActive);
                }}
              />
            )}
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-[#E4E2E1] bg-white/95 px-4 py-4 backdrop-blur">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => handleMobilePillSelect(pill)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[11px] transition ${
                mobileActive === pill
                  ? "border-[#A5522A] bg-[#FFF8F5] text-[#A5522A]"
                  : "border-[#E4E2E1] bg-white text-[#6B625C]"
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
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [showUserNeedsRest, setShowUserNeedsRest] = useState(false);

  useEffect(() => {
    let favicon = document.querySelector("link[rel='icon']");

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    favicon.type = "image/jpeg";
    favicon.href = "/logo.jpg";
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

  const openProjectForActivePill = (override, pillOverride) => {
    const selectedPill = pillOverride || active;

    if (override === "ai-framer") {
      setProjectOpen("ai-framer");
      return;
    }

    if (override === "casey-ai") {
      setProjectOpen("casey-ai");
      return;
    }

    if (selectedPill === "how i uncover user needs") {
      setProjectOpen("user-needs");
      return;
    }

    if (selectedPill === "let's talk AI") {
      setProjectOpen("ai-framer");
      return;
    }

    if (selectedPill === "product strategy thinking") {
      setProjectOpen("marketing-tiles");
      return;
    }

    if (selectedPill === "designing systems at scale") {
      setProjectOpen("apply-systems");
      return;
    }

    if (selectedPill === "how i ship fast") {
      window.open(WAYFARER_URL, "_blank");
      return;
    }

    if (selectedPill === "how i get exec-buy in") {
      setProjectOpen("figma-deck");
    }
  };

  return (
    <main
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className={`relative min-h-screen w-full overflow-x-hidden bg-[#F8F7F6] px-4 py-6 text-[#221B16] sm:px-8 sm:py-10 ${JAKARTA}`}
    >
      {projectOpen === "work-browser" && <WorkBrowserModal onClose={() => setProjectOpen(null)} />}

      {projectOpen === "user-needs" && (
        <FramerModal title="How I Uncover User Needs" url={USER_NEEDS_FRAMER_URL} onClose={() => setProjectOpen(null)} />
      )}

      {projectOpen === "figma-deck" && <FigmaDeckModal onClose={() => setProjectOpen(null)} />}

      {projectOpen === "ai-framer" && (
        <FramerModal title="AI Chat Journeys" url={AI_FRAMER_URL} onClose={() => setProjectOpen(null)} />
      )}

      {projectOpen === "casey-ai" && (
        <FramerModal title="Casey AI" url={CASEY_AI_URL} onClose={() => setProjectOpen(null)} />
      )}

      {projectOpen === "marketing-tiles" && (
        <FramerModal title="Product Strategy Thinking" url={MARKETING_TILES_URL} onClose={() => setProjectOpen(null)} />
      )}

      {projectOpen === "apply-systems" && (
        <FramerModal title="Designing Systems at Scale" url={APPLY_SYSTEMS_URL} onClose={() => setProjectOpen(null)} />
      )}

      {isMobileChatOpen && (
        <MobileChatModal
          onClose={() => setIsMobileChatOpen(false)}
          openProjectForActivePill={openProjectForActivePill}
        />
      )}

      <div
        className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full bg-orange-200/25 blur-3xl transition-transform duration-150"
        style={{ left: cursor.x - 150, top: cursor.y - 150 }}
      />

      <button
        onClick={() => setIsMobileChatOpen(true)}
        className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#A5522A] text-[22px] text-white shadow-lg transition hover:scale-105 lg:hidden ${HEADING}`}
        aria-label="Open chat"
      >
        ✦
      </button>

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
                <button
                  key={item}
                  onClick={() => handleNav(item)}
                  className="w-full rounded-full border border-[#E4E2E1] bg-white px-5 py-3 text-left text-[14px] font-medium text-[#221B16] transition hover:scale-[1.02] hover:border-[#D8C5BB]"
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>

          <div className="overflow-hidden rounded-[32px] border border-[#E4E2E1] bg-white">
            <img
              src="/profile.jpg"
              alt="Sanjana Venkat"
              className="h-[290px] w-full object-cover grayscale transition-all duration-500 hover:scale-[1.035] hover:grayscale-0"
            />
          </div>

          <WhatIBelieveCard />
        </aside>

        <section ref={chatCardRef} className="hidden rounded-[32px] border border-[#E4E2E1] bg-white p-4 transition-all duration-300 sm:p-6 lg:block">
          <div className="mb-6 flex justify-end">
            <div className={`rounded-[48px_48px_0px_48px] bg-[#A5522A] px-6 py-3 text-[14px] leading-[1.8] text-white animate-[messageSend_0.35s_ease_forwards] ${TYPEWRITE}`}>
              {active}
            </div>
          </div>

          {showThinking && (
            <div className="rounded-[0px_36px_36px_36px] bg-white p-5 animate-[fadeUp_0.25s_ease_forwards] sm:p-6">
              <div className="flex items-center gap-2 text-[12px] text-[#8A817B]">
                <span className="h-2 w-2 rounded-full bg-[#A5522A] animate-pulse" />
                thinking
              </div>
            </div>
          )}

          {showResponse && (
            <>
              <div className="rounded-[0px_36px_36px_36px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards] sm:p-6">
                <Typewriter
                  text={CONTENT?.[active] || ""}
                  shouldStart={showResponse}
                  onDone={() => {
                    if (active === "how i uncover user needs") {
                      setShowUserNeedsRest(true);
                    }

                    setShowPills(true);
                  }}
                />

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

          {showPills && (
            <div className="mt-6 flex flex-wrap gap-3 animate-[fadeUp_0.45s_ease_forwards]">
              {PILLS.map((pill) => (
                <button
                  key={pill}
                  onClick={() => handlePillSelect(pill)}
                  className={`rounded-full border px-5 py-2 text-[12px] transition hover:scale-[1.04] ${
                    active === pill
                      ? "border-[#A5522A] bg-white text-[#A5522A]"
                      : "border-[#E4E2E1] bg-white text-[#6B625C] hover:border-[#D8C5BB]"
                  }`}
                >
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
