import { Stat, type StatProps } from "./stat";

export interface StatStripProps {
  items: StatProps[];
  className?: string;
}

/**
 * StatStrip — a row of Stats separated by hairlines (the forest-detail
 * "SEEDLINGS · TOTAL TREES · PLANTING SOON" strip). Hairlines come from a 1px
 * grid gap over a hairline background, so they stay correct at every breakpoint.
 */
export function StatStrip({ items, className }: StatStripProps) {
  return (
    <div
      className={[
        "grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4",
        className ?? "",
      ].join(" ")}
    >
      {items.map((item, i) => (
        <div key={i} className="bg-panel p-5">
          <Stat {...item} size={item.size ?? "md"} />
        </div>
      ))}
    </div>
  );
}
