import type { MetadataRoute } from "next";
import { LOCALES, homeHref, languageAlternates } from "./i18n/locales";

const SITE = "https://dockpops.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Each language's home page (with its hreflang siblings), then the privacy policy.
  // /connected redirects to /.
  const languages = Object.fromEntries(
    Object.entries(languageAlternates).map(([lang, path]) => [lang, `${SITE}${path === "/" ? "/" : path}`]),
  );
  return [
    ...LOCALES.map((l) => ({
      url: `${SITE}${homeHref(l)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: l.path ? 0.8 : 1,
      alternates: { languages },
    })),
    {
      url: `${SITE}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
