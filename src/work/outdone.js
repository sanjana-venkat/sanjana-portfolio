/**
 * Outdone — Personalized Travel.
 *
 * One film runs the whole way through: the prototype is a single continuous
 * product, not two systems handing off to each other, so there is nothing to
 * cut to. The shape is "wide" because it was recorded in a browser.
 */

export const OUTDONE = {
  slug: "model-design",
  shape: "wide",
  kicker: "Designer · In collaboration with a DeepMind research engineer",
  title: "Outdone",
  lede: "Designed and built Outdone to make travel planning easier based on how you feel today — and to explore a bigger AI personalization question: how do we help models understand current intent, not just past preference?",
  note: "Presented at the Stanford × DeepMind hackathon, semi-finalist.",
  link: { href: "https://travel-dna-kohl.vercel.app/", label: "Try Outdone" },

  films: {
    outdone: {
      src: "/work/outdone/outdone.mp4",
      poster: "/work/outdone/outdone-poster.webp",
      label: "Outdone — mood to verified, bookable day plan",
    },
  },

  sections: [
    {
      id: "context",
      eyebrow: "Context",
      title: "From one bad recommendation to a bigger product question",
      film: "outdone",
      still: { src: "/work/outdone/plan.jpg", alt: "Outdone's opening screen — plan in seconds" },
      body: [
        "I approached Abishek, a research engineer at DeepMind, with a problem I kept hitting in Gemini. When I asked what to do in Las Vegas, it suggested an art museum because I'm a designer. It wasn't wrong. It just missed what I actually wanted that day.",
        "That became the insight behind Outdone: people are not always looking for what fits their profile. They are looking for what fits how they want to feel today.",
      ],
      pull: "How might we turn someone's mood and real-world constraints into a trusted, bookable trip plan?",
      beats: [
        {
          name: "Understand intent through mood",
          copy: "Nine travel interests, categorised from psychology and research, so a feeling becomes something the model can actually act on.",
        },
        {
          name: "Recommend, then verify",
          copy: "Google Places, Google Maps and Gemini wired together and tuned to weigh the right context, alongside Reddit, Instagram and verified sources.",
        },
        {
          name: "Organise it into a real day",
          copy: "Penalties and deterministic rules build an itinerary that survives contact with opening hours and travel time — and opens in Google Maps in one click.",
        },
      ],
    },

    {
      id: "signals",
      eyebrow: "Signals",
      title: "Context engineering the mood system",
      film: "outdone",
      still: { src: "/work/outdone/moods.jpg", alt: "The mood picker — what's the vibe today?" },
      body: [
        "People know they want to get out, slow down, or do something adventurous. They often don't know what activity to search for. Meanwhile recommendations lean on past behaviour and broadly popular places, and travel needs reasoning across time, distance, opening hours and transport.",
        "My psychology background and a lot of reading went into how moods could be grouped so each one gives Gemini a meaningfully different signal. Each has its own rules behind the interface: a behavioural definition, preferred activity patterns, and exclusions.",
      ],
      cardsDense: true,
      cards: [
        { name: "Adventurous", lines: ["High-adrenaline experiences, safety briefings, physical risk and novelty. Excludes gentle walks and casual hikes."] },
        { name: "Active", lines: ["Movement-led activities — hiking, kayaking, cycling, walking. Avoids sedentary recommendations."] },
        { name: "Slow and scenic", lines: ["Beautiful, quiet settings with minimal transit and maximum stillness. Excludes rushed or loud experiences."] },
        { name: "Cultural", lines: ["History, art, architecture and local meaning. Prioritises depth over covering many places."] },
        { name: "Culinary", lines: ["The day is organised around food, markets and local restaurants. Avoids tourist restaurants; treats diet as a strict constraint."] },
        { name: "Night-owl", lines: ["Starts late, and prioritises experiences that only become valuable after 6pm."] },
        { name: "Romantic", lines: ["Intimate, partner-focused experiences with beautiful light. Avoids loud, rushed or group places."] },
        { name: "Social", lines: ["Lively, group-friendly places with communal energy."] },
        { name: "Offbeat", lines: ["Specific, eccentric places someone wouldn't normally discover. Replaces anything generic."] },
      ],
    },

    {
      id: "architecture",
      eyebrow: "Systems thinking",
      title: "Model design architecture",
      film: "outdone",
      still: {
        src: "/work/outdone/architecture.jpg",
        alt: "The pipeline — collect, translate, ground, organise, deliver",
        wide: true,
      },
      body: [
        "The division of labour is the design decision. Gemini handles research, preference matching and qualitative judgement. Product logic handles hours, timing, routing and sequencing — the things that must be right rather than plausible.",
      ],
      beats: [
        {
          name: "Signal hierarchy",
          copy: "The model is explicitly told which context takes priority when signals conflict.",
        },
        {
          name: "Source diversification",
          copy: "Multiple research strategies reduce generic first-result recommendations and produce a more varied candidate set.",
        },
        {
          name: "Discovery versus verification",
          copy: "Community recommendations give local insight, but they are never treated as verified facts on their own.",
        },
        {
          name: "Explainability",
          copy: "The itinerary says why each place was selected, where it was discovered, whether it is practical at the proposed time, and how it fits the route.",
        },
      ],
    },

    {
      id: "design",
      eyebrow: "Design",
      title: "Making the wait part of the trip",
      film: "outdone",
      still: { src: "/work/outdone/waiting-game.jpg", alt: "The ring-flying game that plays while the itinerary is built" },
      body: [
        "Travel decisions are emotional, so the interface leans on large imagery and parallax. The destination stays present while recommendations and plans move around it, and the imagery makes each mood feel different rather than reading as a filter.",
        "Gemini and Places calls take a few seconds. I first filled that time with a loader narrating the research, on the theory that showing the work would build trust. Testing said otherwise — people had no patience for it.",
        "So the wait became a game. You fly through rings, and if you miss one you get a quiz question about the place you're travelling to.",
      ],
    },
  ],

  reflection: {
    eyebrow: "Next",
    title: "Where it goes",
    body: "Improving the model alone is hard to sell as a whole product. As a feature inside something like Ask Maps, it's much stronger.",
    still: { src: "/work/outdone/itinerary.jpg", alt: "A finished Outdone itinerary" },
    points: [
      {
        name: "Make it social.",
        copy: "Friends should be able to see and build on each other's itineraries — travel planning is rarely a solo activity, and the current product treats it as one.",
      },
      {
        name: "Book, don't link.",
        copy: "The next step is automated booking rather than sending people to links. That would make Outdone genuinely useful, and it would need partnerships, booking integrations and real investment behind it.",
      },
    ],
  },
};
