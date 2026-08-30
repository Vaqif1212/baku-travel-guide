import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { IconArrowLeft } from "@/components/admin/icons";
import { PostForm } from "../PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, dict] = await Promise.all([prisma.post.findUnique({ where: { id } }), getAdminLocale().then(getAdminDict)]);
  if (!post) notFound();

  return (
    <div>
      <Link href="/admin/blog" className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <IconArrowLeft />
        {dict.common.backToList}
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900">{dict.blog.editTitle}</h1>
      <div className="mt-6">
        <PostForm post={post} action={updatePost.bind(null, id)} dict={dict} />
      </div>
    </div>
  );
}
