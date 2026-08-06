import { useEffect, useRef } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "./useMediaQuery";

/**
 * The cursor is a pulli.
 *
 * A filled dot sits exactly under the pointer; a single kolam drop is drawn
 * around it, trailing on a lerp so it swings the way a loop does when you
 * pull the line. The dot is the dot; the loop is the line being drawn round
 * it — which is the whole grammar of the mark, at 30px.
 */
export default function RangoliCursor() {
  const dotRef = useRef(null);
  const loopRef = useRef(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!fine) return undefined;

    const target = { x: -100, y: -100 };
    const loop = { x: -100, y: -100 };
    let angle = 0;
    let raf;
    let visible = false;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        loop.x = target.x;
        loop.y = target.y;
        dotRef.current?.style.setProperty("opacity", "1");
        loopRef.current?.style.setProperty("opacity", "1");
      }
    };

    const onLeave = () => {
      visible = false;
      dotRef.current?.style.setProperty("opacity", "0");
      loopRef.current?.style.setProperty("opacity", "0");
    };

    // Interactive things get a slightly opened loop, so the cursor reacts
    // without needing a colour change.
    const onOver = (e) => {
      const hot = e.target.closest("a, button, input, [tabindex]");
      loopRef.current?.classList.toggle("is-hot", Boolean(hot));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const tick = () => {
      // The dot is exact; the loop lags, and the lag becomes its rotation.
      const dx = target.x - loop.x;
      const dy = target.y - loop.y;
      loop.x += dx * (reduced ? 1 : 0.18);
      loop.y += dy * (reduced ? 1 : 0.18);

      const speed = Math.hypot(dx, dy);
      if (speed > 0.6) angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      }
      if (loopRef.current) {
        loopRef.current.style.transform =
          `translate3d(${loop.x}px, ${loop.y}px, 0) rotate(${angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.documentElement.classList.add("has-rangoli-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-rangoli-cursor");
    };
  }, [fine, reduced]);

  if (!fine) return null;

  return (
    <>
      <span ref={dotRef} className="rc-dot" aria-hidden="true" />
      <span ref={loopRef} className="rc-loop" aria-hidden="true">
        <svg viewBox="-18 -18 36 36" fill="none">
          {/* One kolam drop, wrapped around where the dot sits. */}
          <path
            d="M 4 -11 C -6 -13, -13 -6, -13 1 C -13 8, -6 13, 2 12 C 9 11, 13 5, 11 -1 C 9 -6, 3 -8, 0 -5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </>
  );
}
