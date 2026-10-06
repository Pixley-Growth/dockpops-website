#!/usr/bin/env python3
"""Turn the 6.0 promo's transparent Pop captures into web assets.

For each Pop: a seamless loop (the tail cross-faded into the head) encoded twice,
HEVC with alpha (.mov, Safari) and VP9 with alpha (.webm, Chrome and Firefox),
plus a poster (.webp, alpha). A still Pop gets only the poster. Dock tiles come from
tools/make-dock-tiles.py.

Source: app-store/Version 6/dockpops-6-promo-video/public/footage (real captures,
cursor hidden, 2x). Output: public/pops/<slug>*.

  python3 tools/encode-pop-footage.py            # every Pop
  python3 tools/encode-pop-footage.py neon-arc   # just one
  python3 tools/encode-pop-footage.py --posters  # posters only, no video
"""
import os, subprocess, sys, shutil, tempfile
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
FOOTAGE = os.path.normpath(os.path.join(
    SITE, "..", "..", "app-store", "Version 6", "dockpops-6-promo-video", "public", "footage"))
OUT = os.path.join(SITE, "public", "pops")

FPS = 30
FADE = 30  # frames of tail cross-faded into the head (1 s)

# slug: (source, crop box). Crops are the Pop plus the faint shadow the capture carries.
FX_BOX = (45, 37, 635, 951)
MONTAGE = "cut1/montage/{:02d}.png"   # one still per classic look (export-cut-v1.sh)
GRID_BOX = (179, 125, 781, 1051)
GRID_BOX_B = (185, 137, 775, 1051)
LIST_BOX = (27, 381, 933, 1051)
TILES_BOX = (45, 49, 915, 1051)
POPS = {
    "studio":         ("shots/hero-pop.png", (32, 50, 608, 950)),
    "neon-arc":       ("cut1/h-neon", FX_BOX),
    "first-snow":     ("cut1/h-snow", FX_BOX),
    "code-downpour":  ("cut1/h-code", FX_BOX),
    "molten":         ("cut1/h-molten", FX_BOX),
    "tiger":          ("cut1/d-tiger", FX_BOX),
    "forest":         (MONTAGE.format(0), GRID_BOX),
    "sunset":         (MONTAGE.format(1), GRID_BOX),
    "ocean":          (MONTAGE.format(2), GRID_BOX_B),
    "noir":           (MONTAGE.format(3), GRID_BOX_B),
    "pride":          (MONTAGE.format(4), GRID_BOX),
    "gold-leaf":      (MONTAGE.format(5), GRID_BOX),
    "gold-leaf-list": (MONTAGE.format(14), LIST_BOX),
    "grape-list":     (MONTAGE.format(7), LIST_BOX),
    "terminal-list":  (MONTAGE.format(8), LIST_BOX),
    "terminal-tiles": (MONTAGE.format(9), (39, 37, 921, 1051)),
    "parchment-tiles": (MONTAGE.format(10), TILES_BOX),
    "slate-tiles":    (MONTAGE.format(11), TILES_BOX),
    "blush-tiles":    (MONTAGE.format(12), TILES_BOX),
    "blush":          (MONTAGE.format(13), GRID_BOX_B),
}


def frames_of(src):
    path = os.path.join(FOOTAGE, src)
    if os.path.isfile(path):
        return [Image.open(path).convert("RGBA")]
    names = sorted(n for n in os.listdir(path) if n.endswith(".png"))
    return [Image.open(os.path.join(path, n)).convert("RGBA") for n in names]


def seamless(frames):
    """Cross-fade the last FADE frames into the first FADE: frame N-FADE-1 flows into frame 0."""
    n = len(frames)
    if n <= FADE * 2:
        return frames
    body = frames[:n - FADE]
    tail = frames[n - FADE:]
    out = list(body)
    for i in range(FADE):
        t = (i + 1) / (FADE + 1)
        out[i] = Image.blend(tail[i], body[i], t)
    return out


def encode(slug, frames, tmp):
    for i, f in enumerate(frames):
        f.save(os.path.join(tmp, f"{i:04d}.png"))
    pattern = os.path.join(tmp, "%04d.png")
    mov = os.path.join(OUT, f"{slug}.mov")
    webm = os.path.join(OUT, f"{slug}.webm")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", pattern,
                    "-c:v", "hevc_videotoolbox", "-allow_sw", "1", "-alpha_quality", "0.8",
                    "-b:v", "3500k", "-tag:v", "hvc1", "-pix_fmt", "bgra", "-an", mov], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", pattern,
                    "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "30",
                    "-row-mt", "1", "-deadline", "good", "-auto-alt-ref", "0", "-an", webm], check=True)
    return mov, webm


def main(only, posters_only=False):
    os.makedirs(OUT, exist_ok=True)
    for slug, (src, box) in POPS.items():
        if only and slug not in only:
            continue
        raw = frames_of(src)
        frames = [f.crop(box) for f in raw]
        if len(frames) > 1:
            frames = seamless(frames)
        frames[0].save(os.path.join(OUT, f"{slug}-poster.webp"), quality=88, method=6)
        line = f"{slug}: {frames[0].size[0]}x{frames[0].size[1]}, {len(frames)} frame(s)"
        if len(frames) > 1 and not posters_only:
            tmp = tempfile.mkdtemp(prefix=f"pop-{slug}-")
            try:
                mov, webm = encode(slug, frames, tmp)
                line += f", mov {os.path.getsize(mov) // 1024} KB, webm {os.path.getsize(webm) // 1024} KB"
            finally:
                shutil.rmtree(tmp)
        print(line, flush=True)


if __name__ == "__main__":
    args = sys.argv[1:]
    main({a for a in args if not a.startswith("--")}, posters_only="--posters" in args)
