import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { Reveal } from "./Reveal";

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
        <Reveal>
          <p className="text-center text-sm font-bold tracking-widest text-gold uppercase">{dict.testimonials.eyebrow}</p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold text-cream sm:text-4xl">
            {dict.testimonials.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <div className="rounded-2xl border border-gold/25 bg-cream/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-cream/10">
                <div className="mb-2.5 font-display text-3xl leading-none text-gold">&ldquo;</div>
                <p className="text-sm leading-relaxed text-cream/85">{t.text}</p>
                <div className="mt-5 text-sm font-bold text-cream">
                  {t.name}, {t.country}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {googleReviewLink && (
          <div className="mt-8 text-center">
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 px-6 py-3 text-sm font-bold text-gold transition-all hover:scale-[1.03] hover:bg-gold/10"
            >
              {dict.testimonials.leaveGoogleReview}
            </a>
          </div>
        )}
        <p className="mt-6 text-center text-[10px] text-cream/25">{dict.testimonials.disclaimer}</p>
      </div>
    </section>
  );
}
