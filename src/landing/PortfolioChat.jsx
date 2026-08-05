import { useEffect, useRef, useState } from "react";
import Typewriter from "../Typewriter";
import { CHAT_OPENER } from "./landingData";

/**
 * The same chat, the same answers — just no bubbles, no card, no border box.
 * A conversational column: the question sits right-aligned above a hairline,
 * the answer runs full width beneath it, and the input is a single rule.
 */

const VISIBLE_SUGGESTIONS = 4;

/** Cheap keyword match from free text onto the questions that have answers. */
function matchQuestion(input, questions) {
  const words = input.toLowerCase().match(/[a-z]+/g) || [];
  if (!words.length) return null;
  let best = null;
  let bestScore = 0;
  questions.forEach((question) => {
    const haystack = question.toLowerCase();
    const score = words.reduce(
      (total, word) => total + (word.length > 2 && haystack.includes(word) ? word.length : 0),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = question;
    }
  });
  return bestScore >= 4 ? best : null;
}

export default function PortfolioChat({
  active,
  onAsk,
  answer,
  thinking,
  showLinks,
  questions,
  links,
  instant,
  onAnswerDone,
}) {
  const [draft, setDraft] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [miss, setMiss] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [active, thinking]);

  const ask = (question) => {
    setMiss(false);
    onAsk(question);
  };

  const submit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const match = matchQuestion(draft, questions);
    if (match) {
      ask(match);
      setDraft("");
      setMiss(false);
    } else if (draft.trim()) {
      setMiss(true);
    }
  };

  const shown = showAll ? questions : questions.slice(0, VISIBLE_SUGGESTIONS);

  return (
    <div className="pc-chat" onClick={(event) => event.stopPropagation()}>
      <div className="pc-chat-log" ref={logRef}>
        <p className="pc-chat-opener">{CHAT_OPENER}</p>

        <p className="pc-msg-q">{active}</p>

        {thinking ? (
          <p className="pc-msg-thinking">
            <span aria-hidden="true" />
            thinking
          </p>
        ) : (
          <div aria-live="polite">
            <Typewriter
              className="pc-msg-a"
              caretClassName="pc-caret"
              text={answer}
              shouldStart
              instant={instant}
              onDone={onAnswerDone}
              scrollRef={logRef}
            />
            {showLinks && links?.length > 0 && (
              <div className="pc-chat-links">
                {links.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    className="pc-link"
                    style={{ alignSelf: "flex-start" }}
                    onClick={(event) => {
                      event.stopPropagation();
                      link.onSelect();
                    }}
                  >
                    {link.label} →
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pc-chat-foot">
        <div className="pc-suggestions">
          {shown.map((question) => (
            <button
              key={question}
              type="button"
              className={`pc-suggestion${question === active ? " is-on" : ""}`}
              onClick={(event) => {
                event.stopPropagation();
                ask(question);
              }}
            >
              {question}
            </button>
          ))}
          {questions.length > VISIBLE_SUGGESTIONS && (
            <button
              type="button"
              className="pc-suggestion"
              aria-expanded={showAll}
              onClick={(event) => {
                event.stopPropagation();
                setShowAll((current) => !current);
              }}
            >
              {showAll ? "fewer" : `+${questions.length - VISIBLE_SUGGESTIONS} more`}
            </button>
          )}
        </div>

        <form className="pc-chat-input" onSubmit={submit}>
          <label className="pc-sr" htmlFor="pc-chat-field">
            Ask a question
          </label>
          <input
            id="pc-chat-field"
            value={draft}
            placeholder="Ask me something…"
            autoComplete="off"
            onChange={(event) => {
              setDraft(event.target.value);
              setMiss(false);
            }}
            onKeyDown={(event) => event.stopPropagation()}
          />
          <button type="submit" aria-label="Send question">
            ↵
          </button>
        </form>

        {miss && (
          <p
            className="pc-msg-thinking"
            style={{ marginTop: 8, animation: "none" }}
            role="status"
          >
            I have answers ready for the questions above — pick one of those.
          </p>
        )}
      </div>
    </div>
  );
}
