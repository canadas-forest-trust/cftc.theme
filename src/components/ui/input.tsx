import { tv, type VariantProps } from "tailwind-variants";
import { Eyebrow } from "./eyebrow";

/**
 * Input — `underline` (sign-in style) or `box` (customizer forms). Supports an
 * error state and an optional monospace eyebrow label.
 */
export const input = tv({
  base: "w-full bg-transparent font-body text-ink placeholder:text-muted outline-none transition-colors",
  variants: {
    variant: {
      underline: "border-b-2 border-line-strong focus:border-accent",
      box: "border border-field bg-panel px-3 focus:border-accent",
    },
    size: {
      md: "py-2 text-base",
      lg: "py-3 text-lg",
    },
    invalid: { true: "", false: "" },
  },
  compoundVariants: [
    { variant: "underline", invalid: true, class: "border-danger focus:border-danger" },
    { variant: "box", invalid: true, class: "border-danger focus:border-danger" },
  ],
  defaultVariants: { variant: "underline", size: "md", invalid: false },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof input> {
  /** Optional monospace eyebrow label rendered above the field. */
  label?: string;
  /** Error message; presence sets the invalid state and renders below. */
  error?: string;
}

export function Input({ variant, size, invalid, label, error, className, id, ...props }: InputProps) {
  const isInvalid = invalid || Boolean(error);
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Eyebrow as="label" {...(id ? { htmlFor: id } : {})}>
          {label}
        </Eyebrow>
      )}
      <input
        id={id}
        aria-invalid={isInvalid || undefined}
        className={input({ variant, size, invalid: isInvalid, className })}
        {...props}
      />
      {error && <span className="font-eyebrow text-xs uppercase tracking-wide text-danger">{error}</span>}
    </div>
  );
}
