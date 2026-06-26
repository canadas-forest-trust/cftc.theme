export interface LegendItem {
  label: string;
  /** Swatch color (CSS color or var), e.g. "var(--color-green-700)". */
  color: string;
}

export interface LegendProps {
  items: LegendItem[];
  className?: string;
}

/** Legend — square swatch + mono label pairs (species explorer key). */
export function Legend({ items, className }: LegendProps) {
  return (
    <div className={["flex flex-wrap items-center gap-x-5 gap-y-2", className ?? ""].join(" ")}>
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-3 shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="font-eyebrow text-xs uppercase tracking-wide text-ink-soft">
            {item.label}
          </span>
        </span>
      ))}
    </div>
  );
}
