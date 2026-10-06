import type { Dict } from "../i18n/en";
import { localeOf } from "../i18n/locales";
import MenuBar from "./MenuBar";
import DesktopHero from "./DesktopHero";
import PopFXScene from "./PopFXScene";
import FilesScene from "./sections/FilesScene";
import ThemesScene from "./sections/ThemesScene";
import AssistantScene from "./sections/AssistantScene";
import { TrustRow, Everyday, Pricing, Faq, SiteFooter } from "./sections/InfoSections";

/** The home page, in the language of `t`. */
export default function Home({ t }: { t: Dict }) {
  return (
    <div id="top">
      <MenuBar t={t} />
      <main>
        <DesktopHero t={t} />
        <TrustRow t={t} />
        <FilesScene t={t} />
        <ThemesScene t={t} />
        <PopFXScene t={t} />
        {localeOf(t.lang).ai && <AssistantScene t={t} />}
        <Everyday t={t} />
        <Pricing t={t} />
        <Faq t={t} />
      </main>
      <SiteFooter t={t} />
    </div>
  );
}
