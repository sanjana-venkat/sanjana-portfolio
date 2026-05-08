import React, { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "./data/portfolioData";

const FIGMA_DECK_URL =
  "https://embed.figma.com/deck/rrAhQ5fBTULZu49L04zUZ8/jpmcpublic-slides?node-id=2-17943&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share";

const AI_FRAMER_URL =
  "https://sanjanavenkat.framer.website/works/aifirstinterfaces-2";

const USER_NEEDS_FRAMER_URL =
  "https://sanjanavenkat.framer.website/works/chase-hl-public-2";

const PRODUCT_STRATEGY_URL = "https://www.sanjanavenkat.com/#define";

const JAKARTA =
  "[font-family:'Plus_Jakarta_Sans',ui-sans-serif,system-ui,sans-serif]";

const TYPEWRITE =
  "[font-family:'Courier_Prime','American_Typewriter','Courier_New',monospace]";


const PILLS = [
  "how i uncover user needs",
  "let's talk AI",
  "product strategy thinking",
  "how i ship fast",
  "tell me your story",
  "how i get exec-buy in"
];

const CONTENT = {
  "how i uncover user needs": `I look beyond surface-level metrics to understand the intent behind user behavior.

At JPMC, we were a small team trying to reduce drop-offs in an application flow. But we went deep into the data and I made a funnel visualization that revealed something simple but important:

We were missing a huge part of the market.

We needed to shift toward awareness and marketing with an upper-funnel engagement strategy.

I presented this to leadership and that one artifact:
• Secured $10K+ in investment
• Got the 3rd highest Home Lending business case
• Aligned leadership around the redesign

Then through exit surveys, heat maps, and extensive A/B testing, we defined a design strategy with need-based segmentation.

The first outcome was not perfectly clean. Overall lead submit decreased and navigation outside Home Lending was discouraging.

So I went deep into the data again. Being a designer did not stop me from doing data analysis, and I found the breakthrough:

38% increase in lead initiation with clear Apply messaging.

Clear messaging created clearer user intent, and users were completing the goal.

Something was working. Product realized what design had been advocating for: one page does not change the full experience.

In a few sprints, we moved forward. One constraint was the design system, but we still got that onto the roadmap.

Today, the full experience is live and evolving with AI.`,

  "let's talk AI": `I believe good design is about getting closer to human intent.

And with AI, that gap gets smaller.

The better we understand intent, the better we can build systems that adapt dynamically to what people actually need in the moment.

What excites me most is conversational AI.

Because voice captures:
• Uncertainty
• Evolving thoughts
• Emotional context

In a way static interfaces and typing cannot.

The next thing for AI in interfaces is personalization and conversation. That is where I capitalized on my team leading initiatives at JPMC and shipping across multiple surfaces:

• A personalization model that drove a 17% CTR lift
• An AI calling agent that handled 1,000+ customer conversations
• ChatGPT + Gemini prototypes used by executive leadership to communicate future product direction to CEO Jamie Dimon

I also see AI as a thinking partner within my own workflow. It helps me rapidly build ideas and explore a wider range of directions.

But direction, prioritization, and clarity still come from my judgment and my skill in turning ambiguity into direction.`,

  "product strategy thinking": `My biggest strength is framing the problem early.

Before anything gets designed, I define:
• What we are actually solving
• Why it matters
• Where the opportunity exists

At JPMC, I led 3-day workshops with leadership.

We would go from:
“We need a redesign”

to:
• Here is the real problem
• Here is the data
• Here is the roadmap

I have used this approach across:
• AI personalization
• The apply flow
• Public home lending

Everything tied back to clear direction and measurable outcomes that we all aligned on.`,

  "how i ship fast": `I move quickly by combining systems thinking, rapid prototyping, and close engineering collaboration.

Personally, I strongly believe in “launch and learn” so we do not spend too much time iterating before real behavior teaches us something. It is harder to achieve in bigger companies like JPMC, but here are a few times I did it.

Within two days, I analyzed edge cases for over 20 offers and built a plug-and-play offer template using atomic design principles.

In close collaboration with engineering, we quickly launched it.

The result:
• Zero additional design/dev lift for an offer page
• Accelerated marketing velocity by 3 sprints
• Scaled across multiple use cases

I also rapidly prototype with AI tools like Codex, Google AI Studio, and Claude, while brainstorming ideas with Google Stitch.

This portfolio itself was an idea I concepted, designed, and built in 2 days to envision a pre-interview experience so you can see how I think beyond lengthy case studies.

Even before AI tools, I was known for creating a business case, product idea, design, and prototype in 24 hours during hackathons, often as the only designer on the team.`,

  "tell me your story": `Here’s how it happened.

I joined Paycom as an Associate Product Designer and threw myself into the work completely.

Not just doing my job, I became one of the founding members of a brand new subteam, helping build something from scratch while most people were still finding their footing.

Then out of nowhere, JPMC reached out.

Turns out I had helped someone with a presentation at a conference I organized back in college, and that stuck with them. When they had an opening, they remembered.

I applied. I got the role. And they brought me in as a Senior Product Designer, a real bump, because of how I presented myself and my work.

From there, I moved fast. Required little to no guidance. Owned AI initiatives, set the foundation for the marketing design team, and built things that still run today.

I learn by doing, and I do a lot.`,

  "how i get exec-buy in": `I approach presentations with the same empathy I bring to design.

Instead of trying to convince stakeholders, I start from where they are and guide them toward a shared vision.

At JPMC, we built ChatGPT + Gemini prototypes in under a week.

The output was not just a feature.

It was a story.

An executive leader used that work to present to senior leadership.

When I present, I focus on:
• What the opportunity is
• Why it matters
• What decision needs to be made

Because I learned that good design does not land unless people understand it.`
};

const PROJECT_FOR_PILL = {};
const DATA_DRIVEN_REST = "";


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
    <p
      className={`whitespace-pre-line text-[14px] leading-[1.8] text-[#221B16] ${TYPEWRITE}`}
    >
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


function UserNeedsModal({ onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${JAKARTA}`}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[20px] text-[#6B625C] transition hover:text-[#A5522A]"
          >
            ‹
          </button>

          <h2 className="min-w-0 text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px]">
            How I Uncover User Needs
          </h2>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white">
          <iframe
            src={USER_NEEDS_FRAMER_URL}
            title="Chase Home Lending public case study"
            className="h-[82vh] w-full rounded-[24px] border-0 bg-white"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function FigmaDeckModal({ onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${JAKARTA}`}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[20px] text-[#6B625C] transition hover:text-[#A5522A]"
          >
            ‹
          </button>

          <h2 className="min-w-0 text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px]">
            Chase HL Public
          </h2>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white">
          <iframe
            src={FIGMA_DECK_URL}
            title="JPMC Public case study deck"
            className="h-[76vh] w-full rounded-[24px] border-0 bg-white"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function AIFramerModal({ onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${JAKARTA}`}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[20px] text-[#6B625C] transition hover:text-[#A5522A]"
          >
            ‹
          </button>

          <h2 className="min-w-0 text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px]">
            AI First Interfaces
          </h2>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white">
          <iframe
            src={AI_FRAMER_URL}
            title="AI First Interfaces case study"
            className="h-[82vh] w-full rounded-[24px] border-0 bg-white"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}


function MarketingTilesModal({ onClose }) {
  const baseUrl =
    "https://sanjanavenkat.framer.website/works/marketing-tiles-2";

  const sections = [
    { label: "define", url: `${baseUrl}#define` },
    { label: "workshop", url: `${baseUrl}#workshop` },
    { label: "assumptions", url: `${baseUrl}#assumptions` },
    { label: "strategy", url: `${baseUrl}#strategy` },
    { label: "implementation", url: `${baseUrl}#implementation` }
  ];

  const [activeUrl, setActiveUrl] = useState(sections[0].url);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${JAKARTA}`}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[20px] text-[#6B625C] transition hover:text-[#A5522A]"
          >
            ‹
          </button>

          <h2 className="text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px]">
            Data-driven Design
          </h2>
        </div>

        <div className="mb-6 rounded-[28px] border border-[#E4E2E1] bg-white p-3 sm:rounded-full sm:p-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0">
            {sections.map((section) => (
              <button
                key={section.label}
                onClick={() => setActiveUrl(section.url)}
                className={`shrink-0 rounded-full border px-5 py-2 text-[12px] font-medium transition ${
                  activeUrl === section.url
                    ? "border-[#9C3F14] bg-[#FFF8F5] text-[#9C3F14]"
                    : "border-[#E4E2E1] bg-white text-[#6B625C] hover:border-[#9C3F14] hover:text-[#9C3F14]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[36px] bg-white">
          <iframe
            key={activeUrl}
            src={activeUrl}
            title="Marketing Tiles case study"
            className="h-[82vh] w-full border-0 bg-white"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function ChasePublicModal({ onClose }) {
  const sections = ["data discovery", "define", "solution", "impact", "optimize"];

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards] ${JAKARTA}`}
    >
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
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0">
            {sections.map((section) => (
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

        <article className="no-scrollbar max-h-[74vh] space-y-8 overflow-y-auto rounded-[28px] bg-white p-4 sm:rounded-[36px] sm:p-8">
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
            <img
              src={image}
              alt={title}
              className="w-full rounded-[24px] object-contain"
            />
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] text-[13px] font-semibold text-[#6B625C] transition hover:border-[#A5522A] hover:text-[#A5522A]"
        >
          in
        </a>
      </div>
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

      <div
        key={index}
        className="min-h-[235px] animate-[slideIn_0.35s_ease_forwards]"
      >
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
    if (active === "how i uncover user needs") {
      setProjectOpen("user-needs");
      return;
    }

    if (active === "let's talk AI") {
      setProjectOpen("ai-framer");
      return;
    }

    if (active === "product strategy thinking") {
      window.open(PRODUCT_STRATEGY_URL, "_blank");
      return;
    }

    if (active === "how i get exec-buy in") {
      setProjectOpen("figma-deck");
      return;
    }
  };

  const ctaText = (() => {
    if (active === "how i get exec-buy in") return "walk me through the project →";
    if (active === "let's talk AI") return "show me how →";
    if (active === "product strategy thinking") return "show me the strategy →";
    if (active === "how i uncover user needs") return "show me the work →";
    return "show me examples of this work →";
  })();

  return (
    <main
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className={`relative min-h-screen w-full overflow-x-hidden bg-[#F8F7F6] px-4 py-6 text-[#221B16] sm:px-8 sm:py-10 ${JAKARTA}`}
    >
      {projectOpen === "user-needs" && (
        <UserNeedsModal onClose={() => setProjectOpen(null)} />
      )}

      {projectOpen === "figma-deck" && (
        <FigmaDeckModal onClose={() => setProjectOpen(null)} />
      )}

      {projectOpen === "ai-framer" && (
        <AIFramerModal onClose={() => setProjectOpen(null)} />
      )}

      {projectOpen === "marketing-tiles" && (
        <MarketingTilesModal onClose={() => setProjectOpen(null)} />
      )}

      {projectOpen === "chase-hl-public" && (
        <ChasePublicModal onClose={() => setProjectOpen(null)} />
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
            <div
              className={`rounded-[48px_48px_0px_48px] bg-[#A5522A] px-6 py-3 text-[14px] leading-[1.8] text-white animate-[messageSend_0.35s_ease_forwards] ${TYPEWRITE}`}
            >
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
                      active === "how i uncover user needs" ||
                        active === "let's talk AI" ||
                        active === "product strategy thinking" ||
                        active === "how i get exec-buy in"
                    );
                  }}
                />

                {active === "Show data-driven design" && showDataDrivenRest && (
                  <SegmentationDiagram />
                )}
              </div>

              {active === "Show data-driven design" && showDataDrivenRest && (
                <div className="mt-5 rounded-[0px_36px_36px_36px] bg-[#F1EFED] p-5 animate-[answerBubbleIn_0.45s_ease_forwards] sm:p-6">
                  <p
                    className={`whitespace-pre-line break-words text-[14px] leading-[1.8] text-[#221B16] ${TYPEWRITE}`}
                  >
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
                    {ctaText}
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Courier+Prime:wght@400;700&display=swap');

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
