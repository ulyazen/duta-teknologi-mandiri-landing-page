import { z } from "zod";

// The 12 documented section keys per docs/api/landing-page.md.
// The dashboard Prisma model also has CONTACT, but the public API
// docs only list these 12. We accept any string as sectionKey so
// the schema is forward-compatible with the dashboard adding more
// sections; the prerender filters down to the 12 documented keys
// before embedding, and App.tsx ignores unknown keys.
const SectionKeySchema = z.string();

const ItemTypeSchema = z.enum(["SERVICE", "TESTIMONIAL", "FAQ", "GALLERY_IMAGE"]);

export const PublicSectionItemSchema = z.object({
  type: ItemTypeSchema,
  title: z.string().nullable(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  imageAlt: z.string().nullable(),
  authorName: z.string().nullable(),
  authorTitle: z.string().nullable(),
  authorCompany: z.string().nullable(),
  sortOrder: z.number(),
});

export const PublicSectionSchema = z.object({
  sectionKey: SectionKeySchema,
  title: z.string(),
  subtitle: z.string().nullable(),
  body: z.string().nullable(),
  imageUrl: z.string().nullable(),
  imageAlt: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  sortOrder: z.number(),
  items: z.array(PublicSectionItemSchema),
});

const PublicSectionsResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(PublicSectionSchema),
});

export function parsePublicSections(input: unknown) {
  const result = PublicSectionsResponseSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`CMS response validation failed: ${result.error.message}`);
  }
  return result.data.data;
}

export function parsePublicSection(input: unknown) {
  const result = PublicSectionSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`CMS section validation failed: ${result.error.message}`);
  }
  return result.data;
}

// The 12 documented section keys per docs/api/landing-page.md.
export const PUBLIC_SECTION_KEYS = new Set([
  "HERO", "ABOUT", "SERVICES", "WHY_US", "PROCESS", "STATS",
  "TESTIMONIALS", "CLIENTS", "PARTNERS", "IMAGE_GALLERY", "FAQ",
  "CTA_BANNER",
]);

// Filter helper: keep only the 12 documented keys.
export function filterToPublicSections<T extends { sectionKey: string }>(sections: T[]): T[] {
  return sections.filter((s) => PUBLIC_SECTION_KEYS.has(s.sectionKey));
}
