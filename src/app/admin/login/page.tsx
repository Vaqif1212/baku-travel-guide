import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { AdminLangSwitcher } from "@/components/admin/AdminLangSwitcher";
import { Logo } from "@/components/site/Logo";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  const locale = await getAdminLocale();
  const dict = getAdminDict(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4">
      <Logo size={40} />
      <AdminLangSwitcher locale={locale} />
      <LoginForm dict={dict} />
    </div>
  );
}
