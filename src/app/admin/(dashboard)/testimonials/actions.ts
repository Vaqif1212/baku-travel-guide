"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({
    data: {
      order: Number(formData.get("order")) || 0,
      published: formData.get("published") === "on",
      name: str(formData, "name"),
      countryRu: str(formData, "countryRu"),
      countryAz: str(formData, "countryAz"),
      countryEn: str(formData, "countryEn"),
      textRu: str(formData, "textRu"),
      textAz: str(formData, "textAz"),
      textEn: str(formData, "textEn"),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await prisma.testimonial.update({
    where: { id },
    data: {
      order: Number(formData.get("order")) || 0,
      published: formData.get("published") === "on",
      name: str(formData, "name"),
      countryRu: str(formData, "countryRu"),
      countryAz: str(formData, "countryAz"),
      countryEn: str(formData, "countryEn"),
      textRu: str(formData, "textRu"),
      textAz: str(formData, "textAz"),
      textEn: str(formData, "textEn"),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  "use server";
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
