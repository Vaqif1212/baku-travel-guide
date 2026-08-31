"use client";

import { useState } from "react";
import { convertFromAzn, formatPrice, currencies, type Currency } from "@/lib/currency";

export function TourPricePicker({
  priceIndividualAzn,
  priceGroupAzn,
  rates,
  labels,
}: {
  priceIndividualAzn: number;
  priceGroupAzn: number;
  rates: { usdRate: number; rubRate: number };
  labels: { individual: string; group: string; perCar: string; perPerson: string };
}) {
  const [mode, setMode] = useState<"individual" | "group">("individual");
  const [currency, setCurrency] = useState<Currency>("AZN");
  const amountAzn = mode === "individual" ? priceIndividualAzn : priceGroupAzn;
  const displayPrice = formatPrice(convertFromAzn(amountAzn, currency, rates), currency);
  const unit = mode === "individual" ? labels.perCar : labels.perPerson;

  return (
    <div className="rounded-2xl border border-border bg-bg-alt p-6 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex overflow-hidden rounded-full border border-border text-xs">
          <button
            type="button"
            onClick={() => setMode("individual")}
            className={`px-4 py-2 font-semibold transition-colors ${
              mode === "individual" ? "bg-green-deep text-cream" : "text-muted hover:text-fg"
            }`}
          >
            {labels.individual}
          </button>
          <button
            type="button"
            onClick={() => setMode("group")}
            className={`border-l border-border px-4 py-2 font-semibold transition-colors ${
              mode === "group" ? "bg-green-deep text-cream" : "text-muted hover:text-fg"
            }`}
          >
            {labels.group}
          </button>
        </div>
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
