/**
 * MatchPoint.
 *
 * Four sections and a reflection, because the kolam is drawn in four strokes.
 * One recording, cut into five moments: each section names the range of the
 * film it is talking about, so the phone shows the screen being discussed.
 *
 * Everything technical here is checked against the repo — the sport category
 * split, the four-tab shell, the global chat layer, the uncertainty K-factor,
 * and the Postgres function that refuses to rate cricket.
 */

export const MATCHPOINT = {
  slug: "matchpoint",
  shape: "phone",
  kicker: "Product architecture, UX and SwiftUI · With Sashank Mullapudi",
  title: "MatchPoint",
  lede: "A native iOS app for finding people to play sports with. We started with one sport, and the moment we added a second the real work stopped being the screens and became deciding what MatchPoint owns and what a sport owns.",

  films: {
    app: {
      src: "/work/matchpoint/matchpoint.mp4",
      poster: "/work/matchpoint/matchpoint-poster.webp",
      aspect: "720 / 1516",
      label: "MatchPoint, running on device",
    },
  },

  sections: [
    {
      id: "sports",
      eyebrow: "Architecture",
      title: "One app, very different sports",
      film: "app",
      clip: [45, 64],
      clipLabel: "Choosing your sports, then configuring each one",
      blocks: [
        { p: "We started with a simple idea: it is genuinely hard to find someone at your level, free when you are free, who will actually show up. We built the first version around pickleball." },
        { p: "Then we added badminton, and the structure held. Then we added cricket, and it broke." },
        { p: "A pickleball match is two or four people, a scoreline, and a result both sides confirm. A cricket fixture is a team, a ground, a window of a few hours, and an outcome that says nothing about how well you personally played. Modelling both as “a match” produced a screen that was wrong for both." },
        { pull: "So we split sports by shape rather than by name." },
        { img: "/work/matchpoint/sport-split.svg", alt: "One Sport enum forking into individual and dual sports versus group sports, with a different match model, skill system, second tab and create button on each side", wide: true, bare: true },
        { p: "That one distinction drives everything downstream, and every player carries a separate profile per sport. Your badminton rating, uncertainty and history are a different record from your pickleball ones." },
        { h: "It did not turn into three apps", p: "The shell is the same everywhere. Four tabs, one app bar, one create button. What changes is the interior, and it changes all the way down: the second tab renames itself, swaps its icon, and renders a different screen." },
        { h: "Sport is a mode, not a destination", p: "Switching is a dropdown in the app bar. It re-tints the whole app and refuses to switch mid-form, because a half-written challenge would be silently thrown away." },
      ],
    },

    {
      id: "social",
      eyebrow: "Information architecture",
      title: "Where does the social layer live?",
      film: "app",
      clip: [119, 131],
      clipLabel: "Chats and requests, reached from the app bar",
      blocks: [
        { p: "The question we kept circling was not what to put in the tab bar." },
        { pull: "What belongs to MatchPoint as a platform, and what belongs to an individual sport?" },
        { p: "Matches belong to a sport. So do courts, ratings and challenges. People do not." },
        { h: "Chat was a tab. That was wrong.", p: "If you switch from badminton to cricket, your conversations should not change, because the person you are talking to is a person, not a badminton person. Same for notifications: a challenge, a friend request, a result waiting on you can come from anywhere in the product." },
        { img: "/work/matchpoint/ia-layers.svg", alt: "A boundary line with chats, notifications and the sport switcher above it belonging to MatchPoint, and the four sport-scoped tabs below it", wide: true, bare: true },
        { h: "The badge changed for the same reason", p: "It used to be a count. Counting only makes sense if you can say what you are counting, and once notifications were global the local count was scoped to the active sport while the server count was not. We replaced it with a dot. The dot is a smaller promise and we can keep it." },
        { h: "Neutral container, sport-aware contents", p: "Chat itself is sport-neutral, but a challenge sent inside one is bound to a sport, and the composer only offers the sports both of you actually play." },
        { pull: "The question stopped being what the screen looked like and became where the feature actually belonged." },
      ],
    },

    {
      id: "building",
      eyebrow: "Iteration",
      title: "Designing it by building it",
      film: "app",
      clip: [88, 119],
      clipLabel: "The shell: home, matches, the map",
      blocks: [
        { p: "The final interface did not come out of one design pass. Four moments changed how we thought about the product, and all four happened while implementing it." },
        { h: "We tried to retrofit the visual system, then threw it away", p: "Porting Sashank's direction onto the screens we already had half worked. Those screens were built around different assumptions about hierarchy and density, and the new system kept getting compromised to fit them. We reverted the whole commit and rebuilt it as a dedicated SwiftUI experience instead. That is why the app has one coherent surface now rather than two arguing with each other." },
        { h: "The messaging reframe rewrote the navigation", p: "Moving chat out of the tab bar meant introducing a second presentation layer above the tabs, turning notifications from a sheet into a full page, and deriving an unread state that never needed to exist while chat was a tab you could see. The IA decision and the state architecture were the same decision." },
        { h: "We replaced iOS’s own date picker", p: "A challenge proposes several candidate times, so the sheet stacks several date fields. The system picker in compact style is the correct default and was cramped, fought the sheet's layout, and could not be styled to match anything near it. Each became a button showing the formatted value, opening a custom editor. Going less native made it feel more native." },
        { h: "Unread state moved from the view into the database", p: "The dot was first computed in the main view: hold the message IDs you had seen, compare, show the dot if any are left. Correct, and completely local. Close the app and everything was unread again." },
        { pull: "A dot is a tiny piece of UI that turned out to need a persistence design." },
        { p: "We also reverted an illustration system after importing it, and the theme file still carries three generations of naming from earlier visual directions. The history is not tidy. It is what iterating in the codebase actually looks like." },
      ],
    },

    {
      id: "rating",
      eyebrow: "Systems",
      title: "Making skill mean something",
      film: "app",
      clip: [128, 140],
      clipLabel: "Your rating, and how it moves",
      blocks: [
        { p: "Everyone starts at 80, per sport, on an uncapped scale." },
        { p: "A result should teach the system as much as it deserves to. Beating someone well above you is surprising and should move you a lot. That part is standard. The part we cared about is that the same result should move a new player more than a veteran, because we know far less about the new player." },
        { img: "/work/matchpoint/rating-move.svg", alt: "Change equals K times the gap between what happened and what was expected, with expectation from a logistic curve and K falling from 12 to 2 as uncertainty decays", wide: true, bare: true },
        { p: "So two players can win identical matches and move by different amounts, and the reason is legible: the system was less sure about one of them. Under ten games you are marked provisional, which is our way of saying the number is still forming." },
        { h: "Singles and doubles", p: "A team's strength is the average of its players' ratings. Both teams get one shared expected score from that. Then each player is updated individually against it, using their own K from their own uncertainty." },
        { pull: "The evidence is shared. The movement is personal." },
        { p: "Every update is computed from a snapshot taken before the match settles, so both sides are calculated against the same starting state. In production that settlement is a Postgres function that locks every affected profile row in a deterministic order before it reads anything, so two matches finishing at once cannot interleave." },
        { img: "/work/matchpoint/settle.svg", alt: "A match result flows from one report to awaiting, to disputed if the two sides disagree, and only moves ratings when both agree and the sport carries a rating", wide: true, bare: true },
        { h: "Knowing when not to create a rating", p: "We could have given cricket players a number. It would have looked authoritative and been mostly noise, because whether your team won says very little about how you batted, and nothing about whether you got to bat. Position, teammates, opportunity and contribution all sit between the result and the individual, and none of them are in the data." },
        { p: "Those sports get teammate reviews on skills that belong to them instead: batting, bowling and fielding for cricket, passing, finishing and defence for soccer. Reviews are pulled toward a neutral prior until enough exist, and are tied to a match both people actually played in." },
        { pull: "We would rather not generate a precise-looking number than pretend the data tells us something it does not." },
      ],
    },
  ],

  reflection: {
    id: "reflection",
    eyebrow: "Reflection",
    title: "From designer to product builder",
    film: "app",
    clip: [0, 20],
    clipLabel: "Play people at your level",
    blocks: [
      { p: "None of these decisions arrived in a design file." },
      { h: "The sport split showed up as a modelling problem.", p: "Not as a screen. It only became visible once cricket had to share a data model with pickleball." },
      { h: "The navigation change showed up as a state architecture problem.", p: "Moving chat out of the tab bar meant inventing an unread state that had never needed to exist." },
      { h: "The rating design showed up as a question about what a number is allowed to claim.", p: "And its answer is a Postgres function with a row lock in it." },
      { p: "We were moving between product thinking, interface, architecture and Swift continuously, often inside the same commit. There was no handoff, and no clean line between the design and the implementation. Building it was how we found out what we were designing." },
      { h: "Collaboration", p: "Sashank and I built MatchPoint together across product architecture, UX, the sport system, the rating logic and the SwiftUI implementation. We pressure-tested the ideas with people with more experience than us, including a Design VP at JPMorgan Chase and researchers at Google DeepMind, who gave us feedback and advice." },
    ],
  },
};
