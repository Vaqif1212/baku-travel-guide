import type { Testimonial } from "@prisma/client";

export function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: Testimonial;
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-neutral-600">Имя (латиницей — читается во всех языках)</span>
          <input name="name" defaultValue={testimonial?.name} required className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-neutral-600">Порядок</span>
          <input name="order" type="number" defaultValue={testimonial?.order ?? 0} className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={testimonial?.published ?? true} className="h-4 w-4" />
        Опубликован
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        {(["Ru", "Az", "En"] as const).map((lang) => (
          <label key={lang} className="block">
            <span className="mb-1.5 block text-xs font-semibold text-neutral-600">Страна ({lang})</span>
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
          <span className="mb-1.5 block text-xs font-semibold text-neutral-600">Текст отзыва ({lang})</span>
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
        Сохранить
      </button>
    </form>
  );
}
