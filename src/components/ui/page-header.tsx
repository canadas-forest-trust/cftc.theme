import { cn } from "../../lib/cn";
import { Eyebrow } from "./eyebrow";
import { Heading } from "./heading";
import { Text } from "./text";

export interface PageHeaderProps {
  /** Page title — ops-scale Heading, not portal Display. */
  title: string;
  /** Optional meta above the title, e.g. "Staff · Platform". */
  eyebrow?: string;
  /** Short supporting line under the title (string or rich nodes with links). */
  description?: React.ReactNode;
  /** Trailing actions (buttons, links). */
  action?: React.ReactNode;
  className?: string;
}

/** PageHeader — compact admin page chrome (title + optional meta/actions). */
export function PageHeader({
  title,
  eyebrow,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3 border-b border-hairline pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        {eyebrow ? (
          <Eyebrow as="div" tone="muted">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <Heading as="h1" size="lg">
          {title}
        </Heading>
        {description != null && description !== "" ? (
          typeof description === "string" ? (
            <Text as="p" size="sm" tone="muted">
              {description}
            </Text>
          ) : (
            <div className="text-sm text-muted">{description}</div>
          )
        ) : null}
      </div>
      {action ? (
        <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto">
          {action}
        </div>
      ) : null}
    </header>
  );
}
