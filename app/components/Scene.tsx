import Image from "next/image";
import type { ReactNode } from "react";

/**
 * One feature on its own desktop: a full-bleed wallpaper, the headline and copy in white,
 * and the real Pops that show it. `layout` places the copy beside the visual or above it.
 */
export default function Scene({
  id,
  wallpaper,
  title,
  body,
  note,
  layout = "stack",
  children,
  sectionRef,
}: {
  id: string;
  wallpaper: string;
  title: string;
  body: ReactNode;
  note?: ReactNode;
  layout?: "stack" | "side";
  children: ReactNode;
  sectionRef?: React.Ref<HTMLElement>;
}) {
  return (
    <section ref={sectionRef} id={id} className={`dp-scene dp-scene--${layout}`} aria-labelledby={`${id}-title`}>
      <Image src={`/wallpapers/${wallpaper}.jpg`} alt="" fill sizes="100vw" quality={78} className="dp-wallpaper" />
      <div className="dp-scene-copy dp-on-wall">
        <h2 id={`${id}-title`} className="dp-display dp-scene-title">
          {title}
        </h2>
        <div className="dp-scene-body">{body}</div>
        {note && <p className="dp-scene-note">{note}</p>}
      </div>
      <div className="dp-scene-visual">{children}</div>
    </section>
  );
}
