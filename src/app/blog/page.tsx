import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PromoBanner } from "@/components/site/PromoBanner";
import { OrnamentDecor } from "@/components/site/Decor";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Блог о Баку и Азербайджане",
  description: "Маршруты, советы и истории о путешествиях по Баку и Азербайджану от личного гида Анара.",
  alternates: { canonical: "/blog" },
};

const MONTHS_RU = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTHS_RU[date.getMonth()]} ${date.getFullYear()}`;
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
    getSettings(),
  ]);

  const contact = {
    phone: settings.phone,
    email: settings.email,
    instagram: settings.instagram,
    whatsapp: settings.whatsapp,
    telegram: settings.telegram,
    facebook: settings.facebook,
  };

  return (
    <div className="min-h-screen bg-bg">
      {settings.promoEnabled && settings.promoTextRu && <PromoBanner text={settings.promoTextRu} />}
      <Header locale="ru" whatsapp={settings.whatsapp} />

      <section className="relative overflow-hidden border-b border-border bg-bg-alt py-16 sm:py-20">
        <OrnamentDecor className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-[0.08] sm:h-72 sm:w-72" />
        <Reveal immediate className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="text-sm font-bold tracking-widest text-gold uppercase">Заметки гида</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-fg sm:text-5xl">Блог</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Маршруты, советы и истории о путешествиях по Баку и Азербайджану.
          </p>
        </Reveal>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        {posts.length === 0 ? (
          <p className="text-center text-muted">Статей пока нет.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded border border-border bg-bg-alt transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-green-mid to-green-deep">
                    {post.coverImageUrl && (
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-green-deep/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-sm bg-gold px-2.5 py-1 text-[11px] font-bold text-green-deep">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-lg font-bold leading-snug text-fg transition-colors group-hover:text-gold">
                      {post.title}
                    </h2>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold">
                      Читать
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </main>

      <Footer locale="ru" contact={contact} />
    </div>
  );
}
