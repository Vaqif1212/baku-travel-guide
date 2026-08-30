"use client";

import { useRouter } from "next/navigation";
import { adminLocales, ADMIN_LOCALE_COOKIE, type AdminLocale } from "@/lib/adminI18n";

const LABELS: Record<AdminLocale, string> = { ru: "RU", az: "AZ", en: "EN" };

export function AdminLangSwitcher({ locale }: { locale: AdminLocale }) {
  const router = useRouter();

  function setLocale(next: AdminLocale) {
    document.cookie = `${ADMIN_LOCALE_COOKIE}=${next}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <div className="flex overflow-hidden rounded border border-neutral-300 text-xs font-semibold">
      {adminLocales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`px-2.5 py-1.5 transition-colors ${
            l === locale ? "bg-neutral-900 text-white" : "text-neutral-500 hover:bg-neutral-100"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
