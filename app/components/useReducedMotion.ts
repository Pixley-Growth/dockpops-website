"use client";

import { useEffect, useState } from "react";

/** Reduce Motion, live: the page follows the setting as it changes. */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(q.matches);
    const on = () => setReduce(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return reduce;
}

/** The phone layout (site.css switches at the same width). */
export function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 899px)");
    setNarrow(q.matches);
    const on = () => setNarrow(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return narrow;
}

/** True while `el` is on screen (and the tab is visible). */
export function useOnScreen<T extends Element>(ref: React.RefObject<T | null>, margin = "0px") {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let seen = false;
    const update = () => setOn(seen && document.visibilityState === "visible");
    const io = new IntersectionObserver(
      ([e]) => {
        seen = e.isIntersecting;
        update();
      },
      { rootMargin: margin }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [ref, margin]);
  return on;
}
