const HEADING = "[font-family:'Plus_Jakarta_Sans',sans-serif]";
const BODY = "[font-family:'Open_Sans',sans-serif]";

function Link({ href, children, primary = false }) {
  return <a href={href} target="_blank" rel="noreferrer" className={`inline-flex rounded-full px-5 py-3 text-[13px] font-semibold transition hover:-translate-y-0.5 ${primary ? "bg-[#1D1D1B] text-white" : "bg-[#E8E3DF] text-[#1D1D1B]"} ${HEADING}`}>{children}<span className="ml-2">↗</span></a>;
}

function Section({ eyebrow, title, children }) {
  return <section className="py-16 sm:py-24"><p className={`text-[12px] font-semibold uppercase tracking-[0.09em] text-[#B6632C] ${HEADING}`}>{eyebrow}</p><h2 className={`mt-4 max-w-[920px] text-[31px] font-medium leading-[1.12] tracking-[-0.045em] text-[#161513] sm:text-[45px] ${HEADING}`}>{title}</h2><div className="mt-6 text-[17px] leading-[1.7] text-[#66605C] sm:text-[19px]">{children}</div></section>;
}

function Image({ src, alt, className = "", contain = false }) {
  return <div className={`overflow-hidden rounded-[26px] bg-[#F4F0ED] ${className}`}><img src={src} alt={alt} className={`h-full w-full ${contain ? "object-contain" : "object-cover"}`} /></div>;
}

function Shell({ children }) {
  return <article className={`work-case-study h-full w-full min-w-0 max-w-full overflow-x-hidden overflow-y-auto bg-white text-[#161513] ${BODY}`}><div className="mx-auto w-full min-w-0 max-w-[1120px] px-5 py-9 sm:px-10 sm:py-16">{children}</div></article>;
}

export function MuesliStudy() {
  return (
    <Shell>
      <header className="grid min-w-0 gap-6 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="min-w-0 overflow-hidden rounded-[32px] bg-[#353533] p-3 sm:p-5"><video className="block h-full min-h-[340px] min-w-0 max-w-full rounded-[23px] object-cover" poster="/muesli-preview.jpg" autoPlay loop muted playsInline controls preload="metadata"><source src="/muesli-prototype.webm" type="video/webm" /><source src="/muesli-prototype.mp4" type="video/mp4" />Your browser cannot play this video.</video></div>
        <div className="min-w-0 flex flex-col justify-center rounded-[32px] bg-[#F7F2EF] p-7 sm:p-11"><p className={`text-[12px] font-semibold uppercase tracking-[0.09em] text-[#B6632C] ${HEADING}`}>Muesli · Product design + SwiftUI</p><h1 className={`mt-7 break-words text-[38px] font-medium leading-[1.06] tracking-[-0.052em] sm:text-[54px] ${HEADING}`}>Making local-first dictation feel simple.</h1><p className="mt-5 text-[17px] leading-[1.65] text-[#68615D]">Muesli is a private Mac dictation app with a lot going on under the hood. I redesigned the experience so the first dictation felt easy—and the power was still there when people needed it.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="https://github.com/Muesli-HQ/muesli/pull/329" primary>View my PR</Link><Link href="https://www.figma.com/design/QO5TcpLfxmcheMMjcMYg6C/Muesli?node-id=17-5">V1 → V2</Link><Link href="/muesli-prototype.mp4">Open video</Link></div></div>
      </header>

      <Section eyebrow="Why this needed work" title="The product was powerful. The starting point was not obvious.">
        <p className="max-w-[900px]">Setup asked people to make decisions about permissions, microphones and shortcuts before they had experienced the value. Once they got in, Dictations, Meetings, Insights and Settings all competed at the same level.</p>
        <p className={`mt-8 max-w-[900px] text-[24px] font-medium leading-[1.4] text-[#24211F] sm:text-[31px] ${HEADING}`}>The question became: how do I get someone to one good dictation, then reveal the rest?</p>
      </Section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[["01", "Teach in context", "Explain each permission when it becomes useful, not in one long setup checklist."], ["02", "One way in", "Make Record the clear starting point and teach the keyboard shortcut through use."], ["03", "Keep the depth", "Group secondary tools in a collapsible rail so they stay close without feeling heavy."]].map(([n, title, copy]) => <div key={n} className="rounded-[25px] bg-[#F7F2EF] p-6 sm:p-7"><p className={`text-[11px] font-semibold text-[#B6632C] ${HEADING}`}>{n}</p><h3 className={`mt-8 text-[21px] font-semibold tracking-[-0.025em] ${HEADING}`}>{title}</h3><p className="mt-3 text-[15px] leading-[1.7] text-[#68615D]">{copy}</p></div>)}
      </section>

      <Section eyebrow="The new structure" title="A clear record state first. Everything else has a home.">
        <p className="max-w-[880px]">I made Record persistent, gave recent dictations a scannable history and grouped the rest of the app around how people actually use it. The navigation can collapse, so the writing stays in focus.</p>
        <Image src="/muesli-navigation.webp" alt="Redesigned Muesli navigation and recording screen" className="mt-10" />
      </Section>

      <Section eyebrow="V1 → V2" title="The change was less about adding and more about choosing what should lead">
        <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-[26px] bg-[#F7F2EF] p-7"><p className={`text-[13px] font-semibold text-[#7D746E] ${HEADING}`}>Before</p><h3 className={`mt-4 text-[25px] font-medium leading-[1.25] tracking-[-0.035em] ${HEADING}`}>Setup felt procedural. Daily tools felt separate.</h3><p className="mt-4 text-[15px] leading-[1.7]">The app exposed its structure before it taught the core action.</p></div><div className="rounded-[26px] bg-[#E9E5E1] p-7"><p className={`text-[13px] font-semibold text-[#B6632C] ${HEADING}`}>After</p><h3 className={`mt-4 text-[25px] font-medium leading-[1.25] tracking-[-0.035em] ${HEADING}`}>One guided start. One workspace.</h3><p className="mt-4 text-[15px] leading-[1.7]">The first dictation builds confidence; the rest of the system reveals itself from there.</p></div></div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2"><Image src="/muesli-record-control.webp" alt="Muesli persistent recording control" /><Image src="/muesli-history.webp" alt="Muesli dictation history" /></div>
      </Section>

      <Section eyebrow="Designing with the build" title="I did not stop at the Figma file">
        <p className="max-w-[900px]">I translated the direction into SwiftUI and opened a PR against the actual Muesli codebase. That forced the design to handle real window sizes, component states and the existing product architecture—not just the clean path in a prototype.</p>
        <div className="mt-8 rounded-[27px] bg-[#1E1E1D] p-7 text-white sm:p-10"><p className={`text-[12px] uppercase tracking-[0.1em] text-white/55 ${HEADING}`}>What I shipped</p><p className={`mt-5 max-w-[900px] text-[25px] font-medium leading-[1.4] tracking-[-0.03em] sm:text-[34px] ${HEADING}`}>Onboarding, navigation, record controls, dictation history and a responsive foundation for the broader app.</p><div className="mt-7"><Link href="https://github.com/Muesli-HQ/muesli/pull/329">See the implementation</Link></div></div>
      </Section>

      <Section eyebrow="Reflection" title="A local-first product still has to earn trust through the interface">
        <p className="max-w-[900px]">Privacy is a strong reason to choose Muesli, but it should not be another thing users have to decode. The best version lets people feel the speed first, understand what stays local, and go deeper only when they want to.</p>
      </Section>
    </Shell>
  );
}

export function OutdoneStudy() {
  const pipeline = [["01", "Context", "Place, time, who is coming and one non-negotiable"], ["02", "Mood", "Short-term intent translated into behavioral constraints"], ["03", "Gemini", "Builds a coherent plan instead of a long list"], ["04", "Places", "Grounds each stop in real names, photos and locations"]];
  return (
    <Shell>
      <header className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <Image src="/outdone-landing.webp" alt="Outdone landing page" className="min-h-[420px]" />
        <div className="flex flex-col justify-center rounded-[32px] bg-[#F7F2EF] p-7 sm:p-11"><p className={`text-[12px] font-semibold uppercase tracking-[0.09em] text-[#B6632C] ${HEADING}`}>Outdone · Product + AI UX</p><h1 className={`mt-7 text-[38px] font-medium leading-[1.07] tracking-[-0.052em] sm:text-[50px] ${HEADING}`}>What if you know how you want to feel—but not what you want to do?</h1><p className="mt-5 text-[17px] leading-[1.65] text-[#68615D]">I built Outdone to turn mood, context and one specific request into a plan someone can actually follow.</p><div className="mt-8"><Link href="https://travel-dna-kohl.vercel.app/" primary>Try Outdone</Link></div></div>
      </header>

      <Section eyebrow="The problem" title="Sometimes “I want to get out” is the entire brief">
        <p className="max-w-[900px]">Search works when I already know what I want. It is much worse when I am bored, restless or just want today to feel different. The hard part is not finding options. It is forming the query.</p>
        <p className={`mt-8 max-w-[900px] text-[24px] font-medium leading-[1.4] text-[#24211F] sm:text-[31px] ${HEADING}`}>So I started with mood instead of category.</p>
      </Section>

      <Section eyebrow="Designing the input" title="Ask only for what will actually change the answer">
        <p className="max-w-[900px]">Destination and transportation ground the plan. Mood tells the system what kind of day this should be. One specific request—like “include a cooking class”—keeps the user in control.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2"><Image src="/outdone-setup.webp" alt="Outdone trip setup screen" /><Image src="/outdone-moods.webp" alt="Outdone mood selection screen" /></div>
      </Section>

      <Section eyebrow="The model problem" title="Gemini understood “adventurous.” It still gave me museums and parks.">
        <p className="max-w-[900px]">Technically valid. Completely wrong. Working with Abishek, I stopped treating moods like labels and turned them into constraints. Adventurous could mean elevation, speed, water, effort or risk—and should actively avoid passive sightseeing.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2"><div className="rounded-[26px] bg-[#F7F2EF] p-7"><p className={`text-[12px] uppercase tracking-[0.1em] text-[#8B817A] ${HEADING}`}>Label</p><p className={`mt-5 text-[30px] font-medium ${HEADING}`}>“Adventurous”</p><p className="mt-5 text-[15px]">Too much room for the model to guess.</p></div><div className="rounded-[26px] bg-[#E5EFEB] p-7"><p className={`text-[12px] uppercase tracking-[0.1em] text-[#2A6858] ${HEADING}`}>Constraint</p><p className="mt-5 text-[16px] leading-[1.7] text-[#2F5148]">Prioritize elevation, speed, water, physical effort, risk or a safety briefing. Avoid activities that could fit any mood.</p></div></div>
      </Section>

      <Section eyebrow="What runs behind it" title="Generate the day, then ground it in real places">
        <div className="grid gap-3">{pipeline.map(([number, title, copy]) => <div key={number} className="grid gap-2 rounded-[22px] bg-[#F7F2EF] p-5 sm:grid-cols-[56px_160px_1fr] sm:items-center"><span className={`text-[12px] font-semibold text-[#B6632C] ${HEADING}`}>{number}</span><span className={`text-[16px] font-semibold ${HEADING}`}>{title}</span><span className="text-[14px] leading-[1.6] text-[#6D6661]">{copy}</span></div>)}</div>
      </Section>

      <Section eyebrow="Showing the magic" title="The loading state tells you what the AI is doing">
        <p className="max-w-[880px]">I did not want a spinner. The wait is part of the product, so I used it to show the system reading context, interpreting mood, finding real places and building the route.</p>
        <Image src="/outdone-loading.webp" alt="Outdone animated generation state" className="mt-10" />
      </Section>

      <Section eyebrow="The final experience" title="From a vague feeling to one specific plan">
        <div className="grid gap-4 sm:grid-cols-[1.35fr_0.65fr]"><Image src="/outdone-results.webp" alt="Generated Outdone recommendation" /><Image src="/outdone-results-mobile.webp" alt="Outdone result on mobile" /></div>
        <p className="mt-10 max-w-[900px]">The biggest lesson was that more ideas did not make the product feel smarter. Relevance came from deciding what the AI should understand, what it should ask and where the user should stay in control.</p>
        <div className="mt-8"><Link href="https://travel-dna-kohl.vercel.app/" primary>Try the live product</Link></div>
      </Section>
    </Shell>
  );
}
