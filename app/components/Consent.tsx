"use client";

import { useEffect, useState } from "react";
import type { Dict } from "../i18n/en";

declare global {
  interface Window {
    /** Set by the consent script in <head>: whether to ask before loading analytics. */
    dpNeedsConsent?: boolean;
    /** Records the choice, updates Google's consent, and loads analytics when allowed. */
    dpConsent?: (choice: "granted" | "denied") => void;
  }
}

export const CONSENT_KEY = "dp-analytics-consent";
const OPEN_EVENT = "dp-consent-open";

function storedChoice() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

/**
 * Asks before Google Analytics loads: shown to visitors in Europe until they choose, and
 * to anyone who opens "Cookie settings". Allow and Decline are equal choices.
 */
export function ConsentBanner({ t, privacy }: { t: Dict["consent"]; privacy: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.dpNeedsConsent && !storedChoice()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;
  const choose = (choice: "granted" | "denied") => {
    window.dpConsent?.(choice);
    setOpen(false);
  };
  return (
    <div className="dp-consent" role="region" aria-label={t.settings}>
      <p>
        {t.text} <a href="/privacy">{privacy}</a>
      </p>
      <div className="dp-consent-actions">
        <button type="button" onClick={() => choose("denied")}>
          {t.decline}
        </button>
        <button type="button" onClick={() => choose("granted")}>
          {t.allow}
        </button>
      </div>
    </div>
  );
}

/** "Cookie settings": reopens the banner so a choice can be changed at any time. */
export function ConsentSettingsLink({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" className={`dp-consent-link ${className ?? ""}`} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {label}
    </button>
  );
}
