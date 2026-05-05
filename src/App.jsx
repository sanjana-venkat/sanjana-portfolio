import React, { useEffect, useRef, useState } from "react";

const CONTENT = {
  "Show data-driven design": `I led the redesign of chase.com’s home lending experience. It started with a funnel visualization I built. It showed leadership something simple but important:

We were missing a huge part of the market

That one artifact secured $10k+ in investment.

Then analyzing exit surveys, heat maps and extensive A/B testing we defined a design strategy with need-based segmentation`,
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

const DATA_DRIVEN_REST = `One Constraint:
We were working within an older design system but we still pushed for a more modern foundation that led to a redesigned rates page improved calculators built for real user needs.

That work made it onto the roadmap
And is live today`;

const PILLS = Object.keys(CONTENT);
const NAV_ITEMS = ["my work", "what i'm good at", "resume", "contact"];

const PROJECT_FOR_PILL = {
  "Show data-driven design": "chase-hl-public",
  "How I get exec buy-in": "chase-hl-public",
  "How I think about AI systems": "ai-first-interfaces",
  "Product strategy thinking": "marketing-tiles",
  "Design systems under constraints": "chase-apply"
};

const PROJECTS = {
  "ai-first-interfaces": {
    title: "AI First Interfaces",
    role: "Lead Designer",
    date: "2025",
    eyebrow: "AI strategy • ChatGPT + Gemini • Chase",
    subtitle: "Exploring what the Chase experience could look like when AI becomes the decision layer, not just another feature.",
    hero: "/work-ai-first.jpg",
    live: "https://sanjanavenkat.framer.website/works/aifirstinterfaces",
    sections: [
      {
        id: "data-discovery",
        label: "Data discovery",
        title: "AI as the new front door",
        body: "The exploration started with a question: if customers increasingly use ChatGPT and Gemini to search, compare, and decide, what role should Chase play in that journey? I mapped moments where AI could reduce friction before customers entered a traditional flow.",
        image: "/ai-first-data-discovery.jpg"
      },
      {
        id: "define",
        label: "Define",
        title: "From search to action",
        body: "Instead of designing AI as a chat widget, I explored AI as a translation layer between vague customer intent and clear next steps. The work helped frame new interaction principles for Chase as an AI-powered platform.",
        image: "/ai-first-define.jpg"
      },
      {
        id: "solution",
        label: "Solution",
        title: "Conversational + visual surfaces",
        body: "I prototyped experiences where customers could ask open-ended questions, receive structured mortgage guidance, compare options, and move into the right product action with less cognitive load.",
        image: "/ai-first-solution.jpg"
      },
      {
        id: "impact",
        label: "Impact",
        title: "Executive storytelling",
        body: "The prototypes became a way to show senior leadership what future Chase interactions could feel like, connecting AI exploration to business strategy and customer trust.",
        image: "/ai-first-impact.jpg"
      }
    ],
    metrics: ["ChatGPT + Gemini prototypes", "Executive strategy artifact", "New AI interaction principles"]
  },
  "marketing-tiles": {
    title: "Personalized Marketing Tiles",
    role: "Lead Designer",
    date: "Sept 2025 — Jan 2026",
    eyebrow: "AI recommendation model • Chase dashboard",
    subtitle: "AI recommendation model driven personalized Home Lending tiles on the Chase overview dashboard.",
    hero: "/work-marketing-tiles.jpg",
    live: "https://sanjanavenkat.framer.website/works/marketing-tiles",
    sections: [
      {
        id: "data-discovery",
        label: "Data discovery",
        title: "Generic content was not moving customers",
        body: "The existing Home Lending tile was one-size-fits-all and saw low engagement compared to other dashboard content. The opportunity was to use customer signals to show relevant needs-based messaging, not just generic product promotion.",
        image: "/marketing-tiles-data.jpg"
      },
      {
        id: "define",
        label: "Define",
        title: "A 1-day discovery workshop",
        body: "I worked with product, engineering, data, marketing, and experimentation partners to define desirability, feasibility, and viability. We narrowed the MVP into use cases the model and backend team could support.",
        image: "/marketing-tiles-workshop.jpg"
      },
      {
        id: "solution",
        label: "Solution",
        title: "Needs-based personalization",
        body: "The team shifted from product-based marketing to need-based personalization. Instead of assuming refinance, the model could support goals like buying again, accessing equity, paying off a mortgage sooner, or exploring affordability.",
        image: "/marketing-tiles-solution.jpg"
      },
      {
        id: "impact",
        label: "Impact",
        title: "17% CTR lift",
        body: "The first variant with house imagery increased CTR by 17%. I also helped implement the atomic design template with devs across iOS, Android, and web, reducing repeated design and engineering lift.",
        image: "/marketing-tiles-impact.jpg"
      }
    ],
    metrics: ["17% CTR lift", "6 MVP use cases", "Atomic implementation across surfaces"]
  },
  "chase-apply": {
    title: "Chase Apply Flow",
    role: "Senior Product Designer",
    date: "2024 — 2025",
    eyebrow: "Application UX • Lead submit optimization",
    subtitle: "Improving the Home Lending application experience by increasing clarity, confidence, and completion momentum.",
    hero: "/work-apply-flow.jpg",
    live: "https://sanjanavenkat.framer.website/works/chase-apply",
    sections: [
      {
        id: "data-discovery",
        label: "Data discovery",
        title: "Customers needed confidence before commitment",
        body: "The apply flow was not just a form problem. Customers needed to understand what would happen next, what information was needed, and whether they were ready before sharing sensitive financial details.",
        image: "/chase-apply-data.jpg"
      },
      {
        id: "define",
        label: "Define",
        title: "Education, empowerment, efficiency",
        body: "I grounded the team in a simple mental model: educate customers on what to expect, empower them with clearer choices, and make the path efficient once they were ready to move forward.",
        image: "/chase-apply-define.jpg"
      },
      {
        id: "solution",
        label: "Solution",
        title: "A clearer application pathway",
        body: "The solution focused on reducing hesitation, improving content hierarchy, clarifying expectations, and creating a more guided flow without adding unnecessary friction.",
        image: "/chase-apply-solution.jpg"
      },
      {
        id: "impact",
        label: "Impact",
        title: "5.5% lead submit improvement",
        body: "The work improved lead submit rate by 5.5% and helped establish quarterly experimentation as a stronger part of the product operating rhythm.",
        image: "/chase-apply-impact.jpg"
      }
    ],
    metrics: ["5.5% lead submit lift", "Quarterly experimentation", "Clearer apply mental model"]
  },
  "chase-hl-public": {
    title: "Chase HL Public",
    role: "Lead Designer",
    date: "Jan 2025 — Sept 2025",
    eyebrow: "Public redesign • Need-based segmentation",
    subtitle: "Driving a 38% boost in conversions with need-based segmentation.",
    hero: "/chasepublic-header.jpg",
    live: "https://sanjanavenkat.framer.website/works/chase-hl-public",
    sections: [
      {
        id: "data-discovery",
        label: "Data discovery",
        title: "High traffic — low conversion",
        body: "Raw data showed conversion rates across touch points. The story was clear: people were visiting but not converting. I created a simple visualization to show the market we were missing, helping leadership understand the bottleneck and securing $10K+ in investment for the redesign.",
        image: "/chasepublic-datadiscovery.jpg"
      },
      {
        id: "define",
        label: "Define",
        title: "3-day design workshop",
        body: "The design team led a workshop to step outside tech constraints, define a clear vision for stakeholders, create concepts, and plan the roadmap. Research revealed habits and anxieties around credit, education before decision, and the need to see value before commitment.",
        image: "/chasepublic-datadiscovery3.jpg"
      },
      {
        id: "solution",
        label: "Solution",
        title: "Earn trust, establish trust, keep trust",
        body: "Customer research led us to three segments based on needs and trust: early explorers, rate shoppers, and customers ready to apply. This shaped the new page hierarchy, CTA strategy, calculator placement, and content model.",
        image: "/segmentation.png"
      },
      {
        id: "impact",
        label: "Impact",
        title: "Conversion impact",
        body: "The redesigned public experience drove a 38% increase in lead initiate and 30.9% increase in lead submit conversion for the variant compared to control.",
        image: ""
      },
      {
        id: "optimize",
        label: "Optimize",
        title: "Constraint into roadmap",
        body: "One constraint: we were working within an older design system, but we still pushed for a more modern foundation. That led to a redesigned rates page and improved calculators built for real user needs. The work made it onto the roadmap and is live today.",
        image: ""
      }
    ],
    metrics: ["38% lead initiate lift", "30.9% lead submit lift", "$10K+ investment secured"]
  }
};

const TESTIMONIALS = [
  ["Sanjana is the best designer at Chase that I've worked with. She is proactive, thoughtful, eager to learn and produces ideas and designs at both a high quality and high volume - which is rare!", "Bart Piela", "Marketing/Public Executive Director"],
  ["Your leadership, drive, and unwavering commitment have been nothing short of inspiring. You’ve been the champion behind so much of our progress.", "Williams Cavalcante", "CMH Design Lead"],
  ["Sanjana has been instrumental in the Encompass build UX, providing solutions and quickly adjusting to our changing needs.", "Sonia Zacheo", "CMH Product VP"],
  ["You jumped into the Apply world with both feet and I've loved exploring ways to improve our customers' experience.", "Andrew Kennerley", "Content VP"]
];

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
      {typedText !== text && <span className="animate-pulse text-[#A5522A]">|</span>}
    </p>
  );
}

function SegmentationDiagram() {
  return <img src="/segmentation.png" alt="Audience segmentation framework" className="mt-8 w-full rounded-[20px] object-contain" />;
}

function ProjectModal({ projectKey, onClose }) {
  const project = PROJECTS[projectKey];
  const sectionRefs = useRef({});

  if (!project) return null;

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6 sm:px-6 sm:py-10 animate-[modalIn_0.35s_ease_forwards]">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
          <button onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E2E1] bg-white text-[20px] text-[#6B625C] transition hover:text-[#A5522A]">‹</button>
          <h2 className="min-w-0 text-[32px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#9C3F14] sm:text-[40px] sm:leading-none">{project.title}</h2>
        </div>

        <div className="mb-6 rounded-[28px] border border-[#E4E2E1] bg-white p-3 sm:rounded-full sm:p-4">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:pb-0">
            {project.sections.map((section) => (
              <button key={section.id} onClick={() => scrollTo(section.id)} className="shrink-0 rounded-full border border-[#E4E2E1] bg-white px-4 py-2 text-[12px] font-medium text-[#6B625C] transition hover:border-[#9C3F14] hover:text-[#9C3F14] sm:px-5">
                {section.label.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-[74vh] overflow-y-auto rounded-[28px] bg-white p-4 sm:rounded-[36px] sm:p-8">
          <article className="space-y-12">
            <section className="rounded-[36px] bg-gradient-to-br from-[#FBF7F4] via-[#F7F2EF] to-[#EFEAE6] p-12 ">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">{project.role} • {project.date}</p>
                  <h1 className="mt-5 text-[52px] font-semibold leading-[1.02] tracking-[-0.05em] text-[#1A1512]">{project.title}</h1>
                  <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#D96F45]">{project.eyebrow}</p>
                  <p className="mt-5 max-w-[560px] text-[18px] leading-[1.6] text-[#5F5149]">{project.subtitle}</p>
                  <a href={project.live} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full bg-[#9C3F14] px-6 py-3 text-[14px] text-white transition hover:scale-[1.03]">Open original page →</a>
                </div>
                <div className="overflow-hidden rounded-[32px] bg-white border border-[#E4E2E1]  transition-all duration-300 hover:scale-[1.01]">
                  <img src={project.hero} alt={project.title} className="h-[420px] w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                </div>
              </div>
            </section>

            {projectKey !== "chase-hl-public" && (
              <section className="grid gap-6 md:grid-cols-3">
                {project.metrics.map((metric) => (
                  <article key={metric} className="rounded-[30px] bg-[#F8F7F6] p-7 ">
                    <p className="text-[26px] font-semibold tracking-[-0.04em] text-[#9C3F14]">{metric}</p>
                  </article>
                ))}
              </section>
            )}

            {project.sections.map((section, index) => {
              const isChasePublic = projectKey === "chase-hl-public";
              const isDataDiscovery = isChasePublic && section.id === "data-discovery";
              return (
              <section key={section.id} ref={(el) => (sectionRefs.current[section.id] = el)} className={isDataDiscovery ? "grid gap-6 scroll-mt-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch" : "flex flex-col gap-6 scroll-mt-6"}>
                <div className="rounded-[34px] bg-white p-9 ">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">{section.label}</p>
                  <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">{section.title}</h2>
                  <p className="mt-5 text-[16px] leading-[1.65] text-[#6B625C]">{section.body}</p>
                </div>
                {section.image && (
                  <div className="overflow-hidden rounded-[34px] bg-white border border-[#E4E2E1]">
                    <img src={section.image} alt={section.title} className="w-full h-auto object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                  </div>
                )}

                {projectKey === "chase-hl-public" && index === 0 && (
                  <section className="rounded-[34px] bg-white border border-[#E4E2E1] p-8 lg:col-span-2">
                    <div className="mb-8">
                      <h3 className="text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">Deeper look at data</h3>
                      <p className="mt-3 text-[18px] leading-[1.55] text-[#6B625C]">Let's analyze the points of friction and the clicks to try to understand customer intent and needs</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
                      <div className="flex flex-col gap-10">
                        {[
                          ["↯", "KYC Flow", "\"Start online\" takes customers through an account creation flow with sensitive questions like SSN"],
                          ["✦", "Outdated design", "Over 800 public pages, lack of branding and 20+ CTAs with unclear pathways"],
                          ["↖", "Clicks", "Top clicks were for miscellaneous actions like hamburger menu and sign-in. The most desired action, rates, was the 4th click and 3 scrolls below"]
                        ].map(([icon, title, body]) => (
                          <div key={title}>
                            <div className="text-[34px] leading-none text-[#221B16]">{icon}</div>
                            <h4 className="mt-5 text-[18px] font-semibold text-[#221B16]">{title}</h4>
                            <p className="mt-3 text-[17px] leading-[1.45] text-[#6B625C]">{body}</p>
                          </div>
                        ))}
                      </div>
                      <div className="overflow-hidden rounded-[28px] bg-white">
                        <img src="/chasepublic-datadiscovery2.jpg" alt="Annotated original Chase public page data" className="w-full max-h-[680px] object-contain object-top" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                      </div>
                    </div>
                  </section>
                )}

                {projectKey === "chase-hl-public" && index === 1 && (
                  <div className="flex flex-col gap-6 lg:col-span-2">
                    <div className="grid gap-6 md:grid-cols-2">
                      <article className="rounded-[30px] bg-white p-8 border border-[#E4E2E1]">
                        <h3 className="text-[18px] font-semibold text-[#221B16]">Scenario mapping</h3>
                        <p className="mt-3 text-[14px] leading-[1.6] text-[#6B625C]">
                          Applying the four forces model, we tried to understand what would push customers out of renting and pull them into home ownership. Habits and anxieties can outweigh motivation, so this helped us frame what customers needed before they were ready to act.
                        </p>
                      </article>
                      <article className="rounded-[30px] bg-white p-8 border border-[#E4E2E1]">
                        <h3 className="text-[18px] font-semibold text-[#221B16]">Habits and anxieties</h3>
                        <p className="mt-3 text-[14px] leading-[1.6] text-[#6B625C]">
                          Research surfaced credit concerns, the need to learn before deciding, and the importance of seeing value before commitment. The real drop-off was emotional readiness, not just page usability.
                        </p>
                      </article>
                    </div>

                    <div className="overflow-hidden rounded-[34px] bg-white border border-[#E4E2E1]">
                      <img src="/chasepublic-define.jpg" alt="Scenario mapping and four forces workshop board" className="w-full h-auto object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                    </div>

                    <section className="rounded-[34px] bg-white border border-[#E4E2E1] p-8">
                      <h3 className="text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">Habits and anxieties</h3>
                      <p className="mt-3 text-[18px] leading-[1.55] text-[#6B625C]">Customers told us why they needed more context before moving into an application.</p>
                      <div className="mt-8 grid gap-6 md:grid-cols-[0.95fr_0.75fr_1.25fr]">
                        {[
                          "I notice the apply button but I would definitely be spending more time in the learn before deciding to understand everything first",
                          "Just to understand the steps before I commit to clicking on the apply to buy button",
                          "I don't [feel ready] because I would want to consider my husband's finances as part of the loan and, um, we're still working over the next couple of months to get his credit to a better place"
                        ].map((quote) => (
                          <article key={quote} className="rounded-[28px] bg-[#EFEFEF] p-8">
                            <div className="text-[56px] leading-none text-[#221B16]">“</div>
                            <p className="mt-4 text-[18px] leading-[1.55] text-[#221B16]">“{quote}”</p>
                          </article>
                        ))}
                      </div>
                    </section>

                    <section className="rounded-[34px] bg-white border border-[#E4E2E1] p-8">
                      <h3 className="text-[32px] font-semibold tracking-[-0.04em] text-[#221B16]">Design values</h3>
                      <p className="mt-3 text-[18px] leading-[1.55] text-[#6B625C]">We set the values for our new design, grounding decisions in customers' thoughts, feelings and actions to understand both what we want and what we don't want.</p>
                      <div className="mt-8 grid gap-6 md:grid-cols-2">
                        <div>
                          <div className="rounded-[24px] bg-[#CFEBD5] p-6 text-[18px] font-semibold text-[#111827]">👍&nbsp;&nbsp; What we want</div>
                          <div className="mt-5 rounded-[24px] bg-[#EFEFEF] p-6 text-[15px] leading-[1.65] text-[#221B16]">
                            <p><strong>Think:</strong><br />Chase is reliable and offers clear options that fit my needs. I can make an informed decision if I am ready.</p>
                            <p className="mt-5"><strong>Feel:</strong><br />Confident, reassured, and supported. Empowered to step into home ownership.</p>
                            <p className="mt-5"><strong>Say:</strong><br />“I know what to do, this looks easy to start.”</p>
                            <p className="mt-5"><strong>Do:</strong><br />Use tools, start an application, reach out for help.</p>
                          </div>
                        </div>
                        <div>
                          <div className="rounded-[24px] bg-[#F3C7C7] p-6 text-[18px] font-semibold text-[#111827]">👎&nbsp;&nbsp; What we don't want</div>
                          <div className="mt-5 rounded-[24px] bg-[#EFEFEF] p-6 text-[15px] leading-[1.65] text-[#221B16]">
                            <p><strong>Think:</strong><br />I don't know where to look, I am confused and distracted. This is complicated.</p>
                            <p className="mt-5"><strong>Feel:</strong><br />Overwhelmed, anxious, or skeptical. Lose trust in Chase to help achieve home goals.</p>
                            <p className="mt-5"><strong>Say:</strong><br />“This is too complicated. I’m not sure what to do.”</p>
                            <p className="mt-5"><strong>Do:</strong><br />Leave the page, give up, or look elsewhere.</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {projectKey === "chase-hl-public" && section.id === "impact" && (
                  <section className="rounded-[34px] bg-white border border-[#E4E2E1] p-8 lg:col-span-2">
                    <div className="grid gap-8 md:grid-cols-3">
                      {[
                        ["↑", "38%", "Increase in lead initiate for variant compared to control", "text-[#3F9B4F]"],
                        ["↓", "-0.5%", "Reduced conversion in mobile - split flag issues and further investigation", "text-[#EF3E36]"],
                        ["↑", "30.9%", "Increase in lead submit (conversion) in variant compared to control", "text-[#3F9B4F]"]
                      ].map(([arrow, metric, body, color]) => (
                        <article key={metric} className="flex gap-5">
                          <div className={`text-[62px] leading-none ${color}`}>{arrow}</div>
                          <div>
                            <p className="text-[40px] font-semibold tracking-[-0.04em] text-[#111827]">{metric}</p>
                            <p className="mt-3 text-[20px] leading-[1.35] text-[#6B625C]">{body}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

                {projectKey === "chase-hl-public" && section.id === "optimize" && (
                  <div className="grid gap-6 lg:col-span-2 md:grid-cols-2">
  <div className="overflow-hidden rounded-[34px] bg-white border border-[#E4E2E1]">
    <img src="/calculator.jpg" alt="Mortgage calculator improvements" className="w-full h-full object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
  </div>
  <div className="overflow-hidden rounded-[34px] bg-white border border-[#E4E2E1]">
    {projectKey === "chase-hl-public" && section.id === "optimize" && (
  <div className="grid gap-6 lg:col-span-2 md:grid-cols-2">
    <div className="overflow-hidden rounded-[34px] bg-white border border-[#E4E2E1]">
      <img
        src="/calculator.jpg"
        alt="Mortgage calculator improvements"
        className="w-full h-full object-contain"
      />
    </div>

    <div className="overflow-hidden rounded-[34px] bg-white border border-[#E4E2E1]">
      <img
        src="/rates.jpg"
        alt="Rates page redesign"
        className="w-full h-full object-contain"
      />
    </div>
  </div>
)}

                {projectKey === "chase-hl-public" && section.id === "solution" && (
                  <div className="flex flex-col gap-12 lg:col-span-2">
                    <section className="rounded-[34px] bg-white border border-[#E4E2E1] p-10">
                      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                        <div>
                          <h3 className="text-[30px] font-semibold tracking-[-0.04em] text-[#221B16]">Ready to apply segment</h3>
                          <p className="mt-5 text-[18px] leading-[1.55] text-[#6B625C]">“Start online” might get clicks, but customers who are actually ready to apply will click “Apply to buy.”</p>
                          <p className="mt-5 text-[18px] leading-[1.55] text-[#6B625C]">Value proposition “Our priority is you” with discounts and benefits to trust Chase.</p>
                        </div>
                        <img src="/chasepublic-solution.jpg" alt="Ready to apply segment screens" className="w-full rounded-[28px] object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                      </div>
                    </section>

                    <section className="rounded-[34px] bg-white border border-[#E4E2E1] p-10">
                      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                        <img src="/chasepublic-solution2.jpg" alt="Rates decision point screens" className="w-full rounded-[28px] object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                        <div>
                          <h3 className="text-[30px] font-semibold tracking-[-0.04em] text-[#221B16]">Rates as decision point</h3>
                          <p className="mt-5 text-[18px] leading-[1.55] text-[#6B625C]">Rates was 4 scrolls below in the old page. New page has value, personalized context, and rates in the first scroll.</p>
                          <p className="mt-5 text-[18px] leading-[1.55] text-[#6B625C]">Clear branding, warm tone images, no illustrations, and stronger content helped imbibe trust in Chase.</p>
                        </div>
                      </div>
                    </section>

                    <section className="rounded-[34px] bg-white border border-[#E4E2E1] p-10">
                      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                        <div>
                          <h3 className="text-[30px] font-semibold tracking-[-0.04em] text-[#221B16]">Shopping segment</h3>
                          <p className="mt-5 text-[18px] leading-[1.55] text-[#6B625C]">Reduce CTA overload in the new design with clear, purposeful CTAs.</p>
                          <p className="mt-5 text-[18px] leading-[1.55] text-[#6B625C]">Mortgage calculator and affordability calculator were highlighted with HLA guide content.</p>
                        </div>
                        <img src="/chasepublic-solution3.jpg" alt="Shopping segment" className="w-full rounded-[28px] object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                      </div>
                    </section>

                    <section className="rounded-[34px] bg-white border border-[#E4E2E1] p-10">
                      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                        <img src="/chasepublic-solution4.jpg" alt="Early explorer segment" className="w-full rounded-[28px] object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                        <div>
                          <h3 className="text-[30px] font-semibold tracking-[-0.04em] text-[#221B16]">Early explorer segment</h3>
                          <p className="mt-5 text-[18px] leading-[1.55] text-[#6B625C]">Top 3 action-oriented educational articles replaced 7 hyperlinks.</p>
                          <p className="mt-5 text-[18px] leading-[1.55] text-[#6B625C]">We removed the sticky footer that forced customers toward “Start online” before they were ready.</p>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </section>
              );
            })}
          </article>
        </div>
      </div>
    </div>
  );
}

function WhatIBelieveCard() {
  return (
    <article className="rounded-[32px] border border-[#E4E2E1] bg-white p-7 text-[14px]  transition-all duration-300 hover:-translate-y-1 ">
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
    <section className="h-full min-h-[360px] rounded-[32px] border border-[#E4E2E1] bg-white p-8  transition-all duration-300 hover:-translate-y-1 ">
      <p className="mb-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">timeline</p>
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="absolute left-0 top-[18px] hidden h-px w-full bg-[#E8D8D0] md:block" />
        {items.map(([year, title, body, isActive]) => (
          <div key={title} className="relative pt-10">
            <span className={`absolute left-0 top-[12px] h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2 ${isActive ? "bg-[#D96F45] animate-glow" : "bg-[#E4E2E1]"}`} />
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
  const [quote, name, title] = TESTIMONIALS[index];

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % TESTIMONIALS.length), 5200);
    return () => clearInterval(timer);
  }, []);

  return (
    <article className="h-full min-h-[360px] rounded-[32px] border border-[#E4E2E1] bg-white p-8 text-[13px]  transition-all duration-300 hover:-translate-y-1 ">
      <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">what people say about me</p>
      <div key={index} className="min-h-[235px] animate-[slideIn_0.35s_ease_forwards]">
        <p className="italic leading-[1.55] text-[#4F4741]">“{quote}”</p>
        <p className="mt-5 text-[14px] font-semibold text-[#111827]">{name}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF]">{title}</p>
      </div>
      <div className="mt-5 flex gap-3">
        {TESTIMONIALS.map((_, dotIndex) => <span key={dotIndex} className={`h-3 rounded-full transition-all duration-300 ${index === dotIndex ? "w-10 bg-[#D96F45]" : "w-3 bg-[#EEF0F3]"}`} />)}
      </div>
    </article>
  );
}

export default function PortfolioHome() {
  const chatCardRef = useRef(null);
  const [active, setActive] = useState("Show data-driven design");
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
  }, [active]);

  const handlePillSelect = (pill) => {
    if (pill === active) return;
    chatCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(pill);
  };

  const handleNav = (item) => {
    if (item === "my work") setProjectOpen("chase-hl-public");
    if (item === "contact") window.open("https://www.linkedin.com/in/sanjana-venkat/", "_blank");
  };

  const openProjectForActivePill = () => {
    const projectKey = PROJECT_FOR_PILL[active];
    if (projectKey) setProjectOpen(projectKey);
  };

  return (
    <main onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })} className="relative min-h-screen w-full overflow-x-hidden bg-[#F8F7F6] px-8 py-10 text-[#221B16]">
 {projectOpen && (
  <ProjectModal
    projectKey={projectOpen}
    onClose={() => setProjectOpen(null)}
  />
)}
