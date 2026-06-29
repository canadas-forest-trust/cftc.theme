import { useState } from "react";
import { cn } from "../../lib/cn";
import { Eyebrow } from "./eyebrow";
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
}

/**
 * SpeciesGrid — a waffle matrix coloured by species share, a clickable legend,
 * and a dark detail panel for the selected species. Selecting dims the rest.
 */
export function SpeciesGrid({ species, cells = 100 }: SpeciesGridProps) {
  const [selected, setSelected] = useState<number | null>(null);

  // Distribute cells across species by percentage; -1 = empty.
  const flat: number[] = [];
  species.forEach((s, i) => {
    const n = Math.round((s.percent / 100) * cells);
    for (let k = 0; k < n; k++) flat.push(i);
  });
  while (flat.length < cells) flat.push(-1);
  flat.length = cells;

  const sel = selected != null ? species[selected] : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* matrix */}
      <div className="grid grid-cols-10 gap-1" role="img" aria-label="Species composition grid">
        {flat.map((idx, i) => {
          const dim = selected != null && idx !== selected;
          return (
            <button
              key={i}
              type="button"
              tabIndex={idx === -1 ? -1 : 0}
              disabled={idx === -1}
              onClick={() => setSelected(idx)}
              aria-label={idx === -1 ? "empty" : species[idx].name}
              className={cn("aspect-square transition-opacity", dim && "opacity-25")}
              style={{ backgroundColor: idx === -1 ? "var(--color-bg-inset)" : species[idx].color }}
            />
          );
        })}
      </div>

      {/* legend + selected detail */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {species.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setSelected(selected === i ? null : i)}
              className={cn(
                "inline-flex items-center gap-2 transition-opacity",
                selected != null && selected !== i && "opacity-50",
              )}
            >
              <span className="size-3 shrink-0" style={{ backgroundColor: s.color }} aria-hidden="true" />
              <span className="font-eyebrow text-xs uppercase tracking-wide text-ink-soft">
                {s.name} · {s.percent}%
              </span>
            </button>
          ))}
        </div>

        {sel ? (
          <div className="flex flex-col gap-2 bg-dark p-6">
            <span className="font-eyebrow text-xs uppercase tracking-wide text-inverse/70">
              Selected · {sel.name}
            </span>
            <Text tone="ink" className="text-inverse">
              {sel.description ?? "No description available for this species yet."}
            </Text>
          </div>
        ) : (
          <Eyebrow as="div" tone="muted">
            Select a species to learn more
          </Eyebrow>
        )}
      </div>
    </div>
  );
}
