import type { Post } from "@prisma/client";
import type { AdminDict } from "@/lib/adminI18n";

export function PostForm({ post, action, dict }: { post?: Post; action: (formData: FormData) => void | Promise<void>; dict: AdminDict }) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.blog.slug}</span>
          <input name="slug" defaultValue={post?.slug} required className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.common.order}</span>
          <input name="order" type="number" defaultValue={post?.order ?? 0} className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
        </label>
        <label className="flex items-center gap-2 pt-6 text-sm">
          <input type="checkbox" name="published" defaultChecked={post?.published ?? true} className="h-4 w-4" />
          {dict.blog.publishedCheckbox}
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.blog.cover}</span>
        <input name="coverImageUrl" defaultValue={post?.coverImageUrl} className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.blog.titleField}</span>
        <input name="title" defaultValue={post?.title} required className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.blog.excerpt}</span>
        <textarea name="excerpt" defaultValue={post?.excerpt} rows={2} required className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.blog.body}</span>
        <textarea name="body" defaultValue={post?.body} rows={12} required className="w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none" />
      </label>
      <button type="submit" className="rounded bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800">
        {dict.common.save}
      </button>
    </form>
  );
}
