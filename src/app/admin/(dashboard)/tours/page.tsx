import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTour } from "./actions";

export default async function AdminToursPage() {
  const tours = await prisma.tour.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Туры</h1>
        <Link href="/admin/tours/new" className="rounded bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800">
          + Новый тур
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 text-left text-neutral-500">
              <th className="px-4 py-3 font-medium">Название (RU)</th>
              <th className="px-4 py-3 font-medium">Инд. / Группа (AZN)</th>
              <th className="px-4 py-3 font-medium">Статус</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {tours.map((t) => (
              <tr key={t.id} className="border-b border-neutral-100 last:border-0">
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
                    {t.published ? "Опубликован" : "Скрыт"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/tours/${t.id}`} className="text-neutral-600 hover:text-neutral-900 hover:underline">
                    Изменить
                  </Link>
                  <form action={deleteTour.bind(null, t.id)} className="inline">
                    <button type="submit" className="ml-4 text-red-600 hover:underline">
                      Удалить
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {tours.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">
                  Туров пока нет.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
