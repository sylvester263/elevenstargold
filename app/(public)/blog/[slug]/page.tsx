import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";

// See app/(public)/page.tsx for why — ISR-caches this page instead of
// re-rendering on every request.
export const revalidate = 300;

// TODO: real post rendering (Article schema, rich-text body, related links)
// once the blog CMS exists — 05-admin-panel-and-blog.md, 06-integrations-and-seo.md.
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <main className="flex-1 px-8 py-24">{post.title}</main>;
}
