"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { Reveal } from "./Reveal";

// Fallback used only if the admin hasn't uploaded any photos yet in Settings.
const DEFAULT_PHOTOS = [
  "/images/anar-mountain-peak.jpg",
  "/images/tour-diri-baba-group.jpg",
  "/images/tour-ateshgah-fire.jpg",
  "/images/tour-xinaliq-village.jpg",
  "/images/tour-jeep-safari.jpg",
  "/images/anar-canyon-river.jpg",
  "/images/tour-group-statue.jpg",
];

export function Gallery({ locale, photos }: { locale: Locale; photos: string[] }) {
  const dict = getDict(locale);
  const list = photos.length > 0 ? photos : DEFAULT_PHOTOS;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <section className="bg-bg-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-sm font-bold tracking-widest text-gold uppercase">{dict.gallery.eyebrow}</p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold text-fg sm:text-4xl">{dict.gallery.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted">{dict.gallery.subtitle}</p>
        </Reveal>

        <div className="mt-12 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {list.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 80} y={16}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className={`group relative mb-4 block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border ${i % 3 === 0 ? "aspect-3/4" : "aspect-4/3"}`}
              >
                <Image
                  src={src}
                  alt={dict.gallery.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-10"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label={dict.gallery.closeLightbox}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>
          <div className="relative h-full max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={list[openIndex]}
              alt={dict.gallery.photoAlt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
