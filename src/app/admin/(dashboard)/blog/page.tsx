import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { IconPencil, IconPlus, IconDocument, IconInbox } from "@/components/admin/icons";
import { deletePost } from "./actions";

export default async function AdminBlogPage() {
  const dict = getAdminDict(await getAdminLocale());
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">{dict.blog.title}</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1F3B2E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#16291F]"
        >
          <IconPlus />
          {dict.blog.newButton}
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              {p.coverImageUrl ? (
                <Image src={p.coverImageUrl} alt="" fill sizes="80px" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-300">
                  <IconDocument />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-neutral-900">
                {p.title} {!p.published && <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">{dict.common.hidden}</span>}
              </div>
              <p className="mt-1.5 max-w-xl truncate text-sm text-neutral-500">{p.excerpt}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Link
                href={`/admin/blog/${p.id}`}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <IconPencil />
                {dict.common.edit}
              </Link>
              <DeleteButton action={deletePost.bind(null, p.id)} confirmText={dict.common.confirmDelete} label={dict.common.delete} />
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-200 py-16 text-neutral-400">
            <IconInbox />
            {dict.blog.empty}
          </div>
        )}
      </div>
    </div>
  );
}
