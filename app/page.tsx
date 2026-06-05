import type { Metadata } from "next";
import Image from "next/image";
import HeroDemo from "./HeroDemo";
import FeatureStory from "./FeatureStory";
import DownloadBadge from "./DownloadBadge";
import DirectDownloadButton from "./DirectDownloadButton";

export const metadata: Metadata = {
  openGraph: {
    title: "DockPops — The Missing Launcher for Your Dock",
    description: "iPhone folders for your Mac Dock. Apps, files, and folders — Quick Look any of them with Space. Multiple Dock icons, Menu Bar mode, fully keyboard-driven. Native Mac app, no tracking.",
    images: [{ url: "/preview.png", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DockPops — The Missing Launcher for Your Dock",
    description: "iPhone folders for your Mac Dock. Apps, files, and folders — Quick Look any of them with Space. Multiple Dock icons, Menu Bar mode, fully keyboard-driven. Native Mac app, no tracking.",
    images: ["/preview.png"],
  },
};

export default function DockPopsPage() {
  return (
    <div className="min-h-screen bg-black text-[#f5f5f7]">

      {/* Menu bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-10 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-5">
            <a href="#" className="text-white font-bold text-sm tracking-tight mr-2">DockPops</a>
            <a href="#pricing" className="text-white/50 hover:text-white/80 transition-colors">Pricing</a>
            <a href="#features" className="text-white/50 hover:text-white/80 transition-colors">Features</a>
            <a href="#faq" className="text-white/50 hover:text-white/80 transition-colors">FAQ</a>
            <a href="#support" className="text-white/50 hover:text-white/80 transition-colors">Support</a>
          </div>
          <div className="flex items-center gap-2">
            <DownloadBadge location="nav" className="h-7 w-auto" height={36} width={120} />
            <DirectDownloadButton location="nav" size="sm" />
          </div>
        </div>
      </nav>

      {/* Hero — full viewport */}
      <section className="relative hero-height">
        <HeroDemo />
      </section>

      {/* Feature Story — alive headline features (replaced the old flat product
          shots + the 200-line spec list). The 50+ list now lives collapsed in
          the Pricing section below. */}
      <FeatureStory />

      {/* Pricing */}
      <section id="pricing" className="relative py-14 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg-tangerine.jpg" alt="" fill sizes="100vw" quality={85} className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-black mb-12"
            style={{ fontFamily: "ui-rounded, 'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif", fontStretch: "condensed" }}
          >
            Download Free. Upgrade Once.
          </h2>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {/* Free tier */}
            <div className="bg-zinc-900/80 backdrop-blur rounded-2xl border border-white/10 p-6 text-left">
              <p className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-2">Free</p>
              <p className="text-3xl font-bold mb-1">DockPops</p>
              <p className="text-white/50 mb-6">Free forever</p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  2 Pops
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  6 apps per Pop
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  Swipe between Pops
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  Quick Look any file with Space
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  Keyboard navigation
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  Run from the Dock or Menu Bar
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  Drag apps from Finder onto your Dock icon
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  Reorder &amp; remove inside the Pop
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 mt-0.5">&#10003;</span>
                  Light &amp; dark mode
                </li>
              </ul>
            </div>

            {/* Premium tier */}
            <div className="bg-zinc-900/80 backdrop-blur rounded-2xl border border-orange-500/30 p-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                LIFETIME
              </div>
              <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-2">Premium</p>
              <p className="text-3xl font-bold mb-1">
                $9.99
                <span className="text-lg font-normal text-white/40 ml-2">one time</span>
              </p>
              <p className="text-white/50 mb-6">No subscription. Ever.</p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Up to 20 Pops
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  25 items per Pop
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Apps, files, and folders in any Pop
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Drill into folders without leaving the Pop
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Customize each Pop&apos;s Dock icon (color, grid density, variant)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Per-Pop color for the popover
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  SmartyPops &mdash; on-device AI
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Open All &amp; Sort
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Pop out into floating windows
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-0.5">&#10003;</span>
                  Hide Pops from the carousel
                </li>
              </ul>
            </div>
          </div>

          {/* Shared CTA below pricing cards — App Store + direct .dmg, equal weight */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <DownloadBadge location="pricing" className="h-12 w-auto" height={48} width={160} />
            <DirectDownloadButton location="pricing" size="lg" />
          </div>



        </div>
      </section>

      {/* (Feature Carousel removed — its features absorbed into FeatureStory;
          the hero stays the page's only swipeable carousel, which keeps it special.) */}

      {/* FAQ — frequently asked questions, also SEO surface for comparison /
          privacy / pricing queries. Native <details>/<summary> accordion so
          screen readers + Google handle it without JS. FAQPage JSON-LD below
          enables rich-snippet display on search results. */}
      <FAQSection />

      {/* Support */}
      <section id="support" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Need help?</h2>
          <p className="text-xl text-white/50 mb-8">We&apos;re here for you.</p>
          <a
            href="mailto:dockpops@applacat.com"
            className="inline-flex items-center justify-center gap-2 bg-zinc-800 text-white font-medium px-8 py-4 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            dockpops@applacat.com
          </a>
          <p className="text-white/40 text-sm mt-6">We typically respond within 48 hours.</p>
        </div>
      </section>

      {/* Footer */}
      {/* (FAQSection is rendered above, between FeatureCarousel and Support) */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-white/50">&copy; {new Date().getFullYear()} Applacat LLC. All rights reserved.</span>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#support" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────
// FAQ Section
// ───────────────────────────────────────────────────────────────────────
//
// 8 questions covering the high-traffic search-intent surface:
// Companion explainer, Dock folder comparison, competitor comparison
// (Alfred/Raycast/Spotlight), pricing, privacy, tier gating, SmartyPops,
// macOS support.
//
// Native <details>/<summary> accordions — no JS state, screen-reader-
// friendly by default, Google rich-snippet-compatible.
//
// FAQPage JSON-LD inline as a <script type="application/ld+json"> so Google
// can show the questions as rich snippets in search results.

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Why do I need a Companion app for DockPops?",
    a: "macOS doesn't allow a single sandboxed app to add more than one Dock icon — it's an App Store security rule, not a DockPops limitation. DockPops Companion is a free sibling app whose only job is to be those extra Dock icons. Install one per Pop, and each Companion becomes a real Dock tile that opens its Pop instantly. The main DockPops app runs everything; Companion just fills the gap macOS can't.",
  },
  {
    q: "What's the difference between DockPops and macOS Dock folders (Stacks)?",
    a: "Stacks just show what's inside a real folder on disk — useful for Downloads, awkward for grouping apps by intent. You can't easily build \"my Office apps\" or \"my Creative apps\" without making throwaway folders of aliases. DockPops lets you curate Pops by use case: drag any mix of apps, files, and folders into a Pop, name it, and access it from your Dock. Multiple Pops, swipeable, with Quick Look and keyboard navigation built in.",
  },
  {
    q: "Is DockPops a replacement for Launchpad?",
    a: "macOS 26 (Tahoe) removed Launchpad. DockPops covers a similar use case — a grid of apps you click from your Dock — but you build each Pop yourself: pick the apps, files, and folders, name it, and add as many Pops as you want. Multiple Pops, swipeable. Works on macOS 14, 15, and 26.",
  },
  {
    q: "How is DockPops different from Alfred, Raycast, or Spotlight?",
    a: "Alfred, Raycast, and Spotlight are hotkey-driven search overlays — invisible until you summon them. DockPops sits in your Dock, always visible. You curate Pops (named buckets of apps, files, and folders) instead of searching. Different mental model: pre-organized one click away, not search-and-find. Many users keep both.",
  },
  {
    q: "What do I get for $9.99?",
    a: "One-time purchase, no subscription. Premium unlocks up to 20 Pops with 25 items each, files and folders in any Pop, folder browsing, custom Dock icons per Pop, SmartyPops AI suggestions, sort modes, Pop Out floating windows, and more. Free DockPops gives you 2 Pops with 6 apps each — enough to try the core feel.",
  },
  {
    q: "Does DockPops collect data about me?",
    a: "No. Zero analytics, zero tracking, no network access. Everything runs locally on your Mac, fully sandboxed. SmartyPops AI suggestions run on-device via Apple Intelligence — nothing leaves your machine. The Companion app talks to DockPops locally through a shared container; no servers, no telemetry.",
  },
  {
    q: "Can I add files and folders to the free version?",
    a: "Adding files and folders to a Pop is a Premium feature — the free tier supports adding apps only. Once a file is in a Pop, opening it and Quick Look preview work the same on either tier; the gate is on the \"add\" action, not on file use. Free DockPops gives you 2 Pops with up to 6 apps each.",
  },
  {
    q: "What is SmartyPops?",
    a: "SmartyPops is on-device AI that suggests apps you might want in each Pop, based on what's already there and how you use your Mac. It runs entirely on your machine via Apple Intelligence — no cloud, no data sharing. Requires macOS 26 or later and Apple Intelligence-compatible hardware. Premium-tier feature.",
  },
  {
    q: "What macOS versions does DockPops support?",
    a: "DockPops requires macOS Sonoma (14) or later. The app supports macOS 14, 15, and 26, with features like Quick Look, Liquid Glass UI elements, and Apple Intelligence integration matched to the system version. SmartyPops on-device AI requires macOS 26 or later.",
  },
];

function FAQSection() {
  // Schema.org FAQPage JSON-LD — Google uses this to show questions as
  // rich snippets in search results. Plain object → JSON.stringify in a
  // <script type="application/ld+json">.
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 px-6 bg-black">
      {/* JSON-LD for Google FAQ rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">
          Frequently asked questions
        </h2>
        <p className="text-lg text-white/50 text-center mb-12">
          Common questions about DockPops, the Companion app, pricing, and privacy.
        </p>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            >
              <summary className="cursor-pointer px-5 py-4 flex items-start gap-4 hover:bg-white/[0.03] transition-colors list-none">
                <span className="flex-1 text-left text-base md:text-lg font-medium text-white pr-2">
                  {item.q}
                </span>
                <span className="shrink-0 mt-1 text-white/40 group-open:rotate-180 transition-transform">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 5l4 4 4-4" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 text-[15px] leading-relaxed text-white/65">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
