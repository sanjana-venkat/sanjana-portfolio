/*
 * The room: frame, marker, and the wall the work hangs on.
 * All decorative, all outlined, all aria-hidden.
 */

/**
 * Carved corner bracket. Outer contour plus an incised inner line running
 * parallel to it — that double line is what reads as carved wood rather than
 * printed filigree. Heavy at the joint, tapering to the tips, few large curves.
 */
export function CornerOrnament({ where, size = 160 }) {
  return (
    <div className={`pc-corner ${where}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 160 160" fill="none">
        {/* Outer contour — one generous scroll down each arm */}
        <g stroke="var(--wood-800)" strokeLinecap="round">
          <path
            d="M4 4 C 4 46, 20 66, 58 70 C 86 73, 100 60, 96 42 C 93 28, 76 24, 68 36 C 62 45, 70 56, 80 54"
            strokeWidth="2"
          />
          <path
            d="M4 4 C 46 4, 66 20, 70 58 C 73 86, 60 100, 42 96 C 28 93, 24 76, 36 68 C 45 62, 56 70, 54 80"
            strokeWidth="2"
          />
          {/* The arms themselves, tapering outward */}
          <path d="M4 4 H 150" strokeWidth="1.5" opacity="0.55" />
          <path d="M4 4 V 150" strokeWidth="1.5" opacity="0.55" />
        </g>

        {/* Incised inner line, 3px inside at roughly 60% the weight */}
        <g stroke="var(--wood-700)" strokeWidth="0.75" strokeLinecap="round" opacity="0.75">
          <path d="M11 11 C 11 44, 25 60, 57 63 C 80 66, 92 56, 89 42" />
          <path d="M11 11 C 44 11, 60 25, 63 57 C 66 80, 56 92, 42 89" />
          <path d="M11 11 H 138" opacity="0.5" />
          <path d="M11 11 V 138" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

/** Half-open lotus bud, in profile. Sits left of a section eyebrow. */
export function LotusMarker() {
  return (
    <svg
      className="pc-lotus"
      viewBox="0 0 14 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M7 23 C 7 16, 7 8, 7 2" />
      <path d="M7 23 C 1 18, 0 10, 2 5 C 4.5 9, 6 16, 7 23 Z" />
      <path d="M7 23 C 13 18, 14 10, 12 5 C 9.5 9, 8 16, 7 23 Z" />
    </svg>
  );
}

/**
 * A hung frame. The image sits in a bottom-weighted mat inside a brass frame,
 * on a cord dropped from a hook on the picture rail. It pivots from the hook,
 * not its own centre — that one detail is what makes it read as an object on a
 * nail rather than a CSS transform.
 */
export function HungFrame({ src, alt, width, height, cord, tilt, onOpen, label }) {
  return (
    <a
      className="pc-hung"
      href={onOpen.href}
      onClick={onOpen.onClick}
      style={{
        "--cord": `${cord}px`,
        "--tilt": `${tilt}deg`,
        "--fw": `${width}px`,
        "--fh": `${height}px`,
      }}
    >
      <span className="pc-hook" aria-hidden="true" />
      <span className="pc-cord" aria-hidden="true" />
      <span className="pc-frame">
        <span className="pc-mat">
          <img src={src} alt="" loading="lazy" decoding="async" />
        </span>
      </span>
      <span className="pc-caption">{label ?? alt}</span>
    </a>
  );
}

/** Lime plaster. A background image, not a filter — filters break on redraw. */
const PLASTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
       <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" stitchTiles="stitch"/>
       <feColorMatrix type="saturate" values="0"/></filter>
       <rect width="180" height="180" filter="url(#n)" opacity="0.5"/>
     </svg>`
  );

export function Plaster() {
  return (
    <div
      className="pc-plaster"
      aria-hidden="true"
      style={{ backgroundImage: `url("${PLASTER}")` }}
    />
  );
}
