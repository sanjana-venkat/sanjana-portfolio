---
name: sanjana-design
description: >
  Sanjana Venkat's design principles, vocabulary, and rules. Read before any UI/frontend
  task. This is not a component library — it's a set of principles and a shared vocabulary
  so Sanjana doesn't have to re-explain the same corrections every project. When Sanjana
  says "frosted glass", "bento grid", "dynamic loading state", "icon button", or any other
  shorthand, this file defines exactly what she means. Apply these rules proactively —
  don't wait to be corrected.
---

# Sanjana's Design Principles & Vocabulary

---

## 1. Philosophy

**Design for confidence, not decoration.**

The interface should feel intentional, premium, calm, and curated. Every element should appear necessary. The goal is never "AI product" or "tech product" — it's a beautiful product that happens to use technology.

Users should feel like they are interacting with a premium consumer product, not a prototype, dashboard, or prompt wrapper.

**Keywords that should describe every product:**
Premium · Calm · Intentional · Editorial · Sophisticated · Minimal · Human · Confident

**Keywords that should never describe a product:**
Futuristic · Neon · Cyberpunk · Gamified · Dashboard-like · Startup-y · Vibe-coded

**The success metric:**
The interface should feel like something someone would happily pay for even if the AI or tech were removed entirely.

---

## 2. Visual hierarchy rule

**Typography creates hierarchy before color does.**

Use size, weight, and spacing to establish hierarchy first. Only reach for color when type hierarchy alone isn't enough.

- White and near-black should represent ~90% of the visual weight
- Accent color should be ~10% — highlights, active states, key moments
- If the accent color is appearing everywhere, reduce it
- Large colored headlines = wrong. Use scale and weight instead.
- No gradients on text. No glow. No excessive tracking on display text.

---

## 3. Color rules

**Background:** Always warm off-white. Never pure white, never dark gray, never blue-tinted.
Examples: `#F5F3EE`, `#F2F0EA`, `#ECEAE3`, `#F8F7F6`
The canvas should feel soft and premium.

**Text:** Near-black, not pure black. `#080808`, `#221B16` — just off pure black.

**Accent:** One brand color. Used sparingly:
- Selected/active states
- Small highlights
- Key emotional moments
- Metadata, ratings, progress

Never: large accent headlines, entire sections in accent, accent everywhere.

**Avoid:** Neon, teal as a generic accent, excessive gradients, heavy glassmorphism everywhere.

---

## 4. Vocabulary — what Sanjana means when she says...

### "Frosted glass"
A translucent panel that lets background content show through with a blur.
```css
background: rgba(8, 8, 8, 0.38);
backdrop-filter: blur(22px) saturate(1.6);
-webkit-backdrop-filter: blur(22px) saturate(1.6);
border-top: 1px solid rgba(255,255,255,0.10);
```
- Used over images, for overlaid content panels, result/hero screens
- ALWAYS include both `backdrop-filter` AND `-webkit-backdrop-filter` — Safari requires the prefixed version
- Tint opacity depends on what's behind it — just enough to read text, not so much the image disappears
- The hairline border at the top separates the glass from the image behind it
- Not to be used on every card — only where content sits on top of imagery

### "Bento grid"
An asymmetric mosaic card layout — like a Japanese bento box where compartments are different sizes.
```
┌─────────────┬───────┐
│  wide card  │ small │
│             ├───────┤
├──────┬──────┤ small │
│small │small │       │
└──────┴──────┴───────┘
```
- Cards have different `grid-column` and `grid-row` spans — NOT a uniform equal grid
- Mix of tall, wide, and square cards in the same layout
- Each card is self-contained with its own visual hierarchy
- **On mobile: always collapses to single column, stacked by importance — no bento on small screens**
- The bento is a desktop/tablet pattern only

### "Bento on mobile → modal"
When a bento grid contains an interactive/expandable element (like a chat window, a detail panel, or a complex card):
- On desktop: the element lives inside its bento cell
- On mobile: tapping that element opens it as a **full-screen modal** (`position: fixed; inset: 0`)
- A floating action button (FAB) in the bottom-right corner triggers the modal
- The modal has a fixed header, scrollable content area, and optionally a fixed footer bar
- This is the canonical mobile pattern from the portfolio: chat lives in bento on desktop → becomes full-screen modal on mobile with fixed pill bar at bottom

### "Dynamic loading state"
NOT a spinner. A multi-stage narrative sequence that shows what the system is actually doing.
- Each stage is a distinct visual that represents a real step (pulling profile, processing mood, scanning places, assembling itinerary)
- Stages dissolve into each other via opacity — not slide, not pop
- Alongside the visual: a checklist/progress list where items illuminate as they complete
- A thin progress bar tracks overall completion
- The final stage (wireframe/skeleton of the result) holds until real content arrives
- The experience should feel like the system is thinking and working — not just waiting
- Never use: spinning circles, floating particles, constellation animations, "AI is thinking" visuals
- Instead show: content being considered, cards moving, routes drawing, content assembling

### "Icon button" / "icon circle"
An action represented by an icon, with or without a visible container.

**With container** (when part of an action group or has a label):
```css
width: 40–72px; height: 40–72px;
background: transparent;       /* no fill at rest */
border: 1px solid var(--line); /* subtle border only */
border-radius: 999px (circle) or 20px (rounded square);
display: flex; align-items: center; justify-content: center;
```

**Without container** (inline, standalone, in nav):
- Just the SVG. No box, no background, no border.
- Hover: color change only

**Universal icon centering rule:**
Icons are ALWAYS centered with flexbox:
```css
display: flex;
align-items: center;
justify-content: center;
```
Never use padding to fake centering. Never use absolute positioning.
Icon SVG should be 40–60% of the container's size.

### "Hamburger"
Three horizontal lines. Nothing else.
```css
button { background: transparent; border: none; padding: 0; }
span   { display: block; width: 18px; height: 1.5px; background: currentColor; }
```
- NO border around the button. NO background. NO rounded square container.
- Just the three lines.
- On open: top line rotates +45°, middle fades out, bottom rotates -45° → becomes ×
- On tap → opens LEFT SIDEBAR DRAWER (see below)

### "Sidebar drawer"
The mobile navigation panel. Always slides in from the LEFT.
```
Position: fixed, full height, left edge
Width: min(280px, 80vw)
Animation: translateX(-100%) → translateX(0), ~280ms
Backdrop: dark semi-transparent overlay on the right, closes on tap
Structure:
  ↳ Header: logo + wordmark + close × button
  ↳ Nav items: fill the middle
  ↳ Primary CTA: pinned to bottom (margin-top: auto + border-top)
```
- Close × button is a small rounded square with border — unlike hamburger, it has a container
- Nav item states: default (muted) → hover (surface fill) → active (accent color + tinted bg) → done (filled dot)
- NEVER: top dropdown, right drawer, bottom sheet for navigation

### "Pill" / "chip"
Rounded-full button for filters, selections, or topic navigation.
```css
border-radius: 999px;
border: 1px solid var(--line);
background: white;
padding: 6–8px 14–20px;
font-size: 12–14px; font-weight: 500–700;
```
- Active: border + text switches to accent color
- Hover: slight scale(1.02–1.04) or border darkens
- Pill groups: always `justify-content: flex-start` — never centered
- Mobile scrollable pill rows: `overflow-x: auto; flex-wrap: nowrap` + hide scrollbar

### "Eyebrow" / "label"
Small uppercase metadata text above headings or sections.
```css
font-size: 11–12px;
font-weight: 600–700;
letter-spacing: 0.14–0.18em;
text-transform: uppercase;
color: var(--ink-3); /* always muted */
```
Always UPPERCASE + tracked. Never title case.

### "Typewriter"
AI/conversational output rendered character by character.
- 15ms per character, 350ms start delay
- Monospace font — signals machine/AI thinking voice
- Blinking cursor `|` in accent color while in progress
- After complete → next UI elements animate in (pills, CTAs, follow-up content)
- Guard: if text is already typed, skip animation — don't restart on re-render

### "Shimmer" / "skeleton"
Content placeholder while data loads.
```css
background: linear-gradient(90deg, var(--surface-2) 25%, var(--surface-3) 50%, var(--surface-2) 75%);
background-size: 200% 100%;
animation: shimmer 1.4s ease-in-out infinite;
```
- Shows the shape of the incoming content — not a generic gray rectangle
- Border-radius matches the real element
- Used as the final stage of a dynamic loading state

---

## 5. Button rules

### The four levels
1. **Primary** — filled near-black, white text, pill. One per screen maximum.
2. **Secondary / outline** — transparent, border, pill. Multiple allowed.
3. **Icon button** — transparent, border (or naked), icon centered.
4. **Ghost** — no background, no border, text with hover color/underline.

### Rules that always apply
- **Transparent at rest, filled on hover** — a button with a dimmed/translucent fill at rest looks broken or disabled. At idle, buttons are either fully filled (primary) or fully transparent (secondary).
- **Active state = hover state visually** — selected/active pills and buttons look the same as their hover state.
- **Disabled**: `opacity: 0.35` on the whole element. Not a washed-out background.
- Never stack multiple full-width black CTAs vertically.
- Buttons look tappable even in a static screenshot.
- Primary buttons: inspired by Apple, Nothing, modern Google hardware — solid, confident, no effects.
- Avoid: glass buttons, glow effects, neon borders, gradient fills on buttons.

### Loading state on buttons
```
idle    → normal
loading → spinner replaces icon, label changes ("Saving…"), slight opacity
done    → checkmark icon, accent color, 2.5s then resets to idle
error   → warning icon, red/error color, 2.5s then resets to idle
```
Spinner = rotating SVG with `stroke-dasharray`, not CSS border trick.

---

## 6. Navigation rules

Navigation should feel invisible. It should not compete with content.

**Desktop nav:**
- Step labels or section names, plain text
- Active = weight + accent color. Not containers, not pills, not dots.
- Subtle — the nav should not be the first thing you notice

**Mobile nav:**
- Hamburger (LEFT) + primary action button (RIGHT), nothing else in the bar
- Hamburger: naked lines, no container
- Opening: left sidebar drawer

**What to avoid in nav:**
- Step indicator dots or filled circles
- Heavy pill/button treatment on nav items
- Excessive states and decorations

---

## 7. Cards & surfaces

**Cards should be clear surfaces — structure comes from the card itself, not from effects.**

```css
background: white;
border: 1px solid var(--line);  /* soft, semi-transparent */
border-radius: 28–32px;
padding: 24–32px;
transition: all 300ms;
hover: translateY(-4px); /* subtle lift — every clickable card lifts */
```

- Avoid: heavy shadows, multiple gradients, glass effects on standard cards
- Preferred: soft border, large radius, clean white surface
- The border is always rgba semi-transparent — never a solid black line
- Imagery cards: `overflow: hidden`, image fills the card, scale on hover
- Portrait images: grayscale at rest → color on hover is a nice touch

**Inputs as surfaces:**
- Do not wrap inputs in another container
- The input field IS the component — it floats naturally
- No outer wrapper box

---

## 8. Imagery

Images are part of the product — not decoration.

- Use iconic, specific photography — images that immediately communicate place, mood, or context
- Avoid generic stock imagery
- Avoid: heavy overlays that obscure the image, dark tints that kill vibrancy
- Use only enough overlay to keep text readable — the image should still feel alive
- Result/detail screens: image is the hero — let it breathe

---

## 9. AI & motion principles

**Never visualize AI with:**
- Constellation animations
- Neural network graphics
- Spinning abstract loaders
- Floating particles
- "AI is thinking" text

**Instead, show what's actually happening:**
- Content being considered
- Cards moving and sorting
- A route drawing itself
- An itinerary assembling
- Real places appearing

Every animation should explain a step — not signal that something vague is occurring.

---

## 10. Animation principles

### Always include
- Page transitions: fade + translateY(8px → 0), 0.3s
- Card hover: translateY(-4px) lift
- Image hover: scale(1.025–1.035), clipped by parent overflow hidden
- Modal entrance: fade + translateY(18px) + scale(0.98) → normal
- Staggered reveals: 100–150ms delay between sequential elements

### The ease function
Always: `cubic-bezier(.2,.8,.2,1)` — fast in, gentle out. Store as `--ease` var.
Never: bare `ease`, `ease-in-out`, `linear` for UI motion.

### What motion communicates
- Fade up from below → content appearing or loading
- Scale from slightly small → element arriving from distance (modals)
- Lift on hover → this is interactive
- Dissolve → same place, different content (carousels, stage transitions)
- Slide from left → navigation, going somewhere
- Typewriter → thinking, generating in real time

### Never
- Animate `width` or `height` — use `transform: scale()`
- `will-change` on everything — only on elements doing slow background zoom
- Animations that replay on every re-render — gate with state
- Infinite loops without communicating anything (spinning for the sake of it)
- Random movement with no meaning

---

## 11. Copy rules

**Speak like a thoughtful human designer. Never expose technical internals.**

| Context | Good | Bad |
|---------|------|-----|
| Error | "We're having trouble finding the right fit." | "Fallback failed" |
| Loading | "Building your itinerary." | "Retry request" |
| Empty state | "Nothing yet. Pick a mood to start." | "No results found" |
| Feature limit | "We don't have your trip history yet — so we need to ask." | "API access not granted" |
| Button | "Build itinerary" | "Generate personalized AI itinerary plan" |
| Success | "Added!" | "Operation completed successfully" |

- Short over long. Every word earns its place.
- First person where appropriate — not corporate third person
- Specific over vague — name the thing, the outcome, the decision
- Dry wit over enthusiasm — confidence, not exclamation marks
- Headlines: simple, direct, human. "Today feels different." Not "Hyper-Personalized Experience Layer."

---

## 12. Mobile-specific rules

- **20px horizontal padding minimum** on every container — nothing touches the screen edge ever
- Single column on mobile — no side-by-side elements below 760px (except small chips)
- Full-screen modals, not centered popups: `position: fixed; inset: 0`
- Hero/detail screens: `min-height: calc(100svh - 68px)`, `border-radius: 0` — true edge-to-edge
- Long text: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` — never word-break
- Date inputs: `min-width: 0; appearance: none; -webkit-appearance: none`
- Scrollable rows: `overflow-x: auto; flex-wrap: nowrap` + visually hide scrollbar
- Bento grid → single stacked column on mobile, important items first
- Complex interactive bento cells → full-screen modal on mobile (FAB triggers it)

---

## 13. What NOT to do — quick reference

| Don't | Do instead |
|-------|-----------|
| Translucent/dimmed button fill at rest | Fully transparent + full fill on hover |
| Word-break on long text | `text-overflow: ellipsis` |
| Hamburger in a bordered rounded box | Naked lines, no container |
| Top dropdown for mobile nav | Left sidebar drawer |
| Buttons touching screen edges | 20px padding on parent |
| `padding: 0 !important` on desktop | Remove `!important` so mobile can override |
| Centered chip groups | `justify-content: flex-start` |
| Multiple stacked full-width CTAs | One primary + icon buttons |
| CSS border-spinner | SVG with `stroke-dasharray` |
| Frosted glass without `-webkit-` prefix | Always both prefixes |
| Animating `width`/`height` | `transform: scale()` |
| Fixed px on headlines | `clamp(min, preferred, max)` |
| Date input without reset | `appearance: none; min-width: 0` |
| Padding to center icons | `display: flex; align-items: center; justify-content: center` |
| Constellation / particle AI visuals | Show real content being assembled |
| Teal / neon as accent | One warm, restrained brand color |
| Heavy dark overlay on photography | Minimal overlay, image stays vibrant |
| Generic stock imagery | Specific, iconic, place-communicating photos |
