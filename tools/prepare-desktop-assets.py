#!/usr/bin/env python3
"""Copy the 6.0 promo's wallpapers and Dock app icons into the site, web-sized.

Wallpapers -> public/wallpapers/<name>.jpg (2560 px wide; next/image serves smaller ones).
Icons      -> public/dock/<name>.webp (128 px; a 54 pt Dock tile at 2x needs 108).
"""
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
PROMO = os.path.normpath(os.path.join(
    SITE, "..", "..", "app-store", "Version 6", "dockpops-6-promo-video", "public"))

WALLPAPERS = ["grape-gravity", "blueberry-oxygen", "tangerine-melt", "ufo-1", "shutters"]
ICONS = ["finder", "safari", "messages", "mail", "music", "photos", "calendar", "notes",
         "settings", "appstore", "dockpops"]


def main():
    os.makedirs(os.path.join(SITE, "public", "wallpapers"), exist_ok=True)
    os.makedirs(os.path.join(SITE, "public", "dock"), exist_ok=True)
    for name in WALLPAPERS:
        im = Image.open(os.path.join(PROMO, "wallpaper", f"{name}.jpg")).convert("RGB")
        if im.width > 2560:
            im = im.resize((2560, round(im.height * 2560 / im.width)), Image.LANCZOS)
        out = os.path.join(SITE, "public", "wallpapers", f"{name}.jpg")
        im.save(out, quality=82, optimize=True, progressive=True)
        print(name, im.size, os.path.getsize(out) // 1024, "KB")
    for name in ICONS:
        im = Image.open(os.path.join(PROMO, "icons", f"{name}.png")).convert("RGBA")
        im = im.resize((128, 128), Image.LANCZOS)
        im.save(os.path.join(SITE, "public", "dock", f"{name}.webp"), quality=90, method=6)
    print(len(ICONS), "icons")


if __name__ == "__main__":
    main()
