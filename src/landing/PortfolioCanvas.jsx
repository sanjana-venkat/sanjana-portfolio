import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import KolamCanvas from "./KolamCanvas";
import IntroStage from "./IntroStage";
import StoryStage from "./StoryStage";
import SnippetsStage from "./SnippetsStage";
import StatementsStage from "./StatementsStage";
import SelectedWorkShortcuts from "./SelectedWorkShortcuts";
import { HERO_S, HERO_VIEW_BOX, heroScreenRect } from "./kolam";
import { INTRO, SLUG_BY_LABEL, STAGES } from "./landingData";
import { usePrefersReducedMotion } from "./useMediaQuery";
import "./landing.css";

const SESSION_KEY = "sv-intro-played";
const SWIPE_MIN = 56;

/**
 * The whole landing experience: one 100vw x 100dvh composition, four stages,
 * and a single place where the stage state lives.
 *
 * Intro phases:
 *   blank -> dots (the 9x9 grid lands) -> hero (the S is drawn on the grid)
 *   -> fly (the grid slides left, the S detaches and travels to the name)
 *   -> done (the S becomes the letter, "anjana" unmasks)
 */
export default function PortfolioCanvas({ chat, onOpenProject }) {
  const reducedMotion = usePrefersReducedMotion();
  const introAlreadyPlayed =
    typeof window !== "undefined" && window.sessionStorage?.getItem(SESSION_KEY) === "1";

  const [phase, setPhase] = useState(
    reducedMotion || introAlreadyPlayed ? "done" : "blank"
  );
  const [stage, setStage] = useState(1);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [flyRect, setFlyRect] = useState(null);
  // The introduction waits for the S to land before the rest of it appears.
  // Any later visit to stage 1 (or a skipped intro) reveals it straight away.
  const [quickRise, setQuickRise] = useState(reducedMotion || introAlreadyPlayed);

  const kolamRef = useRef(null);
  const sSlotRef = useRef(null);
  const timers = useRef([]);
  const touchStart = useRef(null);
  const rootRef = useRef(null);
  const gridRectRef = useRef(null);

  const introRunning = phase !== "done";

  /* ── Intro sequence ──────────────────────────────────────────────── */

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const measureNameSlot = useCallback(() => {
    const slot = sSlotRef.current;
    if (!slot) return;
    const rect = slot.getBoundingClientRect();
    // Fit the drawn S to the glyph's cap height, centred on its advance width.
    const height = rect.height * 0.82;
    const width = height * (HERO_S.box.w / HERO_S.box.h);
    setFlyRect({
      left: rect.left + (rect.width - width) / 2,
      top: rect.top + (rect.height - height) / 2,
      width,
      height,
    });
  }, []);

  const finishIntro = useCallback(() => {
    clearTimers();
    setPhase("done");
    setFlyRect(null);
    try {
      window.sessionStorage?.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode — the intro just plays again next time */
    }
  }, []);

  // A one-shot on mount. This deliberately does not depend on `phase`: each
  // step sets it, and re-running the effect would restart the sequence.
  useEffect(() => {
    if (reducedMotion || introAlreadyPlayed) {
      try {
        window.sessionStorage?.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      return undefined;
    }

    const at = (fn, ms) => timers.current.push(setTimeout(fn, ms));

    at(() => setPhase("dots"), 180);
    at(() => setPhase("hero"), 1000);
    at(() => setPhase("fly"), 2200);
    at(finishIntro, 3180);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Remember where the S sits on the grid while it is still being drawn, so the
  // detached copy can start from exactly that spot once the grid slides away.
  useLayoutEffect(() => {
    if (phase === "hero") gridRectRef.current = heroScreenRect(kolamRef.current);
  }, [phase]);

  // The flight itself: mount the detached S over its old position, commit that
  // frame, then hand it the name's coordinates and let CSS carry it there.
  useLayoutEffect(() => {
    if (phase !== "fly") return undefined;
    setFlyRect(gridRectRef.current);
    let cancelled = false;
    const outer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) measureNameSlot();
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(outer);
    };
  }, [phase, measureNameSlot]);

  useEffect(() => () => clearTimers(), []);

  /* ── Stage navigation ────────────────────────────────────────────── */

  const skipIntro = useCallback(() => {
    setQuickRise(true);
    finishIntro();
  }, [finishIntro]);

  const goTo = useCallback((next) => {
    const clamped = Math.min(STAGES.length, Math.max(1, next));
    setHasAdvanced(true);
    setQuickRise(true);
    setStage(clamped);
  }, []);

  const advance = useCallback(() => {
    if (introRunning) {
      skipIntro();
      return;
    }
    goTo(stage + 1);
  }, [introRunning, skipIntro, goTo, stage]);

  const retreat = useCallback(() => goTo(stage - 1), [goTo, stage]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const tag = target?.tagName;
      const isField = tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable;
      if (isField) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        advance();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        retreat();
        return;
      }
      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        // Let real controls handle their own activation.
        if (tag === "BUTTON" || tag === "A" || tag === "SELECT") return;
        event.preventDefault();
        advance();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [advance, retreat]);

  const onTouchStart = (event) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) advance();
    else retreat();
  };

  /* ── Page can never scroll while the canvas is on screen ─────────── */

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const prevBody = body.style.overflow;
    const prevHtml = html.style.overflow;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
    };
  }, []);

  /* ── Render ──────────────────────────────────────────────────────── */

  const drawnGroups = introRunning ? 0 : stage - 1;
  const showShortcuts = phase === "fly" || phase === "done";
  const snippetProjects = {
    slugFor: (label) => SLUG_BY_LABEL[label] || null,
    open: onOpenProject,
  };

  return (
    <div
      ref={rootRef}
      className="pc-root"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        className="pc-advance"
        onClick={advance}
        disabled={!introRunning && stage === STAGES.length}
        aria-label={
          introRunning ? "Skip the intro" : `Continue to ${STAGES[stage] || ""}`
        }
        onKeyDown={(event) => {
          // The window handler already covers Enter/Space; don't double-fire.
          if (event.key === "Enter" || event.key === " ") event.preventDefault();
        }}
      />

      <KolamCanvas
        containerRef={kolamRef}
        phase={introRunning ? phase : "done"}
        drawnGroups={drawnGroups}
        heroInGrid={phase === "hero"}
        showEcho={stage === STAGES.length}
        centered={phase === "blank" || phase === "dots" || phase === "hero"}
      />

      {flyRect && (
        <svg
          className="pc-flying-s"
          viewBox={HERO_VIEW_BOX}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          style={{
            left: flyRect.left,
            top: flyRect.top,
            width: flyRect.width,
            height: flyRect.height,
            opacity: phase === "done" ? 0 : 1,
          }}
        >
          <path d={HERO_S.d} transform={HERO_S.transform} />
        </svg>
      )}

      <SelectedWorkShortcuts visible={showShortcuts} onOpen={onOpenProject} />

      <div className="pc-stage">
        <div className={`pc-identity${stage > 1 ? " is-on" : ""}`} aria-hidden={stage === 1}>
          <button
            type="button"
            className="pc-identity-name"
            onClick={(event) => {
              event.stopPropagation();
              goTo(1);
            }}
          >
            {INTRO.name}
          </button>
          <span className="pc-identity-line">{INTRO.statement}</span>
        </div>

        <IntroStage
          active={stage === 1 && (phase === "fly" || phase === "done")}
          sSlotRef={sSlotRef}
          sHidden={introRunning}
          riseBase={quickRise ? "180ms" : "980ms"}
        />
        <StoryStage active={stage === 2} />
        <SnippetsStage active={stage === 3} chat={chat} onOpenProject={snippetProjects} />
        <StatementsStage active={stage === 4} />
      </div>

      <p className={`pc-hint${!introRunning && stage === 1 && !hasAdvanced ? " is-on" : ""}`}>
        click anywhere to continue
      </p>

      {introRunning && (
        <button
          type="button"
          className="pc-skip"
          onClick={(event) => {
            event.stopPropagation();
            skipIntro();
          }}
        >
          Skip intro
        </button>
      )}

      <div className="pc-nav" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={retreat} disabled={stage === 1} aria-label="Previous section">
          ←
        </button>
        <span className="pc-nav-count">
          <strong>{String(stage).padStart(2, "0")}</strong> / {String(STAGES.length).padStart(2, "0")}
        </span>
        <span className="pc-nav-ticks">
          {STAGES.map((name, index) => (
            <button
              key={name}
              type="button"
              className={`pc-nav-tick${index + 1 === stage ? " is-on" : ""}`}
              aria-label={name}
              aria-current={index + 1 === stage ? "true" : "false"}
              onClick={() => goTo(index + 1)}
            />
          ))}
        </span>
        <button
          type="button"
          onClick={advance}
          disabled={stage === STAGES.length}
          aria-label="Next section"
        >
          →
        </button>
      </div>

      <p className="pc-sr" aria-live="polite">
        {STAGES[stage - 1]}, section {stage} of {STAGES.length}
      </p>
    </div>
  );
}
