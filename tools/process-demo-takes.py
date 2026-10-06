#!/usr/bin/env python3
"""Turn the demo Pops' takes into the site's files (public/pops/):

  <slug>-poster.webp   the Pop as captured (a still Pop is only this; a PopFX Pop falls back to it)
  <slug>-fg.webp       a PopFX Pop's foreground, cut from its Charcoal and White takes
  <slug>-tile.webp     its Dock tile: the app's own composite (PopIcons), with the Dock's inset

Takes come from the promo pop-recorder via a small wrapper (one steady frame per take, RGBA
PNG, and the app's Dock icon composite copied beside it).

  python3 tools/process-demo-takes.py <takes-dir>
"""
import os, sys
import numpy as np
from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import importlib.util
spec = importlib.util.spec_from_file_location("mattes", os.path.join(os.path.dirname(__file__), "make-pop-mattes.py"))
mattes = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mattes)

OUT = mattes.OUT

STILLS = {  # slug -> take
    "office": "office-forest",
    "spring-launch": "launch-goldleaf-list",
    "writing": "writing-blush-tiles",
    "utilities": "utilities-terminal-tiles",
}
LIVE = {  # slug -> take prefix (<p>-fx, <p>-dark, <p>-light)
    "weekend": "weekend",
    "travel": "travel",
    "code": "code",
    "photo": "photo",
}


def load(path):
    return np.asarray(Image.open(path).convert("RGBA")).astype(np.float32)


def bbox(img):
    a = img[..., 3] > 8
    ys, xs = np.where(a)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def save_rgba(arr, path, lossless=False):
    Image.fromarray(np.clip(arr, 0, 255).round().astype(np.uint8)).save(
        path, lossless=lossless, quality=90, method=6)


def tile(src, dst):
    """DockIconCompositor.insetForDock: the 512 composite drawn at 824/1024 in the middle."""
    raw = Image.open(src).convert("RGBA").resize((512, 512), Image.LANCZOS)
    inner = round(512 * 824 / 1024)
    out = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
    m = (512 - inner) // 2
    out.alpha_composite(raw.resize((inner, inner), Image.LANCZOS), (m, m))
    out.resize((256, 256), Image.LANCZOS).save(dst, quality=92, method=6)


def main(takes):
    for slug, take in STILLS.items():
        img = load(os.path.join(takes, f"{take}.png"))
        x0, y0, x1, y1 = bbox(img)
        save_rgba(img[y0:y1, x0:x1], os.path.join(OUT, f"{slug}-poster.webp"))
        tile(os.path.join(takes, f"{take}-dockicon.png"), os.path.join(OUT, f"{slug}-tile.webp"))
        print(slug, "still", (x1 - x0, y1 - y0))
    for slug, p in LIVE.items():
        fx = load(os.path.join(takes, f"{p}-fx.png"))
        x0, y0, x1, y1 = bbox(fx)
        save_rgba(fx[y0:y1, x0:x1], os.path.join(OUT, f"{slug}-poster.webp"))
        dark = load(os.path.join(takes, f"{p}-dark.png"))[y0:y1, x0:x1]
        light = load(os.path.join(takes, f"{p}-light.png"))[y0:y1, x0:x1]
        rgb, a, cover = mattes.matte(dark, light)
        mattes.inpaint_header(rgb, a, mattes.HEADER)
        alpha = np.clip(a * cover, 0, 1)
        save_rgba(np.dstack([rgb, alpha * 255]), os.path.join(OUT, f"{slug}-fg.webp"), lossless=True)
        tile(os.path.join(takes, f"{p}-fx-dockicon.png"), os.path.join(OUT, f"{slug}-tile.webp"))
        print(slug, "live", (x1 - x0, y1 - y0))


if __name__ == "__main__":
    main(sys.argv[1])
