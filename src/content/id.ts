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
    tagline: "Suku cadang industri, dari sumber terpercaya.",
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
  contact: {
    eyebrow: "Kontak",
    title: "Bicara dengan tim kami",
    subtitle:
      "Ceritakan kebutuhan Anda. Kami akan membalas dalam satu hari kerja dengan ketersediaan dan estimasi waktu pengiriman.",
    nextTitle: "Apa selanjutnya",
    nextSteps: [
      "Kami biasanya membalas dalam satu hari kerja",
      "Sertakan nomor part atau deskripsi singkat",
      "Kami konfirmasi ketersediaan dan lead time",
    ],
    responseLead: "Kami biasanya membalas dalam",
    responseTime: "satu hari kerja",
  },
  a11y: {
    mainNavigation: "Navigasi utama",
    localeSwitcher: "Ganti bahasa",
    footerNavigation: "Navigasi footer",
  },
} as const;

export const localeId: Locale = "id";
