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
  /** Still shown today, OR the poster frame when `video` is set. */
  img: string;
  /** Autoplay-muted-loop clip. When set, renders <video poster={img}> instead of <Image>. */
  video?: string;
  /** Soft accent glow behind the media — alternating warm/cool = "rooms of light". */
  accent: string;
  /** ASSET-TODO: the clip to drop into this slot later. */
  clip?: string;
};

const FEATURES: Feature[] = [
  {
    key: "pops",
    eyebrow: "Pops",
    title: "Group anything.",
    blurb:
      "Apps, files, folders, and links — together in one Pop you open from the Dock.",
    img: "/pop-work.png", // real shot: apps + Reports folder + an .html file in one Pop
    accent: "59,130,246", // blue
    clip: "How do You Pop",
  },
  {
    key: "multi",
    eyebrow: "Dock icons",
    title: "Each Pop, its own icon.",
    blurb:
      "Pin any Pop to the Dock and click straight into it — no carousel, no menus.",
    img: "/pop-dockicons.png", // real shot: open Work Pop above a Dock row of 7 distinct Pop icons
    accent: "20,184,166", // teal
    clip: "Multiple Dock Icons",
  },
  {
    key: "quicklook",
    eyebrow: "Files & Folders",
    title: "Browse files and folders.",
    blurb:
      "Open files, drill into folders, and Quick Look anything with Space — all without leaving the Pop.",
    img: "/pop-utilities.png", // reduced-motion / poster fallback
    video: "/browse-files.mp4",
    accent: "245,158,11", // amber
    clip: "Quick Look + folders",
  },
  {
    key: "draganddrop",
    eyebrow: "Drag & Drop",
    title: "Drag it onto the Dock.",
    blurb:
      "Drop apps, files, or folders from Finder straight onto a Pop's Dock icon to add them — then reorder right in the popover.",
    img: "/pop-iwork.png", // reduced-motion / poster fallback
    video: "/drag-drop.mp4",
    accent: "139,92,246", // violet
    clip: "Drag onto Dock icon",
  },
];

/* ── Full feature catalog (the 50+ list) — collapsed disclosure that closes the
   features section. Ported here from the pricing section so "more features"
   lives with the features. Content stays in the DOM (SEO + screen readers). ── */
type CatalogGroup = {
  emoji: string;
  category: string;
  features?: { text: string; free: boolean }[];
  subsections?: { title: string; features: string[] }[];
};

const CATALOG: CatalogGroup[] = [
  {
    emoji: "🖱️",
    category: "Dock Icon & Access",
    features: [
      { text: "Click the DockPops icon to open a popover of apps and files", free: true },
      { text: "Pops work with Dock on bottom, left, or right side of screen", free: true },
      { text: "Dynamic Icon — Dock icon shows a live grid of your active Pop's apps", free: true },
      { text: "Adjustable grid density (Auto / 2×2 / 3×3 / 4×4)", free: false },
      { text: "4 premium app icon variants — Amber, Blue, Slate, Violet", free: false },
    ],
  },
  {
    emoji: "🔗",
    category: "Multiple Dock Icons",
    features: [
      { text: "Every Pop becomes a Siri & Spotlight shortcut — \"Show [Pop Name] in DockPops\"", free: true },
      { text: "Pin Pops to your Dock via the free DockPops Companion app (recommended)", free: true },
      { text: "Or via macOS Shortcuts — guided 4-step walkthrough in the app", free: true },
      { text: "Dynamic Icon works on every linked Pop", free: true },
    ],
  },
  {
    emoji: "🚀",
    category: "Launch Apps, Files & Folders",
    features: [
      { text: "Click an app icon to launch it", free: true },
      { text: "Click a file icon to open the file", free: true },
      { text: "Files and folders show rich QuickLook thumbnail previews", free: true },
      { text: "Click a folder to browse its contents inside the Pop", free: false },
      { text: "\"Open in Finder\" cell at the end of every folder", free: false },
      { text: "\"Open All\" launches every item in a Pop simultaneously", free: false },
      { text: "Arm-then-confirm step before Open All (global toggle)", free: false },
    ],
  },
  {
    emoji: "👀",
    category: "Quick Look & Keyboard",
    features: [
      { text: "Press Space over any file for an inline Quick Look preview", free: true },
      { text: "Arrow keys move between items inside a Pop", free: true },
      { text: "Enter opens the focused item", free: true },
      { text: "Esc closes the preview, drills out, or closes the Pop", free: true },
      { text: "Preview header — Reveal in Finder, Open in default app, Close", free: true },
      { text: "Popover resizes to fit folders with lots of items", free: false },
    ],
  },
  {
    emoji: "📺",
    category: "Menu Bar Mode",
    features: [
      { text: "Run DockPops from the menu bar instead of the Dock", free: true },
      { text: "Choose: a click opens your Pop carousel, or a quick menu", free: true },
      { text: "Per-Pop color extends through the menu-bar popover", free: true },
      { text: "Companion Poplets open instantly — no Dock flash", free: true },
    ],
  },
  {
    emoji: "⭐",
    category: "Premium Features",
    subsections: [
      {
        title: "🧠 SmartyPops",
        features: [
          "Swipe, dismiss, and regenerate SmartyPop previews",
          "Save SmartyPop suggestions to your Pops",
        ],
      },
      {
        title: "📌 Pop Out Windows",
        features: [
          "Pop Out any Pop as a floating, always-on-top window",
          "Launch items directly from Pop Out windows",
        ],
      },
    ],
  },
  {
    emoji: "👆",
    category: "Pop Carousel",
    features: [
      { text: "Swipe between 2 Pops", free: true },
      { text: "Show up to 6 apps", free: true },
      { text: "Navigation arrows and clickable page dots", free: true },
      { text: "Change animation speed (Slow / Medium / Fast)", free: true },
      { text: "Swipe between 20 Pops", free: false },
      { text: "Show up to 25 apps, files or folders", free: false },
      { text: "Sort items Alphabetically, by Most Used or Recently Added", free: false },
      { text: "Hide Pops from the carousel — keep them as Dock icons only", free: false },
    ],
  },
  {
    emoji: "🤏",
    category: "Drag & <s>Drop</s> Pop",
    features: [
      { text: "Drag apps from Finder onto the DockPops icon to add to the active Pop", free: true },
      { text: "Drag onto any Pop's Dock icon to add to that specific Pop", free: true },
      { text: "Spring-load — drag-hover a Pop's icon to open it, then drop inside", free: true },
      { text: "Reorder items inside an open Pop by dragging — no Organizer needed", free: true },
      { text: "Remove items by dragging them off the Pop popover", free: true },
      { text: "Save links from any app via the Share extension", free: true },
      { text: "Drag files and folders from Finder (premium content types)", free: false },
      { text: "Pop picker when dragging into multiple Pops", free: false },
      { text: "Drag multiple items from Finder at once", free: false },
    ],
  },
  {
    emoji: "🔍",
    category: "App Browser",
    features: [
      { text: "+ button and Browse button open the App Browser", free: true },
      { text: "Live search bar", free: true },
      { text: "Category filters", free: true },
      { text: "Sort & filter apps", free: true },
      { text: "Click an app to add or remove from current Pop", free: true },
      { text: "\"Not in Any Pop\" filter", free: false },
      { text: "\"Recently Installed\" filter", free: false },
    ],
  },
  {
    emoji: "🗂️",
    category: "Organizing Pops",
    features: [
      { text: "Reorder items by dragging within the editor grid", free: true },
      { text: "Remove icons from browser or Pop preview", free: true },
      { text: "Rename Pops by swiping right on the name or clicking it on the Pop preview", free: true },
      { text: "Reorder Pops by dragging in the sidebar", free: true },
      { text: "Swipe and right-click for rename and delete", free: true },
      { text: "Create a new Pop from the button or ⌘N", free: true },
      { text: "Item count and limit", free: true },
    ],
  },
  {
    emoji: "🔒",
    category: "Private by Design",
    features: [
      { text: "No data collection — zero analytics, zero tracking", free: true },
      { text: "No network access — everything runs locally on your Mac", free: true },
      { text: "Fully sandboxed with minimal permissions", free: true },
    ],
  },
  {
    emoji: "✨",
    category: "And More",
    features: [
      { text: "Now in German and Spanish", free: true },
      { text: "Built-in Help guide, right inside the app", free: true },
      { text: "Easy onboarding with starter Pop templates", free: true },
      { text: "Right-click actions on Dock icon", free: true },
      { text: "Reduce Motion respected — no spring animations", free: true },
      { text: "Light and dark mode support", free: true },
      { text: "Access Settings via ⌘, or gear button", free: true },
      { text: "\"Launch at login\" toggle", free: true },
    ],
  },
];

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
        {/* Video slots autoplay muted+looped; reduced-motion users get the poster
            still instead (the @media query below swaps them). Same box either way. */}
        <div className="relative aspect-[4/3]">
          {feature.video ? (
            <>
              {/* p-3 inset + rounded-xl (12px) on the video = corners concentric
                  with the card's rounded-3xl (24px) minus the 12px inset. */}
              <div className="motion-clip absolute inset-0 p-3">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={feature.img}
                  preload="metadata"
                  aria-hidden
                  className="h-full w-full rounded-xl object-cover"
                >
                  <source src={feature.video} type="video/mp4" />
                </video>
              </div>
              {/* Reduced-motion fallback still — hidden unless prefers-reduced-motion. */}
              <div className="motion-still absolute inset-0 p-3">
                <div className="relative h-full w-full">
                  <Image
                    src={feature.img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    quality={90}
                    className="rounded-xl object-cover"
                  />
                </div>
              </div>
            </>
          ) : (
            <Image
              src={feature.img}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              quality={90}
              className="object-contain p-3"
            />
          )}
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
/* Each swatch swaps the real Work-Pop screenshot to its tint. rgb matches the shot. */
const TINTS = [
  { name: "Blueberry", rgb: "59,130,246", img: "/work-blue.png" },
  { name: "Mint", rgb: "52,199,89", img: "/work-green.png" },
  { name: "Tangerine", rgb: "249,115,22", img: "/work-orange.png" },
  { name: "Grape", rgb: "168,85,247", img: "/work-purple.png" },
];

function MakeItYoursRow() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [tint, setTint] = useState(TINTS[0]);
  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center py-14 md:py-20">
      <div className={`reveal ${visible ? "is-visible" : ""}`}>
        <Eyebrow accent={tint.rgb}>Customize</Eyebrow>
        <h3 className="text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight">Make it yours.</h3>
        <p className="text-lg text-white/60 leading-relaxed max-w-md mb-6">
          Colors, custom Dock icons, grid density, hover, and sizes. Pick a color to see it change.
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
          {/* Real Work Pop that swaps its tint screenshot on swatch click. */}
          <div
            className="glass-lift relative rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px) saturate(140%)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
              border: "0.5px solid rgba(255,255,255,0.18)",
            }}
          >
            <div className="relative aspect-[4/3]">
              {TINTS.map((t) => (
                <Image
                  key={t.name}
                  src={t.img}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 520px"
                  quality={90}
                  className="object-contain p-3 transition-opacity duration-500"
                  style={{ opacity: tint.name === t.name ? 1 : 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Full feature catalog — collapsed disclosure that closes the section ── */
function FeatureCatalog() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="mt-12 pt-12 border-t border-white/10">
      <details className={`reveal ${visible ? "is-visible" : ""} group text-left`}>
        <summary className="cursor-pointer list-none text-center text-sm font-semibold text-white/50 hover:text-white/80 transition-colors select-none">
          <span className="inline-flex items-center gap-1.5">
            See all 50+ features
            <svg className="w-3.5 h-3.5 transition-transform group-open:rotate-180" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </summary>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left mt-8">
          {CATALOG.map((group, gi) => (
            <div key={gi} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
              <h4 className="font-semibold text-white mb-3 text-sm tracking-wider" dangerouslySetInnerHTML={{ __html: `${group.emoji} ${group.category}` }} />
              {group.subsections ? (
                <div className="space-y-4">
                  {group.subsections.map((sub, si) => (
                    <div key={si}>
                      <p className="text-xs font-semibold text-white/50 mb-1.5">{sub.title}</p>
                      <ul className="space-y-1.5">
                        {sub.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2 text-[13px] leading-snug">
                            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider shrink-0 px-1.5 py-0.5 rounded text-green-400 bg-green-400/10">
                              Pro
                            </span>
                            <span className="text-white/60">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {group.features?.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-[13px] leading-snug">
                      {f.free ? (
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                      ) : (
                        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider shrink-0 px-1.5 py-0.5 rounded text-green-400 bg-green-400/10">
                          Pro
                        </span>
                      )}
                      <span className="text-white/60">{f.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </details>
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
            The features you&apos;ll actually use.
          </p>
        </div>

        {FEATURES.map((f, i) => (
          <FeatureRow key={f.key} feature={f} flip={i % 2 === 1} />
        ))}

        <MakeItYoursRow />

        <FeatureCatalog />
      </div>
    </section>
  );
}
