import { useId } from "react";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  /** Optional helper text under the label. */
  description?: React.ReactNode;
}

/**
 * Radio — circular, accent-filled when selected. Use a shared `name` for exclusive
 * groups (e.g. CMS quiz “Correct answer”).
 */
export function Radio({ label, description, className, id, ...props }: RadioProps) {
  const generated = useId();
  const inputId = id ?? generated;
  return (
    <div className={["flex gap-3", className ?? ""].join(" ")}>
      <input
        id={inputId}
        type="radio"
        className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-full border border-field bg-panel outline-none transition-colors checked:border-accent checked:bg-accent checked:bg-[radial-gradient(circle,var(--color-accent-fg)_0_38%,transparent_40%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
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
