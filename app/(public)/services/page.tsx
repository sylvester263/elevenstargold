import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { SERVICE_CATEGORY } from "@/lib/service-category";
import { slugify } from "@/lib/slug";
import { services, servicesIntro, servicesClosing } from "@/content/site-copy";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Nine service lines — Building Construction, Road Construction, Project Management, Civil Engineering, Renovation & Remodeling, Interior and Exterior Finishing, Industrial Construction, Real Estate Development, Maintenance & Repairs.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs items={[{ label: "Services" }]} />
        </div>
      </div>

      <Section>
        <SectionHeader
          eyebrow="What we do"
          heading="Services"
          description="Every service line is backed by delivered project evidence."
        />
        <p className="mt-8 max-w-2xl text-ink">{servicesIntro}</p>

        <div className="mt-4 divide-y divide-line">
          {services.map((service, i) => {
            const category = SERVICE_CATEGORY[service.name];
            const id = slugify(service.name);

            return (
              <div key={service.name} id={id} className="scroll-mt-24 py-10">
                <div className="grid grid-cols-[80px_1fr] gap-8 max-[600px]:grid-cols-1 max-[600px]:gap-3">
                  <span className="font-mono text-2xl text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-2xl text-ink">{service.name}</h2>
                    <p className="mt-3 max-w-2xl text-muted">
                      {service.description}
                    </p>
                    {category ? (
                      <Link
                        href={`/projects?category=${category.toLowerCase()}`}
                        className="mt-4 inline-block text-sm font-medium text-gold hover:text-gold-bright"
                      >
                        See {category} projects delivered →
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-muted">{servicesClosing}</p>
      </Section>
    </div>
  );
}
