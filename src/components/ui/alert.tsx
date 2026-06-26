import { tv, type VariantProps } from "tailwind-variants";

const ICONS = { info: "ⓘ", warning: "⚠", success: "✓", danger: "✕" } as const;

/** Alert — bordered notice with an icon. Tones map to status tokens. */
export const alert = tv({
  base: "flex gap-3 border p-4",
  variants: {
    tone: {
      info: "border-hairline bg-inset",
      warning: "border-warning bg-warning-bg/40",
      success: "border-success bg-active",
      danger: "border-danger bg-panel",
    },
  },
  defaultVariants: { tone: "info" },
});

const iconTone = tv({
  base: "mt-0.5 shrink-0 text-base leading-none",
  variants: {
    tone: {
      info: "text-muted",
      warning: "text-warning",
      success: "text-success",
      danger: "text-danger",
    },
  },
  defaultVariants: { tone: "info" },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alert> {
  title?: string;
}

export function Alert({ tone = "info", title, className, children, ...props }: AlertProps) {
  return (
    <div role="note" className={alert({ tone, className })} {...props}>
      <span aria-hidden="true" className={iconTone({ tone })}>
        {ICONS[tone ?? "info"]}
      </span>
      <div className="flex flex-col gap-1">
        {title && <span className="font-body font-semibold text-ink">{title}</span>}
        {children && <div className="font-body text-sm text-ink-soft">{children}</div>}
      </div>
    </div>
  );
}
