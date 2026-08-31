"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createPost(formData: FormData) {
  const slug = str(formData, "slug");
  await prisma.post.create({
    data: {
      slug,
      order: Number(formData.get("order")) || 0,
      published: formData.get("published") === "on",
      coverImageUrl: str(formData, "coverImageUrl"),
      title: str(formData, "title"),
      excerpt: str(formData, "excerpt"),
      body: str(formData, "body"),
    },
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  const existing = await prisma.post.findUnique({ where: { id }, select: { slug: true } });
  const slug = str(formData, "slug");
  await prisma.post.update({
    where: { id },
    data: {
      slug,
      order: Number(formData.get("order")) || 0,
      published: formData.get("published") === "on",
      coverImageUrl: str(formData, "coverImageUrl"),
      title: str(formData, "title"),
      excerpt: str(formData, "excerpt"),
      body: str(formData, "body"),
    },
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  if (existing && existing.slug !== slug) revalidatePath(`/blog/${existing.slug}`);
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  "use server";
  const deleted = await prisma.post.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath(`/blog/${deleted.slug}`);
  revalidatePath("/admin/blog");
}
