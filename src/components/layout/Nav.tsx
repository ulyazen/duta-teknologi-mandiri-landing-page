import { LocaleSwitcher } from "./LocaleSwitcher";
import { Button } from "../ui/Button";
import { site } from "../../content/site";
import { id as idContent } from "../../content/id";
import { en as enContent } from "../../content/en";
import type { Locale } from "../../lib/cms-types";

interface NavProps {
  locale: Locale;
  pathname: string;
}

export function Nav({ locale, pathname }: NavProps) {
  const content = locale === "id" ? idContent : enContent;
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href={locale === "en" ? "/en" : "/"} className="flex items-center gap-2" aria-label={site.name}>
          <img src="/dtm-logo-mark.svg" alt="" className="h-7 w-7" width={28} height={28} />
          <span className="text-base font-display text-primary">{site.shortName}</span>
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
          <Button as="a" href={locale === "en" ? "/en/contact" : "/contact"}>
            {content.nav.contact}
          </Button>
        </div>
      </div>
    </header>
  );
}
