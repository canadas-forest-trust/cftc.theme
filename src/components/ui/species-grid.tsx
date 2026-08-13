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
  /**
   * @deprecated Waffle matrix removed; retained for call-site compatibility.
   */
  cells?: number;
  className?: string;
}

/**
 * SpeciesGrid — share bar + selectable species rows with per-species tracks.
 * Selecting a species dims other bar segments and reveals that row’s description.
 */
export function SpeciesGrid({ species, className }: SpeciesGridProps) {
  const [selected, setSelected] = useState<number>(species.length > 0 ? 0 : -1);
  const dimming = selected >= 0;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div
        className="flex h-3 w-full gap-px overflow-hidden bg-inset"
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
              "h-full border-0 p-0 transition-[opacity,filter] duration-200",
              dimming && selected !== i && "opacity-35",
            )}
            style={{
              width: `${Math.max(0, Math.min(100, s.percent))}%`,
              backgroundColor: s.color,
            }}
          />
        ))}
      </div>

      <ul className="m-0 flex list-none flex-col gap-1 p-0" aria-label="Species">
        {species.map((s, i) => {
          const pressed = selected === i;
          const pct = Math.round(s.percent);
          const description =
            s.description?.trim() || "No description available for this species yet.";

          return (
            <li key={s.name} className="m-0 p-0">
              <button
                type="button"
                aria-label={`${s.name}, ${pct}%`}
                aria-pressed={pressed}
                onClick={() => setSelected(i)}
                className={cn(
                  "w-full border-l-2 px-3 py-3 text-left transition-colors duration-200",
                  pressed
                    ? "border-ink bg-inset"
                    : "border-transparent hover:bg-inset",
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="size-2.5 shrink-0"
                      style={{ backgroundColor: s.color }}
                      aria-hidden="true"
                    />
                    <span
                      className="truncate font-body text-sm font-bold tracking-tight text-ink"
                      aria-hidden="true"
                    >
                      {s.name}
                    </span>
                  </span>
                  <span
                    className="shrink-0 font-eyebrow text-xs uppercase tracking-wide text-muted tabular-nums"
                    aria-hidden="true"
                  >
                    {pct}%
                  </span>
                </div>

                <div
                  className="mt-2.5 h-1 w-full bg-panel"
                  role="presentation"
                  aria-hidden="true"
                >
                  <div
                    className="h-full transition-[width,opacity] duration-300"
                    style={{
                      width: `${Math.max(0, Math.min(100, s.percent))}%`,
                      backgroundColor: s.color,
                      opacity: pressed ? 1 : 0.55,
                    }}
                  />
                </div>

                {pressed && (
                  <Text size="sm" tone="muted" className="mt-2.5 leading-relaxed">
                    {description}
                  </Text>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
