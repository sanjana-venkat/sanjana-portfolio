/**
 * The carved bracket.
 *
 * A Chettinad corbel: a stepped cornice over a lotus-petal band, a
 * caparisoned elephant in profile, a scroll volute and a peacock beneath, and
 * a tapered foot. Built in bands down the viewBox so the parts cannot drift
 * into one another:
 *
 *    0– 30  shelf plank and beading
 *   30– 62  lotus-petal arch run
 *   62–206  the elephant
 *  206–262  volute and peacock
 *  262–318  foot
 */
export default function Elephant() {
  const petals = [0, 1, 2, 3, 4, 5, 6];

  return (
    <svg viewBox="0 0 200 320" fill="none" aria-hidden="true">
      {/* ── Shelf plank ───────────────────────────────────────────── */}
      <rect x="4" y="4" width="192" height="16" className="el-wood" />
      <rect x="4" y="20" width="192" height="4" className="el-dark" />
      <g className="el-bead">
        {Array.from({ length: 23 }).map((_, i) => (
          <circle key={i} cx={10 + i * 8} cy="28" r="2.2" />
        ))}
      </g>

      {/* ── Lotus-petal arch run ──────────────────────────────────── */}
      <g className="el-relief">
        {petals.map((i) => (
          <path key={i} d={`M${14 + i * 25} 60 C ${14 + i * 25} 40, ${39 + i * 25} 40, ${39 + i * 25} 60 Z`} />
        ))}
      </g>
      <g className="el-line">
        {petals.map((i) => (
          <path key={i} d={`M${20 + i * 25} 59 C ${20 + i * 25} 46, ${33 + i * 25} 46, ${33 + i * 25} 59`} />
        ))}
      </g>
      <rect x="8" y="60" width="184" height="4" className="el-dark" />

      {/* ── The elephant ──────────────────────────────────────────── */}
      {/* back and rump */}
      <path
        className="el-relief"
        d="M64 182 C 62 158, 60 132, 78 118 C 96 104, 132 106, 148 122
           C 160 134, 160 164, 154 182 Z"
      />
      {/* head */}
      <path
        className="el-relief"
        d="M64 176 C 46 174, 34 160, 34 140 C 34 120, 48 108, 66 112 C 76 114, 82 124, 82 134 Z"
      />
      {/* ear */}
      <path
        className="el-relief"
        d="M62 112 C 46 112, 38 128, 42 146 C 45 158, 60 162, 68 152 C 76 142, 74 122, 68 112 Z"
      />
      <path className="el-line" d="M60 120 C 50 126, 48 138, 51 148" />
      {/* trunk, curling forward and down */}
      <path
        className="el-trunk"
        d="M40 146 C 30 158, 28 178, 36 190 C 42 199, 54 198, 56 190"
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <path key={i} className="el-line" d={`M${36 - i} ${154 + i * 9} l 10 2`} />
      ))}
      {/* tusk */}
      <path className="el-ivory" d="M46 160 C 40 168, 40 178, 44 182 C 44 173, 46 165, 51 161 Z" />
      {/* headplate and eye */}
      <path className="el-relief" d="M48 116 C 60 112, 72 116, 76 124 C 66 128, 54 126, 48 122 Z" />
      <circle cx="56" cy="134" r="2.8" className="el-eye" />

      {/* caparison over the back */}
      <path
        className="el-cloth"
        d="M80 120 C 100 110, 130 112, 146 126 C 150 138, 148 152, 142 160
           C 122 152, 100 150, 84 156 C 78 144, 78 130, 80 120 Z"
      />
      <g className="el-line">
        <path d="M86 124 C 106 116, 126 118, 143 130" />
        <path d="M84 136 C 104 130, 124 132, 145 142" />
      </g>
      {/* scalloped hem */}
      <g className="el-relief">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${86 + i * 11} 156 C ${89 + i * 11} 166, ${94 + i * 11} 166, ${97 + i * 11} 156 Z`} />
        ))}
      </g>

      {/* legs and anklets */}
      <path className="el-relief" d="M74 176 h 18 v 26 h -18 Z" />
      <path className="el-relief" d="M126 176 h 18 v 26 h -18 Z" />
      <rect x="72" y="194" width="22" height="5" className="el-dark" />
      <rect x="124" y="194" width="22" height="5" className="el-dark" />
      {/* tail */}
      <path className="el-line" d="M156 146 C 164 152, 164 168, 158 178" />

      {/* ── Volute and peacock ────────────────────────────────────── */}
      <rect x="8" y="204" width="184" height="4" className="el-dark" />
      <path
        className="el-relief"
        d="M40 214 C 24 218, 20 238, 32 248 C 44 258, 60 248, 60 234
           C 60 224, 50 218, 44 224 C 40 228, 43 236, 48 235"
      />
      {/* peacock body and crest */}
      <path
        className="el-relief"
        d="M112 254 C 100 254, 92 246, 94 234 C 96 224, 110 220, 118 228 C 124 234, 122 246, 116 250 Z"
      />
      <path className="el-line" d="M100 226 C 96 218, 99 212, 105 212" />
      {/* tail fan */}
      <path
        className="el-relief"
        d="M118 230 C 138 222, 158 232, 160 248 C 161 258, 150 264, 140 259
           C 128 253, 119 242, 118 230 Z"
      />
      <g className="el-line">
        <path d="M124 236 C 136 234, 148 240, 152 250" />
        <path d="M122 244 C 132 244, 142 249, 146 256" />
      </g>

      {/* ── Foot ──────────────────────────────────────────────────── */}
      <path className="el-wood" d="M8 262 L 192 262 L 122 316 L 78 316 Z" />
      <rect x="8" y="262" width="184" height="5" className="el-dark" />
      <g className="el-bead">
        {Array.from({ length: 19 }).map((_, i) => (
          <circle key={i} cx={22 + i * 8.6} cy="275" r="2" />
        ))}
      </g>
      <path className="el-line" d="M44 292 L 156 292" />
    </svg>
  );
}
