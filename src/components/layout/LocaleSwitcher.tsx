import type { Locale } from "../../lib/cms-types";
import { id as idContent } from "../../content/id";
import { en as enContent } from "../../content/en";

interface LocaleSwitcherProps {
  current: Locale;
  pathname: string;
}

// Swaps the locale prefix in the current path. "/" -> "/en", "/en" -> "/"
// "/en/about" -> "/about", "/about" -> "/en/about"
function swapLocalePath(pathname: string, target: Locale): string {
  const hasEn = pathname === "/en" || pathname.startsWith("/en/");
  if (target === "en") {
    if (hasEn) return pathname;
    return pathname === "/" ? "/en" : `/en${pathname}`;
  }
  if (hasEn) {
    const rest = pathname.slice(3);
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

export function LocaleSwitcher({ current, pathname }: LocaleSwitcherProps) {
  const target: Locale = current === "id" ? "en" : "id";
  const content = current === "id" ? idContent : enContent;
  const targetContent = target === "id" ? idContent : enContent;
  const href = swapLocalePath(pathname, target);
  return (
    <a
      href={href}
      className="btn-ghost text-sm"
      aria-label={content.a11y.localeSwitcher}
      hrefLang={target}
    >
      <span aria-hidden="true">{targetContent.locale.switchToShort}</span>
      <span className="sr-only">{targetContent.locale.switchTo}</span>
    </a>
  );
}
