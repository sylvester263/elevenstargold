import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { LedgerStrip } from "@/components/marketing/LedgerStrip";
import { getSiteSettings } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  company,
  companyHistory,
  mdMessage,
  missionVision,
  capacity,
} from "@/content/site-copy";
import { Reveal } from "@/components/marketing/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `About ${company.name} — ${company.tagline}.`,
  path: "/about",
});

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs items={[{ label: "About" }]} />
        </div>
      </div>

      <div className="mx-auto max-w-[1160px] px-8 pt-10 max-[600px]:px-4">
        <LedgerStrip items={settings.ledgerStats} variant="light" compact />
      </div>

      <Reveal>
        <Section>
          <SectionHeader eyebrow="Company" heading="About Eleven Star Gold" />
          <div className="mt-8 max-w-3xl">
            <p className="text-ink">{companyHistory}</p>
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section className="border-t border-line">
          <SectionHeader eyebrow="From the owner" heading="Message from the MD" />
          <div className="mt-8 max-w-3xl">
            <p className="whitespace-pre-line text-ink">
              {mdMessage.fullLetter}
            </p>
            <p className="mt-6 font-mono text-sm text-muted">
              {company.md} — Managing Director / CEO
            </p>
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section className="border-t border-line">
          <div className="grid grid-cols-2 gap-10 max-[880px]:grid-cols-1">
            <div>
              <SectionHeader eyebrow="Purpose" heading="Mission" />
              <div className="mt-6">
                <p className="whitespace-pre-line text-ink">
                  {missionVision.mission}
                </p>
              </div>
            </div>
            <div>
              <SectionHeader eyebrow="Purpose" heading="Vision" />
              <div className="mt-6">
                <p className="text-ink">{missionVision.vision}</p>
              </div>
            </div>
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section className="border-t border-line">
          <SectionHeader eyebrow="Capacity" heading="Our Capacity" />
          <div className="mt-8 grid grid-cols-2 gap-10 max-[880px]:grid-cols-1">
            <div>
              <h3 className="text-sm font-medium text-orange uppercase tracking-[0.1em]">
                Staff
              </h3>
              <p className="mt-3 max-w-xl text-ink">{capacity.staff}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-orange uppercase tracking-[0.1em]">
                Machinery & Equipment
              </h3>
              <p className="mt-3 max-w-xl text-ink">{capacity.machinery}</p>
            </div>
          </div>
        </Section>
      </Reveal>
    </div>
  );
}
