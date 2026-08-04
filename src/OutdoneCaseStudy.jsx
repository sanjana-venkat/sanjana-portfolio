import { useEffect, useRef, useState } from "react";

const FONT = "[font-family:'Plus_Jakarta_Sans',sans-serif]";
const LIVE_URL = "https://travel-dna-kohl.vercel.app/";

function ExternalLink({ href, children, primary = false }) {
  return <a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center rounded-full px-5 py-3 text-[13px] font-semibold transition hover:-translate-y-0.5 ${primary ? "bg-[#191816] text-white" : "bg-[#EAE4DF] text-[#191816]"} ${FONT}`}>{children}<span className="ml-2" aria-hidden="true">↗</span></a>;
}

function Section({ eyebrow, title, children, warm = false }) {
  return <section className={`py-16 sm:py-24 ${warm ? "my-4 rounded-[30px] bg-[#F8F3EF] px-5 sm:px-10" : ""}`}><p className={`text-[12px] font-semibold uppercase tracking-[0.09em] text-[#B6632C] ${FONT}`}>{eyebrow}</p><h2 className={`mt-4 max-w-[960px] text-[31px] font-medium leading-[1.12] tracking-[-0.045em] text-[#171614] sm:text-[46px] ${FONT}`}>{title}</h2><div className="mt-7 text-[16px] leading-[1.75] text-[#69625E] sm:text-[18px]">{children}</div></section>;
}

function Picture({ src, alt, className = "", contain = false, loading = "lazy" }) {
  return <figure className={`overflow-hidden rounded-[26px] bg-[#F1ECE8] ${className}`}><img src={src} alt={alt} loading={loading} className={`block h-full w-full ${contain ? "object-contain" : "object-cover"}`} /></figure>;
}

function Motion({ webm, mp4, poster, label, hero = false }) {
  const ref = useRef(null);
  const visibleRef = useRef(false);
  const reducedRef = useRef(false);
  const [loadSources, setLoadSources] = useState(hero);
  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = reduced.matches;
    if (reduced.matches) {
      video.pause();
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        setLoadSources(true);
        if (video.readyState >= 2) video.play().catch(() => {});
      } else video.pause();
    }, { rootMargin: "160px 0px", threshold: 0.15 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return <figure className="overflow-hidden rounded-[26px] bg-[#EEE9E4]"><video ref={ref} className="block aspect-video w-full object-cover" poster={poster} loop muted playsInline controls preload={hero ? "metadata" : "none"} aria-label={label} onCanPlay={() => { if (visibleRef.current && !reducedRef.current) ref.current?.play().catch(() => {}); }}>{loadSources && <><source src={webm} type="video/webm" /><source src={mp4} type="video/mp4" /></>}Your browser cannot play this video.</video><noscript><img src={poster} alt={label} /></noscript></figure>;
}

function Todo({ children }) {
  return <div className="flex min-h-[160px] items-center justify-center rounded-[24px] border border-dashed border-[#C9BEB6] bg-[#FBF8F6] p-6 text-center text-[13px] font-semibold leading-[1.55] text-[#8A7D74]">TODO: {children}</div>;
}

function Copy({ children, className = "" }) {
  return <div className={`max-w-[900px] space-y-5 ${className}`}>{children}</div>;
}

export function OutdoneStudy() {
  return (
    <article className={`work-case-study h-full w-full min-w-0 max-w-full overflow-x-hidden overflow-y-auto bg-white text-[#171614] ${FONT}`}>
      <div className="mx-auto w-full min-w-0 max-w-[1120px] px-5 py-10 sm:px-10 sm:py-16">
        <header>
          <p className="text-[12px] font-semibold uppercase tracking-[0.09em] text-[#B6632C]">Outdone · Product design + AI UX</p>
          <h1 className="mt-6 max-w-[900px] text-[42px] font-medium leading-[1.03] tracking-[-0.055em] sm:text-[68px]">Planning for who you want to be today</h1>
          <div className="mt-7 max-w-[870px] space-y-4 text-[17px] leading-[1.7] text-[#67605B] sm:text-[20px]">
            <p>I built Outdone because I felt personalization relies too much on historical data and forgets what someone might want today.</p>
            <p>You may usually like museums and cafés, but that does not mean you want another museum and café every Saturday. Sometimes you only know that you want to get out, feel alive, have a soft reset or do something different, and forming the search is harder than finding the options.</p>
            <p>Outdone uses mood, context and one specific request to turn that feeling into a plan with real places.</p>
          </div>
          <dl className="mt-10 grid gap-x-8 gap-y-6 border-y border-[#DED7D1] py-7 sm:grid-cols-2 lg:grid-cols-4">
            {[["Role", "Product designer and builder"], ["Work", "Product strategy, AI UX, visual design, motion design and implementation"], ["Collaboration", "Recommendation quality with Abishek Sridhar, Google DeepMind"], ["Tools", "Gemini, Google Places, Google Maps, React and motion libraries"]].map(([term, detail]) => <div key={term}><dt className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#B6632C]">{term}</dt><dd className="mt-2 text-[13px] leading-[1.55] text-[#5E5752]">{detail}</dd></div>)}
          </dl>
          <div className="mt-7"><ExternalLink href={LIVE_URL} primary>Try Outdone</ExternalLink></div>
          <div className="mt-10"><Motion hero webm="/outdone-hero-journey.webm" mp4="/outdone-hero-journey.mp4" poster="/outdone-mood-selection-poster.webp" label="Outdone journey from mood selection through loading to a real activity suggestion" /><p className="mt-3 text-[12px] text-[#8A817A]">Real product states: mood selection, generation and a grounded suggestion.</p></div>
        </header>

        <Section eyebrow="The problem" title="Sometimes “I want to do something” is all I know">
          <Copy><p>Search works well when I know what to search for. I can ask for the best ramen, a moderate hike or things to do in San Francisco.</p><p>The harder days are when I do not have a category yet. Maybe I have four free hours after work and want to get out of the house, or I am visiting a city and know that I want the day to feel adventurous, relaxed or local, but I have no idea what activity would create that feeling.</p><p>Most travel products make me start with a destination, category or list of attractions. ChatGPT can give me ideas, but I still have to explain what I mean, judge a long response and organize everything into a day.</p></Copy>
          <p className="mt-10 max-w-[980px] text-[25px] font-medium leading-[1.35] tracking-[-0.035em] text-[#24211F] sm:text-[34px]">How can the product help someone form their intent before asking the model for an answer?</p>
          <div className="mt-10 grid gap-4 md:grid-cols-[0.82fr_1.18fr]"><Picture src="/outdone-landing.webp" alt="Outdone landing page presenting a simple starting point" /><Picture src="/outdone-moods.webp" alt="Outdone interface for choosing how the day should feel" /></div>
        </Section>

        <Section eyebrow="Starting with mood" title="Mood became a live signal for what someone wants right now" warm>
          <Copy><p>I started with mood because it is something people already understand without needing to know the name of an activity.</p><p>A person can choose something like soft reset, curious, romantic, social or feel alive, then add the details that actually change the recommendation, such as where they are, how much time they have, who they are with and whether there is one thing they definitely want included.</p><p>The challenge was keeping this light. When I added too many questions, it started feeling like another travel-planning form, so I kept asking which inputs would materially change the answer and removed the rest.</p></Copy>
          <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]"><Picture src="/outdone-setup.webp" alt="Outdone trip setup asking for destination, time, company and transportation" /><Motion webm="/outdone-mood-selection.webm" mp4="/outdone-mood-selection.mp4" poster="/outdone-mood-selection-poster.webp" label="Selecting and deselecting the Adventurous mood in Outdone" /></div>
          <ol className="mt-5 grid gap-2 text-[13px] text-[#645D58] sm:grid-cols-2 lg:grid-cols-3">{["Destination or current location", "Date and available time", "Who is coming", "Transportation", "Mood selection", "One specific request"].map((item, index) => <li key={item} className="rounded-full border border-[#D9D0C9] bg-white px-4 py-3"><span className="mr-2 text-[#B6632C]">{index + 1}.</span>{item}</li>)}</ol>
          <p className="mt-5 text-[13px] text-[#7E746D]">Each question earns its place by changing the recommendation.</p>
          <div className="mt-5"><Todo>Export early mood interaction explorations from Figma</Todo></div>
        </Section>

        <Section eyebrow="Forming intent" title="A mood word is still too open for a model">
          <Copy><p>At first, I treated moods like labels inside the prompt. If someone selected adventurous, I would tell Gemini to create an adventurous itinerary.</p><p>The results showed me how much room that left for the model to fill in its own assumptions.</p><p>For example, it once recommended a museum because the user was a designer and described that as adventurous. It had found a connection between the person and the place, but it had completely missed what adventurous meant for that day.</p><p>So Abishek and I started breaking each mood into behavioral signals. Adventurous could include elevation, speed, water, physical effort, risk or an activity that requires a safety briefing. Relaxed could change the pace, reduce travel between stops and prioritize places where someone can stay longer.</p><p>This helped us move from broad personality words into instructions the model could actually reason with.</p></Copy>
          <blockquote className="my-12 max-w-[980px] border-l-4 border-[#B6632C] pl-6 text-[26px] font-medium leading-[1.35] tracking-[-0.035em] text-[#201E1B] sm:text-[36px]">Mood was the starting point. The real work was defining what that mood should change.</blockquote>
          <div className="grid gap-3 md:grid-cols-4">{[["Mood label", "Adventurous"], ["Behavioral interpretation", "Elevation, speed, water, effort or risk"], ["Model constraint", "Require a meaningful physical or unfamiliar component"], ["Recommendation example", "Kayaking with a safety briefing"]].map(([label, value], index) => <div key={label} className={`rounded-[22px] p-5 ${index === 3 ? "bg-[#DCE9E4]" : "bg-[#F5F0EC]"}`}><p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9B5B31]">{label}</p><p className="mt-5 text-[16px] font-semibold leading-[1.45] text-[#2A2825]">{value}</p></div>)}</div>
        </Section>

        <Section eyebrow="Recommendation logic" title="I started evaluating why a recommendation belonged in the day" warm>
          <Copy><p>Once the prompts became more specific, I needed a better way to judge the output than whether the itinerary sounded generally good.</p><p>I looked at the recommendation through three layers:</p></Copy>
          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1.35fr]">{[["Person", "What we already know, such as dietary needs, group type and broader preferences"], ["Intent", "The mood and the kind of experience they are looking for today"], ["Context", "Location, time, transportation, opening hours, distance and anything they asked to include"]].map(([title, copy]) => <div key={title} className="rounded-[23px] bg-white p-6"><h3 className="text-[19px] font-semibold">{title}</h3><p className="mt-3 text-[14px] leading-[1.65]">{copy}</p></div>)}<div className="rounded-[23px] bg-[#283F37] p-6 text-white"><p className="text-[10px] uppercase tracking-[0.1em] text-white/60">Recommendation</p><p className="mt-5 text-[22px] font-medium leading-[1.35]">A place that fits the person, today’s intent and the practical day.</p></div></div>
          <Copy className="mt-8"><p>A recommendation had to make sense across all three. A beautiful restaurant could match the person and the location, but still be wrong when the user selected nature and turned culinary experiences off.</p><p>I used those failures to keep refining the prompt, the mood definitions and the way activities were filtered before the itinerary was generated.</p></Copy>
          <div className="mt-8 grid gap-3 md:grid-cols-3">{[["Culinary was off", "Removed restaurants from candidate generation before itinerary assembly."], ["Museum labeled adventurous", "Defined adventure through behavior instead of occupation or general interest."], ["A bad route", "Evaluated the set as a day, then reordered around travel time and opening hours."]].map(([title, note]) => <div key={title} className="rounded-[22px] border border-[#D8CEC7] bg-white p-5"><p className="font-semibold text-[#2C2926]">{title}</p><p className="mt-3 text-[13px] leading-[1.6]">{note}</p></div>)}</div>
        </Section>

        <Section eyebrow="From ideas to a day" title="The order of the recommendations matters as much as the recommendations">
          <Copy><p>A list of good places can still make a bad itinerary.</p><p>After generating the activity options, I structured the day around available time, travel distance, transportation and the natural duration of each stop. The product gives people a smaller set of activities to choose from, then organizes the final day so it can actually be followed.</p><p>I also added space for one non-negotiable request, such as “include a cooking class,” because personalization should still let someone be specific when they already know part of what they want.</p></Copy>
          <div className="mt-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><div className="flex flex-col justify-between rounded-[26px] bg-[#F5F0EC] p-6"><div className="space-y-4">{["Context and mood", "Activity possibilities", "User selection", "Time and distance ordering", "Final route"].map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-[#D8CEC7] pb-4 last:border-0"><span className="text-[11px] text-[#B6632C]">0{index + 1}</span><span className="text-[15px] font-semibold">{item}</span></div>)}</div><p className="mt-7 text-[12px] leading-[1.6] text-[#827870]">The itinerary is evaluated as one connected day, with every place contributing to the route.</p></div><Picture src="/outdone-preview.png" alt="Outdone activity possibilities and itinerary interface" /></div>
        </Section>

        <Section eyebrow="When the AI is almost right" title="The itinerary needed to stay editable" warm>
          <Copy><p>AI recommendations are rarely completely wrong. More often, seven parts feel right and one activity does not.</p><p>Regenerating the entire day would throw away decisions the user already liked, so I designed the itinerary at the activity level. People can like a stop, replace it, add something specific or adjust the feel of the day while keeping the rest of the plan.</p><p>I explored controls for pacing, social energy, adventure, discovery and planning because people often know how they want the answer to change before they know the replacement they want.</p></Copy>
          <div className="mt-10 grid gap-4 md:grid-cols-2"><Todo>Capture activity-level regeneration from the working product</Todo><Todo>Export sliders and itinerary-control exploration from Figma</Todo></div>
          <p className="mt-5 text-[13px] text-[#7E746D]">A small correction should not restart the entire conversation.</p>
        </Section>

        <Section eyebrow="Motion design" title="The wait is part of the product">
          <Copy><p>Generating the itinerary takes a few seconds, and I did not want to cover that time with a spinner.</p><p>The loading state became a way to show how the product was thinking. It moves through the details, the mood, real places and the route so people understand that the answer is being built from their inputs.</p><p>I explored constellation motion, image reveals, ambient gradients and staged copy, then pulled the system back so there was one main orchestrated moment instead of animation everywhere.</p><p>The motion also helped the transition feel continuous. The choices someone just made begin moving, organizing and turning into the day rather than disappearing into a blank loading screen.</p></Copy>
          <div className="mt-10"><Motion webm="/outdone-loading-motion.webm" mp4="/outdone-loading-motion.mp4" poster="/outdone-loading-motion-poster.webp" label="Outdone staged loading experience with flight interaction and progress copy" /></div>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3 border-b border-[#D8CEC7] pb-6 text-[13px] text-[#5F5853]"><span><strong>Anticipation:</strong> the day is on its way</span><span><strong>Progress:</strong> staged copy explains the work</span><span><strong>Continuity:</strong> the selected context stays visible</span><span><strong>Trust:</strong> real places and routes are named</span></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3"><Todo>Export early constellation exploration from Figma</Todo><Todo>Export loading storyboard and itinerary assembly</Todo><Todo>Export reduced-motion state</Todo></div>
        </Section>

        <Section eyebrow="Visual exploration" title="I wanted the product to feel like the possibility of a good day" warm>
          <Copy><p>The first visual directions leaned heavily into gradients, glass surfaces and a more futuristic AI feeling. They made the product feel exciting, but they also competed with the places and made the experience feel less believable.</p><p>I always like to try blue-sky designs and then scale down, so I explored different levels of color, depth, photography and motion before deciding what should lead.</p><p>The final direction keeps the sense of energy through the imagery, type, mood interactions and movement, while the interface itself stays simple enough for the itinerary to remain useful.</p></Copy>
          <div className="mt-10 grid gap-4 md:grid-cols-3"><Todo>Export early atmospheric direction from Figma</Todo><Todo>Export early glass visual direction from Figma</Todo><Todo>Export warm final direction exploration from Figma</Todo></div>
          <div className="mt-4 rounded-[26px] bg-white p-6 sm:p-8"><p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#B6632C]">Final visual system</p><div className="mt-6 grid gap-x-8 gap-y-4 text-[14px] text-[#5F5853] sm:grid-cols-2 lg:grid-cols-3">{["Clear type with an editorial display face", "Warm neutral canvas and white surfaces", "Fine borders with restrained shadows", "Real destination photography", "Mood cards that respond through imagery", "Simple iconography", "Gradients reserved for atmosphere", "Generous spacing around the itinerary", "Motion focused on generation and transition"].map(item => <p key={item} className="border-b border-[#E2DAD4] pb-3">{item}</p>)}</div></div>
        </Section>

        <Section eyebrow="Building the product" title="Design decisions changed once I used it on a real phone">
          <Copy><p>I built the working product with Gemini, Google Places and Google Maps, then tested it as an actual day-planning experience instead of stopping at the prototype.</p><p>Using it on a phone exposed details that were easy to miss in Figma. Destination search repeated itself, some recommendations ignored selected moods, restaurants appeared when culinary was turned off and an itinerary could contain individually good stops that made no sense together.</p><p>Those issues moved the work beyond screen design. I kept changing the prompt structure, recommendation constraints, activity selection and route logic based on what the product actually did.</p></Copy>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_0.55fr]"><div className="rounded-[26px] bg-[#1F2522] p-6 text-[#DCE6E1] sm:p-8"><p className="text-[10px] uppercase tracking-[0.1em] text-[#9CB7AA]">A shortened recommendation constraint</p><pre className="mt-6 whitespace-pre-wrap text-[12px] leading-[1.8]"><code>{`Mood: adventurous\nLook for: elevation, speed, water, effort, risk\nCheck: place identity, hours, distance, route\nRespect: dietary needs, group, transport, request\nReturn: a small set of real, explainable options`}</code></pre><p className="mt-7 text-[12px] leading-[1.65] text-[#AEBAB4]">The source also verifies Google Places grounding, route-matrix optimization, stop reordering and a Google Maps route handoff.</p></div><Picture src="/outdone-results-mobile.webp" alt="Outdone working itinerary on a mobile screen" contain /></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2"><Todo>Export hackathon phone-testing photo</Todo><Todo>Capture the Google Maps route output</Todo></div>
        </Section>

        <Section eyebrow="The final experience" title="From a vague feeling to a day someone can follow" warm>
          <Copy><p>The current experience starts with how someone wants the day to feel, adds the practical context and turns it into a visual itinerary with real places.</p><p>People can choose from activity ideas, adjust the day, replace a stop and open the route in Google Maps when they are ready to go.</p><p>The part I care about most is that the product helps before someone has the perfect prompt. It gives shape to the feeling, then gives the user enough control to make the answer theirs.</p></Copy>
          <div className="mt-10"><Picture src="/outdone-results.webp" alt="Outdone desktop itinerary showing a grounded San Francisco activity" /></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2"><Todo>Capture the edit interaction in the current working product</Todo><Todo>Capture the Google Maps handoff</Todo></div>
          <div className="mt-7"><ExternalLink href={LIVE_URL} primary>Try Outdone</ExternalLink></div>
        </Section>

        <Section eyebrow="App or startup?" title="Building it made me question what was actually irreplaceable">
          <Copy><p>We took a smaller version of Outdone to the Stanford and Google DeepMind hackathon, where one of the first questions was about the business and why this needed to exist as its own product.</p><p>That made me step back. AI itinerary planning is useful, but it is also something larger platforms can add. The stronger opportunity is in what happens after the first plan: understanding changing intent, updating the day around location and time, learning from small corrections and helping someone act without planning everything again.</p><p>It changed how I think about the roadmap. A working app proves the interaction. A product still needs a reason people would return and a capability that is difficult to replace.</p></Copy>
          <div className="mt-10 grid gap-4 lg:grid-cols-[0.6fr_1.4fr]"><Todo>Export hackathon image or working Android prototype</Todo><ol className="grid gap-3 sm:grid-cols-2">{["Generate a plan", "Adapt during the day", "Learn from corrections", "Help complete the experience"].map((item, index) => <li key={item} className="rounded-[22px] bg-[#F5F0EC] p-5"><span className="text-[10px] text-[#B6632C]">0{index + 1}</span><p className="mt-4 text-[17px] font-semibold">{item}</p></li>)}</ol></div>
        </Section>

        <Section eyebrow="Reflection" title="The interface was only one part of designing the recommendation" warm>
          <Copy><p>This project started as a mood-first itinerary idea and became an exploration of what an AI product needs to understand, which questions are worth asking, how specific the instructions need to be and what control someone needs after the answer appears.</p><p>It also made me think differently about my role as a designer. I was working on the idea, the model behavior, the interaction, the visual identity, the motion, the code and the question of why the product should exist at all.</p></Copy>
          <p className="mt-12 max-w-[950px] text-[28px] font-medium leading-[1.35] tracking-[-0.04em] text-[#211F1C] sm:text-[40px]">The biggest design decision was deciding what the system should know about someone today.</p>
        </Section>
      </div>
    </article>
  );
}
