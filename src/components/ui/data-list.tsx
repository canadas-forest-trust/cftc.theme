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
  /** Column key used as the card title on small screens. Defaults to first column. */
  primaryColumn?: string;
  /** Column keys shown on mobile cards (defaults to all except action-like trailing cols). */
  mobileColumns?: string[];
  /** Force table layout on all breakpoints. */
  layout?: "auto" | "table";
  className?: string;
}

function DataListTable({
  columns,
  rows,
  onRowClick,
  className,
}: Pick<DataListProps, "columns" | "rows" | "onRowClick" | "className">) {
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

function DataListCards({
  columns,
  rows,
  onRowClick,
  primaryColumn,
  mobileColumns,
  className,
}: Pick<DataListProps, "columns" | "rows" | "onRowClick" | "primaryColumn" | "mobileColumns" | "className">) {
  const primaryKey = primaryColumn ?? columns[0]?.key;
  const detailKeys =
    mobileColumns ??
    columns.map((c) => c.key).filter((k) => k !== primaryKey && k !== "action");
  const labelByKey = Object.fromEntries(columns.map((c) => [c.key, c.label]));

  return (
    <div className={className}>
      {rows.map((row, i) => {
        const Tag = onRowClick ? "button" : "div";
        return (
          <Tag
            key={i}
            data-list-row=""
            data-list-card=""
            {...(onRowClick ? { type: "button", onClick: () => onRowClick(i) } : {})}
            className={[
              "flex w-full items-start gap-3 border-b border-hairline px-3 py-4 text-left",
              onRowClick ? "min-h-11 cursor-pointer transition-colors hover:bg-inset" : "",
            ].join(" ")}
          >
            <div className="min-w-0 flex-1">
              {primaryKey && (
                <div className="font-body text-base font-semibold text-ink">{row[primaryKey]}</div>
              )}
              <dl className="mt-1 flex flex-col gap-0.5">
                {detailKeys.map((key) =>
                  row[key] != null && row[key] !== "" ? (
                    <div key={key} className="flex flex-wrap gap-x-1.5 text-sm">
                      <dt className="text-muted">{labelByKey[key]}:</dt>
                      <dd className="text-ink-soft">{row[key]}</dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </div>
            {onRowClick && (
              <span aria-hidden="true" className="mt-1 shrink-0 text-muted">
                →
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}

/**
 * DataList — hairline-separated rows with mono column headers (the
 * "Forest locations: Location · Trees · CO₂ →" table). Right-align numerics.
 * Below md, renders scannable cards unless layout="table".
 */
export function DataList({
  columns,
  rows,
  onRowClick,
  primaryColumn,
  mobileColumns,
  layout = "auto",
  className,
}: DataListProps) {
  if (layout === "table") {
    return (
      <div className={["overflow-x-auto", className ?? ""].join(" ")}>
        <DataListTable columns={columns} rows={rows} onRowClick={onRowClick} className="min-w-[32rem]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="hidden md:block">
        <DataListTable columns={columns} rows={rows} onRowClick={onRowClick} />
      </div>
      <div className="md:hidden">
        <DataListCards
          columns={columns}
          rows={rows}
          onRowClick={onRowClick}
          primaryColumn={primaryColumn}
          mobileColumns={mobileColumns}
        />
      </div>
    </div>
  );
}
