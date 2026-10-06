"use client";

import type { Dict } from "../i18n/en";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* The newest notarized .dmg on the public releases repo: GitHub keeps
   /releases/latest/download/<asset> on the newest release, and every release
   ships a version-less DockPops.dmg, so this never needs touching. */
const DMG_URL =
  "https://github.com/Pixley-Growth/dockpops-releases/releases/latest/download/DockPops.dmg";

// No storefront in the path: Apple sends each visitor to their own country's store.
const appStoreUrl = (location: string) =>
  `https://apps.apple.com/app/dockpops/id6759999009?mt=12&ct=website_${location}`;

// Apple's badge in each language (toolbox.marketingtools.apple.com, white).
const BADGES: Record<string, string> = {
  en: "/mac-app-store-badge.svg",
  de: "/badges/mac-app-store-de.svg",
  "es-419": "/badges/mac-app-store-es-419.svg",
  fr: "/badges/mac-app-store-fr.svg",
  ja: "/badges/mac-app-store-ja.svg",
  "zh-Hans": "/badges/mac-app-store-zh-Hans.svg",
};

/** The two ways to get DockPops, side by side and equal weight. */
export default function Downloads({ t, location }: { t: Dict; location: string }) {
  return (
    <div className="dp-cta">
      <a
        className="dp-badge"
        href={appStoreUrl(location)}
        onClick={() => window.gtag?.("event", "download_click", { location })}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BADGES[t.lang] ?? BADGES.en} alt={t.download.appStore} width={160} height={48} />
      </a>
      <a
        className="dp-direct"
        href={DMG_URL}
        onClick={() => window.gtag?.("event", "download_click", { location, method: "direct_dmg" })}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3v10m0 0l-4-4m4 4l4-4M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {t.download.direct}
      </a>
    </div>
  );
}
