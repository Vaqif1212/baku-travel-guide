import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { AdminLangSwitcher } from "@/components/admin/AdminLangSwitcher";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  const locale = await getAdminLocale();
  const dict = getAdminDict(locale);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-neutral-100 px-4">
      <AdminLangSwitcher locale={locale} />
      <LoginForm dict={dict} />
    </div>
  );
}
