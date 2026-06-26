import { useState } from "react";
import { Eyebrow } from "./eyebrow";

export interface CopyFieldProps {
  value: string;
  label?: string;
  /** Render as a multiline code block (e.g. the embed snippet) instead of a row. */
  multiline?: boolean;
  className?: string;
}

/**
 * CopyField — read-only value with a copy action. Row form for share links,
 * multiline form for embed code. Button flips to a checkmark on copy.
 */
export function CopyField({ value, label, multiline, className }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  const btn = (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 bg-accent px-3 py-2 font-eyebrow text-xs uppercase tracking-wide text-accent-fg transition-colors hover:bg-accent-strong"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );

  return (
    <div className={["flex flex-col gap-2", className ?? ""].join(" ")}>
      {label && <Eyebrow as="div">{label}</Eyebrow>}
      {multiline ? (
        <div className="flex flex-col gap-2">
          <pre className="overflow-x-auto border border-field bg-inset px-3 py-2.5 font-eyebrow text-sm text-ink-soft">
            <code>{value}</code>
          </pre>
          <div className="self-start">{btn}</div>
        </div>
      ) : (
        <div className="flex items-stretch border border-field bg-panel">
          <input
            readOnly
            value={value}
            className="min-w-0 flex-1 bg-transparent px-3 py-2 font-eyebrow text-sm text-ink-soft outline-none"
          />
          {btn}
        </div>
      )}
    </div>
  );
}
