import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { TourForm } from "../TourForm";
import { createTour } from "../actions";

export default async function NewTourPage() {
  const dict = getAdminDict(await getAdminLocale());
  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">{dict.tours.newTitle}</h1>
      <div className="mt-6">
        <TourForm action={createTour} dict={dict} />
      </div>
    </div>
  );
}
