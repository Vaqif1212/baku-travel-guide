import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
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
      <h1 className="text-xl font-bold text-neutral-900">{dict.tours.editTitle}</h1>
      <div className="mt-6">
        <TourForm tour={tour} action={action} dict={dict} />
      </div>
    </div>
  );
}
