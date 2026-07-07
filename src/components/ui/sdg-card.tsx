import { Eyebrow } from "./eyebrow";
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
      <div className="flex flex-1 flex-col gap-2 p-6">
        <Eyebrow as="span" className="text-[10px] tracking-editorial">
          Goal {typeof goal === "number" ? goal : goal.replace(/^0+/, "") || goal}
        </Eyebrow>
        <span className="font-display text-[3.25rem] font-extrabold leading-none tracking-tight text-ink tabular-nums">
          {typeof goal === "number" ? goal.toString().padStart(2, "0") : goal}
        </span>
        <Heading size="sm" as="h3" className="font-bold leading-tight">
          {title}
        </Heading>
        {href && (
          <a
            href={href}
            className="mt-3 font-body text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-accent transition-colors hover:text-accent-strong"
          >
            {actionLabel} →
          </a>
        )}
      </div>
    </article>
  );
}
