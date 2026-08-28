"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { getSettings } from "@/lib/settings";
import { setAdminSessionCookie } from "@/lib/session";

export async function loginAction(_prevState: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const settings = await getSettings();

  if (!settings.adminPasswordHash) {
    return { error: "Пароль ещё не настроен. Запустите сид базы данных (npm run db:seed)." };
  }

  const valid = await bcrypt.compare(password, settings.adminPasswordHash);
  if (!valid) {
    return { error: "Неверный пароль." };
  }

  await setAdminSessionCookie();
  redirect("/admin");
}
