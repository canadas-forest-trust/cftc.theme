import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from "react";
import { cn } from "../../lib/cn";
import {
  WEEKDAY_LABELS,
  daysInMonth,
  isIsoDateInRange,
  monthLabel,
  parseIsoDate,
  startWeekday,
  todayIsoDate,
  toIsoDate,
} from "../../lib/iso-date";

export interface CalendarMonthProps {
  /** Visible month (1–12 calendar month via year + monthIndex). */
  year: number;
  monthIndex: number;
  onYearMonthChange: (year: number, monthIndex: number) => void;
  selected?: string;
  onSelect: (isoDate: string) => void;
  min?: string;
  max?: string;
  /** Extra footer content (e.g. time controls). */
  footer?: ReactNode;
}

function buildMonthCells(
  year: number,
  monthIndex: number,
): Array<{ iso: string; day: number } | null> {
  const offset = startWeekday(year, monthIndex);
  const totalDays = daysInMonth(year, monthIndex);
  const cells: Array<{ iso: string; day: number } | null> = Array.from(
    { length: offset },
    () => null,
  );
  for (let day = 1; day <= totalDays; day += 1) {
    cells.push({ iso: toIsoDate(year, monthIndex, day), day });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function yearMonthFromSelected(
  selected?: string,
): { year: number; monthIndex: number } | null {
  const parsed = selected ? parseIsoDate(selected) : null;
  if (!parsed) return null;
  return { year: parsed.y, monthIndex: parsed.m - 1 };
}

function currentYearMonth(): { year: number; monthIndex: number } {
  const now = new Date();
  return { year: now.getFullYear(), monthIndex: now.getMonth() };
}

/** Month grid used by DateField / DateTimeField popovers. */
export function CalendarMonth({
  year,
  monthIndex,
  onYearMonthChange,
  selected,
  onSelect,
  min,
  max,
  footer,
}: CalendarMonthProps) {
  const today = todayIsoDate();
  const cells = buildMonthCells(year, monthIndex);

  const go = (delta: number) => {
    const next = new Date(year, monthIndex + delta, 1);
    onYearMonthChange(next.getFullYear(), next.getMonth());
  };

  return (
    <div className="flex w-[17.5rem] flex-col gap-3 p-3">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Previous month"
          className="inline-flex size-8 items-center justify-center border border-field text-ink hover:border-line-strong hover:bg-inset"
          onClick={() => go(-1)}
        >
          ‹
        </button>
        <p className="font-eyebrow text-xs uppercase tracking-wide text-ink">
          {monthLabel(year, monthIndex)}
        </p>
        <button
          type="button"
          aria-label="Next month"
          className="inline-flex size-8 items-center justify-center border border-field text-ink hover:border-line-strong hover:bg-inset"
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {WEEKDAY_LABELS.map((label) => (
          <span
            key={label}
            className="py-1 font-eyebrow text-[10px] uppercase tracking-wide text-muted"
          >
            {label}
          </span>
        ))}
        {cells.map((cell, index) => {
          if (!cell) {
            return <span key={`empty-${index}`} className="size-8" />;
          }
          const disabled = !isIsoDateInRange(cell.iso, min, max);
          const isSelected = selected === cell.iso;
          const isToday = cell.iso === today;
          return (
            <button
              key={cell.iso}
              type="button"
              disabled={disabled}
              aria-label={cell.iso}
              aria-pressed={isSelected}
              onClick={() => onSelect(cell.iso)}
              className={cn(
                "size-8 font-body text-sm transition-colors",
                disabled && "cursor-not-allowed opacity-30",
                !disabled && !isSelected && "hover:bg-inset text-ink",
                isSelected && "bg-accent text-accent-fg",
                !isSelected && isToday && "border border-accent text-accent",
              )}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-hairline pt-2">
        <button
          type="button"
          className="font-eyebrow text-xs uppercase tracking-wide text-accent hover:text-accent-strong"
          onClick={() => {
            if (!isIsoDateInRange(today, min, max)) return;
            const { year: y, monthIndex: m } = currentYearMonth();
            onYearMonthChange(y, m);
            onSelect(today);
          }}
        >
          Today
        </button>
        {footer}
      </div>
    </div>
  );
}

export interface DatePopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}

/** Anchored popover with outside-click + Escape close. */
export function DatePopover({ open, onOpenChange, anchorRef, children }: DatePopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }
    function onPointer(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onOpenChange(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, onOpenChange, anchorRef]);

  if (!open) return null;

  return (
    <div
      id={panelId}
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      className="absolute left-0 top-[calc(100%+0.35rem)] z-50 border border-field bg-panel shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      {children}
    </div>
  );
}

export function useCalendarMonth(selected?: string) {
  const [visible, setVisible] = useState(
    () => yearMonthFromSelected(selected) ?? currentYearMonth(),
  );
  const [prevSelected, setPrevSelected] = useState(selected);

  if (selected !== prevSelected) {
    setPrevSelected(selected);
    const next = yearMonthFromSelected(selected);
    if (next) setVisible(next);
  }

  return {
    year: visible.year,
    monthIndex: visible.monthIndex,
    setYearMonth(year: number, monthIndex: number) {
      setVisible({ year, monthIndex });
    },
  };
}
