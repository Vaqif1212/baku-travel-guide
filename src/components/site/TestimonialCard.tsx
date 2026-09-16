import Image from "next/image";
import { StarRating } from "./StarRating";
import type { TestimonialViewModel } from "./Testimonials";

// Grid (≤6 rəy) və Carousel (>6 rəy, bax TestimonialsCarousel.tsx) HƏR
// İKİSİNİN eyni kart görünüşünü paylaşması üçün ayrılıb. Ziyarətçinin
// göndərə biləcəyi (bax ReviewForm.tsx) ixtiyari `imageUrl` varsa, ad/ölkə
// sətrinin yanında kiçik dairəvi şəkil kimi göstərilir.
export function TestimonialCard({ t }: { t: TestimonialViewModel }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gold/25 bg-cream/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-cream/10">
      <StarRating value={t.rating} size="sm" />
      <div className="mb-2.5 mt-1.5 font-display text-3xl leading-none text-gold">&ldquo;</div>
      <p className="text-sm leading-relaxed text-cream/85">{t.text}</p>
      <div className={`mt-auto flex items-center gap-3.5 pt-5 ${t.imageUrl ? "border-t border-gold/10" : ""}`}>
        {t.imageUrl && (
          <div className="animate-avatar-pop relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/50 ring-offset-2 ring-offset-green-deep shadow-lg shadow-black/30">
            <Image src={t.imageUrl} alt={t.name} fill sizes="56px" className="object-cover" />
          </div>
        )}
        <div className="text-sm font-bold text-cream">
          {t.name}, {t.country}
        </div>
      </div>
    </div>
  );
}
