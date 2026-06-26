import { useId } from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  /** Optional helper text under the label. */
  description?: React.ReactNode;
}

/** Checkbox — square, accent-filled when checked (e.g. "Include test data"). */
export function Checkbox({ label, description, className, id, ...props }: CheckboxProps) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <div className={["flex gap-3", className ?? ""].join(" ")}>
      <input
        id={inputId}
        type="checkbox"
        className="mt-0.5 size-5 shrink-0 appearance-none border border-field bg-panel outline-none transition-colors checked:border-accent checked:bg-accent checked:bg-[length:14px] checked:bg-center checked:bg-no-repeat focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent checked:[background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22 stroke=%22%23fff%22 stroke-width=%222.5%22><path d=%22M3 8.5l3.5 3.5L13 4.5%22/></svg>')]"
        {...props}
      />
      {(label || description) && (
        <label htmlFor={inputId} className="cursor-pointer select-none">
          {label && <span className="font-body text-base text-ink">{label}</span>}
          {description && (
            <span className="mt-0.5 block font-body text-sm text-muted">{description}</span>
          )}
        </label>
      )}
    </div>
  );
}
