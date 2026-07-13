import { Label } from "./label";
import { Display, type DisplayProps } from "./display";
import { cn } from "../../lib/cn";

export interface StatProps {
  /** Archivo uppercase label, e.g. "Carbon sequestered". */
  label: string;
  /** Label colour — accent for primary sidebar stats. */
  labelTone?: "muted" | "accent" | "ink";
  /** The figure, e.g. "809.73" or "6,000". */
  value: React.ReactNode;
  /** Optional trailing unit, e.g. "kg", "%". */
  unit?: React.ReactNode;
  size?: DisplayProps["size"];
  tone?: DisplayProps["tone"];
  /** Compact density for ops dashboards — smaller label + figure. */
  density?: "default" | "compact";
  className?: string;
}

/** Stat — label over a large display figure with an optional unit. */
export function Stat({
  label: labelText,
  labelTone = "muted",
  value,
  unit,
  size = "lg",
  tone = "ink",
  density = "default",
  className,
}: StatProps) {
  if (density === "compact") {
    const valueTone =
      tone === "bright"
        ? "text-accent-bright"
        : tone === "accent"
          ? "text-accent"
          : tone === "inverse"
            ? "text-inverse"
            : "text-ink";

    return (
      <div className={className}>
        {labelText ? (
          <div
            className={cn(
              "mb-1 font-body text-xs font-semibold leading-none",
              labelTone === "accent" ? "text-accent" : labelTone === "ink" ? "text-ink" : "text-muted",
            )}
          >
            {labelText}
          </div>
        ) : null}
        <div className="flex items-baseline gap-1.5">
          <div className={cn("font-body text-xl font-semibold tracking-tight leading-none", valueTone)}>
            {value}
          </div>
          {unit ? <span className="font-body text-sm font-medium text-muted">{unit}</span> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {labelText ? (
        <Label as="div" kind="stat" tone={labelTone} className="mb-3">
          {labelText}
        </Label>
      ) : null}
      <div className="flex items-baseline gap-2">
        <Display as="div" size={size} tone={tone}>
          {value}
        </Display>
        {unit && <span className="font-body text-xl font-bold text-muted">{unit}</span>}
      </div>
    </div>
  );
}
