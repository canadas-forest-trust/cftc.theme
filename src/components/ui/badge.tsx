import { tv, type VariantProps } from "tailwind-variants";

/**
 * Badge — monospace uppercase tag. `solid` is the filled category chip
 * ("GRAPHICS", "COPY"); `outline` is the role marker ("ADMINISTRATOR").
 * Use `bg-dark` (not `bg-ink`) so solid stays high-contrast in dark theme —
 * ink flips to light text there and would read as white-on-white.
 *
 * Soft + tone is the admin status chip (Published / Draft / Overdue).
 */
export const badge = tv({
  base: "inline-flex items-center gap-1.5 font-eyebrow uppercase tracking-wide text-xs leading-none px-2 py-1.5",
  variants: {
    variant: {
      solid: "bg-dark text-inverse",
      outline: "border border-accent text-accent",
      soft: "bg-inset text-ink-soft border border-hairline",
    },
    tone: {
      neutral: "",
      success: "",
      warning: "",
      danger: "",
      info: "",
    },
  },
  compoundVariants: [
    { variant: "soft", tone: "success", class: "border-transparent bg-success-bg text-success-fg" },
    { variant: "soft", tone: "warning", class: "border-transparent bg-warning-bg text-warning-fg" },
    { variant: "soft", tone: "danger", class: "border-transparent bg-danger-bg text-danger-fg" },
    { variant: "soft", tone: "info", class: "border-transparent bg-info-bg text-info-fg" },
    { variant: "outline", tone: "success", class: "border-success text-success" },
    { variant: "outline", tone: "warning", class: "border-warning text-warning" },
    { variant: "outline", tone: "danger", class: "border-danger text-danger" },
    { variant: "outline", tone: "info", class: "border-info text-info" },
    { variant: "solid", tone: "success", class: "bg-success text-inverse" },
    { variant: "solid", tone: "warning", class: "bg-warning text-inverse" },
    { variant: "solid", tone: "danger", class: "bg-danger text-inverse" },
    { variant: "solid", tone: "info", class: "bg-info text-inverse" },
  ],
  defaultVariants: { variant: "outline", tone: "neutral" },
});

const toneDotClass: Record<NonNullable<VariantProps<typeof badge>["tone"]>, string> = {
  neutral: "bg-muted",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {
  /** Show a leading status dot. */
  dot?: boolean;
}

export function Badge({ variant, tone, dot, className, children, ...props }: BadgeProps) {
  return (
    <span className={badge({ variant, tone, className })} {...props}>
      {dot && (
        <span
          className={`size-1.5 rounded-full ${toneDotClass[tone ?? "neutral"]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
