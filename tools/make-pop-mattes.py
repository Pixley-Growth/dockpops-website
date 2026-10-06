#!/usr/bin/env python3
"""Cut a live Pop's foreground out of two captures: the same Pop over two known fills.

The Pop's surface is a stack (DockPops/Views/GlassStack.swift): the fill (or the PopFX
layer) at the bottom, then everything that does not depend on it — the sheen, the inner
shadow, the cell plates, the icons, the labels, the bottom bar and the border. Captured
once over Charcoal (#3A3A3C) and once over White (#FFFFFF), both opaque, each pixel is

    C = F + (1 - a) * B        (F premultiplied, B the fill)

so the difference of the two captures gives (1 - a), and either capture gives F. The
result is that stack alone, with transparency, ready to sit over the page's live PopFX
(WebGL) the way it sits over the shader in the app.

The header's name is cut out too (the capture Pop is "Studio (web)"); the page draws the
name itself. Captures come from the promo pop-recorder (ProRes 4444, 2x), a frame from
the steady middle of each take (never a seek: the take's clock does not start at 0).

  python3 tools/make-pop-mattes.py <dir-with-takes>   -> public/pops/<slug>-fg.webp
"""
import json, os, subprocess, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), "public", "pops")

TAKES = {  # slug -> (charcoal take, white take)
    "neon-arc": ("neon-dark", "neon-light"),
    "first-snow": ("snow-dark", "snow-light"),
    "molten": ("molten-dark", "molten-light"),
    "code-downpour": ("code-dark", "code-light"),
    "tiger": ("tiger-dark", "tiger-light"),
}
CHARCOAL = np.array([0x3A, 0x3A, 0x3C], np.float32)
WHITE = np.array([255, 255, 255], np.float32)
BOX = (361, 353, 951, 1267)  # the Pop and its faint shadow inside the take's region (590 x 914)


def middle_frame(path):
    """The take's steady middle frame, straight RGBA."""
    probe = subprocess.run(["ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0",
                            "-show_entries", "stream=nb_read_frames,width,height", "-of", "json", path],
                           capture_output=True, text=True, check=True)
    s = json.loads(probe.stdout)["streams"][0]
    n, w, h = int(s["nb_read_frames"]), int(s["width"]), int(s["height"])
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"select=eq(n\\,{n // 2})",
                          "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgba", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(h, w, 4).astype(np.float32)


# The header's name and its chevron, in the capture's 2x pixels (measured on all five takes:
# rows 36-55, columns 219-370). The page draws the name itself.
HEADER = (slice(32, 60), 210, 380)


def matte(dark, light):
    d, l = dark[..., :3], light[..., :3]
    cover = np.minimum(dark[..., 3], light[..., 3]) / 255.0    # the window's own edge and shadow
    k = (l - d) / (WHITE - CHARCOAL)                            # (1 - a) per channel
    one_minus_a = np.clip(k.mean(axis=2), 0, 1)
    a = 1 - one_minus_a
    fp = np.clip(d - one_minus_a[..., None] * CHARCOAL, 0, 255)  # premultiplied foreground
    rgb = np.where(a[..., None] > 1e-3, fp / np.maximum(a[..., None], 1e-3), 0)
    return np.clip(rgb, 0, 255), a, cover


def inpaint_header(rgb, a, span):
    """Fill the name's columns from the columns either side (the sheen there is smooth)."""
    rows, x0, x1 = span
    for y in range(rows.start, rows.stop):
        for arr in (a, ):
            left, right = arr[y, x0 - 1], arr[y, x1 + 1]
            arr[y, x0:x1 + 1] = np.linspace(left, right, x1 - x0 + 1)
        for c in range(3):
            left, right = rgb[y, x0 - 1, c], rgb[y, x1 + 1, c]
            rgb[y, x0:x1 + 1, c] = np.linspace(left, right, x1 - x0 + 1)


def main(takes_dir):
    os.makedirs(OUT, exist_ok=True)
    report = {}
    for slug, (dark_name, light_name) in TAKES.items():
        dark = middle_frame(os.path.join(takes_dir, f"{dark_name}.mov"))
        light = middle_frame(os.path.join(takes_dir, f"{light_name}.mov"))
        x0, y0, x1, y1 = BOX
        dark, light = dark[y0:y1, x0:x1], light[y0:y1, x0:x1]
        rgb, a, cover = matte(dark, light)
        span = HEADER
        inpaint_header(rgb, a, span)
        alpha = np.clip(a * cover, 0, 1)
        img = np.dstack([rgb, alpha * 255]).round().astype(np.uint8)
        Image.fromarray(img).save(os.path.join(OUT, f"{slug}-fg.webp"), lossless=True, method=6)
        report[slug] = {"meanAlphaInside": round(float(a[100:800, 60:530].mean()), 3)}
        print(slug, report[slug], flush=True)


if __name__ == "__main__":
    main(sys.argv[1])
