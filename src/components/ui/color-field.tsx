import { useId, useState } from "react";
import { cn } from "../../lib/cn";
import { Eyebrow } from "./eyebrow";

const FULL_HEX = /^#[0-9A-Fa-f]{6}$/;

function normalizeHex(hex: string): string {
  return hex.trim().toUpperCase();
}

export interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
  /** Optional quick-pick swatches. */
  presets?: readonly string[];
  disabled?: boolean;
  /** Used by the native picker when `value` is not a full hex. */
  fallbackColor?: string;
  error?: string;
  className?: string;
  id?: string;
}

/**
 * ColorField — preset swatches, native colour picker, and hex text input.
 * Presentation only; consumers own persistence.
 */
export function ColorField({
  label,
  value,
  onChange,
  presets = [],
  disabled,
  fallbackColor = "#1B6A3E",
  error,
  className,
  id,
}: ColorFieldProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const pickerId = `${inputId}-picker`;
  const normalizedValue = normalizeHex(value);
  const [text, setText] = useState(normalizedValue);
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setText(normalizeHex(value));
  }

  const pickerValue = FULL_HEX.test(normalizedValue) ? normalizedValue : fallbackColor;

  const handleText = (raw: string) => {
    const hex = `#${raw.replace(/[^0-9a-fA-F]/g, "").slice(0, 6).toUpperCase()}`;
    setText(hex);
    if (FULL_HEX.test(hex)) onChange(hex);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Eyebrow as="label" htmlFor={inputId}>
        {label}
      </Eyebrow>
      <div className="flex flex-wrap items-center gap-2">
        {presets.map((preset) => {
          const normalizedPreset = normalizeHex(preset);
          const selected = normalizedPreset === normalizedValue;
          return (
            <button
              key={preset}
              type="button"
              disabled={disabled}
              aria-label={`Use colour ${normalizedPreset}`}
              aria-pressed={selected}
              onClick={() => onChange(normalizedPreset)}
              className={cn(
                "size-[30px] cursor-pointer border-2 disabled:cursor-not-allowed disabled:opacity-50",
                selected ? "border-accent" : "border-hairline",
              )}
              style={{ backgroundColor: preset }}
            />
          );
        })}
        <input
          id={pickerId}
          type="color"
          value={pickerValue}
          disabled={disabled}
          onChange={(e) => onChange(normalizeHex(e.target.value))}
          className="h-10 w-14 cursor-pointer border border-field bg-panel p-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Pick ${label.toLowerCase()}`}
        />
        <input
          id={inputId}
          value={text}
          disabled={disabled}
          onChange={(e) => handleText(e.target.value)}
          maxLength={7}
          className="w-24 max-w-[250px] border border-field bg-panel px-2 py-1.5 font-eyebrow text-sm uppercase text-ink outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
          spellCheck={false}
        />
      </div>
      {error && (
        <span className="font-eyebrow text-xs uppercase tracking-wide text-danger">{error}</span>
      )}
    </div>
  );
}
