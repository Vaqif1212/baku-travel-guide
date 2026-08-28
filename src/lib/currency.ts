export type Currency = "AZN" | "USD" | "RUB";
export const currencies: Currency[] = ["AZN", "USD", "RUB"];

/**
 * Converts a price stored in AZN into the requested display currency.
 * `usdRate`/`rubRate` are "AZN per 1 unit of foreign currency", as
 * configured by the admin in Settings.
 */
export function convertFromAzn(
  amountAzn: number,
  currency: Currency,
  rates: { usdRate: number; rubRate: number }
): number {
  if (currency === "AZN") return amountAzn;
  if (currency === "USD") return amountAzn / rates.usdRate;
  return amountAzn / rates.rubRate;
}

export function formatPrice(amount: number, currency: Currency): string {
  const rounded = Math.round(amount);
  const symbol = currency === "AZN" ? "AZN" : currency === "USD" ? "$" : "₽";
  return currency === "AZN" ? `${rounded} ${symbol}` : `${symbol}${rounded}`;
}
