import { getSettings } from "@/lib/settings";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { SettingsForm } from "./SettingsForm";

export default async function AdminSettingsPage() {
  const [settings, dict] = await Promise.all([getSettings(), getAdminLocale().then(getAdminDict)]);
  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">{dict.settings.title}</h1>
      <div className="mt-6">
        <SettingsForm settings={settings} dict={dict} />
      </div>
    </div>
  );
}
