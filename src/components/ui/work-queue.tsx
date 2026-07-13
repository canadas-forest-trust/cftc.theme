import { cn } from "../../lib/cn";
import { Badge } from "./badge";
import { Text } from "./text";

export interface WorkQueueProps {
  /** Queue label, e.g. "Qualified leads". */
  title: string;
  /** Item count. When 0 and hideWhenEmpty, the queue is omitted. */
  count?: number;
  /** Trailing action (usually a "View all →" link). */
  action?: React.ReactNode;
  /** Shown when there are no items and the queue is still rendered. */
  emptyMessage?: string;
  /**
   * When true (default) and count is 0, render nothing.
   * Set false to always show the header + emptyMessage.
   */
  hideWhenEmpty?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * WorkQueue — compact queue block for admin Home.
 * Count lives in the header; no mandatory Alert.
 */
export function WorkQueue({
  title,
  count,
  action,
  emptyMessage = "Nothing needing attention.",
  hideWhenEmpty = true,
  children,
  className,
}: WorkQueueProps) {
  const isEmpty = count === 0;

  if (hideWhenEmpty && isEmpty) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="font-body text-sm font-semibold text-ink">{title}</span>
          {count != null && count > 0 ? <Badge variant="soft">{count}</Badge> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {isEmpty ? (
        <Text as="p" size="sm" tone="muted">
          {emptyMessage}
        </Text>
      ) : (
        children
      )}
    </div>
  );
}
