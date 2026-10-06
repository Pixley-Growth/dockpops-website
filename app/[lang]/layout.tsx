import Document from "../Document";
import { LOCALES } from "../i18n/locales";
import { siteMetadata, siteViewport } from "../i18n/metadata";

export const metadata = siteMetadata;
export const viewport = siteViewport;

// Only the five translated languages; any other path 404s.
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.filter((l) => l.path).map((l) => ({ lang: l.path }));
}

/** A translated language's pages, with its own `<html lang>`. */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = LOCALES.find((l) => l.path === lang) ?? LOCALES[0];
  return <Document lang={locale.lang}>{children}</Document>;
}
