import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostForm } from "../PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">Изменить статью</h1>
      <div className="mt-6">
        <PostForm post={post} action={updatePost.bind(null, id)} />
      </div>
    </div>
  );
}
