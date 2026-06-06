import { site } from "../../content/site";
import { id as idContent } from "../../content/id";
import { en as enContent } from "../../content/en";
import type { Locale } from "../../lib/cms-types";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const content = locale === "id" ? idContent : enContent;
  const year = site.copyrightYear;
  return (
    <footer className="relative overflow-hidden bg-deep-dark text-surface">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src="/dtm-logo-mark.svg" alt="" className="h-8 w-8 brightness-0 invert" width={32} height={32} />
            <span className="text-lg font-display">{site.name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm opacity-80">{content.footer.tagline}</p>
          <p className="mt-6 text-xs opacity-60">
            <a href={`mailto:${site.contactEmail}`} className="hover:text-accent-soft transition-colors">
              {site.contactEmail}
            </a>
          </p>
        </div>
        <nav aria-label={content.a11y.footerNavigation}>
          <p className="label-uppercase mb-4 text-muted">{content.footer.sectionsTitle}</p>
          <ul className="space-y-2 text-sm">
            {content.nav.sections.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="opacity-80 hover:opacity-100 hover:text-accent-soft transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label-uppercase mb-4 text-muted">{content.footer.contactTitle}</p>
          <a
            href={locale === "en" ? "/en/contact" : "/contact"}
            className="inline-flex items-center gap-2 rounded-pill border border-white/20 px-4 py-2 text-sm hover:border-accent-soft hover:text-accent-soft transition-colors"
          >
            {content.nav.contact} →
          </a>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs opacity-60 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span>&copy; {year} {site.name}. {content.footer.rights}</span>
          <span className="font-mono">{site.domain}</span>
        </div>
      </div>
    </footer>
  );
}
