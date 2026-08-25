/**
 * Case studies, as data.
 *
 * A case study is four sections, because the kolam is drawn in four strokes and
 * the drawing is the progress bar. Each section names the prototype that should
 * be playing beside it; consecutive sections naming the same one leave it
 * alone, so the film only changes when the story does.
 *
 * Everything a section can hold — a still, a set of cards, a list of questions,
 * a run of beats — is optional. A section that only wants prose only writes
 * prose.
 */

import { B2C } from "./b2c";
import { CASEY } from "./casey";
import { MUESLI } from "./muesli";
import { OUTDONE } from "./outdone";
import { RECSYS } from "./recsys";
import { SERVICE } from "./service";

export const AI_SEARCH = {
  slug: "ai-chat-journeys",
  kicker: "Designer · Visionary concepts, executive leadership pitch",
  title: "AI Search Interfaces",
  lede: "As ChatGPT and Gemini become the first place people ask financial questions, I explored what the model should do, how to move people to action, what should stay inside trusted banking systems.",

  films: {
    chatgpt: {
      src: "/work/ai-search/chatgpt.mp4",
      poster: "/work/ai-search/chatgpt-poster.webp",
      aspect: "698 / 1418",
      label: "ChatGPT prototype",
    },
    gemini: {
      src: "/work/ai-search/gemini.mp4",
      poster: "/work/ai-search/gemini-poster.webp",
      aspect: "698 / 1418",
      label: "Gemini prototype",
    },
  },

  sections: [
    {
      id: "shift",
      eyebrow: "Problem",
      title: "The shift",
      film: "chatgpt",
      blocks: [
        { p: "Customers aren't starting financial journeys in banking apps anymore. They're asking ChatGPT and Gemini first. So instead of asking \u201cHow do we build another AI assistant?\u201d" },
        { p: "I started asking: What should the model answer? What information should it gather? When should it recommend? When should it ask another question? When should it hand off to Chase?" },
        { p: "That became the framework for every concept." },
        { img: "/work/ai-search/hero-phones.jpg", alt: "The Chase assistant, a Gemini conversation, and a ChatGPT offer summary", photo: true },
        { pull: "How might we define the right role for AI in high-trust financial decisions without interrupting the conversation?" },
      ],
    },

    {
      id: "principles",
      eyebrow: "Principles",
      title: "Search should be action-oriented",
      film: "chatgpt",
      blocks: [
        { p: "Users aren't just looking for information, they also want to do something with it. AI changes search from navigation to execution." },
        { p: "Experiences should feel like a natural extension of AI interfaces, fitting seamlessly into the conversation flow and UI." },
        { p: "It should be aware of context, supporting and anticipating user intent. Responses and UI should feel individually relevant." },
        {
          cards: [
            { name: "Intent", lines: ["Model shouldn't immediately answer.", "First understand what the customer is trying to accomplish."] },
            { name: "AI's boundaries", lines: ["AI shouldn't do everything.", "The goal is knowing when AI should answer and when trusted banking systems should take over."] },
            { name: "Closer to action", lines: ["Each interaction should focus on a single action or outcome.", "Recommendations are only useful to take users to the next step."] },
          ],
        },
        { img: "/work/ai-search/workshop-board.jpg", alt: "Sorting tasks into what humans should do and what AI should do", wide: true },
        {
          list: {
            label: "Questions we kept asking",
            items: [
              "When should AI answer versus ask another question?",
              "When should AI continue the conversation versus hand off?",
              "What information is enough before recommending an action?",
              "How do we keep trust while reducing friction?",
            ],
          },
        },
      ],
    },

    {
      id: "chatgpt",
      eyebrow: "Model behavior",
      title: "Why ChatGPT?",
      film: "chatgpt",
      blocks: [
        { p: "The entire flow relies on user-owned documents, public data, and existing relationships, making it both realistic and low-risk to complete inside an AI interface." },
        { h: "Fixing a real, time-sensitive gap", p: "When buyers need a lower pre-approval letter while actively house shopping (often on weekends), ChatGPT updates the letter instantly which is a task HLAs can't handle in real time and current Chase app doesn't support digitally" },
        { h: "Making the offer smarter", p: "Using public neighborhood and market data, ChatGPT explains why lowering the pre-approval can improve offer strength, then evaluates the likelihood of acceptance and recommends tactics like an escalation clause" },
        { h: "Executing without friction", p: "ChatGPT drafts the escalation clause and offer letter and sends it to the HLA or realtor using existing contacts, turning search-time intent into immediate action without leaving ChatGPT." },
      ],
    },

    {
      id: "gemini",
      eyebrow: "Model behavior",
      title: "Why Gemini?",
      film: "gemini",
      blocks: [
        { p: "Gemini supports exploration; Chase owns execution. Together, they show how AI search can safely evolve into real financial action. So the handoff is a trust decision." },
        { img: "/work/ai-search/handoff.png", alt: "Explore, execute, and the edge cases", wide: true, bare: true },
        { h: "Starting with curiosity", p: "Gemini is good at helping people explore. Someone can upload a photo of a home, ask questions naturally, and connect that conversation to broader financial goals before deciding to take action." },
        { h: "A deliberate shift to a trusted system", p: "When the task requires private financial data, Gemini hands off to the Chase app, which we reimagined as a conversational AI experience for all banking needs." },
        { h: "Chase proactively turns interest into action", p: "Chase AI analyzes down payment readiness, suggests concrete actions to increase buying power, checks credit eligibility, prepares required documents, and schedules an advisor, all through conversation." },
      ],
    },
  ],

  reflection: {
    id: "reflection",
    eyebrow: "Reflection",
    title: "What did I learn?",
    blocks: [
      { p: "This wasn't an exercise in redesigning ChatGPT. It was a strategy sprint to answer a much harder question: what role should AI play in one of the biggest financial decisions of someone's life?" },
      { h: "AI is very valuable when it removes timing gaps.", p: "The biggest unlock wasn't smarter answers, but eliminating real-world delays (like weekend availability or manual processes)." },
      { h: "The future of search is accountable action.", p: "AI search only earns trust when it leads to clear next steps, ownership, and outcomes, not just recommendations." },
      { h: "Trust is a design boundary.", p: "Deciding when to stay inside an AI interface versus handing off to a secure system was a core UX decision." },
      { h: "Intent matters more than interface.", p: "Designing around what users are trying to accomplish. This creates more natural, scalable interaction patterns." },
      { img: "/work/ai-search/team.jpg", alt: "The team", photo: true },
    ],
  },
};

export const CASE_STUDIES = {
  [AI_SEARCH.slug]: AI_SEARCH,
  [B2C.slug]: B2C,
  [CASEY.slug]: CASEY,
  [MUESLI.slug]: MUESLI,
  [OUTDONE.slug]: OUTDONE,
  [RECSYS.slug]: RECSYS,
  [SERVICE.slug]: SERVICE,
};
