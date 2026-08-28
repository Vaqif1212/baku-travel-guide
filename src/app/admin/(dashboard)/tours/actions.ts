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

export async function createTour(formData: FormData) {
  await prisma.tour.create({
    data: {
      slug: str(formData, "slug"),
      order: num(formData, "order"),
      published: formData.get("published") === "on",
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
  revalidatePath("/");
  revalidatePath("/admin/tours");
  redirect("/admin/tours");
}

export async function updateTour(id: string, formData: FormData) {
  await prisma.tour.update({
    where: { id },
    data: {
      slug: str(formData, "slug"),
      order: num(formData, "order"),
      published: formData.get("published") === "on",
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
  revalidatePath("/");
  revalidatePath("/admin/tours");
  redirect("/admin/tours");
}

export async function deleteTour(id: string) {
  "use server";
  await prisma.tour.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/tours");
}
