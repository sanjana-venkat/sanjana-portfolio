/**
 * Intent-based recommendations.
 *
 * The writing is Sanjana's, from the case study, unedited. The four sections
 * group her sections; they do not replace them, and nothing is dropped.
 *
 * No prototype recording exists for this one, so the left panel holds stills —
 * and because they are stills, they can change with the argument. The diagram
 * beside you is the one being described.
 */

export const RECSYS = {
  slug: "ai-personalization",
  shape: "plate",
  kicker: "Lead designer · Chase MyHome · Native mobile, product strategy, data science and research",
  title: "Intent-based recommendations",
  lede: "Years of customer data, but data alone couldn't answer “what does this customer actually need right now?” I led the strategy behind a need-based recommendation framework that helped AI infer user intent before deciding what experience to show.",

  films: {
    today: {
      image: "/work/recsys/tiles.jpg",
      label: "Chase MyHome today — the same tile for everyone",
    },
    current: {
      image: "/work/recsys/current.jpg",
      label: "Current state — every customer routed through every product",
    },
    proposal: {
      image: "/work/recsys/proposal.jpg",
      label: "The proposal — one customer, the product that fits the goal",
    },
    sonar: {
      image: "/work/recsys/sonar.jpg",
      label: "The SONAR model — signals in, a classified need out",
    },
  },

  sections: [
    {
      id: "problem",
      eyebrow: "Business problem",
      title: "One-size fits all",
      film: "today",
      still: {
        src: "/work/recsys/generic.jpg",
        alt: "Basic data going in, a generic message coming out",
        wide: true,
      },
      body: [
        "We had millions of customer data points, but every customer still saw essentially the same experience.",
        "CTR and Engagement on Chase MyHome was much lower than other tiles because we were recommending products instead of understanding customer intent.",
      ],
      cards: [
        {
          name: "40%",
          lines: [
            "Only 40% of customers who have a mortgage with Chase ever visit and engage with ChaseMyHome",
          ],
        },
        {
          name: "2.06%",
          lines: [
            "The current click through rate (CTR) is much lower for Chase MyHome compared to other tiles",
          ],
        },
        {
          name: "5%",
          lines: [
            "Out of 2M customers who have transacted (got a loan) with us, only 5% engaged with Chase MyHome 6 months prior to transaction",
          ],
        },
      ],
      cardsDense: true,
    },

    {
      id: "intent",
      eyebrow: "Research",
      title: "Why does intent matter?",
      film: "current",
      still: {
        src: "/work/recsys/assumptions.jpg",
        alt: "Assumption mapping across desirability, feasibility and viability",
        wide: true,
      },
      body: [
        "Before recommendations, we wanted to understand how customers perceived personalization. The theme: people weren't asking for more marketing, they want us to understand their situation.",
      ],
      quotes: [
        "“I got an email yesterday about lowering my payment to 5% but I got my rate during the pandemic of 3%. So I don't know what CMS you guys use, but you might want to be more targeted”",
        "“I got a video from Chase that addressed me by my name which made me inclined to watch it. It makes you feel special, candid… My mortgage company took the time to make me a little video. In a world where there's no customer service left, it felt nice to see that”",
      ],
      beats: [
        {
          name: "1-Day Discovery Workshop",
          copy: "The design team led a workshop bringing together product, tech and marketing stakeholders. The business goal was to increase engagement into Chase My Home (CTR) and increase applications (Lead initiate rate)",
        },
        {
          name: "Problem Discovery",
          copy: "We did assumption mapping exercise for desirability (do people want it/need it), feasibility (can we do it) and viability (will it result in long-term profit)",
        },
        {
          name: "Use Cases",
          copy: "We narrowed down a few use cases to start with so the backend team can plan parameters for recommendation model",
        },
        {
          name: "Assumption Mapping",
          copy: "Before building recommendations, we challenged every assumption around desirability, feasibility and business value. The goal wasn't to generate more messages. It was to make sure the system was making the right decision in the first place.",
        },
      ],
    },

    {
      id: "framework",
      eyebrow: "Framework",
      title: "Response framework",
      film: "proposal",
      still: {
        src: "/work/recsys/framework.jpg",
        alt: "The response framework — raw customer data, enough or not enough, generate message",
        wide: true,
        bare: true,
      },
      body: [
        "At first, our thinking looked something like this. But two customers could look almost identical on paper while trying to accomplish completely different things.",
      ],
      beats: [
        {
          name: "Currently, generic",
          copy: "Let's say, John has a home and mortgage with Bank of America. But regardless of what we might know about John's home, we show one tile for all",
        },
        {
          name: "Now, relevant",
          copy: "We use data and intelligence to predict relevant messaging. John has a good credit score and can qualify for offers since he has been doing his monthly payments on time",
        },
        {
          name: "But what if John doesn't want to refinance?",
          copy: "What if John wants to get cash and HELOC is better? Or pay off mortgage sooner so he can retire? Or buy a second home because he wants an investment property?",
        },
      ],
      body2: [
        "If we only market a rate & term refinance to this customer based on data 30 days ago, they might be high propensity for refinance but still not click on it due to different goals. To be timely and goal-oriented, we proposed a dynamic approach to personalization.",
      ],
      pull: "What if we tracked recent data and behavioral indicators that indicate intent and show dynamic tiles to understand customers' needs rather than only selling one product like refinance?",
    },

    {
      id: "reasoning",
      eyebrow: "Reasoning layer",
      title: "Intent Classification Framework",
      film: "sonar",
      still: {
        src: "/work/recsys/offer.jpg",
        alt: "A timely and relevant offer — an estimated home purchase price, and low down payment options",
      },
      body: [
        "The model shouldn't ask “who is John?” and gather all the data. The model should ask, “what is John trying to accomplish today?”",
        "Rather than organizing recommendations around products, I organized them around customer needs. Each need mapped to readiness signals, available data and an appropriate messaging strategy.",
      ],
      beats: [
        {
          name: "Operationalizing the framework",
          copy: "The proposal became our north star, and for now based on customer segments, existing and new data features in the SONAR model we created 6 use cases for MVP.",
        },
        {
          name: "Where we started",
          copy: "For the top decile customers (ready to apply), we had most data on as they had a mortgage and were buying their second home (common use case) or refinancing. The last two use cases were for nurturing our low decile customers (explorers) to improve return rate and engagement.",
        },
      ],
    },
  ],

  reflection: {
    eyebrow: "Validation",
    title: "Validating decision framework",
    body: "Utility score analysis: When it comes to how much customers care about their choice, images stand out. Customers don't just pick these two more often, they feel much more strongly about their preference for them compared to the rest. The higher utility scores (1.7 and 1.36) show that these images spark real enthusiasm, while others lag behind or even get negative reactions.",
    still: {
      src: "/work/recsys/ctr.jpg",
      alt: "The selection of images that reaches the most customers — 75.3% cumulative",
      wide: true,
    },
    points: [
      {
        name: "It's all about picking the best mix.",
        copy: "If we just use images 5 and 7, we reach about 42% of customers. But when we add Images 10 and 6 to the lineup, our reach jumps to 74%. By optimizing the image selection based on customers' first choice, we can connect with as many people as possible.",
      },
      {
        name: "Family and togetherness",
        copy: "“They center the family and they reflect myself and when I think of the driving factor to own a home I think of my family eating in the kitchen, running in the yard, and creating memories.”",
      },
      {
        name: "Relatability and life stage",
        copy: "“I relate to images as they portray my personal life. For example, I am married so I liked the beautiful couple.” And against it: “I don't have children so I can't really connect to any pictures with them.”",
      },
      {
        name: "Stock photography reads as false",
        copy: "“Least preferred the images that felt posed and had a stock photography nature. These felt inauthentic and like models on a set rather than a real family I could relate to.”",
      },
    ],
  },
};
