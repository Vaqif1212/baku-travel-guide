"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { getSettings } from "@/lib/settings";
import { setAdminSessionCookie } from "@/lib/session";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";

export async function loginAction(_prevState: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const settings = await getSettings();
  const dict = getAdminDict(await getAdminLocale());

  if (!settings.adminPasswordHash) {
    return { error: dict.login.errorNotConfigured };
  }

  const valid = await bcrypt.compare(password, settings.adminPasswordHash);
  if (!valid) {
    return { error: dict.login.errorWrong };
  }

  await setAdminSessionCookie();
  redirect("/admin");
}
