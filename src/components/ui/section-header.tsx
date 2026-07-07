import { Label } from "./label";
import { Display } from "./display";

export interface SectionHeaderProps {
  /** Archivo section label, e.g. "Forest locations" or "Brand & partner toolkit". */
  eyebrow: string;
  /** Optional large display title below the eyebrow (page-level headers). */
  title?: string;
  /** Trailing action, e.g. a "VIEW MAP →" link or a filter Select. */
  action?: React.ReactNode;
  /** Hairline rule below the header. */
  divider?: boolean;
  className?: string;
}

/** SectionHeader — section label (+ optional display title) with a trailing action. */
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
        <Label as="div" kind="section">
          {eyebrow}
        </Label>
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
