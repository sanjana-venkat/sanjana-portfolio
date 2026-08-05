import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LOCATION_SHIFT, STORY_MOMENTS } from "./landingData";

/**
 * The timeline follows a shallow S rather than a résumé rule, so it reads as
 * another arm of the same drawing. Points are placed by sampling the path,
 * which keeps them correct at any width instead of hard-coding coordinates.
 */
const TIMELINE_PATH =
  "M 26 30 C 104 30, 104 128, 176 128 C 248 128, 248 226, 320 226";
// The viewBox is wider than the drawn path so the year labels beside the last
// points always have room inside the column.
const TIMELINE_W = 392;
const TIMELINE_H = 256;

function LocationShift() {
  const { from, to } = LOCATION_SHIFT;
  return (
    <p className="pc-location">
      <span className="pc-location-city pc-location-from">
        {from.city}
        <span className="pc-location-region">{from.region}</span>
      </span>
      <span className="pc-location-rule" aria-hidden="true" />
      <span className="pc-location-city pc-location-to">
        {to.city}
        <span className="pc-location-region">{to.region}</span>
      </span>
    </p>
  );
}

export default function StoryStage({ active }) {
  const pathRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [activeId, setActiveId] = useState(STORY_MOMENTS[0].id);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || typeof path.getTotalLength !== "function") return;
    const total = path.getTotalLength();
    const count = STORY_MOMENTS.length;
    setPoints(
      STORY_MOMENTS.map((moment, index) => {
        const t = (index + 0.5) / count;
        const point = path.getPointAtLength(total * t);
        return { id: moment.id, x: (point.x / TIMELINE_W) * 100, y: (point.y / TIMELINE_H) * 100 };
      })
    );
  }, []);

  // Only the image for the moment on screen is fetched eagerly.
  useEffect(() => {
    if (!active) return;
    const next = STORY_MOMENTS[STORY_MOMENTS.findIndex((m) => m.id === activeId) + 1];
    if (next) new Image().src = next.image;
  }, [active, activeId]);

  const activeIndex = Math.max(
    0,
    STORY_MOMENTS.findIndex((moment) => moment.id === activeId)
  );
  const moment = STORY_MOMENTS[activeIndex];

  return (
    <div className={`pc-panel${active ? " is-active" : ""}`} id="stage-story">
      <div className="pc-story pc-rise">
        <div style={{ display: "grid", gap: "clamp(10px, 2vh, 24px)", "--i": 0 }}>
          <div>
            <h2 className="pc-heading">
              <span className="pc-wipe">Story</span>
            </h2>
            <div style={{ marginTop: "clamp(10px, 1.6vh, 20px)" }}>
              <LocationShift />
            </div>
          </div>

          <figure className="pc-moment-detail" style={{ margin: 0 }}>
            <img key={moment.image} src={moment.image} alt={moment.title} decoding="async" />
            <figcaption id="stage-story-detail" aria-live="polite">
              <p className="pc-eyebrow">{moment.year}</p>
              <h3 className="pc-moment-title" style={{ marginTop: 8 }}>
                {moment.title}
              </h3>
              <p className="pc-moment-copy">{moment.copy}</p>
            </figcaption>
          </figure>
        </div>

        <div className={`pc-timeline has-active`} style={{ "--i": 1 }}>
          <svg viewBox={`0 0 ${TIMELINE_W} ${TIMELINE_H}`} aria-hidden="true" focusable="false">
            <path ref={pathRef} className="pc-timeline-path" d={TIMELINE_PATH} />
            <path
              className="pc-timeline-progress"
              d={TIMELINE_PATH}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - (activeIndex + 0.5) / STORY_MOMENTS.length}
            />
          </svg>

          <ol
            className="pc-timeline-points"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {STORY_MOMENTS.map((item, index) => {
              const point = points[index];
              if (!point) return null;
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`pc-moment${isActive ? " is-active" : ""}`}
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    aria-current={isActive ? "true" : "false"}
                    aria-describedby="stage-story-detail"
                    onMouseEnter={() => setActiveId(item.id)}
                    onFocus={() => setActiveId(item.id)}
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveId(item.id);
                    }}
                  >
                    <span className="pc-moment-dot" aria-hidden="true" />
                    <span className="pc-moment-year">{item.year}</span>
                    <span className="pc-sr">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
