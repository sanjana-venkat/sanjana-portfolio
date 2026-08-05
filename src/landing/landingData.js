/*
 * Content for the landing canvas. Everything here is lifted from copy that
 * already existed elsewhere in the site — the hero, the "what I believe in"
 * bio, the animated timeline, the chat answers and the testimonials — so the
 * redesign re-composes the portfolio rather than rewriting it.
 */

import { TESTIMONIALS } from "../data/portfolioData";

export const SECTIONS = [
  { id: "sanjana", n: "01", title: "Sanjana" },
  { id: "story", n: "02", title: "Story" },
  { id: "snippets", n: "03", title: "Snippets" },
  { id: "statements", n: "04", title: "Statements" },
];

/* ── Persistent project shortcuts ──────────────────────────────────────── */

export const SELECTED_WORK = [
  { slug: "ai-personalization", name: "Intent-based recommendations" },
  { slug: "model-design", name: "Outdone" },
  { slug: "muesli", name: "Muesli" },
];

/* ── 01 · Sanjana ──────────────────────────────────────────────────────── */

export const INTRO = {
  name: "Sanjana",
  wordmark: "Sanjana Venkat",
  lead: "I turn ambiguity into reality. Let me show you.",
  role: "Product designer + builder designing AI interfaces, recommendation systems, and model behavior.",
  bio: "I studied psychology because I loved thinking about how people think. That curiosity never left, it just found a new home in product design. I've always tried to get closer to user needs and intent — through data, research, and lately model design.",
};

export const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sanjana-venkat/", external: true },
  { label: "GitHub", href: "https://github.com/sanjana-venkat", external: true },
  { label: "Résumé", href: "/SanjanaVenkat_Design-Engineer_Resume1.pdf", external: true },
  { label: "Email", href: "mailto:sanjanavnkt20@gmail.com", external: false },
];

/* ── 02 · Story ────────────────────────────────────────────────────────── */

export const STORY_MOMENTS = [
  {
    id: "psychology",
    year: "2020",
    title: "UTD, Psychology & Design",
    copy: "Studied how people think, feel, and make decisions.",
    image: "/2020.jpg",
  },
  {
    id: "design",
    year: "2021",
    title: "Chetna · Graphic Design",
    copy: "Moved into design, and raised $10K+ for South Asian mental health.",
    image: "/2021.jpg",
  },
  {
    id: "paycom",
    year: "2023",
    title: "Paycom · Associate Product Designer",
    copy: "A founding member of a brand new B2B enterprise subteam, focused on the design system.",
    image: "/2023.jpg",
  },
  {
    id: "jpmc",
    year: "2024—25",
    title: "JPMorgan Chase · Senior, then Lead",
    copy: "Owned the apply flow and HELOC 0-to-1, then led AI & Marketing and exec-facing Gemini concepts.",
    image: "/2025.jpg",
  },
  {
    id: "bay",
    year: "2026",
    title: "Moved to the Bay Area",
    copy: "A new chapter, building AI products.",
    image: "/2026.png",
  },
];

export const LOCATION = {
  from: { city: "Frisco", region: "Texas" },
  to: { city: "San Francisco", region: "California" },
};

/* ── 03 · Snippets ─────────────────────────────────────────────────────── */

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
          "Millions of customer data points, and every customer still saw the same experience. I led the strategy behind a need-based recommendation framework so the model could infer what someone needed right now before deciding what to show them.",
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
        metric: "Prototyped in under a week; used by leadership",
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
        metric: "9 archetypes classified by Gemini; APIs wired myself",
      },
      {
        id: "muesli",
        name: "Muesli",
        slug: "muesli",
        summary:
          "A private, local-first Mac dictation app with a lot going on under the hood. I redesigned onboarding and navigation so the first dictation felt easy, then translated the system into SwiftUI.",
        metric: "Shipped as an open-source pull request",
      },
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

/* ── 04 · Statements ───────────────────────────────────────────────────── */

export const STATEMENTS = [
  {
    id: "ambiguity",
    text: "I turn ambiguity into reality. Let me show you.",
    attr: "Sanjana Venkat",
    role: "The promise this portfolio is trying to keep",
    index: "The promise",
  },
  {
    id: "believe",
    text: "With good design, I want to meet users where they are — and also take them where they want to be.",
    attr: "Sanjana Venkat",
    role: "What I believe in",
    index: "What I believe in",
  },
  ...TESTIMONIALS.slice(0, 3).map(([text, attr, role], i) => ({
    id: `t${i}`,
    text: text.trim(),
    attr,
    role,
    index: attr,
  })),
];
