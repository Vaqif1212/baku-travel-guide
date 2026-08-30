import Link from "next/link";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { IconArrowLeft } from "@/components/admin/icons";
import { TestimonialForm } from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default async function NewTestimonialPage() {
  const dict = getAdminDict(await getAdminLocale());
  return (
    <div>
      <Link href="/admin/testimonials" className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <IconArrowLeft />
        {dict.common.backToList}
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900">{dict.testimonials.newTitle}</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonial} dict={dict} />
      </div>
    </div>
  );
}
