import type { Metadata } from "next";
import Image from "next/image";
import HeroDemo from "./HeroDemo";
import FeatureCarousel from "./FeatureCarousel";
import ABHeadline from "./ABHeadline";
import DownloadBadge from "./DownloadBadge";

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
            <a href="#support" className="text-white/50 hover:text-white/80 transition-colors">Support</a>
          </div>
          <DownloadBadge location="nav" className="h-7 w-auto" height={36} width={120} />
        </div>
      </nav>

      {/* Hero — full viewport */}
      <section className="relative hero-height">
        <HeroDemo />
      </section>

      {/* Use Pops to open Anything */}
      <section id="features" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/bg-tangerine.jpg" alt="" fill sizes="100vw" quality={85} className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <ABHeadline className="text-4xl md:text-5xl font-bold mb-6" />
          <p className="text-xl font-bold text-white leading-relaxed mb-10 max-w-md mx-auto">
            DockPops put iPhone folders in your Dock. Your apps, files, and folders — a click away.
          </p>
          <Image
            src="/family-photo-imac.png"
            alt="DockPops in action — Pop organizer with sidebar, App Browser, Dynamic Icon in the Dock, and MultiPops"
            width={1825}
            height={1324}
            sizes="(max-width: 768px) 100vw, 768px"
            quality={90}
            className="drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Like iPhone home screen — MultiPops as natural extension of the iPhone analogy */}
      <section className="relative py-20 px-6 overflow-hidden bg-black">
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Like iPhone folders, on your home screen.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Every Pop can be its own Dock icon. Click one to open just that Pop &mdash;
            no carousel, no menus, straight to what you need.
          </p>
          {/*
            ASSET-TODO: replace /family-photo-imac.png placeholder with a
            small product shot showing 3 DockPops Pops as side-by-side Dock
            icons (Office, Creative, etc.). Should be ~600px wide.
          */}
          <Image
            src="/family-photo-imac.png"
            alt="Multiple DockPops Pops, each with its own Dock icon"
            width={1825}
            height={1324}
            sizes="(max-width: 768px) 100vw, 600px"
            quality={90}
            className="drop-shadow-2xl mx-auto opacity-80"
            style={{ maxWidth: 600 }}
          />
        </div>
      </section>

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
                  Custom Dock icon per Pop
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

          {/* Shared CTA below pricing cards */}
          <DownloadBadge location="pricing" className="h-12 w-auto mx-auto mb-12" height={48} width={160} />

          {/* Full feature catalog */}
          <h3 className="text-lg font-semibold text-white/50 text-center mb-6">50+ features and counting</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {[
              {
                emoji: "🖱️",
                category: "Dock Icon & Access",
                features: [
                  { text: "Click the DockPops icon to open a popover of apps and files", free: true },
                  { text: "Pops work with Dock on bottom, left, or right side of screen", free: true },
                  { text: "Dynamic Icon — Dock icon shows a live grid of your active Pop's apps", free: false },
                  { text: "Adjustable grid density (Auto / 2×2 / 3×3 / 4×4)", free: false },
                  { text: "5 premium app icon variants (Blue, Teal, Violet, Graphite, Amber)", free: false },
                ],
              },
              {
                emoji: "🔗",
                category: "Shortcuts & MultiPops",
                features: [
                  { text: "Every Pop auto-registers as a Siri & Spotlight shortcut", free: true },
                  { text: "\"Show [Pop Name] in DockPops\" works from Siri, Spotlight, and Shortcuts", free: true },
                  { text: "MultiPops — give each Pop its own Dock icon via Shortcuts", free: false },
                  { text: "4-step guided MultiPops setup walkthrough", free: false },
                  { text: "Dynamic Icon support for Linked Pops", free: false },
                ],
              },
              {
                emoji: "🚀",
                category: "Launch Apps, Files & Folders",
                features: [
                  { text: "Click an app icon to launch it", free: true },
                  { text: "Click a file icon to open the file", free: true },
                  { text: "Files and folders show rich QuickLook thumbnail previews", free: true },
                  { text: "Click a folder to browse its contents inside the Pop", free: false },
                  { text: "\"Open in Finder\" cell at the end of every folder", free: false },
                  { text: "\"Open All\" launches every item in a Pop simultaneously", free: false },
                  { text: "Confirmation dialog before Opening All (global toggle)", free: false },
                ],
              },
              {
                emoji: "👀",
                category: "Quick Look & Keyboard",
                features: [
                  { text: "Press Space over any file for an inline Quick Look preview", free: true },
                  { text: "Arrow keys move between items inside a Pop", free: true },
                  { text: "Enter opens the focused item", free: true },
                  { text: "Esc closes the preview, drills out, or closes the Pop", free: true },
                  { text: "Preview header — Reveal in Finder, Open in default app, Close", free: true },
                  { text: "Popover resizes to fit folders with lots of items", free: false },
                ],
              },
              {
                emoji: "📺",
                category: "Menu Bar Mode",
                features: [
                  { text: "Run DockPops from the menu bar instead of the Dock", free: true },
                  { text: "Choose: a click opens your Pop carousel, or a quick menu", free: true },
                  { text: "Per-Pop color extends through the menu-bar popover", free: true },
                  { text: "Companion Poplets open instantly — no Dock flash", free: true },
                ],
              },
              {
                emoji: "⭐",
                category: "Premium Features",
                subsections: [
                  {
                    title: "🧠 SmartyPops",
                    features: [
                      "Swipe, dismiss, and regenerate SmartiePop previews",
                      "Save SmartyPop suggestions to your Pops",
                    ],
                  },
                  {
                    title: "📌 Pop Out Windows",
                    features: [
                      "Pop Out any Pop as a floating, always-on-top window",
                      "Launch items directly from Pop Out windows",
                    ],
                  },
                ],
              },
              {
                emoji: "👆",
                category: "Pop Carousel",
                features: [
                  { text: "Swipe between 2 Pops", free: true },
                  { text: "Show up to 6 apps", free: true },
                  { text: "Navigation arrows and clickable page dots", free: true },
                  { text: "Change animation speed (Slow / Medium / Fast)", free: true },
                  { text: "Swipe between 20 Pops", free: false },
                  { text: "Show up to 25 apps, files or folders", free: false },
                  { text: "Sort items Alphabetically, by Most Used or Recently Added", free: false },
                ],
              },
              {
                emoji: "🤏",
                category: "Drag & <s>Drop</s> Pop",
                features: [
                  { text: "Drag apps from Finder onto the DockPops icon to add to the active Pop", free: true },
                  { text: "Drag onto a MultiPops icon to add to that specific Pop", free: true },
                  { text: "Reorder items inside an open Pop by dragging — no Organizer needed", free: true },
                  { text: "Remove items by dragging them off the Pop popover", free: true },
                  { text: "Save links from any app via the Share extension", free: true },
                  { text: "Drag files and folders from Finder (premium content types)", free: false },
                  { text: "Pop picker when dragging into multiple Pops", free: false },
                  { text: "Drag multiple items from Finder at once", free: false },
                ],
              },
              {
                emoji: "🔍",
                category: "App Browser",
                features: [
                  { text: "+ button and Browse button open the App Browser", free: true },
                  { text: "Live search bar", free: true },
                  { text: "Category filters", free: true },
                  { text: "Sort & filter apps", free: true },
                  { text: "Click an app to add or remove from current Pop", free: true },
                  { text: "\"Not in Any Pop\" filter", free: false },
                  { text: "\"Recently Installed\" filter", free: false },
                ],
              },
              {
                emoji: "🗂️",
                category: "Organizing Pops",
                features: [
                  { text: "Reorder items by dragging within the editor grid", free: true },
                  { text: "Remove icons from browser or Pop preview", free: true },
                  { text: "Rename Pops by swiping right on the name or clicking it on the Pop preview", free: true },
                  { text: "Reorder Pops by dragging in the sidebar", free: true },
                  { text: "Swipe and right-click for rename and delete", free: true },
                  { text: "Create a new Pop from the button or ⌘N", free: true },
                  { text: "Item count and limit", free: true },
                ],
              },
              {
                emoji: "🔒",
                category: "Private by Design",
                features: [
                  { text: "No data collection — zero analytics, zero tracking", free: true },
                  { text: "No network access — everything runs locally on your Mac", free: true },
                  { text: "Fully sandboxed with minimal permissions", free: true },
                ],
              },
              {
                emoji: "✨",
                category: "And More",
                features: [
                  { text: "Now in German and Spanish", free: true },
                  { text: "Built-in Help guide, right inside the app", free: true },
                  { text: "Easy onboarding with starter Pop templates", free: true },
                  { text: "Right-click actions on Dock icon", free: true },
                  { text: "Reduce Motion respected — no spring animations", free: true },
                  { text: "Light and dark mode support", free: true },
                  { text: "Access Settings via ⌘, or gear button", free: true },
                  { text: "\"Launch at login\" toggle", free: true },
                ],
              },
            ].map((group: Record<string, unknown>, gi: number) => (
              <div key={gi} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <h4 className="font-semibold text-white mb-3 text-sm tracking-wider" dangerouslySetInnerHTML={{ __html: `${group.emoji} ${group.category}` }} />
                {Array.isArray(group.subsections) ? (
                  <div className="space-y-4">
                    {(group.subsections as Array<{ title: string; features: string[] }>).map((sub, si) => (
                      <div key={si}>
                        <p className="text-xs font-semibold text-white/50 mb-1.5">{sub.title}</p>
                        <ul className="space-y-1.5">
                          {sub.features.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-2 text-[13px] leading-snug">
                              <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider shrink-0 px-1.5 py-0.5 rounded text-green-400 bg-green-400/10">
                                Pro
                              </span>
                              <span className="text-white/60">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-1.5">
                    {(group.features as Array<{ text: string; free: boolean }>)?.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-[13px] leading-snug">
                        {f.free ? (
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                        ) : (
                          <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider shrink-0 px-1.5 py-0.5 rounded text-green-400 bg-green-400/10">
                            Pro
                          </span>
                        )}
                        <span className="text-white/60">{f.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Feature Carousel — Here a Pop, there a Pop */}
      <FeatureCarousel />

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
