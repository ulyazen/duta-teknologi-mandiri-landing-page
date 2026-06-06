import type { Locale } from "../lib/cms-types";

export const id = {
  nav: {
    sections: [
      { href: "/#about", label: "Tentang" },
      { href: "/#services", label: "Layanan" },
      { href: "/#process", label: "Proses" },
      { href: "/#faq", label: "FAQ" },
    ],
    contact: "Hubungi kami",
    skipToContent: "Lewati ke konten",
  },
  footer: {
    tagline: "Pengadaan suku cadang industri, dari hulu ke hilir.",
    sectionsTitle: "Halaman",
    contactTitle: "Kontak",
    rights: "Hak cipta dilindungi.",
  },
  locale: {
    switchTo: "English",
    switchToShort: "EN",
    current: "ID",
  },
  cta: {
    learnMore: "Pelajari lebih lanjut",
    getInTouch: "Hubungi kami",
  },
  a11y: {
    mainNavigation: "Navigasi utama",
    localeSwitcher: "Ganti bahasa",
    footerNavigation: "Navigasi footer",
  },
} as const;

export const localeId: Locale = "id";
