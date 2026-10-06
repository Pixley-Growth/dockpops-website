import type { Metadata, Viewport } from "next";
import type { Dict } from "./en";
import { homeHref, languageAlternates, localeOf } from "./locales";

/** What every root layout shares: the absolute base for social images, and the theme color. */
export const siteMetadata: Metadata = {
  // Absolute base so OpenGraph/Twitter images (e.g. "/og-6.png") resolve to
  // real URLs in social/iMessage cards instead of localhost.
  metadataBase: new URL("https://dockpops.com"),
};
export const siteViewport: Viewport = { themeColor: "#5b2bc4" };

/** A home page's metadata in its language: title, description, canonical, hreflang, cards. */
export function homeMetadata(t: Dict): Metadata {
  const url = homeHref(localeOf(t.lang));
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: url, languages: languageAlternates },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url,
      images: [{ url: "/og-6.png", width: 1280, height: 720 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og-6.png"],
    },
  };
}
