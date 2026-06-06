import type { PublicSection } from "../../lib/cms-types";

interface GalleryProps { section: PublicSection; }

export function Gallery({ section }: GalleryProps) {
  const items = section.items.filter((i) => i.type === "GALLERY_IMAGE");
  if (items.length === 0 && !section.imageUrl) return null;
  const images =
    items.length > 0
      ? items
      : [
          {
            type: "GALLERY_IMAGE" as const,
            title: null,
            description: null,
            imageUrl: section.imageUrl,
            imageAlt: section.imageAlt,
            authorName: null,
            authorTitle: null,
            authorCompany: null,
            sortOrder: 0,
          },
        ];
  return (
    <section
      id={section.sectionKey.toLowerCase()}
      aria-labelledby={`${section.sectionKey.toLowerCase()}-title`}
      className="relative border-b border-border bg-snow"
    >
      <span
        className="display-number pointer-events-none absolute left-6 top-6 text-[10rem] opacity-40 md:left-12 md:top-10 md:text-[14rem]"
        aria-hidden="true"
      >
        07
      </span>
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="reveal mb-16 max-w-2xl">
          <p className="label-uppercase accent-rule mb-6">Gallery</p>
          <h2
            id={`${section.sectionKey.toLowerCase()}-title`}
            className="text-display-lg text-primary"
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-secondary">
              {section.subtitle}
            </p>
          )}
        </div>
        <ul className="reveal-stagger grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((item, i) =>
            item.imageUrl ? (
              <li
                key={i}
                className="group relative overflow-hidden rounded-card bg-lightest-gray"
              >
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt ?? ""}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={300}
                  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.imageAlt && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-xs text-white/90">{item.imageAlt}</p>
                  </div>
                )}
              </li>
            ) : null,
          )}
        </ul>
      </div>
    </section>
  );
}
