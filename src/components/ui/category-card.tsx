import { cn } from "../../lib/cn";

export interface CategoryCardProps {
  name: string;
  count?: number;
  /** Leading square colour (e.g. a tag colour). Defaults to the brand accent. */
  color?: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

/** CategoryCard — colored square + category name + count; a selectable filter chip. */
export function CategoryCard({ name, count, color = "var(--color-accent-default)", href, onClick, active }: CategoryCardProps) {
  const cls = cn(
    "flex w-full items-center gap-3 border px-4 py-3 text-left transition-colors",
    active ? "border-accent bg-active" : "border-hairline bg-panel hover:border-line-strong",
  );
  const inner = (
    <>
      <span className="size-3 shrink-0" style={{ backgroundColor: color }} aria-hidden="true" />
      <span className="flex-1 font-body text-base text-ink">{name}</span>
      {count != null && (
        <span className="font-eyebrow text-xs tabular-nums text-muted">{count}</span>
      )}
    </>
  );
  return href ? (
    <a href={href} className={cls} aria-current={active ? "true" : undefined}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls} aria-pressed={active}>
      {inner}
    </button>
  );
}
