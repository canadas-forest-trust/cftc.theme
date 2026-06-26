import { useState } from "react";

export interface AccordionItemData {
  /** Two-digit step number shown as a mono prefix, e.g. "01". */
  number?: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

/**
 * Accordion — numbered, expandable sections matching the customizer's left rail
 * ("01 PAGE HEADING", "02 IMPACT DATA"...). Each item is independently toggled.
 */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={["flex flex-col", className ?? ""].join(" ")}>
      {items.map((item, i) => (
        <AccordionItem key={i} {...item} />
      ))}
    </div>
  );
}

function AccordionItem({ number, title, content, defaultOpen }: AccordionItemData) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 py-4 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {number && <span className="font-eyebrow text-xs text-accent">{number}</span>}
        <span className="font-eyebrow text-xs uppercase tracking-wide text-ink">{title}</span>
        <span aria-hidden="true" className="ml-auto text-muted">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <div className="pb-4 font-body text-base text-ink-soft">{content}</div>}
    </div>
  );
}
