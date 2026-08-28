import type { Locale } from "@/lib/i18n";
import type { Tour, Testimonial } from "@prisma/client";
import type { TourViewModel } from "@/components/site/ToursSection";
import type { TestimonialViewModel } from "@/components/site/Testimonials";

function field<T extends Record<string, unknown>>(obj: T, base: string, locale: Locale): string {
  const key = `${base}${locale === "ru" ? "Ru" : locale === "az" ? "Az" : "En"}`;
  return String(obj[key] ?? "");
}

export function localizeTour(tour: Tour, locale: Locale): TourViewModel {
  return {
    id: tour.id,
    imageUrl: tour.imageUrl,
    title: field(tour, "title", locale),
    description: field(tour, "description", locale),
    durationHours: field(tour, "duration", locale),
    priceIndividualAzn: tour.priceIndividualAzn,
    priceGroupAzn: tour.priceGroupAzn,
  };
}

export function localizeTestimonial(t: Testimonial, locale: Locale): TestimonialViewModel {
  return {
    id: t.id,
    text: field(t, "text", locale),
    name: t.name,
    country: t.country,
  };
}
