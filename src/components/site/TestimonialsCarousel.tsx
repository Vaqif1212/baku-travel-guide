"use client";

import { useRef, useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import { TestimonialCard } from "./TestimonialCard";
import type { TestimonialViewModel } from "./Testimonials";

// >6 rəy olanda Testimonials.tsx-in çağırdığı üfüqi sürüşən karusel
// (istifadəçinin tələbi, 2026-09-16: "6-dan çox olanda sonrakılar
// sürüşdürülsün, sağa-sürüşdürmə düyməsi ilə"). Kartlar native
// overflow-x scroll içindədir (barmaqla/trackpad ilə də sürüşə bilər),
// düymə isə bir "səhifə" (konteynerin eni qədər) irəli sürüşdürür.
// Sona çatanda düymə sönür — geriyə native scroll ilə qayıtmaq olar.
export function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialViewModel[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  function updateAtEnd() {
    const el = scrollerRef.current;
    if (!el) return;
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  useEffect(() => {
    updateAtEnd();
  }, []);

  function scrollNext() {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.92, behavior: "smooth" });
  }

  return (
    <div className="relative mt-12">
      <div
        ref={scrollerRef}
        onScroll={updateAtEnd}
        className="scrollbar-hide flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth pb-2"
      >
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={Math.min(i, 5) * 100} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]">
            <TestimonialCard t={t} />
          </Reveal>
        ))}
      </div>
      {!atEnd && (
        <button
          type="button"
          onClick={scrollNext}
          aria-label="→"
          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 translate-x-1/3 items-center justify-center rounded-full bg-gold text-green-deep shadow-lg transition-transform hover:scale-110 sm:right-2"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.5 4.5L13 10l-5.5 5.5" />
          </svg>
        </button>
      )}
    </div>
  );
}
