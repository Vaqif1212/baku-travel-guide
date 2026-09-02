import type { Post } from "@prisma/client";
import type { AdminDict } from "@/lib/adminI18n";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { GalleryUploadField } from "@/components/admin/GalleryUploadField";
import { SlugField } from "@/components/admin/SlugField";

export function PostForm({ post, action, dict }: { post?: Post; action: (formData: FormData) => void | Promise<void>; dict: AdminDict }) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.blog.titleField}</span>
        <input
          name="title"
          defaultValue={post?.title}
          required
          className="w-full rounded-lg border border-neutral-300 px-3 py-3 text-lg font-semibold transition-colors focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15"
        />
      </label>

      <ImageUploadField
        label={dict.blog.cover}
        name="coverImageUrl"
        defaultValue={post?.coverImageUrl}
        chooseLabel={dict.common.imageChoose}
        uploadingLabel={dict.common.imageUploading}
        removeLabel={dict.common.imageRemove}
      />

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.blog.excerpt}</span>
        <textarea name="excerpt" defaultValue={post?.excerpt} rows={2} required className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm transition-colors focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15" />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-neutral-600">{dict.blog.body}</span>
        <textarea name="body" defaultValue={post?.body} rows={12} required className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm transition-colors focus:border-[#1F3B2E] focus:outline-none focus:ring-2 focus:ring-[#1F3B2E]/15" />
        <span className="mt-1 block text-[11px] text-neutral-400">{dict.blog.bodyHint}</span>
      </label>

      <GalleryUploadField
        label={dict.blog.galleryImages}
        name="galleryImages"
        defaultValue={post?.galleryImages}
        chooseLabel={dict.common.imageChoose}
        uploadingLabel={dict.common.imageUploading}
        removeLabel={dict.common.imageRemove}
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? true} className="h-4 w-4" />
        {dict.blog.publishedCheckbox}
      </label>

      <details className="rounded-lg border border-neutral-200 px-4 py-3">
        <summary className="cursor-pointer select-none text-xs font-bold uppercase tracking-wide text-neutral-500">
          {dict.common.advanced}
        </summary>
        <div className="mt-3">
          <SlugField label={dict.blog.slug} name="slug" defaultValue={post?.slug} watchName="title" hint={dict.common.slugHint} />
        </div>
      </details>

      <button type="submit" className="rounded-lg bg-[#1F3B2E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#16291F]">
        {dict.common.save}
      </button>
    </form>
  );
}
