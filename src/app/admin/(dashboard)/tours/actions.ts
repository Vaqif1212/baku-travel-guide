"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { parsePriceTiers } from "@/lib/priceTiers";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function priceTiers(formData: FormData) {
  try {
    return parsePriceTiers(JSON.parse(str(formData, "priceTiers") || "[]"));
  } catch {
    return [];
  }
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
      includedRu: str(formData, "includedRu"),
      includedAz: str(formData, "includedAz"),
      includedEn: str(formData, "includedEn"),
      notIncludedRu: str(formData, "notIncludedRu"),
      notIncludedAz: str(formData, "notIncludedAz"),
      notIncludedEn: str(formData, "notIncludedEn"),
      priceTiers: priceTiers(formData),
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
      includedRu: str(formData, "includedRu"),
      includedAz: str(formData, "includedAz"),
      includedEn: str(formData, "includedEn"),
      notIncludedRu: str(formData, "notIncludedRu"),
      notIncludedAz: str(formData, "notIncludedAz"),
      notIncludedEn: str(formData, "notIncludedEn"),
      priceTiers: priceTiers(formData),
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
