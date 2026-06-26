import { tv, type VariantProps } from "tailwind-variants";

/**
 * Panel — square, hairline-bordered container. `accent` is the left-rule callout
 * (e.g. the "Test data is currently disabled" notice).
 */
export const panel = tv({
  base: "bg-panel",
  variants: {
    variant: {
      default: "border border-hairline",
      inset: "bg-inset border border-hairline",
      accent: "bg-inset border-l-[3px] border-accent",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: { variant: "default", padding: "md" },
});

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panel> {
  as?: "div" | "section" | "article";
}

export function Panel({ as: Tag = "div", variant, padding, className, ...props }: PanelProps) {
  return <Tag className={panel({ variant, padding, className })} {...props} />;
}
