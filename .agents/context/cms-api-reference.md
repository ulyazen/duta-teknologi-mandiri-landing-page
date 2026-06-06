# CMS API Reference (adapted from dashboard docs/api/landing-page.md)

Base URL: `https://admin.dutateknologimandiri.com/api/landing-page`

## Endpoints
- `GET /api/landing-page` — returns all active sections
- `GET /api/landing-page?key=HERO` — returns a single section
- `OPTIONS` — CORS preflight (returns 204)

## Response shape
```json
{
  "success": true,
  "data": [
    {
      "sectionKey": "HERO",
      "title": "String",
      "subtitle": "String | null",
      "body": "String | null",
      "imageUrl": "String | null (absolute URL)",
      "imageAlt": "String | null",
      "ctaText": "String | null",
      "ctaLink": "String | null",
      "sortOrder": "Number",
      "items": [
        {
          "type": "SERVICE|TESTIMONIAL|FAQ|GALLERY_IMAGE",
          "title": "String | null",
          "description": "String | null",
          "imageUrl": "String | null",
          "imageAlt": "String | null",
          "authorName": "String | null",
          "authorTitle": "String | null",
          "authorCompany": "String | null",
          "sortOrder": "Number"
        }
      ]
    }
  ]
}
```

## Cache headers
- `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`
- CORS: `Access-Control-Allow-Origin: *`

## Image URLs
- All `imageUrl` fields are absolute (`https://admin...`). Reference them directly.

## Valid section keys (12)
HERO, ABOUT, SERVICES, WHY_US, PROCESS, STATS, TESTIMONIALS,
CLIENTS, PARTNERS, IMAGE_GALLERY, FAQ, CTA_BANNER.

Note: the Prisma model also has a `CONTACT` key but the public API
docs do not expose it. We do not consume it; the contact page is local.
