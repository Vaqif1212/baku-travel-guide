/** Builds a wa.me deep link. `whatsapp` is stored as digits only (country code + number, no +). */
export function whatsappHref(whatsapp: string, message?: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function telegramHref(telegram: string): string {
  const handle = telegram.replace(/^@/, "");
  return `https://t.me/${handle}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
