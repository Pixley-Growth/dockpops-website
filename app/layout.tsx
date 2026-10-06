import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  // Absolute base so OpenGraph/Twitter images (e.g. "/og-6.png") resolve to
  // real URLs in social/iMessage cards instead of localhost.
  metadataBase: new URL("https://dockpops.com"),
  title: "DockPops — Custom Folders for Your Mac Dock",
  description:
    "Beautiful custom folders for your Dock. Group apps, files, and links into Pops, then theme each one, down to live PopFX backgrounds and a matching Dock icon. Free to download; Premium is one purchase, no subscription.",
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#5b2bc4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rounded.variable}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-DTCD5Q6KTJ"
        strategy="afterInteractive"
      />
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
