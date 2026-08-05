/*
 * Kolam geometry.
 *
 * The landing page is built on a 9 x 9 dot grid (a sikku kolam) plus a family of
 * S-shaped loops that weave around the dots. Everything below is expressed in
 * "grid units": a dot sits at integer (column, row) with 0 <= c, r <= 8, so one
 * unit is exactly one dot spacing. The SVG viewBox is padded so the loops that
 * overhang the outer dots are never clipped.
 */

export const GRID_N = 9;
const MAX = GRID_N - 1; // 8
const PAD = 1.2;

export const VIEW_BOX = `${-PAD} ${-PAD} ${MAX + PAD * 2} ${MAX + PAD * 2}`;

const round = (value) => Math.round(value * 1000) / 1000;

/* ── Dots ──────────────────────────────────────────────────────────────── */

const CENTER = MAX / 2;

export const DOTS = (() => {
  const dots = [];
  for (let r = 0; r < GRID_N; r += 1) {
    for (let c = 0; c < GRID_N; c += 1) {
      // Chebyshev ring from the middle dot drives the radial reveal order.
      const ring = Math.max(Math.abs(c - CENTER), Math.abs(r - CENTER));
      dots.push({ c, r, ring });
    }
  }
  return dots;
})();

/* ── The S ─────────────────────────────────────────────────────────────── */

/**
 * A single kolam "S": two loops stacked around a pair of dots that sit at
 * (0, -h) and (0, +h), joined by one continuous crossing through the middle.
 * The upper loop wraps the top dot counter-clockwise, the line crosses the
 * centre, and the lower loop wraps the bottom dot the other way — which is
 * both how the loop is drawn by hand and, at a glance, the letter S.
 */
export function sPath(h, r) {
  const p = [
    ["M", 0.85 * r, -(h + 0.62 * r)],
    ["C", 0.25 * r, -(h + 1.05 * r), -1.0 * r, -(h + 0.78 * r), -1.0 * r, -h],
    ["C", -1.0 * r, -(h - 0.78 * r), -0.22 * r, -0.34 * h, 0, 0],
    ["C", 0.22 * r, 0.34 * h, 1.0 * r, h - 0.78 * r, 1.0 * r, h],
    ["C", 1.0 * r, h + 0.78 * r, 0.25 * r, h + 1.05 * r, -0.85 * r, h + 0.62 * r],
  ];
  return p.map(([cmd, ...nums]) => `${cmd} ${nums.map(round).join(" ")}`).join(" ");
}

/**
 * The hero S: the one that is drawn during the intro, then detaches from the
 * grid and becomes the first letter of "Sanjana". Its upper loop wraps the dot
 * at (6, 2) — top-right of the grid — and its lower loop wraps (6, 4), the
 * middle-right, exactly as the loop is drawn by hand.
 */
const HERO_H = 1;
const HERO_R = 0.92;
const HERO_CX = 6;
const HERO_CY = 3;

export const HERO_S = {
  d: sPath(HERO_H, HERO_R),
  cx: HERO_CX,
  cy: HERO_CY,
  transform: `translate(${HERO_CX} ${HERO_CY})`,
  // Padded bounding box in grid units, used to give the flying overlay a tight viewBox.
  box: {
    x: HERO_CX - HERO_R * 1.08,
    y: HERO_CY - (HERO_H + HERO_R),
    w: HERO_R * 2.16,
    h: (HERO_H + HERO_R) * 2,
  },
};

/* ── The woven field ───────────────────────────────────────────────────── */

/* ── The continuous ribbon ─────────────────────────────────────────────── */

/**
 * The rest of the kolam is one line, not a collection of shapes.
 *
 * It walks a route through the grid and throws a loop around every dot it
 * meets, alternating which side the loop falls on. The connector from one
 * loop to the next therefore has to cross back over the line it just left —
 * and those crossings are the whole point of a sikku kolam. Drawn as arcs of a
 * circle centred on each dot, so every loop is round and the same size.
 */

const LOBE_R = 0.62;
const LOBE_SWEEP = 300; // degrees of wrap; the missing 60 is where it crosses
const LOBE_STEPS = 4;
// Control-point length for a cubic that approximates an arc of this width.
const K = (4 / 3) * Math.tan((((LOBE_SWEEP / LOBE_STEPS) * Math.PI) / 180) / 4);

const rad = (deg) => (deg * Math.PI) / 180;
const onCircle = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))];
// Unit tangent at an angle, for a sweep in the given direction.
const tangent = (deg, dir) => [-dir * Math.sin(rad(deg)), dir * Math.cos(rad(deg))];

const unit = ([x, y]) => {
  const length = Math.hypot(x, y) || 1;
  return [x / length, y / length];
};

/** The route: a serpentine over every other dot, inset one ring from the edge. */
const ROUTE = (() => {
  const points = [];
  for (let i = 0; i < 4; i += 1) {
    const r = 1 + i * 2;
    const cols = [1, 3, 5, 7];
    (i % 2 === 0 ? cols : [...cols].reverse()).forEach((c) => points.push([c, r]));
  }
  return points;
})();

/**
 * One entry per dot on the route: the loop around it plus the connector that
 * carries the line on to the next one. Rendering them in order reproduces a
 * single unbroken stroke, which is how the stages can extend the same line.
 */
/**
 * Where the line touches a given dot: the angle it comes in at, the angle it
 * leaves at, and which way it wraps. The exit is chosen so its tangent points
 * straight along the direction of travel — otherwise the line doubles back on
 * itself between loops and the whole thing turns into scribble.
 */
function lobeAt(index) {
  const point = ROUTE[index];
  const previous = ROUTE[index - 1] || point;
  const next = ROUTE[index + 1] || point;

  const inDir =
    index === 0
      ? unit([next[0] - point[0], next[1] - point[1]])
      : unit([point[0] - previous[0], point[1] - previous[1]]);
  const outDir =
    index === ROUTE.length - 1 ? inDir : unit([next[0] - point[0], next[1] - point[1]]);
  const axis = unit([inDir[0] + outDir[0], inDir[1] + outDir[1]]);
  const heading = (Math.atan2(axis[1], axis[0]) * 180) / Math.PI;

  // Consecutive loops wrap opposite ways, so the line has to cross itself on
  // the way between them — that crossing is what makes this a knot.
  const dir = index % 2 === 0 ? 1 : -1;
  return { point, dir, entry: heading - dir * 30, exit: heading - dir * 90 };
}

/**
 * One entry per dot on the route: the loop around it plus the connector that
 * carries the line on to the next one. Rendering them in order reproduces a
 * single unbroken stroke, which is how the stages can extend the same line.
 */
export const RIBBON = ROUTE.map((point, index) => {
  const [px, py] = point;
  const { dir, entry } = lobeAt(index);
  const step = (LOBE_SWEEP / LOBE_STEPS) * dir;
  const c = K * LOBE_R;

  let d = "";
  for (let s = 0; s < LOBE_STEPS; s += 1) {
    const a0 = entry + s * step;
    const a1 = a0 + step;
    const [x0, y0] = onCircle(px, py, LOBE_R, a0);
    const [x1, y1] = onCircle(px, py, LOBE_R, a1);
    const [t0x, t0y] = tangent(a0, dir);
    const [t1x, t1y] = tangent(a1, dir);
    if (s === 0) d += `M ${round(x0)} ${round(y0)} `;
    d += `C ${round(x0 + t0x * c)} ${round(y0 + t0y * c)} ${round(x1 - t1x * c)} ${round(
      y1 - t1y * c
    )} ${round(x1)} ${round(y1)} `;
  }

  // Connector: leave along the tangent this loop ends on, arrive along the one
  // the next loop starts on, so the joins are invisible.
  if (index < ROUTE.length - 1) {
    const { exit } = lobeAt(index);
    const [ex, ey] = onCircle(px, py, LOBE_R, exit);
    const [etx, ety] = tangent(exit, dir);

    const nextLobe = lobeAt(index + 1);
    const [sx, sy] = onCircle(
      nextLobe.point[0],
      nextLobe.point[1],
      LOBE_R,
      nextLobe.entry
    );
    const [stx, sty] = tangent(nextLobe.entry, nextLobe.dir);

    const reach = Math.hypot(sx - ex, sy - ey) * 0.3;
    d += `C ${round(ex + etx * reach)} ${round(ey + ety * reach)} ${round(sx - stx * reach)} ${round(
      sy - sty * reach
    )} ${round(sx)} ${round(sy)} `;
  }

  return {
    id: `lobe-${index}`,
    d: d.trim(),
    // Three roughly equal stretches, one added per stage after the first.
    group: Math.min(3, Math.floor(index / Math.ceil(ROUTE.length / 3)) + 1),
    order: index,
  };
});

export const FIELD = RIBBON;

export const FIELD_BY_GROUP = [1, 2, 3].map((group) =>
  FIELD.filter((loop) => loop.group === group)
);

/* ── Screen mapping ────────────────────────────────────────────────────── */

const VIEW_SIZE = MAX + PAD * 2;

/**
 * Where the hero S currently sits on screen, in viewport pixels. The kolam SVG
 * fills a square container and its viewBox is square, so the mapping is exact —
 * no getBBox() needed, which keeps this stable while the grid is mid-transition.
 */
export function heroScreenRect(containerEl) {
  if (!containerEl) return null;
  const rect = containerEl.getBoundingClientRect();
  if (!rect.width) return null;
  const scale = rect.width / VIEW_SIZE;
  return {
    left: rect.left + (HERO_S.box.x + PAD) * scale,
    top: rect.top + (HERO_S.box.y + PAD) * scale,
    width: HERO_S.box.w * scale,
    height: HERO_S.box.h * scale,
  };
}

export const HERO_VIEW_BOX = `${round(HERO_S.box.x)} ${round(HERO_S.box.y)} ${round(
  HERO_S.box.w
)} ${round(HERO_S.box.h)}`;
