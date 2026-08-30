import { redirect } from "next/navigation";
import { isAdminAuthenticated, clearAdminSessionCookie } from "@/lib/session";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { AdminShell } from "@/components/admin/AdminShell";

async function logoutAction() {
  "use server";
  await clearAdminSessionCookie();
  redirect("/admin/login");
}

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  const locale = await getAdminLocale();
  const dict = getAdminDict(locale);

  return (
    <AdminShell locale={locale} labels={dict.nav} logoutAction={logoutAction}>
      {children}
    </AdminShell>
  );
}
