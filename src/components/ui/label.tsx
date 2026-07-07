import { tv, type VariantProps } from "tailwind-variants";

/**
 * Label — Archivo uppercase UI labels (section headers, stat names, progress rows,
 * inline actions). Distinct from Eyebrow, which is Space Mono for meta/data context.
 */
export const label = tv({
  base: "font-body font-bold uppercase leading-none",
  variants: {
    kind: {
      section: "text-sm tracking-wider text-muted",
      stat: "text-xs tracking-editorial text-muted",
      progress: "text-xs tracking-label text-ink",
      action: "text-[0.6875rem] tracking-label text-accent",
    },
    tone: {
      muted: "text-muted",
      ink: "text-ink",
      accent: "text-accent",
    },
  },
  compoundVariants: [
    { kind: "stat", tone: "accent", class: "text-accent" },
    { kind: "stat", tone: "ink", class: "text-ink" },
    { kind: "progress", tone: "muted", class: "text-muted" },
    { kind: "progress", tone: "accent", class: "text-accent" },
    { kind: "action", tone: "ink", class: "text-ink" },
    { kind: "action", tone: "muted", class: "text-muted" },
  ],
  defaultVariants: { kind: "stat", tone: "muted" },
});

export interface LabelProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof label> {
  as?: "span" | "p" | "div";
}

export function Label({ as: Tag = "span", kind, tone, className, ...props }: LabelProps) {
  return <Tag className={label({ kind, tone, className })} {...props} />;
}
