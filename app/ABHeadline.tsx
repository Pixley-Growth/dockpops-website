"use client";

import { useState, useEffect } from "react";

const VARIANTS = [
  "Better Dock folders. Finally.",
  "Folders on your Dock. Like iPhone.",
  "iPhone folders. On your Mac.",
];

const STORAGE_KEY = "dockpops_headline_variant";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ABHeadline({ className }: { className?: string }) {
  const [variant, setVariant] = useState<number | null>(null);

  useEffect(() => {
    let v = parseInt(localStorage.getItem(STORAGE_KEY) ?? "", 10);
    if (isNaN(v) || v < 0 || v >= VARIANTS.length) {
      v = Math.floor(Math.random() * VARIANTS.length);
      localStorage.setItem(STORAGE_KEY, String(v));
    }
    setVariant(v);

    // Send to GA4
    window.gtag?.("event", "headline_variant", {
      variant_id: v,
      variant_text: VARIANTS[v],
    });
  }, []);

  if (variant === null) return <h2 className={className}>&nbsp;</h2>;

  return <h2 className={className}>{VARIANTS[variant]}</h2>;
}
