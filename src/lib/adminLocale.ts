import { cookies } from "next/headers";
import { adminLocales, DEFAULT_ADMIN_LOCALE, ADMIN_LOCALE_COOKIE, type AdminLocale } from "@/lib/adminI18n";

export async function getAdminLocale(): Promise<AdminLocale> {
  const store = await cookies();
  const value = store.get(ADMIN_LOCALE_COOKIE)?.value;
  return (adminLocales as readonly string[]).includes(value ?? "") ? (value as AdminLocale) : DEFAULT_ADMIN_LOCALE;
}
