import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { getTeamMembers } from "@/lib/supabase/queries";
import { Reveal } from "@/components/marketing/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Team",
  description:
    "The people behind Eleven Star Gold's institutional, government, and industrial contracts.",
  path: "/team",
});

// See app/(public)/page.tsx for why — ISR-caches this page instead of
// re-rendering + re-querying Supabase on every request.
export const revalidate = 300;

export default async function TeamPage() {
  const members = await getTeamMembers();

  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs items={[{ label: "Team" }]} />
        </div>
      </div>

      <Section>
        <SectionHeader
          eyebrow="People"
          heading="Team"
          description="The people delivering the work behind every certification and completed contract."
        />

        {members.length > 0 ? (
          <div className="mt-8 grid grid-cols-3 gap-8 max-[880px]:grid-cols-2 max-[600px]:grid-cols-1">
            {members.map((member, i) => (
              <Reveal key={member.name} delay={Math.min(i * 60, 300)}>
                <div className="flex flex-col">
                  <div className="aspect-square w-full overflow-hidden border border-line">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        width={400}
                        height={400}
                        sizes="(max-width: 600px) 100vw, (max-width: 880px) 50vw, 33vw"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="h-full w-full bg-[repeating-linear-gradient(135deg,var(--line)_0,var(--line)_1px,transparent_1px,transparent_12px)] bg-charcoal/5"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-base text-ink">
                    {member.name}
                  </h3>
                  <p className="text-sm text-orange">{member.role}</p>
                  {member.bio ? (
                    <p className="mt-2 text-sm text-muted">{member.bio}</p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted">
            Team profiles are being added — check back soon.
          </p>
        )}
      </Section>
    </div>
  );
}
