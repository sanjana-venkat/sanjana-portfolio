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
 * ── How a section is written ──────────────────────────────────────────────
 *
 * A section is an ordered list of blocks, and it renders them in the order
 * they are written. That ordering is the whole point: a picture belongs to the
 * paragraph it illustrates, immediately under it, not gathered with the other
 * pictures at the bottom of the section. Grouping the prose and then grouping
 * the images reads as a gallery; interleaving them reads as an argument.
 *
 *   { p }                        a paragraph
 *   { h, p }                     a headed beat
 *   { img | video, alt, ... }    something to look at
 *   { quote }                    someone else's words
 *   { cards, dense }             a set of short parallel points
 *   { list: { label, items } }   a run of questions
 *   { pull }                     the sentence that carries the section
 *   { stat, p }                  a number worth stopping on
 *
 * On a phone the columns become one column: the film sticks to the top, the
 * kolam sits beside it, and the writing runs beneath.
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
    // The first pass can land before the stage has a height, which leaves the
    // sticky columns sized to nothing. Measure again on the next frame.
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [measure, study]);

  const film =
    study.films[study.sections[active]?.film] || Object.values(study.films)[0];
  const filmKeys = Object.keys(study.films);
  const all = [...study.sections, ...(study.reflection ? [study.reflection] : [])];

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
          {/* ── The prototype, held still ───────────────────────────── */}
          <div className="cs-film-col">
            <div className={`cs-film is-${study.shape || "phone"}`}>
              {/* Each film carries its own aspect. Sharing one across a study
                  letterboxes some and crops others. */}
              <div className="cs-screen" style={{ "--ar": film.aspect || "698 / 1418" }}>
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

          {/* ── The kolam, drawn a stroke at a time ─────────────────── */}
          <div className="cs-rail">
            <div className="cs-rail-inner">
              <div className="cs-kolam">
                {/* Four strokes over however many sections there are, so the
                    mark still finishes exactly when the study does. */}
                <KolamMark
                  drawn={Math.min(4, Math.floor((active / Math.max(1, all.length - 1)) * 4) + 1)}
                  active={null}
                  hovered={null}
                  onHover={() => {}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── The writing ────────────────────────────────────────────── */}
        <div className="cs-read">
          {all.map((section, i) => (
            <section
              className={`cs-sec${i === all.length - 1 ? " cs-sec-end" : ""}`}
              key={section.id || section.eyebrow}
              ref={(el) => (marks.current[i] = el)}
            >
              <p className="cs-eyebrow">{section.eyebrow}</p>
              <h2 className="cs-h2">{section.title}</h2>
              {section.blocks.map((block, k) => (
                <Block key={k} b={block} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function Block({ b }) {
  if (b.img || b.video) return <Shot b={b} />;
  if (b.quote) return <blockquote className="cs-quote">{b.quote}</blockquote>;
  if (b.pull) return <p className="cs-pull">{b.pull}</p>;
  if (b.stat)
    return (
      <div className="cs-stat">
        <p className="cs-stat-n">{b.stat}</p>
        <p className="cs-stat-p">{b.p}</p>
      </div>
    );
  if (b.cards)
    return (
      <div className={`cs-cards${b.dense ? " is-dense" : ""}`}>
        {b.cards.map((c) => (
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
    );
  if (b.list)
    return (
      <div className="cs-qs">
        {b.list.label && <p className="cs-qs-label">{b.list.label}</p>}
        <ul>
          {b.list.items.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </div>
    );
  if (b.h)
    return (
      <div className="cs-beat">
        <h3>{b.h}</h3>
        {b.p && <p>{b.p}</p>}
      </div>
    );
  return <p className="cs-p">{b.p}</p>;
}

/* Most of these are flat diagrams drawn on white. Left on the cream they read
   as a rectangle someone pasted in, so they get a white plate with a hairline
   edge and the white becomes deliberate. Photographs and screens that already
   fill their own frame set `photo` and skip the plate. */
function Shot({ b }) {
  const kind = b.photo ? " is-photo" : b.bare ? " is-bare" : " is-plate";
  return (
    <figure className={`cs-shot${kind}${b.wide ? " is-wide" : ""}`}>
      {b.video ? (
        <video src={b.video} aria-label={b.alt} autoPlay muted loop playsInline preload="metadata" />
      ) : (
        <img src={b.img} alt={b.alt} loading="lazy" decoding="async" />
      )}
      {b.cap && <figcaption>{b.cap}</figcaption>}
    </figure>
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
