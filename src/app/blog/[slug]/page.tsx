import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PromoBanner } from "@/components/site/PromoBanner";
import { whatsappHref } from "@/lib/contact";

const MONTHS_RU = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTHS_RU[date.getMonth()]} ${date.getFullYear()}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([prisma.post.findUnique({ where: { slug } }), getSettings()]);
  if (!post || !post.published) notFound();

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

      <main className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl px-5 pt-12 sm:px-8 sm:pt-16">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors">
            ← Все статьи
          </Link>
          <p className="mt-6 text-sm font-bold tracking-widest text-gold uppercase">{formatDate(post.createdAt)}</p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">{post.title}</h1>
        </div>

        {post.coverImageUrl && (
          <div className="relative mx-auto mt-8 h-72 max-w-4xl overflow-hidden border border-border sm:mt-10 sm:h-96 sm:rounded-3xl">
            <Image src={post.coverImageUrl} alt={post.title} fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" priority />
          </div>
        )}

        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <div className="mt-10 space-y-5 text-base leading-relaxed text-fg/85 sm:text-lg">
            {post.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-gold/30 bg-bg-alt p-7 text-center sm:p-9">
            <p className="font-display text-xl font-bold text-fg sm:text-2xl">Понравился маршрут?</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">Напишите мне в WhatsApp — подберём тур и ответим на все вопросы.</p>
            <a
              href={whatsappHref(settings.whatsapp, post.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gold px-7 py-4 text-sm font-bold text-green-deep transition-all hover:scale-[1.03] hover:bg-gold-light active:scale-[0.97]"
            >
              Спросить в WhatsApp
            </a>
          </div>
        </div>
      </main>

      <Footer locale="ru" contact={contact} />
    </div>
  );
}
