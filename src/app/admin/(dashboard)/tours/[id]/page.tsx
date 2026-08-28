import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TourForm } from "../TourForm";
import { updateTour } from "../actions";

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tour = await prisma.tour.findUnique({ where: { id } });
  if (!tour) notFound();

  const action = updateTour.bind(null, id);

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">Изменить тур</h1>
      <div className="mt-6">
        <TourForm tour={tour} action={action} />
      </div>
    </div>
  );
}
