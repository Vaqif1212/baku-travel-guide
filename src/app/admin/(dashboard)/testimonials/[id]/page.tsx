import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { TestimonialForm } from "../TestimonialForm";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [testimonial, dict] = await Promise.all([
    prisma.testimonial.findUnique({ where: { id } }),
    getAdminLocale().then(getAdminDict),
  ]);
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">{dict.testimonials.editTitle}</h1>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} action={updateTestimonial.bind(null, id)} dict={dict} />
      </div>
    </div>
  );
}
