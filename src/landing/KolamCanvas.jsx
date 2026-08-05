import { DOTS, FIELD, HERO_S, VIEW_BOX } from "./kolam";

// Where each group starts in FIELD, so the draw stagger restarts per stage.
const GROUP_START = [1, 2, 3].reduce(
  (map, group) => ({ ...map, [group]: FIELD.findIndex((loop) => loop.group === group) }),
  {}
);

/**
 * The dot grid and its loops. One SVG for all 81 dots and every loop — the grid
 * is decorative structure, not 81 animated React components, so the whole thing
 * is driven by CSS custom properties and class flips.
 *
 * `phase` controls the intro: "blank" -> "dots" -> "hero" -> "done".
 * `drawnGroups` is how many field groups have been revealed (0 to 3).
 */
export default function KolamCanvas({
  containerRef,
  phase = "done",
  drawnGroups = 0,
  heroInGrid = true,
  showEcho = false,
  centered = false,
}) {
  const dotsOn = phase !== "blank";
  const heroOn = phase === "hero" || phase === "done";

  return (
    <div
      ref={containerRef}
      className={`pc-kolam${centered ? " is-centered" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox={VIEW_BOX} focusable="false" role="presentation">
        <g className={`pc-dots${dotsOn ? " is-on" : ""}`}>
          {DOTS.map((dot) => (
            <circle
              key={`${dot.c}-${dot.r}`}
              className="pc-dot"
              cx={dot.c}
              cy={dot.r}
              r={0.13}
              style={{ "--dot-delay": `${dot.ring * 78 + ((dot.c + dot.r) % 3) * 22}ms` }}
            />
          ))}
        </g>

        {/* The S that starts the whole thing. It stays here only until it
            detaches and becomes the first letter of the name. */}
        {heroInGrid && (
          <path
            className={`pc-loop is-hero${heroOn ? " is-drawn" : ""}`}
            d={HERO_S.d}
            transform={HERO_S.transform}
            pathLength="1"
            style={{ "--loop-delay": "0ms" }}
          />
        )}

        {/* The S echoed back into its empty slot once the composition closes. */}
        {showEcho && (
          <path
            className="pc-loop is-echo is-drawn"
            d={HERO_S.d}
            transform={HERO_S.transform}
            pathLength="1"
            style={{ "--loop-delay": "620ms" }}
          />
        )}

        {FIELD.map((loop, index) => {
          if (loop.group > drawnGroups) return null;
          const indexInGroup = index - GROUP_START[loop.group];
          return (
            <path
              key={loop.id}
              className="pc-loop is-drawn"
              d={loop.d}
              transform={loop.transform}
              pathLength="1"
              style={{ "--loop-delay": `${indexInGroup * 52}ms` }}
            />
          );
        })}
      </svg>
    </div>
  );
}
