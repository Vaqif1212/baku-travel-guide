import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";

export function About({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <section id="about" className="bg-bg-alt py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <div className="mx-auto flex aspect-4/5 w-full max-w-sm items-center justify-center rounded border border-border bg-linear-to-br from-green-mid to-green-deep">
          <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2" opacity="0.7">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold tracking-widest text-gold uppercase">{dict.about.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-fg sm:text-4xl">{dict.about.title}</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
            {dict.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {dict.about.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-gold/40 px-3.5 py-1.5 text-xs font-semibold text-green-deep dark:text-gold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
