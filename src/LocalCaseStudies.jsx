const HEADING = "[font-family:'Plus_Jakarta_Sans',sans-serif]";

function StudyHero({ eyebrow, title, summary, image, imageAlt, stats = [] }) {
  return (
    <header className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
      <div className="flex flex-col justify-center rounded-[30px] bg-[#F6F1EE] p-7 sm:p-11">
        <p className={`text-[12px] font-semibold uppercase tracking-[0.1em] text-[#A5522A] ${HEADING}`}>{eyebrow}</p>
        <h1 className={`mt-7 text-[40px] font-medium leading-[1.04] tracking-[-0.055em] text-[#151412] sm:text-[58px] ${HEADING}`}>{title}</h1>
        <p className="mt-6 max-w-[620px] text-[17px] leading-[1.65] text-[#68615D] sm:text-[19px]">{summary}</p>
        {stats.length > 0 && (
          <div className="mt-9 grid grid-cols-3 gap-3 border-t border-[#DED6D1] pt-6">
            {stats.map(([value, label]) => (
              <div key={label}>
                <p className={`text-[24px] font-semibold tracking-[-0.04em] text-[#A5522A] sm:text-[32px] ${HEADING}`}>{value}</p>
                <p className="mt-1 text-[11px] leading-[1.4] text-[#77706B] sm:text-[12px]">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="overflow-hidden rounded-[30px] bg-[#ECE7E3]">
        <img src={image} alt={imageAlt} className="h-full min-h-[360px] w-full object-cover" />
      </div>
    </header>
  );
}

function Section({ eyebrow, title, children, compact = false }) {
  return (
    <section className={compact ? "py-12 sm:py-16" : "py-16 sm:py-24"}>
      <p className={`text-[12px] font-semibold uppercase tracking-[0.1em] text-[#A5522A] ${HEADING}`}>{eyebrow}</p>
      <h2 className={`mt-4 max-w-[950px] text-[31px] font-medium leading-[1.12] tracking-[-0.045em] text-[#161513] sm:text-[46px] ${HEADING}`}>{title}</h2>
      <div className="mt-6 text-[17px] leading-[1.7] text-[#66605C] sm:text-[19px]">{children}</div>
    </section>
  );
}

function ImagePanel({ src, alt, caption, className = "" }) {
  return (
    <figure className={`overflow-hidden rounded-[26px] bg-[#F3EFEC] ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      {caption && <figcaption className="px-5 py-4 text-[12px] text-[#776F6A]">{caption}</figcaption>}
    </figure>
  );
}

function Quote({ children }) {
  return <p className={`rounded-[28px] bg-[#F6F1EE] p-7 text-[25px] font-medium leading-[1.35] tracking-[-0.03em] text-[#272421] sm:p-10 sm:text-[34px] ${HEADING}`}>{children}</p>;
}

function StudyShell({ children }) {
  return <article className="work-case-study h-full w-full min-w-0 max-w-full overflow-x-hidden overflow-y-auto bg-white text-[#161513]"><div className="mx-auto w-full min-w-0 max-w-[1160px] px-5 py-8 sm:px-10 sm:py-14">{children}</div></article>;
}

export function B2CCaseStudy() {
  return (
    <StudyShell>
      <StudyHero eyebrow="JPMorgan Chase · Home Lending" title="Home Lending Public Experience" summary="I helped the team move from optimizing individual pages to understanding what customers actually needed before they were ready to apply." image="/legacy/b2c/01-ymR75kzrcRfz85kR75nKia3tc.png" imageAlt="Chase Home Lending experience shown on laptop and mobile" stats={[["38%", "boost in lead initiation"], ["−0.5%", "overall lead submit"], ["4%", "increase in key funnel step"]]} />

      <Section eyebrow="The problem" title="High traffic — low conversion">
        <p className="max-w-[880px]">We kept making changes to the application flow, but the numbers were not moving enough. I went deeper into the funnel and found that the real problem started much earlier: we were designing for people ready to apply and missing everyone still trying to understand their options.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2"><ImagePanel src="/legacy/b2c/02-4f1paTcLpwkR15o3RbyggwIz0s0.png" alt="Home lending performance chart" /><ImagePanel src="/legacy/b2c/03-E4FnfyepYIjdwCLHI4nRzcN9TgQ.png" alt="Home lending conversion funnel" /></div>
      </Section>

      <Section eyebrow="Getting aligned" title="A three-day workshop gave us one shared problem to solve">
        <p className="max-w-[890px]">I brought design, product, marketing and research together to map the journey. We worked through scenarios, habits and anxieties instead of jumping straight to another page redesign.</p>
        <ImagePanel src="/legacy/b2c/05-k0QzJIXZxHNx1fiyWSb3dFHRUSo.png" alt="Three-day cross-functional workshop" className="mt-10" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2"><ImagePanel src="/legacy/b2c/08-Y4f4MQy2jqxjZFsycjPANNzmE58.png" alt="Workshop notes and customer journey mapping" /><ImagePanel src="/legacy/b2c/04-Lc5ekFyZ0kkSExMuDHkfFyyS1QA.png" alt="Customer scenario map" /></div>
      </Section>

      <Section eyebrow="The shift" title="We stopped segmenting by product and started segmenting by need">
        <p className="max-w-[890px]">Someone checking equity, comparing rates and preparing to buy all need different things—even if they eventually use the same product. That became the strategy: identify the need first, then make the next step feel obvious.</p>
        <Quote>What is this customer trying to accomplish right now?</Quote>
        <ImagePanel src="/legacy/b2c/10-7M6K11H6e8xIaElT6qKiU1m7P4.png" alt="Need-based segmentation framework" className="mt-5" />
      </Section>

      <Section eyebrow="Designing the experience" title="Each need got a clearer path forward">
        <p className="max-w-[860px]">I translated the framework into focused mobile journeys and clearer Apply messaging. The first result was not perfectly clean—overall submit dipped—but lead initiation increased 38%. That signal gave us what we needed to keep redesigning the full journey.</p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"><ImagePanel src="/legacy/b2c/11-l9jPg2STWZZsm8B1eiK7ZNBG9ps.png" alt="Need-based mobile experience one" /><ImagePanel src="/legacy/b2c/12-xPxcAuX1vCQDzANWabMsZeb3FA.png" alt="Need-based mobile experience two" /><ImagePanel src="/legacy/b2c/13-xE6dos6mfQQCkqUOM8vpPEcBNDE.png" alt="Need-based mobile experience three" /><ImagePanel src="/legacy/b2c/14-TD8YRxTjhJCBG3Sa2WIlJFsEgzY.png" alt="Need-based mobile experience four" /></div>
      </Section>

      <Section eyebrow="Impact" title="The work moved the conversation from page changes to journey change" compact>
        <p className="max-w-[900px]">The clearer Apply message drove a 38% increase in lead initiation. More importantly, the work got the full experience and design-system modernization onto the roadmap. The product is now live and continuing to evolve with AI.</p>
        <ImagePanel src="/legacy/b2c/15-qzuAceqxB3JlAh49a20hHH7R8M.png" alt="Modernized Home Lending experience" className="mt-10" />
      </Section>
    </StudyShell>
  );
}

export function IntentCaseStudy() {
  return (
    <StudyShell>
      <StudyHero eyebrow="JPMorgan Chase · Personalization" title="Intent-based recommendations" summary="We had plenty of content. The hard part was deciding what to show each customer and why." image="/legacy/intent/01-ULRP0FZksJHUAfiiIvrdPTDdkE4.png" imageAlt="Intent-based recommendation screens" stats={[["17%", "increase in click-through"], ["40%", "homepage traffic"], ["5%", "tiles driving action"]]} />

      <Section eyebrow="The problem" title="One size fits all was not working">
        <p className="max-w-[880px]">Forty percent of customers reached Home Lending through the homepage, but the same marketing tiles appeared for everyone. We were calling that personalization even though we were not responding to what someone came to do.</p>
        <ImagePanel src="/legacy/intent/02-iva8IfQ52CLxUlzXZE5UHow6XFE.png" alt="Existing generic recommendation experience" className="mt-10" />
      </Section>

      <Section eyebrow="Finding the question" title="What is John trying to accomplish today?">
        <p className="max-w-[880px]">In the workshop, we mapped assumptions about behavior, available signals and business goals. The useful shift was small: stop asking who John is in general and ask what he needs in this moment.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2"><ImagePanel src="/legacy/intent/03-NJCEltAvgd1A8smKn4ussJR38I.jpeg" alt="Personalization workshop" /><ImagePanel src="/legacy/intent/05-ObUPjHiF6JFeqKmCUP6pQWmDYvY.png" alt="Assumption mapping from the workshop" /></div>
        <ImagePanel src="/legacy/intent/08-Zeck9bin3pBmkpU6OYKCORmg1Qs.png" alt="Intent response framework" className="mt-4" />
      </Section>

      <Section eyebrow="The framework" title="Start with intent. Then decide how the experience should respond.">
        <p className="max-w-[890px]">I built a framework connecting behavioral signals to a customer need, a message and the right next action. It gave content, design and data teams one system to work from.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2"><ImagePanel src="/legacy/intent/09-C2XStsxJenvpOyGEhqArlgECcNA.png" alt="Generic recommendation state" caption="Current: generic" /><ImagePanel src="/legacy/intent/10-m78VUILEi5Otqglb7ji6cSsuA.png" alt="Relevant recommendation state" caption="Direction: relevant to intent" /></div>
        <ImagePanel src="/legacy/intent/13-5n6T6sd0EjkDCh9hn214Pktu20.png" alt="Intent classification and response flow" className="mt-4" />
      </Section>

      <Section eyebrow="Testing the system" title="The idea needed to work as a model, not one perfect tile">
        <p className="max-w-[880px]">We tested the structure across placements, image choices, recency and different levels of data. The goal was a repeatable decision system the team could learn from—not a one-off campaign.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2"><ImagePanel src="/legacy/intent/16-Sc4IgTjfcYuOD4ocx648Mylgj8.png" alt="Recommendation utility bar" /><ImagePanel src="/legacy/intent/20-FmI3JCluVAkBzdYOzQv8X4bGza4.png" alt="Personalization analysis" /></div>
        <ImagePanel src="/legacy/intent/24-p9yTAjfjheCYVsFcwTurs0KGdic.png" alt="Personalization model card" className="mt-4" />
      </Section>

      <Section eyebrow="Impact" title="Relevant recommendations increased click-through by 17%" compact>
        <p className="max-w-[900px]">The first experiment proved customers responded when the content matched what they were trying to do. It also gave the team a roadmap for adding more signals without losing the logic behind the recommendation.</p>
        <ImagePanel src="/legacy/intent/26-mLkdwJEZnMzhAgIiofVsa9ixzYQ.png" alt="Timely and relevant recommendation tile" className="mt-10" />
      </Section>
    </StudyShell>
  );
}

export function ServiceDesignCaseStudy() {
  return (
    <StudyShell>
      <StudyHero eyebrow="JPMorgan Chase · Apply & Self-service" title="Designing systems at scale" summary="I mapped the full Apply ecosystem so we could design around customer confidence, backend dependencies and the moments that still needed a human." image="/legacy/service-design/01-G9fAv4zfnXda5ghIjXZ3mSXe6hg.png" imageAlt="Apply and self-service experience" stats={[["5.5%", "lead conversion"], ["3.1K", "tool visits"], ["208", "qualified leads"]]} />

      <Section eyebrow="Two sides of the story" title="The business wanted more leads. Customers wanted to know if applying was worth it.">
        <p className="max-w-[900px]">We were focused on reducing drop-off inside Apply. Research showed customers were making a decision before they got there: Can I do this myself? What will happen next? Do I need to talk to someone?</p>
        <ImagePanel src="/legacy/service-design/05-fCpiK06ogDAiR4oP3Zvumcd6tTY.png" alt="Customer research quotes and themes" className="mt-10" />
      </Section>

      <Section eyebrow="Discovery" title="Before changing the screen, I mapped what ran behind it">
        <p className="max-w-[880px]">I ran a cross-functional workshop and built a service blueprint across the customer journey, advisor handoffs and backend systems. It became a living document because everyone could finally see where a front-end idea created work somewhere else.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2"><ImagePanel src="/legacy/service-design/02-ZFPRZ7LSTxEcd2CSnrId0r8sM.png" alt="Cross-functional discovery workshop" /><ImagePanel src="/legacy/service-design/04-hWbZu3mILmurAxceD1HD8T3LjkU.png" alt="Workshop journey mapping" /></div>
        <ImagePanel src="/legacy/service-design/06-UVlNnxS8OdmPfKYrIM6r4NlXE.png" alt="Apply and fulfillment service blueprint" className="mt-4" />
      </Section>

      <Section eyebrow="The strategy" title="Ask for information only after we give something useful back">
        <p className="max-w-[900px]">Instead of pushing everyone into Apply, we created a smaller self-service moment first. A rate tool gave customers a useful answer, built confidence and made the value exchange clear before asking for contact information.</p>
        <ImagePanel src="/legacy/service-design/07-t37f9WcLWqDcXNCHIzwZ64iwRy8.png" alt="Self-service journey and handoff flow" className="mt-10" />
      </Section>

      <Section eyebrow="Designing the flow" title="One connected journey—from exploration to a qualified conversation">
        <p className="max-w-[880px]">I designed the responsive experience across the rate tool, Apply entry points and advisor handoff. Each step answered the question a customer had before asking them to take the next one.</p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"><ImagePanel src="/legacy/service-design/09-yFWJIopXdaXOq5cQWJqgMSuB4.png" alt="Rate tool mobile screen" /><ImagePanel src="/legacy/service-design/10-jNarU319ulSuOW5YqJqPNNWHw.png" alt="Rate tool mobile result" /><ImagePanel src="/legacy/service-design/12-jPgyuhp98K52ZolLf6JB4q6YTE.png" alt="Apply mobile screen" /><ImagePanel src="/legacy/service-design/14-vvrSTqYSTRKaqSf7od5tvnU4cn4.png" alt="Advisor handoff mobile screen" /></div>
      </Section>

      <Section eyebrow="Impact" title="The rate tool became a useful experience and a better lead path" compact>
        <p className="max-w-[900px]">The experience reached 3.1K visits, created 208 leads and converted at 5.5%. The blueprint also kept paying off: teams used it to make decisions across the ecosystem instead of solving each screen in isolation.</p>
        <ImagePanel src="/legacy/service-design/16-JOBMM1bAY5wD6qiIQFvUSmzAT0.png" alt="Final Apply and self-service experience" className="mt-10" />
      </Section>
    </StudyShell>
  );
}

export function AISearchCaseStudy() {
  return (
    <StudyShell>
      <StudyHero eyebrow="JPMorgan Chase · AI Search" title="AI Search Interfaces" summary="I explored how ChatGPT and Gemini could turn search-time intent into action without breaking the conversation." image="/legacy/ai-search/01-ok2FwLhpQVwF3DD3NzVjcxrqtjs.png" imageAlt="AI search interface shown across devices" />

      <Section eyebrow="The shift" title="Search is becoming a conversation—and the interface has to change with it">
        <p className="max-w-[900px]">People are already asking AI questions they used to type into search. The opportunity was not to add another chatbot. It was to understand where a financial product could genuinely help and how to make that next step feel natural.</p>
      </Section>

      <Section eyebrow="The model questions" title="Before designing the UI, we had to decide how the system should behave">
        <div className="grid gap-4 sm:grid-cols-3">
          {[["Intent", "What is the customer really trying to accomplish?"], ["Boundaries", "When should the assistant answer, ask more, or hand off?"], ["Action", "How do we move closer to a task without hijacking the conversation?"]].map(([title, copy]) => <div key={title} className="rounded-[26px] bg-[#F6F1EE] p-6 sm:p-8"><p className={`text-[20px] font-semibold text-[#26231F] ${HEADING}`}>{title}</p><p className="mt-4 text-[15px] leading-[1.7] text-[#6C6560]">{copy}</p></div>)}
        </div>
        <ImagePanel src="/legacy/ai-search/02-25WhZJSmrMK0G7FEahIFObZUF0.png" alt="AI search interface workshop notes" className="mt-5" />
      </Section>

      <Section eyebrow="The principles" title="Helpful AI gets the customer closer to action without pretending it can do everything">
        <p className="max-w-[900px]">We designed around three principles: understand intent before recommending, make boundaries visible, and keep a clear handoff between the model, the product and a human advisor.</p>
        <ImagePanel src="/legacy/ai-search/04-OYEkdgibcyKuscc4fzvTxM7RGlU.png" alt="AI trust, product action and human handoff flow" className="mt-10" />
      </Section>

      <Section eyebrow="Why ChatGPT? Why Gemini?" title="The same idea needed to work inside two different interaction models">
        <p className="max-w-[900px]">ChatGPT gave us a conversational surface with strong continuity. Gemini let us explore richer connections to search and Google tools. Prototyping both helped leadership see the opportunity as product behavior, not a static concept slide.</p>
        <ImagePanel src="/legacy/ai-search/03-S0A2aSckPEQeIkQp4e7aVVztlcg.jpeg" alt="Team sharing the AI search prototypes" className="mt-10" />
      </Section>

      <Section eyebrow="Reflection" title="The interface was only the visible part of the work" compact>
        <p className="max-w-[900px]">The hardest questions lived underneath it: what the model should infer, when it should act, and how a customer stays in control. That is the part of AI product design I want to keep working on.</p>
      </Section>
    </StudyShell>
  );
}
