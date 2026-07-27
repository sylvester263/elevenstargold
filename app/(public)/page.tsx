import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { LedgerStrip } from "@/components/marketing/LedgerStrip";
import { CertSeal } from "@/components/marketing/CertSeal";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { ProjectGallery } from "@/components/marketing/ProjectGallery";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedProjects, getCertifications } from "@/lib/supabase/queries";
import { SERVICE_CATEGORY } from "@/lib/service-category";
import { SERVICE_ICON } from "@/lib/service-icons";
import { mdMessage, services } from "@/content/site-copy";
import { buildMetadata } from "@/lib/seo/metadata";
import { Reveal } from "@/components/marketing/Reveal";
import { TrustBar } from "@/components/marketing/TrustBar";
import { HeroBackground } from "@/components/marketing/HeroBackground";

export const metadata: Metadata = buildMetadata({
  title: "Engineering Services",
  description:
    "A Punjab-based civil contractor delivering institutional, government, and industrial projects — evidenced by certifications, safety record, and completed work.",
  path: "/",
});

export default async function Home() {
  const [settings, projects, certifications] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects(),
    getCertifications(),
  ]);

  return (
    <main className="flex-1">
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-charcoal-dark">
        <HeroBackground />
        <Section className="relative">
          <div className="grid grid-cols-2 items-center gap-16 max-[880px]:grid-cols-1">
            <div>
              <p className="text-xs tracking-[0.14em] text-orange uppercase">
                Eleven Star Gold
              </p>
              <h1 className="mt-4 text-5xl text-bg max-[600px]:text-4xl">
                We build the buildings{" "}
                <span className="text-orange">government trusts.</span>
              </h1>
              <p className="mt-6 max-w-md text-muted-light">
                A Punjab-based civil contractor delivering institutional,
                government, and industrial projects — evidenced by
                certifications, safety record, and completed work.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className={cn(buttonVariants({ size: "lg" }), "bg-orange text-charcoal-deep hover:bg-orange-dark")}
                >
                  View Completed Projects
                </Link>
                <Link
                  href="/certifications"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "border-line-dark bg-transparent text-bg hover:bg-charcoal",
                  )}
                >
                  See Our Certifications
                </Link>
              </div>
            </div>

            <div className="border-l border-line-dark pl-8 max-[880px]:border-l-0 max-[880px]:pl-0">
              <blockquote className="text-xl text-bg">
                “{mdMessage.pullQuote}”
              </blockquote>
              <p className="mt-4 font-mono text-sm text-orange">
                — Asif Nemat, Managing Director
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* 2. Ledger stat strip */}
      <div className="bg-charcoal-dark">
        <div className="mx-auto max-w-[1160px] px-8 max-[600px]:px-4">
          <LedgerStrip items={settings.ledgerStats} variant="dark" />
        </div>
      </div>

      {/* 3. Trust bar */}
      <Reveal>
        <Section className="bg-paper py-14!" as="div">
          <p className="text-center text-xs tracking-[0.14em] text-muted uppercase">
            Trusted by
          </p>
          <TrustBar clients={settings.trustBarClients} />
        </Section>
      </Reveal>

      {/* 4. Services */}
      <Reveal>
        <Section>
          <SectionHeader
            eyebrow="What we do"
            heading="Services"
            description="Every service line is backed by delivered project evidence."
          />
          <div className="mt-10 grid grid-cols-3 gap-6 max-[880px]:grid-cols-2 max-[600px]:grid-cols-1">
            {services.map((service, i) => (
              <ServiceCard
                key={service.name}
                number={String(i + 1).padStart(2, "0")}
                title={service.name}
                description={service.description || undefined}
                href={`/projects?category=${(SERVICE_CATEGORY[service.name] ?? "").toLowerCase()}`}
                icon={SERVICE_ICON[service.name]}
              />
            ))}
          </div>
        </Section>
      </Reveal>

      {/* 5. Certifications */}
      <section className="bg-charcoal-dark">
        <Reveal>
          <Section>
            <SectionHeader
              eyebrow="Credentials"
              heading="Certifications"
              dark
            />
            <div className="mt-10 flex flex-wrap justify-center gap-10">
              {certifications.map((cert) => (
                <CertSeal
                  key={cert.abbr}
                  abbr={cert.abbr}
                  fullName={cert.fullName}
                  href="/certifications"
                  dark
                />
              ))}
            </div>
          </Section>
        </Reveal>
      </section>

      {/* 6. Project gallery preview */}
      <Reveal>
        <Section>
          <SectionHeader
            eyebrow="Evidence"
            heading="Completed Projects"
            description="A sample of delivered work across every category."
          />
          <div className="mt-10">
            <ProjectGallery projects={projects} limit={9} />
          </div>
        </Section>
      </Reveal>

      {/* 7. HSE / Safety */}
      <section className="bg-charcoal-dark">
        <Reveal>
          <Section>
            <SectionHeader eyebrow="Safety" heading="HSE Record" dark />
            <div className="mt-10 grid grid-cols-3 gap-6 max-[600px]:grid-cols-1">
              {["Zero Accidents", "Zero Injuries", "Zero Property Damage"].map(
                (stat) => (
                  <div key={stat} className="border border-line-dark p-6 text-center">
                    <p className="font-mono text-3xl text-orange">0</p>
                    <p className="mt-2 text-sm text-muted-light">{stat}</p>
                  </div>
                ),
              )}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/safety"
                className="text-sm font-medium text-orange hover:text-orange-dark"
              >
                Read our full safety policy →
              </Link>
            </div>
          </Section>
        </Reveal>
      </section>

      {/* 8. MD message */}
      <Reveal>
        <Section>
          <div className="grid grid-cols-2 items-center gap-16 max-[880px]:grid-cols-1">
            <div className="w-full max-w-sm overflow-hidden border border-line">
              <Image
                src="/images/team/asif-nemat.webp"
                alt="Asif Nemat, Managing Director / CEO of Eleven Star Gold"
                width={600}
                height={800}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs tracking-[0.14em] text-orange uppercase">
                From the Managing Director
              </p>
              <blockquote className="mt-4 text-2xl text-ink">
                “{mdMessage.pullQuote}”
              </blockquote>
              <p className="mt-6 font-mono text-sm text-muted">
                Asif Nemat — Managing Director / CEO
              </p>
            </div>
          </div>
        </Section>
      </Reveal>

      {/* 9. Footer CTA */}
      <section className="border-t border-line bg-charcoal-dark">
        <Reveal>
          <Section className="py-16!">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <h2 className="text-2xl text-bg">
                Ready to start your project?
              </h2>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "bg-orange text-charcoal-deep hover:bg-orange-dark")}
              >
                Request a Quote
              </Link>
            </div>
          </Section>
        </Reveal>
      </section>
    </main>
  );
}
