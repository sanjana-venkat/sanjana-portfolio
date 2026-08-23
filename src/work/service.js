/**
 * Apply & Self-service — the service design study.
 *
 * The film is the apply flow itself, on a phone, held through all four
 * sections. The refinance work runs inline in the last section, where it is
 * being discussed, rather than taking over the panel.
 */

export const SERVICE = {
  slug: "service-design",
  kicker: "Lead designer · Chase MyHome · Apply & self-service",
  title: "Designing Systems at Scale",
  lede: "Mapping complex customer journeys, workflows and backend systems, then using service design and testing to reduce friction and improve self-service at scale.",
  note: "5.5% increase in lead submit",

  films: {
    apply: {
      src: "/work/service/apply.mp4",
      poster: "/work/service/apply-poster.webp",
      label: "The apply flow — rebuilt around what people are willing to give, and when",
    },
  },

  sections: [
    {
      id: "framing",
      eyebrow: "Problem framing",
      title: "Two sides of the story",
      film: "apply",
      still: {
        src: "/work/service/journey.jpg",
        alt: "The journey from shopping through preliminary offer, choosing Chase, approval and closing",
        wide: true,
      },
      body: [
        "Holding both sides of the problem at once was what made a solution possible — one that doesn't feel like a bank selling loans.",
      ],
      cards: [
        {
          name: "The business needs",
          lines: [
            "Quality leads, on loans that actually work for the business.",
            "It is limited by how much customer data we can legally leverage, pre-fill and act on.",
            "And it needs to invest in digital rather than in more human advisors.",
          ],
        },
        {
          name: "The customer needs",
          lines: [
            "This is a once-in-a-lifetime financial commitment; they need to trust the bank and expect a long relationship.",
            "They need the best rate and a personalised offer to decide at all.",
            "And they need help understanding the process and what to expect.",
          ],
        },
      ],
      beats: [
        {
          name: "Where they left",
          copy: "Drop-offs clustered on employment, the review page, co-applicant info — and, surprisingly, the landing page itself. Did customers ever intend to apply?",
        },
        {
          name: "Why they left",
          copy: "Exit surveys said it plainly. They wanted rates before applying. They read applying as commitment and didn't want a hard credit pull. And the process asked for too much, too early, including SSN, without explaining why.",
        },
      ],
    },

    {
      id: "research",
      eyebrow: "Research",
      title: "Only ask for information after someone has felt real value",
      film: "apply",
      still: {
        src: "/work/service/voices.jpg",
        alt: "Customer research quotes about credit concerns and needing to understand before committing",
        wide: true,
      },
      body: [
        "A one-week discovery workshop — empathy mapping, a prioritisation matrix, assumption mapping — ending in high-level concepts. Then customer research into the habits and anxieties underneath: credit concerns, the need to be educated before deciding, the importance of value before commitment.",
        "Customers expect Chase to already know them. To have their data, to give them the right pricing, to pre-fill what it can, so they know what they're getting into before they apply.",
      ],
      questions: {
        label: "What they were actually asking",
        items: [
          "Is this the right time? Is this the best rate for me?",
          "Why Chase? What do they offer? What do they know about my home?",
          "What's the process? Is it easy? What can I expect if I need help?",
        ],
      },
    },

    {
      id: "blueprint",
      eyebrow: "Service design",
      title: "What runs behind the scenes",
      film: "apply",
      still: {
        src: "/work/service/blueprint.jpg",
        alt: "The service design blueprint mapping frontend, backend, advisor and data implications",
        wide: true,
      },
      body: [
        "I kept hearing “that's not feasible.” So I took the time to map it: every backend implementation, every service, the advisor's side, and the downstream data implications.",
        "The blueprint became a living document rather than a deliverable — the thing the team used to find opportunities and close gaps.",
        "Once I understood the backend, I could design the journey. Considering both sides, I proposed self-service for the business, with guardrails for support if and when customers need it.",
      ],
      pull: "“It makes me feel like I don't have to provide this information… I'm applying for a loan from Chase, so they should already have it. It shows that they're professional, and it makes things quicker.”",
    },

    {
      id: "solution",
      eyebrow: "0-to-1 solution",
      title: "Empowering with ease of application",
      film: "apply",
      still: {
        video: "/work/service/refinance.mp4",
        alt: "The employment step, reduced from a full form to a status and optional details",
      },
      body: [
        "All the granular changes that lifted submit rate, reduced drop-offs, and quieted the fears people brought with them.",
      ],
      beats: [
        {
          name: "Less asked, at the worst page",
          copy: "Employment was the highest drop-off page — we were asking for company address. Stripped back to employment status and optional details, with a note that you can estimate or skip.",
        },
        {
          name: "Soft credit, and SSN with a purpose",
          copy: "I influenced the product decision to move to a soft credit check. SSN is now asked only if you say yes to it, rather than arriving as the fourth question of the flow.",
        },
        {
          name: "Clarity about what “apply” means",
          copy: "Goal-based Apply buttons instead of “Get started,” an explanation of why each thing is asked and how it helps, and a tone that understands the customer rather than interrogates them.",
        },
        {
          name: "Toward fully digital fulfilment",
          copy: "Better third-party integration for real-time document and task updates, and read-only documents combined into a single task with a preview and a count — one thing to do instead of nine.",
        },
      ],
    },
  ],

  reflection: {
    eyebrow: "Impact",
    title: "What moved",
    body: "The HELOC rate tool launched alongside this, so people could see an estimated rate, their eligibility, and a preview of options tailored to them before applying.",
    still: {
      src: "/work/service/team.jpg",
      alt: "The team at the whiteboard",
    },
    points: [
      {
        name: "5.5% increase in lead submit",
        copy: "Measured after the apply flow changes went out.",
      },
      {
        name: "Credit concerns fell",
        copy: "Exit surveys reported materially lower anxiety about the credit pull — the fear we designed against, showing up in the data.",
      },
      {
        name: "208 leads from the rate tool",
        copy: "3.1k visits on a 10% split, with 43 applications.",
      },
    ],
  },
};
