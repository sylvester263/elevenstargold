import Link from "next/link";

export function ServiceCard({
  number,
  title,
  description,
  href,
}: {
  number: string;
  title: string;
  description?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 border border-line bg-paper p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span className="font-mono text-sm text-orange">{number}</span>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      {description ? (
        <p className="text-sm text-muted">{description}</p>
      ) : null}
    </Link>
  );
}
