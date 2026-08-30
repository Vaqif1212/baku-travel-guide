import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { deletePost } from "./actions";

export default async function AdminBlogPage() {
  const dict = getAdminDict(await getAdminLocale());
  const posts = await prisma.post.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">{dict.blog.title}</h1>
        <Link href="/admin/blog/new" className="rounded bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800">
          {dict.blog.newButton}
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="flex items-start justify-between rounded-lg border border-neutral-200 bg-white p-5">
            <div>
              <div className="text-sm font-semibold text-neutral-900">
                {p.title} {!p.published && <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">{dict.common.hidden}</span>}
              </div>
              <p className="mt-1.5 max-w-xl text-sm text-neutral-500">{p.excerpt}</p>
            </div>
            <div className="flex shrink-0 gap-4 text-sm">
              <Link href={`/admin/blog/${p.id}`} className="text-neutral-600 hover:text-neutral-900 hover:underline">
                {dict.common.edit}
              </Link>
              <form action={deletePost.bind(null, p.id)}>
                <button type="submit" className="text-red-600 hover:underline">
                  {dict.common.delete}
                </button>
              </form>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-neutral-400">{dict.blog.empty}</p>}
      </div>
    </div>
  );
}
