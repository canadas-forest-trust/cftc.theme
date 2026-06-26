export interface DistributionItem {
  label: string;
  /** 0–100. */
  value: number;
  /** Override the fill color (CSS color or var). Defaults to the accent. */
  color?: string;
}

export interface DistributionBarProps {
  items: DistributionItem[];
  className?: string;
}

/**
 * DistributionBar — labeled percentage rows (the "Species composition" list:
 * name · bar · %). Fixed label column, flexible track, trailing percent.
 */
export function DistributionBar({ items, className }: DistributionBarProps) {
  return (
    <div className={["flex flex-col gap-3", className ?? ""].join(" ")}>
      {items.map((item) => {
        const pct = Math.max(0, Math.min(100, item.value));
        return (
          <div key={item.label} className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3">
            <span className="truncate font-body text-sm font-semibold text-ink">{item.label}</span>
            <div className="h-1.5 w-full bg-inset" role="presentation">
              <div
                className="h-full bg-accent"
                style={{ width: `${pct}%`, backgroundColor: item.color }}
              />
            </div>
            <span className="text-right font-eyebrow text-xs text-muted tabular-nums">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}
