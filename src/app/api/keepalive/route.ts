import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Neon-un PULSUZ planı 5 dəqiqə fəaliyyətsizlikdən sonra bazanı "yuxuya"
// göndərir (compute suspend) — oyanma bir neçə saniyə çəkə bilər, bu da
// tam o an sayta girən ziyarətçi üçün (əgər həmin səhifə canlı bazaya
// toxunursa — yeni tur/yazı, əlaqə/rəy formu və s.) arabir "sayt açılmır"
// təəssüratı yaradır (istifadəçinin şikayəti, 2026-09-16).
//
// GitHub Actions-dakı .github/workflows/keepalive.yml hər 5 dəqiqədən bir
// bu route-a sadə bir sorğu göndərir ki, baza HEÇ VAXT yuxuya getməsin —
// pulsuz, xarici hesab/servis yaratmağa ehtiyac olmadan (mövcud GitHub
// repo-nun öz cron-u).
export async function GET() {
  const start = Date.now();
  await prisma.$queryRaw`SELECT 1`;
  return NextResponse.json({ ok: true, ms: Date.now() - start });
}
