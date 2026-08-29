"use client";

import { useActionState } from "react";
import type { Setting } from "@prisma/client";
import { updateSettings } from "./actions";

function Field({ label, name, defaultValue, type = "text" }: { label: string; name: string; defaultValue?: string | number; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</span>
      <input
        name={name}
        type={type}
        step={type === "number" ? "0.001" : undefined}
        defaultValue={defaultValue}
        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
      />
    </label>
  );
}

export function SettingsForm({ settings }: { settings: Setting }) {
  const [state, formAction, pending] = useActionState(updateSettings, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-10">
      <fieldset className="rounded-lg border border-neutral-200 p-5">
        <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">Промо-баннер</legend>
        <label className="mb-4 flex items-center gap-2 text-sm">
          <input type="checkbox" name="promoEnabled" defaultChecked={settings.promoEnabled} className="h-4 w-4" />
          Показывать баннер на сайте
        </label>
        <div className="space-y-3">
          <Field label="Текст (RU)" name="promoTextRu" defaultValue={settings.promoTextRu} />
          <Field label="Текст (AZ)" name="promoTextAz" defaultValue={settings.promoTextAz} />
          <Field label="Текст (EN)" name="promoTextEn" defaultValue={settings.promoTextEn} />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-neutral-200 p-5">
        <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">Курсы валют (AZN за 1 единицу)</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="USD → AZN" name="usdRate" type="number" defaultValue={settings.usdRate} />
          <Field label="RUB → AZN" name="rubRate" type="number" defaultValue={settings.rubRate} />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-neutral-200 p-5">
        <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">Контакты</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp (только цифры, с кодом страны)" name="whatsapp" defaultValue={settings.whatsapp} />
          <Field label="Telegram (без @)" name="telegram" defaultValue={settings.telegram} />
          <Field label="Телефон (для отображения)" name="phone" defaultValue={settings.phone} />
          <Field label="Email" name="email" defaultValue={settings.email} />
          <Field label="Instagram (без @)" name="instagram" defaultValue={settings.instagram} />
          <Field label="Facebook (часть ссылки после facebook.com/)" name="facebook" defaultValue={settings.facebook} />
        </div>
      </fieldset>

      <fieldset className="rounded-lg border border-neutral-200 p-5">
        <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">Пароль администратора</legend>
        <Field label="Новый пароль (оставьте пустым, чтобы не менять)" name="newPassword" type="password" />
      </fieldset>

      {state?.message && <p className="text-sm font-medium text-green-700">{state.message}</p>}

      <button type="submit" disabled={pending} className="rounded bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60">
        {pending ? "Сохранение…" : "Сохранить"}
      </button>
    </form>
  );
}
