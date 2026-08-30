import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { IconArrowLeft } from "@/components/admin/icons";
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
      <Link href="/admin/testimonials" className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <IconArrowLeft />
        {dict.common.backToList}
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900">{dict.testimonials.editTitle}</h1>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} action={updateTestimonial.bind(null, id)} dict={dict} />
      </div>
    </div>
  );
}
