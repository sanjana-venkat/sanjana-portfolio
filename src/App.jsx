import { useState } from "react";
import {
  CONTENT,
  DATA_DRIVEN_REST,
  PILLS,
  PROJECT_FOR_PILL,
  PROJECTS,
  TESTIMONIALS
} from "./data/portfolioData";

export default function App() {
  const [active, setActive] = useState(PILLS?.[0] || "Show data-driven design");
  const [projectOpen, setProjectOpen] = useState(null);

  const handlePill = (pill) => {
    setActive(pill);
  };

  const openWork = () => {
    const key = PROJECT_FOR_PILL?.[active] || "chase-hl-public";
    if (key) setProjectOpen(key);
  };

  return (
    <main className="min-h-screen bg-[#F8F7F6] px-5 py-8 text-[#221B16] sm:px-10">
      {projectOpen && (
        <ProjectModal projectKey={projectOpen} onClose={() => setProjectOpen(null)} />
      )}

      <section className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <div>
            <h1 className="text-[42px] font-semibold leading-[0.95] tracking-[-0.05em] text-[#A5522A]">
              Sanjana<br />Venkat
            </h1>
            <p className="mt-4 text-[17px] leading-[1.5] text-[#6B625C]">
              I turn ambiguity into direction. Let me show you.
            </p>
          </div>

          <nav className="space-y-3">
            <button onClick={() => setProjectOpen("chase-hl-public")} className="nav-btn">
              my work
            </button>
            <a href="https://www.linkedin.com/in/sanjana-venkat/" target="_blank" rel="noreferrer" className="nav-btn block">
              contact
            </a>
          </nav>

          <div className="overflow-hidden rounded-[32px] border border-[#E4E2E1] bg-white">
            <img src="/profile.jpg" alt="Sanjana Venkat" className="h-[300px] w-full object-cover" />
          </div>

          <div className="rounded-[32px] border border-[#E4E2E1] bg-white p-7">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">
              what i believe in
            </p>
            <p className="mt-5 text-[14px] leading-[1.7] text-[#5F5149]">
              i believe good products don’t just solve problems. they reveal ones people didn’t know they had.
            </p>
          </div>
        </aside>

        <section className="rounded-[36px] border border-[#E4E2E1] bg-white p-5 sm:p-10">
          <div className="mb-8 flex justify-end">
            <div className="rounded-[40px_40px_0_40px] bg-[#A5522A] px-6 py-3 text-white">
              {active}
            </div>
          </div>

          <div className="rounded-[0_40px_40px_40px] bg-[#F1EFED] p-6 sm:p-8">
            <p className="whitespace-pre-line text-[15px] leading-[1.7]">
              {CONTENT?.[active] || ""}
            </p>

            {active === "Show data-driven design" && (
              <>
                <div className="mt-6 overflow-hidden rounded-[24px] bg-white">
                  <img src="/segmentation.png" alt="Segmentation" className="w-full object-contain" />
                </div>
                <p className="mt-6 whitespace-pre-line text-[15px] leading-[1.7]">
                  {DATA_DRIVEN_REST}
                </p>
              </>
            )}

            {active !== "Tell me your story" && (
              <button onClick={openWork} className="mt-6 text-[14px] font-medium text-[#A5522A] underline underline-offset-4">
                show me examples of this work →
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {PILLS.map((pill) => (
              <button
                key={pill}
                onClick={() => handlePill(pill)}
                className={`rounded-full border px-5 py-2 text-[13px] transition ${
                  active === pill
                    ? "border-[#A5522A] text-[#A5522A]"
                    : "border-[#E4E2E1] text-[#6B625C]"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:col-span-2 md:grid-cols-2">
          <Timeline />
          <Testimonials />
        </section>
      </section>
    </main>
  );
}

function ProjectModal({ projectKey, onClose }) {
  const project = PROJECTS?.[projectKey] || PROJECTS?.["chase-hl-public"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FFF8F5] px-4 py-6">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 flex items-center gap-3">
          <button onClick={onClose} className="h-11 w-11 rounded-full border border-[#E4E2E1] bg-white text-[28px] text-[#6B625C]">
            ‹
          </button>
          <h2 className="text-[34px] font-semibold tracking-[-0.05em] text-[#9C3F14] sm:text-[52px]">
            {project?.title || "Chase HL Public"}
          </h2>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto rounded-[28px] border border-[#E4E2E1] bg-white p-3">
          {["data discovery", "define", "solution", "impact", "optimize"].map((chip) => (
            <a key={chip} href={`#${chip.replaceAll(" ", "-")}`} className="shrink-0 rounded-full border border-[#E4E2E1] px-5 py-2 text-[12px] text-[#6B625C]">
              {chip}
            </a>
          ))}
        </div>

        <article className="space-y-8 rounded-[32px] bg-white p-4 sm:p-8">
          <section className="rounded-[30px] bg-[#F7F2EF] p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">
                  Public redesign • Need-based segmentation
                </p>
                <h1 className="mt-4 text-[38px] font-semibold leading-[1] tracking-[-0.05em]">
                  {project?.title || "Chase HL Public"}
                </h1>
                <p className="mt-5 text-[18px] leading-[1.6] text-[#6B625C]">
                  {project?.subtitle || "Redesigning a high traffic, low conversion experience"}
                </p>
              </div>
              <img src="/chasepublic-header.jpg" alt="Chase public redesign" className="w-full rounded-[28px] object-contain" />
            </div>
          </section>

          <CaseStudySection
            id="data-discovery"
            label="Data discovery"
            title="High traffic — low conversion"
            body="Raw data showed conversion rates across touch points. The story was clear: people were visiting but not converting. I created a simple visualization to show the market we were missing, helping leadership understand the bottleneck and securing $10K+ in investment."
            image="/chasepublic-datadiscovery.jpg"
          />

          <section className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8">
            <h3 className="text-[32px] font-semibold tracking-[-0.04em]">Deeper look at data</h3>
            <p className="mt-3 text-[18px] text-[#6B625C]">
              Let’s analyze the points of friction and the clicks to understand customer intent and needs.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[0.32fr_0.68fr]">
              <div className="space-y-8">
                <Insight icon="↯" title="KYC Flow" body="Start online takes customers through account creation with sensitive questions like SSN." />
                <Insight icon="✦" title="Outdated design" body="Over 800 public pages, lack of branding and 20+ CTAs with unclear pathways." />
                <Insight icon="↖" title="Clicks" body="Top clicks were miscellaneous actions. Rates was the 4th click and 3 scrolls below." />
              </div>
              <img src="/chasepublic-datadiscovery2.jpg" alt="Annotated Chase page" className="max-h-[680px] w-full object-contain object-top" />
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
            <h3 className="text-[32px] font-semibold tracking-[-0.04em]">Scenario mapping</h3>
            <p className="mt-3 text-[18px] leading-[1.6] text-[#6B625C]">
              We used scenario mapping and the four forces model to understand what would push customers toward home ownership and what would hold them back.
            </p>
            <img src="/chasepublic-define.jpg" alt="Scenario mapping" className="mt-8 w-full rounded-[28px] object-contain" />
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
            <img src="/calculator.jpg" alt="Calculator" className="w-full rounded-[28px] border border-[#E4E2E1] object-contain" />
            <img src="/rates.jpg" alt="Rates page" className="w-full rounded-[28px] border border-[#E4E2E1] object-contain" />
          </section>
        </article>
      </div>
    </div>
  );
}

function CaseStudySection({ id, label, title, body, image }) {
  return (
    <section id={id} className="grid scroll-mt-8 grid-cols-1 gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="rounded-[30px] bg-white p-6 sm:p-9">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#D96F45]">{label}</p>
        <h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em]">{title}</h2>
        <p className="mt-5 text-[17px] leading-[1.7] text-[#6B625C]">{body}</p>
      </div>
      {image && (
        <img src={image} alt={title} className="w-full rounded-[30px] border border-[#E4E2E1] object-contain" />
      )}
    </section>
  );
}

function Insight({ icon, title, body }) {
  return (
    <div>
      <div className="text-[34px]">{icon}</div>
      <h4 className="mt-3 text-[18px] font-semibold">{title}</h4>
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
      <h3 className="text-[32px] font-semibold tracking-[-0.04em]">Habits and anxieties</h3>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {quotes.map((q) => (
          <article key={q} className="rounded-[28px] bg-[#EFEFEF] p-7">
            <div className="text-[54px] leading-none">“</div>
            <p className="mt-4 text-[17px] leading-[1.55]">“{q}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DesignValues() {
  return (
    <section className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8">
      <h3 className="text-[32px] font-semibold tracking-[-0.04em]">Design values</h3>
      <p className="mt-3 text-[18px] leading-[1.55] text-[#6B625C]">
        We grounded decisions in customers’ thoughts, feelings and actions.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <ValueCard good title="What we want" body="Think: Chase is reliable and offers clear options. Feel: Confident and supported. Say: I know what to do. Do: Use tools, start an application, reach out for help." />
        <ValueCard title="What we don’t want" body="Think: I don’t know where to look. Feel: Overwhelmed or skeptical. Say: This is too complicated. Do: Leave the page or look elsewhere." />
      </div>
    </section>
  );
}

function ValueCard({ good, title, body }) {
  return (
    <div>
      <div className={`rounded-[24px] p-6 text-[18px] font-semibold ${good ? "bg-[#CFEBD5]" : "bg-[#F3C7C7]"}`}>
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
    ["Ready to apply segment", "“Start online” might get clicks, but customers who are actually ready to apply will click “Apply to buy.”", "/chasepublic-solution.jpg", false],
    ["Rates as decision point", "Rates was 4 scrolls below in the old page. New page has value, personalized context, and rates in the first scroll.", "/chasepublic-solution2.jpg", true],
    ["Shopping segment", "Reduce CTA overload with clear, purposeful CTAs and highlight calculators with helpful guide content.", "/chasepublic-solution3.jpg", false],
    ["Early explorer segment", "Top 3 action-oriented educational articles replaced 7 hyperlinks, reducing pressure before users were ready.", "/chasepublic-solution4.jpg", true]
  ];

  return (
    <section className="space-y-6">
      {blocks.map(([title, body, image, flip]) => (
        <div key={title} className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8">
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
      <h3 className="text-[30px] font-semibold tracking-[-0.04em]">{title}</h3>
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
    <section id="impact" className="rounded-[30px] border border-[#E4E2E1] bg-white p-6 sm:p-8">
      <div className="grid gap-8 md:grid-cols-3">
        {metrics.map(([arrow, metric, body, color]) => (
          <article key={metric} className="flex gap-5">
            <div className={`text-[58px] leading-none ${color}`}>{arrow}</div>
            <div>
              <p className="text-[38px] font-semibold tracking-[-0.04em]">{metric}</p>
              <p className="mt-3 text-[18px] leading-[1.35] text-[#6B625C]">{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="rounded-[32px] border border-[#E4E2E1] bg-white p-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">timeline</p>
      <p className="mt-6 text-[20px] font-semibold">2024 — Present</p>
      <p className="mt-2 text-[#6B625C]">Senior Product Designer • JP Morgan Chase</p>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="rounded-[32px] border border-[#E4E2E1] bg-white p-8">
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9A8176]">what people say</p>
      <p className="mt-6 text-[15px] leading-[1.6] text-[#4F4741]">
        “{TESTIMONIALS?.[0]?.[0] || "Strong cross-functional design partner."}”
      </p>
      <p className="mt-5 font-semibold">{TESTIMONIALS?.[0]?.[1]}</p>
    </section>
  );
}
