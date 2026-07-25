import { createClient } from "@/lib/supabase/server";

export type RecentPost = { title: string; slug: string };

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
};

export async function getRecentPosts(limit = 3): Promise<RecentPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("title, slug")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
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
