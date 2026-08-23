/**
 * Intent-based recommendations.
 *
 * The writing is Sanjana's, from the case study. Blocks are in her order, and
 * each diagram sits under the paragraph it belongs to.
 */

export const RECSYS = {
  slug: "ai-personalization",
  shape: "phones",
  kicker: "Lead designer · Chase MyHome · Native mobile, product strategy, data science and research",
  title: "Intent-based recommendations",
  lede: "Years of customer data, but data alone couldn't answer “what does this customer actually need right now?” I led the strategy behind a need-based recommendation framework that helped AI infer user intent before deciding what experience to show.",

  films: {
    final: {
      image: "/work/recsys/hero.jpg",
      aspect: "1 / 1",
      label: "The intent-based experience",
    },
  },

  sections: [
    {
      id: "problem",
      eyebrow: "Business problem",
      title: "One-size fits all",
      film: "final",
      blocks: [
        { p: "We had millions of customer data points, but every customer still saw essentially the same experience." },
        { p: "CTR and Engagement on Chase MyHome was much lower than other tiles because we were recommending products instead of understanding customer intent." },
        { img: "/work/recsys/generic.jpg", alt: "Basic data going in, a generic message coming out", wide: true },
        {
          dense: true,
          cards: [
            { name: "40%", lines: ["Only 40% of customers who have a mortgage with Chase ever visit and engage with ChaseMyHome"] },
            { name: "2.06%", lines: ["The current click through rate (CTR) is much lower for Chase MyHome compared to other tiles"] },
            { name: "5%", lines: ["Out of 2M customers who have transacted (got a loan) with us, only 5% engaged with Chase MyHome 6 months prior to transaction"] },
          ],
        },
      ],
    },

    {
      id: "intent",
      eyebrow: "Research",
      title: "Why does intent matter?",
      film: "final",
      blocks: [
        { p: "Before recommendations, we wanted to understand how customers perceived personalization. The theme: people weren't asking for more marketing, they want us to understand their situation." },
        { quote: "“I got an email yesterday about lowering my payment to 5% but I got my rate during the pandemic of 3%. So I don't know what CMS you guys use, but you might want to be more targeted”" },
        { quote: "“I got a video from Chase that addressed me by my name which made me inclined to watch it. It makes you feel special, candid… My mortgage company took the time to make me a little video. In a world where there's no customer service left, it felt nice to see that”" },
        {
          h: "1-Day Discovery Workshop",
          p: "The design team led a workshop bringing together product, tech and marketing stakeholders. The business goal was to increase engagement into Chase My Home (CTR) and increase applications (Lead initiate rate)",
        },
        {
          h: "Problem Discovery",
          p: "We did assumption mapping exercise for desirability (do people want it/need it), feasibility (can we do it) and viability (will it result in long-term profit)",
        },
        {
          h: "Use Cases",
          p: "We narrowed down a few use cases to start with so the backend team can plan parameters for recommendation model",
        },
      ],
    },

    {
      id: "assumptions",
      eyebrow: "Research",
      title: "Assumption Mapping",
      film: "final",
      blocks: [
        { p: "Before building recommendations, we challenged every assumption around desirability, feasibility and business value. The goal wasn't to generate more messages. It was to make sure the system was making the right decision in the first place." },
        { img: "/work/recsys/desirability.jpg", alt: "Assumption mapping — desirability", wide: true },
        { img: "/work/recsys/assumptions.jpg", alt: "Assumption mapping — feasibility", wide: true },
        { img: "/work/recsys/viability.jpg", alt: "Assumption mapping — viability", wide: true },
      ],
    },

    {
      id: "framework",
      eyebrow: "Framework",
      title: "Response framework",
      film: "final",
      blocks: [
        { p: "At first, our thinking looked something like this. But two customers could look almost identical on paper while trying to accomplish completely different things." },
        { img: "/work/recsys/framework.jpg", alt: "Raw customer data — enough, or not enough, then generate a message", wide: true, bare: true },
        {
          h: "Currently, generic",
          p: "Let's say, John has a home and mortgage with Bank of America. But regardless of what we might know about John's home, we show one tile for all",
        },
        { img: "/work/recsys/current.jpg", alt: "Every customer routed through every product", wide: true },
        {
          h: "Now, relevant",
          p: "We use data and intelligence to predict relevant messaging. John has a good credit score and can qualify for offers since he has been doing his monthly payments on time",
        },
        { img: "/work/recsys/proposal.jpg", alt: "One customer, the product that fits the goal", wide: true },
        {
          h: "But what if John doesn't want to refinance?",
          p: "What if John wants to get cash and HELOC is better? Or pay off mortgage sooner so he can retire? Or buy a second home because he wants an investment property?",
        },
        { p: "If we only market a rate & term refinance to this customer based on data 30 days ago, they might be high propensity for refinance but still not click on it due to different goals. To be timely and goal-oriented, we proposed a dynamic approach to personalization." },
        { pull: "What if we tracked recent data and behavioral indicators that indicate intent and show dynamic tiles to understand customers' needs rather than only selling one product like refinance?" },
      ],
    },

    {
      id: "reasoning",
      eyebrow: "Reasoning layer",
      title: "Intent Classification Framework",
      film: "final",
      blocks: [
        { p: "The model shouldn't ask “who is John?” and gather all the data. The model should ask, “what is John trying to accomplish today?”" },
        { img: "/work/recsys/sonar.jpg", alt: "The SONAR model — signals in, a classified need out" },
        { p: "Rather than organizing recommendations around products, I organized them around customer needs. Each need mapped to readiness signals, available data and an appropriate messaging strategy." },
        { img: "/work/recsys/offer.jpg", alt: "Timely and relevant — an estimated home purchase price, and low down payment options" },
      ],
    },

    {
      id: "roadmap",
      eyebrow: "Roadmap & prioritization",
      title: "Operationalizing the framework",
      film: "final",
      blocks: [
        { p: "The proposal became our north star, and for now based on customer segments, existing and new data features in the SONAR model we created 6 use cases for MVP." },
        { img: "/work/recsys/roadmap.jpg", alt: "The six MVP use cases, their landing pages, value drivers and data features", wide: true },
        { p: "For the top decile customers (ready to apply), we had most data on as they had a mortgage and were buying their second home (common use case) or refinancing. The last two use cases were for nurturing our low decile customers (explorers) to improve return rate and engagement." },
      ],
    },
  ],

  reflection: {
    id: "validation",
    eyebrow: "Validation",
    title: "Validating decision framework",
    blocks: [
      { p: "Utility score analysis: When it comes to how much customers care about their choice, images stand out. Customers don't just pick these two more often, they feel much more strongly about their preference for them compared to the rest. The higher utility scores (1.7 and 1.36) show that these images spark real enthusiasm, while others lag behind or even get negative reactions." },
      { img: "/work/recsys/utility.jpg", alt: "Image ranking by utility scores", wide: true },
      { p: "It's all about picking the best mix. If we just use images 5 and 7, we reach about 42% of customers. But when we add Images 10 and 6 to the lineup, our reach jumps to 74%. By optimizing the image selection based on customers' first choice, we can connect with as many people as possible." },
      { img: "/work/recsys/ctr.jpg", alt: "The selection of images that reaches the most customers — 75.3% cumulative", wide: true },
      { h: "Family and togetherness", p: "“They center the family and they reflect myself and when I think of the driving factor to own a home I think of my family eating in the kitchen, running in the yard, and creating memories.”" },
      { h: "Relatability and life stage", p: "“I relate to images as they portray my personal life. For example, I am married so I liked the beautiful couple.” And against it: “I don't have children so I can't really connect to any pictures with them.”" },
      { h: "Stock photography reads as false", p: "“Least preferred the images that felt posed and had a stock photography nature. These felt inauthentic and like models on a set rather than a real family I could relate to.”" },
    ],
  },
};
