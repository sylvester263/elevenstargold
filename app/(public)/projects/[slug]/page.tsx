import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section } from "@/components/marketing/Section";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceForCategory } from "@/lib/service-category";
import { slugify } from "@/lib/slug";
import { getPublishedProjects, getProjectBySlug } from "@/lib/supabase/queries";

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: `${project.title} — delivered for ${project.client} (${project.year}).`,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getPublishedProjects();
  const related = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  const relatedService = serviceForCategory(project.category);
  const heroImage = project.images[0];

  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
          />
        </div>
      </div>

      <Section className="pb-0!">
        <p className="text-xs tracking-[0.14em] text-gold uppercase">
          {project.category}
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl text-ink">{project.title}</h1>

        <dl className="mt-8 grid grid-cols-3 gap-6 border-y border-line py-6 max-[600px]:grid-cols-1">
          <div>
            <dt className="text-xs text-muted uppercase">Client</dt>
            <dd className="mt-1 font-mono text-sm text-ink">{project.client}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted uppercase">Contract Value</dt>
            <dd className="mt-1 font-mono text-sm text-ink">{project.cost}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted uppercase">Year</dt>
            <dd className="mt-1 font-mono text-sm text-ink">{project.year}</dd>
          </div>
        </dl>

        {heroImage ? (
          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden bg-paper">
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div
            className="mt-8 aspect-[16/10] w-full bg-[repeating-linear-gradient(135deg,var(--line)_0,var(--line)_1px,transparent_1px,transparent_12px)]"
            aria-hidden="true"
          />
        )}

        {project.writeUp ? (
          <p className="mt-8 max-w-2xl text-sm text-ink">{project.writeUp}</p>
        ) : (
          <div className="mt-8 max-w-2xl border border-dashed border-line p-4 text-sm text-muted">
            TODO: project write-up — not included in the source data pulled
            from `07-real-content-and-assets.md`; request a short description
            from the client for this project.
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link
            href={`/projects?category=${project.category.toLowerCase()}`}
            className="font-medium text-gold hover:text-gold-bright"
          >
            More {project.category} projects →
          </Link>
          {relatedService ? (
            <Link
              href={`/services#${slugify(relatedService)}`}
              className="font-medium text-gold hover:text-gold-bright"
            >
              See the {relatedService} service →
            </Link>
          ) : null}
        </div>
      </Section>

      {related.length > 0 ? (
        <Section className="border-t border-line">
          <h2 className="text-2xl text-ink">Related projects</h2>
          <div className="mt-8 grid grid-cols-3 gap-6 max-[880px]:grid-cols-2 max-[600px]:grid-cols-1">
            {related.map((p) => (
              <ProjectCard key={p.slug} {...p} />
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
