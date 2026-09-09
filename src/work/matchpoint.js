/**
 * MatchPoint.
 *
 * Four sections and a reflection, because the kolam is drawn in four strokes.
 * One film throughout: the app itself, running.
 *
 * Everything technical in here is checked against the repo — the sport
 * category split, the four-tab shell, the global chat layer, the uncertainty
 * K-factor, and the Postgres function that refuses to rate cricket.
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
      blocks: [
        { p: "We started with a simple idea: it is genuinely hard to find someone at your level, free when you are free, who will actually show up. We built the first version around pickleball." },
        { p: "Then we added badminton, and the structure held. Then we added cricket, and it broke." },
        { p: "A pickleball match is two or four people, a scoreline, and a result both sides confirm. A cricket fixture is a team, an opponent, a ground, a window of a few hours, and an outcome that says nothing about how well you personally played. Modelling both as “a match” produced a screen that was wrong for both." },
        { pull: "So the first real decision was to split sports by shape rather than by name." },
        {
          cards: [
            { name: "Individual", lines: ["Pickleball, badminton, ping pong, tennis, squash.", "Rated. Challenges, verified scores, singles and doubles."] },
            { name: "Group", lines: ["Cricket, soccer, volleyball, baseball, football.", "Fixtures and teammate reviews. No competitive rating."] },
          ],
        },
        { p: "That single distinction ends up driving almost everything downstream: which match model gets created, whether a rating exists at all, what the create button offers, and even what the second tab is called." },
        { h: "Separate profiles, not one profile with a sport field", p: "Every player carries a dictionary of sport profiles. Your badminton rating, uncertainty, games played and rating history are a completely separate record from your pickleball ones. Nothing about your cricket account touches your pickleball number." },
        { h: "One shell, a swappable interior", p: "The part I am happiest with is that this did not turn into three different apps. Four tabs, one app bar, one create button, everywhere. What changes is what is inside them." },
        { p: "The clearest example is the second tab. For pickleball it says Matches, uses a checkmark icon, and shows challenges you need to confirm and results you need to verify. Switch to cricket and the same tab says Calendar, uses a calendar icon, and shows fixtures with a date range and a written result. Same position, same shell, different product." },
        { p: "The create button follows. Pickleball offers “Add a challenge” and “Upload scores.” Cricket offers “Add a game” and “Submit a review.”" },
        { h: "Sport is a mode, not a destination", p: "Switching sports is a dropdown in the app bar, not a tab. It re-tints the whole app to that sport’s accent colour, and it refuses to switch mid-form. If you have a half-written challenge open, you get asked whether to discard it first. That guard exists because the sport reaches into every screen, so changing it while a draft is open would silently throw work away." },
      ],
    },

    {
      id: "social",
      eyebrow: "Information architecture",
      title: "Where does the social layer live?",
      film: "app",
      blocks: [
        { p: "The question we kept circling was not what to put in the tab bar." },
        { pull: "What belongs to MatchPoint as a platform, and what belongs to an individual sport?" },
        { p: "Matches belong to a sport. So do courts, ratings, challenges and your skill profile. Those all sit inside the sport-scoped part of the app and change completely when you switch modes." },
        { p: "People do not." },
        { h: "Chat was a tab. That was wrong.", p: "It sat inside the sport-scoped navigation next to Home, Map, Matches and Profile. It looked fine. But if you switch from badminton to cricket, your conversations should not change, because the person you are talking to is a person, not a badminton person." },
        { p: "The same applies to notifications. A challenge request, a friend request, and a result waiting on your confirmation can come from anywhere in the product." },
        { h: "So we pulled both out of the sport entirely", p: "Chats and notifications now live above the tab shell and slide in from the right over whatever you were doing. The tab bar dropped from five items to four. The entry points moved up to the app bar, next to the sport switcher, which is the honest place for them: at the top of the app, outside the sport." },
        {
          list: {
            label: "What moved, and where it went",
            items: [
              "Matches, courts, ratings, challenges, discovery — scoped to the active sport",
              "Chats and notifications — a global layer above the tab shell",
              "Profile — the shell is shared, the sport section inside it swaps",
              "The sport switcher — the app bar, above all of it",
            ],
          },
        },
        { h: "The badge changed for the same reason", p: "The notification badge used to be a count. Counting only makes sense if you can say what you are counting, and once notifications were global, the local count was scoped to the active sport while the server count was not. We replaced it with a dot. The dot is a smaller promise and we can keep it." },
        { h: "Neutral container, sport-aware contents", p: "Chat itself is sport-neutral, but the things you send inside it are not. A challenge sent in a conversation is bound to a sport, and the composer only offers the sports both of you actually play. That split is the whole information architecture in one screen." },
        { pull: "The question stopped being what the screen looked like and became where the feature actually belonged." },
      ],
    },

    {
      id: "building",
      eyebrow: "Iteration",
      title: "Designing it by building it",
      film: "app",
      blocks: [
        { p: "The final interface did not come out of one design pass. Four moments changed how we thought about the product, and all four happened while implementing it." },
        { h: "We tried to retrofit the visual system, then threw it away", p: "Sashank had built out a full visual direction, and the obvious move was to port it onto the screens we already had. We did that, touching the home screen, the tab bar and the theme layer. It half worked. The old screens had been built around different assumptions about hierarchy and density, and the new system kept getting compromised to fit them." },
        { p: "We reverted the entire commit and rebuilt it as a dedicated SwiftUI experience in its own file, then pointed the app at that. The rebuild was more work in the moment and is the reason the app has one coherent surface now instead of two arguing with each other." },
        { h: "The messaging reframe rewrote the navigation", p: "Moving chat and notifications out of the tab bar was not a matter of deleting a tab. It meant introducing a second presentation layer above the tabs, converting notifications from a modal sheet into a full page with its own back navigation, and deriving an unread state that had never needed to exist while chat was just a tab you could see. The IA decision and the state architecture were the same decision." },
        { h: "We replaced iOS’s own date picker", p: "Challenges let you propose a few candidate times, so the sheet has several date and time fields stacked in it. We used the system picker in compact style, which is the correct default. In a dense sheet with several of them it was cramped, it fought the sheet’s layout, and it could not be styled to match anything around it." },
        { p: "We replaced each one with a plain button showing the formatted value, opening a custom editor in its own sheet. This is the one place where going less native made the thing feel more native, because the surrounding sheet finally behaved like one designed object." },
        { h: "Unread state moved from the view into the database", p: "The unread dot was first computed inside the main view: hold a set of message IDs you had already seen, compare it to the incoming ones, show the dot if anything is left over. Correct, and completely local. Close the app and everything was unread again. We moved it to a set of unread conversation IDs backed by the server, and the view now reads whichever source is authoritative." },
        { pull: "A dot is a tiny piece of UI that turned out to need a persistence design." },
        { p: "Two other things are worth saying plainly. We reverted an illustration system after importing it, and the theme file still carries three generations of naming from earlier visual directions, with the old semantic colours collapsing into the current monochrome one. The history is not tidy. It is what iterating in the codebase actually looks like." },
      ],
    },

    {
      id: "rating",
      eyebrow: "Systems",
      title: "Making skill mean something",
      film: "app",
      blocks: [
        { p: "Everyone starts at 80, per sport, on an uncapped scale." },
        { p: "The design goal was that a result should teach the system as much as it deserves to. Beating someone well above you is surprising and should move you a lot. Beating someone well below you is expected and should barely move you at all. That part is standard." },
        { p: "The part we cared more about is that the same result should move a brand new player more than it moves a veteran, because we know far less about the new player." },
        { h: "So the step size is not fixed", p: "Every rating carries an uncertainty value alongside it. Uncertainty starts at 12 and decays by four percent every match, with a floor of 3. The step size is derived from it: a completely new player moves with a K of 12, a settled player with a K of 2, and everyone in between scales linearly." },
        { p: "Your change is that K multiplied by the gap between what actually happened and what the system expected. Expectation comes from a logistic curve over the rating difference, tuned so a ten point gap is meaningful rather than a rounding error." },
        {
          dense: true,
          cards: [
            { name: "80", lines: ["Starting rating, per sport, uncapped in both directions"] },
            { name: "12 → 2", lines: ["K falls as the system gets more confident about you"] },
            { name: "10", lines: ["Games before you stop being marked provisional"] },
          ],
        },
        { p: "The effect is that it never feels like “beat someone my level, plus two.” Two players can win identical matches and move by different amounts, and the reason is legible: the system was less sure about one of them." },
        { h: "Singles and doubles", p: "Badminton and pickleball are played both ways, so we needed team strength without ever giving a team a rating. A team’s strength is the average of its players’ current ratings. Both teams get one shared expected score from that comparison. Then each player is updated individually against that shared expectation, using their own K from their own uncertainty." },
        { pull: "The evidence is shared. The movement is personal." },
        { p: "Two details mattered more than the formula. Every update is computed from a snapshot taken before the match settles, so both sides are calculated against the same starting state rather than one player’s change feeding into the other’s. And the settlement that actually runs in production is a Postgres function that locks every affected profile row in a deterministic order before it reads anything, so two matches finishing at once cannot interleave." },
        { h: "A rating only moves when both sides agree", p: "If only one player has reported, the match sits in an awaiting state. If they disagree, it goes to disputed and nothing changes. And if either player does not carry an active rating for that sport, the match still happens, still goes in your history, and settles without touching anyone’s number." },
        { h: "Knowing when not to create a rating", p: "Cricket, soccer and volleyball players do not get a skill rating from match outcomes, and that is enforced in the database as well as the app. A group fixture reports back that it completed and that no competitive rating applies." },
        { p: "We could have generated a number. It would have looked authoritative and it would have been mostly noise, because whether your cricket team won says very little about how you batted, and nothing at all about whether you got to bat. Position, teammates, opportunity and contribution are all sitting between the result and the individual, and none of them are in the data." },
        { p: "Instead those sports get teammate reviews on named skills that belong to the sport: batting, bowling and fielding for cricket, passing, finishing and defence for soccer, serving, setting and defence for volleyball. Reviews are pulled toward a neutral prior until enough of them exist, so one enthusiastic teammate cannot manufacture a reputation, and they are tied to a match both people actually played in." },
        { pull: "We would rather not generate a precise-looking number than pretend the data tells us something it does not." },
      ],
    },
  ],

  reflection: {
    id: "reflection",
    eyebrow: "Reflection",
    title: "From designer to product builder",
    blocks: [
      { p: "The thing I would want someone to take from this is that none of these decisions arrived in a design file." },
      { h: "The sport split showed up as a modelling problem.", p: "Not as a screen. It only became visible once cricket had to share a data model with pickleball." },
      { h: "The navigation change showed up as a state architecture problem.", p: "Moving chat out of the tab bar meant inventing an unread state that had never needed to exist." },
      { h: "The date picker showed up as a layout problem in a sheet.", p: "Three system pickers stacked in one form is a thing you can only judge on device." },
      { h: "The rating design showed up as a question about what a number is allowed to claim.", p: "And its answer is a Postgres function with a row lock in it." },
      { p: "We were moving between product thinking, interface, architecture and Swift continuously, often inside the same commit. There was no handoff, and honestly there was no clean line between the design and the implementation. Building it was how we found out what we were designing." },
      { h: "Collaboration", p: "Sashank and I built MatchPoint together across product architecture, UX, the sport system, the rating logic, the SwiftUI implementation and a lot of repeated UI iteration. We pressure-tested the ideas with people with more experience than us, including a Design VP at JPMorgan Chase and researchers at Google DeepMind, who gave us feedback and advice on the product and the approach." },
    ],
  },
};
