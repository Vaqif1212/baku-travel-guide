import type { Testimonial } from "@prisma/client";
import type { AdminDict } from "@/lib/adminI18n";

export function TestimonialForm({
  testimonial,
  action,
  dict,
}: {
  testimonial?: Testimonial;
  action: (formData: FormData) => void | Promise<void>;
  dict: AdminDict;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.testimonials.name}</span>
          <input name="name" defaultValue={testimonial?.name} required className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.common.order}</span>
          <input name="order" type="number" defaultValue={testimonial?.order ?? 0} className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={testimonial?.published ?? true} className="h-4 w-4" />
        {dict.testimonials.publishedCheckbox}
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        {(["Ru", "Az", "En"] as const).map((lang) => (
          <label key={lang} className="block">
            <span className="mb-1.5 block text-xs font-semibold text-neutral-600">
              {dict.testimonials.country} ({lang})
            </span>
            <input
              name={`country${lang}`}
              defaultValue={testimonial?.[`country${lang}` as keyof Testimonial] as string}
              required
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
            />
          </label>
        ))}
      </div>

      {(["Ru", "Az", "En"] as const).map((lang) => (
        <label key={lang} className="block">
          <span className="mb-1.5 block text-xs font-semibold text-neutral-600">
            {dict.testimonials.text} ({lang})
          </span>
          <textarea
            name={`text${lang}`}
            defaultValue={testimonial?.[`text${lang}` as keyof Testimonial] as string}
            rows={3}
            required
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
          />
        </label>
      ))}

      <button type="submit" className="rounded bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800">
        {dict.common.save}
      </button>
    </form>
  );
}
