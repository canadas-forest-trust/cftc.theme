import { useEffect, useId, useState } from "react";
import { Eyebrow } from "./eyebrow";
import { cn } from "../../lib/cn";

const SIZE_CLASS = {
  /** ~32rem — compact confirm / share dialogs */
  md: "max-w-lg",
  /** ~36rem — standard admin forms (default) */
  lg: "max-w-xl",
  /** ~42rem — denser multi-section forms */
  xl: "max-w-2xl",
} as const;

/** Enter/exit duration — keep in sync with CSS animations in theme.css */
export const MODAL_MOTION_MS = 180;

export type ModalSize = keyof typeof SIZE_CLASS;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Monospace eyebrow above the title, e.g. "ABOUT THIS FEATURE". */
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  /** Footer actions (buttons), right-aligned. */
  footer?: React.ReactNode;
  /** Panel width. Defaults to `lg`. */
  size?: ModalSize;
  className?: string;
}

/**
 * Modal — centered dialog over a scrim.
 * Tight chrome, enter/exit motion, Escape + backdrop close, body scroll lock.
 */
export function Modal({
  open,
  onClose,
  eyebrow,
  title,
  children,
  footer,
  size = "lg",
  className,
}: ModalProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const reduce =
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setVisible(true);
        return;
      }
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(id);
    }

    setVisible(false);
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setMounted(false);
      return;
    }
    const t = window.setTimeout(() => setMounted(false), MODAL_MOTION_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted, onClose]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  if (!mounted) return null;

  const state = visible ? "open" : "closed";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-4"
      data-state={state}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        aria-hidden="true"
        data-state={state}
        className="cft-modal-backdrop absolute inset-0 bg-dark/55"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-state={state}
        className={cn(
          "cft-modal-panel relative z-10 flex max-h-[min(88vh,40rem)] w-full flex-col border border-hairline bg-panel shadow-lg",
          SIZE_CLASS[size],
          className,
        )}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-hairline px-4 py-3">
          <div className="flex min-w-0 flex-col gap-1">
            {eyebrow ? <Eyebrow as="div">{eyebrow}</Eyebrow> : null}
            <h2
              id={titleId}
              className="font-display text-xl font-extrabold leading-tight tracking-tight text-ink sm:text-2xl"
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-0.5 shrink-0 p-1.5 text-lg leading-none text-muted transition-colors hover:text-ink"
          >
            ✕
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 font-body text-sm text-ink-soft sm:text-base">
          {children}
        </div>
        {footer ? (
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-hairline px-4 py-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
