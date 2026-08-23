import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MuesliStudy, OutdoneStudy } from "./FeaturedCaseStudies";
import Scene from "./landing/Scene";
import CaseStudy from "./work/CaseStudy";
import { CASE_STUDIES } from "./work/caseStudies";

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

const TRAVEL_DNA_URL =
  "https://travel-dna-kohl.vercel.app/";

const OUTDONE_FRAMER_URL =
  "https://sanjanavenkat.framer.website/works/outdone-2";

const FITCHECK_URL = "https://fit-check-coral.vercel.app/";

const MUESLI_FIGMA_URL =
  "https://www.figma.com/design/QO5TcpLfxmcheMMjcMYg6C/Muesli?node-id=17-5";

const MUESLI_PR_URL = "https://github.com/Muesli-HQ/muesli/pull/329";

const WAYFARER_URL = TRAVEL_DNA_URL;

const BODY = "[font-family:'Open_Sans',sans-serif]";
const HEADING = "[font-family:'Plus_Jakarta_Sans',sans-serif]";
const TYPEWRITE = "[font-family:'JetBrains_Mono',monospace]";

const PILLS = [
  "show model design thinking",
  "uncovering user needs",
  "how do you ship fast",
  "let's talk AI",
  "product strategy thinking",
  "designing systems at scale",
  "tell me your story",
  "getting exec buy-in",
];

const DEFAULT_PILL = "show model design thinking";

const CONTENT = {
  "uncovering user needs": `I look beyond surface-level metrics to understand the intent behind user behavior. At JPMC, we were a small team trying to reduce drop-offs in an application flow.

Tired of not seeing drastic impact, we went deep into the data and I made a funnel visualization that revealed something simple but important:

We were missing a huge part of the market.

That one artifact:
• Secured $10K+ in investment
• Got the 3rd Home Lending business case
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

  "how do you ship fast": `I move quickly by combining systems thinking, rapid prototyping, and close engineering collaboration.

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

  "getting exec buy-in": `I learnt that empathy is not just used in design, but also with stakeholders. 

Instead of trying to convince stakeholders, I start from where they are and we walk together toward a new shared vision. 

At JPMC, we built ChatGPT + Gemini prototypes in under a week.

The output was not just a feature. It was a story that an executive leader used that work to present to senior leadership, including CEO Jamie Dimon.

When I present, I focus on:
• What the opportunity is
• Why it matters
• What decision needs to be made

Because I learned that good design doesn't work unless people understand it.`,

  "show model design thinking": `I drove work and teams towards launch and learn even in a traditionally slower environment and deeply collaborated with product, engineering, marketing, senior leadership, and yes, data science and ML teams too.

That's why I was so excited to see Model Designer as a role, shaping the UX strategy behind model classification, filtering, and response mapping.

• Intent Classification Framework, I built a behavioral segmentation model to classify user intent and map it to personalized messaging that resonates with what users actually need in that moment starting with needs rather than data
• Conversational AI, I defined constraints for edge cases in an omni-channel conversational AI handling 1,000+ customer conversations
• Agentic Search Experiences, I explored how ChatGPT and Gemini could turn search-time intent into action without breaking the conversational flow

Personal project:
• Context-Aware Personalization, I built Outdone because I felt personalization relies too much on historical data and forgets what someone might want today. I classified people into 9 archetypes so Gemini could sort all possible responses into these categories. I wired the APIs myself, and intentionally showed users how the AI was generating responses in the loading state, so people can see the magic behind AI.`
};

const USER_NEEDS_REST = `The first outcome wasn't perfectly clean. Overall lead submit decreased. So I went deep into the data again and found the breakthrough:

38% increase in lead initiation with clearer Apply messaging.

In a few sprints, we pushed toward redesigning the full journey and got design system modernization onto the roadmap.

Today, the experience is live and evolving with AI.`;

const PROJECTS = [
  { slug: "b2c", label: "B2C", title: "Uncover User Needs", url: USER_NEEDS_FRAMER_URL },
  { slug: "ai-personalization", label: "RecSys", title: "Intent-based Recommendations", url: MARKETING_TILES_URL },
  // Rebuilt natively — see src/work/. Add `url: OUTDONE_FRAMER_URL` back to
  // return to the Framer page.
  { slug: "model-design", label: "Personalized Travel", title: "Outdone, Context-Aware Personalization", study: "model-design" },
  { slug: "service-design", label: "Service Design", title: "Designing Systems at Scale", url: APPLY_SYSTEMS_URL },
  // Rebuilt natively — see src/work/. To go back to the Framer page, add
  // `url: AI_FRAMER_URL` to this line; the embed path is untouched.
  { slug: "ai-chat-journeys", label: "AI Search Interfaces", title: "Agentic Search Experiences", study: "ai-chat-journeys" },
  { slug: "conversational-agentic-ai", label: "Casey Conversational AI", title: "Casey Conversational AI", url: CASEY_AI_URL },
  { slug: "exec-pitch", label: "Exec Pitch", title: "Executive Buy-in", url: FIGMA_DECK_URL },
  // frameHeight: the window height this embed is composed for. See the fitting
  // effect in WorkBrowserModal.
  { slug: "fitcheck", label: "Hackathon Winner", title: "FitCheck", url: FITCHECK_URL, frameHeight: 1000 },
  // Held back while the case study is being reworked. The study itself still
  // renders (see the stage below) — put this line back to show the tab again.
  // { slug: "muesli", label: "Speech-to-Text", title: "Muesli — Local-first dictation, made approachable", type: "case-study" },
];

function ChevronLeftIcon({ className = "h-5 w-5" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18L9 12l6-6" />
    </svg>
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

function CaseStudyLink({ href, children, primary = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-semibold transition hover:-translate-y-0.5 ${
        primary ? "bg-[#1D1D1B] text-white hover:bg-[#383734]" : "bg-[#E8E3DF] text-[#1D1D1B] hover:bg-[#DDD6D1]"
      } ${HEADING}`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function CaseStudySection({ eyebrow, title, children, className = "" }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`case-study-section ${isVisible ? "is-visible" : ""} ${className}`}>
      <p className={`text-[12px] font-semibold uppercase tracking-[0.08em] text-[#B6632C] ${HEADING}`}>{eyebrow}</p>
      <h2 className={`mt-4 max-w-[900px] text-[32px] font-medium leading-[1.12] tracking-[-0.045em] text-[#161513] sm:text-[44px] ${HEADING}`}>{title}</h2>
      <div className="mt-5 text-[17px] leading-[1.6] text-[#64615F] sm:text-[19px]">{children}</div>
    </section>
  );
}

function MediaPlaceholder({ name, label, className = "" }) {
  return (
    <div className={`flex min-h-[220px] items-center justify-center rounded-[28px] border border-dashed border-[#CFC7C2] bg-[#F6F2EF] p-6 text-center ${className}`}>
      <div>
        <p className={`text-[13px] font-semibold text-[#2B2927] ${HEADING}`}>{label}</p>
        <p className={`mt-2 text-[11px] uppercase tracking-[0.12em] text-[#A09289] ${TYPEWRITE}`}>Replace /public/{name}</p>
      </div>
    </div>
  );
}

// Kept temporarily for a safe rollback while the new local case-study module ships.
// eslint-disable-next-line no-unused-vars
function MuesliCaseStudy() {
  return (
    <article className={`h-full overflow-y-auto bg-white text-[#161513] ${BODY}`}>
      <div className="mx-auto max-w-[1120px] px-5 py-10 sm:px-10 sm:py-16">
        <div className="grid gap-7 sm:grid-cols-[0.96fr_1.04fr]">
          <div className="overflow-hidden rounded-[34px] bg-[#3B3A38] p-3 sm:p-5">
            <video className="h-full min-h-[320px] w-full rounded-[24px] object-cover" poster="/muesli-preview.jpg" autoPlay loop muted playsInline controls preload="auto" aria-label="Prototype of the redesigned Muesli desktop app">
              <source src="/muesli-prototype.webm" type="video/webm" />
              <source src="/muesli-prototype.mp4" type="video/mp4" />
              Your browser cannot play this video.
            </video>
          </div>
          <div className="flex flex-col justify-center rounded-[34px] bg-[#F7F2EF] p-7 sm:p-10">
            <p className={`text-[12px] font-semibold uppercase tracking-[0.08em] text-[#B6632C] ${HEADING}`}>Product designer · Muesli</p>
            <h1 className={`mt-7 text-[38px] font-medium leading-[1.08] tracking-[-0.05em] sm:text-[52px] ${HEADING}`}>Making local-first dictation feel effortless.</h1>
            <p className="mt-4 text-[17px] leading-[1.55] text-[#686461]">I redesigned Muesli’s first-run and daily experience, then translated the system into SwiftUI.</p>
            <p className="mt-5 text-[15px] text-[#686461]">Product design, UX systems, prototyping</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CaseStudyLink href={MUESLI_PR_URL} primary>Implementation PR</CaseStudyLink>
              <CaseStudyLink href={MUESLI_FIGMA_URL}>V1 → V2</CaseStudyLink>
              <CaseStudyLink href="/muesli-prototype.webm">Open video</CaseStudyLink>
            </div>
          </div>
        </div>

        <CaseStudySection eyebrow="THE TENSION" title="Powerful product, too much interface." className="py-20 sm:py-28">
          <p className="max-w-[880px]">Muesli already did the hard thing: fast, private dictation on the Mac. But setup split permissions, shortcuts, microphone choice, and testing across too many moments. Once inside, flat navigation made the product’s deeper tools feel disconnected from the core action.</p>
        </CaseStudySection>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            ["01", "Earn trust early", "Permission-specific guidance and local-processing reassurance appear exactly when the user needs them."],
            ["02", "One obvious way in", "Record is the primary destination, with a persistent control and the shortcut taught in context."],
            ["03", "Depth without density", "A collapsible rail, clearer grouping, and responsive spacing keep advanced tools close without making the app feel heavy."],
          ].map(([number, title, copy]) => (
            <div key={number} className="rounded-[24px] bg-[#F7F2EF] p-6 sm:p-7">
              <p className={`text-[11px] font-semibold tracking-[0.12em] text-[#B6632C] ${HEADING}`}>{number}</p>
              <h3 className={`mt-8 text-[21px] font-medium tracking-[-0.025em] text-[#161513] ${HEADING}`}>{title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#686461]">{copy}</p>
            </div>
          ))}
        </section>

        <section className="py-16 sm:py-24">
          <p className={`text-[12px] font-semibold uppercase tracking-[0.08em] text-[#B6632C] ${HEADING}`}>V1 → V2</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-[#F7F2EF] p-6 sm:p-8">
              <p className={`text-[13px] font-semibold text-[#7B817E] ${HEADING}`}>Before</p>
              <p className={`mt-3 text-[25px] font-semibold leading-[1.2] tracking-[-0.035em] ${HEADING}`}>
                Setup felt procedural. Daily tools felt separate.
              </p>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#69736F]">Permission steps, device setup, and the first dictation were fragmented. Insights, meetings, and personal vocabulary lacked a shared hierarchy.</p>
            </div>
            <div className="rounded-[24px] bg-[#E9E5E1] p-6 text-[#161513] sm:p-8">
              <p className={`text-[13px] font-semibold text-[#B6632C] ${HEADING}`}>After</p>
              <p className={`mt-3 text-[25px] font-semibold leading-[1.2] tracking-[-0.035em] ${HEADING}`}>
                One guided start. One coherent workspace.
              </p>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#686461]">A combined setup and live test builds confidence early; the rounded navigation rail, bento insights, and personal dictionary make the broader product easier to scan.</p>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[28px] bg-[#F7F2EF] px-6 py-9 sm:px-10 sm:py-12">
          <p className={`text-[12px] font-semibold uppercase tracking-[0.08em] text-[#B6632C] ${HEADING}`}>What I delivered</p>
          <p className={`mt-4 max-w-[850px] text-[28px] font-medium leading-[1.25] tracking-[-0.04em] sm:text-[36px] ${HEADING}`}>
            A cohesive product direction translated directly into the open-source app—from onboarding and navigation to Dictations, Meetings, Insights, Dictionary, Models, and Settings.
          </p>
        </section>
      </div>
    </article>
  );
}

// Kept temporarily for a safe rollback while the new local case-study module ships.
// eslint-disable-next-line no-unused-vars
function OutdoneCaseStudy() {
  const activities = ["Sunset walk", "Hidden café", "Kayaking", "Night market", "Museum", "Scenic drive", "Cooking class", "Live music"];
  const moods = ["Adventurous", "Slow and scenic", "Cultural", "Culinary", "Offbeat", "Social", "Active", "Night owl", "Romantic"];
  const pipeline = [
    ["01", "User context", "Mood signals, constraints, and a specific request"],
    ["02", "Intent layer", "Selections become structured behavioral direction"],
    ["03", "Gemini", "Composes a coherent itinerary structure"],
    ["04", "Google Places", "Grounds stops in names, ratings, photos, and addresses"],
    ["05", "Product logic", "Orders by proximity and applies transportation context"],
    ["06", "Final itinerary", "A plan ready to save, map, share, or export"],
  ];

  return (
    <article className={`h-full overflow-y-auto bg-white text-[#161513] ${BODY}`}>
      <div className="mx-auto max-w-[1120px] px-5 py-10 sm:px-10 sm:py-16">
        <div className="grid gap-7 sm:grid-cols-[0.96fr_1.04fr]">
          <div className="relative min-h-[430px] overflow-hidden rounded-[34px] bg-[#263D36]">
            <img src="/outdone-preview.png" alt="Outdone mood-first recommendation prototype" className="h-full w-full object-cover" />
            <div className="absolute inset-x-5 bottom-5 rounded-[18px] bg-[#15241F]/90 p-4 text-white backdrop-blur">
              <p className={`text-[12px] font-semibold ${HEADING}`}>Hero product walkthrough</p>
              <p className={`mt-1 text-[10px] uppercase tracking-[0.1em] text-white/65 ${TYPEWRITE}`}>Replace /public/outdone-hero.mp4</p>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-[34px] bg-[#F7F2EF] p-7 sm:p-10">
            <p className={`text-[12px] font-semibold uppercase tracking-[0.08em] text-[#B6632C] ${HEADING}`}>Product designer · Outdone</p>
            <p className={`mt-7 text-[17px] text-[#686461] ${HEADING}`}>Mood-first AI recommendations</p>
            <h1 className={`mt-3 text-[36px] font-medium leading-[1.08] tracking-[-0.05em] sm:text-[48px] ${HEADING}`}>People rarely know exactly what they want to do. They just know how they want to feel.</h1>
            <p className="mt-5 text-[16px] leading-[1.55] text-[#686461]">Outdone turns a destination, real-world constraints, and the user’s current mood into a plan they can actually follow.</p>
            <div className="mt-7"><CaseStudyLink href={TRAVEL_DNA_URL} primary>View live product</CaseStudyLink></div>
          </div>
        </div>

        <div className="mt-7 grid gap-3 rounded-[28px] bg-[#F7F2EF] p-6 sm:grid-cols-3 sm:p-8">
          <div><p className={`text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B6632C] ${HEADING}`}>Role</p><p className="mt-2 text-[14px] leading-[1.55] text-[#5F5B58]">Product strategy, product design, visual design, motion design, AI UX, frontend prototyping</p></div>
          <div><p className={`text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B6632C] ${HEADING}`}>Collaboration</p><p className="mt-2 text-[14px] leading-[1.55] text-[#5F5B58]">Abishek Sridhar, Research Engineer at Google DeepMind</p></div>
          <div><p className={`text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B6632C] ${HEADING}`}>Tools</p><p className="mt-2 text-[14px] leading-[1.55] text-[#5F5B58]">React, Gemini, Google Places, Google Maps</p></div>
        </div>

        <CaseStudySection eyebrow="THE PROBLEM" title="Sometimes ‘I want to do something’ is the entire brief." className="py-20 sm:py-28">
          <p className="max-w-[880px]">Search works when people already know what they want. When someone is bored, restless, or spontaneous, forming the query is often the hardest part.</p>
          <div className="mt-10 rounded-[30px] bg-[#F7F2EF] p-6 sm:p-10">
            <div className={`mx-auto w-fit rounded-full bg-[#1D1D1B] px-6 py-3 text-[15px] font-medium text-white ${HEADING}`}>I want to get out</div>
            <div className="mx-auto h-10 w-px bg-[#C9BFB9]" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {activities.map((activity) => <div key={activity} className={`rounded-[18px] bg-white px-4 py-5 text-center text-[14px] font-medium text-[#292725] ${HEADING}`}>{activity}</div>)}
            </div>
          </div>
          <p className={`mt-8 max-w-[900px] text-[23px] font-medium leading-[1.35] text-[#1D1D1B] ${HEADING}`}>The opportunity was not to improve search results. It was to help people form intent before they had a search query.</p>
        </CaseStudySection>

        <CaseStudySection eyebrow="THE REFRAME" title="What if recommendations started with mood instead of category?" className="pb-20 sm:pb-28">
          <p className="max-w-[850px]">Mood becomes useful when it is combined with destination, time, dietary needs, company, transportation, and activities the user wants included.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              ["Traditional recommendation flow", ["Category", "Search", "Long list", "More filtering", "User builds the plan"]],
              ["Outdone", ["Mood + context", "Interpreted intent", "Curated options", "Plan ready to use"]],
            ].map(([label, steps], flowIndex) => (
              <div key={label} className={`rounded-[28px] p-7 ${flowIndex === 1 ? "bg-[#E8F0EC]" : "bg-[#F7F2EF]"}`}>
                <p className={`text-[14px] font-semibold text-[#272522] ${HEADING}`}>{label}</p>
                <div className="mt-7 space-y-3">{steps.map((step, index) => <div key={step} className="flex items-center gap-3"><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] ${flowIndex === 1 ? "bg-[#1F5447] text-white" : "bg-white text-[#736B66]"}`}>{index + 1}</span><span className="text-[15px] text-[#5F5B58]">{step}</span></div>)}</div>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection eyebrow="DESIGNING THE INPUT" title="Ask only for what changes the recommendation." className="pb-20 sm:pb-28">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[26px] bg-[#F7F2EF] p-6"><p className={`text-[15px] font-semibold ${HEADING}`}>Context</p><p className="mt-4 text-[14px] leading-7">Destination<br />Date and time<br />Dietary preference<br />Who is coming<br />Transportation</p></div>
            <div className="rounded-[26px] bg-[#E8F0EC] p-6"><p className={`text-[15px] font-semibold ${HEADING}`}>Short-term intent</p><div className="mt-4 flex flex-wrap gap-2">{moods.map((mood) => <span key={mood} className="rounded-full bg-white px-3 py-2 text-[12px] text-[#31564C]">{mood}</span>)}</div></div>
            <div className="rounded-[26px] bg-[#F7F2EF] p-6"><p className={`text-[15px] font-semibold ${HEADING}`}>Specific request</p><p className={`mt-5 text-[20px] leading-[1.4] text-[#383431] ${TYPEWRITE}`}>“Include a cooking class.”</p><p className="mt-5 text-[14px] leading-[1.6]">One non-negotiable idea keeps the user in control.</p></div>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2"><MediaPlaceholder name="outdone-setup.webp" label="Setup-screen screenshot" /><MediaPlaceholder name="outdone-moods.webp" label="Mood-selection screenshot" /></div>
        </CaseStudySection>

        <CaseStudySection eyebrow="THE FIRST MODEL PROBLEM" title="The model understood the words, but not always the intent." className="pb-20 sm:pb-28">
          <p className="max-w-[850px]">Early generations were plausible but generic. The suggestions were technically valid, yet they did not satisfy the emotional promise made by the interface.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-[0.7fr_1.3fr]">
            <div className="rounded-[28px] bg-[#1F5447] p-7 text-white"><p className={`text-[11px] uppercase tracking-[0.1em] text-white/60 ${HEADING}`}>Selected mood</p><p className={`mt-4 text-[32px] font-medium ${HEADING}`}>Adventurous</p></div>
            <div className="rounded-[28px] bg-[#F7F2EF] p-7"><p className={`text-[13px] font-semibold text-[#8A7F78] ${HEADING}`}>Weak output</p><div className="mt-5 grid grid-cols-2 gap-3">{["Popular museum", "City park", "Walking tour", "Well-rated restaurant"].map(item => <div key={item} className="rounded-[16px] bg-white p-4 text-[14px] text-[#5F5B58]">{item}</div>)}</div></div>
          </div>
          <p className={`mt-8 text-[25px] font-medium tracking-[-0.025em] text-[#1D1D1B] ${HEADING}`}>A technically correct recommendation can still feel completely wrong.</p>
        </CaseStudySection>

        <CaseStudySection eyebrow="MODEL + PROMPT ITERATION" title="We turned moods from labels into behavioral constraints." className="pb-20 sm:pb-28">
          <p className="max-w-[900px]">Working with Abishek Sridhar, I iterated on how selections became model instructions. We reduced ambiguity before generation instead of asking the model to repair weak results afterward.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[28px] bg-[#F7F2EF] p-7"><p className={`text-[12px] font-semibold uppercase tracking-[0.08em] text-[#A09289] ${HEADING}`}>Before</p><p className={`mt-5 text-[28px] font-medium ${HEADING}`}>“Adventurous”</p><p className="mt-5 text-[14px] leading-[1.65]">A label leaves the interpretation space almost completely open.</p></div>
            <div className="rounded-[28px] bg-[#E8F0EC] p-7"><p className={`text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1F6B58] ${HEADING}`}>After</p><p className={`mt-5 text-[18px] leading-[1.55] text-[#24483F] ${TYPEWRITE}`}>Prioritize elevation, speed, water, physical effort, risk, or a safety briefing. Avoid passive sightseeing and activities that could fit any mood.</p></div>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[24px] border border-[#E1DAD5] p-6"><p className={`text-[14px] font-semibold ${HEADING}`}>Generic</p><p className="mt-3 text-[15px] text-[#716B67]">Park · Museum · Food hall</p></div>
            <div className="rounded-[24px] border border-[#BFD2CA] p-6"><p className={`text-[14px] font-semibold text-[#1F6B58] ${HEADING}`}>Intent-matched</p><p className="mt-3 text-[15px] text-[#4A625B]">Via ferrata · Paragliding · Cliffside zipline</p></div>
          </div>
          <p className="mt-7 max-w-[900px] text-[15px] leading-[1.7]">Structured mood definitions reduced interpretation space, unnecessary regeneration, and mood drift. The first response became more likely to match the user’s intent without claiming a measured performance improvement.</p>
        </CaseStudySection>

        <CaseStudySection eyebrow="RECOMMENDATION SYSTEM" title="The itinerary was generated, enriched, and grounded in real places." className="pb-20 sm:pb-28">
          <div className="mt-10 grid gap-3">
            {pipeline.map(([number, title, copy], index) => (
              <div key={number} className="case-study-pipeline-step grid gap-3 rounded-[22px] bg-[#F7F2EF] p-5 sm:grid-cols-[52px_190px_1fr] sm:items-center" style={{ "--pipeline-delay": `${index * 90}ms` }}>
                <span className={`text-[12px] font-semibold text-[#B6632C] ${HEADING}`}>{number}</span><span className={`text-[16px] font-semibold text-[#252320] ${HEADING}`}>{title}</span><span className="text-[14px] leading-[1.55] text-[#716B67]">{copy}</span>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-[900px] text-[15px] leading-[1.7]">Gemini composed the day. Google Places grounded the output, while the product layer handled routing, saved stops, transportation mode, maps, sharing, and calendar export.</p>
        </CaseStudySection>

        <CaseStudySection eyebrow="MOTION AS PRODUCT COMMUNICATION" title="The loading state explains what the product is doing." className="pb-20 sm:pb-28">
          <p className="max-w-[870px]">A generic spinner would make generation feel uncertain. The loading sequence creates progress, anticipation, and trust while showing how the user’s inputs shape the result.</p>
          <MediaPlaceholder name="outdone-loading.mp4" label="Loading-animation video" className="mt-10 min-h-[360px]" />
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">{["Reading context", "Interpreting mood", "Understanding place", "Scanning real places", "Building itinerary"].map((stage, index) => <div key={stage} className="rounded-[18px] bg-[#F7F2EF] p-4"><span className="text-[10px] text-[#B6632C]">0{index + 1}</span><p className="mt-3 text-[12px] leading-[1.4] text-[#5F5B58]">{stage}</p></div>)}</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2"><MediaPlaceholder name="outdone-motion-cards.mp4" label="Mood-card selection clip" className="min-h-[180px]" /><MediaPlaceholder name="outdone-motion-save.mp4" label="Save and Maps action clip" className="min-h-[180px]" /></div>
        </CaseStudySection>

        <CaseStudySection eyebrow="VISUAL SYSTEM" title="The interface needed to feel emotional without becoming vague." className="pb-20 sm:pb-28">
          <p className="max-w-[850px]">Photography carries the feeling. Restrained typography, cards, and progress states keep the experience usable and trustworthy.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[28px] bg-[#F7F2EF] p-7"><p className={`text-[13px] font-semibold ${HEADING}`}>Palette</p><div className="mt-6 grid grid-cols-2 gap-3">{[["#153A31","Dark green"],["#2A8A78","Teal"],["#F4F0EB","Soft neutral"],["#1D1D1B","Ink"]].map(([color,label]) => <div key={color}><div className="h-16 rounded-[14px]" style={{background:color}} /><p className="mt-2 text-[10px] text-[#847B75]">{label}</p></div>)}</div></div>
            <div className="rounded-[28px] bg-[#153A31] p-7 text-white"><p className={`text-[13px] font-semibold text-white/65 ${HEADING}`}>Editorial type + structured controls</p><p className={`mt-10 text-[42px] leading-[1.03] tracking-[-0.05em] ${HEADING}`}>Today feels different.</p><div className="mt-8 flex flex-wrap gap-2">{["Image-led mood", "Rounded cards", "Quiet depth", "Route motifs"].map(item => <span key={item} className="rounded-full border border-white/20 px-3 py-2 text-[11px] text-white/75">{item}</span>)}</div></div>
          </div>
          <MediaPlaceholder name="outdone-visual-system.webp" label="Visual-design system board" className="mt-5" />
        </CaseStudySection>

        <CaseStudySection eyebrow="FINAL EXPERIENCE + REFLECTION" title="The hardest part was not generating ideas. It was deciding what the AI should understand." className="pb-10 sm:pb-16">
          <div className="grid gap-3 sm:grid-cols-5">{["Landing", "Setup", "Mood selection", "Loading", "Results"].map((screen, index) => <div key={screen} className="rounded-[22px] bg-[#F7F2EF] p-4"><div className="aspect-[9/16] rounded-[14px] border border-dashed border-[#CFC7C2] bg-white" /><p className={`mt-3 text-[11px] font-semibold text-[#655F5B] ${HEADING}`}>{index + 1}. {screen}</p></div>)}</div>
          <p className="mt-10 max-w-[900px]">Building Outdone changed how I think about AI products. Abundance was not the same as relevance. The real design work was deciding what the system should know, what it should ask, how intent should be translated, and where the user should remain in control.</p>
          <p className="mt-5 max-w-[900px]">That intersection between product behavior, model behavior, and interaction design became the most important part of the project.</p>
          <div className="mt-8"><CaseStudyLink href={TRAVEL_DNA_URL} primary>View live product</CaseStudyLink></div>
        </CaseStudySection>
      </div>
    </article>
  );
}

function WorkBrowserModal({ onClose, initialSlug = "b2c", origin = null }) {
  const stageRef = useRef(null);
  const phase = origin ? "expanding" : "open";

  // FLIP: put the stage where the frame was, then let it grow into place.
  useLayoutEffect(() => {
    if (!origin || !stageRef.current) return;
    const el = stageRef.current;
    // Measure the stage untransformed — on a re-run it may still be carrying
    // the previous frame's transform, which would measure the frame instead.
    el.style.setProperty("--ox", "0px");
    el.style.setProperty("--oy", "0px");
    el.style.setProperty("--osx", "1");
    el.style.setProperty("--osy", "1");
    const to = el.getBoundingClientRect();
    if (!to.width || !to.height) return;
    el.style.setProperty("--ox", `${origin.left - to.left}px`);
    el.style.setProperty("--oy", `${origin.top - to.top}px`);
    el.style.setProperty("--osx", `${origin.width / to.width}`);
    el.style.setProperty("--osy", `${origin.height / to.height}`);
    
  }, [origin]);
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // The elephant is fixed to the corner of the phone and would otherwise
    // hang over the last pill in the tab row.
    document.body.classList.add("work-open");

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.classList.remove("work-open");
    };
  }, []);

  const getProjectBySlug = (slug) =>
    PROJECTS.find((project) => project.slug === slug) || PROJECTS[0];

  const [activeProject, setActiveProject] = useState(() =>
    getProjectBySlug(initialSlug)
  );

  const selectProject = (project) => {
    setActiveProject(project);
    window.history.replaceState(null, "", `#work=${project.slug}`);
  };

  // Some embeds are composed against the window rather than reflowing to it, so
  // in a stage this short they crop — a phone mockup loses its bottom edge. For
  // those, hand the frame the window height it was designed for and scale the
  // whole thing down to fit, so it looks the way it does on a full desktop.
  // Measured rather than guessed, because the stage is as tall as the browser.
  const wantsHeight = activeProject.frameHeight || 0;
  const [frameZoom, setFrameZoom] = useState(1);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !wantsHeight) {
      setFrameZoom(1);
      return;
    }
    const fit = () => {
      const h = el.clientHeight - 20; // less the stage's own padding
      setFrameZoom(h > 0 ? Math.min(1, Math.max(0.6, h / wantsHeight)) : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [wantsHeight]);

  return (
    <div className={`work-shell${phase === "expanding" ? " is-expanding" : ""}`}>
      <div className="mx-auto w-full min-w-0 max-w-[1280px] overflow-hidden flex flex-col flex-1 min-h-0">
        <div className="work-head">
          <button type="button" className="work-back" onClick={onClose} aria-label="Close work browser">
            <ChevronLeftIcon className="h-[18px] w-[18px]" />
          </button>
          <h2 className="work-title">My Work</h2>
        </div>

        <div className="work-tabs no-scrollbar">
          {PROJECTS.map((project) => (
            <button
              key={project.label}
              onClick={() => selectProject(project)}
              className={`pc-pill${activeProject.label === project.label ? " on" : ""}`}
            >
              {project.label}
            </button>
          ))}
        </div>

        <div
          ref={stageRef}
          className={`work-stage${phase === "expanding" ? " is-expanding" : ""}`}
        >
          {activeProject.url ? (
            <iframe
              key={activeProject.url}
              src={activeProject.url}
              title={activeProject.title}
              className={`work-frame border-0 bg-white${wantsHeight ? " is-zoomed" : ""}`}
              style={wantsHeight ? { "--z": frameZoom } : undefined}
              scrolling="yes"
              allowFullScreen
            />
          ) : activeProject.study ? (
            <CaseStudy key={activeProject.study} study={CASE_STUDIES[activeProject.study]} />
          ) : (
            <>
              {activeProject.slug === "muesli" && <MuesliStudy />}
              {activeProject.slug === "model-design" && <OutdoneStudy />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FigmaDeckModal({ onClose }) {
  return <FramerModal title="Chase HL Public" url={FIGMA_DECK_URL} onClose={onClose} />;
}

/* ── Chat knowledge ─────────────────────────────────────────────────────
   Same questions, same answers. Only the presentation moved onto the canvas. */

const MODEL_DESIGN_INTRO = `I drove work and teams towards launch and learn even in a traditionally slower environment, deeply collaborating with product, engineering, marketing, and yes, data science and ML teams too!

That's why I'm so excited see Model Designer, I thrive in thinking about the how and why more than "what should it look like?"`;

const MODEL_DESIGN_LINKS = [
  {
    title: "Chase MyHome Intent-Based Recommendations",
    question: "How should the system decide what to recommend?",
    target: "ai-personalization",
  },
  {
    title: "Casey Conversational AI",
    question: "How should the model respond?",
    target: "casey-ai",
  },
  {
    title: "AI Search Interfaces",
    question: "How should AI become the interface?",
    target: "ai-framer",
  },
  {
    title: "Outdone Mood-Based Personalization",
    question: "What context should guide generation?",
    target: "travel-dna",
  },
];

/** The follow-up links that belong to each answer. */
function linksForQuestion(question, open) {
  if (question === "show model design thinking") {
    return MODEL_DESIGN_LINKS.map((link) => ({
      label: link.title,
      onSelect: () => open(link.target),
    }));
  }

  if (question === "let's talk AI") {
    return [
      { label: "agentic search experiences", onSelect: () => open("ai-framer") },
      { label: "conversational AI", onSelect: () => open("casey-ai") },
    ];
  }

  const single = {
    "uncovering user needs": ["show me the work", "b2c"],
    "product strategy thinking": ["show me the framework", "ai-personalization"],
    "designing systems at scale": ["show me the system", "service-design"],
    "how do you ship fast": ["what have you been building?", "travel-dna-live"],
    "getting exec buy-in": ["walk me through the project", "exec-pitch"],
  }[question];

  return single ? [{ label: single[0], onSelect: () => open(single[1]) }] : [];
}

function answerFor(question) {
  if (question === "show model design thinking") return MODEL_DESIGN_INTRO;
  if (question === "uncovering user needs") {
    return `${CONTENT[question]}\n\n${USER_NEEDS_REST}`;
  }
  return CONTENT[question] || "";
}

export default function PortfolioHome() {
  const [active, setActive] = useState(DEFAULT_PILL);
  const [projectOpen, setProjectOpen] = useState(null);
  const [showLinks, setShowLinks] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [workProjectSlug, setWorkProjectSlug] = useState("b2c");
  const [instantType, setInstantType] = useState(true);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const faviconPath = "/logo.jpg";

    const removeExistingFavicons = () => {
      const links = document.querySelectorAll(
        "link[rel*='icon'], link[rel='apple-touch-icon']"
      );
      links.forEach((link) => {
        if (link.parentNode) link.parentNode.removeChild(link);
      });
    };

    const addFavicon = (rel, href, type = "image/jpeg") => {
      const link = document.createElement("link");
      link.rel = rel;
      link.type = type;
      link.href = `${href}?v=${Date.now()}`;
      document.head.appendChild(link);
    };

    removeExistingFavicons();
    addFavicon("icon", faviconPath);
    addFavicon("shortcut icon", faviconPath);
    addFavicon("apple-touch-icon", faviconPath);
    document.title = "Sanjana Venkat";
  }, []);

  // Deep links such as /#work=muesli still open straight into a case study.
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash || "";
      if (hash.startsWith("#work=")) {
        setWorkProjectSlug(hash.replace("#work=", "") || "b2c");
        setProjectOpen("work-browser");
      } else {
        setProjectOpen(null);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      setInstantType(true);
      setThinking(false);
      setShowLinks(true);
      return undefined;
    }

    setInstantType(false);
    setShowLinks(false);
    setThinking(true);

    const timer = setTimeout(() => setThinking(false), 850);
    return () => clearTimeout(timer);
  }, [active]);

  const [workOrigin, setWorkOrigin] = useState(null);

  const openWorkProject = (slug, origin) => {
    setWorkOrigin(origin || null);
    setWorkProjectSlug(slug);
    window.history.pushState(null, "", `#work=${slug}`);
    setProjectOpen("work-browser");
  };

  const closeWorkProject = () => {
    setProjectOpen(null);
    if (window.location.hash.startsWith("#work=")) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const openProjectTarget = (target, origin) => {
    const slugByTarget = {
      "ai-framer": "ai-chat-journeys",
      "casey-ai": "conversational-agentic-ai",
      "ai-personalization": "ai-personalization",
      "travel-dna": "model-design",
      "model-design": "model-design",
      muesli: "muesli",
      b2c: "b2c",
      "service-design": "service-design",
      "exec-pitch": "exec-pitch",
      "ai-chat-journeys": "ai-chat-journeys",
      "conversational-agentic-ai": "conversational-agentic-ai",
    };

    if (target === "travel-dna-live") {
      window.open(TRAVEL_DNA_URL, "_blank", "noreferrer");
      return;
    }

    openWorkProject(slugByTarget[target] || "b2c", origin);
  };

  return (
    <main className={`bg-[#F7F4F2] text-[#221B16] ${BODY}`}>
      {projectOpen === "work-browser" && (
        <WorkBrowserModal
          initialSlug={workProjectSlug}
          origin={workOrigin}
          onClose={closeWorkProject}
        />
      )}
      {projectOpen === "figma-deck" && <FigmaDeckModal onClose={() => setProjectOpen(null)} />}
      {projectOpen === "ai-framer" && <FramerModal title="AI Search Interfaces" url={AI_FRAMER_URL} onClose={() => setProjectOpen(null)} />}
      {projectOpen === "casey-ai" && <FramerModal title="Conversational AI" url={CASEY_AI_URL} onClose={() => setProjectOpen(null)} />}
      {projectOpen === "user-needs" && <FramerModal title="How I Uncover User Needs" url={USER_NEEDS_FRAMER_URL} onClose={() => setProjectOpen(null)} />}
      {projectOpen === "marketing-tiles" && <FramerModal title="Intent-based Recommendations" url={MARKETING_TILES_URL} onClose={() => setProjectOpen(null)} />}
      {projectOpen === "apply-systems" && <FramerModal title="Designing Systems at Scale" url={APPLY_SYSTEMS_URL} onClose={() => setProjectOpen(null)} />}

      <Scene
        onOpenProject={openProjectTarget}
        chat={{
          active,
          questions: PILLS,
          answer: answerFor(active),
          thinking,
          instant: instantType,
          showLinks,
          links: linksForQuestion(active, openProjectTarget),
          onAsk: setActive,
          onAnswerDone: () => setShowLinks(true),
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        html, body {
          font-family: 'Open Sans', sans-serif;
          background: #F7F4F2;
        }

        h1, h2, h3, h4, h5, h6, button {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        @media (prefers-reduced-motion: reduce) {
          [class*="animate-["] { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
