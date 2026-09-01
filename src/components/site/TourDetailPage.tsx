import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { localizeTour } from "@/lib/localize";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { whatsappHref } from "@/lib/contact";
import { splitParagraphs, splitLines } from "@/lib/paragraphs";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PromoBanner } from "./PromoBanner";
import { Reveal } from "./Reveal";
import { TourPricePicker } from "./TourPricePicker";

export async function TourDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const dict = getDict(locale);
  const [tour, settings] = await Promise.all([prisma.tour.findUnique({ where: { slug } }), getSettings()]);
  if (!tour || !tour.published) notFound();

  const view = localizeTour(tour, locale);
  const promoText = locale === "ru" ? settings.promoTextRu : locale === "az" ? settings.promoTextAz : settings.promoTextEn;
  const home = locale === "ru" ? "" : `/${locale}`;
  const paragraphs = splitParagraphs(view.description);
  const includedList = splitLines(view.included);
  const notIncludedList = splitLines(view.notIncluded);

  const contact = {
    phone: settings.phone,
    email: settings.email,
    instagram: settings.instagram,
    whatsapp: settings.whatsapp,
    whatsapp2: settings.whatsapp2,
    telegram: settings.telegram,
    facebook: settings.facebook,
  };

  return (
    <div className="min-h-screen bg-bg">
      {settings.promoEnabled && promoText && <PromoBanner text={promoText} />}
      <Header locale={locale} whatsapp={settings.whatsapp} />

      <main className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl px-5 pt-12 sm:px-8 sm:pt-16">
          <Link href={`${home}/#tours`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-light">
            {dict.tours.backToTours}
          </Link>
          <p className="mt-6 text-sm font-bold tracking-widest text-gold uppercase">
            {dict.tours.dayTour} · {view.durationHours}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">{view.title}</h1>
        </div>

        {view.imageUrl && (
          <Reveal immediate y={16} className="relative mx-auto mt-8 h-72 max-w-4xl overflow-hidden border border-border sm:mt-10 sm:h-96 sm:rounded-3xl">
            <Image src={view.imageUrl} alt={view.title} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" priority />
          </Reveal>
        )}

        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="mt-10 space-y-8 text-base leading-relaxed text-fg/85 sm:text-lg">
            {paragraphs.map((para, i) => {
              const img = tour.galleryImages[i];
              return (
                <div key={i}>
                  <p>{para}</p>
                  {img && (
                    <Reveal y={16} className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-border">
                      <Image
                        src={img}
                        alt={`${view.title} ${i + 1}`}
                        fill
                        sizes="(min-width: 640px) 672px, 100vw"
                        className="object-cover"
                      />
                    </Reveal>
                  )}
                </div>
              );
            })}
          </div>

          <Reveal delay={100} className="mt-10">
            <TourPricePicker
              tiers={view.priceTiers}
              rates={{ usdRate: settings.usdRate, rubRate: settings.rubRate }}
              labels={{
                perCar: dict.tours.perCar,
                perPerson: dict.tours.perPerson,
                peopleWord: dict.tours.peopleWord,
              }}
            />
          </Reveal>

          {(includedList.length > 0 || notIncludedList.length > 0) && (
            <Reveal delay={130} className="mt-10 grid gap-6 sm:grid-cols-2">
              {includedList.length > 0 && (
                <div>
                  <h2 className="font-display text-lg font-bold text-fg">{dict.tours.includedTitle}</h2>
                  <ul className="mt-3 space-y-2 text-sm text-fg/85">
                    {includedList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 text-gold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {notIncludedList.length > 0 && (
                <div>
                  <h2 className="font-display text-lg font-bold text-fg">{dict.tours.notIncludedTitle}</h2>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {notIncludedList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          )}

          {tour.galleryImages.length > paragraphs.length && (
            <Reveal delay={150} className="mt-14">
              <h2 className="font-display text-xl font-bold text-fg sm:text-2xl">{dict.tours.galleryTitle}</h2>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {tour.galleryImages.slice(paragraphs.length).map((src, i) => (
                  <div key={src} className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-border">
                    <Image
                      src={src}
                      alt={`${view.title} ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={200} className="mt-14 rounded-2xl border border-gold/30 bg-bg-alt p-7 text-center sm:p-9">
            <p className="font-display text-xl font-bold text-fg sm:text-2xl">{dict.tours.askAboutTour}</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{dict.tours.askAboutTourSub}</p>
            <a
              href={whatsappHref(settings.whatsapp, view.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-4 text-sm font-bold text-green-deep transition-all hover:scale-[1.03] hover:bg-gold-light active:scale-[0.97]"
            >
              {dict.tours.askButton}
            </a>
          </Reveal>
        </div>
      </main>

      <Footer locale={locale} contact={contact} />
    </div>
  );
}
