/**
 * Home Lending Public Experience — the chase.com side of the story.
 *
 * One film, a recording of the public search experience, running the whole way
 * through. The argument is about one surface, so there is nothing to cut to.
 */

export const B2C = {
  slug: "b2c",
  shape: "wide",
  kicker: "Lead designer · Chase.com · Product strategy, data-driven design",
  title: "Home Lending Public Experience",
  lede: "Millions of people arrived and almost none of them converted. I led the redesign around what customers actually needed at each stage, rather than around the products we wanted to sell.",
  note: "38% increase in lead initiate",

  films: {
    search: {
      src: "/work/b2c/search.mp4",
      poster: "/work/b2c/search-poster.webp",
      label: "The public home lending experience",
    },
  },

  sections: [
    {
      id: "data",
      eyebrow: "Data discovery",
      title: "High traffic, low conversion",
      film: "search",
      still: {
        src: "/work/b2c/funnel.jpg",
        alt: "Eight million potential customers narrowing to three hundred thousand and then to one thousand applications",
        wide: true,
      },
      body: [
        "We were handed raw conversion numbers at different touch points and asked what to do about them. The more useful question was what story they told. People were visiting in enormous numbers and not converting.",
        "I made one simple visualisation of the market we were missing. That single artefact carried the bottleneck up to leadership and secured over $10,000 of investment for the redesign.",
      ],
      beats: [
        {
          name: "The KYC wall",
          copy: "“Start online” dropped customers into an account-creation flow with sensitive questions like SSN — before they had any reason to trust us with them.",
        },
        {
          name: "Eight hundred pages, twenty-plus CTAs",
          copy: "The public experience had grown without branding or a clear pathway through it. Everything was available and nothing was obvious.",
        },
        {
          name: "The thing they wanted was buried",
          copy: "Top clicks were the hamburger menu and sign-in. Rates — what people actually came for — was the fourth click, three scrolls down.",
        },
      ],
    },

    {
      id: "research",
      eyebrow: "Research",
      title: "Behind the numbers",
      film: "search",
      still: {
        src: "/work/b2c/voices.jpg",
        alt: "Research quotes from customers about needing to learn before deciding",
        wide: true,
      },
      body: [
        "Applying the four forces model, we looked at what pushes customers out of renting and pulls them toward a new home — and found that habits and anxieties routinely outweigh both.",
        "Through customer research we went into those anxieties: credit concerns, the need to be educated before deciding, and the importance of seeing value before making any commitment.",
      ],
      pull: "“I notice the apply button, but I would definitely be spending more time in the learn-before-deciding to understand everything first.”",
      questions: {
        label: "What competitors were already doing",
        items: [
          "Tailored resources for each stage of the home buying journey",
          "Prominent, unembarrassed contact options at every step",
          "Language that persuades rather than merely informs",
        ],
      },
    },

    {
      id: "principles",
      eyebrow: "Principles",
      title: "What we wanted people to think, feel and do",
      film: "search",
      still: {
        src: "/work/b2c/workshop.jpg",
        alt: "The three-day design workshop boards",
        wide: true,
      },
      body: [
        "We ran a three-day workshop, starting with blue-sky thinking to get the group out of the tech constraints, then narrowing to a vision we could take to stakeholders.",
        "The design values came out of it grounded in the customer's own thoughts, feelings and actions — stated as what we wanted, and just as explicitly as what we didn't.",
      ],
      cards: [
        {
          name: "Think",
          lines: [
            "Chase is reliable and offers clear options that fit my needs. I can make an informed decision if I'm ready.",
            "Not: I don't know where to look, I'm confused and distracted, this is complicated.",
          ],
        },
        {
          name: "Feel",
          lines: [
            "Confident, reassured and supported. Empowered to step into home ownership.",
            "Not: overwhelmed, anxious or skeptical, losing trust that Chase can help.",
          ],
        },
        {
          name: "Do",
          lines: [
            "Use the tools, start an application, reach out for help.",
            "Not: leave the page, give up, or look elsewhere.",
          ],
        },
      ],
    },

    {
      id: "strategy",
      eyebrow: "Strategy",
      title: "Need-based segmentation",
      film: "search",
      still: {
        src: "/work/b2c/segments.jpg",
        alt: "Three segments: early explorer, shopping, ready to apply",
        wide: true,
      },
      body: [
        "Three segments, defined by need and by how much trust we had already earned. We had to earn trust with early explorers, establish it with rate shoppers, and keep it with the people ready to apply.",
      ],
      beats: [
        {
          name: "Ready to apply",
          copy: "“Start online” gets clicks, but people who are genuinely ready click “Apply to buy.” The value proposition — our priority is you — leads with discounts and benefits rather than with a form.",
        },
        {
          name: "Shopping",
          copy: "CTA overload cut down to a few purposeful ones. The mortgage and affordability calculators promoted, with an advisor guide alongside them. Rates moved from three scrolls down into the first screen, personalised.",
        },
        {
          name: "Early explorer",
          copy: "Three action-oriented articles instead of seven hyperlinks, and no sticky footer pushing people to start an application they aren't ready for.",
        },
      ],
    },
  ],

  reflection: {
    eyebrow: "Impact",
    title: "38%, and what came after",
    body: "A 38% increase in lead initiate for the variant against control. Mobile went the other way by half a percent — a split-flag issue we kept investigating rather than quietly rounding away.",
    still: {
      src: "/work/b2c/before-after.jpg",
      alt: "The old page and the new one side by side",
      wide: true,
    },
    points: [
      {
        name: "Fixing the page doesn't fix the experience.",
        copy: "We kept going: cookie optimisation for existing-customer sign-in, a unified calculator replacing an inaccessible iframe, and a public design system for Home Lending in the new stack.",
      },
      {
        name: "Then we took out the rest.",
        copy: "Multi-variant testing on the L2 navigation, roughly a hundred old public pages decommissioned, and a better strategy for paid search, paid media and external aggregators.",
      },
    ],
  },
};
