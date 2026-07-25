import Link from "next/link";

// Certification "seal" — 01-design-system.md. Only for statutory
// registrations/certifications; don't reuse this shape elsewhere.
export function CertSeal({
  abbr,
  fullName,
  href,
}: {
  abbr: string;
  fullName: string;
  href?: string;
}) {
  const seal = (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className="flex size-28 items-center justify-center rounded-full"
        style={{ border: "1px dashed rgba(198,161,48,0.55)" }}
      >
        <div className="flex size-[calc(100%-16px)] items-center justify-center rounded-full border border-gold/40">
          <span className="font-display text-xl font-bold text-gold-bright">
            {abbr}
          </span>
        </div>
      </div>
      <p className="max-w-36 text-xs text-muted-light">{fullName}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-80">
        {seal}
      </Link>
    );
  }

  return seal;
}
