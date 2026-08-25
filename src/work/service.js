/**
 * Apply & Self-service.
 *
 * The writing is Sanjana's, from the case study. Blocks are in her order, and
 * each screen sits under the paragraph it belongs to. The 0-to-1 solution is
 * three sections because she wrote it as three — engaging with rates,
 * empowering with ease, efficient fulfilment.
 */

export const SERVICE = {
  slug: "service-design",
  kicker: "Lead designer · Apply & self-service",
  title: "Apply & Self-service",
  lede: "Mapping complex customer journeys, workflows, and backend systems. Used service design and testing to reduce friction and improve self-service experiences at scale.",

  films: {
    apply: {
      src: "/work/service/apply.mp4",
      poster: "/work/service/apply-poster.webp",
      aspect: "650 / 1304",
      label: "The apply flow",
    },
  },

  sections: [
    {
      id: "framing",
      eyebrow: "Problem framing",
      title: "Two sides of the story",
      film: "apply",
      blocks: [
        { p: "When we considered both sides of the problem, we were able to bridge the needs into an optimal solution for both the business and customers so it doesn't feel like a bank selling loans." },
        {
          cards: [
            {
              name: "Business side",
              lines: [
                "Quality leads: make revenue with customers loans that will benefit the business",
                "Technology: limited by how much data about our customers we can leverage, pre-fill and suggest",
                "Cost-effective: we need to invest more in digital solutions than humans (Home Lending Advisors)",
              ],
            },
            {
              name: "Customer side",
              lines: [
                "Financial commitment: this is a huge, once-in-a-lifetime financial commitment, customers need to trust the bank and have a long-term relationship",
                "Best deals: customers need to get the best rates, personalized offers to make the right decision",
                "Support & guidance: customers need help figuring out the process, what to expect, etc.",
              ],
            },
          ],
        },
        { h: "Insights", p: "Significantly high drop-offs on other pages notably employment, review page, co-applicant info, and surprisingly the landing page. Did customers not intend to apply? Analyzing exit surveys, we were able to see why customers dropped after clicking apply." },
        { h: "Rates before apply", p: "See numbers, offers, and the best rate they can be financially confident" },
        { h: "Applying = commitment", p: "Customers don't want a hard credit pull. Purchase customers are looking for preapproval" },
        { h: "Too much info & SSN", p: "The process of loan fulfillment is unclear and customers don't get why things are asked" },
      ],
    },

    {
      id: "research",
      eyebrow: "Research",
      title: "Into the customer's mind",
      film: "apply",
      blocks: [
        { h: "1-Week Discovery Workshop", p: "We conducted a workshop to deeply understand the problem with empathy mapping, prioritization matrix and assumption mapping ending with high level design concepts." },
        { img: "/work/service/workshop.jpg", alt: "The discovery workshop", photo: true },
        { p: "Through customer research, we dived deep into these habits and anxieties such as credit concerns, need education before decision and importance of value before commitment." },
        { img: "/work/service/voices.jpg", alt: "What customers told us about rates, credit and commitment", wide: true },
        { img: "/work/service/journey-map.jpg", alt: "What customers said, mapped across the journey", wide: true },
        { h: "Only ask for info after customer has experienced real value", p: "Customers expect Chase to have their data and know about them to give the best pricing and pre-fill details so they know what they're getting into before applying." },
        {
          list: {
            items: [
              "Numbers — Is this the right time? Is this is the best rate for me?",
              "Personalized info — Why Chase? What do they offer? What do they know about my home?",
              "Information — What's the process? Is it easy? What can I expect? What if I need help?",
            ],
          },
        },
      ],
    },

    {
      id: "blueprint",
      eyebrow: "Service design",
      title: "What runs behind the scenes?",
      film: "apply",
      blocks: [
        { p: "I kept hearing “that's not feasible” so I took time to create a service design blueprint to map all the backend implementations, services, HLA side and data downstream implication. This now became a living breathing document to find opportunities and close gaps." },
        { img: "/work/service/blueprint.jpg", alt: "The service design blueprint", wide: true },
        { h: "Journey mapping", p: "Now that I understood the backend, I created a journey for a self-service experience. Considering both business and customers, I proposed self-service (for the business) but with guardrails for support IF and WHEN they need (for the customers)." },
        { img: "/work/service/journey.jpg", alt: "Shop, preliminary offer, choose Chase, approval, closing — and where the advisor steps in", wide: true },
      ],
    },

    {
      id: "rates",
      eyebrow: "0-to-1 solution",
      title: "Engaging with rates before applying",
      film: "apply",
      blocks: [
        { p: "We launched a new “HELOC rate tool” so that when customers apply, they can first see their estimated HELOC rate, eligibility for the product and a quick preview of loan option tailored to their information." },
        { img: "/work/service/heloc.jpg", alt: "Find your rate, see what a HELOC could look like, and what to do if there isn't one for you", wide: true },
        { quote: "“It makes me feel good. It makes me feel like I don't have to provide this information… I'm applying for a loan from Chase, so they should already have the information. It shows that they're professional, and it also makes things quicker”" },
        { quote: "“I thought that was great because it provided a quick snapshot... I also like the end summary because it was timely and told me what it would cover.”" },
      ],
    },

    {
      id: "solution",
      eyebrow: "0-to-1 solution",
      title: "Empowering with ease of application",
      film: "apply",
      blocks: [
        { p: "All the granular changes that led to improve in submit rate, reduced drop-offs and alleviated customer fears." },
        {
          dense: true,
          cards: [
            { name: "Clarity", lines: ["Intent of “Apply” is clear", "Explain why we ask & how info helps", "Reduce info asked in employment"] },
            { name: "Confidence", lines: ["You may skip questions or estimate — info is not final", "No hard credit check", "Only ask for SSN during soft credit check"] },
            { name: "Conversational", lines: ["Less interrogative and more about understanding customer's needs", "HLA will review with you and guide"] },
          ],
        },
        { h: "Powerful, goal-oriented", p: "We have mortgages for everyone's unique needs. Goal based clear “Apply” buttons rather than “Get started” so the intent of initiating apply is clear." },
        { img: "/work/service/myhome.jpg", alt: "Chase MyHome — ready to start, and a goal-based apply", wide: true },
        { h: "Set expectations and confidence", p: "Someone will help you after you apply. Less interrogative and more “simple” “easy” tone. Reducing redundant pages and re-framing address requirements." },
        { img: "/work/service/apply-screens.jpg", alt: "Buying a home, here's what to expect — and share what you can and we'll chat", wide: true },
        { h: "Less inputs", p: "Highest drop-off page because we even ask for company address. Stripped it down to just employment status and optional details." },
        { video: "/work/service/refinance.mp4", alt: "The employment step, reduced to status and optional details", photo: true },
        { h: "Soft credit, SSN with purpose", p: "Influenced product decision to change to soft credit check. SSN only IF you say yes to soft credit check rather than as the 4th question of the flow." },
        { img: "/work/service/credit.jpg", alt: "The SSN and credit-pull steps, reordered", wide: true },
        { h: "Info not final", p: "One of the high drop off pages reduced to most important info surfaced and rest hidden — “it's okay to miss some details”." },
        { img: "/work/service/final-check.jpg", alt: "The final check, and the confirmation", wide: true },
      ],
    },

    {
      id: "fulfilment",
      eyebrow: "0-to-1 solution",
      title: "Efficient loan fulfillment",
      film: "apply",
      blocks: [
        { p: "Setting the stage for eventually creating a fully digital self-service platform. Leveraging better third party integration to show automated real-time updates on documents and tasks. Reduced cognitive load of documents by combining all read-only documents into one task with preview and number of docs." },
        { img: "/work/service/progress.jpg", alt: "The progress tracker, and the tasks ready for you", wide: true },
      ],
    },
  ],

  reflection: {
    id: "impact",
    eyebrow: "Impact",
    title: "What moved",
    blocks: [
      { stat: "5.5%", p: "Increase in lead submit after apply flow changes" },
      { stat: "208 leads", p: "HELOC rate tool received 3.1k visits in 10% split with 43 apps" },
      { h: "Credit concerns", p: "Exit surveys reported lower concerns of credit pull." },
      { img: "/work/service/team.jpg", alt: "The team", photo: true },
    ],
  },
};
