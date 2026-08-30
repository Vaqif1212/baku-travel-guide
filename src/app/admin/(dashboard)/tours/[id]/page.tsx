import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { IconArrowLeft } from "@/components/admin/icons";
import { TourForm } from "../TourForm";
import { updateTour } from "../actions";

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [tour, dict] = await Promise.all([
    prisma.tour.findUnique({ where: { id } }),
    getAdminLocale().then(getAdminDict),
  ]);
  if (!tour) notFound();

  const action = updateTour.bind(null, id);

  return (
    <div>
      <Link href="/admin/tours" className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <IconArrowLeft />
        {dict.common.backToList}
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900">{dict.tours.editTitle}</h1>
      <div className="mt-6">
        <TourForm tour={tour} action={action} dict={dict} />
      </div>
    </div>
  );
}
