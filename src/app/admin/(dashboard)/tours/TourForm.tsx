import type { Tour } from "@prisma/client";

function Field({ label, name, defaultValue, type = "text", required = true }: { label: string; name: string; defaultValue?: string | number; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
      />
    </label>
  );
}

function TextAreaField({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={3}
        required
        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
      />
    </label>
  );
}

export function TourForm({ tour, action }: { tour?: Tour; action: (formData: FormData) => void | Promise<void> }) {
  return (
    <form action={action} className="max-w-3xl space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Slug (латиницей, уникальный)" name="slug" defaultValue={tour?.slug} />
        <Field label="Порядок сортировки" name="order" type="number" defaultValue={tour?.order ?? 0} />
        <label className="flex items-center gap-2 pt-6 text-sm">
          <input type="checkbox" name="published" defaultChecked={tour?.published ?? true} className="h-4 w-4" />
          Опубликован
        </label>
      </div>

      {(["Ru", "Az", "En"] as const).map((lang) => (
        <fieldset key={lang} className="rounded-lg border border-neutral-200 p-5">
          <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">{lang}</legend>
          <div className="space-y-4">
            <Field label="Название тура" name={`title${lang}`} defaultValue={tour?.[`title${lang}` as keyof Tour] as string} />
            <TextAreaField
              label="Описание"
              name={`description${lang}`}
              defaultValue={tour?.[`description${lang}` as keyof Tour] as string}
            />
            <Field
              label="Длительность (например: 8)"
              name={`duration${lang}`}
              defaultValue={tour?.[`duration${lang}` as keyof Tour] as string}
            />
          </div>
        </fieldset>
      ))}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Цена индивидуально, AZN" name="priceIndividualAzn" type="number" defaultValue={tour?.priceIndividualAzn ?? 0} />
        <Field label="Цена в группе (с человека), AZN" name="priceGroupAzn" type="number" defaultValue={tour?.priceGroupAzn ?? 0} />
      </div>

      <button type="submit" className="rounded bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800">
        Сохранить
      </button>
    </form>
  );
}
