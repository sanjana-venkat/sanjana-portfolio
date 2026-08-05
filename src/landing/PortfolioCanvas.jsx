import { useCallback, useEffect, useRef, useState } from "react";
import KolamMark from "./KolamMark";
import { Sanjana, Snippets, Statements, Story } from "./sections";
import { INTRO, SECTIONS, SELECTED_WORK, STORY_MOMENTS } from "./landingData";
import { useMediaQuery, usePrefersReducedMotion } from "./useMediaQuery";
import "./landing.css";

const SESSION_KEY = "sv-kolam-drawn";
const DRAW_MS = 400 + 3 * 620 + 900;

/**
 * The portfolio.
 *
 * The kolam holds the centre of the viewport at all times and is the only
 * navigation: hovering a quarter lights it and its label, clicking one opens
 * that section beside it. Sections open in any order and close back to rest —
 * there is no sequence to sit through.
 */
export default function PortfolioCanvas({ chat, onOpenProject }) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 860px)");
  const alreadyDrawn =
    typeof window !== "undefined" && window.sessionStorage?.getItem(SESSION_KEY) === "1";

  const [open, setOpen] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [workOpen, setWorkOpen] = useState(false);
  const glowRef = useRef(null);

  // The four quarters draw themselves from CSS; this only records that they did.
  const skipDraw = reduced || alreadyDrawn;

  // Only the open section's images are fetched.
  useEffect(() => {
    if (open !== "story") return;
    STORY_MOMENTS.forEach((m) => {
      const img = new Image();
      img.src = m.image;
    });
  }, [open]);

  useEffect(() => {
    const done = () => {
      try {
        window.sessionStorage?.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode: it just draws again next visit */
      }
    };
    if (skipDraw) {
      done();
      return undefined;
    }
    const timer = setTimeout(done, DRAW_MS);
    return () => clearTimeout(timer);
  }, [skipDraw]);

  /* ── Cursor glow, behind everything ──────────────────────────────── */

  useEffect(() => {
    if (isMobile || reduced) return undefined;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const at = { ...mouse };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      at.x += (mouse.x - at.x) * 0.08;
      at.y += (mouse.y - at.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${at.x - 210}px, ${at.y - 210}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isMobile, reduced]);

  /* ── Escape closes whatever is open ──────────────────────────────── */

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const select = useCallback((id) => {
    setOpen(id);
    setHovered(null);
  }, []);

  const section = SECTIONS.find((s) => s.id === open);

  return (
    <div className={`pc-root${open ? " is-open" : ""}`}>
      <div ref={glowRef} className="pc-glow" aria-hidden="true" />

      <button type="button" className="pc-wordmark" onClick={() => setOpen(null)}>
        {INTRO.wordmark}
      </button>

      <nav className="pc-work" aria-label="Selected work">
        <p className="pc-eyebrow">Selected work</p>
        <button
          type="button"
          className="pc-work-toggle"
          aria-expanded={workOpen}
          onClick={() => setWorkOpen((v) => !v)}
        >
          Selected work {workOpen ? "−" : "+"}
        </button>
        <div className="list" hidden={isMobile && !workOpen}>
          {SELECTED_WORK.map((p) => (
            <a
              key={p.slug}
              href={`#work=${p.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onOpenProject(p.slug);
              }}
            >
              {p.name}
            </a>
          ))}
        </div>
      </nav>

      <KolamMark
        drawn={4}
        active={open}
        hovered={hovered}
        onHover={setHovered}
        onSelect={select}
      />

      {!open && (
        <div className="pc-rest">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`r${i}${hovered === s.id ? " is-lit" : ""}`}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(s.id)}
              onBlur={() => setHovered(null)}
              onClick={() => select(s.id)}
            >
              <span className="n">{s.n}</span>
              {s.title}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="pc-zones" key={open}>
          {open === "sanjana" && <Sanjana />}
          {open === "story" && <Story />}
          {open === "snippets" && <Snippets chat={chat} onOpenProject={onOpenProject} />}
          {open === "statements" && <Statements />}
        </div>
      )}

      <div className="pc-utils">
        <a href="/SanjanaVenkat_Design-Engineer_Resume1.pdf" target="_blank" rel="noreferrer">
          Résumé
        </a>
        <a href="mailto:sanjanavnkt20@gmail.com">Email</a>
      </div>

      {open && (
        <button type="button" className="pc-close" onClick={() => setOpen(null)}>
          Close
        </button>
      )}

      <p className="pc-sr" aria-live="polite">
        {section ? `${section.title} open` : "Choose a section"}
      </p>
    </div>
  );
}
