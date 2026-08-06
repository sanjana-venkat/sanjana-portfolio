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
const SPOTIFY_URL = "";

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
      </div>
    </div>
  );
}

/* ── Sanjana at her desk ─────────────────────────────────────────────────
   Four drawings of the same figure at the same desk: drawing on the tablet,
   typing, taking a drink, reading. She moves between them on unequal dwells
   and never repeats the same one twice, so it reads as an afternoon of work
   rather than a loop. The book and the bottle are part of the illustration,
   so nothing pops in or out between frames. */
/* Two, not four. Every extra activity is another cut, and a cut between two
   drawings that differ across the whole frame is the thing that reads as a
   flicker. Drawing and typing differ only in her arms, so the change lands
   where the eye expects it. */
const POSES = [
  { key: "draw", src: "/scene/desk-draw.webp", hold: [9000, 15000] },
  { key: "type", src: "/scene/desk-type.webp", hold: [9000, 15000] },
];

function Sanjana() {
  const [cur, setCur] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    let timer;
    let current = 0;

    const step = () => {
      let next = current;
      while (next === current) next = Math.floor(Math.random() * POSES.length);
      setCur(next);
      current = next;
      const [lo, hi] = POSES[next].hold;
      timer = setTimeout(step, lo + Math.random() * (hi - lo));
    };

    timer = setTimeout(step, 4000 + Math.random() * 3000);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <span className="rm-poses">
      {POSES.map((pose, index) => {
        return (
          <img
            key={pose.key}
            className={`rm-pose${index === cur ? " is-on" : ""}`}
            src={pose.src}
            alt=""
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
          />
        );
      })}
    </span>
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
        <svg viewBox="0 0 100 76" aria-hidden="true">
          <path d="M4,30 h74 q6,0 6,6 v30 q0,6 -6,6 H10 q-6,0 -6,-6 Z" fill="var(--wood-mid)" />
          <path d="M4,30 h74 q6,0 6,6 v5 H4 Z" fill="var(--wood-lit)" />
          <path d="M4,66 h80 v3 q0,3 -6,3 H10 q-6,0 -6,-3 Z" fill="var(--wood-deep)" />
          {/* the horn */}
          <path d="M62,30 q4,-22 20,-27 l6,4 q-14,7 -16,23 Z" fill="var(--brass)" />
          <path d="M82,3 l6,4 q-4,2 -7,5 Z" fill="var(--brass-deep)" />
          {/* the crank and the grille */}
          <circle cx="22" cy="51" r="9" fill="var(--wood-deep)" />
          <circle cx="22" cy="51" r="3.4" fill="var(--brass)" />
          <path d="M40,44 h30 M40,51 h30 M40,58 h30" stroke="var(--wood-deep)" strokeWidth="2.4" strokeLinecap="round" />
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
    <div className={`rm-shade is-${state}`}>
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
        Résumé
      </a>
      <a href="mailto:sanjanavnkt20@gmail.com">Email</a>
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
        <div className="rc-kolam">
          <KolamMark drawn={4} active={null} hovered={null} onHover={() => {}} />
        </div>
      </header>

      <button type="button" className="rc-desk" onClick={ask}>
        <img src="/scene/desk-draw.webp" alt="Sanjana at her desk" decoding="async" />
      </button>

      <section className="rc-section">
        <h2 className="rc-h2">Selected work</h2>
        <div className="rc-work">
          {FEATURED.map((p) => (
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
          <p className="rm-talk-reply">{chat.answer}</p>
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
