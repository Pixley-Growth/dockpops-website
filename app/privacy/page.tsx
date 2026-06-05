import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — DockPops",
  description:
    "DockPops keeps everything on your Mac — no analytics, no tracking, no cloud sync, no telemetry. Read the full privacy policy.",
  alternates: { canonical: "/privacy" },
};

/* Mirrors the in-app privacy doc (DockPops HelpBook 17-privacy-and-data) so the
   website and the app state the same thing. Update LAST_UPDATED when the policy
   text changes. */
const LAST_UPDATED = "June 5, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="space-y-3 text-white/70 leading-relaxed">{children}</div>
    </section>
  );
}

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
          run a server, and we never see your data.
        </p>

        <Section title="What DockPops stores">
          <p>All of this is kept locally on your Mac:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-white/85">Your Pops</strong> — names, contents, sort orders, colors, and icon choices.</li>
            <li><strong className="text-white/85">Per-Pop preferences</strong> — popover columns, &ldquo;Show in Carousel,&rdquo; and &ldquo;Match Dock icon color.&rdquo;</li>
            <li><strong className="text-white/85">Launch counts</strong> — how often you open each app from DockPops, used locally for the &ldquo;Most Used&rdquo; sort order. Never sent anywhere.</li>
            <li><strong className="text-white/85">Onboarding state</strong> — whether you&apos;ve seen the welcome sheet.</li>
            <li><strong className="text-white/85">Purchase status</strong> — a single flag indicating you&apos;ve bought Premium.</li>
          </ul>
        </Section>

        <Section title="Where it's stored">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>In your Mac&apos;s standard application preferences.</li>
            <li>Custom Pop icons (PNGs you import) live inside the app&apos;s own folder on your Mac.</li>
            <li>Nothing is stored on any DockPops server. We don&apos;t have one.</li>
          </ul>
        </Section>

        <Section title="What DockPops sends out">
          <p>Almost nothing. The complete list of network activity DockPops can produce:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong className="text-white/85">Favicon fetches</strong> — when you save a link to a Pop, DockPops fetches a small icon file from the site&apos;s own domain so the link looks right in your grid. One short request per saved URL; no other data is included.</li>
            <li>When you click an item that opens a URL, your browser makes the request — not DockPops.</li>
            <li>When you click &ldquo;Download Companion&rdquo; in the Multiple Dock Icons tab, that&apos;s a normal browser download from GitHub.</li>
            <li>When you buy Premium or restore a purchase, StoreKit talks to Apple&apos;s servers. DockPops never sees your Apple ID or payment information.</li>
            <li>When you email support — only if you choose to.</li>
          </ul>
          <p>Aside from favicon fetches, DockPops never reaches the internet on its own.</p>
        </Section>

        <Section title="SmartyPops and AI">
          <p>
            SmartyPops uses on-device AI via Apple Intelligence (macOS 26+). The
            model runs entirely on your Mac — your Pops, your apps, and your
            suggestions never leave the device. If your Mac doesn&apos;t support
            Apple Intelligence, SmartyPops falls back to a built-in heuristic that
            uses only your installed-app categories: no AI, also fully offline.
          </p>
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
            DockPops Companion is a free sibling app that provides extra Dock
            icons for your Pops. It communicates with DockPops locally on your
            Mac and has no network access of its own, no analytics, and no
            tracking. It stores nothing on any server.
          </p>
        </Section>

        <Section title="Analytics, tracking, and telemetry">
          <p>
            DockPops contains no analytics SDKs, no crash reporters that phone
            home, and no usage tracking. If something goes wrong and you choose to
            share a crash report, macOS offers to send it to Apple — and from
            Apple to us — only at your discretion.
          </p>
        </Section>

        <Section title="How you get DockPops">
          <p>
            This policy applies to DockPops whether you install it from the Mac
            App Store or download it directly from our website. Both builds behave
            the same way with respect to your data. App Store purchases are
            handled by Apple; direct downloads are notarized by Apple and check
            for updates by fetching a small, signed update file from our public
            releases page — no personal data is sent.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we change how DockPops handles data, we&apos;ll update this page and
            the &ldquo;Last updated&rdquo; date above. Because DockPops collects no
            data, changes are expected to be rare.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about privacy? Email{" "}
            <a href="mailto:dockpops@applacat.com" className="text-white underline underline-offset-4 hover:text-white/80">
              dockpops@applacat.com
            </a>
            .
          </p>
          <p className="text-white/50">DockPops is made by Applacat LLC.</p>
        </Section>
      </main>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-white/50">&copy; {new Date().getFullYear()} Applacat LLC. All rights reserved.</span>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/#support" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
