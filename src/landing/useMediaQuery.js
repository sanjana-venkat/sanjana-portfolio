import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    // Read once on mount too: the query can flip between the first render and
    // this subscription, and orientationchange is the belt to matchMedia's
    // braces on older Safari, where rotating did not always fire `change`.
    onChange();
    list.addEventListener("change", onChange);
    window.addEventListener("orientationchange", onChange);
    return () => {
      list.removeEventListener("change", onChange);
      window.removeEventListener("orientationchange", onChange);
    };
  }, [query]);

  return matches;
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
