// English copy. Feature names and claims come from the app's own words
// (app-store/Version 6/listing-en-US.md, docs/help), never paraphrased.
// Every other language mirrors this shape (see Dict).

export const en = {
  lang: "en",
  // The page's <title> and search/social description.
  meta: {
    title: "DockPops — Custom Folders for Your Mac Dock",
    description:
      "Beautiful custom folders for your Dock. Group apps, files, and links into Pops, then make each one yours with themes, live PopFX backgrounds, and matching Dock icons. No subscription.",
  },
  // Names for screen readers (not shown).
  a11y: {
    site: "Site",
    dock: "Dock",
    footer: "Footer",
    facts: "DockPops at a glance",
  },
  menu: {
    features: "Features",
    pricing: "Pricing",
    faq: "FAQ",
    support: "Support",
    download: "Download",
  },
  hero: {
    title: "Custom folders for your Dock.",
    body:
      "Click a DockPops icon and a grid of your apps, files, folders, and links pops up right where you’d expect it. Then make each one yours.",
    free: "Free to download. Premium is one purchase, no subscription.",
    hint: "Click a Pop in the Dock to open it.",
    hintTouch: "Tap a Pop in the Dock to open it.",
    // A Dock tile's accessible name: {name} the Pop's, {theme} its theme's.
    tile: "{name}, a Pop in {theme}",
  },
  // A Dock tile's tooltip: the Pop's look in the inspector's own words.
  look: {
    line: "{theme}, {view} view, {fill} fill, {labels} labels",
    views: { grid: "Grid", list: "List", tiles: "Tiles" },
    fills: { glass: "glass", color: "color", gradient: "gradient", popfx: "PopFX" },
    fonts: { system: "system", rounded: "rounded", serif: "serif", mono: "monospaced", papyrus: "Papyrus" },
  },
  trust: [
    "Free to download",
    "One purchase, no subscription",
    "No tracking, no ads",
    "Native Mac app for macOS 14 or later",
  ],
  files: {
    title: "Apps, files, and folders.",
    body:
      "Group up to 25 apps, files, or folders in a Pop. Drag them in from anywhere on your Mac, browse a folder right inside the Pop, and press Space for a Quick Look.",
    drill: "Browse folders without leaving the Pop",
    quickLook: "Quick Look any file with Space",
  },
  themes: {
    title: "Endlessly customizable.",
    body:
      "23 built-in themes, or save your own and reuse it across Pops. Give each Pop a color, a gradient, your own photo, or a PopFX background, add a border, set the label font, and show it as a grid, a list, or tiles. Its Dock icon matches.",
    view: "View",
    theme: "Theme",
  },
  popfx: {
    title: "It’s alive!",
    body:
      "PopFX backgrounds move and respond to your pointer: arcs, curtains, waves, marble, snow, embers, falling code, and more.",
    count: "23 built-in themes, 11 of them PopFX.",
  },
  assistant: {
    title: "Just ask.",
    body:
      "Tell the Assistant what you want, like “add Pages,” “switch to list view,” or “make it feel like golden hour,” and it changes your Pop while you watch. Every change but a deletion can be undone.",
    note: "Works with Apple Intelligence. The Assistant needs macOS 27 and DockPops Premium.",
    panel: "Assistant",
    // The Assistant's own replies (DockPops 6.0, on-device), each with what it changed.
    exchanges: [
      {
        ask: "Add Pages",
        reply: "I added Pages to the Pop because it’s a productivity app and matches the requested addition.",
        changed: "Changed: items",
      },
      {
        ask: "Switch to list view",
        reply: "I set the Pop’s view to list because the user wanted a list format.",
        changed: "Changed: layout",
      },
      {
        ask: "Make it feel like golden hour",
        reply: "I changed the Pop’s theme to Gold Leaf because the user wanted a golden hour feel, which aligns with the Gold Leaf theme.",
        changed: "Changed: Theme",
      },
    ],
    undo: "Undo this change",
    placeholder: "Ask for a change…",
    replay: "Play again",
  },
  everyday: {
    title: "A Pop for every part of your day.",
    body: "Work, a launch, a trip, the weekend. What each one needs, a click away in your Dock.",
  },
  pricing: {
    title: "Download free. Upgrade once.",
    free: "Free",
    freeLine: "Free forever",
    premium: "Premium",
    premiumLine: "One purchase, no subscription",
    once: "one time",
    freeItems: [
      "2 Pops with up to 6 apps or links each",
      "Live Dock icons, and a Dock icon for each Pop",
      "Swipe between Pops and browse folders",
      "Grid view, labels, spacing, and hover highlight",
      "Save links from any app’s Share menu",
      "Menu Bar Mode",
    ],
    premiumItems: [
      "Up to 100 Pops with 25 items each",
      "Files and folders in your Pops",
      "23 themes, PopFX backgrounds, and your own fill and border",
      "List and Tiles views",
      "A keyboard shortcut for each Pop",
      "Choose which Pops each Dock icon shows",
      "Pin a Pop, Open All, and more sort orders",
      "The Assistant (macOS 27) and Apple Intelligence suggestions (macOS 26)",
    ],
  },
  faq: {
    title: "Questions, answered.",
    items: [
      {
        q: "Can’t the Dock already do this?",
        a: "Not quite. A Dock folder (a stack) shows what’s inside one folder on disk, sorted by name, date, or kind. A Pop is a set you choose: any mix of apps, files, folders, and links, in your own order, with its own name, theme, and Dock icon. You can group several Pops behind one Dock icon and swipe between them, open any Pop with its own keyboard shortcut, browse folders inside a Pop, and Quick Look a file with Space.",
      },
      {
        q: "Do I need DockPops Companion for multiple Dock icons?",
        a: "Only with the Mac App Store version. macOS won’t let a sandboxed app add more than one Dock icon, so the free DockPops Companion creates a small launcher for each Pop and keeps its icon in sync. It talks only to DockPops on your Mac. The direct download isn’t sandboxed, so it adds the Dock icons itself.",
      },
      {
        q: "macOS Tahoe removed Launchpad. Is DockPops a replacement?",
        a: "It covers a similar need: a grid of apps you open from your Dock. The difference is that you build each Pop yourself, so you can have one for work, one for a project, and one for the weekend, each a click away.",
      },
      {
        q: "What is PopFX?",
        a: "A background type that moves and responds to your pointer: arcs, curtains, waves, marble, snow, embers, falling code, and more. 11 of the 23 built-in themes use it. PopFX pauses when a Pop is closed, and stays still under Reduce Motion and Low Power Mode.",
      },
      {
        q: "What does the Assistant do with my requests?",
        a: "It changes the selected Pop: its theme, fill, border, labels, and view; its Dock icon; its name and items. It works with Apple Intelligence, so it needs macOS 27 and a Mac that supports it, plus DockPops Premium. In the Mac App Store version, Apple Intelligence may use Apple’s Private Cloud Compute to answer.",
      },
      {
        q: "How is DockPops different from Alfred, Raycast, or Spotlight?",
        a: "Those are search overlays you summon with a hotkey. DockPops lives in your Dock: your Pops are already organized and one click away. Many people use both.",
      },
      {
        q: "What does Premium cost?",
        a: "Premium is one purchase, never a subscription. It unlocks up to 100 Pops with 25 items each, files and folders, themes and PopFX, List and Tiles views, a keyboard shortcut for each Pop, the Assistant, and more. Free DockPops gives you 2 Pops with 6 items each, enough to try it properly.",
      },
      {
        q: "Does DockPops collect data about me?",
        a: "No. No analytics, no tracking, no ads. Your Pops stay on your Mac. App suggestions run on your Mac. The Assistant uses Apple Intelligence, which in the Mac App Store version may answer through Apple’s Private Cloud Compute.",
      },
      {
        q: "Which Macs does DockPops run on?",
        a: "Any Mac with macOS Sonoma (14) or later. Apple Intelligence suggestions need macOS 26, and the Assistant needs macOS 27 and DockPops Premium.",
      },
    ],
  },
  support: {
    title: "Need a hand?",
    body: "Write to us. We usually reply within two days.",
    email: "dockpops@pixleygrowth.com",
  },
  footer: {
    rights: "Pixley Growth LLC. All rights reserved.",
    privacy: "Privacy Policy",
    support: "Support",
    language: "Language",
  },
  download: {
    appStore: "Download on the Mac App Store",
    direct: "Direct Download",
  },
  // The analytics consent banner (shown in Europe) and the footer link that reopens it.
  consent: {
    text: "dockpops.com uses Google Analytics to count visits and see which pages are read. Allow analytics cookies?",
    allow: "Allow",
    decline: "Decline",
    settings: "Cookie settings",
  },
};

export type Dict = typeof en;
