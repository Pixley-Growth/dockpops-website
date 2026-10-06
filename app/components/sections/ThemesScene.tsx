"use client";

import { useRef, useState } from "react";
import type { Dict } from "../../i18n/en";
import { THEME_LOOKS, type View } from "../../pops";
import { popFile } from "../../assets";
import Scene from "../Scene";

const VIEWS: View[] = ["grid", "list", "tiles"];

/**
 * Endlessly customizable: the same Pop in every theme and every view, real captures,
 * switched with a view control and theme swatches drawn the way the app's theme chooser
 * draws them (the fill, the border, the label colour as the dots). Theme and view are
 * independent, as in the app: changing one keeps the other.
 */
export default function ThemesScene({ t }: { t: Dict }) {
  const [view, setView] = useState<View>("grid");
  const [theme, setTheme] = useState(THEME_LOOKS[0].theme);
  const current = THEME_LOOKS.find((look) => look.theme === theme) ?? THEME_LOOKS[0];
  const shot = current.views[view];

  // The looks one click away load the first time someone reaches for the controls.
  const warmed = useRef(new Set<string>());
  const warm = (v: View = view) => {
    const next = [...THEME_LOOKS.map((look) => look.views[v].src), ...VIEWS.map((w) => current.views[w].src)];
    for (const src of next) {
      if (warmed.current.has(src)) continue;
      warmed.current.add(src);
      new window.Image().src = popFile(src);
    }
  };

  return (
    <Scene id="themes" wallpaper="quantum-foam" title={t.themes.title} body={<p>{t.themes.body}</p>}>
      <div className="dp-themes">
        <div className="dp-themes-stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={shot.src}
            className="dp-themes-pop"
            src={popFile(shot.src)}
            width={shot.width / 2}
            height={shot.height / 2}
            alt={`${current.theme}, ${t.look.views[view]}`}
          />
        </div>
        <div className="dp-themes-controls" onPointerEnter={() => warm()} onFocus={() => warm()}>
          <div className="dp-segmented" role="radiogroup" aria-label={t.themes.view}>
            {VIEWS.map((v) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={view === v}
                className="dp-segment"
                onClick={() => {
                  setView(v);
                  warm(v);
                }}
              >
                <ViewGlyph view={v} />
                {t.look.views[v]}
              </button>
            ))}
          </div>
          <div className="dp-swatches" role="radiogroup" aria-label={t.themes.theme}>
            {THEME_LOOKS.map((look) => (
              <button
                key={look.theme}
                type="button"
                role="radio"
                aria-checked={look.theme === current.theme}
                className="dp-swatch"
                onClick={() => setTheme(look.theme)}
              >
                <span
                  className="dp-swatch-tile"
                  style={{ ["--fill" as string]: look.swatch.fill, ["--border" as string]: look.swatch.border, color: look.swatch.label }}
                  aria-hidden
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <i key={i} />
                  ))}
                </span>
                <span className="dp-swatch-name">{look.theme}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}

/** The inspector's view glyphs (Grid, List, Tiles), drawn small. */
function ViewGlyph({ view }: { view: View }) {
  const r = (x: number, y: number, w: number, h: number) => <rect key={`${x}${y}`} x={x} y={y} width={w} height={h} rx={1.2} />;
  const shapes =
    view === "grid"
      ? [0, 6, 12].flatMap((y) => [0, 6, 12].map((x) => r(x + 0.5, y + 0.5, 4, 4)))
      : view === "list"
        ? [1, 7, 13].flatMap((y) => [r(0, y, 4, 4), r(6, y + 1, 10, 2)])
        : [0, 9].flatMap((y) => [0, 9].map((x) => r(x, y, 7, 7)));
  return (
    <svg viewBox="0 0 17 17" width="15" height="15" fill="currentColor" aria-hidden>
      {shapes}
    </svg>
  );
}
