import type { Locale } from "../lib/cms-types";

export const en = {
  nav: {
    sections: [
      { href: "/#about", label: "About" },
      { href: "/#services", label: "What you get" },
      { href: "/#process", label: "Process" },
      { href: "/#faq", label: "FAQ" },
    ],
    contact: "Talk to us",
    skipToContent: "Skip to content",
  },
  footer: {
    tagline: "Industrial parts, sourced and delivered.",
    sectionsTitle: "Pages",
    contactTitle: "Contact",
    rights: "All rights reserved.",
  },
  locale: {
    switchTo: "Bahasa Indonesia",
    switchToShort: "ID",
    current: "EN",
  },
  cta: {
    learnMore: "Learn more",
    getInTouch: "Talk to us",
  },
  a11y: {
    mainNavigation: "Primary navigation",
    localeSwitcher: "Switch language",
    footerNavigation: "Footer navigation",
  },
} as const;

export const localeEn: Locale = "en";
