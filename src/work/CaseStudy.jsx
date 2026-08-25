import { useCallback, useEffect, useRef, useState } from "react";
import KolamMark from "../landing/KolamMark";
import { useMediaQuery } from "../landing/useMediaQuery";
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
 *   { pair: [a, b] }             two of them, before and after
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
  const [zoomed, setZoomed] = useState(false);
  const isPhone = useMediaQuery("(max-width: 900px)");

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
        {(study.note || study.link || study.links) && (
          <p className="cs-meta">
            {study.note}
            {[...(study.links || []), ...(study.link ? [study.link] : [])].map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
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
              <div
                className={`cs-screen${isPhone ? " is-tappable" : ""}`}
                style={{ "--ar": film.aspect || "698 / 1418" }}
                onClick={isPhone ? () => setZoomed(true) : undefined}
                role={isPhone ? "button" : undefined}
                tabIndex={isPhone ? 0 : undefined}
                aria-label={isPhone ? `Open ${film.label} full screen` : undefined}
                onKeyDown={
                  isPhone
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setZoomed(true);
                        }
                      }
                    : undefined
                }
              >
                {filmKeys.map((key) => {
                  const f = study.films[key];
                  const on = f === film;
                  return f.vimeo ? (
                    <VimeoFilm key={key} film={f} on={on} />
                  ) : f.src ? (
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

          {/* ── The kolam, drawn a stroke at a time. Desktop only: on a
                 phone it is one more thing pinned to a small screen. ─────── */}
          {!isPhone && (
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
          )}
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

      {zoomed && <Lightbox film={film} onClose={() => setZoomed(false)} />}
    </div>
  );
}

/* Tapping the prototype on a phone opens it at the size of the screen.
   A portrait film fills a portrait phone. A landscape one cannot, so rather
   than showing it postage-stamp sized we ask for the phone to be turned and
   then use the whole screen. */
function Lightbox({ film, onClose }) {
  const portraitPhone = useMediaQuery("(orientation: portrait)");
  const [w, h] = (film.aspect || "698 / 1418").split("/").map((n) => parseFloat(n));
  const landscapeFilm = w / h > 1.05;
  const askToRotate = landscapeFilm && portraitPhone;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <div className="cs-lightbox" onClick={onClose}>
      <button type="button" className="cs-lightbox-x" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className={`cs-lightbox-stage${askToRotate ? " is-rotate" : ""}`}
        style={{ "--ar": film.aspect || "698 / 1418" }}
        onClick={(e) => e.stopPropagation()}
      >
        {film.src ? (
          <video
            src={film.src}
            poster={film.poster}
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label={film.label}
          />
        ) : (
          <img src={film.image} alt={film.label} />
        )}
      </div>

      {askToRotate && (
        <p className="cs-rotate">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2.5" />
            <path d="M2.5 15.5a9.5 9.5 0 0 0 3 4" />
          </svg>
          Turn your phone to watch this one
        </p>
      )}
    </div>
  );
}

function Block({ b }) {
  if (b.pair)
    return (
      <div className="cs-pair">
        {b.pair.map((one, i) => (
          <Shot key={i} b={one} inPair />
        ))}
      </div>
    );
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
function Shot({ b, inPair }) {
  const kind = b.photo ? " is-photo" : b.bare ? " is-bare" : " is-plate";
  return (
    <figure
      className={`cs-shot${kind}${b.wide && !inPair ? " is-wide" : ""}${inPair ? " in-pair" : ""}`}
    >
      {b.video ? (
        <Clip src={b.video} alt={b.alt} />
      ) : (
        <img src={b.img} alt={b.alt} loading="lazy" decoding="async" />
      )}
      {b.cap && <figcaption>{b.cap}</figcaption>}
    </figure>
  );
}

/* The films are all mounted and all playing; only one is opaque. Cutting by
   opacity rather than by src means the switch has no black frame and no
   reload — the other prototype is already running when you reach it.

   The muted attribute has to be set on the element itself. React assigns
   `muted` as a property and never writes the attribute, and the browser's
   autoplay gate reads the attribute — so a video that reports muted:true still
   gets refused, silently, and sits on its poster forever. That is why these
   only ever played when something called play() by hand. */
/* Same autoplay gate as the panel films. */
function Clip({ src, alt }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    const go = () => {
      if (v.paused) v.play().catch(() => {});
    };
    go();
    v.addEventListener("canplay", go);
    return () => v.removeEventListener("canplay", go);
  }, []);
  return (
    <video ref={ref} src={src} aria-label={alt} autoPlay muted loop playsInline preload="metadata" />
  );
}

function Film({ film, on }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;

    const go = () => {
      if (v.paused) v.play().catch(() => {});
    };
    go();
    const events = ["loadedmetadata", "loadeddata", "canplay"];
    events.forEach((e) => v.addEventListener(e, go));
    // A last resort: the first thing the reader does un-gates playback.
    document.addEventListener("pointerdown", go, { once: true });
    return () => {
      events.forEach((e) => v.removeEventListener(e, go));
      document.removeEventListener("pointerdown", go);
    };
  }, []);

  // And again whenever this is the one being shown.
  useEffect(() => {
    const v = ref.current;
    if (on && v && v.paused) v.play().catch(() => {});
  }, [on]);

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

/* Some films are too heavy to ship out of /public, so they live on Vimeo. Same
   contract as <Film>: every one is mounted and running, and only the one that
   belongs to the current section is opaque, so the cut still lands on a moving
   frame rather than a cold first frame.

   `background=1` is Vimeo's chromeless mode — muted, looping, autoplaying, no
   controls and no title card — which is exactly what a silent prototype
   recording wants. `autopause=0` stops Vimeo pausing the other films the
   moment this one starts. Unlisted videos also need their privacy hash, which
   the film carries as `hash`. */
function VimeoFilm({ film, on }) {
  const params = new URLSearchParams({
    background: "1",
    autoplay: "1",
    loop: "1",
    muted: "1",
    autopause: "0",
    dnt: "1",
  });
  if (film.hash) params.set("h", film.hash);

  return (
    <iframe
      className={`cs-video${on ? " is-on" : ""}`}
      src={`https://player.vimeo.com/video/${film.vimeo}?${params}`}
      title={film.label}
      allow="autoplay; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
