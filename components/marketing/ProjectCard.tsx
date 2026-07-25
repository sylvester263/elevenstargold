import Link from "next/link";

// TODO: swap the placeholder block below for next/image once a real photo
// exists for this project (with descriptive alt text) — 07-real-content-and-assets.md.
export function ProjectCard({
  slug,
  title,
  client,
  cost,
  year,
  category,
}: {
  slug: string;
  title: string;
  client: string;
  cost: string;
  year: string;
  category: string;
}) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col border border-line bg-paper transition-transform duration-150 ease-out hover:-translate-y-[3px] hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div
        className="aspect-[3/2] w-full bg-[repeating-linear-gradient(135deg,var(--line)_0,var(--line)_1px,transparent_1px,transparent_12px)] bg-navy/5"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2 p-5">
        <span className="text-xs tracking-[0.1em] text-gold uppercase">
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
