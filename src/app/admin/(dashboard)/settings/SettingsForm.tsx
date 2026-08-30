"use client";

import { useActionState } from "react";
import type { Setting } from "@prisma/client";
import type { AdminDict } from "@/lib/adminI18n";
import { updateSettings } from "./actions";
import { QrCodeCard } from "@/components/admin/QrCodeCard";

function Field({ label, name, defaultValue, type = "text" }: { label: string; name: string; defaultValue?: string | number; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</span>
      <input
        name={name}
        type={type}
        step={type === "number" ? "0.001" : undefined}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm transition-colors focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15"
      />
    </label>
  );
}

export function SettingsForm({ settings, dict }: { settings: Setting; dict: AdminDict }) {
  const [state, formAction, pending] = useActionState(updateSettings, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-10">
      <fieldset className="rounded-lg border border-neutral-200 p-5">
        <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">{dict.settings.promoLegend}</legend>
        <label className="mb-4 flex items-center gap-2 text-sm">
          <input type="checkbox" name="promoEnabled" defaultChecked={settings.promoEnabled} className="h-4 w-4" />
          {dict.settings.promoShow}
        </label>
        <div className="space-y-3">
          <Field label={`${dict.settings.promoText} (RU)`} name="promoTextRu" defaultValue={settings.promoTextRu} />
          <Field label={`${dict.settings.promoText} (AZ)`} name="promoTextAz" defaultValue={settings.promoTextAz} />
          <Field label={`${dict.settings.promoText} (EN)`} name="promoTextEn" defaultValue={settings.promoTextEn} />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-neutral-200 p-5">
        <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">{dict.settings.currencyLegend}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={dict.settings.usdRate} name="usdRate" type="number" defaultValue={settings.usdRate} />
          <Field label={dict.settings.rubRate} name="rubRate" type="number" defaultValue={settings.rubRate} />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-neutral-200 p-5">
        <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">{dict.settings.contactLegend}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={dict.settings.whatsapp} name="whatsapp" defaultValue={settings.whatsapp} />
          <Field label={dict.settings.telegram} name="telegram" defaultValue={settings.telegram} />
          <Field label={dict.settings.phone} name="phone" defaultValue={settings.phone} />
          <Field label={dict.settings.email} name="email" defaultValue={settings.email} />
          <Field label={dict.settings.instagram} name="instagram" defaultValue={settings.instagram} />
          <Field label={dict.settings.facebook} name="facebook" defaultValue={settings.facebook} />
        </div>
        <div className="mt-4">
          <Field label={dict.settings.googleReviewLink} name="googleReviewLink" defaultValue={settings.googleReviewLink} />
          <QrCodeCard
            value={settings.googleReviewLink ?? ""}
            title={dict.settings.qrTitle}
            downloadLabel={dict.settings.qrDownload}
            filename="google-review-qr"
          />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-neutral-200 p-5">
        <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">{dict.settings.passwordLegend}</legend>
        <Field label={dict.settings.newPassword} name="newPassword" type="password" />
      </fieldset>

      {state?.message && <p className="text-sm font-medium text-green-700">{state.message}</p>}

      <button type="submit" disabled={pending} className="rounded-lg bg-[#1F3B2E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#16291F] disabled:opacity-60">
        {pending ? dict.common.saving : dict.common.save}
      </button>
    </form>
  );
}
