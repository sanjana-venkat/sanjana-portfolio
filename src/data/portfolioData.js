export const CONTENT = {
  "Show data-driven design": `I led the redesign of chase.com’s home lending experience. It started with a funnel visualization I built. It showed leadership something simple but important:

We were missing a huge part of the market

That one artifact secured $10k+ in investment.

Then analyzing exit surveys, heat maps and extensive A/B testing we defined a design strategy with need-based segmentation`,

  "Tell me your story": `Here’s how it happened:

I joined Paycom as an Associate Product Designer and threw myself into the work completely. Not just doing my job, I became one of the founding members of a brand new subteam, helping build something from scratch while most people were still finding their footing.

Then out of nowhere, JPMC reached out. Turns out I had helped someone with a presentation at a conference I organized back in college, and that stuck with them. When they had an opening, they remembered.

I applied. I got the role. And they brought me in as a Senior Product Designer, a real bump, because of how I presented myself and my work.

From there, I moved fast. Required little to no guidance. Owned AI initiatives, set the foundation for the marketing design team, and built things that still run today. I learn by doing, and I do a lot.`,

  "How I think about AI systems": `i’ve shipped ai across multiple surfaces at jpmc

1. personalization model (home lending tiles)
- dynamically adapts content based on user signals
- resulted in a 17% ctr lift

2. casey ai
- ai calling agent built with bland ai
- handled 1000+ customer conversations
- answered mortgage questions and qualified leads

3. ai search integrations
- chatgpt + gemini surfaces for chase
- used by executive leadership to present future direction

for me, ai isn’t a feature

it’s about:
making systems more responsive
and reducing friction before humans step in`,

  "Design systems under constraints": `at jpmc,
i built a standardized atomic design template

it:
- reduced marketing velocity by 3 sprints
- required zero additional design or dev lift
- scaled across multiple use cases

at paycom,
i went beyond my project scope

i audited the entire component library and found:
- inconsistent spacing
- fragmented interaction states
- 40+ variants that could be simplified to 3

i proposed a full system redesign:
- 8pt spacing tokens
- shared state patterns
- prop-based components

that’s where i learned:
design systems aren’t just about consistency

they’re about making teams move faster`,

  "Product strategy thinking": `my biggest strength is framing the problem early

before anything gets designed,
i define what we’re actually solving

at jpmc,
i ran 3-day workshops with leadership

we’d go from:
“we need a redesign”

to:
- here’s the real problem
- here’s the data
- here’s the roadmap

i’ve used this approach across:
- ai personalization
- the apply flow
- public home lending

everything tied back to:
clear direction + measurable outcomes

i don’t just design solutions

i shape what gets built in the first place`,

  "How I get exec buy-in": `i design for the room, not just the screen

at jpmc,
we built chatgpt + gemini prototypes in under a week

the output wasn’t just a feature
it was a story

an executive leader used that work
to present to senior leadership

i also build market visualizations

one of them:
helped secure $10k+ in investment
for the home lending public redesign

when i present, i focus on:
- what the opportunity is
- why it matters
- what decision needs to be made

because good design doesn’t land
unless people understand it`
};

export const DATA_DRIVEN_REST = `
This work didn’t stop at segmentation.

One constraint was the design system wasn’t modern enough.

We aligned with leadership and got it onto the roadmap.

Today, that system is live and evolving.
`;

export const PILLS = [
  "Show data-driven design",
  "Tell me your story",
  "How I think about AI systems",
  "Design systems under constraints",
  "Product strategy thinking",
  "How I get exec buy-in"
];

export const NAV_ITEMS = ["my work", "what i'm good at", "resume", "contact"];

export const PROJECT_FOR_PILL = {
  "Show data-driven design": "chase-hl-public",
 "How I get exec buy-in": "demo-video",
  "How I think about AI systems": "ai-first-interfaces",
  "Product strategy thinking": "marketing-tiles",
  "Design systems under constraints": "chase-apply"
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
