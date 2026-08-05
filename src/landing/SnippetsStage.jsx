import PortfolioChat from "./PortfolioChat";
import { SNIPPET_SIDES } from "./landingData";

/**
 * Stage 3. Two typographic labels — 9 to 5 and 5 to 9 — joined by the same
 * S the grid draws, with the chat as the working surface on the right.
 * No project cards: the projects are text, and the detail lives in the chat
 * and in the shortcuts that stay pinned top-right.
 */

// A small S in the same family as the kolam loop, joining the two labels.
const JOIN_PATH =
  "M 26 2 C 12 2, 4 9, 4 15 C 4 21, 12 25, 20 25 C 28 25, 36 29, 36 35 C 36 41, 28 46, 14 46";

export default function SnippetsStage({ active, chat, onOpenProject }) {
  return (
    <div className={`pc-panel${active ? " is-active" : ""}`} id="stage-snippets">
      <div className="pc-snippets pc-rise">
        <div className="pc-sides" style={{ "--i": 0 }}>
          <h2 className="pc-heading">
            <span className="pc-wipe">Snippets</span>
          </h2>

          {SNIPPET_SIDES.map((side, index) => (
            <div key={side.id} className={`pc-side${index === 1 ? " is-second" : ""}`}>
              {index === 1 && (
                <svg
                  className="pc-side-join"
                  viewBox="0 0 40 48"
                  preserveAspectRatio="xMinYMid meet"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={JOIN_PATH} pathLength="1" />
                </svg>
              )}
              <p className="pc-side-label">{side.label}</p>
              <p className="pc-side-copy">{side.copy}</p>
              <ul className="pc-side-projects">
                {side.projects.map((project) => {
                  const slug = onOpenProject.slugFor(project);
                  return (
                    <li key={project}>
                      {slug ? (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onOpenProject.open(slug);
                          }}
                        >
                          {project}
                        </button>
                      ) : (
                        project
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ "--i": 1, minHeight: 0, display: "flex" }}>
          <PortfolioChat {...chat} />
        </div>
      </div>
    </div>
  );
}
