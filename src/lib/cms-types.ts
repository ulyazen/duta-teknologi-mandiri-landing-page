// TypeScript types for the CMS API contract.
// Mirrors duta-teknologi-mandiri-web-app/src/app/api/landing-page/route.ts.
// The Zod schema lives in src/lib/cms-schema.ts (TASK-003).

export type SectionKey =
  | "HERO"
  | "ABOUT"
  | "SERVICES"
  | "WHY_US"
  | "PROCESS"
  | "STATS"
  | "TESTIMONIALS"
  | "CLIENTS"
  | "PARTNERS"
  | "IMAGE_GALLERY"
  | "FAQ"
  | "CTA_BANNER";

export type ItemType = "SERVICE" | "TESTIMONIAL" | "FAQ" | "GALLERY_IMAGE";

export type Locale = "id" | "en";

export interface PublicSectionItem {
  type: ItemType;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  authorName: string | null;
  authorTitle: string | null;
  authorCompany: string | null;
  sortOrder: number;
}

export interface PublicSection {
  sectionKey: SectionKey;
  title: string;
  subtitle: string | null;
  body: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  sortOrder: number;
  items: PublicSectionItem[];
}
