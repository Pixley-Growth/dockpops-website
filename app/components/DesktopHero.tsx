"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Dict } from "../i18n/en";
import { HERO_POPS, PHONE_POPS, type PopAsset } from "../pops";
import PopClip from "./PopClip";
import LivePop from "./LivePop";
import Downloads from "./Downloads";
import { useNarrow, useOnScreen, useReducedMotion } from "./useReducedMotion";
import { popFile, dockFile } from "../assets";

// The Dock, left to right: Finder, the Pops (where you'd keep them, not after the divider
// where macOS puts recent apps), the Trash.
const APPS_BEFORE: { name: string; running?: boolean }[] = [{ name: "finder", running: true }];
const APPS_AFTER: { name: string; running?: boolean }[] = [];

const DWELL_MS = 5200; // how long each Pop stays open while the hero plays itself
const FIRST_OPEN_MS = 700;
const GAP = 14; // the Pop's bottom edge above the Dock

type Placement = { x: number; bottom: number; scale: number };

/**
 * The hero is a Mac desktop. The Pops in its Dock are real (captured from the
 * app), and they open the way DockPops opens them: above their own tile,
 * centred on it, kept on screen, zooming up from the Dock-side edge. A tile's
 * label names its Pop's look in the inspector's words.
 *
 * Left alone it opens each Pop in turn. Once someone clicks a tile it stops
 * and does what they say: a tile opens its Pop; the open Pop's tile, Escape
 * or a click on the desktop closes it.
 */
export default function DesktopHero({ t }: { t: Dict }) {
  const hero = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dock = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const tiles = useRef<Record<string, HTMLButtonElement | null>>({});

  const narrow = useNarrow();
  const pops = useMemo(() => (narrow ? HERO_POPS.filter((p) => PHONE_POPS.has(p.slug)) : HERO_POPS), [narrow]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [playingItself, setPlayingItself] = useState(true);
  const [place, setPlace] = useState<Placement | null>(null);
  const reduce = useReducedMotion();
  const onScreen = useOnScreen(hero);
  const open = pops.find((p) => p.slug === openSlug) ?? null;

  // The first Pop opens a beat after the page does.
  useEffect(() => {
    const id = window.setTimeout(() => setOpenSlug((s) => s ?? HERO_POPS[0].slug), FIRST_OPEN_MS);
    return () => window.clearTimeout(id);
  }, []);

  // Then the next, and the next, while nobody has taken over (never under Reduce Motion).
  useEffect(() => {
    if (!playingItself || reduce || !onScreen || !open) return;
    const id = window.setTimeout(() => {
      const i = pops.findIndex((p) => p.slug === open.slug);
      setOpenSlug(pops[(i + 1) % pops.length].slug);
    }, DWELL_MS);
    return () => window.clearTimeout(id);
  }, [playingItself, reduce, onScreen, open, pops]);

  const measure = useCallback(() => {
    const s = stage.current;
    const d = dock.current;
    const tile = open ? tiles.current[open.slug] : null;
    if (!s || !d || !tile || !open) {
      setPlace(null);
      return;
    }
    const sr = s.getBoundingClientRect();
    const dr = d.getBoundingClientRect();
    const tr = tile.getBoundingClientRect();
    const css = getComputedStyle(s);
    const maxScale = parseFloat(css.getPropertyValue("--pop-max-scale")) || 1;
    // The Pop rises from the Dock as far as the copy above it allows.
    const ceiling = narrow
      ? parseFloat(css.getPropertyValue("--pop-top")) || 20
      : (copy.current?.getBoundingClientRect().bottom ?? sr.top) - sr.top + 28;

    const room = dr.top - sr.top - GAP - ceiling;
    const scale = Math.max(0.5, Math.min(maxScale, room / (open.height / 2)));
    const w = (open.width / 2) * scale;
    const x = Math.min(sr.width - 12 - w / 2, Math.max(12 + w / 2, tr.left + tr.width / 2 - sr.left));
    setPlace({ x, bottom: sr.bottom - dr.top + GAP, scale });
  }, [open, narrow]);

  useLayoutEffect(() => {
    measure();
    const s = stage.current;
    if (!s) return;
    const ro = new ResizeObserver(measure);
    ro.observe(s);
    return () => ro.disconnect();
  }, [measure]);

  const close = useCallback(() => {
    setPlayingItself(false);
    setOpenSlug(null);
  }, []);

  // Escape closes, as it does in the app.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openSlug) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSlug, close]);

  const pick = (slug: string) => {
    setPlayingItself(false);
    setOpenSlug((s) => (s === slug ? null : slug));
  };

  return (
    <section ref={hero} className="dp-hero" aria-labelledby="dp-hero-title">
      <Image
        src="/wallpapers/grape-gravity.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={80}
        className="dp-wallpaper"
      />

      <div ref={copy} className="dp-hero-copy dp-on-wall">
        <p className="dp-hero-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dockFile("appicon.webp")} alt="" width={76} height={76} />
          <span className="dp-display">DockPops</span>
        </p>
        <h1 id="dp-hero-title" className="dp-display dp-hero-title">
          {t.hero.title}
        </h1>
        <div className="dp-hero-side">
          <p className="dp-hero-body">{t.hero.body}</p>
          <Downloads t={t} location="hero" />
          <p className="dp-hero-note">{t.hero.free}</p>
          <p className="dp-hero-hint" data-hidden={!playingItself}>
            <span className="dp-pointer-only">{t.hero.hint}</span>
            <span className="dp-touch-only">{t.hero.hintTouch}</span>
          </p>
        </div>
      </div>

      <div
        ref={stage}
        className="dp-stage"
        onClick={(e) => {
          // A click on the desktop itself closes the Pop, as a click outside does in the app.
          if (e.target === e.currentTarget && openSlug) close();
        }}
      >
        {open && place && (
          <div className="dp-pop-anchor" style={{ left: place.x, bottom: place.bottom }}>
            {open.fx ? (
              <LivePop
                key={open.slug}
                pop={open}
                scale={place.scale}
                playing={onScreen}
                className={reduce ? "" : "dp-pop-in"}
              />
            ) : (
              <PopClip
                key={open.slug}
                pop={open}
                scale={place.scale}
                eager
                className={reduce ? "" : "dp-pop-in"}
              />
            )}
          </div>
        )}

        <nav ref={dock} className="dp-dock" aria-label="Dock">
          {APPS_BEFORE.map((app) => (
            <DockApp key={app.name} name={app.name} running={app.running} />
          ))}
          {pops.map((pop) => (
            <button
              key={pop.slug}
              ref={(el) => {
                tiles.current[pop.slug] = el;
              }}
              type="button"
              className="dp-tile dp-tile--pop"
              aria-pressed={openSlug === pop.slug}
              aria-label={t.hero.tile.replace("{name}", pop.name).replace("{theme}", pop.theme)}
              data-running={openSlug === pop.slug}
              onClick={() => pick(pop.slug)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={popFile(`${pop.slug}-tile.webp`)} alt="" width={54} height={54} />
              <span className="dp-dock-label" aria-hidden>
                <strong>{pop.name}</strong>
                {lookLine(pop, t)}
              </span>
            </button>
          ))}
          {APPS_AFTER.map((app) => (
            <DockApp key={app.name} name={app.name} />
          ))}
          <span className="dp-dock-divider" aria-hidden />
          <DockApp name="trash" />
        </nav>
      </div>
    </section>
  );
}

function DockApp({ name, running }: { name: string; running?: boolean }) {
  return (
    <span className="dp-tile dp-tile--app" data-running={running} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={dockFile(`${name}.webp`)} alt="" width={54} height={54} />
    </span>
  );
}

/** A Pop's look in one line, in the inspector's words: "List view, gradient fill, serif labels". */
function lookLine(pop: PopAsset, t: Dict) {
  const l = t.look;
  const fill = pop.fill === "popfx" && pop.effect ? `${l.fills.popfx} ${pop.effect}` : l.fills[pop.fill];
  return l.line
    .replace("{theme}", pop.theme)
    .replace("{view}", l.views[pop.view])
    .replace("{fill}", fill)
    .replace("{labels}", l.fonts[pop.labels]);
}
