import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PromoBanner } from "@/components/site/PromoBanner";
import { whatsappHref } from "@/lib/contact";

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
  };

  return (
    <div className="min-h-screen bg-bg">
      {settings.promoEnabled && settings.promoTextRu && <PromoBanner text={settings.promoTextRu} />}
      <Header locale="ru" whatsapp={settings.whatsapp} />
      <main className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-24">
        {post.coverImageUrl && (
          <div className="relative mb-10 h-64 overflow-hidden rounded border border-border sm:h-80">
            <Image src={post.coverImageUrl} alt={post.title} fill sizes="(min-width: 640px) 672px, 100vw" className="object-cover" />
          </div>
        )}
        <h1 className="font-display text-3xl font-bold text-fg sm:text-4xl">{post.title}</h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-fg/85">
          {post.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <a
          href={whatsappHref(settings.whatsapp, post.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2.5 rounded-sm bg-gold px-7 py-4 text-sm font-bold text-green-deep hover:bg-gold-light transition-colors"
        >
          Спросить в WhatsApp
        </a>
      </main>
      <Footer locale="ru" contact={contact} />
    </div>
  );
}
