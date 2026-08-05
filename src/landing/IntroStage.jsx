import { INTRO, LINKS } from "./landingData";

/**
 * Stage 1. Name, statement, role, links, bio — sitting directly on the canvas,
 * aligned to the same rail as the dot grid. No wrapper, no card.
 *
 * `sSlotRef` marks the first glyph so the S drawn in the grid can fly into
 * exactly this spot; `sHidden` keeps the real glyph invisible until it lands.
 * `riseBase` delays the rest of the introduction until the S has arrived, so
 * the whole thing reads as one continuous action rather than a page fade.
 */
export default function IntroStage({ active, sSlotRef, sHidden, riseBase = "180ms" }) {
  return (
    <div className={`pc-panel${active ? " is-active" : ""}`} id="stage-sanjana">
      <div className="pc-intro" style={{ "--rise-base": riseBase }}>
        <h1 className="pc-name" aria-label={INTRO.name}>
          <span
            ref={sSlotRef}
            aria-hidden="true"
            className={`pc-name-s${sHidden ? " is-hidden" : ""}`}
          >
            S
          </span>
          <span
            aria-hidden="true"
            className="pc-wipe"
            style={{ "--wipe-delay": riseBase }}
          >
            anjana
          </span>
        </h1>

        <div className="pc-rise">
          <p className="pc-statement" style={{ "--i": 0 }}>
            {INTRO.statement}
          </p>

          <p className="pc-role" style={{ "--i": 1 }}>
            {INTRO.role}
          </p>

          <div className="pc-links" style={{ "--i": 2 }}>
            {LINKS.map((link) => (
              <a
                key={link.label}
                className="pc-link"
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                onClick={(event) => event.stopPropagation()}
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="pc-bio" style={{ "--i": 3 }}>
            {INTRO.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
