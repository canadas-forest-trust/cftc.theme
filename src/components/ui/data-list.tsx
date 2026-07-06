import { Eyebrow } from "./eyebrow";

export interface DataColumn {
  key: string;
  label: string;
  align?: "left" | "right";
}

export interface DataListProps {
  columns: DataColumn[];
  rows: Array<Record<string, React.ReactNode>>;
  /** Renders a trailing arrow and makes rows interactive. */
  onRowClick?: (index: number) => void;
  className?: string;
}

/**
 * DataList — hairline-separated rows with mono column headers (the
 * "Forest locations: Location · Trees · CO₂ →" table). Right-align numerics.
 */
export function DataList({ columns, rows, onRowClick, className }: DataListProps) {
  const gridCols = `repeat(${columns.length}, minmax(0, 1fr))${onRowClick ? " 2rem" : ""}`;

  return (
    <div className={className}>
      <div
        className="grid items-center gap-4 border-b border-hairline px-3 pb-2"
        style={{ gridTemplateColumns: gridCols }}
      >
        {columns.map((c) => (
          <Eyebrow key={c.key} as="div" className={c.align === "right" ? "text-right" : ""}>
            {c.label}
          </Eyebrow>
        ))}
        {onRowClick && <span />}
      </div>

      {rows.map((row, i) => {
        const Tag = onRowClick ? "button" : "div";
        return (
          <Tag
            key={i}
            data-list-row=""
            {...(onRowClick ? { type: "button", onClick: () => onRowClick(i) } : {})}
            className={[
              "grid w-full items-center gap-4 border-b border-hairline px-3 py-3 text-left font-body text-base text-ink",
              onRowClick ? "cursor-pointer rounded-none transition-colors hover:bg-inset" : "",
            ].join(" ")}
            style={{ gridTemplateColumns: gridCols }}
          >
            {columns.map((c) => (
              <span key={c.key} className={c.align === "right" ? "text-right tabular-nums" : ""}>
                {row[c.key]}
              </span>
            ))}
            {onRowClick && (
              <span aria-hidden="true" className="text-muted">
                →
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}
