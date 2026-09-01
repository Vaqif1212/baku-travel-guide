"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

/** Turns a title into a unique slug, appending -2, -3, … if it's already taken. */
async function uniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || "tour";
  let slug = base;
  let n = 2;
  while (await prisma.tour.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

function num(formData: FormData, key: string): number {
  const n = Number(formData.get(key));
  return Number.isFinite(n) ? n : 0;
}

function revalidateTourPages(slug: string) {
  revalidatePath("/");
  revalidatePath("/az");
  revalidatePath("/en");
  revalidatePath(`/tours/${slug}`);
  revalidatePath("/admin/tours");
}

export async function createTour(formData: FormData) {
  const slug = await uniqueSlug(str(formData, "titleRu"));
  const last = await prisma.tour.aggregate({ _max: { order: true } });
  const order = (last._max.order ?? 0) + 1;
  await prisma.tour.create({
    data: {
      slug,
      order,
      published: formData.get("published") === "on",
      imageUrl: str(formData, "imageUrl"),
      galleryImages: formData.getAll("galleryImages").map(String),
      titleRu: str(formData, "titleRu"),
      titleAz: str(formData, "titleAz"),
      titleEn: str(formData, "titleEn"),
      descriptionRu: str(formData, "descriptionRu"),
      descriptionAz: str(formData, "descriptionAz"),
      descriptionEn: str(formData, "descriptionEn"),
      durationRu: str(formData, "durationRu"),
      durationAz: str(formData, "durationAz"),
      durationEn: str(formData, "durationEn"),
      priceIndividualAzn: num(formData, "priceIndividualAzn"),
      priceGroupAzn: num(formData, "priceGroupAzn"),
    },
  });
  revalidateTourPages(slug);
  redirect("/admin/tours");
}

export async function updateTour(id: string, formData: FormData) {
  const existing = await prisma.tour.findUnique({ where: { id }, select: { slug: true } });
  await prisma.tour.update({
    where: { id },
    data: {
      published: formData.get("published") === "on",
      imageUrl: str(formData, "imageUrl"),
      galleryImages: formData.getAll("galleryImages").map(String),
      titleRu: str(formData, "titleRu"),
      titleAz: str(formData, "titleAz"),
      titleEn: str(formData, "titleEn"),
      descriptionRu: str(formData, "descriptionRu"),
      descriptionAz: str(formData, "descriptionAz"),
      descriptionEn: str(formData, "descriptionEn"),
      durationRu: str(formData, "durationRu"),
      durationAz: str(formData, "durationAz"),
      durationEn: str(formData, "durationEn"),
      priceIndividualAzn: num(formData, "priceIndividualAzn"),
      priceGroupAzn: num(formData, "priceGroupAzn"),
    },
  });
  if (existing) revalidateTourPages(existing.slug);
  redirect("/admin/tours");
}

export async function deleteTour(id: string) {
  "use server";
  const deleted = await prisma.tour.delete({ where: { id } });
  revalidateTourPages(deleted.slug);
}
