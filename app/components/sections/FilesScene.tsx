import type { Dict } from "../../i18n/en";
import { popFile } from "../../assets";
import Scene from "../Scene";

/** Apps, files, and folders: a Pop browsing a folder, and a Quick Look opened from a Pop. */
export default function FilesScene({ t }: { t: Dict }) {
  return (
    <Scene id="features" wallpaper="tangerine-melt" title={t.files.title} body={<p>{t.files.body}</p>} layout="side">
      <div className="dp-files">
        <figure className="dp-files-ql">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={popFile("scenes/quicklook.webp")} alt="" width={1007} height={558} loading="lazy" />
          <figcaption className="dp-on-wall">{t.files.quickLook}</figcaption>
        </figure>
        <figure className="dp-files-drill">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={popFile("scenes/drill.webp")} alt="" width={289} height={335} loading="lazy" />
          <figcaption className="dp-on-wall">{t.files.drill}</figcaption>
        </figure>
      </div>
    </Scene>
  );
}
