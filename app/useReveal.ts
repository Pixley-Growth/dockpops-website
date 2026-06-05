"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal hook. Returns a ref to attach to an element and a boolean that
 * flips true (once) when the element scrolls into view. Pair with the `.reveal`
 * / `.is-visible` classes in globals.css. Reduced-motion users still get the
 * `is-visible` state immediately (the CSS no-ops the transform there).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // SSR/old-browser safety: if IO is unavailable, just show it.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect(); // fire once
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}
