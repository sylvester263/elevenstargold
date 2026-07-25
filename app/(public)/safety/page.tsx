import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { hsePolicy, ppe } from "@/content/site-copy";

export const metadata: Metadata = buildMetadata({
  title: "Safety",
  description: hsePolicy.headline,
  path: "/safety",
});

export default function SafetyPage() {
  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs items={[{ label: "Safety" }]} />
        </div>
      </div>

      <section className="bg-navy">
        <Section className="pt-16!">
          <p className="text-xs tracking-[0.14em] text-gold uppercase">
            HSE Policy
          </p>
          <h1 className="mt-2 max-w-2xl text-4xl text-bg">
            {hsePolicy.headline}
          </h1>

          <div className="mt-10 grid grid-cols-3 gap-6 max-[600px]:grid-cols-1">
            {["Zero Accidents", "Zero Injuries", "Zero Property Damage"].map(
              (stat) => (
                <div
                  key={stat}
                  className="border border-line-dark p-6 text-center"
                >
                  <p className="font-mono text-4xl text-gold-bright">0</p>
                  <p className="mt-2 text-sm text-muted-light">{stat}</p>
                </div>
              ),
            )}
          </div>
        </Section>
      </section>

      <Section>
        <SectionHeader eyebrow="Policy" heading="Full HSE Policy" />
        <div className="mt-8 max-w-3xl">
          <p className="whitespace-pre-line text-ink">{hsePolicy.fullText}</p>
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeader eyebrow="On site" heading="Safety Equipment & PPE" />
        <ul className="mt-8 grid max-w-3xl grid-cols-3 gap-4 max-[600px]:grid-cols-1">
          {ppe.map((item) => (
            <li
              key={item}
              className="border border-line bg-paper px-4 py-3 text-sm text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
