import { useState } from "react";
import { STATEMENTS } from "./landingData";

/**
 * Stage 4. The statements are set at reading size and composed as an index
 * with one open at a time — no quote marks, no cards, no auto-rotation. The
 * index alternates its indent so the block has structure without scattering.
 */
export default function StatementsStage({ active }) {
  const [openId, setOpenId] = useState(STATEMENTS[0]?.id);
  const open = STATEMENTS.find((statement) => statement.id === openId) || STATEMENTS[0];

  return (
    <div className={`pc-panel${active ? " is-active" : ""}`} id="stage-statements">
      <div className="pc-statements pc-rise">
        <div style={{ "--i": 0, display: "grid", gap: "clamp(14px, 2.6vh, 34px)" }}>
          <h2 className="pc-heading">
            <span className="pc-wipe">Statements</span>
          </h2>

          {open && (
            <figure className="pc-statement-active" style={{ margin: 0 }} aria-live="polite">
              <blockquote key={open.id}>{open.text}</blockquote>
              <figcaption>
                {open.attribution && <strong>{open.attribution}</strong>}
                {open.context}
              </figcaption>
            </figure>
          )}
        </div>

        <ul className="pc-statement-index" style={{ "--i": 1 }}>
          {STATEMENTS.map((statement, index) => {
            const isOpen = statement.id === open?.id;
            return (
              <li key={statement.id}>
                <button
                  type="button"
                  aria-current={isOpen ? "true" : "false"}
                  onMouseEnter={() => setOpenId(statement.id)}
                  onFocus={() => setOpenId(statement.id)}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenId(statement.id);
                  }}
                >
                  <span className="num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="lbl">{statement.attribution || statement.context}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
