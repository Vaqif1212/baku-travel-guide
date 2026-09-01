"use client";

import { useState } from "react";
import type { PriceTier } from "@/lib/priceTiers";

export function PriceTiersField({
  name,
  defaultValue,
  label,
  hint,
  fromLabel,
  toLabel,
  priceLabel,
  perPersonLabel,
  addLabel,
  removeLabel,
}: {
  name: string;
  defaultValue: PriceTier[];
  label: string;
  hint: string;
  fromLabel: string;
  toLabel: string;
  priceLabel: string;
  perPersonLabel: string;
  addLabel: string;
  removeLabel: string;
}) {
  const [tiers, setTiers] = useState<PriceTier[]>(
    defaultValue.length > 0 ? defaultValue : [{ minPeople: 1, maxPeople: 4, priceAzn: 0, perPerson: false }]
  );

  function update(i: number, patch: Partial<PriceTier>) {
    setTiers((prev) => prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  }

  function addTier() {
    const last = tiers[tiers.length - 1];
    const nextMin = last?.maxPeople != null ? last.maxPeople + 1 : (last?.minPeople ?? 0) + 1;
    setTiers((prev) => [...prev, { minPeople: nextMin, maxPeople: null, priceAzn: 0, perPerson: true }]);
  }

  function removeTier(i: number) {
    setTiers((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</span>
      <p className="mb-3 text-xs text-neutral-400">{hint}</p>
      <div className="space-y-3">
        {tiers.map((tier, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 rounded-lg border border-neutral-200 p-3 sm:grid-cols-[1fr_1fr_1fr_auto_auto]">
            <label className="block">
              <span className="mb-1 block text-[11px] text-neutral-500">{fromLabel}</span>
              <input
                type="number"
                min={1}
                value={tier.minPeople}
                onChange={(e) => update(i, { minPeople: Number(e.target.value) || 1 })}
                className="w-full rounded-md border border-neutral-300 px-2.5 py-2 text-sm focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] text-neutral-500">{toLabel}</span>
              <input
                type="number"
                min={tier.minPeople}
                value={tier.maxPeople ?? ""}
                placeholder="∞"
                onChange={(e) => update(i, { maxPeople: e.target.value === "" ? null : Number(e.target.value) })}
                className="w-full rounded-md border border-neutral-300 px-2.5 py-2 text-sm focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-[11px] text-neutral-500">{priceLabel}</span>
              <input
                type="number"
                min={0}
                value={tier.priceAzn}
                onChange={(e) => update(i, { priceAzn: Number(e.target.value) || 0 })}
                className="w-full rounded-md border border-neutral-300 px-2.5 py-2 text-sm focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15"
              />
            </label>
            <label className="flex items-center gap-2 self-end pb-2 text-xs text-neutral-600 sm:col-auto">
              <input
                type="checkbox"
                checked={tier.perPerson}
                onChange={(e) => update(i, { perPerson: e.target.checked })}
                className="h-4 w-4"
              />
              {perPersonLabel}
            </label>
            <button
              type="button"
              onClick={() => removeTier(i)}
              disabled={tiers.length <= 1}
              className="self-end rounded-md px-2.5 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {removeLabel}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addTier}
        className="mt-3 rounded-lg border border-neutral-300 px-3.5 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
      >
        {addLabel}
      </button>
      <input type="hidden" name={name} value={JSON.stringify(tiers)} />
    </div>
  );
}
