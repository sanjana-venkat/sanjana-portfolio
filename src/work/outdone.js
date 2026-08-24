/**
 * Outdone — Personalized Travel.
 *
 * The writing is Sanjana's, from the case study. One film runs the whole way
 * through: the prototype is a single continuous product, so there is nothing
 * to cut to.
 */

export const OUTDONE = {
  slug: "model-design",
  shape: "wide",
  kicker: "Designer · Collab DeepMind researcher",
  title: "Model Design — Outdone",
  lede: "Designed and built Outdone to make travel planning easier based on how you feel today. Also explore a bigger AI personalization question: how do we help models understand current intent, not just past preference?",
  note: "Presented in Stanford x Deepmind Hackathon and got up to semi-finalist",
  link: { href: "https://travel-dna-kohl.vercel.app/", label: "Try Outdone" },

  films: {
    outdone: {
      src: "/work/outdone/outdone.mp4",
      poster: "/work/outdone/outdone-poster.webp",
      aspect: "1360 / 812",
      label: "Outdone",
    },
  },

  sections: [
    {
      id: "context",
      eyebrow: "Context",
      title: "From one bad recommendation to a bigger product question",
      film: "outdone",
      blocks: [
        { p: "I approached Abishek, a research engineer in Deepmind, with a problem I faced in Gemini. The idea came from a simple frustration: when I asked Gemini what to do in Las Vegas, it suggested an art museum because I'm a designer. It was not wrong, but it missed what I actually wanted in that moment." },
        { img: "/work/outdone/team.jpg", alt: "Working the idea out on a whiteboard", photo: true },
        { p: "That became the core insight behind Outdone: people are not always looking for what fits their profile. They are looking for what fits how they want to feel today." },
        { pull: "How might we turn someone's mood and real-world constraints into a trusted, bookable trip plan?" },
      ],
    },

    {
      id: "tldr",
      eyebrow: "TLDR",
      title: "What we built",
      film: "outdone",
      blocks: [
        { p: "Abishek and I separated long-term preferences from current intent, turned moods into structured instructions and used Maps data for hard constraints like routing and opening hours." },
        { h: "Understand user intent with mood", p: "A way for categorizing moods into 9 travel interests based on psychology + research" },
        { h: "Provide personalized verified recommendations", p: "Wiring Google Places, Google Maps API, Gemini and fine tuning the model to prioritize the right context along with Reddit, Instagram and verified sources." },
        { h: "Organize selected places into a realistic day", p: "Penalties and rules for deterministic itinerary creation that gives full itinerary in Google Maps in one click" },
        { img: "/work/outdone/plan.jpg", alt: "Plan in seconds", wide: true },
      ],
    },

    {
      id: "signals",
      eyebrow: "Signals",
      title: "Context engineering the mood system",
      film: "outdone",
      blocks: [
        { p: "People know they want to get out, slow down or do something adventurous, but may not know what activity to search for. Recommendations often rely on past behavior and broadly popular places. Travel also requires reasoning across time, distance, opening hours and transportation." },
        { p: "My psychology background and extensive research helped me think through how moods can be categorized in different categories relevant to most travel interest." },
        { img: "/work/outdone/moods.jpg", alt: "What's the vibe today?", wide: true },
        { p: "I came up with 9 giving Gemini meaningfully different signals. Each mood had its own rules behind the interface: a behavioral definition, preferred activity patterns and exclusions." },
        {
          dense: true,
          cards: [
            { name: "Adventurous", lines: ["High-adrenaline experiences, safety briefings, physical risk and novelty. Exclude gentle walks and casual hikes."] },
            { name: "Active", lines: ["Movement-led activities such as hiking, kayaking, cycling and walking. Avoid sedentary recommendations."] },
            { name: "Slow and scenic", lines: ["Beautiful, quiet settings with minimal transit and maximum stillness. Exclude rushed or loud experiences."] },
            { name: "Cultural", lines: ["History, art, architecture and local meaning. Prioritize depth over covering many places."] },
            { name: "Culinary", lines: ["Organize the day around food, markets and local restaurants. Avoid tourist restaurants and treat diet as a strict constraint."] },
            { name: "Night-owl", lines: ["Start late and prioritize experiences that become valuable after 6 p.m."] },
            { name: "Romantic", lines: ["Intimate, partner-focused experiences with beautiful light and meaningful moments. Avoid loud, rushed or group places."] },
            { name: "Social", lines: ["Lively, group-friendly places with communal energy."] },
            { name: "Offbeat", lines: ["Specific, eccentric places someone would not normally discover. Replace anything generic."] },
          ],
        },
        { img: "/work/outdone/signals.jpg", alt: "Each mood, and the rules behind it", wide: true },
      ],
    },

    {
      id: "architecture",
      eyebrow: "Systems thinking",
      title: "Model design architecture",
      film: "outdone",
      blocks: [
        { img: "/work/outdone/architecture.jpg", alt: "Collect, translate, ground, organize, deliver", wide: true },
        { h: "Signal hierarchy", p: "The model is explicitly told which context should take priority when multiple signals conflict." },
        { h: "Source diversification", p: "Multiple research strategies reduce generic first-result recommendations and produce a more diverse candidate set." },
        { h: "Discovery vs verification", p: "Community recommendations provide local insight, but they are never treated as verified facts on their own." },
        { h: "Deterministic rules", p: "Gemini handles research, preference matching and qualitative judgment. Product logic handles hours, timing, routing and sequencing." },
        { h: "Explainability", p: "The itinerary explains: why each place was selected, where it was discovered, whether it is practical at the proposed time, how it fits into the overall route." },
        { img: "/work/outdone/itinerary.jpg", alt: "The itinerary, and why each place is on it", wide: true },
      ],
    },

    {
      id: "design",
      eyebrow: "Visual design",
      title: "Design",
      film: "outdone",
      blocks: [
        { p: "I used large imagery and parallax motion because travel decisions are emotional. The destination stays present while recommendations and plans move around it." },
        { p: "The imagery helps users imagine the experience and makes each mood feel different." },
        { h: "Making API wait time fun", p: "Gemini and Places calls could take a few seconds, so I used that time for a lightweight game instead of showing a loading spinner. It kept the experience active while the next set of recommendations was being researched. If you miss rings, you answer a quiz question about the place you're traveling to!" },
        { img: "/work/outdone/waiting-game.jpg", alt: "Building your itinerary — fly through the rings", wide: true },
        { p: "Initially I had a loader that showed you all the research Gemini was doing behind the scenes as I hypothesized it will help user trust the recommendations. But testing with a few people I realized they didn't have patience. So this is one of the ideas I came up with." },
      ],
    },
  ],

  reflection: {
    id: "next",
    eyebrow: "Next steps",
    title: "Next steps and feedback to incorporate",
    blocks: [
      { p: "I'd make this more social so friends can see and build on each other's itineraries. Improving the model alone may be hard to sell as a full product, but this could be a strong feature inside Ask Maps." },
      { quote: "“The next step is automated booking instead of only sending them to links. That would make Outdone much more useful, but it would also require partnerships, booking integrations and real investment to support it”" },
    ],
  },
};
