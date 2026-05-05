export const CONTENT = {
  "Show data-driven design": `
I led the redesign of chase.com’s home lending experience.

It started with a funnel visualization I built. It showed leadership something simple but important.

We were missing a huge part of the market.

That one artifact secured $10k+ in investment.

Then analyzing exit surveys, heat maps and extensive A/B testing we defined a design strategy with need-based segmentation.
`,

  "Tell me your story": `
Here’s how it happened:

I joined Paycom as an Associate Product Designer and threw myself into the work completely.

Not just doing my job, I became one of the founding members of a brand new subteam.

Then out of nowhere, JPMC reached out.

Turns out I had helped someone with a presentation at a conference I organized back in college, and that stuck with them.

I applied. I got the role.

And they brought me in as a Senior Product Designer.

From there, I moved fast. Owned AI initiatives and built things that still run today.
`,

  "How I think about AI systems": `
I’ve shipped AI across multiple surfaces at JPMC.

1. Personalization model (home lending tiles)
- dynamically adapts content based on user signals
- resulted in a 17% CTR lift

2. Casey AI
- conversational AI (call + text)
- enabled 1000+ customer calls

3. AI-first search
- explored Gemini + ChatGPT as decision layers

AI is only as strong as the system around it.
`
};

export const DATA_DRIVEN_REST = `
This work didn’t stop at segmentation.

One constraint was the design system wasn’t modern enough.

We aligned with leadership and got it onto the roadmap.

Today, that system is live and evolving.
`;

export const PILLS = Object.keys(CONTENT);
export { PILLS };

export const NAV_ITEMS = ["my work", "what i'm good at", "resume", "contact"];

export const PROJECT_FOR_PILL = {
  "Show data-driven design": "chase-hl-public",
  "Tell me your story": null,
  "How I think about AI systems": null
};

export const PROJECTS = {
  "chase-hl-public": {
    title: "Chase HL Public",
    subtitle: "Redesigning a high traffic, low conversion experience",
    metrics: [
      "38% increase in lead initiation",
      "30.9% increase in lead submission",
      "$10K+ investment secured"
    ]
  }
};


  export const TESTIMONIALS = [
  [
    "Sanjana is the best designer at Chase that I've worked with. She is proactive, thoughtful, eager to learn and produces ideas and designs at both a high quality and high volume, which is rare!",
    "Bart Piela",
    "Marketing/Public Executive Director"
  ],
  [
    "Your leadership, drive, and unwavering commitment have been nothing short of inspiring. You’ve been the champion behind so much of our progress.",
    "Williams Cavalcante",
    "CMH Design Lead"
  ],
  [
    "Sanjana has been instrumental in the Encompass build UX, providing solutions and quickly adjusting to our changing needs.",
    "Sonia Zacheo",
    "CMH Product VP"
  ],
  [
    "You jumped into the Apply world with both feet and I've loved exploring ways to improve our customers' experience.",
    "Andrew Kennerley",
    "Content VP"
  ]
];
