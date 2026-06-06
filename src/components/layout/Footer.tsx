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
    <footer className="border-t border-border bg-snow">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src="/dtm-logo-mark.svg" alt="" className="h-7 w-7" width={28} height={28} />
            <span className="text-base font-display text-primary">{site.name}</span>
          </div>
          <p className="mt-3 text-sm text-muted">{content.footer.tagline}</p>
        </div>
        <nav aria-label={content.a11y.footerNavigation}>
          <p className="label-uppercase mb-3">{content.footer.sectionsTitle}</p>
          <ul className="space-y-2 text-sm">
            {content.nav.sections.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="text-muted hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label-uppercase mb-3">{content.footer.contactTitle}</p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-sm text-muted hover:text-accent"
          >
            {site.contactEmail}
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-muted">
          &copy; {year} {site.name}. {content.footer.rights}
        </div>
      </div>
    </footer>
  );
}
