import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { CertSeal } from "@/components/marketing/CertSeal";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCertifications } from "@/lib/supabase/queries";
import { Reveal } from "@/components/marketing/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Certifications",
  description:
    "Statutory registrations and certifications held by Eleven Star Gold: PEC, PRA, FBR, Professional Tax Certificate, and Chamber of Commerce membership.",
  path: "/certifications",
});

// See app/(public)/page.tsx for why — ISR-caches this page instead of
// re-rendering + re-querying Supabase on every request.
export const revalidate = 300;

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs items={[{ label: "Certifications" }]} />
        </div>
      </div>

      <Section>
        <SectionHeader
          eyebrow="Credentials"
          heading="Certifications"
          description="Statutory registrations, verifiable against the issuing bodies."
        />

        <div className="mt-4 divide-y divide-line">
          {certifications.map((cert, i) => (
            <Reveal key={cert.abbr} delay={Math.min(i * 40, 320)}>
              <div className="grid grid-cols-[160px_1fr_auto] items-start gap-8 py-10 max-[880px]:grid-cols-1">
                <CertSeal abbr={cert.abbr} fullName={cert.fullName} />

                <div>
                  <h2 className="text-xl text-ink">{cert.fullName}</h2>
                  {cert.issuingBody ? (
                    <p className="mt-1 text-sm text-muted">{cert.issuingBody}</p>
                  ) : null}
                </div>

                {cert.scanUrl ? (
                  <div className="relative aspect-[1240/1754] w-32 shrink-0 border border-line max-[880px]:w-full max-[880px]:max-w-32">
                    <Image
                      src={cert.scanUrl}
                      alt={`${cert.fullName} scan`}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="flex aspect-[1240/1754] w-32 shrink-0 flex-col items-center justify-center gap-2 border border-line bg-[repeating-linear-gradient(135deg,var(--line)_0,var(--line)_1px,transparent_1px,transparent_10px)] p-2 text-center max-[880px]:w-full max-[880px]:max-w-32"
                  >
                    <span className="text-[10px] leading-tight text-muted">
                      Certificate image pending
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
