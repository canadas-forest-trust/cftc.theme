import { tv, type VariantProps } from "tailwind-variants";

/**
 * Display — oversized grotesque headings and numerals (page titles like
 * "Sign in" / "My Organization", and hero figures like "6,000" / "809.73").
 */
export const display = tv({
  base: "font-display font-medium tracking-tight",
  variants: {
    size: {
      md: "text-4xl leading-none",
      lg: "text-5xl leading-none",
      xl: "text-6xl leading-none",
    },
    tone: {
      ink: "text-ink",
      accent: "text-accent",
      bright: "text-accent-bright",
      inverse: "text-inverse",
    },
  },
  defaultVariants: { size: "lg", tone: "ink" },
});

type DisplayTag = "h1" | "h2" | "h3" | "div" | "span" | "p";

export interface DisplayProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof display> {
  as?: DisplayTag;
}

export function Display({ as: Tag = "h1", size, tone, className, ...props }: DisplayProps) {
  return <Tag className={display({ size, tone, className })} {...props} />;
}
