import { Eyebrow } from "./eyebrow";
import { Display, type DisplayProps } from "./display";

export interface StatProps {
  /** Monospace eyebrow label, e.g. "CARBON SEQUESTERED". */
  label: string;
  /** The figure, e.g. "809.73" or "6,000". */
  value: React.ReactNode;
  /** Optional trailing unit, e.g. "kg", "%". */
  unit?: React.ReactNode;
  size?: DisplayProps["size"];
  tone?: DisplayProps["tone"];
  className?: string;
}

/** Stat — eyebrow label over a large display figure with an optional unit. */
export function Stat({ label, value, unit, size = "lg", tone = "ink", className }: StatProps) {
  return (
    <div className={className}>
      <Eyebrow as="div" className="mb-3">
        {label}
      </Eyebrow>
      <div className="flex items-baseline gap-2">
        <Display as="div" size={size} tone={tone}>
          {value}
        </Display>
        {unit && (
          <span className="font-eyebrow text-muted text-sm uppercase tracking-wide">{unit}</span>
        )}
      </div>
    </div>
  );
}
