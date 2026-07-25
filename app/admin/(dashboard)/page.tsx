import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: publishedProjects }, { count: draftPosts }] =
    await Promise.all([
      supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("published", true),
      supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("status", "draft"),
    ]);

  return (
    <div>
      <h1 className="text-3xl text-ink">Dashboard</h1>

      <div className="mt-8 grid max-w-xl grid-cols-2 gap-6">
        <div className="border border-line bg-paper p-6">
          <p className="font-mono text-3xl text-ink">
            {publishedProjects ?? 0}
          </p>
          <p className="mt-1 text-sm text-muted">published projects</p>
        </div>
        <div className="border border-line bg-paper p-6">
          <p className="font-mono text-3xl text-ink">{draftPosts ?? 0}</p>
          <p className="mt-1 text-sm text-muted">draft blog posts</p>
        </div>
      </div>

      <Link
        href="/admin/blog/new"
        className="mt-8 inline-block bg-gold px-5 py-2.5 text-sm font-medium text-navy hover:bg-gold-bright"
      >
        + New Blog Post
      </Link>
    </div>
  );
}
