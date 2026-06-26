import { tv, type VariantProps } from "tailwind-variants";

/** Avatar — square initials tile (the account marker in the TopBar). */
export const avatar = tv({
  base: "grid place-items-center font-eyebrow uppercase tracking-wide",
  variants: {
    tone: {
      accent: "bg-accent text-accent-fg",
      ink: "bg-ink text-inverse",
    },
    size: {
      sm: "size-8 text-xs",
      md: "size-9 text-xs",
      lg: "size-11 text-sm",
    },
  },
  defaultVariants: { tone: "accent", size: "md" },
});

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatar> {
  initials: string;
}

export function Avatar({ tone, size, initials, className, ...props }: AvatarProps) {
  return (
    <span className={avatar({ tone, size, className })} {...props}>
      {initials}
    </span>
  );
}
