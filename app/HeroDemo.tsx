"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* Apple squircle clip-path (objectBoundingBox) — continuous curvature corners */
const SQUIRCLE =
  "M 0.344,0 L 0.656,0 C 0.755,0 0.805,0 0.849,0.015 L 0.858,0.017 C 0.916,0.038 0.962,0.084 0.983,0.142 C 1,0.195 1,0.245 1,0.344 L 1,0.656 C 1,0.755 1,0.805 0.985,0.849 L 0.983,0.858 C 0.962,0.916 0.916,0.962 0.858,0.983 C 0.805,1 0.755,1 0.656,1 L 0.344,1 C 0.245,1 0.195,1 0.151,0.985 L 0.142,0.983 C 0.084,0.962 0.038,0.916 0.017,0.858 C 0,0.805 0,0.755 0,0.656 L 0,0.344 C 0,0.245 0,0.195 0.015,0.151 L 0.017,0.142 C 0.038,0.084 0.084,0.038 0.142,0.017 C 0.195,0 0.245,0 0.344,0 Z";

/* ─── Pop App definitions ─── */
const APPS = [
  { id: "notes",  name: "Notes" },
  { id: "photos", name: "Photos" },
  { id: "maps",   name: "Maps" },
];

/* ─── Pop icon using real macOS icons ─── */
function PopIcon({ id, size }: { id: string; size: number }) {
  return (
    <Image
      src={`/icons/${id}.png`}
      alt=""
      width={256}
      height={256}
      sizes={`${size}px`}
      quality={90}
      style={{ width: size, height: size, filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))" }}
    />
  );
}

/* ─── Dock icon using real macOS icons ─── */
function DockIcon({ type, size = 40 }: { type: string; size?: number }) {
  return (
    <Image
      src={`/icons/${type}.png`}
      alt=""
      width={256}
      height={256}
      sizes={`${size}px`}
      quality={90}
      style={{ width: size, height: size, filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))" }}
    />
  );
}

/* ─── Dynamic Icon — live composite grid of active Pop's apps ─── */
function DynamicDockIcon({ apps, size = 40 }: { apps: { id: string }[]; size?: number }) {
  const padding = size * 0.15;
  const gap = size * 0.05;
  const cols = apps.length <= 4 ? 2 : 3;
  const cellSize = (size - padding * 2 - gap * (cols - 1)) / cols;

  return (
    <div
      style={{
        width: size,
        height: size,
        clipPath: "url(#sq)",
        background: "rgba(40,40,40,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: gap,
        padding: padding,
        alignContent: "center",
        justifyContent: "center",
        filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))",
      }}
    >
      {apps.map(app => (
        <Image
          key={app.id}
          src={`/icons/${app.id}.png`}
          alt=""
          width={64}
          height={64}
          sizes={`${Math.round(cellSize)}px`}
          quality={90}
          style={{
            width: cellSize,
            height: cellSize,
            borderRadius: cellSize * 0.22,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Pop definitions for all 3 Pops ─── */
type PopDef = { key: string; name: string; apps: { id: string; name: string }[] };
const POPS: PopDef[] = [
  { key: "main", name: "My Apps", apps: APPS },
  { key: "work", name: "Office", apps: [
    { id: "word", name: "Word" }, { id: "powerpoint", name: "PowerPoint" },
    { id: "teams", name: "Teams" }, { id: "onedrive", name: "OneDrive" },
  ]},
  { key: "creative", name: "Creative", apps: [
    { id: "pixelmator-pro", name: "Pixelmator" }, { id: "final-cut-pro", name: "Final Cut" },
    { id: "logic-pro", name: "Logic Pro" },
  ]},
];

/* ─── Dock layout (Mail removed — DockPops centered) ─── */
const DOCK_L = ["finder", "safari", "messages"];
const DOCK_R = ["music", "photos"];
const DOCK_NAMES: Record<string, string> = {
  finder: "Finder", safari: "Safari", messages: "Messages",
  music: "Music", photos: "Photos",
};

/* Initial window positions (% of container) */
const WPOS: Record<string, { tp: number; lp: number; w: number }> = {
  notes:  { tp: 20, lp: 24, w: 320 },
  photos: { tp: 16, lp: 57, w: 220 },
  maps:   { tp: 51, lp: 57, w: 230 },
  trash:  { tp: 18, lp: 40, w: 280 },
};

/* ─── Window Content ─── */
function WinBody({ id }: { id: string }) {
  if (id === "notes") return (
    <div className="text-[13px] leading-relaxed">
      <p className="font-semibold text-gray-800 mb-1">Welcome to DockPops!</p>
      <p className="text-gray-500 text-[12px] mb-2">
        Organize your favorite apps into groups called Pops.
        Click a Pop in your Dock to see everything at once.
      </p>
      <div className="border-t border-gray-200 pt-1.5">
        <p className="text-gray-400 text-[10px] leading-snug">
          Icons &copy; their respective developers. Courtesy of macosicons.com
          <br />
          Wallpapers &copy; Apple. Courtesy of 512 Pixels
        </p>
      </div>
    </div>
  );
  if (id === "photos") return (
    <div className="grid grid-cols-3 gap-1">
      {["/bg-blueberry.jpg","/bg-tangerine.jpg","/bg-grape-mission.png","/bg-shutters.jpg","/bg-flower-power.png","/bg-ufo.png"].map((src, i) => (
        <div key={i} className="aspect-square rounded overflow-hidden relative">
          <Image src={src} alt="" fill sizes="60px" className="object-cover" />
        </div>
      ))}
    </div>
  );
  if (id === "trash") return (
    <div className="text-[13px]">
      {/* Finder toolbar */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="#8E8E93">
          <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
        </svg>
        <span className="text-[11px] text-gray-400">1 item</span>
      </div>
      {/* PDF file */}
      <a
        href="/easter-egg.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
      >
        <div className="w-16 h-20 bg-white rounded-md shadow-sm border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-5 bg-red-500 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white tracking-wider">PDF</span>
          </div>
          <span className="text-[20px] mt-3">🎁</span>
        </div>
        <span className="text-[11px] text-gray-700 group-hover:text-blue-600 text-center leading-tight">
          You found me.pdf
        </span>
      </a>
    </div>
  );
  if (id === "maps") return (
    <div className="relative -m-3 overflow-hidden rounded-b-xl" style={{ height: 120 }}>
      <Image src="/map-infinite-loop.png" alt="San Salvador, El Salvador" fill sizes="260px" className="object-cover" />
      <div className="absolute inset-0 flex items-end justify-end p-2">
        <div className="flex flex-col items-center">
          <svg width="16" height="22" viewBox="0 0 14 20" fill="#FF3B30">
            <path d="M7 0C3.13 0 0 3.13 0 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>
          <span className="text-[9px] font-semibold text-gray-700 bg-white/80 rounded px-1 mt-0.5 shadow-sm">San Salvador, El Salvador</span>
        </div>
      </div>
    </div>
  );
  return null;
}

/* ─── Draggable macOS Window ─── */
function MacWindow({
  id, name, active, z, x, y, w,
  onClose, onFocus, onDragStart,
}: {
  id: string; name: string; active: boolean; z: number;
  x: number; y: number; w: number;
  onClose: () => void; onFocus: () => void;
  onDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
}) {
  return (
    <div
      onMouseDown={onFocus}
      className="absolute animate-windowOpen hidden md:block"
      style={{ left: x, top: y, width: w, zIndex: z }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(246,246,246,0.92)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "0.5px solid rgba(0,0,0,0.12)",
          boxShadow: active
            ? "0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.1)"
            : "0 4px 16px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        {/* Title bar — drag handle */}
        <div
          className="h-7 flex items-center px-2.5 border-b border-black/5 select-none"
          style={{
            background: active ? "rgba(228,228,228,0.85)" : "rgba(244,244,244,0.85)",
            cursor: "grab",
          }}
          onMouseDown={e => { e.stopPropagation(); onFocus(); onDragStart(e); }}
          onTouchStart={e => { onFocus(); onDragStart(e); }}
        >
          <div className="flex gap-[6px]">
            <button
              onClick={e => { e.stopPropagation(); onClose(); }}
              onMouseDown={e => e.stopPropagation()}
              className="w-3 h-3 rounded-full cursor-pointer hover:brightness-90"
              style={{ background: active ? "#FF5F57" : "#D4D4D4" }}
            />
            <div className="w-3 h-3 rounded-full" style={{ background: active ? "#FEBC2E" : "#D4D4D4" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: active ? "#28C840" : "#D4D4D4" }} />
          </div>
          <span className="flex-1 text-center text-[11px] font-medium" style={{ color: active ? "#333" : "#999" }}>
            {name}
          </span>
          <div className="w-[42px]" />
        </div>
        <div className="p-3"><WinBody id={id} /></div>
      </div>
    </div>
  );
}

/* ─── Window state ─── */
interface Win { id: string; z: number; x: number; y: number }

/* ─── Main Component ─── */
export default function HeroDemo({ easterEgg = false }: { easterEgg?: boolean } = {}) {
  // openIcon = which Dock icon's popover is showing; centers on that icon
  const [openIcon, setOpenIcon] = useState<string | null>(null);
  // carouselPage = which pop the carousel is displaying (only used when openIcon === "main")
  const [carouselPage, setCarouselPage] = useState(0);
  const [arrowOffset, setArrowOffset] = useState(0);
  const [wins, setWins] = useState<Win[]>([]);
  const [nextZ, setNextZ] = useState(10);
  const [hint, setHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const popIconRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const popoverRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);

  // The pop data currently displayed
  function getVisiblePop(): PopDef | null {
    if (!openIcon) return null;
    if (openIcon === "main") return POPS[carouselPage];
    return POPS.find(p => p.key === openIcon) ?? null;
  }

  function updateArrowOffset(iconKey: string) {
    const iconEl = popIconRefs.current[iconKey];
    const popoverEl = popoverRef.current;
    if (!iconEl || !popoverEl) {
      requestAnimationFrame(() => {
        const el = popIconRefs.current[iconKey];
        const pEl = popoverRef.current;
        if (el && pEl) {
          const iconRect = el.getBoundingClientRect();
          const popRect = pEl.getBoundingClientRect();
          setArrowOffset(iconRect.left + iconRect.width / 2 - (popRect.left + popRect.width / 2));
        }
      });
      return;
    }
    const iconRect = iconEl.getBoundingClientRect();
    const popRect = popoverEl.getBoundingClientRect();
    setArrowOffset(iconRect.left + iconRect.width / 2 - (popRect.left + popRect.width / 2));
  }

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Initial open + auto-cycle through each Dock icon
  const ICON_CYCLE: string[] = ["main", "work", "creative"];

  useEffect(() => {
    const t = setTimeout(() => { setOpenIcon("main"); setHint(false); }, 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (userInteracted) return;
    autoplayRef.current = setInterval(() => {
      setOpenIcon(prev => {
        const idx = ICON_CYCLE.indexOf(prev ?? "main");
        return ICON_CYCLE[(idx + 1) % ICON_CYCLE.length];
      });
    }, 3000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [userInteracted]);

  function handleIconClick(iconKey: string) {
    setUserInteracted(true);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (openIcon === iconKey) {
      setOpenIcon(null);
    } else {
      setOpenIcon(iconKey);
      if (iconKey === "main") setCarouselPage(0);
    }
  }

  function carouselPrev() {
    setUserInteracted(true);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    setCarouselPage(prev => (prev - 1 + POPS.length) % POPS.length);
  }

  function carouselNext() {
    setUserInteracted(true);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    setCarouselPage(prev => (prev + 1) % POPS.length);
  }

  // Recalculate arrow when openIcon changes (always centers on the icon)
  useEffect(() => {
    if (openIcon) {
      requestAnimationFrame(() => updateArrowOffset(openIcon));
    }
  }, [openIcon]);

  /* Drag handlers */
  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragRef.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const { id, startX, startY, origX, origY } = dragRef.current;
    setWins(p => p.map(w => w.id === id ? { ...w, x: origX + clientX - startX, y: origY + clientY - startY } : w));
  }, []);

  const handleDragEnd = useCallback(() => {
    dragRef.current = null;
    document.body.style.cursor = "";
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  /* Dev tool: Ctrl+Shift+P copies window positions to clipboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect || wins.length === 0) return;
        const positions = wins.map(w => ({
          id: w.id,
          tp: Math.round(w.y / rect.height * 100),
          lp: Math.round(w.x / rect.width * 100),
        }));
        const text = positions.map(p => `${p.id}: { tp: ${p.tp}, lp: ${p.lp} }`).join("\n");
        navigator.clipboard.writeText(text);
        console.log("Window positions copied:\n" + text);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [wins]);

  function startDrag(id: string, e: React.MouseEvent | React.TouchEvent) {
    const win = wins.find(w => w.id === id);
    if (!win) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragRef.current = { id, startX: clientX, startY: clientY, origX: win.x, origY: win.y };
    document.body.style.cursor = "grabbing";
  }

  function open(id: string) {
    if (wins.some(w => w.id === id)) { front(id); return; }
    const rect = containerRef.current?.getBoundingClientRect();
    const pos = WPOS[id];
    const x = rect ? rect.width * pos.lp / 100 : 60;
    const y = rect ? rect.height * pos.tp / 100 : 80;
    setWins(p => [...p, { id, z: nextZ, x, y }]);
    setNextZ(z => z + 1);
  }
  function close(id: string) { setWins(p => p.filter(w => w.id !== id)); }
  function front(id: string) {
    setWins(p => p.map(w => w.id === id ? { ...w, z: nextZ } : w));
    setNextZ(z => z + 1);
  }

  const topId = wins.length ? wins.reduce((a, b) => a.z > b.z ? a : b).id : null;

  return (
    <>
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="sq" clipPathUnits="objectBoundingBox">
            <path d={SQUIRCLE} />
          </clipPath>
        </defs>
      </svg>

      {/* Wallpaper */}
      <div className="absolute inset-0">
        <Image src="/bg-blueberry.jpg" alt="" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.25) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div ref={containerRef} className="relative h-full flex flex-col">

        {/* Branding */}
        <div className="flex-1 flex flex-col items-center justify-center pt-[clamp(1rem,4vh,3rem)] px-6">
          <Image
            src="/appicon.png" alt="DockPops"
            width={240} height={240}
            sizes="128px"
            className="w-24 h-24 md:w-32 md:h-32 rounded-[22px] md:rounded-[28px] shadow-xl mb-[clamp(0.5rem,1.5vh,1rem)]"
            quality={95} priority
          />
          <h1
            className="text-6xl md:text-7xl font-bold text-white mb-[clamp(0.25rem,0.8vh,0.5rem)]"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.3)" }}
          >
            DockPops
          </h1>
          <p
            className="text-lg md:text-xl text-white/70 font-medium mb-[clamp(0.5rem,2vh,1.5rem)]"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}
          >
            Organize your Dock like your iPhone
          </p>
<a href="https://apps.apple.com/us/app/dockpops/id6759999009?mt=12&ct=website_hero" className="hover:opacity-90 transition-opacity" onClick={() => { window.gtag?.('event', 'download_click', { location: 'hero' }); }}>
            <Image src="/mac-app-store-badge.svg" alt="Download on the Mac App Store" width={200} height={60} className="h-12 w-auto" />
          </a>
        </div>

        {/* Windows */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
          <div className="relative w-full h-full">
            {wins.map(w => {
              const app = APPS.find(a => a.id === w.id);
              const name = app?.name ?? (w.id === "trash" ? "Trash" : w.id);
              return (
                <div key={w.id} className="pointer-events-auto">
                  <MacWindow
                    id={w.id} name={name} active={w.id === topId}
                    z={w.z} x={w.x} y={w.y} w={WPOS[w.id].w}
                    onClose={() => close(w.id)} onFocus={() => front(w.id)}
                    onDragStart={e => startDrag(w.id, e)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Dock zone */}
        <div className="relative flex flex-col items-center pb-3 z-30">

          <p className={`absolute bottom-full mb-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-[13px] text-white/50 transition-opacity duration-700 ${hint ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ zIndex: 41 }}>
            Click the DockPops icon ↓
          </p>

          {/* Pop — absolutely positioned above dock, no layout shift */}
          {(() => {
            const pop = getVisiblePop();
            const isOpen = !!pop;
            const isCarousel = openIcon === "main";
            const cols = 3;
            return (
              <div
                ref={popoverRef}
                className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"}`}
                style={{ transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)", zIndex: 40 }}
              >
                <div
                  className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(20px) saturate(150%)",
                    WebkitBackdropFilter: "blur(20px) saturate(150%)",
                    border: "0.5px solid rgba(255,255,255,0.35)",
                  }}
                >
                  <div className="px-4 pt-3 pb-1.5">
                    <span className="text-[13px] font-semibold text-white/90">{pop?.name ?? ""}</span>
                  </div>
                  <div className="px-3 pb-2" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 4 }}>
                    {pop?.apps.map(app => (
                      <button
                        key={app.id}
                        onClick={() => open(app.id)}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                      >
                        <PopIcon id={app.id} size={52} />
                        <span className="text-[11px] text-white/80">{app.name}</span>
                      </button>
                    ))}
                  </div>
                  {/* Nav dots + arrows — only in carousel mode (main icon) */}
                  {isCarousel && (
                    <div className="flex items-center justify-center gap-2 px-3 pb-2.5 pt-1">
                      <button onClick={carouselPrev} className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <div className="flex items-center gap-1.5">
                        {POPS.map((p, i) => (
                          <button
                            key={p.key}
                            onClick={() => { setUserInteracted(true); if (autoplayRef.current) clearInterval(autoplayRef.current); setCarouselPage(i); }}
                            className="transition-all cursor-pointer"
                            style={{
                              width: i === carouselPage ? 16 : 6,
                              height: 6,
                              borderRadius: 3,
                              background: i === carouselPage ? "rgba(59,130,246,0.9)" : "rgba(255,255,255,0.3)",
                            }}
                          />
                        ))}
                      </div>
                      <button onClick={carouselNext} className="text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  )}
                </div>
                {/* Glass arrow — offset to point at active icon */}
                <div
                  className="absolute -bottom-[7px] w-[14px] h-[14px] rotate-45 -z-10"
                  style={{
                    left: `calc(50% + ${arrowOffset}px)`,
                    transform: "translateX(-50%) rotate(45deg)",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(20px) saturate(150%)",
                    WebkitBackdropFilter: "blur(20px) saturate(150%)",
                    border: "0.5px solid rgba(255,255,255,0.35)",
                  }}
                />
              </div>
            );
          })()}

          {/* Dock */}
          <div
            ref={dockRef}
            className="rounded-[18px] px-1.5 py-1 flex items-end gap-0.5"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px) saturate(150%)",
              WebkitBackdropFilter: "blur(20px) saturate(150%)",
              border: "0.5px solid rgba(255,255,255,0.25)",
            }}
          >
            {DOCK_L.map(type => (
              <div key={type} className="p-1 flex flex-col items-center" title={DOCK_NAMES[type]}>
                <DockIcon type={type} />
                <div className="w-1 h-1 rounded-full mt-0.5 bg-transparent" />
              </div>
            ))}

            {/* DockPops — main icon */}
            <div className="p-1 flex flex-col items-center">
              <button
                ref={el => { popIconRefs.current["main"] = el; }}
                onClick={() => handleIconClick("main")}
                className="cursor-pointer active:scale-90 transition-transform"
                title="DockPops"
              >
                <Image
                  src="/appicon.png" alt="DockPops"
                  width={240} height={240}
                  sizes="40px"
                  className="w-10 h-10"
                  quality={95}
                  style={{ clipPath: "url(#sq)" }}
                />
              </button>
              <div className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${openIcon === "main" ? "bg-black/60" : "bg-transparent"}`} />
            </div>

            {/* Other Pops with their own Dock icons */}
            <div className="p-1 flex flex-col items-center">
              <button
                ref={el => { popIconRefs.current["work"] = el; }}
                onClick={() => handleIconClick("work")}
                className="cursor-pointer active:scale-90 transition-transform"
                title="Office"
              >
                <DynamicDockIcon apps={POPS[1].apps} />
              </button>
              <div className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${openIcon === "work" ? "bg-black/60" : "bg-transparent"}`} />
            </div>
            <div className="p-1 flex flex-col items-center">
              <button
                ref={el => { popIconRefs.current["creative"] = el; }}
                onClick={() => handleIconClick("creative")}
                className="cursor-pointer active:scale-90 transition-transform"
                title="Creative"
              >
                <DynamicDockIcon apps={POPS[2].apps} />
              </button>
              <div className={`w-1 h-1 rounded-full mt-0.5 transition-colors ${openIcon === "creative" ? "bg-black/60" : "bg-transparent"}`} />
            </div>

            {DOCK_R.map(type => (
              <div key={type} className="p-1 flex flex-col items-center" title={DOCK_NAMES[type]}>
                <DockIcon type={type} />
                <div className="w-1 h-1 rounded-full mt-0.5 bg-transparent" />
              </div>
            ))}

            <div className="w-px h-7 bg-white/20 mx-1 self-center" />
            {easterEgg ? (
              <div className="p-1 flex flex-col items-center">
                <button
                  className="cursor-pointer active:scale-90 transition-transform"
                  title="Trash"
                  onClick={() => open("trash")}
                >
                  <DockIcon type="trash-full" />
                </button>
                <div className="w-1 h-1 rounded-full mt-0.5 bg-transparent" />
              </div>
            ) : (
              <div className="p-1 flex flex-col items-center" title="Trash">
                <DockIcon type="trash" />
                <div className="w-1 h-1 rounded-full mt-0.5 bg-transparent" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
