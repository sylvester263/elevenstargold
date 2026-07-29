import Image from "next/image";
import Link from "next/link";
import type { ProjectImage } from "@/lib/supabase/queries";

// overflow-hidden on the image wrapper clips the group-hover zoom, per
// 01-design-system.md's card-hover motion spec. Cover = images[0] (admin's
// gallery reorder controls decide which image that is) — see the comment on
// the Project type in lib/supabase/queries.ts.
export function ProjectCard({
  slug,
  title,
  client,
  cost,
  year,
  category,
  images,
}: {
  slug: string;
  title: string;
  client: string;
  cost: string;
  year: string;
  category: string;
  images?: ProjectImage[];
}) {
  const cover = images?.[0];

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col border border-line bg-paper [transform-style:preserve-3d] transition-[transform,box-shadow] duration-300 ease-out hover:[transform:perspective(900px)_rotateX(3deg)_translateY(-4px)] hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <div className="aspect-[3/2] w-full overflow-hidden">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt || title}
            width={600}
            height={400}
            sizes="(max-width: 600px) 100vw, (max-width: 880px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            className="h-full w-full bg-[repeating-linear-gradient(135deg,var(--line)_0,var(--line)_1px,transparent_1px,transparent_12px)] bg-charcoal/5 transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-5">
        <span className="text-xs tracking-[0.1em] text-orange uppercase">
          {category}
        </span>
        <h3 className="font-display text-base text-ink">{title}</h3>
        <p className="text-sm text-muted">{client}</p>
        <p className="font-mono text-sm text-ink">
          {cost} · {year}
        </p>
      </div>
    </Link>
  );
}
