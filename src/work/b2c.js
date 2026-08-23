/**
 * Home Lending Public Experience.
 *
 * The writing is Sanjana's, from the case study, unedited. The four sections
 * group her sections; they do not replace them.
 */

export const B2C = {
  slug: "b2c",
  shape: "wide",
  kicker: "Lead designer · Chase.com · Product strategy, data-driven design",
  title: "Home Lending Public Experience",
  lede: "Driving a 38% boost in conversions with need based segmentation.",

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
      title: "High traffic — low conversion",
      film: "search",
      assets: [
        { src: "/work/b2c/funnel.jpg", alt: "8M potential customers, 300k getting started, 1k applications initiated", wide: true },
        { src: "/work/b2c/clicks.jpg", alt: "Where the clicks actually went", wide: true },
        { src: "/work/b2c/old-page.jpg", alt: "The old public page, annotated" },
      ],
      body: [
        "We were given raw data showing conversion rates at different touch points. What story does this tell? People visit but don't convert.",
        "I created this simple visualization to show the market we are missing. This helped illustrate the conversion bottleneck impact up to leadership and secured over $10,000 in investment for Home Lending Public experience re-design.",
      ],
      beats: [
        {
          name: "KYC Flow",
          copy: "“Start online” takes customers through an account creation flow with sensitive questions like SSN",
        },
        {
          name: "Outdated design",
          copy: "Over 800 public pages, lack of branding and 20+ CTAs with unclear pathways",
        },
        {
          name: "Clicks",
          copy: "Top clicks were for miscellaneous actions like hamburger menu, sign-in. The most desired (rates) was 4th click which is 3 scrolls below",
        },
      ],
    },

    {
      id: "research",
      eyebrow: "Research",
      title: "Behind the numbers",
      film: "search",
      assets: [
        { src: "/work/b2c/voices.jpg", alt: "What customers said in research", wide: true },
        { src: "/work/b2c/workshop-room.jpg", alt: "The design workshop" },
      ],
      body: [
        "Now to understand the customer perspective of this story, why do they drop, and more importantly — what are their needs?",
        "Applying the four forces model, we tried to understand what would push customers out of renting and pull them into the attractive new home. However, habits and anxieties can outweigh this.",
        "Customers might not see the value of buying a new home if they're comfortable renting. Even if they do want to buy a new home, they might be anxious about certain factors.",
        "Through customer research, we dived deep into these habits and anxieties such as credit concerns, need education before decision and importance of value before commitment.",
      ],
      quotes: [
        "“I notice the apply button but I would definitely be spending more time in the learn before deciding to understand everything first”",
        "“Just to understand the steps before I commit to clicking on the apply to buy button”",
        "“I don't [feel ready] because I would want to consider my husband's finances as part of the loan and, um, we're still working over the next couple of months to get his credit to a better place”",
      ],
      beats: [
        {
          name: "Competitor Analysis",
          copy: "Competitors offered tailored resources and clear support for customers at every stage of the home buying journey, including prominent contact options. Rocket Mortgage stands out with more engaging and persuasive language.",
        },
        {
          name: "3-Day Design Workshop",
          copy: "The design team led a workshop starting with blue sky thinking to get the group to step out of tech constraints, devise a clear vision to share with stakeholders and create a few designs to see our ideas live and plan the roadmap.",
        },
      ],
    },

    {
      id: "principles",
      eyebrow: "Principles",
      title: "Design values",
      film: "search",
      assets: [
        { src: "/work/b2c/workshop.jpg", alt: "The design workshop boards", wide: true },
      ],
      body: [
        "We set the values for our new design grounding in customer's thoughts, feelings and actions to understand both what we want and what we don't want.",
      ],
      cards: [
        {
          name: "Think",
          lines: [
            "Chase is reliable and offers clear options that fit my needs. I can make an informed decision if I am ready.",
            "Not: I don't know where to look, I am confused and distracted. This is complicated.",
          ],
        },
        {
          name: "Feel",
          lines: [
            "Confident, reassured, and supported. Empowered to step into home ownership.",
            "Not: overwhelmed, anxious, or skeptical. Lose trust in Chase to help achieve home goals.",
          ],
        },
        {
          name: "Say",
          lines: [
            "“I know what to do, this looks easy to start”",
            "Not: “This is too complicated.” “I'm not sure what to do.”",
          ],
        },
        {
          name: "Do",
          lines: [
            "Use tools, start an application, reach out for help.",
            "Not: leave the page, give up, or look elsewhere.",
          ],
        },
      ],
      cardsDense: true,
    },

    {
      id: "strategy",
      eyebrow: "Strategy",
      title: "Need-based segmentation",
      film: "search",
      assets: [
        { src: "/work/b2c/segments.jpg", alt: "Early explorer, shopping and ready to apply segments", wide: true, bare: true },
        { src: "/work/b2c/ready.jpg", alt: "The ready-to-apply segment", wide: true },
        { src: "/work/b2c/shopping.jpg", alt: "The shopping segment", wide: true },
        { src: "/work/b2c/calculators.jpg", alt: "Calculators and the advisor guide", wide: true },
        { src: "/work/b2c/explorer.jpg", alt: "The early explorer segment", wide: true },
      ],
      body: [
        "This led us to create three customer segments based on needs and trust. We need to earn trust with early explorers, establish trust with rate shoppers, and keep trust with those ready to apply.",
      ],
      beats: [
        {
          name: "Ready to apply segment",
          copy: "“Start online” might get clicks, but customers who are actually ready to apply will click “Apply to buy”. Value proposition “Our priority is you” with discounts and benefits to trust Chase.",
        },
        {
          name: "Rates as decision point",
          copy: "Rates was 4 scrolls below in the old page. New page has value (personalized) and rates in 1st scroll. Clear branding (colors, warm tone images, no illustrations) and powerful content to imbibe trust in Chase.",
        },
        {
          name: "Shopping segment",
          copy: "Reduce CTA overload in new design with clear purposeful CTAs. Mortgage calculator and affordability calculator highlighted with HLA guide section.",
        },
        {
          name: "Early explorer segment",
          copy: "Top 3 action oriented educational articles rather than 7 hyperlinks. No sticky footer forcing customers to “Start online” and apply.",
        },
      ],
    },
  ],

  reflection: {
    eyebrow: "Impact",
    title: "What happens after results?",
    body: "Based on data, we continued to make enhancements because we know that fixing the page doesn't fix the experience, so we continued momentum with more initiatives.",
    assets: [
      { src: "/work/b2c/before-after.jpg", alt: "The old page and the new one", wide: true },
      { src: "/work/b2c/hero.jpg", alt: "The redesigned public experience across desktop and phone" },
    ],
    points: [
      {
        name: "38%",
        copy: "Increase in lead initiate for variant CTA compared to control. Mobile went the other way by 0.5% — split flag issues, and further investigation.",
      },
      {
        name: "Within a few sprints, we did it all",
        copy: "ECI cookie optimization for simple sign in for existing customers. Unified calculator to replace an outdated iFrame, inaccessible by AI crawlers and poor on usability. A public design system for Home Lending in the new tech stack.",
      },
      {
        name: "And kept going",
        copy: "Multi-variant testing for L2 navigation and decommission of old HL public pages (~100), and an improved strategy for Paid Search, Paid Media and external aggregators. With AI, we continue to evolve now building a search-optimized experience.",
      },
    ],
  },
};
