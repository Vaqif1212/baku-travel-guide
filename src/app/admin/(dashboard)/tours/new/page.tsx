import Link from "next/link";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { IconArrowLeft } from "@/components/admin/icons";
import { TourForm } from "../TourForm";
import { createTour } from "../actions";

export default async function NewTourPage() {
  const dict = getAdminDict(await getAdminLocale());
  return (
    <div>
      <Link href="/admin/tours" className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <IconArrowLeft />
        {dict.common.backToList}
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900">{dict.tours.newTitle}</h1>
      <div className="mt-6">
        <TourForm action={createTour} dict={dict} />
      </div>
    </div>
  );
}
