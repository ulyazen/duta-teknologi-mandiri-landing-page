import type { Locale } from "../lib/cms-types";

export const en = {
  nav: {
    sections: [
      { href: "/#about", label: "About" },
      { href: "/#services", label: "Services" },
      { href: "/#process", label: "Process" },
      { href: "/#faq", label: "FAQ" },
    ],
    contact: "Contact us",
    skipToContent: "Skip to content",
  },
  footer: {
    tagline: "Industrial parts procurement, end to end.",
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
    getInTouch: "Get in touch",
  },
  a11y: {
    mainNavigation: "Primary navigation",
    localeSwitcher: "Switch language",
    footerNavigation: "Footer navigation",
  },
} as const;

export const localeEn: Locale = "en";
