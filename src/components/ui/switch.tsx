import { useId } from "react";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
  id?: string;
  className?: string;
  /** Visible label; clicking it toggles the switch. */
  label?: React.ReactNode;
  /** Optional helper text under the label. */
  description?: React.ReactNode;
}

/**
 * Switch — square-knob toggle (track strong→accent). Used for feature toggles
 * (Highlight, Contribute, Fundraiser) in the customizer.
 * Track uses bg-accent when on; keep the knob as bg-panel (no text-accent-fg)
 * so admin solid-button styles do not restyle this control.
 *
 * With `label` / `description`, renders a row where the label is clickable.
 */
export function Switch({
  checked,
  onCheckedChange,
  disabled,
  "aria-label": ariaLabel,
  id,
  className,
  label,
  description,
}: SwitchProps) {
  const generated = useId();
  const switchId = id ?? generated;

  const control = (
    <button
      type="button"
      role="switch"
      data-switch=""
      id={switchId}
      aria-checked={checked}
      aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center p-0 transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
        checked ? "bg-accent" : "bg-line-strong",
        !label && !description ? (className ?? "") : "",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "absolute top-1 size-4 bg-panel transition-[left]",
          checked ? "left-6" : "left-1",
        ].join(" ")}
      />
    </button>
  );

  if (!label && !description) {
    return control;
  }

  return (
    <div
      className={[
        "flex items-center justify-between gap-4 border-t border-hairline pt-4 first:border-t-0 first:pt-0",
        className ?? "",
      ].join(" ")}
    >
      <label
        htmlFor={switchId}
        className={[
          "flex min-w-0 flex-col gap-0.5 select-none",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
        ].join(" ")}
      >
        {label && <span className="font-eyebrow text-xs font-bold uppercase tracking-wider leading-none text-ink">{label}</span>}
        {description && (
          <span className="font-body text-sm text-muted">{description}</span>
        )}
      </label>
      {control}
    </div>
  );
}
