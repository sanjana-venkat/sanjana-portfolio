import { useCallback, useEffect, useRef, useState } from "react";
import KolamMark from "../landing/KolamMark";
import "./case.css";

/**
 * A case study is three columns and one scroll.
 *
 * The prototype stands still on the left while the writing moves past it on the
 * right, so the thing being described is always in view — you never scroll away
 * from the artefact to read about it. Between them the kolam draws itself one
 * stroke per section, which is the progress bar: four strokes, four sections,
 * and the mark is finished exactly when the study is.
 *
 * Which film is playing is a property of the section, not of a timer. Sections
 * that name the same film leave it alone, so ChatGPT holds for three sections
 * and the cut to Gemini lands on the sentence that introduces it.
 *
 * On a phone the columns become one column: the film sticks to the top, the
 * kolam becomes a rule under it, and the writing runs beneath.
 */
export default function CaseStudy({ study }) {
  const scroller = useRef(null);
  const marks = useRef([]);
  const [active, setActive] = useState(0);

  // Which section owns the reading line — a third of the way down, where the
  // eye actually is, rather than the top edge of the container.
  const measure = useCallback(() => {
    const box = scroller.current;
    if (!box) return;
    // The sticky columns are sized to the scrollport, which is the stage inside
    // the work browser rather than the window, so no viewport unit knows it.
    box.style.setProperty("--port", `${box.clientHeight}px`);
    const line = box.getBoundingClientRect().top + box.clientHeight * 0.34;
    let next = 0;
    marks.current.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top <= line) next = i;
    });
    setActive((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    measure();
  }, [measure, study]);

  const film = study.films[study.sections[active]?.film] || Object.values(study.films)[0];
  const filmKeys = Object.keys(study.films);

  return (
    <div
      className={`cs${study.shape ? ` is-${study.shape}` : ""}`}
      ref={scroller}
      onScroll={measure}
    >
      <header className="cs-head">
        <p className="cs-kicker">{study.kicker}</p>
        <h1 className="cs-title">{study.title}</h1>
        <p className="cs-lede">{study.lede}</p>
        {(study.note || study.link) && (
          <p className="cs-meta">
            {study.note}
            {study.link && (
              <a href={study.link.href} target="_blank" rel="noreferrer">
                {study.link.label}
              </a>
            )}
          </p>
        )}
      </header>

      <div className="cs-body">
        {/* The film and the kolam are two grid columns on a desktop, so this
            wrapper is display:contents there. On a phone there is only one
            column, and it becomes the single sticky band holding both. */}
        <div className="cs-stick">
        {/* ── The prototype, held still ─────────────────────────────── */}
        <div className="cs-film-col">
          <div className={`cs-film is-${study.shape || "phone"}`}>
            <div className="cs-screen">
              {filmKeys.map((key) => {
                const f = study.films[key];
                const on = f === film;
                return f.src ? (
                  <Film key={key} film={f} on={on} />
                ) : (
                  <img
                    key={key}
                    className={`cs-video${on ? " is-on" : ""}`}
                    src={f.image}
                    alt={f.label}
                    decoding="async"
                  />
                );
              })}
            </div>
            <p className="cs-film-cap">{film.label}</p>
          </div>
        </div>

        {/* ── The kolam, drawn a stroke at a time ───────────────────── */}
        <div className="cs-rail">
          <div className="cs-rail-inner">
            <div className="cs-kolam">
              <KolamMark
                drawn={active + 1}
                active={null}
                hovered={null}
                onHover={() => {}}
              />
            </div>
          </div>
        </div>
        </div>

        {/* ── The writing ──────────────────────────────────────────── */}
        <div className="cs-read">
          {study.sections.map((section, i) => (
            <section
              className="cs-sec"
              key={section.id}
              ref={(el) => (marks.current[i] = el)}
            >
              {section.still && <Still still={section.still} />}

              <p className="cs-eyebrow">{section.eyebrow}</p>
              <h2 className="cs-h2">{section.title}</h2>

              {section.body?.map((p, k) => (
                <p className="cs-p" key={k}>
                  {p}
                </p>
              ))}

              {section.quotes && (
                <div className="cs-quotes">
                  {section.quotes.map((q, k) => (
                    <blockquote key={k}>{q}</blockquote>
                  ))}
                </div>
              )}

              {section.cards && (
                <div className={`cs-cards${section.cardsDense ? " is-dense" : ""}`}>
                  {section.cards.map((c) => (
                    <div className="cs-card" key={c.name}>
                      <p className="cs-card-name">{c.name}</p>
                      {c.lines.map((l, k) => (
                        <p className="cs-card-line" key={k}>
                          {l}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {section.beats && (
                <div className="cs-beats">
                  {section.beats.map((b) => (
                    <div className="cs-beat" key={b.name}>
                      <h3>{b.name}</h3>
                      <p>{b.copy}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.body2?.map((p, k) => (
                <p className="cs-p cs-p-after" key={k}>
                  {p}
                </p>
              ))}

              {section.pull && <p className="cs-pull">{section.pull}</p>}

              {section.questions && (
                <div className="cs-qs">
                  <p className="cs-qs-label">{section.questions.label}</p>
                  <ul>
                    {section.questions.items.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {study.reflection && (
            <section className="cs-sec cs-sec-end">
              {study.reflection.still && <Still still={study.reflection.still} />}
              <p className="cs-eyebrow">{study.reflection.eyebrow}</p>
              <h2 className="cs-h2">{study.reflection.title}</h2>
              {study.reflection.body && (
                <p className="cs-p">{study.reflection.body}</p>
              )}
              <div className="cs-beats">
                {study.reflection.points.map((p) => (
                  <div className="cs-beat" key={p.name}>
                    <h3>{p.name}</h3>
                    <p>{p.copy}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* The films are all mounted and all playing; only one is opaque. Cutting by
   opacity rather than by src means the switch has no black frame and no
   reload — the other prototype is already running when you reach it. */
function Film({ film, on }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const go = () => v.play().catch(() => {});
    go();
    v.addEventListener("canplay", go);
    return () => v.removeEventListener("canplay", go);
  }, []);

  return (
    <video
      ref={ref}
      className={`cs-video${on ? " is-on" : ""}`}
      src={film.src}
      poster={film.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={film.label}
    />
  );
}

/* A still is usually a picture and sometimes a short loop. Either way it sits
   in the writing, where it is being talked about, rather than taking over the
   panel — the panel belongs to the prototype. */
function Still({ still }) {
  return (
    <figure
      className={`cs-still${still.wide ? " is-wide" : ""}${still.bare ? " is-bare" : ""}`}
    >
      {still.video ? (
        <video
          src={still.video}
          aria-label={still.alt}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img src={still.src} alt={still.alt} loading="lazy" decoding="async" />
      )}
    </figure>
  );
}
