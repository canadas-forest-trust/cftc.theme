import { cn } from "../../lib/cn";

/** Accent link styles for named entities inside a DataList cell. */
export const dataListLinkClassName =
  "inline-block max-w-full truncate text-accent hover:text-accent-strong focus-visible:outline-none focus-visible:underline";

type DataListLinkOwnProps<E extends React.ElementType = "a"> = {
  /** Router Link (e.g. next/link) or default `"a"`. */
  as?: E;
  children: React.ReactNode;
  className?: string;
};

export type DataListLinkProps<E extends React.ElementType = "a"> = DataListLinkOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof DataListLinkOwnProps<E>>;

/**
 * DataListLink — named entity in a DataList cell (account, contact, forest…).
 * Stops row click from stealing navigation. Pass `as={Link}` for Next.js.
 */
export function DataListLink<E extends React.ElementType = "a">({
  as,
  className,
  onClick,
  children,
  ...props
}: DataListLinkProps<E>) {
  const Comp = (as ?? "a") as React.ElementType;

  return (
    <Comp
      className={cn(dataListLinkClassName, className)}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}
