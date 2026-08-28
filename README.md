# Baku Travel Guide

Sayt Anar Rustamov (fərdi bələdçi/sürücü/tərcüməçi, Bakı) üçündür.
Next.js (App Router) + Prisma + Tailwind CSS v4. RU/AZ/EN dəstəyi,
admin paneldən idarə olunan turlar/qiymətlər/rəylər/mesajlar.

## Yerli işə salma

```bash
npm install
npm run db:seed   # nümunə tur/rəy/parol yaradır (SQLite, dev.db faylı)
npm run dev        # http://localhost:3300
```

Admin panel: `/admin/login` — dev şifrəsi **`baku2026`** (seed-dən gəlir).
İstifadəyə başlamazdan əvvəl `/admin/settings`-dən dəyişin.

## Struktur

- `src/app/page.tsx`, `src/app/az/page.tsx`, `src/app/en/page.tsx` — ana səhifənin RU/AZ/EN versiyaları (eyni `HomePage` komponenti, fərqli `locale`).
- `src/lib/i18n.ts` — bütün statik mətnlər (naviqasiya, hero, FAQ və s.) üç dildə.
- `prisma/schema.prisma` — `Tour`, `Testimonial`, `Message`, `Setting` (tək sətirlik ümumi tənzimləmələr: promo banner, valyuta məzənnəsi, əlaqə nömrələri, admin şifrəsi).
- `src/app/admin/` — giriş (`/admin/login`) + qorunan panel (`(dashboard)` qrupu): Turlar, Rəylər, Mesajlar, Tənzimləmələr.
- `src/components/site/` — ana səhifənin bütün vizual blokları (Header, Hero, ToursSection — qiymət/valyuta keçidi client tərəfdə — və s.)

## Prod-a keçid (Vercel + Postgres)

Hazırda inkişaf üçün SQLite (`dev.db`) istifadə olunur. Canlıya keçəndə:

1. `prisma/schema.prisma`-da `datasource db` bloğunda `provider = "sqlite"` → `provider = "postgresql"` edin.
2. Vercel Postgres / Supabase / Neon-dan verilənlər bazası yaradın, `DATABASE_URL`-i Vercel-in environment variables bölməsinə əlavə edin.
3. `SESSION_SECRET`-i uzun təsadüfi sətirlə əvəz edin (admin sessiyasının imzalanması üçün).
4. `SITE_URL`-i əsl domenlə əlavə edin (məs. `https://bakutravelguide.az`) — SEO metadata və sitemap üçün istifadə olunur.
5. Deploy-dan sonra bir dəfə `npx prisma db push && npm run db:seed` işlədin (və ya öz məlumatlarınızı admin paneldən əl ilə daxil edin).

## Qeydlər

- Rəylər hazırda **nümunədir** (saytda "* Отзывы-примеры…" qeydi ilə açıq bildirilir) — ilk real turlardan sonra admin paneldən (`/admin/testimonials`) real rəylərlə əvəz edin.
- Əlaqə nömrələri (`+994 XX XXX XX XX`, email, WhatsApp/Telegram) `/admin/settings`-də dəyişdirilir.
- Qiymətlər AZN-də saxlanılır, USD/RUB avtomatik məzənnə ilə hesablanır (`/admin/settings`-də tənzimlənir).
