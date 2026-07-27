import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deletePost } from "./actions";

export default async function AdminBlogListPage() {
  // The layout already blocks unconfigured access at runtime; this only
  // guards Next's build-time static generation attempt, which runs this
  // page's body independently of the layout's early return.
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, status, category, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-ink">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="bg-gold px-4 py-2 text-sm font-medium text-navy hover:bg-gold-bright"
        >
          + New Post
        </Link>
      </div>

      <table className="mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs text-muted uppercase">
            <th className="py-2 font-normal">Title</th>
            <th className="py-2 font-normal">Status</th>
            <th className="py-2 font-normal">Category</th>
            <th className="py-2 font-normal">Date</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {(posts ?? []).map((post) => (
            <tr key={post.id} className="border-b border-line">
              <td className="py-3">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="text-ink hover:text-gold"
                >
                  {post.title}
                </Link>
              </td>
              <td className="py-3 text-muted capitalize">{post.status}</td>
              <td className="py-3 text-muted">{post.category}</td>
              <td className="py-3 font-mono text-xs text-muted">
                {new Date(post.published_at ?? post.created_at).toLocaleDateString()}
              </td>
              <td className="py-3 text-right">
                <DeleteButton action={deletePost.bind(null, post.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(posts ?? []).length === 0 ? (
        <p className="mt-8 text-sm text-muted">No posts yet.</p>
      ) : null}
    </div>
  );
}
