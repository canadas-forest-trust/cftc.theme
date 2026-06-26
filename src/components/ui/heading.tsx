import { tv, type VariantProps } from "tailwind-variants";

/**
 * Heading — content/section headings below the display tier (e.g. the quiz
 * question "How much carbon dioxide does one tree absorb...").
 */
export const heading = tv({
  base: "font-display leading-snug",
  variants: {
    size: {
      sm: "text-lg font-semibold",
      md: "text-xl font-semibold",
      lg: "text-2xl font-medium",
    },
    tone: {
      ink: "text-ink",
      soft: "text-ink-soft",
      accent: "text-accent",
    },
  },
  defaultVariants: { size: "md", tone: "ink" },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof heading> {
  as?: "h2" | "h3" | "h4" | "div";
}

export function Heading({ as: Tag = "h2", size, tone, className, ...props }: HeadingProps) {
  return <Tag className={heading({ size, tone, className })} {...props} />;
}
