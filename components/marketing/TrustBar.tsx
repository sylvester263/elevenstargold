import Image from "next/image";

// Real logos — sourced from each organization's own official domain, a
// verified official secondary source, or supplied directly by the client
// (PESSI/PWWF/HISDU/TMA/PHE) — see PROGRESS.md for the sourcing notes per
// name. Anything not listed here falls back to styled text below. Never
// add an entry here without a verified official source or direct client
// supply.
const TRUST_LOGOS: Record<
  string,
  {
    src: string;
    width: number;
    height: number;
    alt: string;
    // True when the source file has a solid (non-white/transparent)
    // background baked in — clipped to a circle via CSS so it blends with
    // the section background the same way the other, white-background
    // logos do. Doesn't touch the source pixels, just how much of the
    // canvas is visible.
    circular?: boolean;
  }
> = {
  PESSI: {
    src: "/images/trust/pessi.jpg",
    width: 447,
    height: 447,
    alt: "PESSI — Punjab Employees Social Security Institution",
  },
  FCCU: {
    src: "/images/trust/fccu.png",
    width: 200,
    height: 200,
    alt: "FCCU — Forman Christian College (A Chartered University)",
  },
  PWWF: {
    src: "/images/trust/pwwf.jpg",
    width: 400,
    height: 400,
    alt: "PWWF — Punjab Workers Welfare Fund",
  },
  HISDU: {
    src: "/images/trust/hisdu.jpg",
    width: 400,
    height: 400,
    alt: "HISDU — Health Information & Service Delivery Unit",
  },
  PHFMC: {
    src: "/images/trust/phfmc.png",
    width: 500,
    height: 532,
    alt: "PHFMC — Punjab Health Facilities Management Company",
  },
  HUBCO: {
    src: "/images/trust/hubco.png",
    width: 201,
    height: 50,
    alt: "HUBCO — The Hub Power Company Limited",
  },
  // "TMA" in the client list refers to Metropolitan Corporation Lahore
  // (Lahore is governed by MCL rather than a Tehsil Municipal
  // Administration) — confirmed with the client, see PROGRESS.md.
  TMA: {
    src: "/images/trust/tma.jpg",
    width: 448,
    height: 446,
    alt: "Metropolitan Corporation Lahore",
    circular: true,
  },
  PHE: {
    src: "/images/trust/phe.jpg",
    width: 200,
    height: 200,
    alt: "PHE — Punjab Public Health Engineering Department",
  },
};

export function TrustBar({ clients }: { clients: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
      {clients.map((name) => {
        const logo = TRUST_LOGOS[name];
        if (logo) {
          return (
            <Image
              key={name}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={`h-12 w-auto object-contain${logo.circular ? " rounded-full" : ""}`}
            />
          );
        }
        return (
          <span
            key={name}
            className="flex h-12 items-center font-display text-xl font-semibold text-ink/70"
          >
            {name}
          </span>
        );
      })}
    </div>
  );
}
