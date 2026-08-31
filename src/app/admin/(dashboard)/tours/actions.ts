"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
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
  const slug = str(formData, "slug");
  await prisma.tour.create({
    data: {
      slug,
      order: num(formData, "order"),
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
  const slug = str(formData, "slug");
  await prisma.tour.update({
    where: { id },
    data: {
      slug,
      order: num(formData, "order"),
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
  if (existing && existing.slug !== slug) revalidatePath(`/tours/${existing.slug}`);
  redirect("/admin/tours");
}

export async function deleteTour(id: string) {
  "use server";
  const deleted = await prisma.tour.delete({ where: { id } });
  revalidateTourPages(deleted.slug);
}
