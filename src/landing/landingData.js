/*
 * Content for the landing canvas. Everything is lifted from copy that already
 * existed elsewhere in the site — the hero, the bio, the animated timeline, the
 * chat answers and the testimonials — so this re-composes the portfolio rather
 * than rewriting it.
 */

import { TESTIMONIALS } from "../data/portfolioData";

export const SECTIONS = [
  { id: "sanjana", title: "Sanjana" },
  { id: "story", title: "Story" },
  { id: "snippets", title: "Snippets" },
  { id: "statements", title: "What people say" },
];

/* ── Selected work ─────────────────────────────────────────────────────── */

/**
 * The gallery wall. Three large pieces hang from the rail; drop, size and tilt
 * all vary and are fixed per project so the wall never re-rolls on a render.
 */
export const FEATURED = [
  {
    slug: "ai-personalization",
    name: "Intent-based recommendations",
    short: "Intent-based",
    blurb: "Need-based recommendations that infer what a customer is trying to accomplish before deciding what to show them.",
    image: "/legacy/intent/01-ULRP0FZksJHUAfiiIvrdPTDdkE4.png",
    width: 150,
    height: 108,
    cord: 30,
    tilt: -0.6,
  },
  {
    slug: "model-design",
    name: "Outdone",
    short: "Outdone",
    blurb: "Travel planning built around how you feel today, not just past preference.",
    image: "/outdone-preview.png",
    width: 124,
    height: 150,
    cord: 62,
    tilt: 0.7,
  },
  // Muesli is held back while the case study is being reworked.
  // {
  //   slug: "muesli",
  //   name: "Muesli",
  //   short: "Muesli",
  //   image: "/muesli-preview.jpg",
  //   width: 136,
  //   height: 96,
  //   cord: 40,
  //   tilt: -0.35,
  // },
];

/** Everything else, pinned to a narrow strip below the gallery. */
export const MORE_WORK = [
  { slug: "ai-chat-journeys", name: "Agentic search" },
  { slug: "conversational-agentic-ai", name: "Casey AI" },
  { slug: "b2c", name: "Home lending" },
  { slug: "service-design", name: "Service design" },
  { slug: "exec-pitch", name: "Exec pitch" },
];

/** Kept for anything still importing the old name. */
export const SELECTED_WORK = FEATURED;

/* ── Sanjana ───────────────────────────────────────────────────────────── */

export const INTRO = {
  name: "Sanjana",
  wordmark: "Sanjana Venkat",
  tagline: "Design engineer",
  portrait: "/profile.jpg",
  lead: "I turn ambiguity into reality. Let me show you.",
  role: "Designing AI interfaces, recommendation systems, and model behavior.",
  bio: "I studied psychology because I loved thinking about how people think. That curiosity never left, it just found a new home in product design. I've always tried to get closer to user needs and intent — through data, research, and lately model design.",
};

export const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sanjana-venkat/", external: true },
  { label: "GitHub", href: "https://github.com/sanjana-venkat", external: true },
  { label: "Résumé", href: "/SanjanaVenkat_Design-Engineer_Resume1.pdf", external: true },
  { label: "Email", href: "mailto:sanjanavnkt20@gmail.com", external: false },
];

/* ── Story ─────────────────────────────────────────────────────────────── */

export const STORY_MOMENTS = [
  {
    id: "childhood",
    year: "2000s",
    title: "Childhood in India",
    copy: "Grew up close to my roots, culture, and community.",
    image: "/childhood.jpg",
  },
  {
    id: "states",
    year: "2014",
    title: "Moved to the States",
    copy: "A big leap. New country, new world.",
    image: "/2014.jpg",
  },
  {
    id: "presenter",
    year: "2019",
    title: "Best Presenter Award",
    copy: "My first publication, on temple architecture.",
    image: "/2019.png",
  },
  {
    id: "utd",
    year: "2020",
    title: "UTD · Psychology & Design",
    copy: "Studied how people think, feel, and make decisions.",
    image: "/2020.jpg",
  },
  {
    id: "chetna",
    year: "2021",
    title: "Chetna · Graphic Design",
    copy: "Moved into design, and raised $10K+ for South Asian mental health.",
    image: "/2021.jpg",
  },
  {
    id: "dialexa",
    year: "2022",
    title: "Dialexa · DTour",
    copy: "Built an AR travel concept with Dialexa.",
    image: "/2022.jpg",
  },
  {
    id: "uxclub",
    year: "2022",
    title: "UX Club · Vice President",
    copy: "Organised design events with Paycom, Bottle Rocket and Intuit.",
    image: "/2022-1.jpg",
  },
  {
    id: "paycom",
    year: "2023",
    title: "Paycom · Associate Product Designer",
    copy: "A founding member of a brand new B2B subteam, focused on the design system.",
    image: "/2023.jpg",
  },
  {
    id: "jpmc",
    year: "2024",
    title: "JPMorgan Chase · Senior Product Designer",
    copy: "Owned the apply flow and HELOC 0-to-1.",
    image: "/2024.jpg",
  },
  {
    id: "lead",
    year: "2025",
    title: "JPMorgan Chase · Lead",
    copy: "Led AI & Marketing, and the exec-facing Gemini concepts.",
    image: "/2025.jpg",
  },
  {
    id: "bay",
    year: "2026",
    title: "Moved to the Bay Area",
    copy: "A new chapter, building AI products.",
    image: "/2026.jpg",
  },
];

/** The location line changes country at this moment, and state at the next. */
export const STATES_MOMENT = "states";
export const MOVED_MOMENT = "bay";

/* ── Snippets ──────────────────────────────────────────────────────────── */

export const SNIPPETS = {
  "nine-to-five": {
    label: "9 to 5",
    blurb: "Enterprise product design at JPMorgan Chase.",
    projects: [
      {
        id: "intent",
        name: "Intent-based recommendations",
        slug: "ai-personalization",
        summary:
          "Millions of customer data points, and every customer still saw the same experience. I led the strategy behind need-based recommendations so the model could infer what someone needed right now before deciding what to show them.",
        metric: "17% CTR lift from the personalization model",
      },
      {
        id: "casey",
        name: "Casey conversational AI",
        slug: "conversational-agentic-ai",
        summary:
          "An omni-channel conversational agent that answered mortgage questions and qualified leads. I defined the constraints for its edge cases — what it should handle, and where a human needed to step in.",
        metric: "1,000+ customer conversations handled",
      },
      {
        id: "agentic",
        name: "Agentic search",
        slug: "ai-chat-journeys",
        summary:
          "ChatGPT and Gemini surfaces for Chase. I explored how search-time intent could turn into action without breaking the conversational flow.",
        metric: "Prototyped in under a week, used by leadership",
      },
    ],
  },
  "five-to-nine": {
    label: "5 to 9",
    blurb: "Independent building, experiments, AI products, motion, and visual design.",
    projects: [
      {
        id: "outdone",
        name: "Outdone",
        slug: "model-design",
        summary:
          "Personalization leans too hard on historical data and forgets what someone might want today. Outdone starts from mood instead of category, and shows its working in the loading state so people can see how the AI is reasoning.",
        metric: "9 archetypes classified by Gemini, APIs wired myself",
      },
      // Held back while the case study is being reworked.
      // {
      //   id: "muesli",
      //   name: "Muesli",
      //   slug: "muesli",
      //   summary:
      //     "A private, local-first Mac dictation app with a lot going on under the hood. I redesigned onboarding and navigation so the first dictation felt easy, then translated the system into SwiftUI.",
      //   metric: "Shipped as an open-source pull request",
      // },
      {
        id: "portfolio",
        name: "This portfolio",
        slug: null,
        summary:
          "Concepted, designed and built in two days as an interactive pre-interview experience. The kolam is the navigation — one continuous line, drawn around nine dots.",
        metric: "2 days, end to end",
      },
    ],
  },
};

export const CHAT_OPENER =
  "Ask me about my work, process, AI projects, or what I'd bring to your team.";

/* ── Statements ────────────────────────────────────────────────────────── */

/** What other people have said. Nothing of mine — this section is theirs. */
export const STATEMENTS = TESTIMONIALS.map(([text, attr, role], i) => ({
  id: `t${i}`,
  text: text.trim(),
  attr,
  role,
}));
