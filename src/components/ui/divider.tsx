import { tv, type VariantProps } from "tailwind-variants";

export const divider = tv({
  base: "border-0 border-t w-full",
  variants: {
    tone: {
      hairline: "border-hairline",
      strong: "border-line-strong",
      accent: "border-accent",
    },
  },
  defaultVariants: { tone: "hairline" },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof divider> {}

/** Divider — a 1px token-colored rule. */
export function Divider({ tone, className, ...props }: DividerProps) {
  return <hr className={divider({ tone, className })} {...props} />;
}
