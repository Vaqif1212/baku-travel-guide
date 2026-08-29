import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";

export type TestimonialViewModel = { id: string; text: string; name: string; country: string };

export function Testimonials({
  locale,
  testimonials,
  googleReviewLink,
}: {
  locale: Locale;
  testimonials: TestimonialViewModel[];
  googleReviewLink?: string;
}) {
  const dict = getDict(locale);
  return (
    <section id="reviews" className="bg-green-deep py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-sm font-bold tracking-widest text-gold uppercase">{dict.testimonials.eyebrow}</p>
        <h2 className="mt-3 text-center font-display text-3xl font-bold text-cream sm:text-4xl">
          {dict.testimonials.title}
        </h2>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded border border-gold/25 bg-cream/5 p-8">
              <div className="mb-2.5 font-display text-3xl leading-none text-gold">&ldquo;</div>
              <p className="text-sm leading-relaxed text-cream/85">{t.text}</p>
              <div className="mt-5 text-sm font-bold text-cream">
                {t.name}, {t.country}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-7 text-center text-xs text-cream/40">{dict.testimonials.disclaimer}</p>

        {googleReviewLink && (
          <div className="mt-8 text-center">
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-sm border border-gold/40 px-6 py-3 text-sm font-bold text-gold hover:bg-gold/10 transition-colors"
            >
              {dict.testimonials.leaveGoogleReview}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
