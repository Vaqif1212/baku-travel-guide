import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated, clearAdminSessionCookie } from "@/lib/session";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { AdminLangSwitcher } from "@/components/admin/AdminLangSwitcher";

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

  const NAV = [
    { href: "/admin", label: dict.nav.overview },
    { href: "/admin/tours", label: dict.nav.tours },
    { href: "/admin/blog", label: dict.nav.blog },
    { href: "/admin/testimonials", label: dict.nav.testimonials },
    { href: "/admin/messages", label: dict.nav.messages },
    { href: "/admin/settings", label: dict.nav.settings },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <aside className="hidden w-56 shrink-0 border-r border-neutral-200 bg-white p-5 sm:block">
          <div className="mb-6 text-sm font-bold text-neutral-900">Baku Travel Guide</div>
          <div className="mb-6">
            <AdminLangSwitcher locale={locale} />
          </div>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="mt-8">
            <button type="submit" className="text-sm text-neutral-400 hover:text-neutral-700">
              {dict.nav.logout}
            </button>
          </form>
        </aside>
        <main className="min-w-0 flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
