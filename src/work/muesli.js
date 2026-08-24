/**
 * Muesli — local-first dictation.
 *
 * The short version of a long project. The prototype on the left does the
 * demonstrating, so the writing only has to say why each move was made.
 */

export const MUESLI = {
  slug: "muesli",
  shape: "wide",
  kicker: "Product designer · Muesli · Product design + SwiftUI",
  title: "Local-first dictation, made approachable",
  lede: "Muesli runs dictation entirely on your Mac. The technology was already strong — the experience asked people to understand the system before they felt the value.",
  note: "Open-source contribution, PR under review. ",
  link: { href: "https://github.com/Muesli-HQ/muesli/pull/329", label: "View the PR" },

  films: {
    app: {
      src: "/work/muesli/app.mp4",
      poster: "/work/muesli/app-poster.webp",
      aspect: "1250 / 974",
      label: "The redesigned Muesli app, built in SwiftUI",
    },
  },

  sections: [
    {
      id: "problem",
      eyebrow: "Problem",
      title: "The product was doing a lot. The experience showed all of it at once.",
      film: "app",
      blocks: [
        { p: "Muesli handles live dictation, meetings, model downloads, custom words, shortcuts and insights. All of it was true on the first run, and all of it carried the same visual weight." },
        { p: "Setup asked people to make decisions about permissions, microphones and shortcuts before they had dictated a single sentence." },
        { pull: "The experience needed to get someone to the value quickly, then let them discover the depth over time." },
        { img: "/muesli-v1-product.png", alt: "Muesli V1, where every area competed for attention", wide: true },
      ],
    },

    {
      id: "onboarding",
      eyebrow: "Onboarding",
      title: "The first goal was one successful dictation",
      film: "app",
      blocks: [
        { p: "I rebuilt setup around what a new user is actually wondering — why this permission, whether audio leaves the Mac, which microphone, what shortcut to press, and did it work." },
        { p: "Each step explains one decision and immediately lets someone act on it. The final step brings shortcut, microphone and a live dictation test together, so people arrive in the app already knowing it works." },
        { img: "/muesli-v2-onboarding.png", alt: "Permissions as a guided sequence ending in a live dictation test", wide: true },
      ],
    },

    {
      id: "structure",
      eyebrow: "Structure",
      title: "The core action needed to stay visible",
      film: "app",
      blocks: [
        { p: "Dictations, Meetings, Insights, Dictionary, Models, Shortcuts and Settings were all competing inside one flat structure." },
        { p: "Record became a persistent action, the keyboard shortcut is taught in context, and the navigation collapses so the writing stays in focus. The full product is still there — it just no longer has to be understood all at once." },
        { img: "/muesli-final-insights.png", alt: "Insights in the final visual system", wide: true },
      ],
    },

    {
      id: "build",
      eyebrow: "Designing with the build",
      title: "I didn't stop at the Figma file",
      film: "app",
      blocks: [
        { p: "I translated the direction into SwiftUI against Muesli's existing architecture — onboarding, navigation, Dictations, Meetings, Insights, Dictionary, Models, Shortcuts, Settings and the floating dictation indicator." },
        { p: "The build exposed what a static frame hides: window resizing, collapsed navigation, long histories, active recording, empty states and permission behaviour." },
        { pull: "A screen can look good at one size. A product has to keep working when everything changes." },
      ],
    },
  ],

  reflection: {
    id: "reflection",
    eyebrow: "Reflection",
    title: "Local-first is a technical advantage. Trust still comes from the experience.",
    blocks: [
      { p: "People shouldn't have to understand models, permissions and storage before they understand the product." },
      { p: "The better version lets them feel the speed first, says plainly what stays on their Mac, and reveals the deeper system when they need it." },
    ],
  },
};
