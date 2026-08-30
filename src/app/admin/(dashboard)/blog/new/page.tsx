import Link from "next/link";
import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { IconArrowLeft } from "@/components/admin/icons";
import { PostForm } from "../PostForm";
import { createPost } from "../actions";

export default async function NewPostPage() {
  const dict = getAdminDict(await getAdminLocale());
  return (
    <div>
      <Link href="/admin/blog" className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <IconArrowLeft />
        {dict.common.backToList}
      </Link>
      <h1 className="text-2xl font-bold text-neutral-900">{dict.blog.newTitle}</h1>
      <div className="mt-6">
        <PostForm action={createPost} dict={dict} />
      </div>
    </div>
  );
}
