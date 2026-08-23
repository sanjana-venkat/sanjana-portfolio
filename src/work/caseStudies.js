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

export const AI_SEARCH = {
  slug: "ai-chat-journeys",
  kicker: "Visionary concepts · Executive leadership pitch",
  title: "AI Search Interfaces",
  lede: "As ChatGPT and Gemini become the first place people ask financial questions, I explored what the model should do, how to move people to action, and what should stay inside trusted banking systems.",

  films: {
    chatgpt: {
      src: "/work/ai-search/chatgpt.mp4",
      poster: "/work/ai-search/chatgpt-poster.webp",
      label: "ChatGPT prototype — lowering a pre-approval mid-negotiation",
    },
    gemini: {
      src: "/work/ai-search/gemini.mp4",
      poster: "/work/ai-search/gemini-poster.webp",
      label: "Gemini prototype — exploring a home, then handing off to Chase",
    },
  },

  sections: [
    {
      id: "shift",
      eyebrow: "Problem",
      title: "The shift",
      film: "chatgpt",
      still: {
        src: "/work/ai-search/hero-phones.jpg",
        alt: "Three phones: the Chase assistant, a Gemini conversation, and a ChatGPT offer summary",
      },
      body: [
        "Customers aren't starting financial journeys in banking apps anymore. They're asking ChatGPT and Gemini first. So instead of asking “How do we build another AI assistant?” I started asking a different set of questions.",
        "What should the model answer? What information should it gather? When should it recommend, and when should it ask another question? When should it hand off to Chase?",
        "That became the framework for every concept.",
      ],
      pull: "How might we define the right role for AI in high-trust financial decisions without interrupting the conversation?",
    },

    {
      id: "principles",
      eyebrow: "Principles",
      title: "Search should be action-oriented",
      film: "chatgpt",
      body: [
        "Users aren't just looking for information, they also want to do something with it. AI changes search from navigation to execution.",
        "Experiences should feel like a natural extension of AI interfaces, fitting into the conversation flow rather than interrupting it — aware of context, anticipating intent, individually relevant.",
      ],
      cards: [
        {
          name: "Intent",
          lines: [
            "Model shouldn't immediately answer.",
            "First understand what the customer is trying to accomplish.",
          ],
        },
        {
          name: "AI's boundaries",
          lines: [
            "AI shouldn't do everything.",
            "The goal is knowing when AI should answer and when trusted banking systems should take over.",
          ],
        },
        {
          name: "Closer to action",
          lines: [
            "Each interaction should focus on a single action or outcome.",
            "Recommendations are only useful to take users to the next step.",
          ],
        },
      ],
      still: {
        src: "/work/ai-search/workshop-board.jpg",
        alt: "Workshop boards sorting tasks into what humans should do and what AI should do",
        wide: true,
      },
      questions: {
        label: "Questions we kept asking",
        items: [
          "When should AI answer versus ask another question?",
          "When should AI continue the conversation versus hand off?",
          "What information is enough before recommending an action?",
          "How do we keep trust while reducing friction?",
        ],
      },
    },

    {
      id: "chatgpt",
      eyebrow: "Model behavior",
      title: "Why ChatGPT?",
      film: "chatgpt",
      body: [
        "The entire flow relies on user-owned documents, public data, and existing relationships, making it both realistic and low-risk to complete inside an AI interface.",
      ],
      beats: [
        {
          name: "Fixing a real, time-sensitive gap",
          copy: "When buyers need a lower pre-approval letter while actively house shopping — often on weekends — ChatGPT updates the letter instantly. That is a task advisors can't handle in real time, and the Chase app doesn't support digitally.",
        },
        {
          name: "Making the offer smarter",
          copy: "Using public neighborhood and market data, ChatGPT explains why lowering the pre-approval can improve offer strength, then evaluates the likelihood of acceptance and recommends tactics like an escalation clause.",
        },
        {
          name: "Executing without friction",
          copy: "ChatGPT drafts the escalation clause and offer letter and sends it to the advisor or realtor using existing contacts, turning search-time intent into immediate action without leaving ChatGPT.",
        },
      ],
    },

    {
      id: "gemini",
      eyebrow: "Model behavior",
      title: "Why Gemini?",
      film: "gemini",
      body: [
        "Gemini supports exploration; Chase owns execution. Together they show how AI search can safely evolve into real financial action. The handoff is a trust decision.",
      ],
      still: {
        src: "/work/ai-search/handoff.png",
        alt: "ChatGPT and Gemini explore, Chase executes, and the loan advisor takes the edge cases",
        wide: true,
        bare: true,
      },
      beats: [
        {
          name: "Starting with curiosity",
          copy: "Gemini is good at helping people explore. Someone can upload a photo of a home, ask questions naturally, and connect that conversation to broader financial goals before deciding to take action.",
        },
        {
          name: "A deliberate shift to a trusted system",
          copy: "When the task requires private financial data, Gemini hands off to the Chase app, which we reimagined as a conversational AI experience for all banking needs.",
        },
        {
          name: "Chase turns interest into action",
          copy: "Chase AI analyzes down payment readiness, suggests concrete actions to increase buying power, checks credit eligibility, prepares required documents, and schedules an advisor — all through conversation.",
        },
      ],
    },
  ],

  reflection: {
    eyebrow: "Reflection",
    title: "What did I learn?",
    body: "This wasn't an exercise in redesigning ChatGPT. It was a strategy sprint to answer a much harder question: what role should AI play in one of the biggest financial decisions of someone's life?",
    still: {
      src: "/work/ai-search/team.jpg",
      alt: "The team in front of a whiteboard covered in conversational UX notes",
    },
    points: [
      {
        name: "AI is most valuable when it removes timing gaps.",
        copy: "The biggest unlock wasn't smarter answers, but eliminating real-world delays like weekend availability or manual processes.",
      },
      {
        name: "The future of search is accountable action.",
        copy: "AI search only earns trust when it leads to clear next steps, ownership, and outcomes — not just recommendations.",
      },
      {
        name: "Trust is a design boundary.",
        copy: "Deciding when to stay inside an AI interface versus handing off to a secure system was a core UX decision.",
      },
      {
        name: "Intent matters more than interface.",
        copy: "Designing around what users are trying to accomplish creates more natural, scalable interaction patterns.",
      },
    ],
  },
};

export const CASE_STUDIES = { [AI_SEARCH.slug]: AI_SEARCH };
