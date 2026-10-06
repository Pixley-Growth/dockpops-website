# Redraw the bubble wallpapers sharp

Grape Gravity (the hero), Blueberry Oxygen (PopFX), Tangerine Melt (Files), Strawberry Baby
(everyday Pops) and Lime Sharp (Pricing) are Mac OS 9 photos of
glossy "molecules", 1024 × 768 in 1999. The 5K copies at 512 Pixels are enlargements, so
the bubbles smear. These scripts keep each photo's glow and redraw its bubbles at 3840 px:
the near ones with a clean rim and crisp highlights, the far ones softly out of focus.

Sources (5120 × 3840): https://512pixels.net/projects/mac-os-9-5k-wallpapers/

    python3 detect.py Grape-Gravity.jpg grape 4        # -> grape.json + grape-overlay.jpg
    python3 render.py Grape-Gravity.jpg grape.json grape-extra.json grape-sharp.jpg grape
    python3 render.py Blueberry-Oxygen.jpg blue.json blue-extra.json blue-sharp.jpg blue
    python3 render.py Tangerine-Melt.jpg orange.json orange-extra.json orange-sharp.jpg orange
    python3 render.py Strawbery-Baby.jpg pink.json pink-extra.json strawberry-baby.jpg strawberry
    python3 render.py Lime-Sharp.jpg lime.json lime-extra.json lime-sharp.jpg lime

`*-extra.json` holds the hand fixes: bubbles the detector missed (`add`, 5K px, optional
`R` and `near`), merged pairs it found as one (`drop`), and far bubbles it took for near
(`far`). The output goes to public/wallpapers/ at quality 86.
