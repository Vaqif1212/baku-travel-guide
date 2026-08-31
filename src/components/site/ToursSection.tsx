"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { convertFromAzn, formatPrice, currencies, type Currency } from "@/lib/currency";
import { Reveal } from "./Reveal";

export type TourViewModel = {
  id: string;
  slug: string;
  imageUrl: string;
  title: string;
  description: string;
  durationHours: string;
  priceIndividualAzn: number;
  priceGroupAzn: number;
};

export function ToursSection({
  locale,
  tours,
  rates,
}: {
  locale: Locale;
  tours: TourViewModel[];
  rates: { usdRate: number; rubRate: number };
}) {
  const dict = getDict(locale);
  const [currency, setCurrency] = useState<Currency>("AZN");

  return (
    <section id="tours" className="bg-bg py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-sm font-bold tracking-widest text-gold uppercase">{dict.tours.eyebrow}</p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold text-fg sm:text-4xl">{dict.tours.title}</h2>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <span className="text-sm text-muted">{dict.tours.subtitle}</span>
            <div className="flex shrink-0 overflow-hidden rounded-full border border-border text-xs font-bold">
              {currencies.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 transition-colors ${
                    currency === c ? "bg-green-deep text-cream" : "text-muted hover:text-fg"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {tours.map((tour, i) => (
            <Reveal key={tour.id} delay={i * 100}>
              <TourCard tour={tour} dict={dict} currency={currency} rates={rates} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TourCard({
  tour,
  dict,
  currency,
  rates,
  locale,
}: {
  tour: TourViewModel;
  dict: ReturnType<typeof getDict>;
  currency: Currency;
  rates: { usdRate: number; rubRate: number };
  locale: Locale;
}) {
  const [mode, setMode] = useState<"individual" | "group">("individual");
  const amountAzn = mode === "individual" ? tour.priceIndividualAzn : tour.priceGroupAzn;
  const displayPrice = formatPrice(convertFromAzn(amountAzn, currency, rates), currency);
  const unit = mode === "individual" ? dict.tours.perCar : dict.tours.perPerson;
  const home = locale === "ru" ? "" : `/${locale}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-bg-alt transition-shadow duration-300 hover:shadow-xl">
      <div className="relative flex h-52 items-end overflow-hidden bg-linear-to-br from-green-mid to-green-deep p-5">
        {tour.imageUrl && (
          <Image
            src={tour.imageUrl}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-green-deep/70 via-transparent to-transparent" />
        <span className="relative rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-green-deep">
          {dict.tours.dayTour} · {tour.durationHours} {dict.tours.hours}
        </span>
      </div>
      <div className="p-7">
        <h3 className="font-display text-xl font-bold text-fg sm:text-2xl">{tour.title}</h3>
        <p className="mt-3.5 text-sm leading-relaxed text-muted">{tour.description}</p>

        <div className="mt-5 inline-flex overflow-hidden rounded-full border border-border text-xs">
          <button
            type="button"
            onClick={() => setMode("individual")}
            className={`px-4 py-2 font-semibold transition-colors ${
              mode === "individual" ? "bg-green-deep text-cream" : "text-muted hover:text-fg"
            }`}
          >
            {dict.tours.individual}
          </button>
          <button
            type="button"
            onClick={() => setMode("group")}
            className={`border-l border-border px-4 py-2 font-semibold transition-colors ${
              mode === "group" ? "bg-green-deep text-cream" : "text-muted hover:text-fg"
            }`}
          >
            {dict.tours.group}
          </button>
        </div>

        <div className="mt-4 font-display text-2xl font-bold text-fg">
          {displayPrice} <span className="ml-1 font-body text-sm font-normal text-muted">{unit}</span>
        </div>

        <Link
          href={`${home}/tours/${tour.slug}`}
          className="mt-6 block rounded-full bg-gold py-3.5 text-center text-sm font-bold text-green-deep transition-all hover:scale-[1.02] hover:bg-gold-light active:scale-[0.98]"
        >
          {dict.tours.more}
        </Link>
      </div>
    </article>
  );
}
