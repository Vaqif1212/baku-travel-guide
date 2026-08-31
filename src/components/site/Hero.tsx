import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { whatsappHref, telHref } from "@/lib/contact";
import { OrnamentDecor } from "./Decor";
import { Reveal } from "./Reveal";

export function Hero({ locale, whatsapp, phone }: { locale: Locale; whatsapp: string; phone: string }) {
  const dict = getDict(locale);
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Image
        src="/images/hero-flame-towers.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover animate-hero-zoom"
      />
      <div className="absolute inset-0 bg-linear-to-r from-green-darker via-green-darker/75 to-green-darker/30" />
      <div className="absolute inset-0 bg-linear-to-t from-green-darker via-transparent to-green-darker/20" />
      <OrnamentDecor className="absolute -right-6 top-10 hidden opacity-35 sm:block" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal immediate y={16}>
            <p className="mb-5 text-sm font-bold tracking-widest text-gold uppercase">{dict.hero.eyebrow}</p>
          </Reveal>
          <Reveal immediate delay={100} y={20}>
            <h1 className="font-display text-4xl font-bold leading-tight text-cream sm:text-5xl lg:text-6xl">
              {dict.hero.titleLine1}
              <br />
              {dict.hero.titleLine2}
            </h1>
          </Reveal>
          <Reveal immediate delay={200} y={20}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75">{dict.hero.subtitle}</p>
          </Reveal>
          <Reveal immediate delay={320} y={20}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappHref(whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full bg-gold px-7 py-4 text-sm font-bold text-green-deep transition-all hover:scale-[1.03] hover:bg-gold-light active:scale-[0.97]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20l1.1-5.4A8.5 8.5 0 1 1 21 11.5Z" />
                </svg>
                {dict.hero.ctaPrimary}
              </a>
              <a
                href={telHref(phone)}
                className="flex items-center justify-center gap-2.5 rounded-full border border-cream/40 px-7 py-4 text-sm font-bold text-cream transition-all hover:scale-[1.03] hover:border-gold hover:text-gold active:scale-[0.97]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2Z" />
                </svg>
                {dict.hero.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
