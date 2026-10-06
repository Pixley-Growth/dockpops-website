import Document from "../Document";
import { siteMetadata, siteViewport } from "../i18n/metadata";

export const metadata = siteMetadata;
export const viewport = siteViewport;

/** English: the home page at "/" and the privacy policy. */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
