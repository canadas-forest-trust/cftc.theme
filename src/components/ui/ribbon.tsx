import { tv, type VariantProps } from "tailwind-variants";

/**
 * Ribbon — a corner banner (e.g. the "GOLD" tier tag) to drop inside a
 * `relative` container. Notched bookmark shape via clip-path.
 */
export const ribbon = tv({
  base: "absolute left-4 top-0 z-10 px-2.5 pb-3 pt-1.5 font-eyebrow text-xs uppercase tracking-wide",
  variants: {
    tone: {
      gold: "bg-gold text-inverse",
      accent: "bg-accent text-accent-fg",
      ink: "bg-ink text-inverse",
    },
  },
  defaultVariants: { tone: "gold" },
});

export interface RibbonProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof ribbon> {}

export function Ribbon({ tone, className, children, ...props }: RibbonProps) {
  return (
    <span
      className={ribbon({ tone, className })}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
      {...props}
    >
      {children}
    </span>
  );
}
