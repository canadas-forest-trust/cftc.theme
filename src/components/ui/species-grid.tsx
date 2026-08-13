import { useState } from "react";
import { cn } from "../../lib/cn";
import { Text } from "./text";

export interface SpeciesDatum {
  name: string;
  /** Display colour (CSS color). */
  color: string;
  /** Share of the project, 0–100. */
  percent: number;
  description?: string;
}

export interface SpeciesGridProps {
  species: SpeciesDatum[];
  /** Total cells in the waffle matrix (default 100 = 10×10). */
  cells?: number;
  className?: string;
}

/**
 * SpeciesGrid — thin share bar + compact waffle beside a dense species list.
 * Selecting a species dims other matrix cells and reveals that row’s description.
 */
export function SpeciesGrid({ species, cells = 100, className }: SpeciesGridProps) {
  const [selected, setSelected] = useState<number>(species.length > 0 ? 0 : -1);

  const flat: number[] = [];
  species.forEach((s, i) => {
    const n = Math.round((s.percent / 100) * cells);
    for (let k = 0; k < n; k++) flat.push(i);
  });
  while (flat.length < cells) flat.push(-1);
  flat.length = cells;

  const dimming = selected >= 0;

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div
        className="flex h-1.5 w-full overflow-hidden bg-inset"
        role="img"
        aria-label="Species composition"
      >
        {species.map((s, i) => (
          <button
            key={`bar-${s.name}`}
            type="button"
            onClick={() => setSelected(i)}
            aria-label={`${s.name} ${Math.round(s.percent)}%`}
            aria-pressed={selected === i}
            className={cn(
              "h-full border-0 p-0 transition-opacity",
              dimming && selected !== i && "opacity-30",
            )}
            style={{
              width: `${Math.max(0, Math.min(100, s.percent))}%`,
              backgroundColor: s.color,
            }}
          />
        ))}
      </div>

      <div className="grid items-start gap-6 sm:grid-cols-[7.5rem_1fr] sm:gap-8">
        <div className="flex flex-col gap-2">
          <div
            className="grid w-full max-w-[7.5rem] grid-cols-10 gap-px"
            role="img"
            aria-label="Species composition grid"
          >
            {flat.map((idx, i) => {
              const empty = idx === -1;
              const dim = dimming && !empty && idx !== selected;
              const active = dimming && !empty && idx === selected;
              return (
                <button
                  key={i}
                  type="button"
                  tabIndex={empty ? -1 : 0}
                  disabled={empty}
                  onClick={() => setSelected(idx)}
                  aria-label={empty ? "empty" : species[idx].name}
                  className={cn(
                    "aspect-square appearance-none border-0 p-0 transition-opacity",
                    dim && "opacity-25",
                    active && "outline outline-1 outline-ink outline-offset-0",
                  )}
                  style={{
                    backgroundColor: empty
                      ? "var(--color-bg-inset)"
                      : species[idx].color,
                  }}
                />
              );
            })}
          </div>
          <p className="m-0 font-eyebrow text-[0.625rem] uppercase tracking-label text-muted">
            1 cell ≈ 1%
          </p>
        </div>

        <ul className="m-0 flex list-none flex-col divide-y divide-hairline border-y border-hairline p-0">
          {species.map((s, i) => {
            const pressed = selected === i;
            const description =
              s.description?.trim() || "No description available for this species yet.";
            return (
              <li key={s.name} className="m-0 p-0">
                <button
                  type="button"
                  aria-label={`${s.name}, ${Math.round(s.percent)}%`}
                  aria-pressed={pressed}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "grid w-full grid-cols-[auto_1fr_auto] gap-x-3 gap-y-0 px-0 py-3 text-left transition-colors",
                    pressed ? "bg-inset" : "hover:bg-inset",
                  )}
                >
                  <span
                    className="mt-1.5 size-2.5 shrink-0"
                    style={{ backgroundColor: s.color }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-body text-sm font-bold tracking-tight text-ink"
                    aria-hidden="true"
                  >
                    {s.name}
                  </span>
                  <span
                    className="mt-0.5 font-eyebrow text-xs uppercase tracking-wide text-muted tabular-nums"
                    aria-hidden="true"
                  >
                    {Math.round(s.percent)}%
                  </span>
                  {pressed && (
                    <Text
                      size="sm"
                      tone="muted"
                      className="col-start-2 col-end-[-1] mt-1.5 leading-relaxed"
                    >
                      {description}
                    </Text>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
