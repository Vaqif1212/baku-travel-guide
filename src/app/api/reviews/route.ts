import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Sayt-daxili rəy formu (Testimonials.tsx) buraya POST edir. Rəylər
// avtomatik yox, YALNIZ admin təsdiqindən (published: true) sonra saytda
// görünür — bax admin/testimonials/page.tsx (moderasiyada olanlar yuxarıda
// göstərilir) və admin/(dashboard)/page.tsx ("Moderasiyada rəylər" kartı).
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, country, text, rating, imageUrl, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: normal ziyarətçilər bu sahəni görmür/doldurmur (CSS-lə
  // gizlədilib, bax ReviewForm.tsx). Botlar adətən hər sahəni doldurur —
  // doluşdursa, sakitcə "uğurlu" cavab veririk (botu şübhələndirməmək üçün)
  // amma HEÇ NƏ yazmırıq.
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof country !== "string" ||
    typeof text !== "string" ||
    !name.trim() ||
    !country.trim() ||
    !text.trim()
  ) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (name.length > 200 || country.length > 200 || text.length > 4000) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  // Ulduz sayı (1-5) — düzgün göndərilməyibsə (köhnə klient, manipulyasiya
  // cəhdi və s.) sakitcə 5-ə (defolt) düşür, sorğunu rədd etmirik.
  const ratingNum = Number(rating);
  const safeRating = Number.isInteger(ratingNum) && ratingNum >= 1 && ratingNum <= 5 ? ratingNum : 5;

  // Şəkil linki — YALNIZ bizim öz Vercel Blob storage-ımızdan gələn URL-lər
  // qəbul olunur (bax /api/reviews/upload). Başqa domenlər/uydurma dəyərlər
  // sakitcə boş sətrə düşür ki, kimsə keçərsiz link göndərib kartı korlamasın
  // və ya XSS-a bənzər bir şey soxmasın.
  const safeImageUrl = typeof imageUrl === "string" && /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(imageUrl) ? imageUrl : "";

  const last = await prisma.testimonial.aggregate({ _max: { order: true } });

  await prisma.testimonial.create({
    data: {
      order: (last._max.order ?? 0) + 1,
      published: false,
      rating: safeRating,
      imageUrl: safeImageUrl,
      name: name.trim(),
      countryRu: country.trim(),
      countryAz: country.trim(),
      countryEn: country.trim(),
      textRu: text.trim(),
      textAz: text.trim(),
      textEn: text.trim(),
    },
  });

  return NextResponse.json({ ok: true });
}
