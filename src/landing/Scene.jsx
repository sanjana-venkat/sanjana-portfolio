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

      <Shade state={shade}>
        {open === "chat" && <DeskChat chat={chat} onClose={close} />}
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
   She works: a while drawing on the tablet, then a while typing, and back.
   The two poses are the same drawing with different arms, so cross-fading
   between them reads as a person shifting rather than as a loop. The dwell
   times are deliberately unequal so it never falls into a rhythm. */
/* Three drawings of the same figure: one drawing on the tablet, and two
   typing positions a keystroke apart. Cutting between the two typing frames
   in bursts reads as someone actually typing; cutting to the tablet reads as
   her turning to draw. The gaps are irregular and there are pauses, so it
   never settles into a loop. */
const DRAW = 0;
const TYPE_A = 1;
const TYPE_B = 2;

function Sanjana() {
  const [pose, setPose] = useState(DRAW);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    let timer;
    let mode = "draw";
    let strokes = 0;
    let flip = false;
    const rand = (a, b) => a + Math.random() * (b - a);

    const step = () => {
      if (mode === "type") {
        flip = !flip;
        setPose(flip ? TYPE_A : TYPE_B);
        strokes -= 1;
        if (strokes <= 0) {
          mode = "draw";
          setPose(DRAW);
          timer = setTimeout(step, rand(4200, 7600));
          return;
        }
        // Every so often she stops to think mid-sentence.
        timer = setTimeout(step, strokes % 7 === 0 ? rand(520, 980) : rand(115, 235));
      } else {
        mode = "type";
        strokes = Math.round(rand(14, 30));
        timer = setTimeout(step, 60);
      }
    };

    timer = setTimeout(step, rand(1400, 2600));
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <span className="rm-poses">
      <img
        className={`rm-pose${pose === DRAW ? " is-on" : ""}`}
        src="/scene/desk.webp"
        alt=""
        decoding="async"
        fetchPriority="high"
      />
      <img
        className={`rm-pose${pose === TYPE_A ? " is-on" : ""}`}
        src="/scene/desk-typing.webp"
        alt=""
        decoding="async"
      />
      <img
        className={`rm-pose${pose === TYPE_B ? " is-on" : ""}`}
        src="/scene/desk-typing2.webp"
        alt=""
        decoding="async"
      />
    </span>
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

/* ── The shade ───────────────────────────────────────────────────────────── */
function Shade({ state, children }) {
  return (
    <div className={`rm-shade is-${state}`} aria-hidden={state !== "down"}>
      <div className="rm-cloth">
        <div className="rm-cloth-content">{children}</div>
      </div>
      <div className="rm-hem">
        <span className="rm-hem-cord" />
        <span className="rm-hem-ring" />
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
        <img src="/scene/desk.webp" alt="Sanjana at her desk" decoding="async" />
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

function bestMatch(draft, questions) {
  const words = (draft.toLowerCase().match(/[a-z']+/g) || []).filter((w) => w.length > 2);
  if (!words.length) return null;

  let best = null;
  let top = 0;
  questions.forEach((q) => {
    const hay = q.toLowerCase();
    const score = words.reduce((t, w) => (hay.includes(w) ? t + w.length : t), 0);
    if (score > top) {
      top = score;
      best = q;
    }
  });
  return top >= 4 ? best : null;
}

function DeskChat({ chat, onClose }) {
  const [draft, setDraft] = useState("");
  const [miss, setMiss] = useState(false);
  const inputRef = useRef(null);

  // Focus lands once the cloth has finished falling.
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 760);
    return () => clearTimeout(t);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const match = bestMatch(draft, chat.questions);
    if (match) {
      chat.onAsk(match);
      setDraft("");
      setMiss(false);
    } else {
      setMiss(true);
    }
  };

  return (
    <div className="rm-talk">
      <div className="rm-talk-pills">
        {chat.questions.map((q) => (
          <button
            key={q}
            type="button"
            className={`rm-talk-pill${q === chat.active ? " is-on" : ""}`}
            aria-pressed={q === chat.active}
            onClick={() => {
              chat.onAsk(q);
              setMiss(false);
            }}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="rm-talk-thread">
        <p className="rm-talk-asked">{chat.active}</p>
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

      <form className="rm-talk-input" onSubmit={submit}>
        <label className="rm-sr" htmlFor="rm-ask">
          Ask a question
        </label>
        <input
          id="rm-ask"
          ref={inputRef}
          value={draft}
          placeholder="Ask me something…"
          autoComplete="off"
          onChange={(e) => {
            setDraft(e.target.value);
            setMiss(false);
          }}
        />
        <button type="submit" aria-label="Send">
          ↵
        </button>
      </form>

      <p className="rm-talk-miss" role="status">
        {miss ? "I have answers ready for the questions above — try one of those." : ""}
      </p>

      <button type="button" className="rm-talk-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
