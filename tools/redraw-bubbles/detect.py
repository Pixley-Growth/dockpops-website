"""Find the bubbles in a Mac OS 9 bubble wallpaper: dark (or pale) discs on a smooth glow.

Works at 1280 x 960 (the 5K source / 4). Prints each bubble (x, y, r in 5K px, contrast,
highlight brightness) and writes an overlay for checking.
"""
import json, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB")
W5, H5 = im.size
small = np.asarray(im.resize((1280, 960), Image.LANCZOS)).astype(np.float32)
L = small @ np.array([0.299, 0.587, 0.114], np.float32)

# The glow alone: a median then a wide blur, so bubbles drop out of it.
bg = ndi.gaussian_filter(ndi.median_filter(L, size=41), 18)
res = L - bg

# Bodies: a disc that differs from the glow (darker for most; pale far ones are a
# smaller lift). Smooth first so a body is one blob, highlights excluded by sign.
dark = ndi.gaussian_filter(-res, 2.0)
bright = ndi.gaussian_filter(res, 1.0)
thr_dark = float(sys.argv[3]) if len(sys.argv) > 3 else 6.0
lab, n = ndi.label(dark > thr_dark)
bubbles = []
for i in range(1, n + 1):
    ys, xs = np.where(lab == i)
    area = len(xs)
    if area < 25:
        continue
    cy, cx = ys.mean(), xs.mean()
    r = np.sqrt(area / np.pi)
    w, h = np.ptp(xs) + 1, np.ptp(ys) + 1
    if w > 4 * h or h > 4 * w or r > 60:
        continue
    # highlights: brightest residual in a ring around the body, left and right
    y0, y1 = int(max(cy - 1.6 * r, 0)), int(min(cy + 1.6 * r, 959))
    x0, x1 = int(max(cx - 2.2 * r, 0)), int(min(cx + 2.2 * r, 1279))
    hl = float(bright[y0:y1 + 1, x0:x1 + 1].max())
    contrast = float(dark[ys, xs].mean())
    bubbles.append(dict(x=cx * 4, y=cy * 4, r=r * 4, contrast=contrast, highlight=hl))

bubbles.sort(key=lambda b: (b["y"], b["x"]))
json.dump(dict(size=[W5, H5], bubbles=bubbles), open(out + ".json", "w"), indent=1)
ov = im.resize((1280, 960)).copy()
d = ImageDraw.Draw(ov)
for k, b in enumerate(bubbles):
    x, y, r = b["x"] / 4, b["y"] / 4, b["r"] / 4
    d.ellipse([x - r, y - r, x + r, y + r], outline=(255, 255, 0))
    d.text((x + r + 2, y - 6), str(k), fill=(255, 255, 0))
ov.save(out + "-overlay.jpg", quality=88)
print(len(bubbles), "bubbles")
for k, b in enumerate(bubbles):
    print(k, {key: round(v, 1) for key, v in b.items()})
