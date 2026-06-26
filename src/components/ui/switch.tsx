export interface SwitchProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
  id?: string;
  className?: string;
}

/**
 * Switch — square-knob toggle (track strong→accent). Used for feature toggles
 * (Highlight, Contribute, Fundraiser) in the customizer.
 */
export function Switch({
  checked,
  onCheckedChange,
  disabled,
  "aria-label": ariaLabel,
  id,
  className,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 items-center transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40",
        checked ? "bg-accent" : "bg-line-strong",
        className ?? "",
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
}
