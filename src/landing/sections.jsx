import { useLayoutEffect, useRef, useState } from "react";
import {
  CHAT_OPENER,
  INTRO,
  LINKS,
  LOCATION,
  SNIPPETS,
  STATEMENTS,
  STORY_MOMENTS,
} from "./landingData";

/* Every section is the same shape: a label and title on the left, supporting
   material on the right, and nothing at all in the middle where the kolam is. */

export function SectionLabel({ n, title }) {
  return (
    <p className="pc-label">
      <span className="on">{n}</span> / {title.toUpperCase()}
    </p>
  );
}

/* ── 01 · Sanjana ──────────────────────────────────────────────────────── */

export function Sanjana() {
  return (
    <>
      <div className="pc-zone pc-zone-l pc-fade">
        <div style={{ "--i": 0 }}>
          <SectionLabel n="01" title="Sanjana" />
          <h1 className="pc-name">{INTRO.name}</h1>
          <p className="pc-lead">{INTRO.lead}</p>
        </div>
      </div>

      <div className="pc-zone pc-zone-r pc-fade">
        <div className="pc-stack" style={{ "--i": 1 }}>
          <p className="pc-body" style={{ color: "var(--ink)" }}>
            {INTRO.role}
          </p>
          <p className="pc-body">{INTRO.bio}</p>
          <div className="pc-links">
            {LINKS.map((link) => (
              <a
                key={link.label}
                className="pc-link"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── 02 · Story ────────────────────────────────────────────────────────── */

const TL_PATH = "M 22 26 C 96 26, 96 118, 170 118 C 244 118, 244 212, 318 212";
const TL_W = 372;
const TL_H = 240;

export function Story() {
  const pathRef = useRef(null);
  const [pts, setPts] = useState([]);
  const [active, setActive] = useState(STORY_MOMENTS[0].id);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path?.getTotalLength) return;
    const total = path.getTotalLength();
    setPts(
      STORY_MOMENTS.map((m, i) => {
        const p = path.getPointAtLength((total * (i + 0.5)) / STORY_MOMENTS.length);
        return { id: m.id, x: (p.x / TL_W) * 100, y: (p.y / TL_H) * 100 };
      })
    );
  }, []);

  const index = Math.max(0, STORY_MOMENTS.findIndex((m) => m.id === active));
  const moment = STORY_MOMENTS[index];

  return (
    <>
      <div className="pc-zone pc-zone-l pc-fade">
        <div className="pc-stack" style={{ "--i": 0 }}>
          <div>
            <SectionLabel n="02" title="Story" />
            <h2 className="pc-title">Story</h2>
          </div>

          <p className="pc-loc">
            <span>
              {LOCATION.from.city}
              <span className="sub">{LOCATION.from.region}</span>
            </span>
            <span className="rule" aria-hidden="true" />
            <span className="to">
              {LOCATION.to.city}
              <span className="sub">{LOCATION.to.region}</span>
            </span>
          </p>

          <figure className="pc-moment">
            <img key={moment.image} src={moment.image} alt={moment.title} decoding="async" />
            <figcaption aria-live="polite">
              <p className="pc-label" style={{ margin: 0 }}>
                {moment.year}
              </p>
              <h3>{moment.title}</h3>
              <p>{moment.copy}</p>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="pc-zone pc-zone-r pc-fade">
        <div className="pc-timeline" style={{ "--i": 1 }}>
          <svg viewBox={`0 0 ${TL_W} ${TL_H}`} aria-hidden="true" focusable="false">
            <path ref={pathRef} className="track" d={TL_PATH} />
            <path
              className="lit"
              d={TL_PATH}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - (index + 0.5) / STORY_MOMENTS.length}
            />
          </svg>
          <ol style={{ position: "absolute", inset: 0, listStyle: "none", margin: 0, padding: 0 }}>
            {STORY_MOMENTS.map((m, i) => {
              const p = pts[i];
              if (!p) return null;
              const on = m.id === active;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    className={`pc-pt${on ? " on" : ""}`}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    aria-current={on ? "true" : "false"}
                    onMouseEnter={() => setActive(m.id)}
                    onFocus={() => setActive(m.id)}
                    onClick={() => setActive(m.id)}
                  >
                    <i aria-hidden="true" />
                    <span>{m.year}</span>
                    <span className="pc-sr">{m.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

/* ── 03 · Snippets ─────────────────────────────────────────────────────── */

function matchQuestion(input, questions) {
  const words = input.toLowerCase().match(/[a-z]+/g) || [];
  let best = null;
  let score = 0;
  questions.forEach((q) => {
    const hay = q.toLowerCase();
    const s = words.reduce((t, w) => t + (w.length > 2 && hay.includes(w) ? w.length : 0), 0);
    if (s > score) {
      score = s;
      best = q;
    }
  });
  return score >= 4 ? best : null;
}

export function Snippets({ chat, onOpenProject }) {
  const [side, setSide] = useState("nine-to-five");
  const [projectId, setProjectId] = useState(SNIPPETS["nine-to-five"].projects[0].id);
  const [asking, setAsking] = useState(false);
  const [draft, setDraft] = useState("");
  const [miss, setMiss] = useState(false);

  const group = SNIPPETS[side];
  const project = group.projects.find((p) => p.id === projectId) || group.projects[0];

  const pickSide = (next) => {
    setSide(next);
    setProjectId(SNIPPETS[next].projects[0].id);
    setAsking(false);
  };

  const submit = (event) => {
    event.preventDefault();
    const hit = matchQuestion(draft, chat.questions);
    if (hit) {
      chat.onAsk(hit);
      setDraft("");
      setMiss(false);
    } else if (draft.trim()) {
      setMiss(true);
    }
  };

  return (
    <>
      <div className="pc-zone pc-zone-l pc-fade">
        <div className="pc-stack" style={{ "--i": 0 }}>
          <div>
            <SectionLabel n="03" title="Snippets" />
            <h2 className="pc-title">Snippets</h2>
          </div>

          <div className="pc-seg">
            {Object.entries(SNIPPETS).map(([key, value], i) => (
              <span key={key} style={{ display: "contents" }}>
                {i === 1 && <span className="sep">/</span>}
                <button
                  type="button"
                  className={side === key ? "on" : ""}
                  onClick={() => pickSide(key)}
                >
                  {value.label}
                </button>
              </span>
            ))}
          </div>

          <p className="pc-body">{group.blurb}</p>

          <ul className="pc-list">
            {group.projects.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={p.id === project.id ? "on" : ""}
                  onClick={() => {
                    setProjectId(p.id);
                    setAsking(false);
                  }}
                >
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pc-zone pc-zone-r pc-fade">
        <div className="pc-stack" style={{ "--i": 1 }}>
          {!asking ? (
            <div className="pc-summary pc-stack" key={project.id}>
              <h3>{project.name}</h3>
              <p className="pc-body">{project.summary}</p>
              <p className="metric">{project.metric}</p>
              <div className="pc-links">
                {project.slug && (
                  <button
                    type="button"
                    className="pc-link"
                    onClick={() => onOpenProject(project.slug)}
                  >
                    Open case study
                  </button>
                )}
                <button type="button" className="pc-link" onClick={() => setAsking(true)}>
                  Ask me about this project
                </button>
              </div>
            </div>
          ) : (
            <div className="pc-chat">
              <p className="pc-body" style={{ margin: 0 }}>
                {CHAT_OPENER}
              </p>
              <div className="pc-chat-log">
                <p className="pc-q">{chat.active}</p>
                {chat.thinking ? (
                  <p className="pc-a" style={{ color: "var(--faint)" }}>
                    thinking…
                  </p>
                ) : (
                  <p className="pc-a">{chat.answer}</p>
                )}
              </div>
              <div className="pc-links">
                {chat.questions.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="pc-link"
                    onClick={() => chat.onAsk(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <form className="pc-input" onSubmit={submit}>
                <label className="pc-sr" htmlFor="pc-ask">
                  Ask a question
                </label>
                <input
                  id="pc-ask"
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
                <p className="pc-body" style={{ fontSize: 14 }} role="status">
                  I have answers ready for the questions above — try one of those.
                </p>
              )}
              <button type="button" className="pc-link" onClick={() => setAsking(false)}>
                Back to {project.name}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ── 04 · Statements ───────────────────────────────────────────────────── */

export function Statements() {
  const [openId, setOpenId] = useState(STATEMENTS[0].id);
  const open = STATEMENTS.find((s) => s.id === openId) || STATEMENTS[0];

  return (
    <>
      <div className="pc-zone pc-zone-l pc-fade">
        <div className="pc-stack" style={{ "--i": 0 }}>
          <div>
            <SectionLabel n="04" title="Statements" />
            <h2 className="pc-title">Statements</h2>
          </div>
          <ul className="pc-index">
            {STATEMENTS.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={s.id === open.id ? "on" : ""}
                  onMouseEnter={() => setOpenId(s.id)}
                  onFocus={() => setOpenId(s.id)}
                  onClick={() => setOpenId(s.id)}
                >
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s.index || s.attr}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pc-zone pc-zone-r pc-fade">
        <figure style={{ margin: 0, "--i": 1 }} aria-live="polite">
          <blockquote className="pc-quote" key={open.id}>
            {open.text}
          </blockquote>
          <figcaption>
            <p className="pc-attr">{open.attr}</p>
            <p className="pc-role">{open.role}</p>
          </figcaption>
        </figure>
      </div>
    </>
  );
}

