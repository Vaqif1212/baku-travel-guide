import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { IconMap, IconStar, IconDocument, IconMail } from "@/components/admin/icons";

export default async function AdminOverviewPage() {
  const dict = getAdminDict(await getAdminLocale());
  const [tourCount, testimonialCount, postCount, unreadCount] = await Promise.all([
    prisma.tour.count(),
    prisma.testimonial.count(),
    prisma.post.count(),
    prisma.message.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: dict.overview.toursPublished, value: tourCount, href: "/admin/tours", icon: IconMap },
    { label: dict.overview.testimonialsCount, value: testimonialCount, href: "/admin/testimonials", icon: IconStar },
    { label: dict.overview.postsCount, value: postCount, href: "/admin/blog", icon: IconDocument },
    { label: dict.overview.unreadMessages, value: unreadCount, href: "/admin/messages", icon: IconMail, highlight: unreadCount > 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">{dict.overview.title}</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${
                c.highlight ? "bg-amber-100 text-amber-700" : "bg-[#1F3B2E]/8 text-[#1F3B2E]"
              }`}
            >
              <c.icon />
            </div>
            <div className="text-3xl font-bold text-neutral-900">{c.value}</div>
            <div className="mt-1.5 text-sm text-neutral-500">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
