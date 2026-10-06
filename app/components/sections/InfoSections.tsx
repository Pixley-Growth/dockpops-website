import Image from "next/image";
import type { Dict } from "../../i18n/en";
import { popBySlug } from "../../pops";
import { PREMIUM_PRICE } from "../../config";
import { LOCALES, homeHref } from "../../i18n/locales";
import { ConsentSettingsLink } from "../Consent";
import Downloads from "../Downloads";
import LivePop from "../LivePop";
import PopClip from "../PopClip";

/** One line of plain facts under the hero. */
export function TrustRow({ t }: { t: Dict }) {
  return (
    <ul className="dp-trust" aria-label={t.a11y.facts}>
      {t.trust.map((fact) => (
        <li key={fact}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
            <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {fact}
        </li>
      ))}
    </ul>
  );
}

const EVERYDAY = ["office", "spring-launch", "writing", "code", "photo", "travel", "weekend", "utilities"];

/** A Pop for every part of your day: the demo Pops side by side, the live ones running. */
export function Everyday({ t }: { t: Dict }) {
  return (
    <section className="dp-scene dp-scene--stack dp-everyday" aria-labelledby="everyday-title">
      <Image src="/wallpapers/strawberry-baby.jpg" alt="" fill sizes="100vw" quality={80} className="dp-wallpaper" />
      <div className="dp-scene-copy dp-on-wall">
        <h2 id="everyday-title" className="dp-display dp-scene-title">
          {t.everyday.title}
        </h2>
        <div className="dp-scene-body">
          <p>{t.everyday.body}</p>
        </div>
      </div>
      <div className="dp-everyday-row">
        {EVERYDAY.map((slug) => {
          const pop = popBySlug(slug);
          const scale = pop.view === "grid" ? 0.62 : 0.56;
          return (
            <figure key={slug} className="dp-everyday-item">
              {pop.fx ? <LivePop pop={pop} scale={scale} /> : <PopClip pop={pop} scale={scale} />}
              <figcaption className="dp-on-wall">{pop.name}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

/** Download free. Upgrade once. */
export function Pricing({ t }: { t: Dict }) {
  // The figure is the US price; other storefronts price it themselves, so other languages show the line.
  const price = t.lang === "en" ? PREMIUM_PRICE : null;
  return (
    <section className="dp-scene dp-scene--stack dp-pricing" id="pricing" aria-labelledby="pricing-title">
      <Image src="/wallpapers/lime-sharp.jpg" alt="" fill sizes="100vw" quality={80} className="dp-wallpaper" />
      <div className="dp-scene-copy dp-on-wall dp-pricing-copy">
        <h2 id="pricing-title" className="dp-display dp-scene-title">
          {t.pricing.title}
        </h2>
      </div>
      <div className="dp-plans">
        <article className="dp-window dp-plan">
          <h3>{t.pricing.free}</h3>
          <p className="dp-plan-price">
            {t.lang === "en" ? (
              <>
                $0 <span>{t.pricing.freeLine}</span>
              </>
            ) : (
              <span className="dp-plan-once">{t.pricing.freeLine}</span>
            )}
          </p>
          <ul>
            {t.pricing.freeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="dp-window dp-plan dp-plan--premium">
          <h3>{t.pricing.premium}</h3>
          <p className="dp-plan-price">
            {price ? (
              <>
                {price} <span>{t.pricing.once}</span>
              </>
            ) : (
              <span className="dp-plan-once">{t.pricing.premiumLine}</span>
            )}
          </p>
          {price && <p className="dp-plan-line">{t.pricing.premiumLine}</p>}
          <ul>
            {t.pricing.premiumItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
      <div className="dp-pricing-cta">
        <Downloads t={t} location="pricing" />
      </div>
    </section>
  );
}

/** FAQ, with its FAQPage JSON-LD so search can show the answers. */
export function Faq({ t }: { t: Dict }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <section className="dp-plain" id="faq" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="dp-plain-inner">
        <h2 id="faq-title" className="dp-display dp-plain-title">
          {t.faq.title}
        </h2>
        <div className="dp-faq">
          {t.faq.items.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <svg viewBox="0 0 14 14" width="13" height="13" aria-hidden>
                  <path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Support and the footer. */
export function SiteFooter({ t }: { t: Dict }) {
  return (
    <footer className="dp-footer" id="support">
      <div className="dp-footer-support">
        <h2 className="dp-display">{t.support.title}</h2>
        <p>{t.support.body}</p>
        <a className="dp-footer-mail" href={`mailto:${t.support.email}`}>
          {t.support.email}
        </a>
      </div>
      <div className="dp-footer-base">
        <span>
          © {new Date().getFullYear()} {t.footer.rights}
        </span>
        <nav aria-label={t.a11y.footer}>
          <a href="/privacy">{t.footer.privacy}</a>
          <a href="#support">{t.footer.support}</a>
          <ConsentSettingsLink label={t.consent.settings} />
        </nav>
        <nav className="dp-footer-langs" aria-label={t.footer.language}>
          {LOCALES.map((l) => (
            <a key={l.lang} href={homeHref(l)} lang={l.lang} hrefLang={l.lang} aria-current={l.lang === t.lang ? "page" : undefined}>
              {l.name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
