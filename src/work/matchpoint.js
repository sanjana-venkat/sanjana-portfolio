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
  lede: "A native iOS app for finding people at your level to play with. You find players and courts near you, send a challenge, sort the details out in chat, and confirm the score afterwards. Every sport you play carries its own skill rating, and it only moves when both people agree on who won.",

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
        { p: "The idea was simple. It’s hard to find someone at your level who’s free when you are and who’ll actually turn up. We built the first version around pickleball." },
        { p: "Adding badminton was fine. Adding cricket broke the whole thing." },
        { p: "A pickleball match is two or four people, a scoreline, and a result both sides confirm. A cricket fixture is a team, a ground, a three hour window, and a result that says nothing about how you personally played. We were modelling both as “a match”, and the screen we got out of it was wrong for both. So we stopped organising by sport and started organising by shape." },
        { img: "/work/matchpoint/sport-split.svg", alt: "One Sport enum forking into individual and dual sports versus group sports, with a different match model, skill system, second tab and create button on each side", wide: true, bare: true },
        { p: "That one split ended up driving everything else. Players carry a separate profile per sport too, so your badminton rating and history are a different record from your pickleball ones." },
        { h: "It didn’t turn into three apps", p: "The shell is the same everywhere. Four tabs, one app bar, one create button. What changes is the inside, and it changes all the way down. The second tab renames itself, swaps its icon, and renders a different screen." },
        { h: "Sport is a mode, not a destination", p: "Switching sports is a dropdown in the app bar rather than a tab. It re-tints the whole app, and it won’t switch while you have a form open, because a half-written challenge would just disappear." },
        { p: "The beta runs on pickleball and badminton. The rest stay visible in the sport picker as coming soon." },
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
        { p: "We kept coming back to the same question, and it wasn’t really about the tab bar. What belongs to MatchPoint as a platform, and what belongs to an individual sport?" },
        { p: "Matches belong to a sport. So do courts, ratings and challenges. People don’t." },
        { h: "Chat started out as a tab", p: "It sat in the sport-scoped nav next to Home, Map and Matches. That works until you switch from badminton to cricket and your conversations change with it. Notifications had the same problem, since a challenge or a friend request can come from anywhere in the app." },
        { img: "/work/matchpoint/ia-layers.svg", alt: "A boundary line with chats, notifications and the sport switcher above it belonging to MatchPoint, and the four sport-scoped tabs below it", wide: true, bare: true },
        { h: "The badge had to change too", p: "It used to be a count. But once notifications went global, the local count was still scoped to the active sport while the server count wasn’t, so the number meant different things depending on where it came from. We swapped it for a dot, which promises less and is always true." },
        { h: "The container is neutral, what goes in it isn’t", p: "Chat itself doesn’t care what sport you’re in. A challenge sent inside one does, and the composer only offers the sports you both actually play." },
        { p: "The question stopped being what the screen looked like and became where the feature actually belonged." },
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
        { p: "The interface didn’t come out of one design pass. Four things changed how we thought about the product, and all four happened while we were building it." },
        { h: "We retrofitted the visual system, then threw it away", p: "Porting Sashank’s direction onto our existing screens half worked. Those screens assumed a different hierarchy, so we kept compromising the new system to fit them. We reverted the commit and rebuilt it as its own SwiftUI experience." },
        { h: "Moving chat turned into a navigation rewrite", p: "It meant a second presentation layer above the tabs, notifications going from a sheet to a full page, and an unread state that had never needed to exist. The IA decision and the state architecture were the same decision." },
        { h: "We replaced iOS’s own date picker", p: "A challenge proposes a few times, so the sheet stacks several date fields. The system picker was cramped and couldn’t be styled to match anything near it. Each one became a button that opens a custom editor." },
        { h: "The unread dot needed a database", p: "It started out computed in the view, comparing the message IDs you’d seen against what came in. Correct, and completely local. Close the app and everything was unread again." },
        { p: "We also reverted an illustration system after importing it, and the theme file still carries three generations of naming. The history isn’t tidy. That’s what iterating in the codebase looks like." },
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
        { p: "Beating someone above you should move you more than beating someone below you, which is how Elo already works. What we cared about is that the same result should move a new player further than a veteran, because we know a lot less about the new player." },
        { img: "/work/matchpoint/rating-move.svg", alt: "Change equals K times the gap between what happened and what was expected, with expectation from a logistic curve and K falling from 12 to 2 as uncertainty decays", wide: true, bare: true },
        { p: "So two people can win identical matches and move by different amounts. Under ten games you’re marked provisional, which is our way of saying the number hasn’t settled yet." },
        { h: "Doubles was harder than singles", p: "A team’s strength is the average of its players’ ratings, and both teams get one shared expected score from that. Each player then moves by their own K, from their own uncertainty." },
        { p: "Every update comes off a snapshot taken before anything settles, so both sides are worked out against the same starting state. In production that’s a Postgres function that locks every affected row in a fixed order first, so two matches finishing at once can’t interleave." },
        { img: "/work/matchpoint/settle.svg", alt: "A match result flows from one report to awaiting, to disputed if the two sides disagree, and only moves ratings when both agree and the sport carries a rating", wide: true, bare: true },
        { h: "Knowing when not to create a rating", p: "We could have given cricket players a number. It would’ve looked authoritative and been mostly noise. Whether your team won says very little about how you batted, and nothing about whether you got to bat." },
        { p: "Those sports get teammate reviews on skills that belong to them instead. Batting, bowling and fielding for cricket. Reviews are pulled toward a neutral prior until enough of them exist, so one enthusiastic teammate can’t manufacture a reputation. We’d rather show no number than one that doesn’t mean anything." },
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
      { h: "The sport split was a modelling problem", p: "It wasn’t a screen. It only showed up once cricket had to share a data model with pickleball." },
      { h: "The navigation change was a state problem", p: "Where a feature lives and where its state lives turned out to be one question, not two." },
      { h: "The rating was a question about what a number can claim", p: "And the answer ended up being a Postgres function with a row lock in it." },
      { p: "We were moving between product thinking, interface, architecture and Swift constantly, often in the same commit. There was no handoff and no clean line between the design and the build. Building it is how we found out what we were designing." },
      { p: "Sashank and I built MatchPoint together across product architecture, UX, the sport system, the rating logic and the SwiftUI implementation. We pressure-tested the ideas with people who have a lot more experience than us, including a Design VP at JPMorgan Chase and researchers at Google DeepMind." },
    ],
  },
};
