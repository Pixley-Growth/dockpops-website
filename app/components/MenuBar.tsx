import type { Dict } from "../i18n/en";
import { dockFile } from "../assets";

/** The site's navigation, drawn as a macOS menu bar over the desktop. */
export default function MenuBar({ t }: { t: Dict }) {
  return (
    <header className="dp-menubar">
      <a className="dp-menubar-app" href="#top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dockFile("dockpops.webp")} alt="" />
        DockPops
      </a>
      <nav className="dp-menubar-links" aria-label="Site">
        <a href="#features">{t.menu.features}</a>
        <a href="#pricing">{t.menu.pricing}</a>
        <a href="#faq">{t.menu.faq}</a>
        <a href="#support">{t.menu.support}</a>
      </nav>
      <div className="dp-menubar-end">
        <a className="dp-menubar-get" href="#pricing">
          {t.menu.download}
        </a>
      </div>
    </header>
  );
}
