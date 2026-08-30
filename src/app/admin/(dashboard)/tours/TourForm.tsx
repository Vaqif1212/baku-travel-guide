import type { Tour } from "@prisma/client";
import type { AdminDict } from "@/lib/adminI18n";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

function Field({ label, name, defaultValue, type = "text", required = true }: { label: string; name: string; defaultValue?: string | number; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm transition-colors focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15"
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
        className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm transition-colors focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15"
      />
    </label>
  );
}

export function TourForm({
  tour,
  action,
  dict,
}: {
  tour?: Tour;
  action: (formData: FormData) => void | Promise<void>;
  dict: AdminDict;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={dict.tours.slug} name="slug" defaultValue={tour?.slug} />
        <Field label={dict.common.order} name="order" type="number" defaultValue={tour?.order ?? 0} />
        <label className="flex items-center gap-2 pt-6 text-sm">
          <input type="checkbox" name="published" defaultChecked={tour?.published ?? true} className="h-4 w-4" />
          {dict.tours.publishedCheckbox}
        </label>
      </div>

      <ImageUploadField
        label={dict.tours.imageUrl}
        name="imageUrl"
        defaultValue={tour?.imageUrl}
        chooseLabel={dict.common.imageChoose}
        uploadingLabel={dict.common.imageUploading}
        removeLabel={dict.common.imageRemove}
      />

      {(["Ru", "Az", "En"] as const).map((lang) => (
        <fieldset key={lang} className="rounded-lg border border-neutral-200 p-5">
          <legend className="px-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500">{lang}</legend>
          <div className="space-y-4">
            <Field label={dict.tours.titleField} name={`title${lang}`} defaultValue={tour?.[`title${lang}` as keyof Tour] as string} />
            <TextAreaField
              label={dict.tours.description}
              name={`description${lang}`}
              defaultValue={tour?.[`description${lang}` as keyof Tour] as string}
            />
            <Field
              label={dict.tours.duration}
              name={`duration${lang}`}
              defaultValue={tour?.[`duration${lang}` as keyof Tour] as string}
            />
          </div>
        </fieldset>
      ))}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={dict.tours.priceIndividual} name="priceIndividualAzn" type="number" defaultValue={tour?.priceIndividualAzn ?? 0} />
        <Field label={dict.tours.priceGroup} name="priceGroupAzn" type="number" defaultValue={tour?.priceGroupAzn ?? 0} />
      </div>

      <button type="submit" className="rounded-lg bg-[#1F3B2E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#16291F]">
        {dict.common.save}
      </button>
    </form>
  );
}
