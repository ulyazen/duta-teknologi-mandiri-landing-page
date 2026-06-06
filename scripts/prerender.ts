#!/usr/bin/env tsx
/**
 * Static prerender for the landing page.
 *
 * Reads CMS data at build time and writes static HTML for:
 *   - /               (id home)
 *   - /en/            (en home)
 *   - /contact/       (id contact)
 *   - /en/contact/    (en contact)
 *   - /sitemap.xml
 *   - /robots.txt
 *
 * The CMS data is also written to dist/cms-data.json for the client
 * to revalidate against in the background (TanStack Query in v1.1).
 *
 * Behavior:
 *  - If CMS_API_BASE_URL is set, fetch from the real API. The build
 *    fails loudly if the API is unreachable or returns invalid data.
 *  - If CMS_API_BASE_URL is unset, use the local stub from
 *    src/lib/stub-cms.ts.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getLandingPage, type CmsError } from "../src/lib/cms";
import { STUB_SECTIONS } from "../src/lib/stub-cms";
import { buildOrganizationJsonLd, buildWebSiteJsonLd, buildContactPageJsonLd } from "../src/lib/seo";
import type { PublicSection } from "../src/lib/cms-types";

const SITE_ORIGIN = "https://dutateknologimandiri.com";

interface Route {
  locale: "id" | "en";
  outDir: string;
  indexPath: string;
  htmlLang: string;
  canonical: string;
  page: "home" | "contact";
  title: string;
  description: string;
  jsonLd: string;
}

async function main(): Promise<void> {
  const apiBase = process.env.CMS_API_BASE_URL;
  let sections: PublicSection[];
  let fetchedAt: string;
  let source: "live" | "stub";

  // The 12 documented section keys per docs/api/landing-page.md.
  // The dashboard Prisma model also has CONTACT, but the public API
  // docs only list these 12. We never consume CONTACT on the public
  // site; the contact page is local (mailto form). If the dashboard
  // returns CONTACT, we drop it here so the page never accidentally
  // shows admin-only data.
  const PUBLIC_SECTION_KEYS = new Set([
    "HERO", "ABOUT", "SERVICES", "WHY_US", "PROCESS", "STATS",
    "TESTIMONIALS", "CLIENTS", "PARTNERS", "IMAGE_GALLERY", "FAQ",
    "CTA_BANNER",
  ]);

  if (apiBase) {
    try {
      const result = await getLandingPage();
      const filtered = result.sections.filter((s) => PUBLIC_SECTION_KEYS.has(s.sectionKey));
      const dropped = result.sections.length - filtered.length;
      sections = filtered;
      fetchedAt = result.fetchedAt;
      source = "live";
      console.log(`[prerender] fetched ${result.sections.length} sections from live API (${dropped} dropped: admin-only); embedded ${sections.length} at ${fetchedAt}`);
    } catch (err) {
      const e = err as CmsError;
      console.error(`[prerender] CMS error (live): ${e.kind} - ${e.message}`);
      process.exit(1);
    }
  } else {
    sections = STUB_SECTIONS.filter((s) => PUBLIC_SECTION_KEYS.has(s.sectionKey));
    fetchedAt = new Date().toISOString();
    source = "stub";
    console.log(`[prerender] CMS_API_BASE_URL not set; using ${sections.length} sections from local stub`);
  }

  await mkdir("dist", { recursive: true });
  await writeFile(
    "dist/cms-data.json",
    JSON.stringify({ sections, fetchedAt, source }, null, 2),
    "utf8"
  );

  const indexHtmlTemplate = await readFile("dist/index.html", "utf8");

  const heroSubtitle = sections.find((s) => s.sectionKey === "HERO")?.subtitle ?? null;

  const ROUTES: Route[] = [
    {
      locale: "id", outDir: "dist", indexPath: "index.html", htmlLang: "id",
      canonical: `${SITE_ORIGIN}/`, page: "home",
      title: "Duta Teknologi Mandiri - Pengadaan suku cadang industri",
      description: heroSubtitle ?? "Pengadaan suku cadang industri, dari hulu ke hilir.",
      jsonLd: buildOrganizationJsonLd(),
    },
    {
      locale: "en", outDir: "dist/en", indexPath: "index.html", htmlLang: "en",
      canonical: `${SITE_ORIGIN}/en/`, page: "home",
      title: "Duta Teknologi Mandiri - Industrial parts procurement",
      description: heroSubtitle ?? "Industrial parts procurement, end to end.",
      jsonLd: buildWebSiteJsonLd(undefined, sections),
    },
    {
      locale: "id", outDir: "dist/contact", indexPath: "index.html", htmlLang: "id",
      canonical: `${SITE_ORIGIN}/contact/`, page: "contact",
      title: "Hubungi kami - Duta Teknologi Mandiri",
      description: "Ceritakan kebutuhan Anda. Kami akan membalas dalam satu hari kerja.",
      jsonLd: buildContactPageJsonLd(),
    },
    {
      locale: "en", outDir: "dist/en/contact", indexPath: "index.html", htmlLang: "en",
      canonical: `${SITE_ORIGIN}/en/contact/`, page: "contact",
      title: "Contact us - Duta Teknologi Mandiri",
      description: "Tell us what you need. We will reply within one business day.",
      jsonLd: buildContactPageJsonLd(),
    },
  ];

  for (const route of ROUTES) {
    await mkdir(route.outDir, { recursive: true });
    const html = indexHtmlTemplate
      .replace(/<html lang="[^"]*"/, `<html lang="${route.htmlLang}"`)
      .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
      .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${route.description.replace(/"/g, "&quot;")}"`)
      .replace(
        "</head>",
        [
          `<link rel="canonical" href="${route.canonical}" />`,
          `<link rel="alternate" hreflang="id" href="${SITE_ORIGIN}/" />`,
          `<link rel="alternate" hreflang="en" href="${SITE_ORIGIN}/en/" />`,
          `<script type="application/ld+json" id="__JSON_LD__">${route.jsonLd.replace(/</g, "\\u003c")}</script>`,
          `<script type="application/json" id="__CMS_DATA__">${JSON.stringify({ sections, fetchedAt, source }).replace(/</g, "\\u003c")}</script>`,
          `<script type="application/json" id="__ROUTE_META__">${JSON.stringify({ page: route.page, locale: route.locale, pathname: route.canonical.replace(SITE_ORIGIN, "") }).replace(/</g, "\\u003c")}</script>`,
          "</head>",
        ].join("\n  ")
      );
    await writeFile(resolve(route.outDir, route.indexPath), html, "utf8");
    console.log(`[prerender] wrote ${route.outDir}/${route.indexPath}`);
  }

  // sitemap.xml
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_ORIGIN}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_ORIGIN}/en/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_ORIGIN}/contact/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_ORIGIN}/en/contact/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
  await writeFile("dist/sitemap.xml", sitemap, "utf8");
  console.log("[prerender] wrote dist/sitemap.xml");

  // robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
  await writeFile("dist/robots.txt", robots, "utf8");
  console.log("[prerender] wrote dist/robots.txt");

  console.log("[prerender] done");
}

main().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
