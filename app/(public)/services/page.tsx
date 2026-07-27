import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { SERVICE_CATEGORY } from "@/lib/service-category";
import { SERVICE_ICON } from "@/lib/service-icons";
import { slugify } from "@/lib/slug";
import { services, servicesIntro, servicesClosing } from "@/content/site-copy";
import { Reveal } from "@/components/marketing/Reveal";

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

        <div className="mt-10 grid grid-cols-3 gap-6 max-[880px]:grid-cols-2 max-[600px]:grid-cols-1">
          {services.map((service, i) => {
            const category = SERVICE_CATEGORY[service.name];
            const id = slugify(service.name);
            const Icon = SERVICE_ICON[service.name];

            return (
              <Reveal key={service.name} delay={Math.min(i * 60, 360)}>
                <div
                  id={id}
                  className="scroll-mt-24 flex h-full flex-col gap-3 border border-line bg-paper p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {Icon ? (
                    <span className="flex size-11 items-center justify-center border border-orange/30 bg-orange/10 text-orange">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  ) : null}
                  <span className="font-mono text-sm text-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-lg text-ink">{service.name}</h2>
                  <p className="text-sm text-muted">{service.description}</p>
                  {category ? (
                    <Link
                      href={`/projects?category=${category.toLowerCase()}`}
                      className="mt-auto pt-2 text-sm font-medium text-orange hover:text-orange-dark"
                    >
                      See {category} projects delivered →
                    </Link>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-muted">{servicesClosing}</p>
      </Section>
    </div>
  );
}
