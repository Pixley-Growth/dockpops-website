"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* Always-latest stable asset on the public releases repo. GitHub keeps
   /releases/latest/download/<asset> pointing at the newest release, and every
   release ships a version-less `DockPops.dmg` alongside the versioned one — so
   this URL never needs touching when a new build ships. The release asset is
   served with Content-Disposition: attachment, so the click downloads directly.
   Notarized .dmg, auto-updates via Sparkle. */
const DMG_URL =
  "https://github.com/Pixley-Growth/dockpops-releases/releases/latest/download/DockPops.dmg";

/* Direct-download counterpart to <DownloadBadge>. Styled to sit as an
   equal-weight pair beside the Mac App Store badge (matched height + radius). */
export default function DirectDownloadButton({
  location,
  size = "lg",
}: {
  location: string;
  size?: "lg" | "sm";
}) {
  const lg = size === "lg";
  return (
    <a
      href={DMG_URL}
      aria-label="Direct Download for macOS"
      onClick={() => {
        window.gtag?.("event", "download_click", { location, method: "direct_dmg" });
      }}
      className={`inline-flex items-center rounded-[10px] bg-white text-black border border-black/10 shadow-sm hover:opacity-90 transition-opacity ${
        lg ? "h-12 gap-2.5 px-4" : "h-7 gap-1.5 px-2.5"
      }`}
    >
      {/* download-into-tray glyph */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className={lg ? "w-5 h-5" : "w-3.5 h-3.5"}
      >
        <path
          d="M12 3v10m0 0l-4-4m4 4l4-4M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`font-semibold ${lg ? "text-[15px]" : "text-[12px]"}`}>
        Direct Download
      </span>
    </a>
  );
}
