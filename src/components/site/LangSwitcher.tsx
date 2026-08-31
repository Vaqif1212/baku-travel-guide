import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const LINKS: Record<Locale, string> = { ru: "/", az: "/az", en: "/en" };

// RU is the site's primary language and shows first; AZ shows last,
// per the client's explicit preference.
const ORDER: Locale[] = ["ru", "en", "az"];

export function LangSwitcher({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const base = dark ? "text-cream/50" : "text-fg/50";
  const active = dark ? "text-gold" : "text-gold";
  return (
    <div className="flex items-center gap-1 rounded-full border border-gold/30 overflow-hidden text-xs font-bold">
      {ORDER.map((l) => (
        <Link
          key={l}
          href={LINKS[l]}
          className={`px-2.5 py-1 ${l === locale ? active : base} hover:text-gold transition-colors`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
