import { tv, type VariantProps } from "tailwind-variants";

const ARROWS = { right: "→", down: "↓", none: "" } as const;

/**
 * Button — square-cornered, token-driven. `solid` is the green action button;
 * `link` is the monospace uppercase inline action ("RESEND CODE →", "DOWNLOAD ↓").
 */
export const button = tv({
  base: "inline-flex items-center justify-center gap-2 cursor-pointer transition-colors select-none disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  variants: {
    variant: {
      solid: "bg-accent text-accent-fg font-body font-medium hover:bg-accent-strong",
      ghost:
        "bg-transparent text-ink font-body font-medium border border-hairline hover:border-line-strong",
      link: "bg-transparent text-accent font-eyebrow uppercase tracking-wide text-xs hover:text-accent-strong p-0 h-auto",
    },
    size: {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-5 text-base",
    },
    iconOnly: { true: "px-0 aspect-square", false: "" },
  },
  compoundVariants: [
    // link variant ignores box sizing
    { variant: "link", class: "h-auto px-0" },
  ],
  defaultVariants: { variant: "solid", size: "md", iconOnly: false },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  /** Trailing directional glyph. */
  arrow?: keyof typeof ARROWS;
}

export function Button({
  variant,
  size,
  iconOnly,
  arrow = "none",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ variant, size, iconOnly, className })} {...props}>
      {children}
      {arrow !== "none" && <span aria-hidden="true">{ARROWS[arrow]}</span>}
    </button>
  );
}
