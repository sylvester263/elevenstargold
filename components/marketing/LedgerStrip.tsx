import { cn } from "@/lib/utils";

export type LedgerItem = { value: string; label: string; tag?: string };

// Signature "ledger" stat strip — 01-design-system.md. Reused as-is; don't
// invent a second stats-bar style elsewhere in the site.
export function LedgerStrip({
  items,
  variant = "dark",
  compact = false,
  className,
}: {
  items: LedgerItem[];
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "grid grid-cols-4 max-[600px]:grid-cols-2",
        className,
      )}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "relative border-t px-6",
            i % 4 !== 0 && "max-[600px]:[&:nth-child(2n)]:border-l",
            i !== 0 && "min-[601px]:border-l",
            isDark ? "border-line-dark" : "border-line",
            compact ? "py-4" : "py-8",
          )}
        >
          {item.tag && (
            <span
              className={cn(
                "absolute top-3 right-3 font-mono text-[10px] opacity-40",
                isDark ? "text-muted-light" : "text-muted",
              )}
            >
              {item.tag}
            </span>
          )}
          <p
            className={cn(
              "font-mono font-semibold",
              // Long formatted values (e.g. "₨560,000,000") don't fit the
              // cell at the default size — scale down rather than overflow
              // into the next cell.
              item.value.length > 9
                ? "text-xl"
                : compact
                  ? "text-2xl"
                  : "text-4xl",
              isDark ? "text-gold-bright" : "text-ink",
            )}
          >
            {item.value}
          </p>
          <p
            className={cn(
              "mt-1 text-sm lowercase",
              isDark ? "text-muted-light" : "text-muted",
            )}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
