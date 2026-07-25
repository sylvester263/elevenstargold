import { cn } from "@/lib/utils";

// Section vertical rhythm + max content width — 01-design-system.md.
export function Section({
  children,
  className,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
}) {
  return (
    <Tag className={cn("px-8 py-24 max-[600px]:px-4 max-[600px]:py-14", className)}>
      <div className="mx-auto max-w-[1160px]">{children}</div>
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  dark = false,
}: {
  eyebrow: string;
  heading: string;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-4 border-b pb-6",
        dark ? "border-line-dark" : "border-line",
      )}
    >
      <div>
        <p className="text-xs tracking-[0.14em] text-orange uppercase">
          {eyebrow}
        </p>
        <h2 className={cn("mt-2 text-3xl", dark ? "text-bg" : "text-ink")}>
          {heading}
        </h2>
      </div>
      {description ? (
        <p
          className={cn(
            "max-w-sm text-right text-sm",
            dark ? "text-muted-light" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
