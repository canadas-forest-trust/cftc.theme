import { Stat, type StatProps } from "./stat";
import { cn } from "../../lib/cn";

export interface StatStripProps {
  items: StatProps[];
  /** Compact density for ops dashboards. */
  density?: "default" | "compact";
  className?: string;
}

/**
 * StatStrip — a row of Stats separated by hairlines (the forest-detail
 * "SEEDLINGS · TOTAL TREES · PLANTING SOON" strip). Hairlines come from a 1px
 * grid gap over a hairline background, so they stay correct at every breakpoint.
 */
export function StatStrip({ items, density = "default", className }: StatStripProps) {
  const compact = density === "compact";
  const cols =
    items.length <= 2
      ? "sm:grid-cols-2"
      : items.length === 3
        ? "sm:grid-cols-3"
        : items.length === 5
          ? "sm:grid-cols-2 lg:grid-cols-5"
          : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px border border-hairline bg-hairline",
        cols,
        className,
      )}
    >
      {items.map((item, i) => (
        <div key={i} className={cn("bg-panel", compact ? "p-3.5" : "p-5")}>
          <Stat {...item} density={item.density ?? density} size={item.size ?? "md"} />
        </div>
      ))}
    </div>
  );
}
