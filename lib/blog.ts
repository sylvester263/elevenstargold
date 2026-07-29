// Plain anon client — see lib/supabase/public.ts for why (Batch A perf
// audit: cookies() here was forcing dynamic rendering site-wide).
import { createClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export type RecentPost = { title: string; slug: string };

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
};

export async function getRecentPosts(limit = 3): Promise<RecentPost[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("title, slug")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, category, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (data ?? []).map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? "",
    category: p.category,
    publishedAt: p.published_at ?? "",
  }));
}
