import type { Dict } from "./en";

// German copy. Mirrors en.ts key for key.
// Register: "du", as in the German App Store listing (app-store/Version 6/listing-de.md).
// UI terms are the app's own German (Localizable.xcstrings); feature wording follows the
// German listing and the German Help Book (docs/help/de).

export const de: Dict = {
  lang: "de",
  // The page's <title> and search/social description.
  meta: {
    title: "DockPops — Eigene Ordner für dein Mac-Dock",
    description:
      "Schöne eigene Ordner für dein Dock. Fasse Apps, Dateien und Links in Pops zusammen und mach jeden zu deinem — mit Designs, lebendigen PopFX-Hintergründen und passenden Dock-Symbolen. Ohne Abo.",
  },
  // Names for screen readers (not shown).
  a11y: {
    site: "Website",
    dock: "Dock",
    footer: "Fußzeile",
    facts: "DockPops auf einen Blick",
  },
  menu: {
    features: "Funktionen",
    pricing: "Preise",
    faq: "FAQ",
    support: "Support",
    download: "Download",
  },
  hero: {
    title: "Eigene Ordner für dein Dock.",
    body:
      "Klicke auf ein DockPops-Symbol und ein Raster deiner Apps, Dateien, Ordner und Links erscheint genau dort, wo du es erwartest. Dann mach jeden zu deinem.",
    free: "Kostenloser Download. Premium ist ein Kauf, kein Abo.",
    hint: "Klicke auf einen Pop im Dock, um ihn zu öffnen.",
    hintTouch: "Tippe auf einen Pop im Dock, um ihn zu öffnen.",
    // A Dock tile's accessible name: {name} the Pop's, {theme} its theme's.
    tile: "{name}, ein Pop im Design {theme}",
  },
  // A Dock tile's tooltip: the Pop's look in the inspector's own words.
  look: {
    line: "{theme}, Darstellung: {view}, Füllung: {fill}, Beschriftungen: {labels}",
    views: { grid: "Raster", list: "Liste", tiles: "Kacheln" },
    fills: { glass: "Glas", color: "Farbe", gradient: "Verlauf", popfx: "PopFX" },
    fonts: { system: "System", rounded: "Rund", serif: "Serif", mono: "Mono", papyrus: "Papyrus" },
  },
  trust: [
    "Kostenloser Download",
    "Ein Kauf, kein Abo",
    "Kein Tracking, keine Werbung",
    "Native Mac-App für macOS 14 oder neuer",
  ],
  files: {
    title: "Apps, Dateien und Ordner.",
    body:
      "Fasse bis zu 25 Apps, Dateien oder Ordner in einem Pop zusammen. Ziehe sie von überall auf deinem Mac herein, durchsuche einen Ordner direkt im Pop und drücke die Leertaste für eine Übersicht-Vorschau.",
    drill: "Ordner ansehen, ohne den Pop zu verlassen",
    quickLook: "Jede Datei per Leertaste in der Übersicht ansehen",
  },
  themes: {
    title: "Grenzenlos anpassbar.",
    body:
      "23 integrierte Designs — oder sichere dein eigenes und nutze es in mehreren Pops. Gib jedem Pop eine Farbe, einen Verlauf, dein eigenes Foto oder einen PopFX-Hintergrund, füge einen Rahmen hinzu, wähle die Schriftart der Beschriftungen und zeige ihn als Raster, Liste oder Kacheln. Sein Dock-Symbol passt dazu.",
    view: "Darstellung",
    theme: "Design",
  },
  popfx: {
    title: "Es lebt!",
    body:
      "PopFX-Hintergründe bewegen sich und reagieren auf deinen Mauszeiger: Bögen, Vorhänge, Wellen, Marmor, Schnee, Glut, Zeichenregen und mehr.",
    count: "23 integrierte Designs, 11 davon mit PopFX.",
  },
  assistant: {
    title: "Frag einfach.",
    body:
      "Sag dem Assistenten, was du willst — etwa „Pages hinzufügen“, „Zur Listenansicht wechseln“ oder „Lass ihn wie zur goldenen Stunde wirken“ — und er ändert deinen Pop, während du zusiehst. Jede Änderung außer dem Löschen lässt sich rückgängig machen.",
    note: "Funktioniert mit Apple Intelligence. Der Assistent erfordert macOS 27 und DockPops Premium.",
    panel: "Assistent",
    // The Assistant's own replies (DockPops 6.0, on-device), each with what it changed.
    exchanges: [
      {
        ask: "Pages hinzufügen",
        reply: "Ich habe Pages zum Pop hinzugefügt, weil es eine Produktivitäts-App ist und zur gewünschten Ergänzung passt.",
        changed: "Geändert: Elemente",
      },
      {
        ask: "Zur Listenansicht wechseln",
        reply: "Ich habe die Darstellung des Pops auf „Liste“ gestellt, weil eine Listenansicht gewünscht war.",
        changed: "Geändert: Layout",
      },
      {
        ask: "Lass ihn wie zur goldenen Stunde wirken",
        reply: "Ich habe das Design des Pops auf Gold Leaf geändert, weil die Stimmung der goldenen Stunde gewünscht war — und dazu passt das Design Gold Leaf.",
        changed: "Geändert: Design",
      },
    ],
    undo: "Diese Änderung rückgängig machen",
    placeholder: "Änderung wünschen …",
    replay: "Erneut abspielen",
  },
  everyday: {
    title: "Ein Pop für alles, was dein Tag bringt.",
    body: "Arbeit, ein Produktstart, eine Reise, das Wochenende. Alles, was du dafür brauchst, nur einen Klick entfernt in deinem Dock.",
  },
  pricing: {
    title: "Kostenlos laden. Einmal freischalten.",
    free: "Kostenlos",
    freeLine: "Für immer kostenlos",
    premium: "Premium",
    premiumLine: "Ein Kauf, kein Abo",
    once: "einmalig",
    freeItems: [
      "2 Pops mit jeweils bis zu 6 Apps oder Links",
      "Live-Dock-Symbole und ein Dock-Symbol für jeden Pop",
      "Zwischen Pops wischen und Ordner ansehen",
      "Rasteransicht, Beschriftungen, Abstand und Hover-Effekt",
      "Links über das Teilen-Menü jeder App speichern",
      "Menüleistenmodus",
    ],
    premiumItems: [
      "Bis zu 100 Pops mit je 25 Elementen",
      "Dateien und Ordner in deinen Pops",
      "23 Designs, PopFX-Hintergründe, eigene Füllung und eigener Rahmen",
      "Listen- und Kachelansicht",
      "Ein Tastaturkurzbefehl für jeden Pop",
      "Festlegen, welche Pops jedes Dock-Symbol zeigt",
      "Pops anheften, „Alles öffnen“ und weitere Sortierungen",
      "Der Assistent (macOS 27) und Vorschläge von Apple Intelligence (macOS 26)",
    ],
  },
  faq: {
    title: "Fragen und Antworten.",
    items: [
      {
        q: "Kann das Dock das nicht schon?",
        a: "Nicht ganz. Ein Ordner im Dock (ein Stapel) zeigt, was in einem einzigen Ordner auf deinem Mac liegt, sortiert nach Name, Datum oder Art. Ein Pop ist eine Auswahl, die du selbst triffst: eine beliebige Mischung aus Apps, Dateien, Ordnern und Links, in deiner eigenen Reihenfolge, mit eigenem Namen, Design und Dock-Symbol. Du kannst mehrere Pops hinter einem Dock-Symbol zusammenfassen und zwischen ihnen wischen, jeden Pop mit seinem eigenen Tastaturkurzbefehl öffnen, Ordner in einem Pop ansehen und eine Datei per Leertaste in der Übersicht anzeigen.",
      },
      {
        q: "Brauche ich DockPops Companion für mehrere Dock-Symbole?",
        a: "Nur bei der Version aus dem Mac App Store. macOS erlaubt einer App in der Sandbox nicht, mehr als ein Dock-Symbol hinzuzufügen. Deshalb erstellt die kostenlose App DockPops Companion für jeden Pop einen kleinen Launcher und hält dessen Symbol synchron. Sie kommuniziert nur mit DockPops auf deinem Mac. Die Version zum direkten Download läuft nicht in der Sandbox und fügt die Dock-Symbole deshalb selbst hinzu.",
      },
      {
        q: "Mit macOS Tahoe ist das Launchpad verschwunden. Ist DockPops ein Ersatz dafür?",
        a: "DockPops erfüllt einen ähnlichen Zweck: ein Raster mit Apps, das du aus deinem Dock öffnest. Der Unterschied: Du stellst jeden Pop selbst zusammen. So kannst du einen für die Arbeit haben, einen für ein Projekt und einen fürs Wochenende — jeden nur einen Klick entfernt.",
      },
      {
        q: "Was ist PopFX?",
        a: "Eine Hintergrundart, die sich bewegt und auf deinen Mauszeiger reagiert: Bögen, Vorhänge, Wellen, Marmor, Schnee, Glut, Zeichenregen und mehr. Sie steckt in 11 der 23 integrierten Designs. PopFX pausiert, wenn ein Pop geschlossen ist, und steht bei „Bewegung reduzieren“ und im Stromsparmodus still.",
      },
      {
        q: "Was macht der Assistent mit meinen Anfragen?",
        a: "Er ändert den ausgewählten Pop: sein Design, seine Füllung, seinen Rahmen, seine Beschriftungen und seine Darstellung; sein Dock-Symbol; seinen Namen und seine Elemente. Er funktioniert mit Apple Intelligence und erfordert daher macOS 27 und einen Mac, der Apple Intelligence unterstützt, dazu DockPops Premium. In der Version aus dem Mac App Store kann Apple Intelligence zum Antworten Apples Private Cloud Compute nutzen.",
      },
      {
        q: "Was unterscheidet DockPops von Alfred, Raycast oder Spotlight?",
        a: "Das sind Suchfenster, die du per Tastaturkurzbefehl aufrufst. DockPops ist in deinem Dock zu Hause: Deine Pops sind schon geordnet und nur einen Klick entfernt. Viele nutzen beides.",
      },
      {
        q: "Was kostet Premium?",
        a: "Premium ist ein einmaliger Kauf, nie ein Abo. Es schaltet bis zu 100 Pops mit je 25 Elementen frei, dazu Dateien und Ordner, Designs und PopFX, die Listen- und Kachelansicht, einen Tastaturkurzbefehl für jeden Pop, den Assistenten und mehr. Das kostenlose DockPops bietet dir 2 Pops mit je 6 Elementen — genug, um es richtig auszuprobieren.",
      },
      {
        q: "Sammelt DockPops Daten über mich?",
        a: "Nein. Keine Analysen, kein Tracking, keine Werbung. Deine Pops bleiben auf deinem Mac. Die App-Vorschläge entstehen auf deinem Mac. Der Assistent nutzt Apple Intelligence, das in der Version aus dem Mac App Store über Apples Private Cloud Compute antworten kann.",
      },
      {
        q: "Auf welchen Macs läuft DockPops?",
        a: "Auf jedem Mac mit macOS Sonoma (14) oder neuer. Vorschläge von Apple Intelligence erfordern macOS 26, der Assistent erfordert macOS 27 und DockPops Premium.",
      },
    ],
  },
  support: {
    title: "Brauchst du Hilfe?",
    body: "Schreib uns. Wir antworten in der Regel innerhalb von zwei Tagen.",
    email: "dockpops@pixleygrowth.com",
  },
  footer: {
    rights: "Pixley Growth LLC. Alle Rechte vorbehalten.",
    privacy: "Datenschutz",
    support: "Support",
    language: "Sprache",
  },
  download: {
    appStore: "Laden im Mac App Store",
    direct: "Direkter Download",
  },
};
