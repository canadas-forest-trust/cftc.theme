import { tv, type VariantProps } from "tailwind-variants";
import { Eyebrow } from "./eyebrow";

const fill = tv({
  base: "h-full transition-[width]",
  variants: {
    tone: {
      accent: "bg-accent",
      soft: "bg-accent/30",
    },
  },
  defaultVariants: { tone: "accent" },
});

export interface ProgressBarProps extends VariantProps<typeof fill> {
  /** 0–100. */
  value: number;
  /** Optional label rendered as an eyebrow above the track. */
  label?: string;
  /** Optional right-aligned value label, e.g. "4,500". */
  valueLabel?: string;
  className?: string;
}

/** ProgressBar — thin track + token-colored fill, optional eyebrow label row. */
export function ProgressBar({ value, tone, label, valueLabel, className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {(label || valueLabel) && (
        <div className="mb-2 flex items-baseline justify-between">
          {label && <Eyebrow>{label}</Eyebrow>}
          {valueLabel && <Eyebrow tone="ink">{valueLabel}</Eyebrow>}
        </div>
      )}
      <div
        className="h-1.5 w-full bg-frame"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={fill({ tone })} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
