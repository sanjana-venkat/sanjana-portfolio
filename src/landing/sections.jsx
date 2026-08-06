import { useLayoutEffect, useRef, useState } from "react";
import { LotusMarker } from "./marks";
import {
  CHAT_OPENER,
  INTRO,
  LINKS,
  MOVED_MOMENT,
  SNIPPETS,
  STATEMENTS,
  STORY_MOMENTS,
} from "./landingData";

/* Every section is the same shape: a lotus-marked eyebrow and a display title
   on the left, supporting material on the right, and nothing at all in the
   middle where the kolam is. */

function Eyebrow({ title }) {
  return (
    <p className="pc-label">
      <LotusMarker />
      {title}
    </p>
  );
}

/* ── Sanjana ───────────────────────────────────────────────────────────── */

export function Sanjana() {
  return (
    <>
      <div className="pc-zone pc-zone-l pc-fade">
        <div style={{ "--i": 0 }}>
          <Eyebrow title="Sanjana" />
          <h1 className="pc-title">{INTRO.name}</h1>
          <p className="pc-lead">{INTRO.lead}</p>
        </div>
      </div>

      <div className="pc-zone pc-zone-r pc-fade">
        <div className="pc-stack" style={{ "--i": 1 }}>
          <p className="pc-lead" style={{ margin: 0 }}>
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

/* ── Story ─────────────────────────────────────────────────────────────── */

/* A vertical kolam-ish wave: eleven moments need height, not width. */
const TL_PATH =
  "M 78 12 C 130 60, 130 108, 78 156 C 26 204, 26 252, 78 300 C 130 348, 130 396, 78 444 C 44 476, 44 520, 70 548";
const TL_W = 232;
const TL_H = 560;

/**
 * Frisco, Texas becomes San Francisco, California — but only when the timeline
 * gets there. "San" slides in, "anc" opens up inside "Frisco", and the state
 * swaps underneath. The word is never retyped; it grows.
 */
function LocationLine({ there }) {
  return (
    <p className={`pc-loc${there ? " is-there" : ""}`}>
      <span>
        <span className="grow">San&nbsp;</span>
        Fr
        <span className="grow">anc</span>
        isco
      </span>
      <span className="region" aria-hidden="true">
        <span className="tx">Texas</span>
        <span className="ca">California</span>
      </span>
      <span className="pc-sr">{there ? "California" : "Texas"}</span>
    </p>
  );
}

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
  const movedIndex = STORY_MOMENTS.findIndex((m) => m.id === MOVED_MOMENT);

  return (
    <>
      <div className="pc-zone pc-zone-l pc-fade">
        <div className="pc-stack" style={{ "--i": 0 }}>
          <div>
            <Eyebrow title="Story" />
            <h2 className="pc-title">Story</h2>
          </div>

          <LocationLine there={index >= movedIndex} />

          <figure className="pc-moment">
            <div className="shot pc-propped">
              <img key={moment.image} src={moment.image} alt={moment.title} decoding="async" />
            </div>
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

/* ── Snippets ──────────────────────────────────────────────────────────── */

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
  const [allPills, setAllPills] = useState(false);

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
            <Eyebrow title="Snippets" />
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
              <p className="pc-small" style={{ margin: 0 }}>
                {CHAT_OPENER}
              </p>

              <div className="pc-chat-pills">
                {(allPills ? chat.questions : chat.questions.slice(0, 4)).map((q) => (
                  <button
                    key={q}
                    type="button"
                    className={`pc-pill${q === chat.active ? " on" : ""}`}
                    onClick={() => chat.onAsk(q)}
                  >
                    {q}
                  </button>
                ))}
                {chat.questions.length > 4 && (
                  <button
                    type="button"
                    className="pc-pill"
                    aria-expanded={allPills}
                    onClick={() => setAllPills((v) => !v)}
                  >
                    {allPills ? "fewer" : `+${chat.questions.length - 4}`}
                  </button>
                )}
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
                <p className="pc-small" role="status">
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

/* ── Statements ────────────────────────────────────────────────────────── */

export function Statements() {
  const [openId, setOpenId] = useState(STATEMENTS[0].id);
  const open = STATEMENTS.find((s) => s.id === openId) || STATEMENTS[0];

  return (
    <>
      <div className="pc-zone pc-zone-l pc-fade">
        <div className="pc-stack" style={{ "--i": 0 }}>
          <div>
            <Eyebrow title="Statements" />
            <h2 className="pc-title">Statements</h2>
          </div>
          <ul className="pc-index">
            {STATEMENTS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={s.id === open.id ? "on" : ""}
                  onMouseEnter={() => setOpenId(s.id)}
                  onFocus={() => setOpenId(s.id)}
                  onClick={() => setOpenId(s.id)}
                >
                  {s.attr}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pc-zone pc-zone-r pc-fade">
        {/* Fixed slot: switching statements must never move the page. */}
        <figure className="pc-quote-slot" style={{ margin: 0, "--i": 1 }} aria-live="polite">
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
