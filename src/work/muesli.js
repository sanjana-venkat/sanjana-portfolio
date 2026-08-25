/**
 * Muesli — local-first dictation.
 *
 * Short on purpose. The prototype on the left does the demonstrating, so the
 * writing only has to say what each decision was for.
 */

export const MUESLI = {
  slug: "muesli",
  shape: "wide",
  kicker: "Product designer · Muesli · Product design + SwiftUI",
  title: "Making dictation feel simple",
  lede: "I redesigned Muesli’s setup and navigation to make its powerful local-first tools easier to understand and use.",
  note: "Open-source contribution, PR under review.",
  links: [
    { href: "https://github.com/Muesli-HQ/muesli/pull/329", label: "Implementation PR" },
  ],

  films: {
    app: {
      src: "/work/muesli/app.mp4",
      poster: "/work/muesli/app-poster.webp",
      aspect: "1400 / 992",
      label: "The redesigned Muesli app, built in SwiftUI",
    },
  },

  sections: [
    {
      id: "setup",
      eyebrow: "01",
      title: "Settings and permissions explained",
      film: "app",
      blocks: [
        { p: "The original onboarding was technical. It moved through permissions like microphone access and system settings, and mostly showed states like “granted” without explaining why each permission mattered or how it connected to using Muesli." },
        { p: "I redesigned setup around what the user is trying to do. Each step says what a permission is for before it asks for it." },
        { p: "Muesli can open the right Mac settings window on its own, so I added visual instructions showing where to look and what to toggle once it does." },
        {
          stack: true,
          pair: [
            { img: "/work/muesli/setup-old.jpg", alt: "Permission 2 of 3, asking for accessibility with no explanation", cap: "Before" },
            { img: "/work/muesli/setup-new.jpg", alt: "A few quick permissions, showing what to toggle and where", cap: "After" },
          ],
        },
        { p: "Permissions also carry the local-first story. Microphone access reads as something Muesli needs to transcribe on your Mac, instead of a system requirement to get past." },
        { pull: "Turn permissions from a technical checklist into guided product setup." },
      ],
    },

    {
      id: "test",
      eyebrow: "02",
      title: "Try it before the app opens",
      film: "app",
      blocks: [
        { p: "Muesli asked for microphone access and then sent people into the product. There was no moment to confirm transcription was working, or to find out what using Muesli would feel like." },
        { p: "I put a microphone test inside onboarding, with live transcription running as you speak." },
        { p: "It confirms setup worked, and it gives people their first successful dictation before onboarding ends." },
        { img: "/work/muesli/test.jpg", alt: "Muesli shortcut test transcribing a first dictation during onboarding", wide: true },
      ],
    },

    {
      id: "structure",
      eyebrow: "03",
      title: "Dictation and meeting don't have to be separate",
      film: "app",
      blocks: [
        { p: "The original product treated Meetings almost like a separate area from dictation. But a meeting is still captured speech. What changes is what you want Muesli to do with it afterward." },
        { p: "Some people want plain local dictation. Others want AI meeting summaries. Every dictation should not automatically become a summary, and that does not require meetings to sit in their own system." },
        { p: "I reorganized around the content. Dictations get clearer hierarchy with folders and categories, and summarization is something you apply when it is relevant." },
        {
          stack: true,
          pair: [
            { img: "/work/muesli/summary-old.jpg", alt: "Meetings as its own area, separate from dictations", cap: "Before" },
            { img: "/work/muesli/summary-new.jpg", alt: "A dictation with summary and transcript on it", cap: "After" },
          ],
        },
      ],
    },

    {
      id: "depth",
      eyebrow: "04",
      title: "Show the product's value",
      film: "app",
      blocks: [
        { p: "Insights moved out of the top of the dashboard into its own area, so it can grow without competing with recording." },
        { p: "Dictionary became a clear place to manage words and vocabulary, which matters when the model has to get names right." },
        { p: "I reorganized Settings, because settings do more work in a local-first product. People need to see and control how it behaves instead of reading a dense technical screen." },
        { p: "The model system now shows which local model is running, what else is available, and enough context to pick one." },
        {
          stack: true,
          pair: [
            { img: "/work/muesli/insights-old.jpg", alt: "Insights before", cap: "Before" },
            { img: "/work/muesli/insights-new.jpg", alt: "Insights after", cap: "After" },
          ],
        },
        { pull: "The build was complex. Using it should feel simple and smooth." },
      ],
    },
  ],

  reflection: {
    id: "build",
    eyebrow: "Build",
    title: "I didn't stop at the Figma file",
    blocks: [
      { p: "I translated the direction into SwiftUI against Muesli's existing architecture: onboarding, navigation, Dictations, Meetings, Insights, Dictionary, Models, Shortcuts, Settings and the floating dictation indicator." },
      { p: "Building it surfaced what a static frame hides. Window resizing, collapsed navigation, long histories, active recording, empty states and permission behaviour all had to hold up." },
      { p: "Local-first is a real advantage for Muesli. The interface should make that control feel useful and legible instead of showing it as configuration." },
    ],
  },
};
