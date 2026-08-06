import { useCallback, useEffect, useState } from "react";
import KolamMark from "./KolamMark";
import { Plaster } from "./marks";
import { Bulletin, CornerShelf, WallFrame, WindowWall } from "./room";
import { Statements, Story } from "./sections";
import { FEATURED, INTRO, STATEMENTS, STORY_MOMENTS } from "./landingData";
import "./landing.css";
import "./scene.css";
import "./room.css";

const SESSION_KEY = "sv-kolam-drawn";

/* The photographs worth pinning up, and the letters people sent. */
const BOARD_PHOTOS = STORY_MOMENTS.filter((m) =>
  ["childhood", "utd", "chetna", "uxclub", "jpmc", "bay"].includes(m.id)
);
const BOARD_LETTERS = STATEMENTS.slice(0, 4);

/**
 * The homepage is a room.
 *
 * Teak window on the left with the garden behind it, the kolam painted on the
 * wall, a carved elephant bracket holding a shelf, Sanjana at her desk, the
 * featured work framed on the right wall and a pin board of photographs and
 * letters below it.
 *
 * Nothing is a tab. The photographs open the story, the letters open what
 * people wrote, the frames open the case studies, and she opens the chat —
 * the blind draws shut when you reach for her.
 *
 * The kolam — geometry, colours, drawing animation — is untouched.
 */
export default function Scene({ chat, onOpenProject }) {
  const [open, setOpen] = useState(null); // "story" | "statements" | "chat" | null
  const [focusId, setFocusId] = useState(null);
  const [nearHer, setNearHer] = useState(false);

  useEffect(() => {
    try {
      window.sessionStorage?.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode: the kolam simply draws again next visit */
    }
  }, []);

  useEffect(() => {
    if (open !== "story") return;
    STORY_MOMENTS.forEach((m) => {
      const img = new Image();
      img.src = m.image;
    });
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openWith = useCallback((section, id) => {
    setFocusId(id);
    setOpen(section);
    setNearHer(false);
  }, []);

  const close = () => {
    setOpen(null);
    setFocusId(null);
  };

  // The blind is shut while she is being spoken to, or about to be.
  const blindShut = nearHer || open === "chat";

  return (
    <div className={`sc${open ? " is-open" : ""}`}>
      <div className="sc-wall" aria-hidden="true" />
      <Plaster className="sc-grain" />

      <WindowWall shut={blindShut} />
      <div className="sc-shaft" aria-hidden="true" />

      {/* ── The wall ───────────────────────────────────────────────── */}
      <div className="sc-halo" aria-hidden="true" />

      <button type="button" className="sc-name" onClick={close}>
        <b>{INTRO.name}</b>
        <span>{INTRO.tagline}</span>
      </button>

      <KolamMark drawn={4} active={null} hovered={null} onHover={() => {}} />

      <CornerShelf />

      {/* ── The framed work ────────────────────────────────────────── */}
      <div className="sc-gallery">
        <WallFrame project={FEATURED[0]} onOpen={onOpenProject} size="lg" />
        <div className="sc-gallery-pair">
          <WallFrame project={FEATURED[1]} onOpen={onOpenProject} size="sm" />
          <WallFrame project={FEATURED[2]} onOpen={onOpenProject} size="sm" />
        </div>
      </div>

      {/* ── The pin board ──────────────────────────────────────────── */}
      <div className="sc-bulletin">
        <Bulletin
          photos={BOARD_PHOTOS}
          letters={BOARD_LETTERS}
          onPhoto={(id) => openWith("story", id)}
          onLetter={(id) => openWith("statements", id)}
        />
        <p className="sc-board-hint" aria-hidden="true">
          Photographs open the story · letters open what people said
        </p>
      </div>

      {/* ── Her desk ───────────────────────────────────────────────── */}
      <button
        type="button"
        className="sc-desk"
        aria-label="Ask me anything"
        onMouseEnter={() => setNearHer(true)}
        onMouseLeave={() => setNearHer(false)}
        onFocus={() => setNearHer(true)}
        onBlur={() => setNearHer(false)}
        onClick={() => setOpen("chat")}
      >
        <img src="/scene-desk.png" alt="" decoding="async" />
      </button>
      <p className={`sc-desk-hint${blindShut ? " is-on" : ""}`} aria-hidden="true">
        Ask me
      </p>

      {/* ── Layers over the room ───────────────────────────────────── */}
      {(open === "story" || open === "statements") && (
        <div className="sc-layer">
          <div className="sc-scrim" aria-hidden="true" onClick={close} />
          <div className="sc-panel sc-panel-wide">
            {open === "story" && <Story initialId={focusId} />}
            {open === "statements" && <Statements initialId={focusId} />}
          </div>
        </div>
      )}

      {open === "chat" && (
        <div className="sc-layer">
          <div className="sc-panel sc-panel-chat">
            <DeskChat chat={chat} onClose={close} />
          </div>
        </div>
      )}

      <div className="sc-utils">
        <a href="/SanjanaVenkat_Design-Engineer_Resume1.pdf" target="_blank" rel="noreferrer">
          Résumé
        </a>
        <a href="mailto:sanjanavnkt20@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/sanjana-venkat/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>

      {open && (
        <button type="button" className="sc-close" onClick={close}>
          Close
        </button>
      )}
    </div>
  );
}

/** The conversation, sized for the corner of a desk rather than a chat app. */
function DeskChat({ chat, onClose }) {
  const [draft, setDraft] = useState("");
  const [miss, setMiss] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const words = draft.toLowerCase().match(/[a-z]+/g) || [];
    let best = null;
    let score = 0;
    chat.questions.forEach((q) => {
      const hay = q.toLowerCase();
      const s = words.reduce((t, w) => t + (w.length > 2 && hay.includes(w) ? w.length : 0), 0);
      if (s > score) {
        score = s;
        best = q;
      }
    });
    if (score >= 4) {
      chat.onAsk(best);
      setDraft("");
      setMiss(false);
    } else if (draft.trim()) {
      setMiss(true);
    }
  };

  return (
    <div className="pc-chat">
      <p className="pc-eyebrow">Ask me anything</p>

      <div className="pc-chat-pills">
        {chat.questions.map((q) => (
          <button
            key={q}
            type="button"
            className={`pc-pill${q === chat.active ? " on" : ""}`}
            onClick={() => chat.onAsk(q)}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="pc-thread">
        <p className="pc-said">{chat.active}</p>
        {chat.thinking ? (
          <div className="pc-typing" aria-label="thinking">
            <i />
            <i />
            <i />
          </div>
        ) : (
          <p className="pc-reply">{chat.answer}</p>
        )}
      </div>

      <form className="pc-input" onSubmit={submit}>
        <label className="pc-sr" htmlFor="sc-ask">
          Ask a question
        </label>
        <input
          id="sc-ask"
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

      {miss && (
        <p className="pc-small" role="status">
          I have answers ready for the questions above — try one of those.
        </p>
      )}

      <button type="button" className="pc-link" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
