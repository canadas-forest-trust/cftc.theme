import { tv, type VariantProps } from "tailwind-variants";

/**
 * Badge — monospace uppercase tag. `solid` is the filled category chip
 * ("GRAPHICS", "COPY"); `outline` is the role marker ("ADMINISTRATOR").
 * Use `bg-dark` (not `bg-ink`) so solid stays high-contrast in dark theme —
 * ink flips to light text there and would read as white-on-white.
 */
export const badge = tv({
  base: "inline-flex items-center gap-1.5 font-eyebrow uppercase tracking-wide text-xs leading-none px-2 py-1.5",
  variants: {
    variant: {
      solid: "bg-dark text-inverse",
      outline: "border border-accent text-accent",
      soft: "bg-inset text-ink-soft border border-hairline",
    },
  },
  defaultVariants: { variant: "outline" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {
  /** Show a leading status dot. */
  dot?: boolean;
}

export function Badge({ variant, dot, className, children, ...props }: BadgeProps) {
  return (
    <span className={badge({ variant, className })} {...props}>
      {dot && <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />}
      {children}
    </span>
  );
}
