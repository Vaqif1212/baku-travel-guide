import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { PostForm } from "../PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, dict] = await Promise.all([prisma.post.findUnique({ where: { id } }), getAdminLocale().then(getAdminDict)]);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">{dict.blog.editTitle}</h1>
      <div className="mt-6">
        <PostForm post={post} action={updatePost.bind(null, id)} dict={dict} />
      </div>
    </div>
  );
}
