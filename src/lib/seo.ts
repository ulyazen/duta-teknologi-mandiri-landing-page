// Lightweight SEO helpers. The site is fully static, so this module
// produces the JSON-LD graph and canonical/hreflang tags. The actual
// <head> tags are injected by the prerender script and by index.html.

import type { PublicSection } from "./cms-types";

interface SiteConfig {
  name: string;
  url: string;
  logo: string;
  contactEmail: string;
}

const DEFAULT_SITE: SiteConfig = {
  name: "Duta Teknologi Mandiri",
  url: "https://dutateknologimandiri.com",
  logo: "https://dutateknologimandiri.com/dtm-logo-mark.svg",
  contactEmail: "contact@dutateknologimandiri.com",
};

export function buildOrganizationJsonLd(site: SiteConfig = DEFAULT_SITE): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: site.logo,
    email: site.contactEmail,
    description:
      "Indonesia-based supplier of industrial parts. We help buyers source the parts their operations need, with full order tracking and multi-currency purchasing.",
  });
}

export function buildWebSiteJsonLd(site: SiteConfig = DEFAULT_SITE, sections: PublicSection[] = []): string {
  const hero = sections.find((s) => s.sectionKey === "HERO");
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: ["id", "en"],
    description: hero?.subtitle ?? "Industrial parts, sourced and delivered.",
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  });
}

export function buildContactPageJsonLd(site: SiteConfig = DEFAULT_SITE): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: `${site.url}/contact`,
    publisher: {
      "@type": "Organization",
      name: site.name,
      email: site.contactEmail,
    },
  });
}
