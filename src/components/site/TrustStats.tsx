import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

export function TrustStats({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const items = [
    { value: "8+", label: dict.stats.experience },
    { value: "3", label: dict.stats.languages },
    { value: "500+", label: dict.stats.tourists },
    { value: "24/7", label: dict.stats.support },
  ];
  return (
    <section className="border-b border-border bg-bg py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4 lg:gap-0">
        {items.map((item, i) => (
          <Reveal key={item.label} delay={i * 90}>
            <div className={`px-3 text-center lg:px-6 ${i < 3 ? "lg:border-r lg:border-border" : ""}`}>
              <div className="font-display text-3xl font-bold text-green-deep sm:text-4xl dark:text-gold">
                <CountUp value={item.value} />
              </div>
              <div className="mt-2 text-sm text-muted">{item.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
