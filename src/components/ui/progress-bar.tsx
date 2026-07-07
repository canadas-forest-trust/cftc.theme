import { tv, type VariantProps } from "tailwind-variants";
import { Label } from "./label";

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
  /** Label above the track; also used as the progressbar's accessible name. */
  label?: string;
  /** Label colour — muted for secondary rows like "Planting soon". */
  labelTone?: "ink" | "muted" | "accent";
  /** Optional right-aligned value label, e.g. "4,500". */
  valueLabel?: string;
  /** Accessible name when no visible label is rendered. */
  "aria-label"?: string;
  className?: string;
}

/** ProgressBar — thin track + token-colored fill, optional eyebrow label row. */
export function ProgressBar({
  value,
  tone,
  label,
  labelTone = "ink",
  valueLabel,
  className,
  "aria-label": ariaLabel,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={className}>
      {(label || valueLabel) && (
        <div className="mb-2 flex items-baseline justify-between">
          {label && (
            <Label kind="progress" tone={labelTone}>
              {label}
            </Label>
          )}
          {valueLabel && (
            <span className="font-body text-base font-bold tabular-nums text-ink">{valueLabel}</span>
          )}
        </div>
      )}
      <div
        className="h-1.5 w-full bg-frame"
        role="progressbar"
        aria-label={label ?? ariaLabel}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={fill({ tone })} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
