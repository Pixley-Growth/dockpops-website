// Site settings that are a decision, not code.

/** Premium's price as the site shows it (owner, 2026-10-05). null shows "One purchase, no
 *  subscription" instead of a figure. The App Store sets the real price per country; this
 *  is the US figure. */
export const PREMIUM_PRICE: string | null = "$3.99";

/** Where the direct download's Premium is bought: the production Lemon Squeezy checkout, the same
 *  URL the app's Unlock button opens (LSConfiguration.checkoutURL, Release). It emails a license
 *  key for the direct download; the App Store version unlocks in the app. */
export const PREMIUM_CHECKOUT_URL =
  "https://dockpops.lemonsqueezy.com/checkout/buy/dfb0e27b-9eb3-4fd9-85c2-2b1740d36a8f";
