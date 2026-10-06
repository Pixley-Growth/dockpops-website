#!/usr/bin/env python3
"""Draw each website Pop's Dock tile the way DockPops draws a Dynamic Dock icon.

A port of DockIconCompositor.composite + insetForDock (DockPops/Services/), fed with
the theme values in DockPops/Models/ThemeCatalog.swift and the PopFX Dock looks in
DockLook.derived / EffectSchema.Palette. Same canvas (512), corner radius (0.22),
light base (0.95 grey), fill at the theme's opacity, the adaptive white scrim on vivid
fills, the calibrated border, the 3 x 3 grid (padding 0.15, spacing 0.04, cell inset
0.08, icon corner 0.2) and the 824/1024 Dock inset. Icons are the Studio Pop's nine
apps, exported by tools/export-app-icons.swift.

  python3 tools/make-dock-tiles.py   -> public/pops/<theme>-tile.webp
"""
import colorsys, os
import numpy as np
from PIL import Image, ImageChops, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
ICONS = os.path.join(HERE, "studio-icons")
OUT = os.path.join(SITE, "public", "pops")

ORDER = ["freeform", "image-playground", "keynote", "motion", "music", "photo-booth",
         "photos", "pixelmator-pro", "final-cut-pro"]

CANVAS = 512
SS = 2  # supersampling
GLASSY = 0.35


def hexc(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def lin(a, b, angle=135, coverage=1.0):
    return {"kind": "linear", "stops": [(hexc(a) if isinstance(a, str) else a, 0.0),
                                        (hexc(b) if isinstance(b, str) else b, 1.0)],
            "angle": angle, "opacity": GLASSY + coverage * (1 - GLASSY)}


def solid(c, coverage=1.0):
    return {"kind": "solid", "color": hexc(c), "opacity": GLASSY + coverage * (1 - GLASSY)}


def border(stops, width_pt):
    if isinstance(stops, str):
        stops = [(hexc(stops), 0.5)]
    else:
        stops = [(hexc(c), loc) for c, loc in stops]
    return {"stops": stops, "px": width_pt * CANVAS / 192.0}


PRIDE = [("#E40303", 0.0), ("#FF8C00", 0.2), ("#FFED00", 0.4), ("#008026", 0.6),
         ("#004DFF", 0.8), ("#732982", 1.0)]

# theme slug -> (fill, border); None fill = Default theme, the legacy dark tile + white ring
THEMES = {
    "default": (None, "legacy"),
    "gold-leaf": (lin("#241B0C", "#0C0A06"), border([("#F5D272", 0), ("#B8860B", 1)], 6)),
    "forest": (lin("#10241B", "#1E3D2F"), border([("#8B5A2B", 0), ("#4E3218", 1)], 6)),
    "ocean": (lin("#0F3D3E", "#145DA0"), border("#4FD1C5", 3)),
    "blush": (solid("#FFF0EB"), border("#E7A9A0", 3)),
    "terminal": (solid("#0A0F0A"), border("#4AF626", 6)),
    "noir": (solid("#101012"), border("#FFFFFF", 3)),
    "sunset": (lin("#FF7E5F", "#FEB47B"), border("#FFF1E6", 6)),
    "grape": (lin("#2A1338", "#431C5E"), border("#9B5DE5", 6)),
    "slate": (lin("#1C1F26", "#2B303B"), border("#5B6472", 3)),
    "parchment": (solid("#FBF3E3"), border("#B89B5E", 3)),
    "pride": ({"kind": "linear", "stops": [(hexc(c), l) for c, l in PRIDE], "angle": 135,
               "opacity": GLASSY + 0.6 * (1 - GLASSY)}, border(PRIDE, 6)),
    # PopFX: the theme's Dock look, the effect's palette top to bottom (DockLook.derived)
    "neon-arc": (lin((0.98, 0.62, 0.32), (0.45, 0.22, 0.60), 90), border("#B39CFF", 3)),
    "first-snow": (lin((1.0, 1.0, 1.0), (0.85, 0.92, 1.0), 90), border("#AFC6E6", 3)),
    "molten": (lin((0.98, 0.45, 0.15), (0.30, 0.10, 0.35), 90), border("#FF7A3D", 3)),
    "code-downpour": (lin((0.35, 0.95, 0.45), (0.05, 0.20, 0.08), 90), border("#2E7D3A", 3)),
    "tiger": (lin("#ED8524", "#F7EBCC", 90), border("#B85A1A", 3)),
}


def rounded_mask(size, rect, radius):
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).rounded_rectangle(rect, radius=radius, fill=255)
    return m


def gradient_image(size, stops, start, end):
    """A linear gradient from `start` to `end` (pixel points), stops as (rgb, location)."""
    ys, xs = np.mgrid[0:size, 0:size].astype(np.float32) + 0.5
    d = np.array(end, np.float32) - np.array(start, np.float32)
    t = ((xs - start[0]) * d[0] + (ys - start[1]) * d[1]) / max(float(d @ d), 1e-6)
    t = np.clip(t, 0, 1)
    stops = sorted(stops, key=lambda s: s[1])
    locs = np.array([s[1] for s in stops], np.float32)
    rgb = np.zeros((size, size, 3), np.float32)
    for ch in range(3):
        vals = np.array([s[0][ch] for s in stops], np.float32)
        rgb[..., ch] = np.interp(t, locs, vals) if len(stops) > 1 else vals[0]
    return Image.fromarray((rgb * 255 + 0.5).astype(np.uint8), "RGB")


def vivid(stops):
    return any(colorsys.rgb_to_hsv(*c)[1] > 0.35 for c, _ in stops)


def composite(theme):
    fill, brd = THEMES[theme]
    S = CANVAS * SS
    radius = CANVAS * 0.22 * SS
    tile = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    full = (0, 0, S - 1, S - 1)
    mask = rounded_mask(S, full, radius)

    if fill is None:  # legacy, no Pop colour: dark translucent
        tile.paste((38, 38, 38, round(0.85 * 255)), (0, 0), mask)
    else:
        tile.paste((242, 242, 242, 255), (0, 0), mask)  # light base 0.95
        if fill["kind"] == "solid":
            layer = Image.new("RGB", (S, S), tuple(round(v * 255) for v in fill["color"]))
            stops = [(fill["color"], 0)]
        else:
            a = np.radians(fill["angle"])
            dx, dy, h = np.cos(a), np.sin(a), S / 2
            layer = gradient_image(S, fill["stops"], (h - dx * h, h - dy * h), (h + dx * h, h + dy * h))
            stops = fill["stops"]
        layer = layer.convert("RGBA")
        layer.putalpha(mask.point(lambda v: round(v * fill["opacity"])))
        tile.alpha_composite(layer)
        if vivid(stops):
            scrim = Image.new("RGBA", (S, S), (255, 255, 255, 0))
            scrim.putalpha(mask.point(lambda v: round(v * 0.14)))
            tile.alpha_composite(scrim)

    # Border: a ring inside the edge.
    if brd == "legacy":
        w = CANVAS * 3.0 / 256.0 * SS
        ring_color = [((1.0, 1.0, 1.0), 0)]
        ring_alpha = 0.35
    else:
        w = brd["px"] * SS
        ring_color = brd["stops"]
        ring_alpha = 1.0
    inner = rounded_mask(S, (w, w, S - 1 - w, S - 1 - w), max(0, radius - w))
    ring = ImageChops.subtract(mask, inner)
    if len(ring_color) == 1:
        ring_img = Image.new("RGB", (S, S), tuple(round(v * 255) for v in ring_color[0][0]))
    else:  # linear across the ring, top-left to bottom-right
        ring_img = gradient_image(S, ring_color, (0, 0), (S, S))
    ring_img = ring_img.convert("RGBA")
    ring_img.putalpha(ring.point(lambda v: round(v * ring_alpha)))
    tile.alpha_composite(ring_img)

    # The 3 x 3 icon grid.
    pad, gap = CANVAS * 0.15, CANVAS * 0.04
    cell = (CANVAS - pad * 2 - gap * 2) / 3
    inset = cell * 0.08
    size = cell - inset * 2
    for i, name in enumerate(ORDER):
        x = (pad + (i % 3) * (cell + gap) + inset) * SS
        y = (pad + (i // 3) * (cell + gap) + inset) * SS
        px = round(size * SS)
        icon = Image.open(os.path.join(ICONS, f"{name}.png")).convert("RGBA").resize((px, px), Image.LANCZOS)
        clip = rounded_mask(px, (0, 0, px - 1, px - 1), px * 0.2)
        icon.putalpha(ImageChops.multiply(icon.getchannel("A"), clip))
        tile.alpha_composite(icon, (round(x), round(y)))

    tile = tile.resize((CANVAS, CANVAS), Image.LANCZOS)
    # insetForDock: the 824/1024 margin every macOS app icon has.
    inner_px = round(CANVAS * 824 / 1024)
    out = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    m = (CANVAS - inner_px) // 2
    out.alpha_composite(tile.resize((inner_px, inner_px), Image.LANCZOS), (m, m))
    return out


def main():
    os.makedirs(OUT, exist_ok=True)
    for theme in THEMES:
        composite(theme).resize((256, 256), Image.LANCZOS).save(
            os.path.join(OUT, f"{theme}-tile.webp"), quality=92, method=6)
        print(theme)


if __name__ == "__main__":
    main()
