import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Section, SectionHeader } from "@/components/marketing/Section";
import { ContactForm } from "./ContactForm";
import { getSiteSettings, whatsappHref } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo/metadata";
import { services } from "@/content/site-copy";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Eleven Star Gold to request a quote for your next project.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const mapQuery = encodeURIComponent(settings.officeAddress);

  return (
    <div>
      <div className="border-b border-line bg-paper">
        <div className="mx-auto max-w-[1160px] px-8 py-6 max-[600px]:px-4">
          <Breadcrumbs items={[{ label: "Contact" }]} />
        </div>
      </div>

      <Section>
        <SectionHeader
          eyebrow="Get in touch"
          heading="Contact"
          description="We'll reply within one business day."
        />

        <div className="mt-10 grid grid-cols-[1fr_360px] gap-16 max-[880px]:grid-cols-1">
          <ContactForm serviceOptions={services.map((s) => s.name)} />

          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-[0.14em] text-gold uppercase">
                Office
              </p>
              <p className="mt-2 text-sm text-ink">{settings.officeAddress}</p>
            </div>

            <div>
              <p className="text-xs tracking-[0.14em] text-gold uppercase">
                Phone
              </p>
              {settings.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="mt-1 block font-mono text-sm text-ink hover:text-gold"
                >
                  {phone}
                </a>
              ))}
            </div>

            <div>
              <p className="text-xs tracking-[0.14em] text-gold uppercase">
                Email
              </p>
              <a
                href={`mailto:${settings.email}`}
                className="mt-1 block text-sm text-ink hover:text-gold"
              >
                {settings.email}
              </a>
            </div>

            <div>
              <p className="text-xs tracking-[0.14em] text-gold uppercase">
                WhatsApp
              </p>
              <a
                href={whatsappHref(
                  settings.whatsappNumber,
                  settings.whatsappDefaultMessage,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block font-mono text-sm text-ink hover:text-gold"
              >
                {settings.whatsappNumber}
              </a>
            </div>

            <iframe
              title="Office location map"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-56 w-full border border-line"
              loading="lazy"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
