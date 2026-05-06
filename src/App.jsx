import "@fontsource/special-elite"; 
import React, { useEffect, useState, useRef } from "react";
import {
  CONTENT,
  DATA_DRIVEN_REST,
  PILLS,
  PROJECT_FOR_PILL,
  PROJECTS,
  TESTIMONIALS
} from "./data/portfolioData";

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
      }, 18);
    }, 450);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [cleanText, shouldStart, typedText]);

  return (
    <p className="whitespace-pre-line text-[15px] leading-[1.8] text-[#221B16] [font-family:'Courier_New',monospace]">
      {displayed}
      {typedText !== cleanText && (
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
      className="mt-8 w-full object-contain"
    />
  );
}

function ProjectModal({ projectKey, onClose }) {
  const project = PROJECTS?.[projectKey] || PROJECTS?.["chase-hl-public"];
  const [activeSection, setActiveSection] = useState(project?.sections?.[0]);
  const [slideIndex, setSlideIndex] = useState(0);

  if (!project) return null;

  const currentSlides = activeSection?.slides || [];

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

          <h2 className="min-w-0 text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px]">
            {project.title || "Chase HL Public"}
          </h2>
        </div>

        <div className="mb-6 rounded-[28px] border border-[#E4E2E1] bg-white p-3 sm:rounded-full sm:p-4">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0">
            {project.sections?.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section);
                  setSlideIndex(0);
                }}
                className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-medium transition sm:px-5 ${
                  activeSection?.id === section.id
                    ? "border-[#9C3F14] bg-[#FFF8F5] text-[#9C3F14]"
                    : "border-[#E4E2E1] bg-white text-[#6B625C] hover:border-[#9C3F14] hover:text-[#9C3F14]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[74vh] overflow-hidden rounded-[28px] bg-white">
          <div className="relative flex h-[70vh] items-center justify-center bg-white">
            {currentSlides.length > 0 ? (
              <img
                key={currentSlides[slideIndex]}
                src={currentSlides[slideIndex]}
                alt={`${activeSection?.label || "case study"} slide ${slideIndex + 1}`}
                className="max-h-full max-w-full object-contain animate-[softSlideFade_0.45s_ease_forwards]"
              />
            ) : (
              <div className="p-8 text-center text-[#6B625C]">
                No slides found for this section.
              </div>
            )}

            {slideIndex > 0 && (
              <button
                onClick={() => setSlideIndex((index) => index - 1)}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E4E2E1] bg-white/95 text-[24px] text-[#6B625C] shadow-sm transition hover:text-[#9C3F14]"
              >
                ‹
              </button>
            )}

            {slideIndex < currentSlides.length - 1 && (
              <button
                onClick={() => setSlideIndex((index) => index + 1)}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E4E2E1] bg-white/95 text-[24px] text-[#6B625C] shadow-sm transition hover:text-[#9C3F14]"
              >
                ›
              </button>
            )}

            <div className="absolute bottom-4 rounded-full border border-[#E4E2E1] bg-white/95 px-4 py-2 text-[12px] text-[#6B625C]">
              {slideIndex + 1} / {currentSlides.length || 1}
            </div>
          </div>
        </div>
      </div>
    </div>
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
    [
      "2023",
      "B.S. Psychology, Design concentration",
      "UT Dallas • Understanding human behavior and design principles to build better experiences.",
      false
    ],
    [
      "2023",
      "Associate Product Designer",
      "Paycom • Founding member of a new subteam. Focused on B2B enterprise solutions and design system.",
      false
    ],
    [
      "2024 — PRESENT",
      "Senior Product Designer",
      "JP Morgan Chase • Leading Marketing and AI initiatives. Building 0-to-1 product and driving impact across the ecosystem.",
      true
    ]
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
    if (!TESTIMONIALS.length) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 5200);

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
      {projectOpen && (
        <ProjectModal
          projectKey={projectOpen}
          onClose={() => setProjectOpen(null)}
        />
      )}

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
          className="rounded-[32px] border border-[#E4E2E1] bg-white p-4 transition-all duration-300 sm:p-6"
        >
          <div className="mb-6 flex justify-end">
            <div className="rounded-[48px_48px_0px_48px] bg-[#A5522A] px-6 py-3 text-[16px] text-white animate-[messageSend_0.35s_ease_forwards]">
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
                    if (active === "Show data-driven design") {
                      setShowDataDrivenRest(true);
                    }

                    setShowPills(true);
                    setShowExamplesFollowUp(
                      active !== "Tell me your story" &&
                        Boolean(PROJECT_FOR_PILL?.[active])
                    );
                  }}
                />

                {active === "Show data-driven design" && showDataDrivenRest && (
                  <SegmentationDiagram />
                )}
              </div>

              {active === "Show data-driven design" && showDataDrivenRest && (
                <div className="mt-5 rounded-[0px_36px_36px_36px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards] sm:p-6">
                  <p className="whitespace-pre-line break-words text-[15px] leading-[1.8] text-[#221B16] sm:text-[16px] [font-family:'Courier_New',monospace]">
                    {DATA_DRIVEN_REST?.trim()}
                  </p>
                </div>
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

        @keyframes softSlideFade {
          from { opacity: 0; transform: scale(0.985); }
          to { opacity: 1; transform: scale(1); }
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
