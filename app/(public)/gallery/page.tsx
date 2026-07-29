import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { getGalleryImages } from "@/lib/supabase/queries";
import { Reveal } from "@/components/marketing/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description:
    "Photos from Eleven Star Gold's completed projects — building construction, road works, and institutional contracts across Punjab.",
  path: "/gallery",
});

// See app/(public)/page.tsx for why — ISR-caches this page instead of
// re-rendering + re-querying Supabase on every request.
export const revalidate = 300;

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs items={[{ label: "Gallery" }]} />
        </div>
      </div>

      <Section>
        <SectionHeader
          eyebrow="Portfolio"
          heading="Gallery"
          description="Photos from projects delivered across Punjab — every image links back to its full project record."
        />

        {images.length > 0 ? (
          <div className="mt-8 grid grid-cols-4 gap-4 max-[880px]:grid-cols-3 max-[600px]:grid-cols-2">
            {images.map((img, i) => (
              <Reveal key={`${img.projectSlug}-${img.url}`} delay={Math.min(i * 30, 300)}>
                <Link
                  href={`/projects/${img.projectSlug}`}
                  className="group block aspect-square w-full overflow-hidden border border-line"
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    width={400}
                    height={400}
                    sizes="(max-width: 600px) 50vw, (max-width: 880px) 33vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted">
            No project photos uploaded yet.
          </p>
        )}
      </Section>
    </div>
  );
}
