import Elephant from "./Elephant";

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
      <Elephant />
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
        // Hand over where the frame is, so the case study can grow out of it.
        const body = e.currentTarget.querySelector(".rm-frame-body");
        onOpen(project.slug, body?.getBoundingClientRect());
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
