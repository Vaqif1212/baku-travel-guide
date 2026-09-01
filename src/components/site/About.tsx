import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function About({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <section id="about" className="bg-bg-alt py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <Reveal>
          <div className="group relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-3xl border border-border">
            <Image
              src="/images/anar-bottle-house.jpg"
              alt="Anar"
              fill
              sizes="(min-width: 1024px) 384px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
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
                <span
                  key={tag}
                  className="rounded-full border border-gold/40 px-3.5 py-1.5 text-xs font-semibold text-green-deep transition-colors hover:bg-gold/10 dark:text-gold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-gold/30 bg-bg p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="relative mx-auto h-28 w-40 shrink-0 overflow-hidden rounded-lg border border-border sm:mx-0">
                <Image
                  src="/images/anar-tour-guide-license.jpg"
                  alt={dict.about.license.label}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="inline-flex items-center gap-1.5 text-sm font-bold text-green-deep dark:text-gold">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  {dict.about.license.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {dict.about.license.issuer} · {dict.about.license.numberLabel} {dict.about.license.number}
                  <br />
                  {dict.about.license.validLabel} {dict.about.license.validUntil}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
