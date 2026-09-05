/**
 * Home Lending Public Experience.
 *
 * The writing is Sanjana's, from the case study. Blocks are in her order, and
 * each image sits under the paragraph it belongs to.
 */

export const B2C = {
  slug: "b2c",
  shape: "phone",
  kicker: "Lead designer · Chase.com · Product strategy, data-driven design",
  title: "Home Lending Public Experience",
  lede: "Driving a 38% boost in conversions with need based segmentation.",

  films: {
    search: {
      src: "/work/b2c/search.mp4",
      poster: "/work/b2c/search-poster.webp",
      aspect: "640 / 1320",
      label: "The public home lending experience",
    },
  },

  sections: [
    {
      id: "data",
      eyebrow: "Data discovery",
      title: "High traffic — low conversion",
      film: "search",
      blocks: [
        { p: "We were given raw data showing conversion rates at different touch points. What story does this tell? People visit but don't convert." },
        { img: "/work/b2c/clicks.jpg", alt: "Touch points and number of visits across the public pages", wide: true },
        { p: "I created this simple visualization to show the market we are missing. This helped illustrate the conversion bottleneck impact up to leadership and secured over $10,000 in investment for Home Lending Public experience re-design." },
        { img: "/work/b2c/funnel.jpg", alt: "8M potential customers, 300k getting started, 1k applications initiated", wide: true },
        { h: "Deeper look at data", p: "Let's analyze the points of friction and the clicks to try to understand customer intent and needs" },
        { h: "KYC Flow", p: "“Start online” takes customers through an account creation flow with sensitive questions like SSN" },
        { h: "Clicks", p: "Top clicks were for miscellaneous actions like hamburger menu, sign-in. The most desired (rates) was 4th click which is 3 scrolls below" },
        { h: "Outdated design", p: "Over 800 public pages, lack of branding and 20+ CTAs with unclear pathways" },
        { img: "/work/b2c/old-page.jpg", alt: "The old public page, annotated" },
      ],
    },

    {
      id: "research",
      eyebrow: "Research",
      title: "Behind the numbers",
      film: "search",
      blocks: [
        { p: "Now to understand the customer perspective of this story, why do they drop, and more importantly — what are their needs?" },
        { h: "Scenario mapping", p: "Applying the four forces model, we tried to understand what would push customers out of renting and pull them into the attractive new home. However, habits and anxieties can outweigh this." },
        { img: "/work/b2c/scenario.jpg", alt: "Where they are, where they want to be — and the habits and anxieties in between", wide: true },
        { p: "Customers might not see the value of buying a new home if they're comfortable renting. Even if they do want to buy a new home, they might be anxious about certain factors." },
        { h: "Habits and anxieties", p: "Through customer research, we dived deep into these habits and anxieties such as credit concerns, need education before decision and importance of value before commitment." },
        { quote: "“I notice the apply button but I would definitely be spending more time in the learn before deciding to understand everything first”" },
        { quote: "“Just to understand the steps before I commit to clicking on the apply to buy button”" },
        { quote: "“I don't [feel ready] because I would want to consider my husband's finances as part of the loan and, um, we're still working over the next couple of months to get his credit to a better place”" },
        { h: "Competitor Analysis", p: "Competitors offered tailored resources and clear support for customers at every stage of the home buying journey, including prominent contact options. Rocket Mortgage stands out with more engaging and persuasive language." },
        { img: "/work/b2c/competitors.jpg", alt: "Competitor experiences — tailored resources, prominent contact options, persuasive language", wide: true },
        { h: "3-Day Design Workshop", p: "The design team led a workshop starting with blue sky thinking to get the group to step out of tech constraints, devise a clear vision to share with stakeholders and create a few designs to see our ideas live and plan the roadmap." },
        { img: "/work/b2c/workshop.jpg", alt: "The three-day design workshop", photo: true },
      ],
    },

    {
      id: "principles",
      eyebrow: "Principles",
      title: "Design values",
      film: "search",
      blocks: [
        { p: "We set the values for our new design grounding in customer's thoughts, feelings and actions to understand both what we want and what we don't want." },
        {
          dense: true,
          cards: [
            { name: "Think", lines: ["Chase is reliable and offers clear options that fit my needs. I can make an informed decision if I am ready.", "Not: I don't know where to look, I am confused and distracted. This is complicated."] },
            { name: "Feel", lines: ["Confident, reassured, and supported. Empowered to step into home ownership.", "Not: overwhelmed, anxious, or skeptical. Lose trust in Chase to help achieve home goals."] },
            { name: "Say", lines: ["“I know what to do, this looks easy to start”", "Not: “This is too complicated.” “I'm not sure what to do.”"] },
            { name: "Do", lines: ["Use tools, start an application, reach out for help.", "Not: leave the page, give up, or look elsewhere."] },
          ],
        },
      ],
    },

    {
      id: "strategy",
      eyebrow: "Strategy",
      title: "Need-based segmentation",
      film: "search",
      blocks: [
        { p: "This led us to create three customer segments based on needs and trust. We need to earn trust with early explorers, establish trust with rate shoppers, and keep trust with those ready to apply." },
        { img: "/work/b2c/segments.png", alt: "Early explorer, shopping and ready to apply", wide: true, bare: true },
        { h: "Ready to apply segment", p: "“Start online” might get clicks, but customers who are actually ready to apply will click “Apply to buy”. Value proposition “Our priority is you” with discounts and benefits to trust Chase." },
        { img: "/work/b2c/ready.jpg", alt: "The ready-to-apply experience", wide: true },
        { h: "Rates as decision point", p: "Rates was 4 scrolls below in the old page. New page has value (personalized) and rates in 1st scroll. Clear branding (colors, warm tone images, no illustrations) and powerful content to imbibe trust in Chase." },
        { img: "/work/b2c/rates.jpg", alt: "Rates moved into the first scroll, personalized", wide: true },
        { h: "Shopping segment", p: "Reduce CTA overload in new design with clear purposeful CTAs. Mortgage calculator and affordability calculator highlighted with HLA guide section." },
        { img: "/work/b2c/shopping.jpg", alt: "The shopping experience — calculators and the advisor guide", wide: true },
        { h: "Early explorer segment", p: "Top 3 action oriented educational articles rather than 7 hyperlinks. No sticky footer forcing customers to “Start online” and apply." },
        { img: "/work/b2c/explorer.jpg", alt: "The early explorer experience", wide: true },
      ],
    },
  ],

  reflection: {
    id: "impact",
    eyebrow: "Impact",
    title: "What happens after results?",
    blocks: [
      { stat: "38%", p: "Increase in lead initiate for variant CTA compared to control" },
      { stat: "−0.5%", p: "Reduced conversion in mobile — split flag issues and further investigation" },
      { p: "Based on data, we continued to make enhancements because we know that fixing the page doesn't fix the experience, so we continued momentum with more initiatives." },
      {
        list: {
          label: "Within a few sprints, we did it all",
          items: [
            "ECI cookie optimization for simple sign in for existing customer",
            "Unified calculator to replace outdated iFrame (inaccessible by AI crawlers, poor usability)",
            "Public design system for Home Lending in the new tech stack",
            "Multi-variant testing for L2 navigation and decommission old HL public pages (~100)",
            "Improve strategy for Paid Search, Paid Media and external aggregators",
          ],
        },
      },
      { img: "/work/b2c/sprints.jpg", alt: "Buy, refinance and HELOC pages, the public unified calculator, and the unified navigation", wide: true },
      { p: "With AI, we continue to evolve now building a search-optimized experience." },
    ],
  },
};
