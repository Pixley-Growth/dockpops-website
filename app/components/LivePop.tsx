"use client";

import { useEffect, useRef, useState } from "react";
import type { PopAsset } from "../pops";
import { popFile } from "../assets";
import { LOOKS } from "./livepop/looks";
import { PopFXRenderer, type Stamp } from "./livepop/renderer";
import PopClip from "./PopClip";
import { useOnScreen, useReducedMotion } from "./useReducedMotion";

// The capture frame (2x pixels) and the Pop's surface inside it — the PopFX layer fills
// exactly this rectangle in the app (measured on the takes, tools/make-pop-mattes.py).
const FRAME = { w: 590, h: 914 };
const BODY = { x: 17, y: 9, w: 556, h: 880 };
const SURFACE = { w: BODY.w / 2, h: BODY.h / 2 }; // points: what the shader is told its size is
const MAX_STAMPS = 96;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const held = new WeakMap<HTMLCanvasElement, { renderer: PopFXRenderer; release: number }>();

/**
 * A PopFX Pop, live: the app's shader running in WebGL under the Pop's own foreground
 * (icons, labels, cell plates, sheen and border, cut from captures of the real Pop). The
 * material meets the visitor's pointer the way it meets the hand in the app — the arcs and
 * the lava ripple, the snow is shoved aside, the fur is combed; the rain ignores it.
 *
 * The clock runs while the Pop is on screen and `playing`, never under Reduce Motion (the
 * pointer still works then, as in the app). Without WebGL 2 it falls back to the capture.
 */
export default function LivePop({
  pop,
  scale = 1,
  playing = true,
  className = "",
}: {
  pop: PopAsset;
  scale?: number;
  playing?: boolean;
  className?: string;
}) {
  const look = pop.fx ? LOOKS[pop.fx] : undefined;
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<PopFXRenderer | null>(null);
  const stamps = useRef<Stamp[]>([]);
  const anchor = useRef<{ x: number; y: number } | null>(null);
  const clock = useRef(look?.startTime ?? 0);
  const dirty = useRef(true);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();
  const onScreen = useOnScreen(frame, "120px");

  const width = Math.round((FRAME.w / 2) * scale);
  const height = Math.round((FRAME.h / 2) * scale);

  useEffect(() => {
    const c = canvas.current;
    if (!c || !look) return;
    // A canvas keeps its renderer through an unmount that is immediately undone (React's
    // development double mount): the context is let go a moment later, unless it came back.
    const kept = held.get(c);
    if (kept) {
      window.clearTimeout(kept.release);
      renderer.current = kept.renderer;
    } else {
      try {
        renderer.current = new PopFXRenderer(c, look);
      } catch (error) {
        console.warn(`LivePop ${pop.slug}: falling back to the capture`, error);
        setFailed(true);
        return;
      }
    }
    dirty.current = true;
    const r = renderer.current!;
    return () => {
      const release = window.setTimeout(() => {
        held.delete(c);
        r.dispose();
      }, 500);
      held.set(c, { renderer: r, release });
      renderer.current = null;
    };
  }, [look, pop.slug]);

  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.current?.resize(SURFACE.w, SURFACE.h, scale * dpr);
    dirty.current = true;
  }, [look, scale, failed]);

  useEffect(() => {
    if (!look) return;
    let raf = 0;
    let lastFrame = 0;
    let lastClock = performance.now();
    const animating = playing && onScreen && !reduce;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const r = renderer.current;
      if (!r) return;
      stamps.current = PopFXRenderer.prune(stamps.current, look, now);
      const stroking = stamps.current.length > 0;
      if (animating) clock.current += Math.min(0.1, (now - lastClock) / 1000);
      lastClock = now;
      if (!animating && !stroking && !dirty.current) return;
      // 30 fps at rest (the app caps PopFX at 24); the hand gets every frame, as the app's
      // capture clock gives it 60.
      if (!stroking && now - lastFrame < 1000 / 30 - 2) return;
      lastFrame = now;
      dirty.current = false;
      r.render(clock.current, stamps.current, now);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [look, playing, onScreen, reduce]);

  if (!look || failed) {
    return <PopClip pop={pop} scale={scale} eager className={className} />;
  }

  // PopFXPointerModel.stroke: the first point is the anchor; then a stamp each time the hand
  // has moved `spacing` (touch space: the short side is the unit), with the way it was going.
  const onMove = (e: React.PointerEvent) => {
    if (look.touch.radius === 0) return;
    const rect = canvas.current!.getBoundingClientRect();
    const u = (e.clientX - rect.left) / rect.width;
    const v = (e.clientY - rect.top) / rect.height;
    if (u < 0 || u > 1 || v < 0 || v > 1) {
      anchor.current = null;
      return;
    }
    const short = Math.min(SURFACE.w, SURFACE.h);
    const ax = (u * SURFACE.w) / short;
    const ay = (v * SURFACE.h) / short;
    const last = anchor.current;
    if (!last) {
      anchor.current = { x: ax, y: ay };
      return;
    }
    const dx = ax - last.x;
    const dy = ay - last.y;
    const d = Math.hypot(dx, dy);
    if (d < look.touch.spacing) return;
    stamps.current.push({ x: ax, y: ay, born: performance.now(), tx: dx / d, ty: dy / d });
    if (stamps.current.length > MAX_STAMPS) stamps.current.splice(0, stamps.current.length - MAX_STAMPS);
    anchor.current = { x: ax, y: ay };
  };

  return (
    <div
      ref={frame}
      className={`dp-pop dp-livepop ${className}`}
      style={{ width, height, ["--s" as string]: scale }}
      onPointerMove={onMove}
      onPointerLeave={() => (anchor.current = null)}
    >
      <canvas
        ref={canvas}
        className="dp-livepop-surface"
        style={{
          left: pct(BODY.x, FRAME.w),
          top: pct(BODY.y, FRAME.h),
          width: pct(BODY.w, FRAME.w),
          height: pct(BODY.h, FRAME.h),
        }}
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="dp-livepop-fg" src={popFile(`${pop.slug}-fg.webp`)} alt="" draggable={false} />
      <span className="dp-livepop-name" style={{ color: look.label }}>
        {pop.name}
        <svg viewBox="0 0 10 6" aria-hidden>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
