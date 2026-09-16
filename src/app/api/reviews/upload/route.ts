import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

// Sayt-daxili rəy formunun (ReviewForm.tsx) ictimai şəkil-yükləmə endpoint-i.
// admin/upload/route.ts-dən FƏRQLİ olaraq auth tələb ETMİR (ziyarətçi hələ
// admin deyil) — bunun əvəzinə daha sərt limitlər qoyulub (kiçik ölçü,
// sadəcə şəkil tipləri) sui-istifadəni məhdudlaşdırmaq üçün. Yüklənən şəkil
// birbaşa Testimonial-a bağlanmır — sadəcə URL qaytarılır, /api/reviews
// sonra onu `imageUrl` kimi saxlayır (published:false, admin təsdiqinə
// qədər görünmür — bax o route-un qeydi).
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB — admin yükləməsindən (8MB) kiçik, ictimai endpoint olduğu üçün
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `reviews/${crypto.randomUUID()}.${ext}`;

  const blob = await put(filename, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return NextResponse.json({ url: blob.url });
}
