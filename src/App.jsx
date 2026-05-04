import React, { useEffect, useRef, useState } from "react";

const CONTENT = {
  "Show data-driven design": `I led the redesign of chase.com’s home lending experience. It started with a funnel visualization I built. It showed leadership something simple but important:

We were missing a huge part of the market

That one artifact secured $10k+ in investment.

Then analyzing exit surveys, heat maps and extensive A/B testing we defined a design strategy with need-based segmentation

One Constraint:
We were working within an older design system but we still pushed for a more modern foundation that led to a redesigned rates page improved calculators built for real user needs.

That work made it onto the roadmap
And is live today`,
  "Tell me your story": `Here’s how it happened:

I joined Paycom as an Associate Product Designer and threw myself into the work completely. Not just doing my job, I became one of the founding members of a brand new subteam, helping build something from scratch while most people were still finding their footing.

Then out of nowhere, JPMC reached out. Turns out I had helped someone with a presentation at a conference I organized back in college, and that stuck with them. When they had an opening, they remembered.

I applied. I got the role. And they brought me in as a Senior Product Designer, a real bump, because of how I presented myself and my work.

From there, I moved fast. Required little to no guidance. Owned AI initiatives, set the foundation for the marketing design team, and built things that still run today. I learn by doing, and I do a lot.`,
  "How I think about AI systems": `i’ve shipped ai across multiple surfaces at jpmc

1. personalization model (home lending tiles)
- dynamically adapts content based on user signals
- resulted in a 17% ctr lift

2. casey ai
- ai calling agent built with bland ai
- handled 1000+ customer conversations
- answered mortgage questions and qualified leads

3. ai search integrations
- chatgpt + gemini surfaces for chase
- used by executive leadership to present future direction

for me, ai isn’t a feature

it’s about:
making systems more responsive
and reducing friction before humans step in`,
  "Design systems under constraints": `at jpmc,
i built a standardized atomic design template

it:
- reduced marketing velocity by 3 sprints
- required zero additional design or dev lift
- scaled across multiple use cases

at paycom,
i went beyond my project scope

i audited the entire component library and found:
- inconsistent spacing
- fragmented interaction states
- 40+ variants that could be simplified to 3

i proposed a full system redesign:
- 8pt spacing tokens
- shared state patterns
- prop-based components

that’s where i learned:
design systems aren’t just about consistency

they’re about making teams move faster`,
  "Product strategy thinking": `my biggest strength is framing the problem early

before anything gets designed,
i define what we’re actually solving

at jpmc,
i ran 3-day workshops with leadership

we’d go from:
“we need a redesign”

to:
- here’s the real problem
- here’s the data
- here’s the roadmap

i’ve used this approach across:
- ai personalization
- the apply flow
- public home lending

everything tied back to:
clear direction + measurable outcomes

i don’t just design solutions

i shape what gets built in the first place`,
  "How I get exec buy-in": `i design for the room, not just the screen

at jpmc,
we built chatgpt + gemini prototypes in under a week

the output wasn’t just a feature
it was a story

an executive leader used that work
to present to senior leadership

i also build market visualizations

one of them:
helped secure $10k+ in investment
for the home lending public redesign

when i present, i focus on:
- what the opportunity is
- why it matters
- what decision needs to be made

because good design doesn’t land
unless people understand it`
};

const TESTIMONIALS = [
  {
    quote:
      "Sanjana is the best designer at Chase that I've worked with. She is proactive, thoughtful, eager to learn and produces ideas and designs at both a high quality and high volume - which is rare! She has very high potential at Chase over a long runway. I am very thankful she is part of the CMH Marketing Quad; she makes it much stronger.",
    name: "Bart Piela",
    title: "Marketing/Public Executive Director"
  },
  {
    quote:
      "I just wanted to take a moment to recognize the incredible impact you’ve had on the Public Transformation Home landing experience. Your leadership, drive, and unwavering commitment have been nothing short of inspiring. You’ve been the champion behind so much of our progress rallying the team, pushing for excellence, and making sure we never lose sight of the bigger picture. Your work is making a real difference, and I’m deeply grateful for everything you bring to the table. Thank you for being such a force of positivity and progress. We’re lucky to have you!",
    name: "Williams Cavalcante",
    title: "CMH Design Lead"
  },
  {
    quote:
      "A very special call out and thank you to Sanjana for being such an amazing partner and consistently going above and beyond when it comes to projects we are working on. Sanjana has been instrumental in the Encompass build UX, providing solutions and quickly adjusting to our changing needs.",
    name: "Sonia Zacheo",
    title: "CMH Product VP"
  },
  {
    quote:
      "Sanjana! I wanted to send a special thanks for all your hard work, patience and collaboration this year! You jumped into the Apply world with both feet and I've loved exploring ways to improve our customers' experience. You approach every challenge or change in direction with a smile and you're open to everyone's feedback. Thank you for always being there and for being a wonderful teammate.",
    name: "Andrew Kennerley",
    title: "Content VP"
  },
  {
    quote:
      "Hello Sanjana, Samuel - This is to appreciate your efforts in running unmoderated customer research towards the discovery item for our AOA Home Lending flow. Amazing work, great insights and nicely presented. Hope to continue the wonderful partnership to deliver quality experience with customer focus in mind. Keep up the good work.",
    name: "Saurabh Shreedhar",
    title: "AOA Product VP"
  }
];

const WORK_ITEMS = [
  {
    title: "AI first interfaces",
    description: "ChatGPT and Gemini integration exploring the future of Chase",
    image: "/work-ai-first.jpg"
  },
  {
    title: "Personalized marketing tiles",
    description: "AI and Marketing Lead driving data, engineering and product teams",
    image: "/work-marketing-tiles.jpg"
  },
  {
    title: "Chase HL Public",
    description: "First team to create a public design system",
    image: "/work-chase-public.jpg"
  },
  {
    title: "Home lending apply flow",
    description: "Application flow work that improved lead submit rate by 5.5%",
    image: "/work-apply-flow.jpg"
  },
  {
    title: "Casey AI assistant",
    description: "AI calling agent that handled 1000+ customer conversations",
    image: "/work-casey-ai.jpg"
  },
  {
    title: "Design systems foundation",
    description: "Atomic templates that reduced marketing velocity by 3 sprints",
    image: "/work-design-system.jpg"
  }
];

const WORK_RESPONSES = {
  "Problem framing": {
    prompt: "Tell me about your product strategy approach.",
    answer:
      "My product strategy approach is built on three foundational pillars designed to bridge the gap between user empathy and business viability:",
    cards: [
      ["◎", "Problem Precision", "I prioritize identifying the real problem before jumping into pixels, ensuring every feature serves a verified user need."],
      ["ϟ", "Iterative Velocity", "Speed-to-learning is critical. I use rapid prototyping to fail fast and evolve concepts through continuous feedback."],
      ["⌘", "Ecosystem Thinking", "No product exists in a vacuum. I map how features interact with the wider technical and social environment."]
    ]
  },
  "Explain your process": {
    prompt: "Explain your process.",
    answer:
      "I start by making ambiguity visible. Then I turn messy inputs into a clear decision path: research signal, business goal, prototype, test, align, ship.",
    cards: [
      ["1", "Clarify", "Define the actual problem and the decision the team needs to make."],
      ["2", "Prototype", "Make the idea tangible fast enough for stakeholders and users to react."],
      ["3", "Ship + learn", "Use launch data and research to keep improving after release."]
    ]
  },
  "User research": {
    prompt: "How do you use user research?",
    answer:
      "I use research to uncover why people hesitate, not just where they drop. That helped us realize users were not failing the application flow, they were not ready to apply yet.",
    cards: [
      ["?", "Behavior", "Look for hesitation, confidence gaps, and readiness signals."],
      ["⌕", "Evidence", "Pair qualitative research with funnel data, heat maps, and exit surveys."],
      ["→", "Decision", "Translate findings into product direction and roadmap choices."]
    ]
  },
  "Stakeholder management": {
    prompt: "How do you manage stakeholders?",
    answer:
      "I design for the room, not just the screen. I make complex work easy to understand so leadership can see the opportunity and teams can move together.",
    cards: [
      ["→", "Narrative", "Create a story that connects user need to business impact."],
      ["◐", "Alignment", "Bring product, data, engineering, experimentation, and leadership into one shared direction."],
      ["✓", "Decision", "End with what needs to be decided, not just what was designed."]
    ]
  },
  "Impact": {
    prompt: "Show me the impact.",
    answer:
      "My work has connected design quality to measurable outcomes across conversion, experimentation, AI engagement, and operational speed.",
    cards: [
      ["33%", "Conversion lift", "Need-based public site redesign for Home Lending."],
      ["17%", "CTR lift", "AI personalization model for Home Lending tiles."],
      ["1000+", "Conversations", "AI calling agent that answered mortgage questions and qualified leads."]
    ]
  },
  "Business goals/KPIs": {
    prompt: "How do you balance business goals and KPIs?",
    answer:
      "I tie design decisions to the metric that matters, but I do not let the metric erase the user. The best work balances confidence, clarity, and business movement.",
    cards: [
      ["$10K+", "Funding", "Additional marketing investment unlocked through market visualization."],
      ["5.5%", "Lead submit", "Application flow improvements grounded in customer confidence."],
      ["3", "Sprints saved", "Atomic design templates reduced repeated design and engineering lift."]
    ]
  }
};

const NAV_ITEMS = ["my work", "what i'm good at", "resume", "contact"];
const PILLS = [
  "Show data-driven design",
  "Tell me your story",
  "How I think about AI systems",
  "Design systems under constraints",
  "Product strategy thinking",
  "How I get exec buy-in"
];
const WORK_PILLS = Object.keys(WORK_RESPONSES);

function Typewriter({ text, shouldStart, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [typedText, setTypedText] = useState(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!shouldStart) return;

    // Prevent hover/re-render from restarting the typing animation.
    if (typedText === text) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let typingInterval;

    const startDelay = setTimeout(() => {
      let index = 0;
      typingInterval = setInterval(() => {
        setDisplayed(text.slice(0, index + 1));
        index += 1;
        if (index >= text.length) {
          clearInterval(typingInterval);
          setTypedText(text);
          setDisplayed(text);
          setTimeout(() => onDoneRef.current?.(), 250);
        }
      }, 6);
    }, 550);

    return () => {
      clearTimeout(startDelay);
      clearInterval(typingInterval);
    };
  }, [text, shouldStart, typedText]);

  return (
    <p className="whitespace-pre-line text-[14px] leading-[1.65] text-[#221B16]">
      {displayed}
      {typedText !== text && <span className="animate-pulse text-[#A5522A]">|</span>}
    </p>
  );
}

function SegmentationDiagram() {
  return (
    <div className="mt-8">
      <img src="/Frame 1618872809.png" alt="Audience segmentation framework" className="w-full rounded-[20px] object-contain" />
    </div>
  );
}

function WorkCard({ item }) {
  return (
    <article className="group cursor-pointer">
      <div className="overflow-hidden rounded-[32px] bg-[#3B3735] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
        <img
          src={item.image}
          alt={item.title}
          className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>
      <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.03em] text-[#221B16]">{item.title}</h3>
      <p className="mt-2 max-w-[330px] text-[16px] leading-[1.55] text-[#6B625C]">{item.description}</p>
    </article>
  );
}

const CASE_STUDY_SECTIONS = [
  ["DATA DISCOVERY", "data-discovery"],
  ["DEFINE", "define"],
  ["SOLUTION", "solution"],
  ["IMPACT", "impact"],
  ["OPTIMIZE", "optimize"]
];

const scrollToCaseStudySection = (sectionId) => {
  const section = document.getElementById(sectionId);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
};

function ChasePublicCaseStudy() {
  return (
    <article className="space-y-12 px-2 pb-4">
      <section className="rounded-[32px] border border-[#E4E2E1] bg-white p-12 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">Lead designer • Jan 2025 — Sept 2025</p>
            <h1 className="mt-5 text-[48px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#221B16]">JPMC Home Lending<br />Public Experience</h1>
            <p className="mt-5 max-w-[460px] text-[18px] leading-[1.55] text-[#6B625C]">Driving a 38% boost in conversions with need-based segmentation.</p>
            <a href="https://www.chase.com/personal/mortgage" target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full bg-[#9C3F14] px-6 py-3 text-[14px] text-white transition hover:scale-[1.03]">See it live →</a>
          </div>
          <div className="overflow-hidden rounded-[32px] bg-[#F5F3F2] shadow-sm">
            <img src="/work-chase-public-hero.jpg" alt="JPMC Home Lending public redesign" className="h-[420px] w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
          </div>
        </div>
      </section>

      <section id="data-discovery" style={{ scrollMarginTop: "24px" }} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[32px] border border-[#E4E2E1] bg-white p-8 shadow-sm">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">Data discovery</p>
          <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">High traffic — low conversion</h2>
          <p className="mt-5 text-[16px] leading-[1.65] text-[#6B625C]">Raw data showed conversion rates across touch points. The story was clear: people were visiting but not converting. I created a simple visualization to show the market we were missing, helping leadership understand the bottleneck and securing $10K+ in investment for the redesign.</p>
        </div>
        <div className="overflow-hidden rounded-[32px] border border-[#E4E2E1] bg-[#F5F3F2] shadow-sm">
          <img src="/chase-public-data-discovery.jpg" alt="High traffic low conversion visualization" className="h-[360px] w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ["KYC Flow", "Start online took customers through account creation with sensitive questions like SSN before they were ready."],
          ["Outdated design", "800+ public pages, lack of branding, and 20+ CTAs created unclear pathways."],
          ["Clicks", "Top clicks were miscellaneous actions. Rates, the most desired content, was buried several scrolls down."]
        ].map(([title, body]) => (
          <article key={title} className="rounded-[28px] border border-[#E4E2E1] bg-white p-7 shadow-sm">
            <h3 className="text-[18px] font-semibold text-[#221B16]">{title}</h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-[#6B625C]">{body}</p>
          </article>
        ))}
      </section>

      <section id="define" style={{ scrollMarginTop: "24px" }} className="rounded-[32px] border border-[#E4E2E1] bg-white p-10 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">Define</p>
            <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">3-day design workshop</h2>
            <p className="mt-5 text-[16px] leading-[1.65] text-[#6B625C]">The design team led a workshop to step outside tech constraints, define a clear vision for stakeholders, create concepts, and plan the roadmap. Research revealed habits and anxieties around credit, education before decision, and the need to see value before commitment.</p>
          </div>
          <img src="/chase-public-workshop.jpg" alt="Design workshop artifacts" className="h-[320px] w-full rounded-[28px] object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ["Scenario mapping", "We mapped the full public Home Lending journey by customer readiness instead of treating every visitor as ready to apply. This helped separate three very different scenarios: people casually exploring whether home ownership was possible, shoppers comparing rates and affordability, and customers ready to start an application. That shift gave the team a clearer roadmap for what each page needed to do."],
          ["Habits and anxieties", "Research showed that customers were cautious before commitment. They wanted to understand credit impact, monthly affordability, loan options, and what Chase already knew about them before giving sensitive information. The biggest anxiety was not the application itself. It was moving too fast without enough confidence, context, or education."],
          ["Design values", "We translated those insights into design values for the redesign: earn trust before asking for action, make value visible earlier, reduce pressure to apply, and give each customer a clear next best step. These principles guided the new page hierarchy, CTA strategy, calculator placement, and content model."]
        ].map(([title, body]) => (
          <article key={title} className="rounded-[28px] border border-[#E4E2E1] bg-white p-7 shadow-sm">
            <h3 className="text-[18px] font-semibold text-[#221B16]">{title}</h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-[#6B625C]">{body}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-[0.9fr_0.65fr_1.2fr]">
        {[
          "I notice the apply button but I would definitely be spending more time in the learn before deciding to understand everything first",
          "Just to understand the steps before I commit to clicking on the apply to buy button",
          "I don't feel ready because I would want to consider my husband's finances as part of the loan and we're still working over the next couple of months to get his credit to a better place"
        ].map((quote) => (
          <article key={quote} className="rounded-[28px] bg-[#EFEFEF] p-8 shadow-sm">
            <div className="text-[64px] leading-none text-black">“</div>
            <p className="mt-4 text-[18px] leading-[1.55] text-[#221B16]">“{quote}”</p>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border border-[#E4E2E1] bg-white p-10 shadow-sm">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">Need-based segmentation</p>
        <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">Earn trust, establish trust, keep trust</h2>
        <p className="mt-5 max-w-[760px] text-[16px] leading-[1.65] text-[#6B625C]">Customer research led us to three segments based on needs and trust: early explorers, rate shoppers, and customers ready to apply.</p>
        <div className="mt-8">
          <img src="/Frame 1618872809.png" alt="Need-based segmentation framework" className="w-full rounded-[24px] object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
        </div>
      </section>

      <section id="solution" style={{ scrollMarginTop: "24px" }} className="grid gap-8 lg:grid-cols-3">
        {[
          ["Ready to apply", "Customers who were ready needed clear apply pathways, value propositions, discounts, and benefits that reinforced trust."],
          ["Rates as decision point", "Rates moved from four scrolls below into the first scroll, paired with value and personalized context."],
          ["Shopping + exploring", "We reduced CTA overload, highlighted calculators, surfaced guide content, and removed pressure to apply before customers were ready."]
        ].map(([title, body]) => (
          <article key={title} className="rounded-[32px] border border-[#E4E2E1] bg-white p-8 shadow-sm">
            <h3 className="text-[22px] font-semibold tracking-[-0.03em] text-[#221B16]">{title}</h3>
            <p className="mt-4 text-[15px] leading-[1.65] text-[#6B625C]">{body}</p>
          </article>
        ))}
      </section>

      <section id="impact" style={{ scrollMarginTop: "24px" }} className="rounded-[32px] border border-[#E4E2E1] bg-white p-10 shadow-sm">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">Impact</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["38%", "Increase in lead initiate for variant compared to control"],
            ["30.9%", "Increase in lead submit conversion in variant compared to control"],
            ["$10K+", "Additional investment secured for Home Lending public redesign"]
          ].map(([metric, body]) => (
            <article key={metric} className="rounded-[28px] bg-[#F5F3F2] p-7">
              <p className="text-[42px] font-semibold tracking-[-0.05em] text-[#9C3F14]">{metric}</p>
              <p className="mt-3 text-[14px] leading-[1.55] text-[#6B625C]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="optimize" style={{ scrollMarginTop: "24px" }} className="rounded-[32px] border border-[#E4E2E1] bg-white p-10 shadow-sm">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">Optimize</p>
        <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">Data-based enhancements</h2>
        <p className="mt-5 text-[16px] leading-[1.65] text-[#6B625C]">We continued improving after launch: ECI cookie optimization for sign-in, a unified calculator to replace an outdated iFrame, a public design system in the new tech stack, multivariate testing for L2 navigation, old-page decommissioning, and improved strategy for paid search, paid media, and aggregators.</p>
      </section>
    </article>
  );
}

function WorkWindow({ isOpen, onClose, initialView = "browse" }) {
  const [selectedPill, setSelectedPill] = useState(null);
  const [view, setView] = useState(initialView);
  const response = selectedPill ? WORK_RESPONSES[selectedPill] : null;

  useEffect(() => {
    if (!isOpen) {
      setSelectedPill(null);
      setView(initialView);
    } else {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-10 py-12 animate-[modalIn_0.35s_ease_forwards]">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 flex items-center gap-4">
          {/* back arrow instead of close */}
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[20px] text-[#6B625C] transition hover:text-[#A5522A]"
          >
            ‹
          </button>

          <h2 className="text-[40px] font-semibold tracking-[-0.04em] text-[#9C3F14]">
            {view === "caseStudy" ? "Chase HL Public" : selectedPill ? "your work" : "Browse my work"}
          </h2>
        </div>

        {view === "caseStudy" ? (
          <>
            <div className="mt-2 mb-6 max-w-[980px] rounded-full border border-[#E4E2E1] bg-white p-4">
              <div className="flex flex-wrap gap-3">
                {CASE_STUDY_SECTIONS.map(([label, sectionId]) => (
                  <button
                    key={sectionId}
                    onClick={() => scrollToCaseStudySection(sectionId)}
                    className="rounded-full border border-[#E4E2E1] bg-white px-5 py-2 text-[12px] font-medium text-[#6B625C] transition-all duration-200 hover:scale-[1.04] hover:border-[#9C3F14] hover:text-[#9C3F14]"
                  >
                    {label.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="mx-auto max-w-[980px]">
              <div className="max-h-[68vh] overflow-y-auto rounded-[28px] border border-[#EEE8E5] bg-white p-6 pr-2 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <ChasePublicCaseStudy />
              </div>
            </div>
          </>
        ) : selectedPill ? (
          <section className="mb-12 rounded-[32px] border border-[#E4E2E1] bg-white p-14 shadow-sm">
            <div className="mb-8 flex justify-end">
              <div className="rounded-[48px_48px_0px_48px] bg-[#9C3F14] px-6 py-4 text-[16px] text-white shadow-sm">
                {response.prompt}
              </div>
            </div>

            <div className="max-w-[820px] rounded-[0px_48px_48px_48px] bg-[#F5F3F2] p-8 shadow-sm">
              <p className="text-[16px] leading-[1.65] text-[#221B16]">{response.answer}</p>
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
                {response.cards.map(([icon, title, body]) => (
                  <article key={title} className="rounded-[28px] border border-[#E4E2E1] bg-white/70 p-6">
                    <div className="mb-5 text-[24px] text-[#9C3F14]">{icon}</div>
                    <h3 className="text-[16px] font-semibold text-[#221B16]">{title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.55] text-[#6B625C]">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {WORK_ITEMS.map((item) => (
              <WorkCard key={item.title} item={item} />
            ))}
          </div>
        )}

        {selectedPill && view !== "caseStudy" && (
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {WORK_ITEMS.slice(0, 3).map((item) => (
              <WorkCard key={item.title} item={item} />
            ))}
          </div>
        )}

        {/* chips section with subtitle (no chat input) */}
        {view !== "caseStudy" && (
          <div className="mt-10">
            <p className="mb-4 text-[16px] font-semibold text-[#6B625C]">OR ASK ABOUT IT</p>
            <div className="flex flex-wrap gap-3">
              {WORK_PILLS.map((pill) => (
                <button
                  key={pill}
                  onClick={() => {
                    setView("ask");
                    setSelectedPill(pill);
                  }}
                  className={`rounded-full border px-5 py-2 text-[12px] font-medium transition-all duration-200 hover:scale-[1.04] ${selectedPill === pill
                    ? "border-[#9C3F14] bg-white text-[#9C3F14]"
                    : "border-[#E4E2E1] bg-white text-[#6B625C] hover:border-[#D8C5BB]"
                    }`}
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WhatIBelieveCard() {
  return (
    <article className="rounded-[32px] border border-[#E4E2E1] bg-white p-7 text-[14px] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">what i believe in</p>
      <p className="leading-[1.65] text-[#5F5149]">i believe good products don't just solve problems. they reveal ones people didn't know they had.</p>
      <p className="mt-6 leading-[1.65] text-[#5F5149]">with AI and personalization, that gap gets smaller. But the real work is still human: listening, framing, building things that help people move forward.</p>
      <div className="mt-7 flex gap-3">
        <a href="https://www.linkedin.com/in/sanjana-venkat/" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[14px] transition-all hover:scale-105 hover:text-[#A5522A]">in</a>
        <button className="h-10 w-10 rounded-full border border-[#E4E2E1] bg-white text-[14px] transition-all hover:scale-105 hover:text-[#A5522A]">✉</button>
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
    <section className="h-full min-h-[360px] rounded-[32px] border border-[#E4E2E1] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="mb-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">timeline</p>
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="absolute left-0 top-[18px] hidden h-px w-full bg-[#E8D8D0] md:block" />
        {items.map(([year, title, body, isActive]) => (
          <div key={title} className="relative pt-10 transition-opacity duration-300">
            <span className={`absolute left-0 top-[12px] h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2 ${isActive ? "bg-[#D96F45] animate-[timelineGlow_2.2s_ease-in-out_infinite]" : "bg-[#E4E2E1]"}`} />
            <p className={`text-[12px] font-semibold uppercase tracking-[0.14em] ${isActive ? "text-[#D96F45]" : "text-[#9CA3AF]"}`}>{year}</p>
            <p className="mt-2 text-[16px] font-semibold leading-tight text-[#221B16]">{title}</p>
            <p className="mt-2 text-[12px] leading-[1.45] text-[#7A706A]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  return (
    <article className="h-full min-h-[360px] rounded-[32px] border border-[#E4E2E1] bg-white p-8 text-[13px] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">what people say about me</p>
      <div key={index} className="min-h-[235px] animate-[slideIn_0.35s_ease_forwards]">
        <p className="italic leading-[1.55] text-[#4F4741]">“{testimonial.quote}”</p>
        <p className="mt-5 text-[14px] font-semibold text-[#111827]">{testimonial.name}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF]">{testimonial.title}</p>
      </div>
      <div className="mt-5 flex gap-3">
        {TESTIMONIALS.map((_, dotIndex) => (
          <span key={dotIndex} className={`h-3 rounded-full transition-all duration-300 ${index === dotIndex ? "w-10 bg-[#D96F45]" : "w-3 bg-[#EEF0F3]"}`} />
        ))}
      </div>
    </article>
  );
}

export default function PortfolioHome() {
  const chatCardRef = useRef(null);
  const [active, setActive] = useState("Show data-driven design");
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [workInitialView, setWorkInitialView] = useState("browse");
  const [showExamplesFollowUp, setShowExamplesFollowUp] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      setShowThinking(true);
      const timer = setTimeout(() => {
        setShowThinking(false);
        setShowResponse(true);
        setHasLoaded(true);
      }, 1400);
      return () => clearTimeout(timer);
    }

    setShowExamplesFollowUp(false);
    setShowPills(false);
    setShowResponse(false);
    setShowThinking(true);

    const timer = setTimeout(() => {
      setShowThinking(false);
      setShowResponse(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, [active, hasLoaded]);

  const handlePillSelect = (pill) => {
    if (pill === active) return;
    chatCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(pill);
    setShowPills(false);
    setShowExamplesFollowUp(false);
  };

  const handleNav = (item) => {
    if (item === "my work") {
      setWorkInitialView("browse");
      setIsWorkOpen(true);
    }
    if (item === "contact") window.open("https://www.linkedin.com/in/sanjana-venkat/", "_blank");
  };

  return (
    <main onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })} className="relative min-h-screen w-full overflow-x-hidden bg-[#F8F7F6] px-8 py-10 text-[#221B16]">
      <WorkWindow isOpen={isWorkOpen} onClose={() => setIsWorkOpen(false)} initialView={workInitialView} />

      <div className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full bg-orange-200/25 blur-3xl transition-transform duration-150" style={{ left: cursor.x - 150, top: cursor.y - 150 }} />

      <section className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[280px_1fr]">
        <aside className="flex flex-col gap-8 lg:row-span-1">
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
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7B6258]">or start here:</p>
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button key={item} onClick={() => handleNav(item)} className="w-full rounded-full border border-[#E4E2E1] bg-white px-5 py-3 text-left text-[14px] font-medium text-[#221B16] transition-all duration-200 hover:scale-[1.02] hover:border-[#D8C5BB] hover:shadow-sm">
                  {item}
                </button>
              ))}
            </div>
          </nav>

          <div className="overflow-hidden rounded-[32px] border border-[#E4E2E1] bg-white shadow-sm">
            <img src="/profile.jpg" alt="Sanjana Venkat" className="h-[290px] w-full object-cover grayscale transition-all duration-500 hover:scale-[1.035] hover:grayscale-0" />
          </div>

          <WhatIBelieveCard />
        </aside>

        <section ref={chatCardRef} className="rounded-[32px] border border-[#E4E2E1] bg-white p-12 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-8 flex justify-end">
            <div className="rounded-[48px_48px_0px_48px] bg-[#A5522A] px-6 py-3 text-[16px] text-white shadow-sm animate-[messageSend_0.35s_ease_forwards]">
              {active}
            </div>
          </div>

          {showThinking && (
            <div className="rounded-[0px_48px_48px_48px] bg-white p-8 animate-[fadeUp_0.25s_ease_forwards]">
              <div className="flex items-center gap-2 text-[12px] text-[#8A817B]">
                <span className="h-2 w-2 rounded-full bg-[#A5522A] animate-pulse" />
                thinking
              </div>
            </div>
          )}

          {showResponse && (
            <>
              <div className="rounded-[0px_48px_48px_48px] bg-[#F1EFED] p-8 animate-[answerBubbleIn_0.45s_ease_forwards]">
                <Typewriter
                  text={CONTENT[active]}
                  shouldStart={showResponse}
                  onDone={() => {
                    setShowPills(true);
                    setShowExamplesFollowUp(true);
                  }}
                />

                {active === "Show data-driven design" && <SegmentationDiagram />}
              </div>

              {showExamplesFollowUp && (
                <div className="px-2 pt-4 animate-[fadeUp_0.35s_ease_forwards]">
                  <button
                    onClick={() => {
                      setWorkInitialView(active === "How I get exec buy-in" ? "caseStudy" : "browse");
                      setIsWorkOpen(true);
                    }}
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
                  className={`rounded-full border px-5 py-2 text-[12px] transition-all duration-200 hover:scale-[1.04] ${active === pill
                    ? "border-[#A5522A] bg-white text-[#A5522A] shadow-sm"
                    : "border-[#E4E2E1] bg-white text-[#6B625C] hover:border-[#D8C5BB]"
                    }`}
                >
                  {pill}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 gap-8 lg:col-span-2 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
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
        @keyframes timelineGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217,111,69,0); }
          50% { box-shadow: 0 0 0 10px rgba(217,111,69,0.18); }
        }
      `}</style>
    </main>
  );
}