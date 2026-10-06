import { Nunito } from "next/font/google";
import QAOverlay from "./QAOverlay";
import { ConsentBanner } from "./components/Consent";
import { CONSENT_SCRIPT } from "./consent-script";
import type { Dict } from "./i18n/en";
import "./globals.css";
import "./site.css";

// Headlines are SF Pro Rounded, the face of the App Store screenshots. Off
// Apple platforms, where ui-rounded has nothing to resolve to, Nunito stands
// in. It's self-hosted by next/font and not preloaded, so Macs never fetch it.
const rounded = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["800"],
  variable: "--font-rounded-fallback",
  preload: false,
  display: "swap",
});

/** The HTML document every page shares: one per language root layout, in its language. */
export default function Document({ t, children }: { t: Dict; children: React.ReactNode }) {
  return (
    <html lang={t.lang} className={rounded.variable}>
      <head>
        {/* Consent defaults first, then Google Analytics only where it's allowed (consent-script.ts). */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_SCRIPT }} />
      </head>
      <body className="dp">
        {children}
        <ConsentBanner t={t.consent} privacy={t.footer.privacy} />
        {/* Dev-only QA annotation tool — never mounts in production (no
            global listeners / localStorage shipped to visitors). */}
        {process.env.NODE_ENV === "development" && <QAOverlay />}
      </body>
    </html>
  );
}
