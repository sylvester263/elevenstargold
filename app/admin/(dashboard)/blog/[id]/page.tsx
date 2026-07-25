import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogPostForm } from "../BlogPostForm";

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl text-ink">Edit Blog Post</h1>
      <div className="mt-8 max-w-3xl">
        <BlogPostForm post={post} />
      </div>
    </div>
  );
}
