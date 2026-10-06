// Runs in <head> before anything else (an inline script, so it precedes hydration):
// Google Consent Mode v2 defaults, then Google Analytics loads only when allowed.
//
// - Visitors in the EU, EEA, UK and Switzerland: analytics cookies are denied by default
//   (Google applies this by the visitor's location). Visitors whose clock is set to a
//   European time zone are asked first, and gtag.js doesn't load at all until they allow it.
// - Everyone else: analytics as before, unless they decline in "Cookie settings".
// - The choice is kept in localStorage ("dp-analytics-consent") and can be changed any time.

const GA_ID = "G-DTCD5Q6KTJ";
const EEA_UK_CH = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO",
  "GB", "CH",
];

export const CONSENT_SCRIPT = `(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  var denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
  gtag("consent", "default", Object.assign({ region: ${JSON.stringify(EEA_UK_CH)} }, denied));
  gtag("consent", "default", Object.assign({}, denied, { analytics_storage: "granted" }));

  var KEY = "dp-analytics-consent", choice = null, tz = "";
  try { choice = localStorage.getItem(KEY); } catch (e) {}
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
  var europe = /^Europe\\//.test(tz) || /^Atlantic\\/(Reykjavik|Canary|Madeira|Azores|Faroe)$/.test(tz);
  window.dpNeedsConsent = europe;

  if (choice === "granted" || choice === "denied") gtag("consent", "update", { analytics_storage: choice });
  gtag("js", new Date());
  gtag("config", "${GA_ID}");

  var loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=${GA_ID}";
    document.head.appendChild(s);
  }
  // Declining also removes the Google Analytics cookies an earlier visit left behind.
  function clearCookies() {
    var parts = location.hostname.split("."), domains = [""];
    for (var i = 0; i < parts.length - 1; i++) domains.push("." + parts.slice(i).join("."));
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (!/^_ga/.test(name)) return;
      domains.forEach(function (d) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + (d ? "; domain=" + d : "");
      });
    });
  }
  window.dpConsent = function (c) {
    try { localStorage.setItem(KEY, c); } catch (e) {}
    gtag("consent", "update", { analytics_storage: c });
    if (c === "granted") load(); else clearCookies();
  };
  if (choice === "denied") clearCookies();
  if (choice === "granted" || (!europe && choice !== "denied")) load();
})();`;
