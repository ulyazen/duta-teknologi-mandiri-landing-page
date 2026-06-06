import type { PublicSection } from "../../lib/cms-types";

interface GalleryProps { section: PublicSection; }

export function Gallery({ section }: GalleryProps) {
  const items = section.items.filter((i) => i.type === "GALLERY_IMAGE");
  if (items.length === 0 && !section.imageUrl) return null;
  const images = items.length > 0 ? items : [{ type: "GALLERY_IMAGE" as const, title: null, description: null, imageUrl: section.imageUrl, imageAlt: section.imageAlt, authorName: null, authorTitle: null, authorCompany: null, sortOrder: 0 }];
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="border-b border-border bg-snow"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="label-uppercase mb-4">Gallery</p>
          <h2 id={`${section.sectionKey.toLowerCase()}-title`} className="text-display-lg font-normal text-primary">
            {section.title}
          </h2>
          {section.subtitle && <p className="mt-4 text-lg text-muted">{section.subtitle}</p>}
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((item, i) =>
            item.imageUrl ? (
              <li key={i} className="overflow-hidden rounded-card bg-lightest-gray">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt ?? ""}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={300}
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </li>
            ) : null
          )}
        </ul>
      </div>
    </section>
  );
}
