#!/usr/bin/env python3
"""Stage the demo Pops the website captures: one folder per Pop holding links to its apps
and its own demo files and folders, so a Pop is filled in one Add Files… (select all, Add).

Fictional, generic content only — no personal data, no real brands beyond Apple's own apps.
Reuses the promo's moodboards and launch files (~/Documents/DockPops Demo) where they fit.

  python3 tools/make-demo-pops.py      -> ~/Documents/DockPops Web Demo/<Pop>/
"""
import os, shutil
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HOME = os.path.expanduser("~")
OUT = os.path.join(HOME, "Documents", "DockPops Web Demo")
PROMO_DEMO = os.path.join(HOME, "Documents", "DockPops Demo")
HERE = os.path.dirname(os.path.abspath(__file__))
WALLPAPERS = os.path.join(os.path.dirname(HERE), "public", "wallpapers")

SYS = "/System/Applications"
UTIL = "/System/Applications/Utilities"
APPS = "/Applications"
XCODE_APPS = "/Applications/Xcode.app/Contents/Applications"
XCODE_DEV_APPS = "/Applications/Xcode.app/Contents/Developer/Applications"

FONT = "/System/Library/Fonts/SFNS.ttf"


def font(size, weight="Bold"):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def app(*candidates):
    for c in candidates:
        if os.path.isdir(c):
            return c
    raise FileNotFoundError(candidates)


# ── Documents ───────────────────────────────────────────────────────────────────────────

def document_pdf(path, title, subtitle, accent, lines=22, kind="doc"):
    """A one-page PDF whose Quick Look thumbnail reads as a real document."""
    W, H = 1700, 2200
    page = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(page)
    if kind == "pass":
        d.rectangle([0, 0, W, 520], fill=accent)
        d.text((120, 150), title, font=font(120), fill="white")
        d.text((120, 320), subtitle, font=font(64, "Medium"), fill=(255, 255, 255))
        for i, (k, v) in enumerate([("FROM", "SFO"), ("TO", "LIS"), ("SEAT", "14A"), ("GATE", "B22")]):
            x = 120 + i * 380
            d.text((x, 640), k, font=font(44, "Semibold"), fill=(140, 140, 150))
            d.text((x, 700), v, font=font(110), fill=(25, 25, 30))
        for i in range(60):  # a barcode
            w = 6 + (i * 37 % 5) * 4
            d.rectangle([120 + i * 24, 1500, 120 + i * 24 + w, 1900], fill=(20, 20, 24))
    else:
        d.rectangle([0, 0, W, 300], fill=accent)
        d.text((120, 380), title, font=font(110), fill=(22, 22, 28))
        d.text((124, 530), subtitle, font=font(54, "Medium"), fill=(120, 120, 130))
        y = 720
        for i in range(lines):
            width = W - 240 - (0 if i % 6 else 0) - ((i * 97) % 380)
            if i % 7 == 6:
                y += 40
                continue
            d.rounded_rectangle([120, y, 120 + width, y + 26], radius=13, fill=(222, 223, 228))
            y += 58
    page.save(path, "PDF", resolution=200)


def photo(path, source, crop=None, tint=None, size=(2400, 1600)):
    im = Image.open(os.path.join(WALLPAPERS, source)).convert("RGB")
    if crop:
        w, h = im.size
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    im = im.resize(size, Image.LANCZOS)
    if tint:
        im = Image.blend(im, Image.new("RGB", size, tint), 0.18)
    im.save(path, quality=90)


def poster(path, title, colors, size=(2000, 2000)):
    W, H = size
    im = Image.new("RGB", size, colors[0])
    d = ImageDraw.Draw(im)
    for i, c in enumerate(colors[1:]):
        d.ellipse([W * (0.1 + 0.3 * i), H * (0.15 + 0.25 * i), W * (0.7 + 0.2 * i), H * (0.75 + 0.2 * i)], fill=c)
    im = im.filter(ImageFilter.GaussianBlur(120))
    d = ImageDraw.Draw(im)
    d.text((140, H - 420), title, font=font(200), fill="white")
    im.save(path)


def text_file(path, body):
    with open(path, "w") as f:
        f.write(body)


def folder(path, children=()):
    os.makedirs(path, exist_ok=True)
    for make in children:
        make(path)


def link(dest_dir, target, name=None):
    name = name or os.path.basename(target)
    p = os.path.join(dest_dir, name)
    if os.path.lexists(p):
        os.remove(p)
    os.symlink(target, p)


# ── The Pops ────────────────────────────────────────────────────────────────────────────

def work(d):
    for a in [f"{SYS}/Calendar.app", f"{SYS}/Mail.app", f"{SYS}/Messages.app", f"{SYS}/Notes.app",
              f"{SYS}/Reminders.app", app(f"{APPS}/Keynote.app", f"{APPS}/Keynote Creator Studio.app"),
              app(f"{APPS}/Numbers.app", f"{APPS}/Numbers Creator Studio.app"),
              app(f"{APPS}/Pages.app", f"{APPS}/Pages Creator Studio.app")]:
        link(d, a)
    q4 = os.path.join(d, "Q4 Planning")
    folder(q4)
    document_pdf(os.path.join(q4, "Roadmap.pdf"), "Roadmap", "Q4 · three bets", (47, 125, 90))
    document_pdf(os.path.join(q4, "Budget.pdf"), "Budget", "Draft for review", (31, 61, 47))


def projects(d):
    shutil.copytree(os.path.join(PROMO_DEMO, "Brand Refresh"), os.path.join(d, "Brand Refresh"), dirs_exist_ok=True)
    shutil.copy(os.path.join(PROMO_DEMO, "Spring Launch Brief.pdf"), d)
    shutil.copy(os.path.join(PROMO_DEMO, "Spring Launch Teaser.mp4"), d)
    shutil.copy(os.path.join(PROMO_DEMO, "Brand Refresh", "Moodboard – Sunset.png"), os.path.join(d, "Moodboard – Sunset.png"))
    document_pdf(os.path.join(d, "Pitch Deck.pdf"), "Pitch Deck", "Spring launch · v3", (184, 134, 11))
    document_pdf(os.path.join(d, "Launch Checklist.pdf"), "Launch Checklist", "Owners and dates", (36, 27, 12), lines=26)
    poster(os.path.join(d, "Logo – Final.png"), "Pop", [(36, 27, 12), (245, 210, 114), (184, 134, 11)])
    text_file(os.path.join(d, "Interview Notes.txt"), "Interview notes\n\n- Loves the themes\n- Wants a Pop per client\n")
    folder(os.path.join(d, "Press Kit"))
    for name, src in [("Hero.jpg", "tangerine-melt.jpg"), ("Product Shot.jpg", "grape-gravity.jpg")]:
        photo(os.path.join(d, "Press Kit", name), src)


def weekend(d):
    for a in ["Books", "Chess", "Games", "Music", "News", "Photos", "Podcasts", "TV", "Maps"]:
        link(d, f"{SYS}/{a}.app")


def travel(d):
    for a in ["Clock", "FindMy", "Maps", "Weather", "Photos"]:
        link(d, f"{SYS}/{a}.app")
    document_pdf(os.path.join(d, "Itinerary – Lisbon.pdf"), "Lisbon", "Itinerary · 12–18 May", (44, 74, 110))
    document_pdf(os.path.join(d, "Boarding Pass.pdf"), "Boarding Pass", "Flight 214 · 12 May", (44, 74, 110), kind="pass")
    text_file(os.path.join(d, "Packing List.txt"), "Packing list\n\n- Passport\n- Adapter\n- Linen shirts\n")
    lis = os.path.join(d, "Lisbon")
    folder(lis)
    for name, src, crop in [("Rooftops.jpg", "shutters.jpg", (0.1, 0.0, 0.9, 0.7)),
                            ("Sunset over the river.jpg", "tangerine-melt.jpg", None),
                            ("Tram 28.jpg", "ufo-1.jpg", (0.2, 0.2, 0.9, 0.8))]:
        photo(os.path.join(lis, name), src, crop)


def writing(d):
    for a in [f"{SYS}/Notes.app", f"{SYS}/TextEdit.app", f"{SYS}/Preview.app", f"{SYS}/Freeform.app",
              app(f"{APPS}/Pages.app", f"{APPS}/Pages Creator Studio.app")]:
        link(d, a)
    document_pdf(os.path.join(d, "Chapter One.pdf"), "Chapter One", "The house on the hill", (231, 169, 160), lines=28)
    text_file(os.path.join(d, "Outline.md"), "# Outline\n\n1. The house on the hill\n2. Letters\n3. The storm\n")
    poster(os.path.join(d, "Cover.png"), "Letters", [(255, 240, 235), (241, 164, 201), (183, 139, 226)])
    drafts = os.path.join(d, "Drafts")
    folder(drafts)
    document_pdf(os.path.join(drafts, "Draft 2.pdf"), "Chapter Two", "Draft 2", (231, 169, 160))


def code(d):
    for a in [app(f"{APPS}/Xcode.app"), app(f"{XCODE_APPS}/Create ML.app"),
              app(f"{XCODE_APPS}/Instruments.app", f"{XCODE_DEV_APPS}/Instruments.app"),
              app(f"{XCODE_APPS}/Icon Composer.app", f"{XCODE_DEV_APPS}/Icon Composer.app", f"{APPS}/Icon Composer.app"),
              app(f"{XCODE_APPS}/FileMerge.app", f"{XCODE_DEV_APPS}/FileMerge.app"),
              f"{UTIL}/Terminal.app", f"{UTIL}/Console.app", f"{UTIL}/Activity Monitor.app"]:
        link(d, a)
    repos = os.path.join(d, "Repos")
    for sub in ["weather-widget", "portfolio-site", "notes-sync"]:
        folder(os.path.join(repos, sub))
        text_file(os.path.join(repos, sub, "README.md"), f"# {sub}\n")


def photo_pop(d):
    for a in [f"{SYS}/Photos.app", f"{SYS}/Image Playground.app", f"{SYS}/Image Capture.app",
              f"{SYS}/Preview.app", f"{SYS}/Photo Booth.app",
              app(f"{APPS}/Pixelmator Pro.app", f"{APPS}/Pixelmator Pro Creator Studio.app")]:
        link(d, a)
    photo(os.path.join(d, "Golden Hour.jpg"), "tangerine-melt.jpg")
    photo(os.path.join(d, "Blue Hour.jpg"), "blueberry-oxygen.jpg")
    shoots = os.path.join(d, "Shoots")
    folder(shoots)
    photo(os.path.join(shoots, "Studio 01.jpg"), "grape-gravity.jpg")


def utilities(d):
    for a in [f"{SYS}/System Settings.app", f"{UTIL}/Disk Utility.app", f"{UTIL}/Screenshot.app",
              f"{SYS}/Font Book.app", f"{UTIL}/Digital Color Meter.app", f"{SYS}/Passwords.app",
              f"{SYS}/Calculator.app", f"{UTIL}/ColorSync Utility.app", f"{UTIL}/Activity Monitor.app"]:
        link(d, a)


POPS = {"Work": work, "Projects": projects, "Weekend": weekend, "Travel": travel, "Writing": writing,
        "Code": code, "Photo": photo_pop, "Utilities": utilities}


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, make in POPS.items():
        d = os.path.join(OUT, name)
        os.makedirs(d, exist_ok=True)
        make(d)
        items = sorted(n for n in os.listdir(d) if not n.startswith("."))
        print(f"{name}: {len(items)} — {', '.join(items)}")


if __name__ == "__main__":
    main()
