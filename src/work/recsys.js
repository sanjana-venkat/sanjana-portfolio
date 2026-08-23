/**
 * Intent-based recommendations.
 *
 * No prototype recording exists for this one, so the left panel holds stills
 * instead — and because they are stills, they can change with the argument.
 * The diagram beside you is the one being described: the current state, then
 * the proposal, then the model, then the thing a customer actually sees.
 */

export const RECSYS = {
  slug: "ai-personalization",
  shape: "plate",
  kicker: "Lead designer · Chase MyHome · Product strategy, data science, research",
  title: "Intent-based Recommendations",
  lede: "Years of customer data, and none of it answered “what does this customer actually need right now?” I led the strategy behind a need-based recommendation framework that helped the model infer intent before deciding what to show.",
  note: "17% CTR lift from the personalization model",

  films: {
    current: {
      image: "/work/recsys/current.jpg",
      label: "Current state — three different people, the same three products",
    },
    proposal: {
      image: "/work/recsys/proposal.jpg",
      label: "The proposal — one person, the product that fits what they're doing",
    },
    sonar: {
      image: "/work/recsys/sonar.jpg",
      label: "The reasoning layer — signals in, a classified need out",
    },
    tiles: {
      image: "/work/recsys/tiles.jpg",
      label: "What the customer sees — timely, and about their situation",
    },
  },

  sections: [
    {
      id: "problem",
      eyebrow: "Business problem",
      title: "One size fits all",
      film: "current",
      still: {
        src: "/work/recsys/generic.jpg",
        alt: "Basic data going in, a generic message coming out",
        wide: true,
      },
      body: [
        "We had millions of customer data points, and every customer still saw essentially the same experience. Click-through and engagement on Chase MyHome sat well below other tiles, because we were recommending products rather than understanding what someone was trying to do.",
      ],
      cards: [
        { name: "40%", lines: ["Of customers with a Chase mortgage ever visit and engage with Chase MyHome."] },
        { name: "2.06%", lines: ["Click-through rate, far below comparable tiles."] },
        { name: "5%", lines: ["Of the 2M customers who took a loan with us had engaged with MyHome in the six months before."] },
      ],
      cardsDense: true,
    },

    {
      id: "intent",
      eyebrow: "Research",
      title: "Why does intent matter?",
      film: "current",
      still: {
        src: "/work/recsys/ctr.jpg",
        alt: "Engagement and click-through analysis across tiles",
        wide: true,
      },
      body: [
        "Before building any recommendations we wanted to know how customers read personalization at all. The theme was consistent: people weren't asking for more marketing. They wanted us to understand their situation.",
      ],
      pull: "“I got an email about lowering my payment to 5%, but I got my rate during the pandemic at 3%. I don't know what system you're using, but you might want to be more targeted.”",
      questions: {
        label: "What the discovery workshop had to settle",
        items: [
          "Desirability — do people want this, and do they need it?",
          "Feasibility — can we actually build it with the data we're allowed to use?",
          "Viability — does it produce long-term profit, not just a click?",
        ],
      },
    },

    {
      id: "framework",
      eyebrow: "Framework",
      title: "Two customers can look identical and want opposite things",
      film: "proposal",
      still: {
        src: "/work/recsys/framework.jpg",
        alt: "The response framework — from generic messaging to relevant messaging",
        wide: true,
      },
      body: [
        "Say John has a home and a mortgage. He has a good credit score and has paid on time, so the data says refinance and we show him refinance.",
        "But what if John doesn't want to refinance? What if he wants cash, and a HELOC is the better instrument? Or wants to pay the mortgage off sooner so he can retire? Or wants a second home as an investment?",
        "If we market a rate-and-term refinance based on data from thirty days ago, he can be high-propensity and still never click, because his goal is somewhere else entirely.",
      ],
      pull: "What if we tracked recent behaviour that indicates intent, and showed dynamic tiles built around a customer's need rather than around the one product we want to sell?",
    },

    {
      id: "reasoning",
      eyebrow: "Reasoning layer",
      title: "Intent classification",
      film: "sonar",
      still: {
        src: "/work/recsys/offer.jpg",
        alt: "A timely and relevant offer card",
      },
      body: [
        "The model shouldn't ask “who is John?” and gather everything it can. It should ask what John is trying to accomplish today.",
        "So rather than organising recommendations around products, I organised them around customer needs. Each need mapped to its readiness signals, the data available to detect them, and an appropriate messaging strategy.",
        "The proposal became the north star, and we cut six use cases for an MVP out of it. The top decile — people ready to apply, buying a second home or refinancing — where we had the most data. The last two nurtured low-decile explorers, to bring them back at all.",
      ],
    },
  ],

  reflection: {
    eyebrow: "Validation",
    title: "Testing the decision, not just the design",
    body: "A utility score analysis on the imagery: customers don't merely pick certain images more often, they feel much more strongly about them. Two images scored 1.7 and 1.36 — real enthusiasm — while others lagged or drew negative reactions.",
    still: {
      src: "/work/recsys/hero.jpg",
      alt: "The personalized Chase MyHome experience across phones",
      wide: true,
    },
    points: [
      {
        name: "The mix matters more than the winner.",
        copy: "Two images alone reach about 42% of customers. Adding two more takes reach to 74%. Optimising on first choice is how you connect with the most people, not by picking a single favourite.",
      },
      {
        name: "People want to see their own life.",
        copy: "Family and togetherness, relatability to life stage, aspiration and milestone. “They reflect myself, and when I think of the driving factor to own a home I think of my family.”",
      },
      {
        name: "And they can smell a stock photo.",
        copy: "“Least preferred the images that felt posed… like models on a set rather than a real family I could relate to.” Inauthenticity reads as a lie about everything else, too.",
      },
    ],
  },
};
