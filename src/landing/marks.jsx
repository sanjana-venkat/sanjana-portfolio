/*
 * Frame and marker motifs. All decorative, all outlined, all aria-hidden.
 * Drawn from the same vocabulary as the kolam so the frame and the framed
 * object belong to one another.
 */

/**
 * Corner ornament. An L that resolves the right angle with kolam loops running
 * along both arms — heavier at the joint, tapering toward the tips — so the
 * empty middle can be the subject.
 */
export function CornerOrnament({ where }) {
  return (
    <div className={`pc-corner ${where}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor">
        {/* The two arms */}
        <path d="M6 6 H 86" strokeWidth="1.2" />
        <path d="M6 6 V 86" strokeWidth="1.2" />
        <path d="M6 16 H 62" strokeWidth="0.75" opacity="0.7" />
        <path d="M16 6 V 62" strokeWidth="0.75" opacity="0.7" />

        {/* Loops along each arm, tapering outward */}
        {[
          [30, 11, 7],
          [48, 11, 6],
          [66, 11, 5],
          [11, 30, 7],
          [11, 48, 6],
          [11, 66, 5],
        ].map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} strokeWidth="1" />
        ))}

        {/* The joint: a kolam knot where the arms meet */}
        <path
          d="M6 6 C 22 6, 30 14, 30 26 C 30 38, 22 44, 12 44 C 4 44, 0 38, 4 32"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M6 6 C 6 22, 14 30, 26 30 C 38 30, 44 22, 44 12 C 44 4, 38 0, 32 4"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="21" cy="21" r="3" strokeWidth="1" />
      </svg>
    </div>
  );
}

/** Half-open lotus bud, in profile. Sits left of a section eyebrow. */
export function LotusMarker() {
  return (
    <svg
      className="pc-lotus"
      viewBox="0 0 12 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M6 19 C 6 13, 6 7, 6 2" />
      <path d="M6 19 C 1 15, 0 9, 2 5 C 4 8, 5 13, 6 19 Z" />
      <path d="M6 19 C 11 15, 12 9, 10 5 C 8 8, 7 13, 6 19 Z" />
    </svg>
  );
}

/** Paper grain. Present, but invisible when you look for it. */
export function PaperGrain() {
  return (
    <svg className="pc-grain" aria-hidden="true">
      <filter id="pc-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#pc-noise)" />
    </svg>
  );
}
