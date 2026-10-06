// URLs for the Pops' files. The version is a hash of their contents (next.config.ts), so a
// regenerated file never comes back stale from a year-long cache.
const version = process.env.NEXT_PUBLIC_ASSET_VERSION ?? "dev";

export const popFile = (name: string) => `/pops/${name}?v=${version}`;
export const dockFile = (name: string) => `/dock/${name}?v=${version}`;
