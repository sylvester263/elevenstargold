import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Company news, safety updates, and project stories from Eleven Star Gold.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs items={[{ label: "Blog" }]} />
        </div>
      </div>

      <Section>
        <SectionHeader eyebrow="News" heading="Blog" />

        {posts.length === 0 ? (
          <div className="mt-10 border border-dashed border-line p-8 text-center text-sm text-muted">
            No posts published yet — check back soon.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-3 gap-6 max-[880px]:grid-cols-2 max-[600px]:grid-cols-1">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-line bg-paper p-6"
              >
                <p className="text-xs tracking-[0.1em] text-gold uppercase">
                  {post.category}
                </p>
                <h2 className="mt-2 text-lg text-ink">{post.title}</h2>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              </a>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
