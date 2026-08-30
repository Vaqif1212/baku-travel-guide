import { getAdminDict } from "@/lib/adminI18n";
import { getAdminLocale } from "@/lib/adminLocale";
import { PostForm } from "../PostForm";
import { createPost } from "../actions";

export default async function NewPostPage() {
  const dict = getAdminDict(await getAdminLocale());
  return (
    <div>
      <h1 className="text-xl font-bold text-neutral-900">{dict.blog.newTitle}</h1>
      <div className="mt-6">
        <PostForm action={createPost} dict={dict} />
      </div>
    </div>
  );
}
