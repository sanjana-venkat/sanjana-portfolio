/*
 * Content for the landing canvas. Everything here is lifted from copy that
 * already existed elsewhere in the site (the hero, the "what I believe in"
 * bio, the animated timeline, and the testimonials in portfolioData.js) so the
 * redesign re-composes the portfolio rather than rewriting it.
 */

import { TESTIMONIALS } from "../data/portfolioData";

export const STAGES = ["Sanjana", "Story", "Snippets", "Statements"];

/* ── Persistent project shortcuts ──────────────────────────────────────── */

export const SELECTED_WORK = [
  {
    slug: "ai-personalization",
    name: "Intent-based recommendations",
    line: "A need-based framework so AI could infer intent before deciding what to show.",
    image: "/legacy/intent/01-ULRP0FZksJHUAfiiIvrdPTDdkE4.png",
  },
  {
    slug: "model-design",
    name: "Outdone",
    line: "Mood-first AI recommendations that turn how you feel into a plan you can follow.",
    image: "/outdone-preview.png",
  },
  {
    slug: "muesli",
    name: "Muesli",
    line: "Local-first Mac dictation, redesigned and shipped in SwiftUI.",
    image: "/muesli-preview.jpg",
  },
];

/* ── Stage 1 · Sanjana ─────────────────────────────────────────────────── */

export const INTRO = {
  name: "Sanjana",
  statement: "I turn ambiguity into reality. Let me show you.",
  role: "Product designer + builder designing AI interfaces, recommendation systems, and model behavior.",
  bio: "I studied psychology because I loved thinking about how people think. And that curiosity never left, it just found a new home in product design.",
};

export const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sanjana-venkat/", external: true },
  { label: "GitHub", href: "https://github.com/sanjana-venkat", external: true },
  { label: "Résumé", href: "/SanjanaVenkat_Design-Engineer_Resume1.pdf", external: true },
  { label: "Email", href: "mailto:sanjanavnkt20@gmail.com", external: false },
];

/* ── Stage 2 · Story ───────────────────────────────────────────────────── */

export const STORY_MOMENTS = [
  {
    id: "psychology",
    year: "2020",
    title: "UTD, Psychology & Design",
    copy: "Studied how people think, feel, and make decisions. The curiosity that started here never left.",
    image: "/2020.jpg",
  },
  {
    id: "design",
    year: "2021",
    title: "Chetna · Graphic Design",
    copy: "Dabbled into design, and raised $10K+ for South Asian mental health.",
    image: "/2021.jpg",
  },
  {
    id: "paycom",
    year: "2023",
    title: "Paycom · Associate Product Designer",
    copy: "B2B enterprise subteam, design system focus. A founding member of a brand new subteam.",
    image: "/2023.jpg",
  },
  {
    id: "jpmc",
    year: "2024 — 2025",
    title: "JPMorgan Chase · Senior, then Lead",
    copy: "Owned the apply flow and HELOC 0-to-1, then led AI & Marketing and exec-facing Gemini concepts.",
    image: "/2025.jpg",
  },
  {
    id: "bay-area",
    year: "2026",
    title: "Moved to the Bay Area",
    copy: "Frisco, Texas to San Francisco, California for a new chapter, building AI products.",
    image: "/2026.png",
  },
];

export const LOCATION_SHIFT = {
  from: { city: "Frisco", region: "Texas" },
  to: { city: "San Francisco", region: "California" },
};

/* ── Stage 3 · Snippets ────────────────────────────────────────────────── */

export const SNIPPET_SIDES = [
  {
    id: "nine-to-five",
    label: "9 to 5",
    copy: "Enterprise product design at JPMorgan Chase.",
    projects: ["Intent-based recommendations", "Casey conversational AI", "Agentic search experiences"],
  },
  {
    id: "five-to-nine",
    label: "5 to 9",
    copy: "Independent building, experiments, AI products, motion, and visual design.",
    projects: ["Outdone", "Muesli", "This portfolio, built in 2 days"],
  },
];

/** Snippet labels that map onto an existing case-study route. */
export const SLUG_BY_LABEL = {
  "Intent-based recommendations": "ai-personalization",
  "Casey conversational AI": "conversational-agentic-ai",
  "Agentic search experiences": "ai-chat-journeys",
  Outdone: "model-design",
  Muesli: "muesli",
};

export const CHAT_OPENER =
  "Ask me about my work, process, AI projects, or what I would bring to your team.";

/* ── Stage 4 · Statements ──────────────────────────────────────────────── */

export const STATEMENTS = [
  {
    id: "ambiguity",
    text: "I turn ambiguity into reality. Let me show you.",
    context: "The promise this whole portfolio is trying to keep",
  },
  {
    id: "meet-users",
    text: "With good design, I want to meet users where they are and also take them where they want to be.",
    context: "What I believe in",
  },
  {
    id: TESTIMONIALS[0] ? "bart" : "t0",
    text: TESTIMONIALS[0]?.[0]?.trim() ?? "",
    attribution: TESTIMONIALS[0]?.[1],
    context: TESTIMONIALS[0]?.[2],
  },
  {
    id: "williams",
    text: TESTIMONIALS[1]?.[0]?.trim() ?? "",
    attribution: TESTIMONIALS[1]?.[1],
    context: TESTIMONIALS[1]?.[2],
  },
  {
    id: "sonia",
    text: TESTIMONIALS[2]?.[0]?.trim() ?? "",
    attribution: TESTIMONIALS[2]?.[1],
    context: TESTIMONIALS[2]?.[2],
  },
].filter((statement) => statement.text);
