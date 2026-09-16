"use client";

// Rəy sisteminə ulduz reytinqi (Vaqifin tələbi, 2026-09-16). İki rejimdə
// işləyir: sırf göstərmə (Testimonials kartları, `onChange` yoxdur) və
// interaktiv seçim (ReviewForm — ziyarətçi kliklə 1-5 ulduz seçir).
function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
      <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
    </svg>
  );
}

export function StarRating({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange?: (rating: number) => void;
  size?: "sm" | "md";
}) {
  const stars = [1, 2, 3, 4, 5];
  const interactive = typeof onChange === "function";
  return (
    <div
      className={`flex items-center gap-0.5 text-gold ${size === "sm" ? "[&_svg]:h-3 [&_svg]:w-3" : ""}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${value} / 5`}
    >
      {stars.map((n) =>
        interactive ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} / 5`}
            onClick={() => onChange!(n)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star filled={n <= value} />
          </button>
        ) : (
          <Star key={n} filled={n <= value} />
        )
      )}
    </div>
  );
}

// Rəylərin ortalama balı (məs. 4.7) üçün — beş "boş" ulduzun üstünə,
// dəqiq faizlə (avg/5*100%) kəsilmiş beş "dolu" ulduz qatı qoyulur, ona görə
// dəyər tam ədədə yuvarlanmadan (StarRating-dəki kimi) vizual olaraq göstərilir.
export function StarRatingAverage({ average, size = "md" }: { average: number; size?: "sm" | "md" }) {
  const pct = Math.max(0, Math.min(100, (average / 5) * 100));
  const cls = size === "sm" ? "[&_svg]:h-3 [&_svg]:w-3" : "";
  return (
    <div className={`relative inline-flex ${cls}`} role="img" aria-label={`${average.toFixed(1)} / 5`}>
      <div className="flex items-center gap-0.5 text-gold/30">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} filled />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center gap-0.5 overflow-hidden text-gold" style={{ width: `${pct}%` }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} filled />
        ))}
      </div>
    </div>
  );
}
