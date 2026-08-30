import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { TestimonialForm } from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default async function NewTestimonialPage() {
  const dict = getAdminDict(await getAdminLocale());
  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">{dict.testimonials.newTitle}</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonial} dict={dict} />
      </div>
    </div>
  );
}
