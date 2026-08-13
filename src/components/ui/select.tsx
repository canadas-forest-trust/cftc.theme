import { Eyebrow } from "./eyebrow";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  options: SelectOption[];
  /** Compact mono style used for inline filters like "ALL MARKETING ASSETS". */
  variant?: "box" | "filter";
}

/** Select — native dropdown styled to the system, with a chevron affordance. */
export function Select({ label, options, variant = "box", className, id, ...props }: SelectProps) {
  const isFilter = variant === "filter";
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Eyebrow as="label" {...(id ? { htmlFor: id } : {})}>
          {label}
        </Eyebrow>
      )}
      <div className="relative w-full max-w-[250px]">
        <select
          id={id}
          className={[
            "w-full appearance-none border bg-panel pr-9 text-ink outline-none transition-colors focus:border-accent",
            isFilter
              ? "border-field px-3 py-2 font-eyebrow text-xs uppercase tracking-wide"
              : "border-field px-3 py-2.5 font-body text-base",
            className ?? "",
          ].join(" ")}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        >
          ▾
        </span>
      </div>
    </div>
  );
}
