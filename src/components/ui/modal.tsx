import { useEffect } from "react";
import { Eyebrow } from "./eyebrow";
import { Display } from "./display";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Monospace eyebrow above the title, e.g. "ABOUT THIS FEATURE". */
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  /** Footer actions (buttons), right-aligned. */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Modal — centered dialog over a scrim. Closes on Escape and backdrop click.
 * Square panel, hairline border, shadow-lg. Title wired via aria-labelledby.
 */
export function Modal({ open, onClose, eyebrow, title, children, footer, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const titleId = `modal-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-dark/55" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={[
          "relative z-10 flex max-h-[85vh] w-full max-w-lg flex-col border border-hairline bg-panel shadow-lg",
          className ?? "",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4 border-b border-hairline p-6">
          <div className="flex flex-col gap-2">
            {eyebrow && <Eyebrow as="div">{eyebrow}</Eyebrow>}
            <Display as="h2" size="md" id={titleId}>
              {title}
            </Display>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 shrink-0 p-2 text-xl leading-none text-muted transition-colors hover:text-ink"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-6 font-body text-base text-ink-soft">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-hairline p-6">{footer}</div>
        )}
      </div>
    </div>
  );
}
