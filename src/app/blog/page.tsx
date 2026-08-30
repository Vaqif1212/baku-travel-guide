import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PromoBanner } from "@/components/site/PromoBanner";

export const metadata: Metadata = {
  title: "Блог о Баку и Азербайджане",
  description: "Маршруты, советы и истории о путешествиях по Баку и Азербайджану от личного гида Анара.",
  alternates: { canonical: "/blog" },
};

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
      <main className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
        <h1 className="font-display text-3xl font-bold text-fg sm:text-4xl">Блог</h1>
        <p className="mt-3 text-muted">Маршруты, советы и истории о путешествиях по Баку и Азербайджану.</p>

        <div className="mt-12 space-y-10">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group grid gap-6 sm:grid-cols-[220px_1fr]">
              {post.coverImageUrl && (
                <div className="relative h-40 overflow-hidden rounded border border-border sm:h-full">
                  <Image src={post.coverImageUrl} alt={post.title} fill sizes="220px" className="object-cover" />
                </div>
              )}
              <div>
                <h2 className="font-display text-xl font-bold text-fg group-hover:text-gold transition-colors">{post.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-gold">Читать →</span>
              </div>
            </Link>
          ))}
          {posts.length === 0 && <p className="text-muted">Статей пока нет.</p>}
        </div>
      </main>
      <Footer locale="ru" contact={contact} />
    </div>
  );
}
