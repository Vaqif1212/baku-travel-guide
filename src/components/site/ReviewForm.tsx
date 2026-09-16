"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/i18n";
import { StarRating } from "./StarRating";

// Sayt-daxili rəy formu (Cavidin tələbi, 2026-09-11: "sayt üçün ayrıca
// review sistemi qura biler. Qursun" — istifadəçi təsdiqi ilə). Google
// review sisteminə əlavə, ALTERNATİV yol — ziyarətçi burada birbaşa yaza
// bilər. Göndərilən rəy DƏRHAL saytda görünmür (published: false), admin
// təsdiqindən sonra çıxır (bax /api/reviews, admin/testimonials/page.tsx).
// ContactForm.tsx-lə EYNİ fetch+status naxışı, sadəcə tünd-yaşıl
// Testimonials fonuna uyğun (cream/gold) stilizə edilib. Standart olaraq
// yığcam qalsın deyə bir düymə arxasında açılır (toggle).
export function ReviewForm({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handlePhotoChange(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/reviews/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "upload_failed");
      setImageUrl(data.url);
    } catch {
      // Sükutla — foto ixtiyaridir, uğursuz olsa rəyin özü hələ də göndərilə bilər.
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          country: data.get("country"),
          text: data.get("text"),
          rating,
          imageUrl,
          website: data.get("website"),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
      setRating(5);
      setImageUrl("");
    } catch {
      setStatus("error");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 text-sm font-semibold text-cream/60 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-gold"
      >
        {dict.testimonials.writeReviewToggle}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md space-y-3">
      {/* Honeypot — insan ziyarətçiyə görünməz (ekran-oxuyucular üçün də
          aria-hidden + tabIndex=-1), botlar isə çox vaxt hər sahəni doldurur. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <input
        name="name"
        required
        maxLength={200}
        placeholder={dict.testimonials.formName}
        className="w-full rounded-xl border border-gold/25 bg-cream/5 px-4 py-3 text-sm text-cream transition-colors placeholder:text-cream/40 focus:border-gold focus:outline-none"
      />
      <input
        name="country"
        required
        maxLength={200}
        placeholder={dict.testimonials.formCountry}
        className="w-full rounded-xl border border-gold/25 bg-cream/5 px-4 py-3 text-sm text-cream transition-colors placeholder:text-cream/40 focus:border-gold focus:outline-none"
      />
      <div className="flex items-center gap-3 rounded-xl border border-gold/25 bg-cream/5 px-4 py-3">
        <span className="text-sm text-cream/60">{dict.testimonials.formRating}</span>
        <StarRating value={rating} onChange={setRating} />
      </div>
      <textarea
        name="text"
        required
        maxLength={4000}
        rows={4}
        placeholder={dict.testimonials.formText}
        className="w-full resize-none rounded-xl border border-gold/25 bg-cream/5 px-4 py-3 text-sm text-cream transition-colors placeholder:text-cream/40 focus:border-gold focus:outline-none"
      />
      <div className="flex items-center gap-3 rounded-xl border border-gold/25 bg-cream/5 px-4 py-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handlePhotoChange(file);
          }}
        />
        {imageUrl ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gold/40">
            <Image src={imageUrl} alt="" fill sizes="40px" className="object-cover" />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-gold/40 text-cream/40">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z" />
              <circle cx="12" cy="13" r="3.2" />
            </svg>
          </div>
        )}
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="text-sm font-semibold text-cream/60 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-gold disabled:opacity-60"
        >
          {uploading ? dict.testimonials.formPhotoUploading : imageUrl ? dict.testimonials.formPhotoChange : dict.testimonials.formPhoto}
        </button>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-gold py-3 text-sm font-bold text-green-deep transition-all hover:scale-[1.01] hover:bg-gold/90 active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "sending" ? dict.testimonials.formSending : dict.testimonials.formSubmit}
      </button>
      {status === "success" && (
        <p className="animate-fade-in-down text-sm font-semibold text-gold">{dict.testimonials.formSuccess}</p>
      )}
      {status === "error" && <p className="animate-fade-in-down text-sm font-semibold text-red-400">{dict.testimonials.formError}</p>}
    </form>
  );
}
