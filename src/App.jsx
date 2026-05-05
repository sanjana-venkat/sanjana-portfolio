import React, { useEffect, useRef, useState } from "react";
import {
  CONTENT,
  DATA_DRIVEN_REST,
  PILLS,
  PROJECT_FOR_PILL,
  TESTIMONIALS
} from "./data/portfolioData";

function Typewriter({ text, shouldStart, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [typedText, setTypedText] = useState(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!shouldStart) return;

    if (typedText === text) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let interval;

    const startDelay = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        setDisplayed(text.slice(0, index + 1));
        index += 1;

        if (index >= text.length) {
          clearInterval(interval);
          setTypedText(text);
          setDisplayed(text);
          setTimeout(() => onDoneRef.current?.(), 250);
        }
      }, 6);
    }, 450);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [text, shouldStart, typedText]);

  return (
    <p className="whitespace-pre-line text-[14px] leading-[1.65] text-[#221B16]">
      {displayed}
      {typedText !== text && (
        <span className="animate-pulse text-[#A5522A]">|</span>
      )}
    </p>
  );
}

function SegmentationDiagram() {
  return (
    <img
      src="/segmentation.png"
      alt="Audience segmentation framework"
      className="mt-8 w-full rounded-[20px] object-contain"
    />
  );
}

function ProjectModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards]">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[20px] text-[#6B625C] transition hover:text-[#A5522A]"
          >
            ‹
          </button>
          <h2 className="text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px]">
            Chase HL Public
          </h2>
        </div>

        <div className="mb-6 rounded-[28px] border border-[#E4E2E1] bg-white p-3 sm:rounded-full sm:p-4">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {["data discovery", "define", "solution", "impact", "optimize"].map((section) => (
              <a
                key={section}
                href={`#${section.replaceAll(" ", "-")}`}
                className="shrink-0 rounded-full border border-[#E4E2E1] bg-white px-4 py-2 text-[12px] font-medium text-[#6B625C] transition hover:border-[#9C3F14] hover:text-[#9C3F14] sm:px-5"
              >
                {section}
              </a>
            ))}
          </div>
        </div>

        <article className="max-h-[74vh] space-y-8 overflow-y-auto rounded-[28px] bg-white p-4 sm:rounded-[36px] sm:p-8">
          <section className="rounded-[30px] bg-gradient-to-br from-[#FBF7F4] via-[#F7F2EF] to-[#EFEAE6] p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">
                  Lead Designer • Public redesign
                </p>
                <h1 className="mt-4 text-[38px] font-semibold leading-[1] tracking-[-0.05em] text-[#221B16] sm:text-[52px]">
                  JPMC Home Lending Public Experience
                </h1>
                <p className="mt-5 max-w-[560px] text-[18px] leading-[1.6] text-[#5F5149]">
                  Driving a 38% boost in conversions with need-based segmentation.
                </p>
              </div>
              <img
                src="/chasepublic-header.jpg"
                alt="Chase public redesign"
                className="w-full rounded-[28px] border border-[#E4E2E1] object-contain"
              />
            </div>
          </section>

          <CaseStudySection
            id="data-discovery"
            label="Data discovery"
            title="High traffic, low conversion"
            body="Raw data showed conversion rates across touch points. The story was clear: people were visiting but not converting. I created a simple visualization to show the market we were missing, helping leadership understand the bottleneck and securing $10K+ in investment."
            image="/chasepublic-datadiscovery.jpg"
          />

          <section className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8">
            <h3 className="text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">
              Deeper look at data
            </h3>
            <p className="mt-3 text-[18px] leading-[1.55] text-[#6B625C]">
              Let’s analyze the points of friction and the clicks to understand customer intent and needs.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
              <div className="space-y-8">
                <Insight
                  icon="↯"
                  title="KYC Flow"
                  body="Start online takes customers through account creation with sensitive questions like SSN."
                />
                <Insight
                  icon="✦"
                  title="Outdated design"
                  body="Over 800 public pages, lack of branding, and 20+ CTAs with unclear pathways."
                />
                <Insight
                  icon="↖"
                  title="Clicks"
                  body="Top clicks were miscellaneous actions. Rates was the 4th click and 3 scrolls below."
                />
              </div>
              <img
                src="/chasepublic-datadiscovery2.jpg"
                alt="Annotated Chase page"
                className="max-h-[680px] w-full rounded-[28px] object-contain object-top"
              />
            </div>
          </section>

          <CaseStudySection
            id="define"
            label="Define"
            title="3-day design workshop"
            body="The design team led a workshop to step outside tech constraints, define a clear vision for stakeholders, create concepts, and plan the roadmap."
            image="/chasepublic-datadiscovery3.jpg"
          />

          <section className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8">
            <h3 className="text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">
              Scenario mapping
            </h3>
            <p className="mt-3 text-[18px] leading-[1.6] text-[#6B625C]">
              We used scenario mapping and the four forces model to understand what would push customers toward home ownership and what would hold them back.
            </p>
            <img
              src="/chasepublic-define.jpg"
              alt="Scenario mapping"
              className="mt-8 w-full rounded-[28px] border border-[#E4E2E1] object-contain"
            />
          </section>

          <Quotes />
          <DesignValues />

          <CaseStudySection
            id="solution"
            label="Solution"
            title="Earn trust, establish trust, keep trust"
            body="Customer research led us to three segments based on needs and trust: early explorers, rate shoppers, and customers ready to apply."
            image="/segmentation.png"
          />

          <SolutionBlocks />
          <Results />

          <CaseStudySection
            id="optimize"
            label="Optimize"
            title="Constraint into roadmap"
            body="One constraint: we were working within an older design system, but we still pushed for a more modern foundation. That led to a redesigned rates page and improved calculators built for real user needs. The work made it onto the roadmap and is live today."
          />

          <section className="grid gap-6 md:grid-cols-2">
            <img
              src="/calculator.jpg"
              alt="Calculator"
              className="w-full rounded-[28px] border border-[#E4E2E1] object-contain"
            />
            <img
              src="/rates.jpg"
              alt="Rates page"
              className="w-full rounded-[28px] border border-[#E4E2E1] object-contain"
            />
          </section>
        </article>
      </div>
    </div>
  );
}

function CaseStudySection({ id, label, title, body, image }) {
  return (
    <section
      id={id}
      className="grid scroll-mt-8 grid-cols-1 gap-6 lg:grid-cols-[0.82fr_1.18fr]"
    >
      <div className="rounded-[30px] bg-white p-6 sm:p-9">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">
          {label}
        </p>
        <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">
          {title}
        </h2>
        <p className="mt-5 text-[17px] leading-[1.7] text-[#6B625C]">{body}</p>
      </div>
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full rounded-[30px] border border-[#E4E2E1] object-contain"
        />
      )}
    </section>
  );
}

function Insight({ icon, title, body }) {
  return (
    <div>
      <div className="text-[34px] leading-none text-[#221B16]">{icon}</div>
      <h4 className="mt-3 text-[18px] font-semibold text-[#221B16]">{title}</h4>
      <p className="mt-2 text-[17px] leading-[1.45] text-[#6B625C]">{body}</p>
    </div>
  );
}

function Quotes() {
  const quotes = [
    "I notice the apply button but I would definitely be spending more time in the learn before deciding to understand everything first",
    "Just to understand the steps before I commit to clicking on the apply to buy button",
    "I don't feel ready because I would want to consider my husband's finances as part of the loan."
  ];

  return (
    <section className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8">
      <h3 className="text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">
        Habits and anxieties
      </h3>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {quotes.map((quote) => (
          <article key={quote} className="rounded-[28px] bg-[#EFEFEF] p-7">
            <div className="text-[54px] leading-none">“</div>
            <p className="mt-4 text-[17px] leading-[1.55]">“{quote}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DesignValues() {
  return (
    <section className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8">
      <h3 className="text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">
        Design values
      </h3>
      <p className="mt-3 text-[18px] leading-[1.55] text-[#6B625C]">
        We grounded decisions in customers’ thoughts, feelings and actions.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <ValueCard
          good
          title="What we want"
          body="Think: Chase is reliable and offers clear options. Feel: Confident and supported. Say: I know what to do. Do: Use tools, start an application, reach out for help."
        />
        <ValueCard
          title="What we don’t want"
          body="Think: I don’t know where to look. Feel: Overwhelmed or skeptical. Say: This is too complicated. Do: Leave the page or look elsewhere."
        />
      </div>
    </section>
  );
}

function ValueCard({ good, title, body }) {
  return (
    <div>
      <div
        className={`rounded-[24px] p-6 text-[18px] font-semibold ${
          good ? "bg-[#CFEBD5]" : "bg-[#F3C7C7]"
        }`}
      >
        {good ? "👍" : "👎"} &nbsp; {title}
      </div>
      <div className="mt-5 rounded-[24px] bg-[#EFEFEF] p-6 text-[15px] leading-[1.7]">
        {body}
      </div>
    </div>
  );
}

function SolutionBlocks() {
  const blocks = [
    [
      "Ready to apply segment",
      "Start online might get clicks, but customers who are actually ready to apply will click Apply to buy.",
      "/chasepublic-solution.jpg",
      false
    ],
    [
      "Rates as decision point",
      "Rates was 4 scrolls below in the old page. New page has value, personalized context, and rates in the first scroll.",
      "/chasepublic-solution2.jpg",
      true
    ],
    [
      "Shopping segment",
      "Reduce CTA overload with clear, purposeful CTAs and highlight calculators with helpful guide content.",
      "/chasepublic-solution3.jpg",
      false
    ],
    [
      "Early explorer segment",
      "Top 3 action-oriented educational articles replaced 7 hyperlinks, reducing pressure before users were ready.",
      "/chasepublic-solution4.jpg",
      true
    ]
  ];

  return (
    <section className="space-y-6">
      {blocks.map(([title, body, image, flip]) => (
        <div
          key={title}
          className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            {!flip && <SolutionText title={title} body={body} />}
            <img src={image} alt={title} className="w-full rounded-[24px] object-contain" />
            {flip && <SolutionText title={title} body={body} />}
          </div>
        </div>
      ))}
    </section>
  );
}

function SolutionText({ title, body }) {
  return (
    <div>
      <h3 className="text-[30px] font-semibold tracking-[-0.04em] text-[#221B16]">
        {title}
      </h3>
      <p className="mt-5 text-[18px] leading-[1.55] text-[#6B625C]">{body}</p>
    </div>
  );
}

function Results() {
  const metrics = [
    ["↑", "38%", "Increase in lead initiate for variant compared to control", "text-[#3F9B4F]"],
    ["↓", "-0.5%", "Reduced conversion in mobile, split flag issues and further investigation", "text-[#EF3E36]"],
    ["↑", "30.9%", "Increase in lead submit conversion in variant compared to control", "text-[#3F9B4F]"]
  ];

  return (
    <section
      id="impact"
      className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {metrics.map(([arrow, metric, body, color]) => (
          <article key={metric} className="flex gap-5">
            <div className={`text-[58px] leading-none ${color}`}>{arrow}</div>
            <div>
              <p className="text-[38px] font-semibold tracking-[-0.04em] text-[#221B16]">
                {metric}
              </p>
              <p className="mt-3 text-[18px] leading-[1.35] text-[#6B625C]">
                {body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhatIBelieveCard() {
  return (
    <article className="rounded-[32px] border border-[#E4E2E1] bg-white p-7 text-[14px] transition-all duration-300 hover:-translate-y-1">
      <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">
        what i believe in
      </p>
      <p className="leading-[1.65] text-[#5F5149]">
        i believe good products don’t just solve problems. they reveal ones people didn’t know they had.
      </p>
      <p className="mt-6 leading-[1.65] text-[#5F5149]">
        with AI and personalization, that gap gets smaller. But the real work is still human: listening, framing, building things that help people move forward.
      </p>
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
      <p className="mb-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">
        timeline
      </p>
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="absolute left-0 top-[18px] hidden h-px w-full bg-[#E8D8D0] md:block" />
        {items.map(([year, title, body, isActive]) => (
          <div key={title} className="relative pt-10">
            <span
              className={`absolute left-0 top-[12px] h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2 ${
                isActive ? "bg-[#D96F45] animate-glow" : "bg-[#E4E2E1]"
              }`}
            />
            <p
              className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${
                isActive ? "text-[#D96F45]" : "text-[#9CA3AF]"
              }`}
            >
              {year}
            </p>
            <p className="mt-2 text-[16px] font-semibold leading-tight text-[#221B16]">
              {title}
            </p>
            <p className="mt-2 text-[12px] leading-[1.45] text-[#7A706A]">
              {body}
            </p>
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
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % TESTIMONIALS.length),
      5200
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <article className="h-full min-h-[360px] rounded-[32px] border border-[#E4E2E1] bg-white p-8 text-[13px] transition-all duration-300 hover:-translate-y-1">
      <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">
        what people say about me
      </p>
      <div key={index} className="min-h-[235px] animate-[slideIn_0.35s_ease_forwards]">
        <p className="italic leading-[1.55] text-[#4F4741]">“{quote}”</p>
        <p className="mt-5 text-[14px] font-semibold text-[#111827]">{name}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF]">
          {title}
        </p>
      </div>
      <div className="mt-5 flex gap-3">
        {TESTIMONIALS.map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === dotIndex ? "w-10 bg-[#D96F45]" : "w-3 bg-[#EEF0F3]"
            }`}
          />
        ))}
      </div>
    </article>
  );
}

export default function PortfolioHome() {
  const chatCardRef = useRef(null);
  const [active, setActive] = useState(PILLS?.[0] || "Show data-driven design");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [projectOpen, setProjectOpen] = useState(null);
  const [showExamplesFollowUp, setShowExamplesFollowUp] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [showDataDrivenRest, setShowDataDrivenRest] = useState(false);

  useEffect(() => {
    setShowExamplesFollowUp(false);
    setShowPills(false);
    setShowResponse(false);
    setShowDataDrivenRest(false);
    setShowThinking(true);

    const timer = setTimeout(() => {
      setShowThinking(false);
      setShowResponse(true);
      setHasLoaded(true);
    }, hasLoaded ? 900 : 1300);

    return () => clearTimeout(timer);
  }, [active, hasLoaded]);

  const handlePillSelect = (pill) => {
    if (pill === active) return;
    chatCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(pill);
  };

  const handleNav = (item) => {
    if (item === "my work") setProjectOpen("chase-hl-public");
    if (item === "contact") {
      window.open("https://www.linkedin.com/in/sanjana-venkat/", "_blank");
    }
  };

  const openProjectForActivePill = () => {
    const projectKey = PROJECT_FOR_PILL?.[active];
    if (projectKey) setProjectOpen(projectKey);
  };

  return (
    <main
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className="relative min-h-screen w-full overflow-x-hidden bg-[#F8F7F6] px-4 py-6 text-[#221B16] sm:px-8 sm:py-10"
    >
      {projectOpen && <ProjectModal onClose={() => setProjectOpen(null)} />}

      <div
        className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full bg-orange-200/25 blur-3xl transition-transform duration-150"
        style={{ left: cursor.x - 150, top: cursor.y - 150 }}
      />

      <section className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[280px_1fr]">
        <aside className="flex flex-col gap-8">
          <div>
            <h1 className="text-[32px] font-semibold leading-[1.03] tracking-[-0.04em] text-[#A5522A]">
              Sanjana
              <br />
              Venkat
            </h1>
            <p className="mt-3 max-w-[240px] text-[16px] leading-[1.45] text-[#5F5149]">
              I turn ambiguity into direction. Let me show you.
            </p>
          </div>

          <nav>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7B6258]">
              or start here:
            </p>
            <div className="flex flex-col gap-3">
              {["my work", "what i'm good at", "resume", "contact"].map((item) => (
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

        <section
          ref={chatCardRef}
          className="rounded-[32px] border border-[#E4E2E1] bg-white p-5 transition-all duration-300 sm:p-12"
        >
          <div className="mb-8 flex justify-end">
            <div className="rounded-[48px_48px_0px_48px] bg-[#A5522A] px-6 py-3 text-[16px] text-white animate-[messageSend_0.35s_ease_forwards]">
              {active}
            </div>
          </div>

          {showThinking && (
            <div className="rounded-[0px_48px_48px_48px] bg-white p-5 animate-[fadeUp_0.25s_ease_forwards] sm:p-8">
              <div className="flex items-center gap-2 text-[12px] text-[#8A817B]">
                <span className="h-2 w-2 rounded-full bg-[#A5522A] animate-pulse" />
                thinking
              </div>
            </div>
          )}

          {showResponse && (
            <>
              <div className="rounded-[0px_48px_48px_48px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards] sm:p-8">
                <Typewriter
                  text={CONTENT?.[active] || ""}
                  shouldStart={showResponse}
                  onDone={() => {
                    if (active === "Show data-driven design") {
                      setShowDataDrivenRest(true);
                    }
                    setShowPills(true);
                    setShowExamplesFollowUp(
                      active !== "Tell me your story" && Boolean(PROJECT_FOR_PILL?.[active])
                    );
                  }}
                />
              </div>

              {active === "Show data-driven design" && showDataDrivenRest && (
                <>
                  <div className="mt-5 rounded-[0px_48px_48px_48px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards] sm:p-8">
                    <SegmentationDiagram />
                  </div>

                  <div className="mt-5 rounded-[0px_48px_48px_48px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards] sm:p-8">
                    <p className="whitespace-pre-line text-[14px] leading-[1.65] text-[#221B16]">
                      {DATA_DRIVEN_REST}
                    </p>
                  </div>
                </>
              )}

              {showExamplesFollowUp && (
                <div className="px-2 pt-4 animate-[fadeUp_0.35s_ease_forwards]">
                  <button
                    onClick={openProjectForActivePill}
                    className="inline-flex text-[14px] font-medium text-[#8A817B] underline underline-offset-4 transition-colors hover:text-[#A5522A]"
                  >
                    show me examples of this work →
                  </button>
                </div>
              )}
            </>
          )}

          {showPills && (
            <div className="mt-8 flex flex-wrap gap-3 animate-[fadeUp_0.45s_ease_forwards]">
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
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
