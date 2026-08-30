import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";

export default async function AdminOverviewPage() {
  const dict = getAdminDict(await getAdminLocale());
  const [tourCount, testimonialCount, postCount, unreadCount] = await Promise.all([
    prisma.tour.count(),
    prisma.testimonial.count(),
    prisma.post.count(),
    prisma.message.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: dict.overview.toursPublished, value: tourCount, href: "/admin/tours" },
    { label: dict.overview.testimonialsCount, value: testimonialCount, href: "/admin/testimonials" },
    { label: dict.overview.postsCount, value: postCount, href: "/admin/blog" },
    { label: dict.overview.unreadMessages, value: unreadCount, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">{dict.overview.title}</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-lg border border-neutral-200 bg-white p-6 hover:border-neutral-400 transition-colors"
          >
            <div className="text-3xl font-bold text-neutral-900">{c.value}</div>
            <div className="mt-1.5 text-sm text-neutral-500">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
