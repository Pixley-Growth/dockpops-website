// The five PopFX themes the site runs live, with the app's own values:
// DockPops/Models/ThemeCatalog.swift (the theme: base, label colour, overrides),
// DockPops/Models/EffectSchema.swift (the effect's defaults and house palette) and
// DockPops/Views/PopFX/PopFXPointerModel.swift (how the material meets the hand).
import type { Family } from "./glsl";

export type Touch = {
  radius: number;
  strength: number;
  lingers: number;
  springBack: number;
  speed: number;
  /** A stamp is laid after this much movement (touch space). */
  spacing: number;
};

const RIPPLE: Touch = { radius: 0.12, strength: 0.02, lingers: 0.6, springBack: 0.68, speed: 0.58, spacing: 0.012 };
const COMB: Touch = { radius: 0.09, strength: 0.01, lingers: 1.13, springBack: 1.0, speed: 0, spacing: 0.012 };
const SHOVE: Touch = { radius: 0.06, strength: 0.1, lingers: 10, springBack: 1.0, speed: 0, spacing: 0.05 };
const STILL: Touch = { radius: 0, strength: 0, lingers: 0.02, springBack: 1.0, speed: 0, spacing: 0.012 };

export const expiry = (t: Touch) => (t.springBack >= 1 ? t.lingers : 4 * t.lingers);

type RGB = [number, number, number];
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as RGB;

export type LiveLook = {
  family: Family;
  style: number;
  intensity: number;
  speed: number;
  /** The family's third control: blur, size, density, hair length. */
  p3: number;
  /** Glyph size. */
  p4: number;
  /** Trail. */
  p5: number;
  drift: [number, number];
  c0: RGB;
  c1: RGB;
  c2: RGB;
  /** An overlay effect's base (Snow, Glyph Rain): drawn under it, the effect added on top. */
  base: null | { kind: "color"; c: RGB } | { kind: "linear"; a: RGB; b: RGB; angle: number };
  touch: Touch;
  /** The theme's label colour: the header's name is drawn in it. */
  label: string;
  /** Where the clock starts: Snow's pile settles over the first half minute. */
  startTime: number;
};

export const LOOKS: Record<string, LiveLook> = {
  "neon-arc": {
    family: "bands", style: 1, intensity: 0.6, speed: 0.5, p3: 0, p4: 0, p5: 0, drift: [0, 1],
    c0: [0.98, 0.62, 0.32], c1: [0.45, 0.22, 0.6], c2: [0, 0, 0],
    base: null, touch: RIPPLE, label: "#F4F1FF", startTime: 8,
  },
  molten: {
    family: "blobs", style: 0, intensity: 0, speed: 0.5, p3: 0.3, p4: 0, p5: 0, drift: [0, 1],
    c0: [0.98, 0.45, 0.15], c1: [0.3, 0.1, 0.35], c2: [0, 0, 0],
    base: null, touch: RIPPLE, label: "#FFE8D6", startTime: 20,
  },
  "first-snow": {
    family: "particles", style: 0, intensity: 0.6, speed: 0.5, p3: 0.5, p4: 0, p5: 0, drift: [0, 1],
    c0: [1, 1, 1], c1: [0.85, 0.92, 1.0], c2: [0, 0, 0],
    base: { kind: "linear", a: hex("#16233A"), b: hex("#2C4A6E"), angle: 135 },
    touch: SHOVE, label: "#F4F8FF", startTime: 60,
  },
  "code-downpour": {
    family: "glyphRain", style: 0, intensity: 0.6, speed: 0.5, p3: 1, p4: 0.5, p5: 0.5, drift: [0, 1],
    c0: [0.35, 0.95, 0.45], c1: [0.05, 0.2, 0.08], c2: [0, 0, 0],
    base: { kind: "color", c: hex("#050A06") }, touch: STILL, label: "#F0FFF4", startTime: 12,
  },
  tiger: {
    family: "fur", style: 0, intensity: 0.66, speed: 0.3, p3: 0.35, p4: 0, p5: 0, drift: [0, 1],
    c0: hex("#ED8524"), c1: hex("#F7EBCC"), c2: hex("#14100D"),
    base: null, touch: COMB, label: "#1A0E06", startTime: 4,
  },
};

/** Glyph Rain's built-in set (GlyphAtlas.builtInGlyphs). */
export const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCXYZ";
