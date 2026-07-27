import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function ServiceCard({
  number,
  title,
  description,
  href,
  icon: Icon,
}: {
  number: string;
  title: string;
  description?: string;
  href: string;
  icon?: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 border border-line bg-paper p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {Icon ? (
        <span className="flex size-11 items-center justify-center border border-orange/30 bg-orange/10 text-orange transition-colors duration-200 group-hover:bg-orange/15">
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
      ) : null}
      <span className="font-mono text-sm text-orange">{number}</span>
      <h3 className="font-display text-lg text-ink">{title}</h3>
      {description ? (
        <p className="text-sm text-muted">{description}</p>
      ) : null}
    </Link>
  );
}
