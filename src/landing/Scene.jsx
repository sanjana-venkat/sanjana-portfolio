import { useCallback, useEffect, useRef, useState } from "react";
import KolamMark from "./KolamMark";
import RangoliCursor from "./RangoliCursor";
import { Statements, Story } from "./sections";
import { FEATURED, INTRO, STATEMENTS, STORY_MOMENTS } from "./landingData";
import { useMediaQuery, usePrefersReducedMotion } from "./useMediaQuery";
import "./landing.css";
import "./room.css";

/**
 * The homepage is a room.
 *
 * ── How this is laid out ──────────────────────────────────────────────────
 *
 * Desktop is a fixed 1600×900 canvas, scaled to fit the window with a single
 * transform. Every object is positioned in canvas pixels, so the composition
 * is the composition — it cannot be reassembled by a media query, and it holds
 * at every window size. There is exactly one breakpoint in the stylesheet, and
 * below it the room is a different component (RoomColumn) rather than three
 * hundred lines of overrides fighting the desktop layout.
 *
 * One class prefix: rm-. Each selector is declared once.
 *
 * ── What is in the room ───────────────────────────────────────────────────
 *
 * Teak doors onto the backyard on the left, her name and the kolam on the back
 * wall, the carved bracket at the corner, the work on the side wall, a pin
 * board below it, and Sanjana at her desk.
 *
 * The objects are the navigation. Nothing is labelled: the frames open the
 * case studies, the photographs open the story, the postcards open what people
 * wrote, and she opens the conversation — the shade draws down over the room
 * and you talk on the cloth.
 */

const CANVAS_W = 1600;
const CANVAS_H = 900;

const SETTLE_KEY = "sv-room-settled";

/* The music box on the sill.
   Paste a Spotify share link here — a playlist, album or track — and the box
   appears on the window sill and opens the player when tapped. Left empty the
   box is simply not in the room, so nothing half-working ships.
   e.g. "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"        */
const SPOTIFY_URL =
  "https://open.spotify.com/playlist/4QAHsxVZyx7Me34ewDzv4Z";

/** Turn any Spotify share link into its embed player URL. */
function spotifyEmbed(url) {
  const m = url.match(/open\.spotify\.com\/(playlist|album|track|artist)\/([A-Za-z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0` : null;
}

const BOARD_PHOTOS = STORY_MOMENTS.filter((m) =>
  ["childhood", "utd", "chetna", "uxclub", "jpmc", "bay"].includes(m.id)
);
const BOARD_LETTERS = STATEMENTS.slice(0, 3);

export default function Scene({ chat, onOpenProject }) {
  const [open, setOpen] = useState(null); // "story" | "statements" | "chat" | null
  const [focusId, setFocusId] = useState(null);
  const [nearHer, setNearHer] = useState(false);
  const isPhone = useMediaQuery("(max-width: 900px)");
  const reduced = usePrefersReducedMotion();

  // The one-time settle, per §1: three objects arrive, once, and never again.
  const [settled, setSettled] = useState(true);
  useEffect(() => {
    let seen = true;
    try {
      seen = window.sessionStorage?.getItem(SETTLE_KEY) === "1";
      window.sessionStorage?.setItem(SETTLE_KEY, "1");
    } catch {
      /* private mode: the room simply arrives again next visit */
    }
    if (!seen && !reduced) setSettled(false);
  }, [reduced]);

  useEffect(() => {
    if (open !== "story") return;
    STORY_MOMENTS.forEach((m) => {
      const img = new Image();
      img.src = m.image;
    });
  }, [open]);

  const close = useCallback(() => {
    setOpen(null);
    setFocusId(null);
    setNearHer(false);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const openWith = useCallback((section, id) => {
    setFocusId(id);
    setOpen(section);
    setNearHer(false);
  }, []);

  // Reaching for her nudges the shade; asking her pulls it the whole way.
  const shade = open === "chat" ? "down" : nearHer && !isPhone ? "peek" : "up";

  const props = { openWith, onOpenProject, setNearHer, ask: () => setOpen("chat"), settled };

  return (
    <div className={`rm${open ? " is-open" : ""}`}>
      {!isPhone && <RangoliCursor />}

      {isPhone ? <RoomColumn {...props} /> : <RoomCanvas {...props} />}

      <Shade state={shade} onPull={() => setOpen("chat")} onDrop={close}>
        {open === "chat" && <DeskChat chat={chat} />}
      </Shade>

      {(open === "story" || open === "statements") && (
        <div className="rm-layer">
          <button type="button" className="rm-scrim" aria-label="Close" onClick={close} />
          <div className="rm-sheet" data-section={open}>
            {/* On a phone there is no room off the sheet to tap, so it needs
                a way out of its own. */}
            {isPhone && (
              <button type="button" className="rm-sheet-x" onClick={close} aria-label="Close">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            <div className="rm-sheet-scroll">
              {open === "story" && <Story initialId={focusId} />}
              {open === "statements" && <Statements initialId={focusId} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Desktop — the room on its canvas.
   ══════════════════════════════════════════════════════════════════════════ */

function RoomCanvas({ openWith, onOpenProject, setNearHer, ask, settled }) {
  return (
    <div className="rm-stage">
      {/* Corner wall art, hung off the true corner of the room. */}
      <img
        className="rm-bracket"
        src="/scene/bracket-flat.webp"
        alt=""
        decoding="async"
        fetchPriority="high"
      />

      <div
        className={`rm-canvas${settled ? "" : " is-arriving"}`}
        style={{ "--cw": CANVAS_W, "--ch": CANVAS_H }}
      >
        {/* ── The shell of the room ─────────────────────────────────── */}
        <div className="rm-backwall" />
        <div className="rm-rake" />

        {/* ── Teak doors onto the backyard ──────────────────────────── */}
        <div className="rm-doors">
          <div className="rm-door-glass">
            {/* Two layers so the garden has depth and the wind reaches them at
                different moments: the mass behind, a near frond in front. */}
            <img className="rm-garden-far" src="/scene/garden.webp" alt="" decoding="async" />
            <img className="rm-garden-near" src="/scene/leaves.webp" alt="" decoding="async" />
          </div>
          <div className="rm-door-mullion" />
          <div className="rm-door-rail" />
        </div>
        <div className="rm-sill" />
        <MusicBox />

        {/* ── Her name, and the kolam, painted on the wall ──────────── */}
        <h1 className="rm-name rm-settle" style={{ "--step": 0 }}>
          {INTRO.name}
        </h1>
        <p className="rm-tagline">{INTRO.tagline}</p>
        <p className="rm-creed">
          meet people where they are and take them where they want to be. Both
          users and stakeholders :)
        </p>

        <div className="rm-kolam rm-settle" style={{ "--step": 1 }}>
          <KolamMark drawn={4} active={null} hovered={null} onHover={() => {}} />
        </div>

        {/* ── Two pieces of work hung on the wall ───────────────────── */}
        <Monitor project={FEATURED[0]} onOpen={onOpenProject} />
        <Frame project={FEATURED[1]} onOpen={onOpenProject} />

        {/* ── The pin board ─────────────────────────────────────────── */}
        <Board
          photos={BOARD_PHOTOS}
          letters={BOARD_LETTERS}
          onPhoto={(id) => openWith("story", id)}
          onLetter={(id) => openWith("statements", id)}
        />

        {/* ── Sanjana, at her desk ──────────────────────────────────── */}
        <button
          type="button"
          className="rm-desk rm-settle"
          style={{ "--step": 2 }}
          aria-label="Ask me anything"
          onMouseEnter={() => setNearHer(true)}
          onMouseLeave={() => setNearHer(false)}
          onFocus={() => setNearHer(true)}
          onBlur={() => setNearHer(false)}
          onClick={ask}
        >
          <Sanjana />
        </button>

        <Utils className="rm-utils" />

        <a className="rm-hire" href="mailto:sanjanavnkt20@gmail.com">
          Work with me
        </a>
      </div>
    </div>
  );
}

/* ── Sanjana at her desk ─────────────────────────────────────────────────
   A ten-second loop: she types, reaches for the bottle and drinks, sets it
   down, then picks up the book and reads.

   Swapping between still drawings was the wrong tool — every change of pose
   was a cut, and cutting between two images that differ across the whole
   frame reads as a flicker or a shrug. This is one continuous take, so the
   motion is actually motion.

   The clip's background is composited onto the wall colour rather than being
   made transparent — VP9 alpha does not survive Safari — and the CSS feathers
   its edges into the wall, so the rectangle does not show. Reduced motion and
   any browser that cannot play it get the poster frame instead. */
function Sanjana() {
  const reduced = usePrefersReducedMotion();
  const film = useRef(null);

  // Some browsers decline the autoplay attribute but allow a muted play()
  // once the element is in the document.
  useEffect(() => {
    const el = film.current;
    if (!el) return undefined;

    const go = () => el.play?.().catch(() => {});
    go();
    el.addEventListener("canplay", go);

    // If the browser declines to autoplay at all, the first thing the visitor
    // touches starts it, so she is never frozen mid-sip.
    const onFirstInput = () => go();
    document.addEventListener("pointerdown", onFirstInput, { once: true });
    document.addEventListener("keydown", onFirstInput, { once: true });

    return () => {
      el.removeEventListener("canplay", go);
      document.removeEventListener("pointerdown", onFirstInput);
      document.removeEventListener("keydown", onFirstInput);
    };
  }, [reduced]);

  if (reduced) {
    return <img className="rm-still" src="/scene/sanjana-poster.webp" alt="" decoding="async" />;
  }

  return (
    <video
      ref={film}
      className="rm-film"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/scene/sanjana-poster.webp"
      aria-hidden="true"
    >
      <source src="/scene/sanjana.webm" type="video/webm" />
      <source src="/scene/sanjana.mp4" type="video/mp4" />
    </video>
  );
}

/* ── The music box on the sill ──────────────────────────────────────────
   A small teak box with a brass horn. Tapping it opens the player, which
   sits on the sill beside it rather than over the room. */
function MusicBox() {
  const [open, setOpen] = useState(false);
  const embed = SPOTIFY_URL ? spotifyEmbed(SPOTIFY_URL) : null;
  if (!embed) return null;

  return (
    <div className="rm-music">
      <button
        type="button"
        className={`rm-music-box${open ? " is-on" : ""}`}
        aria-label={open ? "Close the music" : "Play something"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {/* Drawn rather than generated: at this size it is four rectangles,
            and the generator kept returning either a 3D render with a cast
            shadow or a featureless beige block. Flat front elevation, solid
            fills, matching the bottle and the book on her desk. */}
        <svg viewBox="0 0 120 84" aria-hidden="true">
          {/* Body and inset panel */}
          <rect x="4" y="12" width="112" height="58" rx="9" fill="#d9c6a4" />
          <rect x="11" y="18" width="98" height="34" rx="5" fill="#c5ad84" />

          {/* Base strip: three controls and the indicator */}
          <rect x="11" y="55" width="98" height="10" rx="3" fill="#bab1a2" />
          <circle cx="26" cy="60" r="2" fill="#8d8577" />
          <circle cx="34" cy="60" r="2" fill="#8d8577" />
          <circle cx="42" cy="60" r="2" fill="#8d8577" />
          <circle cx="96" cy="60" r="2.4" fill="var(--brass)" />

          {/* Feet */}
          <rect x="20" y="70" width="12" height="4" rx="2" fill="#c0ad8e" />
          <rect x="88" y="70" width="12" height="4" rx="2" fill="#c0ad8e" />
        </svg>
        <span className="rm-music-note" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>

      {open && (
        <div className="rm-music-player">
          <iframe
            title="Music"
            src={embed}
            width="100%"
            height="152"
            frameBorder="0"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      )}
    </div>
  );
}

/* ── The largest piece of work, shown the way it gets shown: on a screen ─── */
function Monitor({ project, onOpen }) {
  return (
    <button
      type="button"
      className="rm-monitor"
      aria-label={`Open ${project.name}`}
      onClick={(e) =>
        onOpen(project.slug, e.currentTarget.querySelector("img")?.getBoundingClientRect())
      }
    >
      <span className="rm-hook" />
      <span className="rm-cord" />
      <span className="rm-monitor-bezel">
        <img src={project.image} alt="" decoding="async" fetchPriority="high" />
      </span>
    </button>
  );
}

/* ── A framed piece hung under the monitor ───────────────────────────────── */
function Frame({ project, onOpen }) {
  return (
    <button
      type="button"
      className="rm-frame"
      aria-label={`Open ${project.name}`}
      onClick={(e) =>
        onOpen(project.slug, e.currentTarget.querySelector("img")?.getBoundingClientRect())
      }
    >
      <span className="rm-hook" />
      <span className="rm-cord" />
      <span className="rm-frame-body">
        <img src={project.image} alt="" decoding="async" fetchPriority="high" />
      </span>
    </button>
  );
}

/* ── The pin board ───────────────────────────────────────────────────────
   Photographs open the story at that moment; the postcards open what that
   person wrote. One organised surface, zari-taped to the wall. */
function Board({ photos, letters, onPhoto, onLetter }) {
  return (
    <div className="rm-board">
      <span className="rm-board-zari" />
      <div className="rm-board-inner">
        {photos.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className="rm-polaroid"
            style={{ "--tilt": `${[-2.4, 1.8, -1.2, 2.6, -0.8, 1.4][i % 6]}deg` }}
            aria-label={`Open the story around ${m.year}`}
            onClick={() => onPhoto(m.id)}
          >
            <span className="rm-tack" />
            <img src={m.image} alt="" decoding="async" />
            <span className="rm-polaroid-cap">{m.year}</span>
          </button>
        ))}

        {letters.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className="rm-postcard"
            style={{ "--tilt": `${[1.6, -2.2, 2.2][i % 3]}deg` }}
            aria-label={`Read what ${s.attr} wrote`}
            onClick={() => onLetter(s.id)}
          >
            <span className="rm-tack" />
            <span className="rm-stamp" />
            <span className="rm-script" />
            <span className="rm-postcard-cap">{s.attr}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── The shade ─────────────────────────────────────────────────────────────
   It rests along the bottom of the room with its hem showing, like a blind
   wound down. Pull the hem up — click it, or drag it — and the cloth rises
   over the room with the conversation on it. Pulling it back down closes. */
/* Where the shade sits in each state. Driven from here rather than from a
   class, because the cascade would not let the down value override the base
   transform and it was not worth another hour to find out why. */
const SHADE_Y = {
  up: "translateY(-100%)",
  peek: "translateY(calc(-100% + 22px))",
  down: "translateY(0)",
};

function Shade({ state, children, onPull, onDrop }) {
  const drag = useRef(null);
  const handled = useRef(false);
  const toggle = () => (state === "down" ? onDrop() : onPull());

  const start = (e) => {
    drag.current = { y: e.clientY, moved: false };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    const dy = d.y - e.clientY;
    if (!d.moved && Math.abs(dy) > 26) {
      d.moved = true;
      if (dy > 0) onPull();
      else onDrop();
    }
  };

  const end = (e) => {
    const d = drag.current;
    drag.current = null;
    // A tap with no drag toggles it. Flagged so the click that follows the
    // pointer sequence does not toggle it straight back.
    if (d && !d.moved) {
      handled.current = true;
      toggle();
    }
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  // Keyboard activation and any click that arrives without pointer events.
  const onClick = () => {
    if (handled.current) {
      handled.current = false;
      return;
    }
    toggle();
  };

  return (
    <div className={`rm-shade is-${state}`} style={{ transform: SHADE_Y[state] }}>
      <button
        type="button"
        className="rm-hem"
        aria-label={state === "down" ? "Close the conversation" : "Ask me something"}
        aria-expanded={state === "down"}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={() => (drag.current = null)}
        onClick={onClick}
      >
        <span className="rm-hem-grip" />
      </button>

      <div className="rm-cloth" aria-hidden={state !== "down"}>
        <div className="rm-cloth-content">{children}</div>
      </div>
    </div>
  );
}

function Utils({ className }) {
  return (
    <nav className={className} aria-label="Elsewhere">
      <a href="/SanjanaVenkat_Design-Engineer_Resume1.pdf" target="_blank" rel="noreferrer">
        Resume
      </a>
      <a href="https://github.com/sanjana-venkat" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href="https://www.linkedin.com/in/sanjana-venkat/" target="_blank" rel="noreferrer">
        LinkedIn
      </a>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Phone — the same room, read top to bottom. A document, not a shrunk canvas.
   ══════════════════════════════════════════════════════════════════════════ */

function RoomColumn({ openWith, onOpenProject, ask }) {
  return (
    <div className="rc">
      <header className="rc-head">
        <h1 className="rc-name">{INTRO.name}</h1>
        <p className="rc-tagline">{INTRO.tagline}</p>
        <p className="rc-creed">
          meet people where they are and take them where they want to be. Both
          users and stakeholders :)
        </p>
        <div className="rc-kolam">
          <KolamMark drawn={4} active={null} hovered={null} onHover={() => {}} />
        </div>
      </header>

      <button type="button" className="rc-desk" onClick={ask}>
        <img src="/scene/sanjana-poster.webp" alt="Sanjana at her desk" decoding="async" />
      </button>

      <section className="rc-section">
        <h2 className="rc-h2">Selected work</h2>
        <div className="rc-work">
          {FEATURED.filter((p) => p.slug !== "muesli").map((p) => (
            <button
              key={p.slug}
              type="button"
              className="rc-card"
              onClick={(e) => onOpenProject(p.slug, e.currentTarget.getBoundingClientRect())}
            >
              <span className="rc-card-img">
                <img src={p.image} alt="" loading="lazy" decoding="async" />
              </span>
              <span className="rc-card-cap">{p.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="rc-section">
        <h2 className="rc-h2">The story so far</h2>
        <div className="rc-photos">
          {BOARD_PHOTOS.map((m) => (
            <button
              key={m.id}
              type="button"
              className="rc-photo"
              onClick={() => openWith("story", m.id)}
            >
              <img src={m.image} alt="" loading="lazy" decoding="async" />
              <span className="rc-photo-cap">{m.year}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="rc-section">
        <h2 className="rc-h2">What people said</h2>
        <div className="rc-letters">
          {BOARD_LETTERS.map((s) => (
            <button
              key={s.id}
              type="button"
              className="rc-letter"
              onClick={() => openWith("statements", s.id)}
            >
              <span className="rc-letter-stamp" />
              <span className="rc-letter-cap">{s.attr}</span>
            </button>
          ))}
        </div>
      </section>

      <a className="rc-hire" href="mailto:sanjanavnkt20@gmail.com">
        Work with me
      </a>

      <Utils className="rc-utils" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   The conversation, on the cloth.
   ══════════════════════════════════════════════════════════════════════════ */

function DeskChat({ chat }) {
  return (
    <div className="rm-talk">
      <h2 className="rm-talk-title">Ask me something</h2>

      <div className="rm-talk-thread">
        {chat.thinking ? (
          <div className="rm-talk-typing" aria-label="Thinking">
            <i />
            <i />
            <i />
          </div>
        ) : (
          <>
            <p className="rm-talk-reply">{chat.answer}</p>

            {/* Where each answer leads. These were dropped in the rewrite,
                which is what made the model-design answer look truncated. */}
            {chat.links?.length > 0 && (
              <ul className="rm-talk-links">
                {chat.links.map((link) => (
                  <li key={link.label}>
                    <button type="button" onClick={link.onSelect}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* What else you could ask, under the rule. */}
      <div className="rm-talk-pills">
        {chat.questions.map((q) => (
          <button
            key={q}
            type="button"
            className={`rm-talk-pill${q === chat.active ? " is-on" : ""}`}
            aria-pressed={q === chat.active}
            onClick={() => chat.onAsk(q)}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
