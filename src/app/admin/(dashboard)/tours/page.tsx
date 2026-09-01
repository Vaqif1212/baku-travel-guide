import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { IconPencil, IconPlus, IconMap } from "@/components/admin/icons";
import { parsePriceTiers, tierRangeLabel } from "@/lib/priceTiers";
import { deleteTour } from "./actions";

export default async function AdminToursPage() {
  const dict = getAdminDict(await getAdminLocale());
  const tours = await prisma.tour.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">{dict.tours.title}</h1>
        <Link
          href="/admin/tours/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1F3B2E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#16291F]"
        >
          <IconPlus />
          {dict.tours.newButton}
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {tours.map((t) => (
          <div key={t.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-nowrap">
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {t.imageUrl ? (
                <Image src={t.imageUrl} alt="" fill sizes="80px" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-300">
                  <IconMap />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-neutral-900">{t.titleRu}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    t.published ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {t.published ? dict.common.published : dict.common.hidden}
                </span>
              </div>
              <p className="mt-1 text-sm text-neutral-500">
                {parsePriceTiers(t.priceTiers)
                  .map((tier) => `${tierRangeLabel(tier, dict.tours.peopleWordShort)}: ${tier.priceAzn} AZN${tier.perPerson ? "/" + dict.tours.peopleWordShort : ""}`)
                  .join(" · ")}
              </p>
            </div>
            <div className="flex w-full shrink-0 justify-end gap-1 sm:w-auto">
              <Link
                href={`/admin/tours/${t.id}`}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <IconPencil />
                {dict.common.edit}
              </Link>
              <DeleteButton action={deleteTour.bind(null, t.id)} confirmText={dict.common.confirmDelete} label={dict.common.delete} />
            </div>
          </div>
        ))}
        {tours.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-200 py-16 text-neutral-400">
            <IconMap />
            {dict.tours.empty}
          </div>
        )}
      </div>
    </div>
  );
}
