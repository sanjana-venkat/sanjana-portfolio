const FONT = "[font-family:'Plus_Jakarta_Sans',sans-serif]";

function Link({ href, children, primary = false }) {
  return <a href={href} target="_blank" rel="noreferrer" className={`inline-flex rounded-full px-5 py-3 text-[13px] font-semibold transition hover:-translate-y-0.5 ${primary ? "bg-[#1D1D1B] text-white" : "bg-[#E8E3DF] text-[#1D1D1B]"}`}>{children}<span className="ml-2">↗</span></a>;
}

function Section({ eyebrow, title, children }) {
  return <section className="py-16 sm:py-24"><p className="text-[12px] font-semibold uppercase tracking-[0.09em] text-[#B6632C]">{eyebrow}</p><h2 className="mt-4 max-w-[940px] text-[31px] font-medium leading-[1.12] tracking-[-0.045em] sm:text-[45px]">{title}</h2><div className="mt-7 text-[17px] leading-[1.72] text-[#66605C] sm:text-[19px]">{children}</div></section>;
}

function Image({ src, alt, className = "" }) {
  return <figure className={`flex min-w-0 items-center justify-center overflow-hidden rounded-[26px] bg-[#F4F0ED] ${className}`}><img src={src} alt={alt} className="h-full w-full object-contain" /></figure>;
}

function Placeholder({ children, compact = false }) {
  return <div className={`flex items-center justify-center rounded-[26px] border border-dashed border-[#CFC7C1] bg-[#F7F2EF] p-7 text-center text-[13px] font-medium leading-[1.5] text-[#756D67] ${compact ? "min-h-[190px]" : "min-h-[300px]"}`}>{children}</div>;
}

function Feature({ title, copy, image, alt, reverse = false, placeholder }) {
  return <div className={`grid items-center gap-7 lg:grid-cols-2 lg:gap-12 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
    {image ? <Image src={image} alt={alt} className="min-h-[300px]" /> : <Placeholder>{placeholder}</Placeholder>}
    <div><h3 className="text-[28px] font-medium tracking-[-0.035em] text-[#24211F] sm:text-[34px]">{title}</h3><p className="mt-5 text-[17px] leading-[1.75] text-[#68615D]">{copy}</p></div>
  </div>;
}

export function MuesliStudy() {
  const onboarding = ["Muesli grain animation", "Name setup", "Permission-specific guidance", "Shortcut, microphone and live dictation test", "Launch into the app"];
  return <article className={`work-case-study h-full w-full min-w-0 max-w-full overflow-x-hidden overflow-y-auto bg-white text-[#161513] ${FONT}`}><div className="mx-auto w-full min-w-0 max-w-[1080px] px-5 py-10 sm:px-10 sm:py-16">
    <header className="grid min-w-0 gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
      <div className="min-w-0 overflow-hidden rounded-[26px] bg-[#353533] p-3 sm:p-4"><video className="block h-full min-h-[390px] min-w-0 max-w-full rounded-[19px] object-cover" poster="/muesli-preview.jpg" autoPlay loop muted playsInline controls preload="metadata"><source src="/muesli-prototype.webm" type="video/webm" /><source src="/muesli-prototype.mp4" type="video/mp4" />Your browser cannot play this video.</video></div>
      <div className="flex min-w-0 flex-col justify-center rounded-[26px] bg-[#F7F2EF] p-7 sm:p-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.09em] text-[#B6632C]">Muesli · Product design + SwiftUI</p>
        <h1 className="mt-7 break-words text-[36px] font-medium leading-[1.08] tracking-[-0.045em] sm:text-[44px]">Redesigning a powerful dictation app so it feels simple from the first word</h1>
        <p className="mt-5 text-[16px] leading-[1.65] text-[#68615D]">Muesli is a private dictation app for Mac that runs locally. The technology was already strong, but the experience made people understand the system before they got to feel the value.</p>
        <p className="mt-4 text-[16px] leading-[1.65] text-[#68615D]">I redesigned the onboarding and the core app, then built the direction in SwiftUI and opened a PR against the real codebase.</p>
        <div className="mt-7 grid gap-4 border-t border-[#DDD5D0] pt-6 text-[12px] sm:grid-cols-3"><div><p className="font-semibold uppercase tracking-[0.08em] text-[#B6632C]">Role</p><p className="mt-2 leading-[1.5] text-[#57514D]">Product designer</p></div><div><p className="font-semibold uppercase tracking-[0.08em] text-[#B6632C]">Work</p><p className="mt-2 leading-[1.5] text-[#57514D]">Onboarding, product structure, interaction design, visual system and SwiftUI</p></div><div><p className="font-semibold uppercase tracking-[0.08em] text-[#B6632C]">Status</p><p className="mt-2 leading-[1.5] text-[#57514D]">Open-source contribution, PR under review</p></div></div>
        <div className="mt-7 flex flex-wrap gap-3"><Link href="https://github.com/Muesli-HQ/muesli/pull/329" primary>View implementation PR</Link><Link href="https://www.figma.com/design/QO5TcpLfxmcheMMjcMYg6C/Muesli?node-id=17-5">Explore V1 to V2</Link></div>
      </div>
    </header>

    <Section eyebrow="The problem" title="The product was doing a lot. The experience showed all of it at once.">
      <p className="max-w-[900px]">Muesli can handle live dictation, meetings, model downloads, custom words, shortcuts, insights and settings.</p>
      <p className="mt-5 max-w-[900px]">But the first-run experience asked people to make decisions about permissions, microphones and shortcuts before they had dictated a sentence. Once they entered the app, every feature had similar visual weight, so it was difficult to know where to begin.</p>
      <p className="mt-9 max-w-[920px] text-[25px] font-medium leading-[1.4] tracking-[-0.03em] text-[#24211F] sm:text-[32px]">The experience needed to get someone to the value quickly, then help them discover the depth over time.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2"><Placeholder>TODO: Export original onboarding screen from Figma</Placeholder><Image src="/muesli-still-01.png" alt="Redesigned Muesli record workspace" /></div>
    </Section>

    <Section eyebrow="Onboarding" title="The first goal was one successful dictation">
      <p className="max-w-[900px]">I mapped the setup around what a new user is actually wondering at each step:</p>
      <div className="mt-7 space-y-2 text-[22px] font-medium leading-[1.45] tracking-[-0.025em] text-[#292623] sm:text-[27px]"><p>Why do you need this permission?</p><p>Is my audio leaving my Mac?</p><p>Which microphone are you using?</p><p>What shortcut do I press?</p><p>Did it work?</p></div>
      <p className="mt-8 max-w-[900px]">Instead of showing one long technical checklist, each step explains one decision and immediately lets the user act on it.</p>
      <p className="mt-5 max-w-[900px]">The final step brings shortcut selection, microphone selection and a live dictation test together. By the time someone enters the app, they already know how to use the product and know that it works.</p>
      <p className="mt-5 max-w-[900px]">To make the permission-heavy setup feel warmer, I introduced an opening animation where grains form the Muesli wordmark and one grain dots the i. It gives the product personality before the technical steps begin.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{onboarding.map((label, index) => <div key={label}><Placeholder compact>TODO: Export {label} from Figma</Placeholder><p className="mt-3 text-[12px] font-semibold leading-[1.5] text-[#5E5752]">{index + 1}. {label}</p></div>)}</div>
    </Section>

    <Section eyebrow="Product structure" title="The core action needed to stay visible">
      <p className="max-w-[900px]">The dashboard had Dictations, Meetings, Insights, Dictionary, Models, Shortcuts and Settings competing in one flat structure.</p>
      <p className="mt-5 max-w-[900px]">I made Record a persistent action, taught the keyboard shortcut in context and added a collapsible sidebar so the writing can stay in focus.</p>
      <p className="mt-5 max-w-[900px]">The full product is still there, but people no longer have to understand every feature before they can begin.</p>
      <Image src="/muesli-still-01.png" alt="Redesigned Muesli navigation and recording workspace" className="mt-10" />
      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-[14px] font-semibold text-[#3E3935]"><span>↳ Persistent Record action</span><span>↳ Collapsible navigation</span><span>↳ Recent dictations within reach</span></div>
    </Section>

    <Section eyebrow="The broader experience" title="I redesigned the daily product, not only the setup">
      <p className="max-w-[900px]">Once the hierarchy was clear, I carried the same system across the rest of the app.</p>
      <div className="mt-12 space-y-16"><Feature title="Dictations" copy="A clearer starting state, a reminder that everything stays on the Mac, a visible recording control and history that is easier to scan." image="/muesli-history.webp" alt="Redesigned Muesli dictation history" /><Feature title="Meetings" copy="Stronger browsing hierarchy, clearer filters and meeting notes that are easier to read and return to." reverse placeholder="TODO: Export Meetings screen from Figma" /><Feature title="Insights" copy="A bento-style view of activity, streaks, common words and the apps where someone dictates most." placeholder="TODO: Export Insights screen from Figma" /><Feature title="Dictionary" copy="A more useful way to add, review and edit the names or words the model should understand." reverse placeholder="TODO: Export Dictionary screen from Figma" /></div>
      <div className="mt-16"><Placeholder>TODO: Export Models, Shortcuts and Settings supporting image from Figma</Placeholder><p className="mt-4 text-[14px] text-[#756D67]">The deeper controls still exist, but now they feel connected to the same product.</p></div>
    </Section>

    <Section eyebrow="Visual system" title="Making a technical product feel warm">
      <p className="max-w-[900px]">Most local AI tools feel technical because there is a lot happening behind the interface. I wanted Muesli to feel calm and human without hiding how it works.</p>
      <p className="mt-5 max-w-[900px]">I used the oat, brown and sage palette, square rounded controls, simple drawings and slightly handwritten headings to make permissions, models and settings easier to approach while keeping the feel of a real Mac utility.</p>
      <div className="mt-10"><Placeholder>TODO: Export visual system composition from Figma: color, typography, illustration, controls, permissions and recording states</Placeholder></div>
    </Section>

    <Section eyebrow="Designing with the build" title="I did not stop at the Figma file">
      <p className="max-w-[900px]">I translated the direction into SwiftUI and worked against Muesli’s existing architecture.</p>
      <p className="mt-5 max-w-[900px]">The real build exposed things a static frame does not: window resizing, collapsed navigation, long histories, active recording, empty states, permission behavior and component reuse.</p>
      <p className="mt-5 max-w-[900px]">I updated onboarding, dashboard navigation, Dictations, Meetings, Insights, Dictionary, Models, Shortcuts, Settings and the floating dictation indicator.</p>
      <p className="mt-9 max-w-[920px] text-[25px] font-medium leading-[1.4] tracking-[-0.03em] text-[#24211F] sm:text-[32px]">A screen can look good at one size. A product has to keep working when everything changes.</p>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><Image src="/muesli-still-01.png" alt="Working Muesli SwiftUI implementation" /><div className="rounded-[26px] bg-[#1E1E1D] p-7 text-white sm:p-9"><p className="text-[12px] uppercase tracking-[0.1em] text-white/55">Open-source contribution</p><h3 className="mt-5 text-[28px] font-medium tracking-[-0.035em]">What I designed and built</h3><p className="mt-5 text-[15px] leading-[1.7] text-white/70">Onboarding, dashboard navigation, Dictations, Meetings, Insights, Dictionary, Models, Shortcuts, Settings and the floating dictation indicator.</p><p className="mt-5 text-[13px] text-[#BFD8CA]">PR under review</p><div className="mt-7"><Link href="https://github.com/Muesli-HQ/muesli/pull/329">View implementation PR</Link></div></div></div>
    </Section>

    <Section eyebrow="Reflection" title="Local-first is a technical advantage. Trust still comes from the experience.">
      <p className="max-w-[900px]">People should not have to understand models, permissions and storage before they understand the product.</p>
      <p className="mt-5 max-w-[900px]">The best version lets them feel the speed first, explains what stays on their Mac and reveals the deeper system when they need it.</p>
      <p className="mt-9 max-w-[920px] text-[25px] font-medium leading-[1.4] tracking-[-0.03em] text-[#24211F] sm:text-[32px]">The result is an end-to-end product direction and a working SwiftUI contribution, designed inside the constraints of the real app.</p>
    </Section>
  </div></article>;
}
