import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { LedgerStrip } from "@/components/marketing/LedgerStrip";
import { ProjectGallery } from "@/components/marketing/ProjectGallery";
import { getSiteSettings } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPublishedProjects, type ProjectCategory } from "@/lib/supabase/queries";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Completed projects delivered for government, institutional, and private clients across Punjab.",
  path: "/projects",
});

// See app/(public)/page.tsx for why — ISR-caches this page instead of
// re-rendering + re-querying Supabase on every request.
export const revalidate = 300;

const CATEGORY_LABELS = [
  "Education",
  "Healthcare",
  "Government",
  "Industrial",
  "Housing",
] as const satisfies readonly ProjectCategory[];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects(),
  ]);

  const initialCategory =
    CATEGORY_LABELS.find((c) => c.toLowerCase() === category?.toLowerCase()) ??
    "All";

  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs items={[{ label: "Projects" }]} />
        </div>
      </div>

      <div className="mx-auto max-w-[1160px] px-8 pt-10 max-[600px]:px-4">
        <LedgerStrip items={settings.ledgerStats} variant="light" compact />
      </div>

      <Section>
        <SectionHeader
          eyebrow="Evidence"
          heading="Completed Projects"
          description="Filter by category — every project links through to its full record."
        />
        <div className="mt-10">
          <ProjectGallery
            projects={projects}
            initialCategory={initialCategory}
            syncUrl
          />
        </div>
      </Section>
    </div>
  );
}
