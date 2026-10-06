import Script from "next/script";
import { Nunito } from "next/font/google";
import QAOverlay from "./QAOverlay";
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

/** The HTML document every page shares: one per language root layout, with its `lang`. */
export default function Document({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={rounded.variable}>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-DTCD5Q6KTJ" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DTCD5Q6KTJ');
        `}
      </Script>
      <body className="dp">
        {children}
        {/* Dev-only QA annotation tool — never mounts in production (no
            global listeners / localStorage shipped to visitors). */}
        {process.env.NODE_ENV === "development" && <QAOverlay />}
      </body>
    </html>
  );
}
