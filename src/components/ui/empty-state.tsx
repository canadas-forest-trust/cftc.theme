import { cn } from "../../lib/cn";
import { Text } from "./text";

export interface EmptyStateProps {
  /** Primary empty-state headline. */
  title: string;
  /** Optional supporting copy. */
  body?: React.ReactNode;
  /** Optional CTA (button, link). */
  action?: React.ReactNode;
  className?: string;
}

/**
 * EmptyState — centered empty / no-results chrome for lists and panels.
 * Token-only; callers wrap in Panel when a framed shell is needed.
 */
export function EmptyState({ title, body, action, className }: EmptyStateProps) {
  return (
    <div className={cn("px-6 py-14 text-center", className)}>
      <Text as="div" className="text-[17px] font-medium text-ink">
        {title}
      </Text>
      {body != null && body !== "" ? (
        <Text as="div" size="sm" tone="muted" className="mt-2">
          {body}
        </Text>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
