import { Eyebrow } from "./eyebrow";
import { Display } from "./display";

export interface SectionHeaderProps {
  /** Monospace eyebrow, e.g. "FOREST LOCATIONS" or "BRAND & PARTNER TOOLKIT". */
  eyebrow: string;
  /** Optional large display title below the eyebrow (page-level headers). */
  title?: string;
  /** Trailing action, e.g. a "VIEW MAP →" link or a filter Select. */
  action?: React.ReactNode;
  /** Hairline rule below the header. */
  divider?: boolean;
  className?: string;
}

/** SectionHeader — eyebrow (+ optional display title) with a trailing action. */
export function SectionHeader({ eyebrow, title, action, divider, className }: SectionHeaderProps) {
  return (
    <div
      className={[
        "flex flex-col items-stretch gap-y-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-x-6",
        divider ? "border-b border-hairline pb-4" : "",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex min-w-0 flex-col gap-3">
        <Eyebrow as="div">{eyebrow}</Eyebrow>
        {title && (
          <Display as="h2" size="md">
            {title}
          </Display>
        )}
      </div>
      {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
    </div>
  );
}
