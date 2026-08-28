import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Отзывы</h1>
        <Link href="/admin/testimonials/new" className="rounded bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800">
          + Новый отзыв
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-start justify-between rounded-lg border border-neutral-200 bg-white p-5">
            <div>
              <div className="text-sm font-semibold text-neutral-900">
                {t.name}, {t.country}{" "}
                {!t.published && <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">Скрыт</span>}
              </div>
              <p className="mt-1.5 max-w-xl text-sm text-neutral-500">{t.textRu}</p>
            </div>
            <div className="flex shrink-0 gap-4 text-sm">
              <Link href={`/admin/testimonials/${t.id}`} className="text-neutral-600 hover:text-neutral-900 hover:underline">
                Изменить
              </Link>
              <form action={deleteTestimonial.bind(null, t.id)}>
                <button type="submit" className="text-red-600 hover:underline">
                  Удалить
                </button>
              </form>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-neutral-400">Отзывов пока нет.</p>}
      </div>
    </div>
  );
}
