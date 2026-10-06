// PopFX effect names as the app shows them in each language (DockPops/Resources/
// Localizable.xcstrings). Theme names stay as they are; effect names are translated.
const EFFECTS: Record<string, Record<string, string>> = {
  de: { Arc: "Bogen", Blobs: "Blobs", "Glyph Rain": "Zeichenregen", Snow: "Schnee", Tiger: "Tiger" },
  "es-419": { Arc: "Arco", Blobs: "Manchas", "Glyph Rain": "Lluvia de glifos", Snow: "Nieve", Tiger: "Tiger" },
  fr: { Arc: "Arc", Blobs: "Taches", "Glyph Rain": "Pluie de glyphes", Snow: "Neige", Tiger: "Tiger" },
  ja: { Arc: "アーク", Blobs: "ブロブ", "Glyph Rain": "グリフレイン", Snow: "スノー", Tiger: "Tiger" },
  "zh-Hans": { Arc: "弧光", Blobs: "色团", "Glyph Rain": "字符雨", Snow: "雪", Tiger: "Tiger" },
};

/** An effect's name in a language (English when there's no translation). */
export const effectName = (effect: string, lang: string) => EFFECTS[lang]?.[effect] ?? effect;
