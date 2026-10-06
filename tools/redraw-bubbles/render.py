"""Redraw a Mac OS 9 bubble wallpaper sharp.

1. Take the 5K source's glow without its bubbles (each bubble region refilled from the
   smooth surroundings).
2. Redraw every bubble at the output size: the near ones (bright highlights) with a clean
   rim and crisp highlights, the far ones softly out of focus, as the photo intended.

  python3 render.py <source.jpg> <bubbles.json> <extra.json> <out.jpg> <kind: grape|blue>
"""
import json, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

src, det, extra, out, kind = sys.argv[1:6]
OUT_W = 3840
img5 = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
H5, W5 = img5.shape[:2]
k = OUT_W / W5
OUT_H = round(H5 * k)

bubbles = json.load(open(det))["bubbles"]
fix = json.load(open(extra))
for i in fix.get("far", []):
    bubbles[i]["near"] = False
bubbles = [b for i, b in enumerate(bubbles) if i not in fix.get("drop", [])] + fix.get("add", [])

# ── Work at 1280 for measuring and for the glow ─────────────────────────────────────────
S = 1280 / W5
small = np.asarray(Image.fromarray(img5.astype(np.uint8)).resize((1280, round(H5 * S)), Image.LANCZOS)).astype(np.float32)
Ls = small @ np.array([0.299, 0.587, 0.114], np.float32)
bgL = ndi.gaussian_filter(ndi.median_filter(Ls, size=41), 18)
bright = ndi.gaussian_filter(Ls - bgL, 1.0)


def refine(b):
    """Sphere radius from the two rim highlights; colours sampled from the photo."""
    cx, cy, r = b["x"] * S, b["y"] * S, b["r"] * S
    band = slice(int(max(cy - 0.45 * r, 0)), int(min(cy + 0.45 * r, Ls.shape[0] - 1)) + 1)
    offs = []
    for side in (-1, 1):
        lo, hi = (cx - 2.0 * r, cx - 0.35 * r) if side < 0 else (cx + 0.35 * r, cx + 2.0 * r)
        lo, hi = int(max(lo, 0)), int(min(hi, Ls.shape[1] - 1))
        if hi <= lo:
            continue
        seg = bright[band, lo:hi + 1]
        yy, xx = np.unravel_index(np.argmax(seg), seg.shape)
        if seg[yy, xx] > 12:
            offs.append(abs(lo + xx - cx))
    R = (np.mean(offs) * 1.15) if len(offs) == 2 else r * 1.25
    if kind == "blue" and (b.get("near") is not False) and (b.get("contrast", 0) >= 17 or True):
        R = min(R, 56 * S)  # the navy molecules are all about one size in the photo
    if kind in ("strawberry", "lime"):
        R = r * 0.8
    if kind == "orange":
        R = r * (0.75 if r * 4 < 300 / 4 * 4 and b["r"] < 80 else 0.95)
    if "R" in b:
        R = b["R"] * S
    # body colour: the photo at the centre (5K, a small mean); glow colour around it
    # body colour: the darker part of the photo's sphere (skips the centre sparkle)
    X, Y, rr = int(b["x"]), int(b["y"]), max(int(R / S * 0.5), 4)
    px = img5[max(Y - rr, 0):Y + rr + 1, max(X - rr, 0):X + rr + 1].reshape(-1, 3)
    lum = px @ np.array([0.299, 0.587, 0.114], np.float32)
    body = px[lum <= np.percentile(lum, 30)].mean(0) if kind not in ("strawberry", "lime") else np.median(px[lum <= np.percentile(lum, 60)], 0)
    hl_strength = float(bright[band, int(max(cx - 2 * r, 0)):int(min(cx + 2 * r, 1279)) + 1].max())
    centre_dot = float(bright[int(cy) - 1:int(cy) + 2, int(cx) - 1:int(cx) + 2].max())
    return dict(x=b["x"] * k, y=b["y"] * k, R=R / S * k, body=body, hl=hl_strength,
                dot=centre_dot, contrast=b.get("contrast", 0), near=b.get("near"))


spheres = [refine(b) for b in bubbles]
for s in spheres:
    if s["near"] is None:
        # purple: the near spheres have the bright rim lights; blue: the near ones are the dark navy spheres
        if kind == "grape":
            s["near"] = s["hl"] > 90
        elif kind == "blue":
            s["near"] = s["contrast"] >= 17 or s["hl"] >= 100
        elif kind == "orange":  # the small molecules are near, the big soft ones far
            s["near"] = s["R"] / k < 60
        else:  # strawberry, lime: the beads are all in focus
            s["near"] = True

# ── The glow without its bubbles ────────────────────────────────────────────────────────
mask = np.zeros(Ls.shape, np.float32)
yy, xx = np.mgrid[0:Ls.shape[0], 0:Ls.shape[1]]
for s in spheres:
    cx, cy, R = s["x"] / k * S, s["y"] / k * S, s["R"] / k * S
    mask = np.maximum(mask, (((xx - cx) ** 2 + (yy - cy) ** 2) < (1.75 * R + 4) ** 2).astype(np.float32))
keep = 1 - mask
fill = np.stack([ndi.gaussian_filter(small[..., c] * keep, 22) for c in range(3)], -1)
wsum = ndi.gaussian_filter(keep, 22)[..., None]
fill = fill / np.maximum(wsum, 1e-4)
for _ in range(2):  # a second pass smooths the seams of big holes
    fill = np.where(mask[..., None] > 0, np.stack([ndi.gaussian_filter(fill[..., c], 10) for c in range(3)], -1), fill)
soft = ndi.gaussian_filter(mask, 6)[..., None]
glow_small = small * (1 - soft) + fill * soft

big = np.asarray(Image.fromarray(img5.astype(np.uint8)).resize((OUT_W, OUT_H), Image.LANCZOS)).astype(np.float32)
glow_big = np.asarray(Image.fromarray(np.clip(glow_small, 0, 255).astype(np.uint8)).resize((OUT_W, OUT_H), Image.BICUBIC)).astype(np.float32)
soft_big = np.asarray(Image.fromarray((soft[..., 0] * 255).astype(np.uint8)).resize((OUT_W, OUT_H), Image.BICUBIC)).astype(np.float32)[..., None] / 255
canvas = big * (1 - soft_big) + glow_big * soft_big


# ── Bubbles, drawn at the output size ───────────────────────────────────────────────────
def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def draw(s):
    global canvas
    R = s["R"]
    pad = int(R * 2.2) + 8
    x0, y0 = int(s["x"]) - pad, int(s["y"]) - pad
    x1, y1 = int(s["x"]) + pad, int(s["y"]) + pad
    cx0, cy0 = max(x0, 0), max(y0, 0)
    cx1, cy1 = min(x1, OUT_W), min(y1, OUT_H)
    if cx1 <= cx0 or cy1 <= cy0:
        return
    Y, X = np.mgrid[cy0:cy1, cx0:cx1].astype(np.float32)
    dx, dy = X - s["x"], Y - s["y"]
    d = np.sqrt(dx * dx + dy * dy) / R
    patch = canvas[cy0:cy1, cx0:cx1]
    under = patch.copy()
    body = s["body"]

    if kind in ("strawberry", "lime"):
        canvas[cy0:cy1, cx0:cx1] = bead(s, X, Y, dx, dy, d, under, body, R)
        return
    if s["near"]:
        edge = 1.6 / R  # about a pixel and a half of antialiasing
        a = 1 - smoothstep(1 - edge, 1 + edge, d)
        # glass: the tint is densest at the centre and thins toward the rim, with a faint rim line
        depth = 0.35 + 0.65 * np.sqrt(np.clip(1 - d * d, 0, 1))
        tint = body[None, None, :] * depth[..., None] + under * (1 - depth[..., None])
        rim = np.exp(-((d - 0.975) / 0.03) ** 2)[..., None] * 0.07
        col = tint * (1 - rim) + 255 * rim
        out_ = under * (1 - a[..., None]) + col * a[..., None]
        # the two rim lights, crisp, with a small bloom
        hl = np.zeros_like(d)
        # purple: the rim lights sit just inside the edge; blue: just outside it, like satellites
        off, rx, ry = {"grape": (0.86, 0.13, 0.17), "blue": (1.32, 0.17, 0.17), "orange": (1.28, 0.15, 0.15)}[kind]
        side_strength = 1.0 if kind != "orange" else min(1.0, 0.55 + s["hl"] / 40)
        for side in (-1, 1):
            hx, hy = s["x"] + side * off * R, s["y"]
            e = np.sqrt(((X - hx) / (rx * R)) ** 2 + ((Y - hy) / (ry * R)) ** 2)
            core = 1 - smoothstep(1 - 1.5 / (rx * R), 1 + 1.5 / (rx * R), e)
            bloom = np.exp(-(e / 2.6) ** 2) * 0.45
            hl = np.maximum(hl, np.maximum(core, bloom) * side_strength)
        if kind in ("blue", "orange"):  # these molecules carry a sparkle at the centre
            e = np.sqrt(dx * dx + dy * dy) / (0.13 * R)
            core = 1 - smoothstep(1 - 1.5 / (0.13 * R), 1 + 1.5 / (0.13 * R), e)
            hl = np.maximum(hl, np.maximum(core, np.exp(-(e / 2.0) ** 2) * 0.3))
        hcol = {"grape": [255, 250, 222], "blue": [120, 236, 255], "orange": [255, 228, 78]}[kind]
        hcol = np.array(hcol, np.float32)
        out_ = out_ * (1 - hl[..., None]) + hcol * hl[..., None]
    else:
        # far: the same sphere, out of focus (as the photo has it)
        a = np.exp(-(np.maximum(d - 0.55, 0) / 0.32) ** 2) * (d < 1.6)
        tint = body[None, None, :]
        out_ = under * (1 - 0.85 * a[..., None]) + tint * 0.85 * a[..., None]
        hl = np.zeros_like(d)
        for side in (-1, 1):
            hx, hy = s["x"] + side * 0.86 * R, s["y"]
            e = np.sqrt(((X - hx) / (0.2 * R)) ** 2 + ((Y - hy) / (0.26 * R)) ** 2)
            hl = np.maximum(hl, np.exp(-(e / 1.1) ** 2) * min(1.0, s["hl"] / 120))
        if kind == "orange":  # the far ones keep a faint warm glow at the centre
            hl = np.maximum(hl, np.exp(-(np.sqrt(dx * dx + dy * dy) / (0.28 * R)) ** 2) * 0.3)
        hcol = {"grape": [255, 235, 230], "blue": [170, 255, 220], "orange": [255, 186, 64]}[kind]
        hcol = np.array(hcol, np.float32)
        out_ = out_ * (1 - hl[..., None]) + hcol * hl[..., None]
    canvas[cy0:cy1, cx0:cx1] = out_


def disc(X, Y, x, y, rx, ry):
    """A crisp ellipse (1 inside, antialiased edge) and its distance field."""
    e = np.sqrt(((X - x) / rx) ** 2 + ((Y - y) / ry) ** 2)
    return 1 - smoothstep(1 - 1.5 / min(rx, ry), 1 + 1.5 / min(rx, ry), e), e


def bead(s, X, Y, dx, dy, d, under, body, R):
    """Strawberry and Lime: glossy beads lit from the right (Lime adds cyan side lights)."""
    if not s["near"]:  # a far Lime molecule: a soft body and its two side lights
        a = np.exp(-(np.maximum(d - 0.5, 0) / 0.3) ** 2) * 0.55
        out_ = under * (1 - a[..., None]) + body * a[..., None]
        hl = np.zeros_like(d)
        for side in (-1, 1):
            _, e = disc(X, Y, s["x"] + side * 1.27 * R, s["y"], 0.11 * R, 0.17 * R)
            hl = np.maximum(hl, np.exp(-(e / 1.2) ** 2))
        return out_ * (1 - hl[..., None]) + np.array([130, 240, 255], np.float32) * hl[..., None]
    edge = 1.6 / R
    a = 1 - smoothstep(1 - edge, 1 + edge, d)
    lit = np.clip(0.5 + 0.5 * (dx / R) * 0.9 - 0.15 * (dy / R), 0, 1)  # light from the right
    if kind == "strawberry":
        shade = 0.74 + 0.55 * lit
        col = body[None, None, :] * shade[..., None]
        # the dark crescent on the shadow side
        cres = np.exp(-((d - 0.6) / 0.13) ** 2) * np.clip(-dx / R * 1.6, 0, 1) * 0.4
        col = col * (1 - cres[..., None])
        out_ = under * (1 - a[..., None]) + col * a[..., None]
        core, e = disc(X, Y, s["x"] + 0.24 * R, s["y"] - 0.06 * R, 0.36 * R, 0.36 * R)
        halo = np.exp(-(e / 1.5) ** 2) * 0.35 * a
        hl = np.maximum(core * 0.95, halo)
        hcol = np.array([255, 214, 232], np.float32)
    else:
        depth = 0.45 + 0.55 * np.sqrt(np.clip(1 - d * d, 0, 1))
        col = body[None, None, :] * depth[..., None] + under * (1 - depth[..., None])
        col = col * (0.85 + 0.25 * lit[..., None])
        out_ = under * (1 - a[..., None]) + col * a[..., None]
        core, e = disc(X, Y, s["x"] + 0.27 * R, s["y"] - 0.05 * R, 0.17 * R, 0.17 * R)
        hl = np.maximum(core, np.exp(-(e / 2.2) ** 2) * 0.45)
        hcol = np.array([215, 255, 190], np.float32)
        out_ = out_ * (1 - hl[..., None]) + hcol * hl[..., None]
        hl = np.zeros_like(d)
        for side in (-1, 1):
            c2, e2 = disc(X, Y, s["x"] + side * 1.27 * R, s["y"], 0.1 * R, 0.17 * R)
            hl = np.maximum(hl, np.maximum(c2, np.exp(-(e2 / 2.0) ** 2) * 0.4))
        hcol = np.array([125, 240, 255], np.float32)
    return out_ * (1 - hl[..., None]) + hcol * hl[..., None]


# far ones first, so a near sphere sits in front
for s in sorted(spheres, key=lambda s: s["near"]):
    draw(s)

Image.fromarray(np.clip(canvas, 0, 255).round().astype(np.uint8)).save(out, quality=90, optimize=True, progressive=True)
print(out, (OUT_W, OUT_H), "near", sum(s["near"] for s in spheres), "far", sum(not s["near"] for s in spheres))
for i, s in enumerate(spheres):
    print(i, int(s["x"]), int(s["y"]), "R", round(s["R"], 1), "near" if s["near"] else "far", "hl", round(s["hl"]), "dot", round(s["dot"]))
