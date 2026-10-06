import type { Metadata } from "next";
import { DICTS } from "../i18n/dictionaries";
import { LOCALES } from "../i18n/locales";
import { homeMetadata } from "../i18n/metadata";
import Home from "../components/Home";

export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.filter((l) => l.path).map((l) => ({ lang: l.path }));
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return homeMetadata(DICTS[lang]);
}

/** The home page in a translated language. */
export default async function LocaleHome({ params }: Props) {
  const { lang } = await params;
  return <Home t={DICTS[lang]} />;
}
