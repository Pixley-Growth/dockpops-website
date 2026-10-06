"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Dict } from "../i18n/en";
import { popBySlug } from "../pops";
import LivePop from "./LivePop";
import { useOnScreen } from "./useReducedMotion";

const FX = ["weekend", "code", "travel", "photo", "tiger"].map(popBySlug);

/** PopFX: five live Pops on one desktop, running the app's shaders. They play only while on screen. */
export default function PopFXScene({ t }: { t: Dict }) {
  const scene = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(scene, "200px");

  return (
    <section ref={scene} id="new" className="dp-scene" aria-labelledby="dp-popfx-title">
      <Image
        src="/wallpapers/blueberry-oxygen.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={78}
        className="dp-wallpaper"
      />
      <div className="dp-scene-copy dp-on-wall">
        <h2 id="dp-popfx-title" className="dp-display dp-scene-title">
          {t.popfx.title}
        </h2>
        <p className="dp-scene-body">{t.popfx.body}</p>
        <p className="dp-scene-body">{t.popfx.count}</p>
      </div>
      <div className="dp-fx-row">
        {FX.map((pop) => (
          <figure key={pop.slug} className="dp-fx-item">
            <LivePop pop={pop} scale={0.72} playing={onScreen} />
            <figcaption className="dp-on-wall">{pop.theme}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
