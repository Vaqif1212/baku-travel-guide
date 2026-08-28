"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { convertFromAzn, formatPrice, currencies, type Currency } from "@/lib/currency";
import { whatsappHref } from "@/lib/contact";

export type TourViewModel = {
  id: string;
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
  whatsapp,
}: {
  locale: Locale;
  tours: TourViewModel[];
  rates: { usdRate: number; rubRate: number };
  whatsapp: string;
}) {
  const dict = getDict(locale);
  const [currency, setCurrency] = useState<Currency>("AZN");

  return (
    <section id="tours" className="bg-bg py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-sm font-bold tracking-widest text-gold uppercase">{dict.tours.eyebrow}</p>
        <h2 className="mt-3 text-center font-display text-3xl font-bold text-fg sm:text-4xl">{dict.tours.title}</h2>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-sm text-muted">{dict.tours.subtitle}</span>
          <div className="flex overflow-hidden rounded border border-border text-xs font-bold">
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

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} dict={dict} currency={currency} rates={rates} whatsapp={whatsapp} />
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
  whatsapp,
}: {
  tour: TourViewModel;
  dict: ReturnType<typeof getDict>;
  currency: Currency;
  rates: { usdRate: number; rubRate: number };
  whatsapp: string;
}) {
  const [mode, setMode] = useState<"individual" | "group">("individual");
  const amountAzn = mode === "individual" ? tour.priceIndividualAzn : tour.priceGroupAzn;
  const displayPrice = formatPrice(convertFromAzn(amountAzn, currency, rates), currency);
  const unit = mode === "individual" ? dict.tours.perCar : dict.tours.perPerson;

  return (
    <article className="overflow-hidden rounded border border-border bg-bg-alt">
      <div className="relative flex h-52 items-end bg-linear-to-br from-green-mid to-green-deep p-5">
        <span className="rounded-sm bg-gold px-3 py-1.5 text-xs font-bold text-green-deep">
          {dict.tours.dayTour} · {tour.durationHours} {dict.tours.hours}
        </span>
      </div>
      <div className="p-7">
        <h3 className="font-display text-xl font-bold text-fg sm:text-2xl">{tour.title}</h3>
        <p className="mt-3.5 text-sm leading-relaxed text-muted">{tour.description}</p>

        <div className="mt-5 inline-flex overflow-hidden rounded border border-border text-xs">
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

        <a
          href={whatsappHref(whatsapp, tour.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block rounded-sm bg-gold py-3.5 text-center text-sm font-bold text-green-deep hover:bg-gold-light transition-colors"
        >
          {dict.tours.more}
        </a>
      </div>
    </article>
  );
}
