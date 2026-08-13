import { useId } from "react";
import { cn } from "../../lib/cn";
import { Eyebrow } from "./eyebrow";

export interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  /** Optional right-aligned value text, e.g. "75%". */
  valueLabel?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

/**
 * Slider — styled range input with optional eyebrow label and value readout.
 */
export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  valueLabel,
  disabled,
  className,
  id,
  "aria-label": ariaLabel,
}: SliderProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex w-full max-w-[250px] flex-col gap-2", className)}>
      {(label || valueLabel) && (
        <div className="flex items-baseline justify-between gap-3">
          {label && (
            <Eyebrow as="label" htmlFor={inputId}>
              {label}
            </Eyebrow>
          )}
          {valueLabel && (
            <span className="font-body text-sm font-medium tabular-nums text-ink">
              {valueLabel}
            </span>
          )}
        </div>
      )}
      <input
        id={inputId}
        type="range"
        role="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={label ?? ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className={cn(
          "h-1.5 w-full cursor-pointer appearance-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-40",
          "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-none",
          "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-none [&::-moz-range-track]:border-0",
          "[&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-accent",
          "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-accent",
          "focus-visible:[&::-webkit-slider-thumb]:outline focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-2 focus-visible:[&::-webkit-slider-thumb]:outline-accent",
        )}
        style={
          {
            // Fill the track up to the thumb with accent.
            background: `linear-gradient(to right, var(--color-accent-default) ${pct}%, var(--color-bg-frame) ${pct}%)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
