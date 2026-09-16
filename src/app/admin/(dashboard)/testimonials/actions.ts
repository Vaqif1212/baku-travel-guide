"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function ratingOf(formData: FormData): number {
  const n = Number(formData.get("rating"));
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : 5;
}

function revalidateHomepages() {
  revalidatePath("/");
  revalidatePath("/az");
  revalidatePath("/en");
  revalidatePath("/admin/testimonials");
}

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({
    data: {
      order: Number(formData.get("order")) || 0,
      published: formData.get("published") === "on",
      rating: ratingOf(formData),
      name: str(formData, "name"),
      countryRu: str(formData, "countryRu"),
      countryAz: str(formData, "countryAz"),
      countryEn: str(formData, "countryEn"),
      textRu: str(formData, "textRu"),
      textAz: str(formData, "textAz"),
      textEn: str(formData, "textEn"),
    },
  });
  revalidateHomepages();
  redirect("/admin/testimonials");
}

/**
 * Quick-add for pasting in a real review (e.g. one Anar just saw come in on
 * Google) without filling out the full RU/AZ/EN form. The single name/
 * country/text the admin types gets saved into all three language columns
 * as-is - not translated, just a fast starting point. Anar can open the
 * full edit form later to give AZ/EN their own wording if he wants to.
 */
export async function quickCreateTestimonial(formData: FormData) {
  const name = str(formData, "name");
  const country = str(formData, "country");
  const text = str(formData, "text");
  const last = await prisma.testimonial.aggregate({ _max: { order: true } });
  await prisma.testimonial.create({
    data: {
      order: (last._max.order ?? 0) + 1,
      published: true,
      rating: ratingOf(formData),
      name,
      countryRu: country,
      countryAz: country,
      countryEn: country,
      textRu: text,
      textAz: text,
      textEn: text,
    },
  });
  revalidateHomepages();
}

export async function updateTestimonial(id: string, formData: FormData) {
  await prisma.testimonial.update({
    where: { id },
    data: {
      order: Number(formData.get("order")) || 0,
      published: formData.get("published") === "on",
      rating: ratingOf(formData),
      name: str(formData, "name"),
      countryRu: str(formData, "countryRu"),
      countryAz: str(formData, "countryAz"),
      countryEn: str(formData, "countryEn"),
      textRu: str(formData, "textRu"),
      textAz: str(formData, "textAz"),
      textEn: str(formData, "textEn"),
    },
  });
  revalidateHomepages();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  "use server";
  await prisma.testimonial.delete({ where: { id } });
  revalidateHomepages();
}
