import { useCallback, useEffect, useState } from "react";
import KolamMark from "./KolamMark";
import { HungFrame, Plaster } from "./marks";
import { Sanjana, Snippets, Statements, Story } from "./sections";
import { FEATURED, INTRO, MORE_WORK, SECTIONS, STORY_MOMENTS } from "./landingData";
import { useMediaQuery, usePrefersReducedMotion } from "./useMediaQuery";
import "./landing.css";
import "./scene.css";

const SESSION_KEY = "sv-kolam-drawn";

/**
 * The homepage is a room.
 *
 * A limewashed wall, a tall window throwing light across it from the left, the
 * kolam painted on the wall as the artwork, the work hung beside it in frames,
 * and Sanjana at a desk below. Opening a section lays content over the room; it
 * never replaces it. Clicking her opens the chat at her side of the desk.
 *
 * The kolam — geometry, colours and drawing animation — is untouched.
 */
export default function Scene({ chat, onOpenProject }) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 860px)");

  const [open, setOpen] = useState(null); // section id | "chat" | null
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    try {
      window.sessionStorage?.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode: the kolam simply draws again next visit */
    }
  }, []);

  // Only the open section's images are fetched.
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

  const select = useCallback((id) => {
    setOpen(id);
    setHovered(null);
  }, []);

  const isSection = open && open !== "chat";

  return (
    <div className="sc">
      {/* ── The room ───────────────────────────────────────────────── */}
      <div className="sc-wall" aria-hidden="true" />
      <Plaster className="sc-grain" />

      <div className="sc-window" aria-hidden="true">
        <svg viewBox="0 0 200 620" preserveAspectRatio="none">
          <rect className="pane" x="8" y="8" width="184" height="604" />
          <g className="mullion">
            <rect x="8" y="8" width="184" height="604" />
            <path d="M100 8 V 612" />
            <path d="M8 160 H 192" />
            <path d="M8 312 H 192" />
            <path d="M8 464 H 192" />
          </g>
        </svg>
      </div>
      <div className="sc-shaft" aria-hidden="true" />

      {/* ── The artwork ────────────────────────────────────────────── */}
      <div className="sc-halo" aria-hidden="true" />

      <button type="button" className="sc-name" onClick={() => setOpen(null)}>
        <b>{INTRO.wordmark}</b>
        <span>{INTRO.tagline}</span>
      </button>

      <KolamMark
        drawn={4}
        active={isSection ? open : null}
        hovered={hovered}
        onHover={setHovered}
        onSelect={select}
      />

      <div className="sc-labels">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`l${i}${hovered === s.id || open === s.id ? " on" : ""}`}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(s.id)}
            onBlur={() => setHovered(null)}
            onClick={() => select(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* ── The gallery wall ───────────────────────────────────────── */}
      <div className="sc-gallery">
        <p className="pc-eyebrow sc-eyebrow-r">Selected work</p>
        <div className="rail" aria-hidden="true" />
        <div className="sc-frames">
          {FEATURED.map((p) => (
            <HungFrame
              key={p.slug}
              src={p.image}
              alt={p.name}
              label={p.short}
              width={p.width}
              height={p.height}
              cord={p.cord}
              tilt={p.tilt}
              onOpen={{
                href: `#work=${p.slug}`,
                onClick: (e) => {
                  e.preventDefault();
                  onOpenProject(p.slug);
                },
              }}
            />
          ))}
        </div>
      </div>

      <div className="sc-strip">
        <p className="pc-eyebrow sc-eyebrow-r">More work</p>
        <div className="band">
          {MORE_WORK.map((p) => (
            <a
              key={p.slug}
              href={`#work=${p.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onOpenProject(p.slug);
              }}
            >
              {p.name}
            </a>
          ))}
        </div>
      </div>

      {/* ── Her desk. Clicking her opens the conversation. ─────────── */}
      <button
        type="button"
        className="sc-desk"
        aria-label="Ask me anything"
        onClick={() => setOpen("chat")}
      >
        <img src="/scene-desk.png" alt="" decoding="async" />
      </button>
      <p className="sc-desk-hint" aria-hidden="true">
        Ask me anything
      </p>

      {/* ── Layers over the room ───────────────────────────────────── */}
      {isSection && (
        <div className="sc-layer">
          <div className="sc-scrim" aria-hidden="true" />
          <div className="sc-panel sc-panel-wide">
            {open === "sanjana" && <Sanjana />}
            {open === "story" && <Story />}
            {open === "snippets" && <Snippets chat={chat} onOpenProject={onOpenProject} />}
            {open === "statements" && <Statements />}
          </div>
        </div>
      )}

      {open === "chat" && (
        <div className="sc-layer">
          <div className="sc-panel sc-panel-chat">
            <DeskChat chat={chat} onClose={() => setOpen(null)} />
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
        <button type="button" className="sc-close" onClick={() => setOpen(null)}>
          Close
        </button>
      )}

      <p className="pc-sr" aria-live="polite">
        {isSection ? `${SECTIONS.find((s) => s.id === open)?.title} open` : "Choose a section"}
      </p>

      {/* Nothing below is rendered; it keeps the linter honest about deps. */}
      <span hidden aria-hidden="true">{String(reduced)}{String(isMobile)}</span>
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
