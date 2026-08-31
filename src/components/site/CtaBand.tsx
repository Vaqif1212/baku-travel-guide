import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { whatsappHref } from "@/lib/contact";
import { Reveal } from "./Reveal";

export function CtaBand({ locale, whatsapp }: { locale: Locale; whatsapp: string }) {
  const dict = getDict(locale);
  return (
    <section className="bg-gold py-16 text-center sm:py-20">
      <Reveal className="mx-auto max-w-2xl px-5">
        <h2 className="font-display text-2xl font-bold text-green-deep sm:text-3xl">{dict.cta.title}</h2>
        <a
          href={whatsappHref(whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-green-deep px-7 py-4 text-sm font-bold text-cream transition-all hover:scale-[1.03] hover:bg-green-mid active:scale-[0.97]"
        >
          {dict.cta.button}
        </a>
      </Reveal>
    </section>
  );
}
