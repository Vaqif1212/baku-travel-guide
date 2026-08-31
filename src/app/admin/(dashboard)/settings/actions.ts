"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function updateSettings(_prevState: { message?: string } | undefined, formData: FormData) {
  await getSettings(); // ensure the row exists

  await prisma.setting.update({
    where: { id: "singleton" },
    data: {
      promoEnabled: formData.get("promoEnabled") === "on",
      promoTextRu: str(formData, "promoTextRu"),
      promoTextAz: str(formData, "promoTextAz"),
      promoTextEn: str(formData, "promoTextEn"),
      usdRate: Number(formData.get("usdRate")) || 1.7,
      rubRate: Number(formData.get("rubRate")) || 0.019,
      whatsapp: str(formData, "whatsapp"),
      whatsapp2: str(formData, "whatsapp2"),
      telegram: str(formData, "telegram"),
      phone: str(formData, "phone"),
      email: str(formData, "email"),
      instagram: str(formData, "instagram"),
      facebook: str(formData, "facebook"),
      googleReviewLink: str(formData, "googleReviewLink"),
    },
  });

  const newPassword = str(formData, "newPassword");
  if (newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.setting.update({ where: { id: "singleton" }, data: { adminPasswordHash: hash } });
  }

  revalidatePath("/");
  revalidatePath("/az");
  revalidatePath("/en");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/tours/[slug]", "page");
  revalidatePath("/az/tours/[slug]", "page");
  revalidatePath("/en/tours/[slug]", "page");
  revalidatePath("/admin/settings");
  const dict = getAdminDict(await getAdminLocale());
  return { message: newPassword ? dict.settings.savedWithPassword : dict.settings.saved };
}
