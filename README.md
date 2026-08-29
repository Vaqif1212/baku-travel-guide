# Baku Travel Guide

Sayt Anar Rustamov (fərdi bələdçi/sürücü/tərcüməçi, Bakı) üçündür.
Next.js (App Router) + Prisma + Postgres (Neon, Vercel) + Tailwind CSS v4.
RU/AZ/EN dəstəyi, admin paneldən idarə olunan turlar/qiymətlər/rəylər/mesajlar/bloq.

**Canlı sayt:** https://baku-travel-guide.vercel.app
**Repo:** https://github.com/Vaqif1212/baku-travel-guide
**Vercel layihəsi:** https://vercel.com/chainx1/baku-travel-guide

## Yerli işə salma

```bash
npm install
npm run dev        # http://localhost:3300
```

`.env` faylında artıq canlı Postgres (Neon) bazasına qoşulan `DATABASE_URL` var —
yerli inkişaf da elə həmin bazadan istifadə edir (ayrıca lokal baza saxlanmır).

Admin panel: `/admin/login` — şifrə **`anar2026`** (seed-dən gəlir).
İstifadəyə başlamazdan əvvəl `/admin/settings`-dən dəyişin.

Sxemi dəyişəndən sonra: `npx prisma db push`. Nümunə datanı yenidən yükləmək üçün: `npm run db:seed`.

## Struktur

- `src/app/page.tsx`, `src/app/az/page.tsx`, `src/app/en/page.tsx` — ana səhifənin RU/AZ/EN versiyaları (eyni `HomePage` komponenti, fərqli `locale`).
- `src/app/blog/`, `src/app/admin/(dashboard)/blog/` — bloq (hazırda yalnız rusca, əsas SEO auditoriyası üçün).
- `src/lib/i18n.ts` — bütün statik mətnlər (naviqasiya, hero, FAQ və s.) üç dildə.
- `prisma/schema.prisma` — `Tour`, `Testimonial`, `Post`, `Message`, `Setting` (tək sətirlik ümumi tənzimləmələr: promo banner, valyuta məzənnəsi, əlaqə nömrələri, admin şifrəsi).
- `src/app/admin/` — giriş (`/admin/login`) + qorunan panel (`(dashboard)` qrupu): Turlar, Bloq, Rəylər, Mesajlar, Tənzimləmələr.
- `src/components/site/` — ana səhifənin bütün vizual blokları (Header, Hero, ToursSection — qiymət/valyuta keçidi client tərəfdə — və s.)

## Deploy

Deploy `main` şaxəsinə push edəndə GitHub → Vercel inteqrasiyası ilə avtomatik olur.
Əl ilə: `npx vercel deploy --prod`.

Environment variables (Vercel dashboard → Settings → Environment Variables):
`DATABASE_URL` və `POSTGRES_*` (Neon inteqrasiyasından avtomatik gəlir), `SESSION_SECRET`, `SITE_URL`.

`next.config.ts`-də `images.unoptimized: true` var — Vercel-in şəkil optimallaşdırma
API-si Hobby planda pullu kvota ilə işləyir (402 xətası verirdi), ona görə şəkillər
optimallaşdırılmadan (orijinal ölçüdə) verilir.

## Qeydlər

- Rəylər hazırda **nümunədir** (saytda "* Отзывы-примеры…" qeydi ilə açıq bildirilir) — ilk real turlardan sonra admin paneldən (`/admin/testimonials`) real rəylərlə əvəz edin.
- Tur/hero şəkilləri hazırda Wikimedia Commons-dan CC BY-SA lisenziyalı stok fotolardır (bax `public/images/CREDITS.md`) — real fotolarla əvəz olunmalıdır.
- Əlaqə nömrələri (`+994 XX XXX XX XX`, email, WhatsApp/Telegram) `/admin/settings`-də dəyişdirilir.
- Qiymətlər AZN-də saxlanılır, USD/RUB avtomatik məzənnə ilə hesablanır (`/admin/settings`-də tənzimlənir).
