/** Local calendar helpers. Values are ISO date (`YYYY-MM-DD`) or datetime-local (`YYYY-MM-DDTHH:mm`). */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_DATETIME_LOCAL = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

export type IsoDate = string;
export type IsoDateTimeLocal = string;

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function toIsoDate(year: number, monthIndex: number, day: number): IsoDate {
  return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
}

function isValidCalendarDay(y: number, m: number, d: number): boolean {
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

export function parseIsoDate(value: string): { y: number; m: number; d: number } | null {
  const match = ISO_DATE.exec(value.trim());
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (!isValidCalendarDay(y, m, d)) return null;
  return { y, m, d };
}

export function parseIsoDateTimeLocal(
  value: string,
): { y: number; m: number; d: number; hour: number; minute: number } | null {
  const match = ISO_DATETIME_LOCAL.exec(value.trim());
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  if (!isValidCalendarDay(y, m, d) || hour > 23 || minute > 59) return null;
  const date = new Date(y, m - 1, d, hour, minute);
  if (date.getHours() !== hour || date.getMinutes() !== minute) return null;
  return { y, m, d, hour, minute };
}

export function todayIsoDate(): IsoDate {
  const now = new Date();
  return toIsoDate(now.getFullYear(), now.getMonth(), now.getDate());
}

export function formatIsoDateDisplay(value: string): string {
  const parsed = parseIsoDate(value);
  if (!parsed) return value;
  return new Intl.DateTimeFormat("en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(parsed.y, parsed.m - 1, parsed.d));
}

export function formatIsoDateTimeDisplay(value: string): string {
  const parsed = parseIsoDateTimeLocal(value);
  if (!parsed) return value;
  const datePart = formatIsoDateDisplay(toIsoDate(parsed.y, parsed.m - 1, parsed.d));
  return `${datePart}, ${pad2(parsed.hour)}:${pad2(parsed.minute)}`;
}

export function compareIsoDate(a: string, b: string): number {
  return a.localeCompare(b);
}

export function isIsoDateInRange(value: string, min?: string, max?: string): boolean {
  if (min && compareIsoDate(value, min) < 0) return false;
  if (max && compareIsoDate(value, max) > 0) return false;
  return true;
}

export function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/** Sunday = 0 … Saturday = 6 */
export function startWeekday(year: number, monthIndex: number): number {
  return new Date(year, monthIndex, 1).getDay();
}

export function monthLabel(year: number, monthIndex: number): string {
  return new Intl.DateTimeFormat("en-CA", { month: "long", year: "numeric" }).format(
    new Date(year, monthIndex, 1),
  );
}

export const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

export function splitDateTimeLocal(value: string): { date: IsoDate; time: string } {
  const parsed = parseIsoDateTimeLocal(value);
  if (parsed) {
    return {
      date: toIsoDate(parsed.y, parsed.m - 1, parsed.d),
      time: `${pad2(parsed.hour)}:${pad2(parsed.minute)}`,
    };
  }
  const dateOnly = value.slice(0, 10);
  if (parseIsoDate(dateOnly)) {
    return { date: dateOnly, time: "09:00" };
  }
  return { date: "", time: "09:00" };
}

export function joinDateTimeLocal(date: IsoDate, time: string): IsoDateTimeLocal {
  const safeTime = /^\d{2}:\d{2}$/.test(time) ? time : "09:00";
  return `${date}T${safeTime}`;
}
