import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — DockPops",
  description:
    "DockPops keeps everything on your Mac — no analytics, no tracking, no cloud sync, no telemetry. Read the full privacy policy.",
  alternates: { canonical: "/privacy" },
};

/* Mirrors the in-app privacy docs — DockPops HelpBook 17-privacy-and-data, in its App Store
   (docs/help/17-privacy-and-data-mas.md) and direct-download (…-complete.md) versions — so the
   website and the app state the same thing. Where the two builds differ, both are given.
   Update LAST_UPDATED when the policy text changes. */
const LAST_UPDATED = "October 6, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

function Build({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="text-base font-semibold text-white/85 mb-2">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

const strong = "text-white/85";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-[#f5f5f7]">
      {/* Menu bar (matches homepage) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-10 flex items-center justify-between text-[13px]">
          <Link href="/" className="text-white font-bold text-sm tracking-tight">DockPops</Link>
          <Link href="/" className="text-white/50 hover:text-white/80 transition-colors">← Back to home</Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-24 pb-24">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <p className="text-lg text-white/70 leading-relaxed">
          Everything DockPops knows about you stays on your Mac. There are no
          analytics, no tracking, no cloud sync, and no telemetry. We don&apos;t
          run a server, and we never see your data. The few exceptions are listed
          under &ldquo;What DockPops sends out&rdquo; below. They differ a little
          between the Mac App Store version and the version you download from
          this website, so where they differ, both are given.
        </p>

        <Section title="What DockPops stores">
          <p>All of this is kept locally on your Mac:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className={strong}>Your Pops</strong> — names, contents, sort orders, colors, and icon choices.</li>
            <li><strong className={strong}>Per-Pop preferences</strong> — each Pop&apos;s view, columns, sort order, styling, Dock icon settings, and which Dock icons it shows with.</li>
            <li><strong className={strong}>Launch counts</strong> — how often you&apos;ve opened each app from DockPops. Used for the &ldquo;Most Used&rdquo; sort order and by the Assistant (see below).</li>
            <li><strong className={strong}>Onboarding state</strong> — whether you&apos;ve seen the welcome sheet.</li>
            <li><strong className={strong}>Premium</strong> — in the App Store version, a single flag saying you&apos;ve bought Premium; in the direct download, your license key and when it was last checked.</li>
          </ul>
        </Section>

        <Section title="Where it's stored">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>In DockPops&apos;s own storage on your Mac — its database and preferences.</li>
            <li>Images you import (custom Dock icons and Pop backgrounds) are kept in DockPops&apos;s shared folder on your Mac.</li>
            <li>Nothing is stored on any DockPops server. We don&apos;t have one.</li>
          </ul>
        </Section>

        <Section title="What DockPops sends out">
          <p>Almost nothing. The complete list of network activity DockPops can produce:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className={strong}>Favicon fetches</strong> — when you save a link to a Pop, DockPops fetches a small icon file from the site&apos;s own domain so the link looks right in your grid. One short request per saved URL; no other data is included.</li>
            <li>When you click an item that opens a URL, your browser makes the request — not DockPops.</li>
            <li>When you email support — only if you choose to.</li>
          </ul>
          <Build title="Mac App Store version">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>When you buy Premium or restore a purchase, StoreKit talks to Apple&apos;s servers. DockPops never sees your Apple ID or payment information.</li>
              <li>When you click &ldquo;Download DockPops Companion&rdquo; in the Multiple Dock Icons tab, that&apos;s a normal browser download from GitHub.</li>
              <li>When you use the Assistant on a Mac where Apple&apos;s Private Cloud Compute is available (see below).</li>
            </ul>
            <p>Aside from favicon fetches and the Assistant, the App Store version never reaches the internet on its own.</p>
          </Build>
          <Build title="Direct download">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className={strong}>Update checks</strong> — DockPops checks for a new version when it opens and once a day, from DockPops&apos;s update page on GitHub. You can also choose DockPops → Check for Updates…. No personal data is sent.</li>
              <li><strong className={strong}>Your license</strong> — when you activate or deactivate a license, and now and then to confirm it&apos;s still valid, DockPops contacts the license service (Lemon Squeezy) with your license key.</li>
            </ul>
            <p>Aside from favicon fetches, update checks, and license checks, the direct download never reaches the internet on its own.</p>
          </Build>
        </Section>

        <Section title="SmartyPops">
          <p>
            SmartyPops uses Apple Intelligence on your Mac (macOS 26 or later).
            Its model runs entirely on your Mac; your Pops and apps never leave
            the device. If your Mac doesn&apos;t support Apple Intelligence,
            SmartyPops uses a built-in, offline method based on your installed
            apps&apos; categories.
          </p>
        </Section>

        <Section title="The Assistant">
          <p>
            The Assistant (macOS 27, Premium) uses Apple Intelligence to answer
            your requests. The conversation is kept in memory while the setup
            window is open and is gone when you close it.
          </p>
          <Build title="Mac App Store version: Private Cloud Compute">
            <p>
              When Apple&apos;s Private Cloud Compute is available, DockPops uses
              it; otherwise the request is answered by the model on your Mac.
              There&apos;s no DockPops setting for this choice. If the model on
              your Mac isn&apos;t available — for example, while it&apos;s still
              downloading — the Assistant can still answer through Private Cloud
              Compute when that&apos;s available.
            </p>
            <p>With each request, DockPops sends:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>what you typed, and the conversation so far;</li>
              <li>the selected Pop&apos;s settings and its items — their names and kinds, app categories, and how often you&apos;ve opened them from DockPops;</li>
              <li>the names of your other Pops and how many items each holds;</li>
              <li>the names of the apps installed on your Mac, so the Assistant can find the ones you ask for.</li>
            </ul>
            <p>
              Private Cloud Compute is Apple&apos;s service. Apple designs it to
              use your data only to answer your request, and not to store it.
              DockPops has no server of its own and never sees or keeps your
              requests.
            </p>
          </Build>
          <Build title="Direct download: on your Mac only">
            <p>
              The Assistant runs only on your Mac, using the Apple Intelligence
              model on the device. Your requests, your Pops, and your apps never
              leave the Mac.
            </p>
          </Build>
        </Section>

        <Section title="Share Extension">
          <p>
            When you share a link into DockPops from Safari or another app, the
            Share Extension reads only the URL you explicitly shared. It does not
            read your browsing history, your open tabs, or anything else.
          </p>
        </Section>

        <Section title="DockPops Companion">
          <p>
            DockPops Companion is a free sibling app for the Mac App Store
            version that provides extra Dock icons for your Pops. It communicates
            with DockPops locally on your Mac, has no analytics and no tracking,
            and stores nothing on any server.
          </p>
        </Section>

        <Section title="Analytics, tracking, and telemetry">
          <p>
            DockPops contains no analytics SDKs, no crash reporters that phone
            home, and no usage tracking. If something goes wrong and you choose to
            share a crash report, macOS offers to send it to Apple — and from
            Apple to us — only at your discretion.
          </p>
          <p>
            DockPops ships with an Apple-required Privacy Manifest declaring no
            data collection. You can review it in the app bundle at
            DockPops.app/Contents/Resources/PrivacyInfo.xcprivacy.
          </p>
        </Section>

        <Section title="This website">
          <p>
            dockpops.com uses Google Analytics to count visits and see which pages
            are read. Google sets cookies to do this and receives standard request
            information, such as your IP address and browser. This applies to the
            website only — the DockPops app contains no analytics.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we change how DockPops handles data, we&apos;ll update this page and
            the &ldquo;Last updated&rdquo; date above.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about privacy? Email{" "}
            <a href="mailto:dockpops@pixleygrowth.com" className="text-white underline underline-offset-4 hover:text-white/80">
              dockpops@pixleygrowth.com
            </a>
            .
          </p>
          <p className="text-white/50">DockPops is made by Pixley Growth LLC.</p>
        </Section>
      </main>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-white/50">&copy; {new Date().getFullYear()} Pixley Growth LLC. All rights reserved.</span>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/#support" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
