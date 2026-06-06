import { LocaleSwitcher } from "./LocaleSwitcher";
import { site } from "../../content/site";
import { id as idContent } from "../../content/id";
import { en as enContent } from "../../content/en";
import type { Locale } from "../../lib/cms-types";
import { useState } from "react";

interface NavProps {
  locale: Locale;
  pathname: string;
}

export function Nav({ locale, pathname }: NavProps) {
  const content = locale === "id" ? idContent : enContent;
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href={locale === "en" ? "/en" : "/"} className="flex items-center gap-2" aria-label={site.name}>
          <img src="/dtm-logo-mark.svg" alt="" className="h-7 w-7" width={28} height={28} />
          <span className="text-base font-display text-primary">{site.name}</span>
        </a>
        <nav aria-label={content.a11y.mainNavigation} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {content.nav.sections.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="btn-ghost text-sm">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher current={locale} pathname={pathname} />
          <a
            href={locale === "en" ? "/en/contact" : "/contact"}
            className="btn-solid text-sm"
          >
            {content.nav.contact}
          </a>
          <button
            type="button"
            className="md:hidden btn-ghost text-sm"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label={content.a11y.mainNavigation} className="md:hidden border-t border-border bg-surface">
          <ul className="mx-auto max-w-6xl px-6 py-4 space-y-1">
            {content.nav.sections.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-card px-4 py-2 text-base text-primary hover:bg-snow"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
