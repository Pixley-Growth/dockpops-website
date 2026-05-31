import type { Metadata } from "next";
import Script from "next/script";
import QAOverlay from "./QAOverlay";
import "./globals.css";

export const metadata: Metadata = {
  // Absolute base so OpenGraph/Twitter images (e.g. "/preview.png") resolve to
  // real URLs in social/iMessage cards instead of localhost.
  metadataBase: new URL("https://dockpops.com"),
  title: "DockPops — The Missing App Launcher for Your Dock",
  description:
    "Swipeable app groups in your Dock. Organize apps, files, and folders into named Pops. SmartyPops suggests groups for you. Native Mac app, no tracking, fully sandboxed.",
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      <body
        className="antialiased bg-black"
        style={{ fontFamily: "ui-rounded, 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
      >
        {children}
        {/* Dev-only QA annotation tool — never mounts in production (no
            global listeners / localStorage shipped to visitors). */}
        {process.env.NODE_ENV === "development" && <QAOverlay />}
      </body>
    </html>
  );
}
