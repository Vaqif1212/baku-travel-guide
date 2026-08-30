import { redirect } from "next/navigation";
import { isAdminAuthenticated, clearAdminSessionCookie } from "@/lib/session";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { AdminLangSwitcher } from "@/components/admin/AdminLangSwitcher";
import { AdminNav } from "@/components/admin/AdminNav";
import { IconLogout } from "@/components/admin/icons";
import { Logo } from "@/components/site/Logo";

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
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white sm:flex sm:flex-col">
          <div className="flex items-center gap-2.5 border-b border-neutral-100 px-5 py-5">
            <Logo size={28} />
            <div>
              <div className="text-sm font-bold leading-tight text-neutral-900">Baku Travel Guide</div>
              <div className="text-xs text-neutral-400">Admin</div>
            </div>
          </div>

          <div className="px-5 pt-4">
            <AdminLangSwitcher locale={locale} />
          </div>

          <div className="flex-1 px-3 pt-4">
            <AdminNav labels={dict.nav} />
          </div>

          <form action={logoutAction} className="border-t border-neutral-100 p-3">
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            >
              <IconLogout />
              {dict.nav.logout}
            </button>
          </form>
        </aside>
        <main className="min-w-0 flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
