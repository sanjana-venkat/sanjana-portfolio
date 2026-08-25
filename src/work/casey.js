/**
 * Casey AI — conversational re-engagement for customers who leave Apply.
 *
 * The demo stays pinned while the strategy moves from the operating problem,
 * through the agent model, to the customer re-engagement experience.
 */

export const CASEY = {
  slug: "conversational-agentic-ai",
  shape: "wide",
  kicker: "AI designer · Partnership with Bland AI",
  title: "Customer re-engagement\nConversational AI",
  lede: "When customers paused or exited an application with questions, concerns, or a need for more time or clarity, Casey re-engaged them with answers, proactive check-ins, and step-by-step guidance.",
  links: [
    { href: "https://www.bland.ai/", label: "Bland AI" },
  ],

  films: {
    demo: {
      src: "/work/casey/casey-demo.mp4",
      poster: "/work/casey/casey-poster.webp",
      aspect: "1920 / 1082",
      label: "Casey AI customer re-engagement prototype",
    },
  },

  sections: [
    {
      id: "problem",
      eyebrow: "01 · Context",
      title: "Advisors were managing systems instead of relationships",
      film: "demo",
      blocks: [
        { p: "Home lending advisors had to coordinate fragmented tools, create tasks, log calls, and track milestones across the application journey." },
        { p: "That administrative load pulled attention away from customers. Follow-up slowed, questions went unanswered, and leads could go cold before an advisor had time to respond." },
        { p: "The opportunity was to let AI agents handle repeatable coordination and outreach while advisors stayed focused on judgment, trust, and customer relationships." },
        { pull: "Automate the follow-up, not the relationship." },
      ],
    },

    {
      id: "system",
      eyebrow: "02 · Agent strategy",
      title: "Design the system around two kinds of agents",
      film: "demo",
      blocks: [
        { p: "A single agent can automate a task. An agentic system coordinates the process: understanding what happened, choosing the next action, and involving the right specialist or human." },
        { p: "For originations, we framed the system around two complementary roles." },
        {
          cards: [
            {
              name: "Lead generation agents",
              lines: [
                "Re-engage customers early in the application journey.",
                "Use proactive voice or text outreach, answer common questions, and schedule an advisor when needed.",
              ],
            },
            {
              name: "Task fulfillment agents",
              lines: [
                "Support customers after they apply.",
                "Review documents, draft responses, answer FAQs, and coordinate servicing or operations tasks.",
              ],
            },
          ],
        },
        { pull: "The advisor supervises the journey instead of manually operating every step." },
      ],
    },

    {
      id: "casey",
      eyebrow: "03 · Casey AI",
      title: "Re-engage customers at the moment intent starts to fade",
      film: "demo",
      blocks: [
        { p: "Casey was designed as a conversational outreach agent for customers who started Apply but did not finish." },
        { p: "Instead of treating every exit as abandonment, the experience recognizes that someone may have a question, need more time, or simply need the next step explained." },
        {
          list: {
            label: "Casey can",
            items: [
              "Reach out while the application context is still fresh.",
              "Answer common questions and resolve straightforward concerns.",
              "Share the right link or next step without making the customer start over.",
              "Bring in an advisor when the conversation needs human judgment.",
            ],
          },
        },
        { pull: "Re-engagement should feel like help continuing—not pressure to convert." },
      ],
    },

    {
      id: "response",
      eyebrow: "04 · Experience",
      title: "Turn the reason for leaving into the right next step",
      film: "demo",
      blocks: [
        { p: "The response strategy maps what the customer needs to what the agent should do next, so outreach is contextual instead of generic." },
        {
          cards: [
            {
              name: "Questions or concerns",
              lines: ["Answer directly, resolve what can be resolved, and make escalation clear when it cannot."],
            },
            {
              name: "More time",
              lines: ["Check in later without making the customer restart or repeat what they already shared."],
            },
            {
              name: "More clarity",
              lines: ["Explain the application step by step and keep the customer oriented inside the journey."],
            },
            {
              name: "Human handoff",
              lines: ["Carry context forward and involve an advisor when the conversation becomes personal, complex, or consequential."],
            },
          ],
          dense: true,
        },
        { pull: "AI keeps the journey moving. People stay responsible for the relationship." },
      ],
    },
  ],

  reflection: {
    id: "reflection",
    eyebrow: "Reflection",
    title: "The role changed from task management to orchestration",
    blocks: [
      { p: "This concept was not about replacing home lending advisors. It was about removing the fragmented work around them so they could spend more time on customer-facing decisions." },
      { p: "Partnering with Bland AI helped us make the strategy tangible as a working conversational prototype, not just a future-state service diagram." },
      { p: "The design challenge was deciding what the agent could handle independently, what context it needed to carry forward, and where a human should step in." },
    ],
  },
};
