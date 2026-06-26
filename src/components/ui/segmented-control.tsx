export interface SegmentedOption {
  label: string;
  value: string;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange?: (value: string) => void;
  "aria-label"?: string;
  className?: string;
}

/**
 * SegmentedControl — mono uppercase options in a hairline frame; the active
 * segment is solid accent. Tabs/filters (e.g. species legend, view switches).
 */
export function SegmentedControl({
  options,
  value,
  onChange,
  "aria-label": ariaLabel,
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={["inline-flex border border-field", className ?? ""].join(" ")}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange?.(o.value)}
            className={[
              "px-4 py-2 font-eyebrow text-xs uppercase tracking-wide transition-colors",
              active ? "bg-accent text-accent-fg" : "bg-panel text-muted hover:text-ink",
            ].join(" ")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
