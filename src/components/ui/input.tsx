import { tv, type VariantProps } from "tailwind-variants";
import { Eyebrow } from "./eyebrow";

/** Input — underline-style text field matching the editorial forms. */
export const input = tv({
  base: "w-full bg-transparent font-body text-ink placeholder:text-muted outline-none border-b-2 border-line-strong focus:border-accent transition-colors",
  variants: {
    size: {
      md: "py-2 text-base",
      lg: "py-3 text-lg",
    },
  },
  defaultVariants: { size: "md" },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof input> {
  /** Optional monospace eyebrow label rendered above the field. */
  label?: string;
}

export function Input({ size, label, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Eyebrow as="label" {...(id ? { htmlFor: id } : {})}>
          {label}
        </Eyebrow>
      )}
      <input id={id} className={input({ size, className })} {...props} />
    </div>
  );
}
