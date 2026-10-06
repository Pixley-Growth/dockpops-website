import type { Dict } from "./en";
import { de } from "./de";
import { es } from "./es";
import { fr } from "./fr";
import { ja } from "./ja";
import { zhHans } from "./zh-Hans";

/** Each translated language's copy, by its URL path. */
export const DICTS: Record<string, Dict> = {
  de,
  es,
  fr,
  ja,
  "zh-hans": zhHans,
};
