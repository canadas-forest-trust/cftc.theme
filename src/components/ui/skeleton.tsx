import { cn } from "../../lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/** Skeleton — pulsing placeholder block for loading states. */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-inset", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
