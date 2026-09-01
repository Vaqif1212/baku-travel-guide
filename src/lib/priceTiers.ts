export type PriceTier = {
  /** Inclusive minimum party size this tier applies to. */
  minPeople: number;
  /** Inclusive maximum party size, or null for "and more". */
  maxPeople: number | null;
  /** Price in AZN. Flat for the whole range, or per person - see perPerson. */
  priceAzn: number;
  /** true: priceAzn is charged per person. false: priceAzn is a flat total for the range. */
  perPerson: boolean;
};

/** Parses the Tour.priceTiers JSON column into a typed, sane array. */
export function parsePriceTiers(value: unknown): PriceTier[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((t): t is Record<string, unknown> => !!t && typeof t === "object")
    .map((t) => ({
      minPeople: Number(t.minPeople) || 1,
      maxPeople: t.maxPeople === null || t.maxPeople === undefined || t.maxPeople === "" ? null : Number(t.maxPeople),
      priceAzn: Number(t.priceAzn) || 0,
      perPerson: Boolean(t.perPerson),
    }));
}

/** Builds the "1–4" / "5+" range label for a tier, given the localized word for "people". */
export function tierRangeLabel(tier: PriceTier, peopleWord: string): string {
  if (tier.maxPeople === null) return `${tier.minPeople}+ ${peopleWord}`;
  if (tier.minPeople === tier.maxPeople) return `${tier.minPeople} ${peopleWord}`;
  return `${tier.minPeople}–${tier.maxPeople} ${peopleWord}`;
}
