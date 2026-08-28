import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const [tourCount, testimonialCount, unreadCount] = await Promise.all([
    prisma.tour.count(),
    prisma.testimonial.count(),
    prisma.message.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: "Туров опубликовано", value: tourCount, href: "/admin/tours" },
    { label: "Отзывов", value: testimonialCount, href: "/admin/testimonials" },
    { label: "Непрочитанных сообщений", value: unreadCount, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">Обзор</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
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
