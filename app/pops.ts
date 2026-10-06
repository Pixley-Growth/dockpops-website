// The real Pops the site shows. Every one is the app itself: demo Pops built in DockPops
// and captured with a transparent background at 2x (tools/make-demo-pops.py stages their
// contents, tools/process-demo-takes.py and tools/make-pop-mattes.py turn the takes into
// public/pops/). `width` / `height` are the capture's pixels; the page draws a Pop at half
// that, its size on a Mac.
//
// A Pop's look is described in the inspector's own words (Theme, View, Fill, Border,
// Labels — see DockPops/Models/ThemeCatalog.swift), which the Dock tile's tooltip names.

export type View = "grid" | "list" | "tiles";
export type Fill = "glass" | "color" | "gradient" | "popfx";
export type Border = "none" | "single" | "gradient";
export type Labels = "system" | "rounded" | "serif" | "mono" | "papyrus";
/** The live PopFX themes (app/components/livepop/looks.ts). */
export type LiveTheme = "neon-arc" | "first-snow" | "molten" | "code-downpour" | "tiger";

export type PopAsset = {
  /** Its files: public/pops/<slug>-poster.webp, -tile.webp, and -fg.webp when live. */
  slug: string;
  /** The Pop's name (a live Pop's header is drawn by the page). */
  name: string;
  /** The theme's name, as the app shows it. */
  theme: string;
  width: number;
  height: number;
  /** A PopFX Pop: its theme runs live in WebGL under the captured foreground. */
  fx?: LiveTheme;
  view: View;
  fill: Fill;
  /** The PopFX effect, for a PopFX fill. */
  effect?: string;
  border: Border;
  labels: Labels;
};

const live = { width: 590, height: 914, view: "grid" as const, fill: "popfx" as const, border: "single" as const };

export const ALL_POPS: PopAsset[] = [
  { slug: "studio", name: "Studio", theme: "Default", width: 576, height: 900, view: "grid", fill: "glass", border: "none", labels: "system" },
  { slug: "spring-launch", name: "Spring Launch", theme: "Gold Leaf", width: 906, height: 670, view: "list", fill: "gradient", border: "gradient", labels: "serif" },
  { slug: "weekend", name: "Weekend", theme: "Neon Arc", ...live, fx: "neon-arc", effect: "Arc", labels: "mono" },
  { slug: "travel", name: "Travel", theme: "First Snow", ...live, fx: "first-snow", effect: "Snow", labels: "rounded" },
  { slug: "office", name: "Office", theme: "Forest", width: 602, height: 926, view: "grid", fill: "gradient", border: "gradient", labels: "serif" },
  { slug: "writing", name: "Writing", theme: "Blush", width: 870, height: 1002, view: "tiles", fill: "color", border: "single", labels: "rounded" },
  { slug: "code", name: "Code", theme: "Code Downpour", ...live, fx: "code-downpour", effect: "Glyph Rain", labels: "mono" },
  { slug: "photo", name: "Photo", theme: "Molten", ...live, fx: "molten", effect: "Blobs", labels: "rounded" },
  { slug: "utilities", name: "Utilities", theme: "Terminal", width: 882, height: 1014, view: "tiles", fill: "color", border: "single", labels: "mono" },
  // The Studio Pop in Tiger (the first live capture).
  { slug: "tiger", name: "Studio", theme: "Tiger", ...live, fx: "tiger", effect: "Tiger", labels: "serif" },
];

export const popBySlug = (slug: string) => ALL_POPS.find((p) => p.slug === slug)!;

/** The Pops in the hero's Dock, left to right, the order it plays them in. */
export const HERO_POPS = [
  "studio", "spring-launch", "weekend", "travel", "office", "writing", "code", "photo", "utilities",
].map(popBySlug);

/** On a phone the Dock holds fewer: these. */
export const PHONE_POPS = new Set(["studio", "spring-launch", "weekend", "travel", "writing", "photo"]);

// ── The themes showcase: the Studio Pop in each classic theme, as the app draws it ────────

/** A theme as the app's theme chooser draws it: the fill, the border, the label colour.
 *  The fill is always an image (a one-colour gradient for a solid): it is a background
 *  layer over the border, and only the last layer may be a plain colour. */
export type Swatch = { fill: string; border: string; label: string };

export type ThemeShot = { src: string; width: number; height: number };

export type ThemeLook = {
  theme: string;
  swatch: Swatch;
  /** The same Studio Pop captured in this theme, in every view. */
  views: Record<View, ThemeShot>;
};

/** public/pops/themes/<view>-<id>.webp, at 2x. A theme with a thick border draws 6 pt
 *  further out on every side; the Pop inside is the same size. */
const shots = (id: string, thickBorder: boolean): Record<View, ThemeShot> => {
  const e = thickBorder ? 12 : 0;
  return {
    grid: { src: `themes/grid-${id}.webp`, width: 590 + e, height: 914 + e },
    list: { src: `themes/list-${id}.webp`, width: 894 + e, height: 658 + e },
    tiles: { src: `themes/tiles-${id}.webp`, width: 870 + e, height: 1002 + e },
  };
};
const PRIDE = "#E40303, #FF8C00, #FFED00, #008026, #004DFF, #732982";

// Colours from DockPops/Models/ThemeCatalog.swift.
export const THEME_LOOKS: ThemeLook[] = [
  { theme: "Forest", swatch: { fill: "linear-gradient(135deg, #10241B, #1E3D2F)", border: "linear-gradient(135deg, #8B5A2B, #4E3218)", label: "#EFE7D0" }, views: shots("forest", true) },
  { theme: "Gold Leaf", swatch: { fill: "linear-gradient(135deg, #241B0C, #0C0A06)", border: "linear-gradient(135deg, #F5D272, #B8860B)", label: "#E7C873" }, views: shots("gold-leaf", true) },
  { theme: "Ocean", swatch: { fill: "linear-gradient(135deg, #0F3D3E, #145DA0)", border: "#4FD1C5", label: "#DAF3FF" }, views: shots("ocean", false) },
  { theme: "Sunset", swatch: { fill: "linear-gradient(135deg, #FF7E5F, #FEB47B)", border: "#FFF1E6", label: "#3B1F4A" }, views: shots("sunset", true) },
  { theme: "Blush", swatch: { fill: "linear-gradient(#FFF0EB, #FFF0EB)", border: "#E7A9A0", label: "#7A2E8F" }, views: shots("blush", false) },
  { theme: "Parchment", swatch: { fill: "linear-gradient(#FBF3E3, #FBF3E3)", border: "#B89B5E", label: "#6B4226" }, views: shots("parchment", false) },
  { theme: "Pride", swatch: { fill: `linear-gradient(135deg, ${PRIDE})`, border: `linear-gradient(135deg, ${PRIDE})`, label: "#FFFFFF" }, views: shots("pride", true) },
  { theme: "Terminal", swatch: { fill: "linear-gradient(#0A0F0A, #0A0F0A)", border: "#4AF626", label: "#4AF626" }, views: shots("terminal", true) },
];
