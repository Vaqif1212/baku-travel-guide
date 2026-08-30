import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Faq({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <section id="faq" className="bg-bg py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-fg sm:text-4xl">{dict.faq.title}</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 divide-y divide-border">
            {dict.faq.items.map((item, i) => (
              <details key={item.q} className="group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-bold text-fg transition-colors marker:content-none hover:text-gold">
                  {item.q}
                  <svg
                    className="ml-4 shrink-0 text-green-deep transition-transform duration-300 group-open:rotate-180 dark:text-gold"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className="mt-3.5 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
