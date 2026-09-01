"use client";

import { useState } from "react";
import { convertFromAzn, formatPrice, currencies, type Currency } from "@/lib/currency";
import { tierRangeLabel, type PriceTier } from "@/lib/priceTiers";

export function TourPricePicker({
  tiers,
  rates,
  labels,
}: {
  tiers: PriceTier[];
  rates: { usdRate: number; rubRate: number };
  labels: { perCar: string; perPerson: string; peopleWord: string };
}) {
  const [tierIndex, setTierIndex] = useState(0);
  const [currency, setCurrency] = useState<Currency>("AZN");

  if (tiers.length === 0) return null;
  const tier = tiers[tierIndex] ?? tiers[0];
  const displayPrice = formatPrice(convertFromAzn(tier.priceAzn, currency, rates), currency);
  const unit = tier.perPerson ? labels.perPerson : labels.perCar;

  return (
    <div className="rounded-2xl border border-border bg-bg-alt p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        {tiers.length > 1 && (
          <div className="inline-flex flex-wrap overflow-hidden rounded-full border border-border text-xs">
            {tiers.map((t, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setTierIndex(i)}
                className={`px-4 py-2 font-semibold transition-colors ${
                  i === tierIndex ? "bg-green-deep text-cream" : "text-muted hover:text-fg"
                } ${i > 0 ? "border-l border-border" : ""}`}
              >
                {tierRangeLabel(t, labels.peopleWord)}
              </button>
            ))}
          </div>
        )}
        <div className="ml-auto flex shrink-0 overflow-hidden rounded-full border border-border text-xs font-bold">
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={`px-3 py-1.5 transition-colors ${currency === c ? "bg-green-deep text-cream" : "text-muted hover:text-fg"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 font-display text-3xl font-bold text-fg sm:text-4xl">
        {displayPrice} <span className="ml-1 font-body text-base font-normal text-muted">{unit}</span>
      </div>
    </div>
  );
}
