import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { IconPencil, IconPlus, IconMap } from "@/components/admin/icons";
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

      <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-neutral-500">
              <th className="px-4 py-3 font-medium" />
              <th className="px-4 py-3 font-medium">{dict.tours.colTitle}</th>
              <th className="px-4 py-3 font-medium">{dict.tours.colPrice}</th>
              <th className="px-4 py-3 font-medium">{dict.tours.colStatus}</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {tours.map((t) => (
              <tr key={t.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60">
                <td className="px-4 py-3">
                  <div className="relative h-10 w-14 overflow-hidden rounded-md bg-neutral-100">
                    {t.imageUrl ? (
                      <Image src={t.imageUrl} alt="" fill sizes="56px" className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-neutral-300">
                        <IconMap />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-neutral-900">{t.titleRu}</td>
                <td className="px-4 py-3 text-neutral-600">
                  {t.priceIndividualAzn} / {t.priceGroupAzn}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      t.published ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {t.published ? dict.common.published : dict.common.hidden}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/tours/${t.id}`}
                      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                    >
                      <IconPencil />
                      {dict.common.edit}
                    </Link>
                    <DeleteButton action={deleteTour.bind(null, t.id)} confirmText={dict.common.confirmDelete} label={dict.common.delete} />
                  </div>
                </td>
              </tr>
            ))}
            {tours.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-neutral-400">
                  {dict.tours.empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
