# Portfolio direction — landing page + My Work rebuild

Read `SANJANA_DESIGN.md` first. This document does not replace it; it applies it to this site
and fixes where the current build contradicts it.

---

## 0. The one-line diagnosis

The site is a **room** rendered as **flat vector** but operated as a **dashboard**.

Three failures, in order of severity:

1. **Labeled where it should be legible.** Every object has a caption explaining that it's clickable.
2. **Flat where it should be material.** The reference is carved rosewood; the build is a two-tone brown blob.
3. **Scattered where it should be composed.** The intended composition already exists (`portfolio.png`). The build blew it apart.

Story and Statements work. Landing and My Work do not. The difference is that Story and Statements
follow a pattern — *dimmed room + one artifact panel + centered content* — and the other two invented
their own layout language. **That pattern is the system. Everything conforms to it.**

---

## 1. Kill list — delete these strings, do not replace them

| String | Why it dies |
|---|---|
| `PHOTOGRAPHS OPEN THE STORY · LETTERS OPEN WHAT PEOPLE SAID` | Instructional scaffolding. A room does not label its furniture. |
| `ASK ME ANYTHING` (eyebrow above the panel) | The panel is visibly a conversation. The label is redundant. |
| `Ask me` (floating over the illustration) | Same. |
| `CLOSE` (footer, landing page) | Nothing is open. |
| The terminal/code icon badge, bottom-left | This is the literal "vibe-coded" tell. |
| `🌾 STATEMENTS` above the `Statements` H1 | Eyebrow repeats the H1 verbatim. Same for `STORY`. |

**The rule going forward:** affordance is communicated by craft, never by caption. If an object needs a
label to look clickable, the object is badly drawn — fix the object.

Replacement affordance system, applied to every interactive object in the room:

```css
/* rest */
transform: translateY(0);
filter: drop-shadow(0 2px 6px rgba(34,27,22,0.10));
transition: all 300ms cubic-bezier(.2,.8,.2,1);

/* hover */
transform: translateY(-4px);
filter: drop-shadow(0 10px 24px rgba(34,27,22,0.18));
cursor: pointer;
```

Plus: on first visit only, the three primary objects perform one 600ms settle (translateY 6px → 0,
staggered 140ms) after the room fades in. Gate it in state. Never replays. This is the entire
onboarding — it is not a tooltip, a tour, or a caption.

---

## 2. Material language — from `elephant_wall_art.webp`

**The goal is not photorealism.** The room is flat vector and stays flat vector. What the reference
supplies is *specificity* — the actual shape of a Chettinad bracket — not rendering fidelity.

The distinction matters because it's the difference between an illustration that feels inhabited and a
3D render pasted into a flat room. `portfolio.png` already feels real, and it does so through specific
detail: the jasmine strand, the banana-leaf festival kolam, airmail borders on the postcards. None of
that is rendered. All of it is *particular*.

**The current bracket's problem is silhouette, not shading.** It is a plain rectangle with an elephant
inside it. A real bracket has a scalloped lotus-petal cornice, a peacock scroll at the base, and a
turned pendant finial hanging off the corner. Fix the outline first — that alone does most of the work.

**Then three tones, not four:**

```
--wood-lit    #A9663F   /* faces catching light from upper-left */
--wood-mid    #8A4F30   /* the body of the form */
--wood-deep   #5E3220   /* relief channels and undercuts */
```

Two or three narrow `--wood-deep` shapes where the carving goes deepest. Not a gradient, not a
bevel, not a drop shadow inside the form. Flat shapes.

Light comes from the **upper left**, consistently, on every object in the room. Consistency of
direction is what sells it — not tonal range.

**Brass** (bells, finials, the urli, the Ganesha): two values only — warm gold `#C9A227` and a
green-black `#3D3A22` in the turned grooves. Same discipline.

**Textile:** the cream silk ground `#EDE4C8` with the blue-and-gold zari border as a narrow accent
band. You already use this band as the header strip on the photo wall — that's correct, keep it, and
make it the only place that blue appears.

**Saturated accents, whole site:** marigold orange and jasmine white. Nothing else. Both come from
the reference image, both already appear in the illustration.

**Contact shadows are mandatory.** Every object sits on or hangs from something. A shape floating with
no shadow is the thing that reads as vector clip-art.

---

## 3. Where the build contradicts `SANJANA_DESIGN.md`

Cite these when fixing. These are your rules, not new ones.

| Current build | Your rule |
|---|---|
| My Work hero is a large dark-gray gradient box | §3: *"Background: Always warm off-white. Never pure white, never dark gray."* |
| My Work tab bar: filled magenta container on active tab | §6: *"Active = weight + accent color. Not containers, not pills, not dots."* |
| Tab bar is the loudest element on the page | §6: *"Navigation should feel invisible. It should not compete with content."* |
| Two `show model design thinking` chips, one solid magenta, one pale pink | §5: *"Transparent at rest, filled on hover — a translucent fill at rest looks broken."* Also a render bug: two states mounting at once. |
| `LEAD DESIGNER · CHASE MYHOME` eyebrow in accent color | §4: eyebrow color is `--ink-3`, *"always muted."* |
| Kolam bleeds outside the phone-mockup frame | §7: imagery cards are `overflow: hidden`. |
| Magenta kolam at large scale + magenta tab + magenta chips | §2: accent ≈ 10% of visual weight. You're at ~35%. |
| My Work body set in a geometric sans not used anywhere else | Two families, total, site-wide. |
| Right-hand panel is a flat gray fill, no border, no radius | §7: white surface, semi-transparent hairline border, 28–32px radius. |
| Blue focus ring around the illustration | Browser default leaking. `:focus-visible` only, ring in `--wood-deep`. |

**Type lock — two families, no exceptions:**
- Display serif — `Sanjana`, section H1s, pull-quotes. Already correct in Story/Statements.
- Body/utility sans — everything else, including eyebrows (uppercase, `0.14–0.18em`, `--ink-3`).

Delete the third family from My Work. Delete the mono unless it is doing typewriter output in the Ask
panel, where §4 says mono is correct because it signals machine voice.

---

## 4. Landing page — rebuild toward `portfolio.png`

You already designed this. The illustration *is* the spec. The build is a degraded scatter of it.

**Composition:** one continuous room, full-bleed, no floating viewport-pinned panels. Window and
garden left, wall and kolam center, shelf upper-right, photo wall right, desk and Sanjana lower-center-right.

**The objects are the navigation. There is no nav bar.**

| Object | Goes to |
|---|---|
| Framed screens on the wall | My Work |
| Photo wall / polaroids | Story |
| Postcards + letters | Statements |
| Sanjana at the desk | Ask me |
| Shelf, Ganesha, brass elephant | Résumé (the rolled scroll under the shelf) |

**Specific bugs to close:**

1. Blue focus ring on the illustration container — `tabIndex` with default outline. Scope to `:focus-visible`, restyle.
2. Duplicate chip render — active and hover states both mounting. Likely a key collision in the map, or active state not being exclusive.
3. Sanjana is a separate floating layer at bottom-center with wrong z-index. Composite her into the room, at the desk, as drawn.
4. Photo wall overflows the right viewport edge and clips. Contain it in the room's coordinate space.
5. Ask panel bleeds past the left edge, over the window frame. It should not be a viewport-pinned panel at all — see below.
6. Two different kolams are in play. Assign roles and hold them: the colorful festival kolam is **wall art, in-scene, illustrative**; the pink sikku kolam is the **brand mark** and appears at small scale in corners and as the loading motif. It never appears at 900px over a phone mockup.

**The Ask panel:** it is a physical thing in the room — the open notebook on the desk, or a sheet of
ledger paper. It opens *in place* with the room dimming behind it, exactly like Story and Statements
already do. Per §7, the input floats naked: no wrapper box, no outer container, just the rule beneath it.

---

## 5. My Work — kill the tab bar

Eight equally-weighted tabs is a filing cabinet, not a portfolio. It's also the single most
un-branded element on the site.

**Reuse the Statements pattern, which already works:**

```
┌─────────────────────┬──────────────────────────────────────┐
│  ledger-paper panel │   the selected work, centered         │
│                     │                                       │
│  MY WORK            │   LEAD DESIGNER · CHASE MYHOME        │
│  ─────────          │   (eyebrow, muted, not accent)         │
│                     │                                       │
│  · RecSys        ●  │   Intent-based                        │
│  · Speech-to-Text   │   recommendations                     │
│  · Casey            │                                       │
│  · AI Search        │   [the artifact — phones, screens,    │
│  · Service Design   │    at true scale, on warm off-white,  │
│  · B2C              │    with a real contact shadow]        │
│  · Exec Pitch       │                                       │
│  · Travel           │   Years of customer data, but data    │
│                     │   alone couldn't answer…              │
│                     │                                       │
└─────────────────────┴──────────────────────────────────────┘
        the room, dimmed to ~8% opacity, behind all of it
```

Active item: accent color + weight. No pill, no container, no filled dot. Selection transitions by
**dissolve** (§10: *"same place, different content"*), 300ms, `cubic-bezier(.2,.8,.2,1)`.

**Delete the dark gradient box.** The work sits on warm off-white with a real shadow. Your rule §8:
imagery is part of the product; minimal overlay; let it breathe. A dark rectangle behind three phones
is a placeholder that survived to production.

**Ordering encodes something.** Don't alphabetize and don't preserve the current arbitrary order — lead
with the work that argues hardest for the role you're interviewing for. Order is information (per your
own §6 on nav being content-driven).

---

## 6. Sanjana typing — the animation

This does double duty: it replaces the deleted `ASK ME ANYTHING` label. **The motion is the affordance.**
A person visibly working is the only invitation the object needs.

**Build it as animated SVG/CSS, not video.** Reasons, in order:

- Your `SANJANA_DESIGN.md` §10 forbids *"infinite loops without communicating anything."* A video loop
  of a girl typing is exactly that. An SVG lets you make the motion **irregular** — she types, pauses,
  draws a stroke, rests — which reads as a person rather than a GIF.
- The room is flat vector with a specific palette. Generated video will drift off-palette and off-style
  within a second, and the seam where it meets the illustration will be visible.
- ~25KB vs several MB, on a portfolio recruiters open on mobile.
- It respects `prefers-reduced-motion` cleanly by freezing to the rest pose.

**Layers to separate in the SVG export:**

1. Right forearm + hand on the trackpad — 3–4px translate, 8 keyframes, irregular timing
2. Left hand + stylus on the iPad — draws one short stroke, lifts, rests
3. The stroke itself on the iPad screen — `stroke-dasharray` reveal, then fades after ~2s
4. Jasmine strand in her hair — 1.5° rotation, slow, offset phase from the hands
5. Laptop screen content — content shifts once every ~12s

Total cycle 14–18s with three distinct rest points, so it never reads as a loop.

---

## 7. Where Higgsfield actually earns its place

Not for the girl, and not for rendering. For **silhouette reference** — what a real bracket's profile
actually looks like, where the peacock scroll sits relative to the elephant, how the finial hangs.

Generate these as *reference plates* and trace the contour. Do not sample them for tone; three flat
values per §2 is the ceiling. The plate answers "what shape is this thing," not "how should it be lit."

**Prompt A — the bracket:**
> Single South Indian carved rosewood temple bracket, three-quarter view, caparisoned elephant in deep
> relief, lotus-petal cornice above, peacock scroll below, brass finial pendant. Warm reddish-brown wood,
> visible grain. Raking light from upper left cutting deep shadow into the relief channels. Isolated on
> flat warm cream background, soft contact shadow, no props, sharp focus, product photography.

**Prompt B — brass study:** brass temple bells and a lamp urli, warm gold on lit faces, green-black
patina in the recesses, same upper-left light, cream ground.

**Prompt C — textile ground:** cream silk with a blue-and-gold zari border, flat overhead, even light.

**Never composite the renders into the room.** Photoreal assets in a flat vector scene read as a
collage accident, not a choice. The plates die once the SVG exists.

---

## 8. Definition of done

- [ ] Zero instructional labels anywhere on the site
- [ ] Two type families, site-wide
- [ ] No dark-gray or pure-white surfaces; all backgrounds warm off-white
- [ ] Accent color under ~10% of visual weight on every screen
- [ ] Every object in the room has a contact shadow and upper-left lighting
- [ ] All four pages use the *dimmed room + artifact panel* pattern
- [ ] Nothing overflows the viewport; no stray focus rings; no duplicate state renders
- [ ] `prefers-reduced-motion` freezes the typing loop
- [ ] Passes on mobile: 20px min padding, single column, no side-by-side below 760px
