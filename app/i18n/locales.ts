// The site's languages: English at "/", the others at "/<path>" (the App Store's six).

// `ai`: whether the page promotes the AI features. Not in Chinese: Apple Intelligence isn't
// offered in mainland China, and the zh-Hans App Store listing leaves them out (owner, 2026-10-06).
export const LOCALES = [
  { path: "", lang: "en", name: "English", ai: true },
  { path: "de", lang: "de", name: "Deutsch", ai: true },
  { path: "es", lang: "es-419", name: "Español", ai: true },
  { path: "fr", lang: "fr", name: "Français", ai: true },
  { path: "ja", lang: "ja", name: "日本語", ai: true },
  { path: "zh-hans", lang: "zh-Hans", name: "简体中文", ai: false },
] as const;

export type Locale = (typeof LOCALES)[number];

/** A language's home page URL. */
export const homeHref = (locale: Locale) => (locale.path ? `/${locale.path}` : "/");

/** The locale a dictionary is for (by its `lang`). */
export const localeOf = (lang: string): Locale => LOCALES.find((l) => l.lang === lang) ?? LOCALES[0];

/** hreflang alternates: every language's home page, English as the default. */
export const languageAlternates: Record<string, string> = Object.fromEntries([
  ...LOCALES.map((l) => [l.lang, homeHref(l)]),
  ["x-default", "/"],
]);
