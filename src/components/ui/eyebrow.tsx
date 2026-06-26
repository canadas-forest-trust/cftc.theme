import { tv, type VariantProps } from "tailwind-variants";

/**
 * Eyebrow — the monospace, uppercase, letter-spaced label used throughout the
 * editorial layout (e.g. "STEP 01 / IDENTIFY", "IMPACT STATEMENT · FY2026").
 */
export const eyebrow = tv({
  base: "font-eyebrow uppercase tracking-wide text-xs leading-none",
  variants: {
    tone: {
      muted: "text-muted",
      ink: "text-ink",
      accent: "text-accent",
    },
  },
  defaultVariants: { tone: "muted" },
});

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof eyebrow> {
  as?: "span" | "p" | "div" | "label";
  /** When `as="label"`, associates the label with a field. */
  htmlFor?: string;
}

export function Eyebrow({ as: Tag = "span", tone, className, ...props }: EyebrowProps) {
  return <Tag className={eyebrow({ tone, className })} {...props} />;
}
