import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { IconPencil, IconPlus, IconStar, IconInbox } from "@/components/admin/icons";
import { deleteTestimonial, quickCreateTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const dict = getAdminDict(await getAdminLocale());
  // Moderasiyada olanlar (published: false — saytdan gələn rəylər defolt belə
  // yaranır, bax /api/reviews) siyahının başında görünsün ki, admin onları
  // qaçırmasın (bax dashboard-dakı "Moderasiyada rəylər" kartı da).
  const testimonials = await prisma.testimonial.findMany({ orderBy: [{ published: "asc" }, { order: "asc" }] });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">{dict.testimonials.title}</h1>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1F3B2E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#16291F]"
        >
          <IconPlus />
          {dict.testimonials.newButton}
        </Link>
      </div>

      <form action={quickCreateTestimonial} className="mt-6 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-4">
        <p className="mb-3 text-xs font-semibold text-neutral-600">{dict.testimonials.quickAddTitle}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            name="name"
            placeholder={dict.testimonials.name}
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm sm:w-40 sm:shrink-0"
          />
          <input
            name="country"
            placeholder={dict.testimonials.country}
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm sm:w-40 sm:shrink-0"
          />
          <input
            name="text"
            placeholder={dict.testimonials.text}
            required
            className="w-full min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2.5 text-sm"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-[#1F3B2E] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#16291F]"
          >
            {dict.testimonials.quickAddButton}
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A227]/10 text-[#C9A227]">
              <IconStar />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-neutral-900">
                {t.name}, {t.countryRu}{" "}
                {!t.published && <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">{dict.common.hidden}</span>}
              </div>
              <p className="mt-1.5 max-w-xl text-sm text-neutral-500">{t.textRu}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Link
                href={`/admin/testimonials/${t.id}`}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <IconPencil />
                {dict.common.edit}
              </Link>
              <DeleteButton action={deleteTestimonial.bind(null, t.id)} confirmText={dict.common.confirmDelete} label={dict.common.delete} />
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-200 py-16 text-neutral-400">
            <IconInbox />
            {dict.testimonials.empty}
          </div>
        )}
      </div>
    </div>
  );
}
