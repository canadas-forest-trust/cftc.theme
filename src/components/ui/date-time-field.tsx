import { useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import {
  formatIsoDateTimeDisplay,
  joinDateTimeLocal,
  parseIsoDateTimeLocal,
  splitDateTimeLocal,
} from "../../lib/iso-date";
import { Eyebrow } from "./eyebrow";
import { CalendarMonth, DatePopover, useCalendarMonth } from "./calendar-month";
import { input } from "./input";

const DEFAULT_HOUR = "09";
const TIME_SELECT_CLASS =
  "border border-field bg-panel px-1.5 py-1 font-body text-sm text-ink";
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, hour) =>
  String(hour).padStart(2, "0"),
);

export interface DateTimeFieldProps {
  label?: string;
  /** `YYYY-MM-DDTHH:mm` (datetime-local shape). */
  value: string;
  onChange: (isoDateTimeLocal: string) => void;
  min?: string;
  max?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  id?: string;
  clearable?: boolean;
  variant?: "box" | "underline";
  size?: "md" | "lg";
  required?: boolean;
  name?: string;
  /** Minute step for the time control. Defaults to 1. */
  minuteStep?: number;
}

function minuteOptionsForStep(minuteStep: number): string[] {
  return Array.from({ length: Math.floor(60 / minuteStep) }, (_, index) =>
    String(index * minuteStep).padStart(2, "0"),
  );
}

function nearestMinuteOption(minute: string | undefined, options: string[]): string {
  if (minute && options.includes(minute)) return minute;
  const target = Number(minute || 0);
  return options.reduce((best, option) =>
    Math.abs(Number(option) - target) < Math.abs(Number(best) - target) ? option : best,
  );
}

/**
 * DateTimeField — calendar + time controls replacing native `datetime-local`.
 * Value shape matches `<input type="datetime-local">` (`YYYY-MM-DDTHH:mm`).
 */
export function DateTimeField({
  label,
  value,
  onChange,
  min,
  max,
  placeholder = "Select date & time",
  disabled,
  error,
  className,
  id,
  clearable = true,
  variant = "box",
  size = "md",
  required,
  name,
  minuteStep = 1,
}: DateTimeFieldProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const parts = splitDateTimeLocal(value);
  const { year, monthIndex, setYearMonth } = useCalendarMonth(parts.date || undefined);
  const isInvalid = Boolean(error);
  const display =
    value && parseIsoDateTimeLocal(value) ? formatIsoDateTimeDisplay(value) : "";

  const minuteOptions = minuteOptionsForStep(minuteStep);
  const [hour, minute] = parts.time.split(":");
  const selectedHour = hour || DEFAULT_HOUR;
  const selectedMinute = nearestMinuteOption(minute, minuteOptions);
  const selectedTime = `${selectedHour}:${selectedMinute}`;
  const activeDate = parts.date || value.slice(0, 10);
  const timeControlsEnabled = Boolean(parts.date || value);

  function apply(date: string, time: string) {
    if (!date) {
      onChange("");
      return;
    }
    onChange(joinDateTimeLocal(date, time));
  }

  function close() {
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
          "flex max-w-[280px] items-center justify-between gap-2 text-left",
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
          selected={parts.date || undefined}
          min={min?.slice(0, 10)}
          max={max?.slice(0, 10)}
          onSelect={(iso) => apply(iso, selectedTime)}
          footer={
            <>
              <div className="flex items-center gap-1">
                <label className="sr-only" htmlFor={`${inputId}-hour`}>
                  Hour
                </label>
                <select
                  id={`${inputId}-hour`}
                  className={TIME_SELECT_CLASS}
                  value={selectedHour}
                  onChange={(event) =>
                    apply(activeDate, `${event.target.value}:${selectedMinute}`)
                  }
                  disabled={!timeControlsEnabled}
                >
                  {HOUR_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span className="text-muted">:</span>
                <label className="sr-only" htmlFor={`${inputId}-minute`}>
                  Minute
                </label>
                <select
                  id={`${inputId}-minute`}
                  className={TIME_SELECT_CLASS}
                  value={selectedMinute}
                  onChange={(event) =>
                    apply(activeDate, `${selectedHour}:${event.target.value}`)
                  }
                  disabled={!timeControlsEnabled}
                >
                  {minuteOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {clearable && value ? (
                <button
                  type="button"
                  className="ml-auto font-eyebrow text-xs uppercase tracking-wide text-muted hover:text-ink"
                  onClick={() => {
                    onChange("");
                    close();
                  }}
                >
                  Clear
                </button>
              ) : (
                <button
                  type="button"
                  className="ml-auto font-eyebrow text-xs uppercase tracking-wide text-accent hover:text-accent-strong"
                  onClick={close}
                  disabled={!value}
                >
                  Done
                </button>
              )}
            </>
          }
        />
      </DatePopover>

      {error && (
        <span className="font-eyebrow text-xs uppercase tracking-wide text-danger">{error}</span>
      )}
    </div>
  );
}
