import { cn } from "@/lib/utils";
import Link from "next/link";

// Certification "seal" — 01-design-system.md. Only for statutory
// registrations/certifications; don't reuse this shape elsewhere.
//
// The spec's literal colors (abbr in --charcoal, full name in --muted)
// assume a light surface behind the seal — that's what /certifications
// uses. The homepage places this on its dark charcoal-dark section, where
// --charcoal text would sit at ~1.5:1 contrast (illegible); the `dark`
// prop swaps in light-on-dark colors for that context instead.
export function CertSeal({
  abbr,
  fullName,
  href,
  dark = false,
}: {
  abbr: string;
  fullName: string;
  href?: string;
  dark?: boolean;
}) {
  const seal = (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className="flex size-28 items-center justify-center rounded-full"
        style={{ border: "1px dashed rgba(255,102,0,0.5)" }}
      >
        <div className="flex size-[calc(100%-16px)] items-center justify-center rounded-full border border-orange/40">
          <span
            className={cn(
              "font-display text-xl font-bold",
              dark ? "text-orange" : "text-charcoal",
            )}
          >
            {abbr}
          </span>
        </div>
      </div>
      <p className={cn("max-w-36 text-xs", dark ? "text-muted-light" : "text-muted")}>
        {fullName}
      </p>
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
