import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const PHOTOS = [
  { src: "/images/anar-mountain-peak.jpg", tall: true },
  { src: "/images/tour-diri-baba-group.jpg", tall: false },
  { src: "/images/tour-ateshgah-fire.jpg", tall: false },
  { src: "/images/tour-xinaliq-village.jpg", tall: true },
  { src: "/images/tour-jeep-safari.jpg", tall: false },
  { src: "/images/anar-canyon-river.jpg", tall: false },
  { src: "/images/tour-group-statue.jpg", tall: true },
];

export function Gallery({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <section className="bg-bg-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-sm font-bold tracking-widest text-gold uppercase">{dict.gallery.eyebrow}</p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold text-fg sm:text-4xl">{dict.gallery.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted">{dict.gallery.subtitle}</p>
        </Reveal>

        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 4) * 80} y={16}>
              <div
                className={`group relative mb-4 w-full overflow-hidden rounded-2xl border border-border ${photo.tall ? "aspect-3/4" : "aspect-4/3"}`}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
