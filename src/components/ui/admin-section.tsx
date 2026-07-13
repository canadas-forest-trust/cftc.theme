import { cn } from "../../lib/cn";
import { Badge } from "./badge";
import { Heading } from "./heading";
import { Text } from "./text";

export interface AdminSectionProps {
  /** Section title shown in the header bar. */
  title: string;
  /** Optional count badge next to the title. */
  count?: number;
  /** Optional supporting line under the title. */
  description?: string;
  /** Trailing action (e.g. "View all →" link). */
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * AdminSection — bounded ops section with a clear start/end.
 * Use for Home bands (Needs attention, At a glance, Recent) and similar.
 */
export function AdminSection({
  title,
  count,
  description,
  action,
  children,
  className,
}: AdminSectionProps) {
  return (
    <section className={cn("overflow-hidden rounded-lg border border-hairline bg-panel", className)}>
      <div className="flex flex-col gap-2 border-b border-hairline px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <Heading as="h2" size="sm">
              {title}
            </Heading>
            {count != null ? <Badge variant="soft">{count}</Badge> : null}
          </div>
          {description ? (
            <Text as="p" size="sm" tone="muted">
              {description}
            </Text>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children != null ? <div className="flex flex-col gap-6 px-5 py-4">{children}</div> : null}
    </section>
  );
}
