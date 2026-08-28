"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createPost(formData: FormData) {
  await prisma.post.create({
    data: {
      slug: str(formData, "slug"),
      order: Number(formData.get("order")) || 0,
      published: formData.get("published") === "on",
      coverImageUrl: str(formData, "coverImageUrl"),
      title: str(formData, "title"),
      excerpt: str(formData, "excerpt"),
      body: str(formData, "body"),
    },
  });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  await prisma.post.update({
    where: { id },
    data: {
      slug: str(formData, "slug"),
      order: Number(formData.get("order")) || 0,
      published: formData.get("published") === "on",
      coverImageUrl: str(formData, "coverImageUrl"),
      title: str(formData, "title"),
      excerpt: str(formData, "excerpt"),
      body: str(formData, "body"),
    },
  });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  "use server";
  await prisma.post.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}
