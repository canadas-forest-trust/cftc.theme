import { tv, type VariantProps } from "tailwind-variants";

/** Text — body copy and supporting/caption text. */
export const text = tv({
  base: "font-body",
  variants: {
    size: {
      sm: "text-sm leading-normal",
      base: "text-base leading-normal",
      lg: "text-lg leading-relaxed",
    },
    tone: {
      ink: "text-ink",
      soft: "text-ink-soft",
      muted: "text-muted",
    },
  },
  defaultVariants: { size: "base", tone: "soft" },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof text> {
  as?: "p" | "span" | "div";
}

export function Text({ as: Tag = "p", size, tone, className, ...props }: TextProps) {
  return <Tag className={text({ size, tone, className })} {...props} />;
}
