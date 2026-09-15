import { useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { formatIsoDateDisplay, parseIsoDate } from "../../lib/iso-date";
import { Eyebrow } from "./eyebrow";
import { CalendarMonth, DatePopover, useCalendarMonth } from "./calendar-month";
import { input } from "./input";

export interface DateFieldProps {
  label?: string;
  value: string;
  onChange: (isoDate: string) => void;
  /** ISO date lower bound (`YYYY-MM-DD`). */
  min?: string;
  /** ISO date upper bound (`YYYY-MM-DD`). */
  max?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
  /** Show a clear control when a value is set. Defaults to true. */
  clearable?: boolean;
  variant?: "box" | "underline";
  size?: "md" | "lg";
  required?: boolean;
  name?: string;
}

/**
 * DateField — popover month calendar that stores ISO dates (`YYYY-MM-DD`).
 * Drop-in replacement for native `<input type="date">` with friendlier UX.
 */
export function DateField({
  label,
  value,
  onChange,
  min,
  max,
  placeholder = "Select date",
  disabled,
  error,
  className,
  id,
  clearable = true,
  variant = "box",
  size = "md",
  required,
  name,
}: DateFieldProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { year, monthIndex, setYearMonth } = useCalendarMonth(value || undefined);
  const isInvalid = Boolean(error);
  const display = value && parseIsoDate(value) ? formatIsoDateDisplay(value) : "";

  function closeWith(next: string) {
    onChange(next);
    setOpen(false);
  }

  return (
    <div className={cn("relative flex flex-col gap-2", className)}>
      {label && (
        <Eyebrow as="label" htmlFor={inputId}>
          {label}
        </Eyebrow>
      )}
      {name ? <input type="hidden" name={name} value={value} readOnly /> : null}
      <button
        ref={triggerRef}
        id={inputId}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={isInvalid || undefined}
        aria-required={required || undefined}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          input({ variant, size, invalid: isInvalid }),
          "flex max-w-[250px] items-center justify-between gap-2 text-left",
          !display && "text-muted",
        )}
      >
        <span className="truncate">{display || placeholder}</span>
        <span aria-hidden="true" className="shrink-0 text-muted">
          ▾
        </span>
      </button>

      <DatePopover open={open} onOpenChange={setOpen} anchorRef={triggerRef}>
        <CalendarMonth
          year={year}
          monthIndex={monthIndex}
          onYearMonthChange={setYearMonth}
          selected={value || undefined}
          min={min}
          max={max}
          onSelect={closeWith}
          footer={
            clearable && value ? (
              <button
                type="button"
                className="ml-auto font-eyebrow text-xs uppercase tracking-wide text-muted hover:text-ink"
                onClick={() => closeWith("")}
              >
                Clear
              </button>
            ) : null
          }
        />
      </DatePopover>

      {error && (
        <span className="font-eyebrow text-xs uppercase tracking-wide text-danger">{error}</span>
      )}
    </div>
  );
}
