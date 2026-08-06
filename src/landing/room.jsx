/*
 * Things in the room. Objects, not motifs — so unlike the corner ornaments
 * these carry fills, because a teak shelf and a window frame are made of
 * something. Everything here is decorative and aria-hidden except the
 * bulletin cards and frames, which are the way into the content.
 */

/**
 * The window. Teak frame, garden outside, and a blind that draws itself shut
 * when she is about to be interrupted — the slats grow from hairlines into
 * full louvres, which is what closing a venetian blind actually looks like.
 */
export function WindowWall({ shut }) {
  const slats = Array.from({ length: 22 });
  return (
    <div className={`rm-window${shut ? " is-shut" : ""}`} aria-hidden="true">
      <div className="rm-view">
        <span className="rm-canopy" />
        <span className="rm-leaves" />
        <span className="rm-grass" />
      </div>

      <div className="rm-blind">
        {slats.map((_, i) => (
          <span key={i} className="rm-slat" style={{ "--i": i }} />
        ))}
      </div>

      <div className="rm-sash" />
      <div className="rm-sill" />
    </div>
  );
}

/**
 * Teak corner shelf on a carved elephant bracket, with a small brass Ganesha
 * and a second elephant standing on the shelf. Taken from the reference: the
 * bracket is the wall's one piece of carving.
 */
export function CornerShelf() {
  return (
    <div className="rm-shelf" aria-hidden="true">
      <svg viewBox="0 0 180 220" fill="none">
        {/* Ganesha, seated */}
        <g className="rm-brass">
          <ellipse cx="52" cy="52" rx="21" ry="16" />
          <circle cx="52" cy="30" r="13" />
          <path d="M52 34 C 52 44, 46 50, 44 58" strokeWidth="3" fill="none" />
          <ellipse cx="38" cy="30" rx="6" ry="9" />
          <ellipse cx="66" cy="30" rx="6" ry="9" />
          <rect x="30" y="62" width="44" height="6" rx="1" />
        </g>

        {/* Small standing elephant on the shelf */}
        <g className="rm-teak">
          <path d="M96 62 C 96 50, 106 44, 118 44 C 130 44, 138 50, 138 62 L 138 68 L 96 68 Z" />
          <path d="M96 56 C 90 54, 86 48, 88 42 C 92 44, 95 48, 96 52 Z" />
          <path d="M88 62 C 84 62, 82 58, 84 54" className="rm-line" fill="none" />
        </g>

        {/* Shelf plank */}
        <g className="rm-teak">
          <rect x="14" y="68" width="152" height="12" />
          <rect x="14" y="80" width="152" height="4" className="rm-shade" />
        </g>

        {/* The carved bracket: an elephant in side profile, facing left */}
        <g className="rm-teak">
          <rect x="30" y="84" width="120" height="70" />
        </g>
        <g className="rm-carve">
          {/* body */}
          <path d="M62 146 C 52 146, 44 138, 44 126 C 44 112, 56 102, 74 102 C 96 102, 112 110, 112 126 C 112 140, 104 146, 94 146 Z" />
          {/* head and ear */}
          <path d="M44 126 C 36 126, 30 120, 30 112 C 30 104, 36 98, 44 100" />
          <ellipse cx="52" cy="118" rx="10" ry="13" className="rm-line" fill="none" />
          {/* trunk */}
          <path
            d="M32 116 C 26 124, 26 136, 32 144 C 36 149, 42 149, 44 145"
            className="rm-line"
            fill="none"
            strokeWidth="5"
          />
          {/* legs */}
          <rect x="52" y="140" width="12" height="14" />
          <rect x="92" y="140" width="12" height="14" />
          {/* tail */}
          <path d="M112 122 C 118 126, 118 136, 114 140" className="rm-line" fill="none" />
        </g>

        {/* The wedge that lands the bracket on the wall */}
        <g className="rm-teak">
          <path d="M30 154 L 150 154 L 90 206 Z" />
        </g>
        <path d="M42 162 L 138 162" className="rm-line" fill="none" />

        {/* A rolled drawing, tucked under the shelf */}
        <g className="rm-paper">
          <rect x="98" y="128" width="44" height="12" rx="6" />
          <circle cx="140" cy="134" r="6" />
        </g>
      </svg>
    </div>
  );
}

/** Small brass hook and cord — used by both the big frame and the board. */
function Hanger() {
  return (
    <>
      <span className="rm-hook" aria-hidden="true" />
      <span className="rm-cord" aria-hidden="true" />
    </>
  );
}

/**
 * The large framed piece on the right wall. Clicking it opens that case study.
 */
export function WallFrame({ project, onOpen, size = "lg" }) {
  return (
    <a
      className={`rm-frame rm-frame-${size}`}
      href={`#work=${project.slug}`}
      onClick={(e) => {
        e.preventDefault();
        onOpen(project.slug);
      }}
      style={{ "--tilt": `${project.tilt}deg`, "--cord": `${project.cord}px` }}
    >
      <Hanger />
      <span className="rm-frame-body">
        <span className="rm-frame-mat">
          <img src={project.image} alt="" loading="lazy" decoding="async" />
        </span>
      </span>
      <span className="rm-frame-cap">{project.short}</span>
    </a>
  );
}

/**
 * The pin board. Photographs open the story at that moment; the letters and
 * postcards open what that person wrote.
 */
export function Bulletin({ photos, letters, onPhoto, onLetter }) {
  return (
    <div className="rm-board">
      <span className="rm-board-tape" aria-hidden="true" />

      <div className="rm-board-inner">
        {photos.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className="rm-photo"
            style={{ "--tilt": `${[-2.4, 1.8, -1.2, 2.6, -0.8, 1.4][i % 6]}deg` }}
            onClick={() => onPhoto(m.id)}
          >
            <span className="rm-pin" aria-hidden="true" />
            <img src={m.image} alt="" loading="lazy" decoding="async" />
            <span className="rm-photo-cap">{m.year}</span>
          </button>
        ))}

        {letters.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className="rm-letter"
            style={{ "--tilt": `${[1.6, -2.2, 2.2, -1.4, 0.9][i % 5]}deg` }}
            onClick={() => onLetter(s.id)}
          >
            <span className="rm-pin" aria-hidden="true" />
            <span className="rm-stamp" aria-hidden="true" />
            <span className="rm-rule" aria-hidden="true" />
            <span className="rm-rule" aria-hidden="true" />
            <span className="rm-rule" aria-hidden="true" />
            <span className="rm-letter-cap">{s.attr}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
