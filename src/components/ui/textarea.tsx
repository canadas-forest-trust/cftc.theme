import { Eyebrow } from "./eyebrow";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/** Textarea — boxed multiline field (sub-heading, descriptions in the customizer). */
export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const isInvalid = Boolean(error);
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Eyebrow as="label" {...(id ? { htmlFor: id } : {})}>
          {label}
        </Eyebrow>
      )}
      <textarea
        id={id}
        aria-invalid={isInvalid || undefined}
        className={[
          "w-full min-h-24 resize-y border bg-panel px-3 py-2.5 font-body text-base text-ink placeholder:text-muted outline-none transition-colors focus:border-accent",
          isInvalid ? "border-danger focus:border-danger" : "border-field",
          className ?? "",
        ].join(" ")}
        {...props}
      />
      {error && <span className="font-eyebrow text-xs uppercase tracking-wide text-danger">{error}</span>}
    </div>
  );
}
