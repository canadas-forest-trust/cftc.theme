export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

/** Pagination — square numbered page cells; active cell solid dark. */
export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const cell =
    "grid size-9 place-items-center border font-eyebrow text-xs tracking-wide transition-colors";

  return (
    <nav aria-label="Pagination" className={["flex items-center gap-2", className ?? ""].join(" ")}>
      {pages.map((p) => {
        const active = p === page;
        return (
          <button
            key={p}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onPageChange?.(p)}
            className={[
              cell,
              active
                ? "border-dark bg-dark text-inverse"
                : "border-field bg-panel text-ink hover:border-line-strong",
            ].join(" ")}
          >
            {p}
          </button>
        );
      })}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(Math.min(pageCount, page + 1))}
        className={[cell, "border-field bg-panel text-ink hover:border-line-strong disabled:opacity-40"].join(
          " ",
        )}
      >
        →
      </button>
    </nav>
  );
}
