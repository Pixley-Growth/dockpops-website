"use client";

import Image from "next/image";
import { useState } from "react";
import ABHeadline from "./ABHeadline";
import { useReveal } from "./useReveal";

/* ───────────────────────────────────────────────────────────────────────────
   Feature Story — the alive, headline-feature section that replaced the flat
   product shots + the 200-line spec list.

   Each row leads with one feature (priority order, bread-and-butter first;
   SmartyPops is deliberately demoted last + smaller). Media is a still today;
   every media slot is <video poster=…>-ready, so when the marketing clips land
   we swap <Image> → <video poster={same}> with zero layout change.
   ─────────────────────────────────────────────────────────────────────────── */

type Feature = {
  key: string;
  eyebrow: string;
  title: string;
  blurb: string;
  /** Still shown today. ASSET-TODO swaps note the clip that replaces it. */
  img: string;
  /** Soft accent glow behind the media — alternating warm/cool = "rooms of light". */
  accent: string;
  /** ASSET-TODO: the clip to drop into this slot later. */
  clip?: string;
};

const FEATURES: Feature[] = [
  {
    key: "pops",
    eyebrow: "The big idea",
    title: "Group anything by intent.",
    blurb:
      "Apps, files, folders, and links in one Pop — organized the way you work, not the way the disk is.",
    img: "/pop-coding.png",
    accent: "59,130,246", // blue
    clip: "How do You Pop",
  },
  {
    key: "multi",
    eyebrow: "One tap each",
    title: "Every Pop, its own Dock tile.",
    blurb:
      "Pin a Pop to the Dock and click straight into it — no carousel, no menus.",
    img: "/pop-music.png",
    accent: "20,184,166", // teal
    clip: "Multiple Dock Icons (to record)",
  },
  {
    key: "quicklook",
    eyebrow: "No Finder needed",
    title: "Peek without opening.",
    blurb:
      "Press Space to preview any file. Click a folder to drill in — all inside the Pop.",
    img: "/pop-utilities.png",
    accent: "245,158,11", // amber
    clip: "Quick Look + folders (to record)",
  },
  {
    key: "menubar",
    eyebrow: "Your call",
    title: "Live in the menu bar instead.",
    blurb:
      "Prefer a clean Dock? Run DockPops from the menu bar — same Pops, up top.",
    img: "/pop-iwork.png",
    accent: "139,92,246", // violet
    clip: "Menu Bar mode (to record)",
  },
];

const SMARTY: Feature = {
  key: "smarty",
  eyebrow: "Optional · on-device",
  title: "Suggestions, if you want them.",
  blurb:
    "On-device AI proposes apps that belong together. Private, optional, never required.",
  img: "/screen-bonus.png",
  accent: "120,120,130", // muted — quiet on purpose
  clip: "SmartyPops",
};

/* ── Eyebrow label ── */
function Eyebrow({ children, accent }: { children: string; accent: string }) {
  return (
    <span
      className="text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{ color: `rgb(${accent})` }}
    >
      {children}
    </span>
  );
}

/* ── Media card: glass panel holding the still (video-ready) ── */
function MediaCard({
  feature,
  delayMs = 90,
  visible,
}: {
  feature: Feature;
  delayMs?: number;
  visible: boolean;
}) {
  return (
    <div
      className={`reveal ${visible ? "is-visible" : ""} relative`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {/* Soft accent glow behind the card — the "room of light". */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[40px] blur-3xl"
        style={{ background: `radial-gradient(circle at 50% 50%, rgba(${feature.accent},0.28), transparent 70%)` }}
      />
      <div
        className="glass-lift drift relative rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          border: "0.5px solid rgba(255,255,255,0.18)",
        }}
      >
        {/* ASSET-TODO: when "{feature.clip}.mov" → web mp4/webm is ready, swap
            this <Image> for <video autoPlay muted loop playsInline poster={feature.img} />.
            Same poster keeps the layout identical and covers reduced-motion. */}
        <div className="relative aspect-[4/3]">
          <Image
            src={feature.img}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            quality={90}
            className="object-contain p-3"
          />
        </div>
      </div>
    </div>
  );
}

/* ── One feature row (alternating sides) ── */
function FeatureRow({ feature, flip }: { feature: Feature; flip: boolean }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center py-14 md:py-20">
      {/* Copy — lands first (no delay) */}
      <div className={`reveal ${visible ? "is-visible" : ""} ${flip ? "md:order-2" : ""}`}>
        <Eyebrow accent={feature.accent}>{feature.eyebrow}</Eyebrow>
        <h3 className="text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight">{feature.title}</h3>
        <p className="text-lg text-white/60 leading-relaxed max-w-md">{feature.blurb}</p>
      </div>
      {/* Media — follows ~90ms later */}
      <div className={flip ? "md:order-1" : ""}>
        <MediaCard feature={feature} visible={visible} />
      </div>
    </div>
  );
}

/* ── "Make it yours" — the one interactive moment after the hero ── */
const TINTS = [
  { name: "Blueberry", rgb: "59,130,246" },
  { name: "Grape", rgb: "168,85,247" },
  { name: "Tangerine", rgb: "249,115,22" },
  { name: "Sea", rgb: "20,184,166" },
];

function MakeItYoursRow() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [tint, setTint] = useState(TINTS[0]);
  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center py-14 md:py-20">
      <div className={`reveal ${visible ? "is-visible" : ""}`}>
        <Eyebrow accent={tint.rgb}>4.3 · make it yours</Eyebrow>
        <h3 className="text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight">Dress it however you like.</h3>
        <p className="text-lg text-white/60 leading-relaxed max-w-md mb-6">
          Colors, custom Dock icons, grid density, hover intensity, sizes. Tap a color &mdash; the Pop updates live.
        </p>
        <div className="flex gap-3" role="group" aria-label="Pop color">
          {TINTS.map((t) => (
            <button
              key={t.name}
              onClick={() => setTint(t)}
              aria-label={t.name}
              aria-pressed={tint.name === t.name}
              className="w-9 h-9 rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              style={{
                background: `rgb(${t.rgb})`,
                boxShadow: tint.name === t.name ? `0 0 0 2px #000, 0 0 0 4px rgb(${t.rgb})` : "none",
              }}
            />
          ))}
        </div>
      </div>
      <div className={`reveal ${visible ? "is-visible" : ""}`} style={{ transitionDelay: "90ms" }}>
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-8 rounded-[40px] blur-3xl transition-all duration-500"
            style={{ background: `radial-gradient(circle at 50% 50%, rgba(${tint.rgb},0.34), transparent 70%)` }}
          />
          {/* Live mini-Pop that re-tints on swatch click. */}
          <div
            className="glass-lift relative rounded-3xl p-6 transition-all duration-500"
            style={{
              background: `linear-gradient(160deg, rgba(${tint.rgb},0.22), rgba(${tint.rgb},0.06))`,
              border: `0.5px solid rgba(${tint.rgb},0.5)`,
              backdropFilter: "blur(20px) saturate(140%)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
            }}
          >
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl transition-colors duration-500"
                  style={{ background: `rgba(${tint.rgb}, ${0.35 + (i % 3) * 0.12})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Demoted SmartyPops row — smaller + cooler so the layout says "bonus" ── */
function SmartyRow() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="max-w-2xl mx-auto text-center pt-10 pb-4">
      <div className={`reveal ${visible ? "is-visible" : ""}`}>
        <Eyebrow accent={SMARTY.accent}>{SMARTY.eyebrow}</Eyebrow>
        <h3 className="text-2xl font-semibold mt-3 mb-3">{SMARTY.title}</h3>
        <p className="text-base text-white/50 leading-relaxed max-w-md mx-auto">{SMARTY.blurb}</p>
      </div>
    </div>
  );
}

export default function FeatureStory() {
  return (
    <section id="features" className="relative bg-black overflow-hidden">
      {/* Subtle drifting backdrop glow so the section never feels static. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% -10%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(1000px 500px at -10% 110%, rgba(168,85,247,0.10), transparent 60%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
        {/* Section intro — keeps the A/B headline test running. */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <ABHeadline className="text-4xl md:text-5xl font-bold mb-5" />
          <p className="text-lg text-white/55 leading-relaxed">
            Everything you need to group, open, and customize — the way you think.
          </p>
        </div>

        {FEATURES.map((f, i) => (
          <FeatureRow key={f.key} feature={f} flip={i % 2 === 1} />
        ))}

        <MakeItYoursRow />

        <SmartyRow />
      </div>
    </section>
  );
}
