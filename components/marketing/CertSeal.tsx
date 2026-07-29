import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

// Real issuing-authority logos — sourced from each organization's own
// official domain, or supplied directly by the client (PEC/PRA/TAX), same
// standard as components/marketing/TrustBar.tsx. See PROGRESS.md for the
// full sourcing notes per name. Never add an entry here without a
// verified official source or direct client supply.
const CERT_LOGOS: Record<
  string,
  { src: string; width: number; height: number; alt: string }
> = {
  PEC: {
    src: "/images/certs/pec.png",
    width: 1081,
    height: 1081,
    alt: "PEC — Pakistan Engineering Council",
  },
  PRA: {
    src: "/images/certs/pra.png",
    width: 447,
    height: 447,
    alt: "PRA — Punjab Revenue Authority",
  },
  FBR: {
    src: "/images/certs/fbr.png",
    width: 532,
    height: 77,
    alt: "FBR — Federal Board of Revenue",
  },
  TAX: {
    src: "/images/certs/tax.jpg",
    width: 360,
    height: 360,
    alt: "Excise, Taxation & Narcotics Control Department, Punjab",
  },
  COC: {
    src: "/images/certs/coc.png",
    width: 400,
    height: 111,
    alt: "The Lahore Chamber of Commerce & Industry",
  },
};

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
  const logo = CERT_LOGOS[abbr];

  const seal = (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className="flex size-28 items-center justify-center rounded-full"
        style={{ border: "1px dashed rgba(255,102,0,0.5)" }}
      >
        <div
          className={cn(
            "flex size-[calc(100%-16px)] items-center justify-center rounded-full border border-orange/40",
            // Logo files aren't all transparent (e.g. COC's has a flat
            // white background baked in) — give logos a consistent light
            // backing disc so they read cleanly on both seal variants.
            // Text abbreviations keep the original transparent look.
            logo && "bg-paper",
          )}
        >
          {logo ? (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="80px"
              className="h-auto max-h-[60%] w-[78%] object-contain"
            />
          ) : (
            <span
              className={cn(
                "font-display text-xl font-bold",
                dark ? "text-orange" : "text-charcoal",
              )}
            >
              {abbr}
            </span>
          )}
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
