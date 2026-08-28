import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../TestimonialForm";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">Изменить отзыв</h1>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} action={updateTestimonial.bind(null, id)} />
      </div>
    </div>
  );
}
