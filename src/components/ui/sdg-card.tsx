import { Heading } from "./heading";

export interface SdgCardProps {
  /** UN goal number, e.g. "15". */
  goal: string | number;
  /** Goal title, e.g. "Life on Land". */
  title: string;
  /** Goal accent color (the SDG's official colour). Defaults to the brand accent. */
  color?: string;
  href?: string;
  actionLabel?: string;
}

/**
 * SdgCard — a Sustainable Development Goal tile: a colored top rule, the goal
 * number, its title, and an optional read-more link. Square, hairline-bordered.
 */
export function SdgCard({
  goal,
  title,
  color = "var(--color-accent-default)",
  href,
  actionLabel = "Read more",
}: SdgCardProps) {
  return (
    <article className="flex flex-col border border-hairline bg-panel">
      <div className="h-1.5 w-full" style={{ backgroundColor: color }} aria-hidden="true" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-display text-3xl font-medium leading-none text-ink tabular-nums">
          {typeof goal === "number" ? goal.toString().padStart(2, "0") : goal}
        </span>
        <Heading size="sm" as="h3">
          {title}
        </Heading>
        {href && (
          <a
            href={href}
            className="mt-2 font-eyebrow text-xs uppercase tracking-wide text-accent transition-colors hover:text-accent-strong"
          >
            {actionLabel} →
          </a>
        )}
      </div>
    </article>
  );
}
