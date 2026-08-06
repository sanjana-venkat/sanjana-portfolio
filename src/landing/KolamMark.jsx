import { DOTS, SEGMENTS, SECTION_IDS, VIEW_BOX } from "./kolam";

/**
 * The kolam itself: the brand mark, and the navigation.
 *
 * It sits in the optical centre of the viewport and never moves. Each quarter
 * of the line is one section, with a fat invisible stroke over it as a hit
 * area, so the drawing is something you can actually point at.
 */
export default function KolamMark({
  drawn,          // how many quarters have been drawn (0-4)
  active,         // section id currently open, or null
  hovered,        // section id under the pointer/focus, or null
  onHover,
  onSelect,
}) {
  return (
    <div className="km" aria-hidden={!onSelect}>
      <svg viewBox={VIEW_BOX} focusable="false" role="presentation">
        {DOTS.map((dot) => (
          <circle
            key={`${dot.x}-${dot.y}`}
            className="km-dot"
            cx={dot.x}
            cy={dot.y}
            r={0.072}
            style={{ "--d": `${(Math.abs(dot.x) + Math.abs(dot.y)) * 90}ms` }}
          />
        ))}

        {SEGMENTS.map((d, index) => {
          const id = SECTION_IDS[index];
          const isDrawn = index < drawn;
          const lit = hovered === id || active === id;
          return (
            <g key={id}>
              <path
                className={`km-line${isDrawn ? " is-drawn" : ""}${lit ? " is-lit" : ""}`}
                d={d}
                pathLength="1"
                style={{ "--i": index }}
              />
              {onSelect && isDrawn && (
                <path
                  className="km-hit"
                  d={d}
                  tabIndex={0}
                  role="button"
                  aria-label={id}
                  onMouseEnter={() => onHover(id)}
                  onMouseLeave={() => onHover(null)}
                  onFocus={() => onHover(id)}
                  onBlur={() => onHover(null)}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(id);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      onSelect(id);
                    }
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
