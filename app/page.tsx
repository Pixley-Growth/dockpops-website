import type { Metadata } from "next";
import { en } from "./i18n/en";
import MenuBar from "./components/MenuBar";
import DesktopHero from "./components/DesktopHero";
import PopFXScene from "./components/PopFXScene";
import FilesScene from "./components/sections/FilesScene";
import ThemesScene from "./components/sections/ThemesScene";
import AssistantScene from "./components/sections/AssistantScene";
import { TrustRow, Everyday, Pricing, Faq, SiteFooter } from "./components/sections/InfoSections";

export const metadata: Metadata = {
  openGraph: {
    title: "DockPops — Custom Folders for Your Mac Dock",
    description:
      "Beautiful custom folders for your Dock. Group apps, files, and links into Pops, then make each one yours with themes, live PopFX backgrounds, and matching Dock icons. No subscription.",
    images: [{ url: "/og-6.png", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DockPops — Custom Folders for Your Mac Dock",
    description:
      "Beautiful custom folders for your Dock. Group apps, files, and links into Pops, then make each one yours with themes, live PopFX backgrounds, and matching Dock icons. No subscription.",
    images: ["/og-6.png"],
  },
};

export default function DockPopsPage() {
  const t = en;
  return (
    <div id="top">
      <MenuBar t={t} />
      <main>
        <DesktopHero t={t} />
        <TrustRow t={t} />
        <FilesScene t={t} />
        <ThemesScene t={t} />
        <PopFXScene t={t} />
        <AssistantScene t={t} />
        <Everyday t={t} />
        <Pricing t={t} />
        <Faq t={t} />
      </main>
      <SiteFooter t={t} />
    </div>
  );
}
