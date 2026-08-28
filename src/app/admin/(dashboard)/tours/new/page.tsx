import { TourForm } from "../TourForm";
import { createTour } from "../actions";

export default function NewTourPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">Новый тур</h1>
      <div className="mt-6">
        <TourForm action={createTour} />
      </div>
    </div>
  );
}
