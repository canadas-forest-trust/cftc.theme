import { Eyebrow } from "./eyebrow";

export interface DataColumn {
  key: string;
  label: string;
  align?: "left" | "right";
  /** Keep column width to content (actions, badges). Default: truncate long text. */
  nowrap?: boolean;
}

function isActionColumn(column: DataColumn): boolean {
  return (
    column.nowrap === true ||
    column.key === "actions" ||
    column.key === "action" ||
    column.label === ""
  );
}

function isPrimaryColumn(column: DataColumn, columns: DataColumn[]): boolean {
  const firstData = columns.find((c) => !isActionColumn(c));
  return firstData?.key === column.key;
}

function gridColumnWidth(column: DataColumn): string {
  if (isActionColumn(column)) return "max-content";
  // Prefer fr tracks so columns share width instead of growing past the pane.
  if (column.align === "right") return "minmax(4.5rem, 1fr)";
  return "minmax(0, 1fr)";
}

function cellClassName(column: DataColumn, columns: DataColumn[], opts?: { header?: boolean }): string {
  const align = column.align === "right" ? "text-right tabular-nums" : "";
  if (isActionColumn(column)) {
    return ["shrink-0 whitespace-nowrap", align].filter(Boolean).join(" ");
  }
  if (opts?.header) {
    return ["min-w-0 truncate", align].filter(Boolean).join(" ");
  }
  const weight = isPrimaryColumn(column, columns) ? "font-semibold text-ink" : "text-ink";
  const numeric = column.align === "right" ? "font-medium tabular-nums tracking-tight" : "";
  return ["min-w-0 truncate", weight, numeric, align].filter(Boolean).join(" ");
}

function cellTitle(value: React.ReactNode): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function rowKeyDown(onRowClick: (index: number) => void, index: number) {
  return (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRowClick(index);
    }
  };
}

export interface DataListProps {
  columns: DataColumn[];
  rows: Array<Record<string, React.ReactNode>>;
  /** Makes rows interactive (div role=button) so cell links stay valid HTML. */
  onRowClick?: (index: number) => void;
  /** Column key used as the card title on small screens. Defaults to first column. */
  primaryColumn?: string;
  /** Column keys shown on mobile cards (defaults to all except action-like trailing cols). */
  mobileColumns?: string[];
  /** Force table layout on all breakpoints. */
  layout?: "auto" | "table";
  /**
   * Framed bordered panel around the table.
   * Default true — admin and portal tables share one chrome.
   */
  framed?: boolean;
  className?: string;
}

function DataListTable({
  columns,
  rows,
  onRowClick,
  className,
}: Pick<DataListProps, "columns" | "rows" | "onRowClick" | "className">) {
  const gridCols = `${columns.map(gridColumnWidth).join(" ")}${onRowClick ? " 1.75rem" : ""}`;

  return (
    <div data-list-table="" className={className}>
      <div
        data-list-header=""
        className="grid items-center gap-x-4 border-b border-hairline bg-inset px-4 py-2.5"
        style={{ gridTemplateColumns: gridCols }}
      >
        {columns.map((c) => (
          <Eyebrow key={c.key} as="div" className={cellClassName(c, columns, { header: true })}>
            {c.label}
          </Eyebrow>
        ))}
        {onRowClick && <span aria-hidden="true" />}
      </div>

      {rows.map((row, i) => (
        <div
          key={i}
          data-list-row=""
          role={onRowClick ? "button" : undefined}
          tabIndex={onRowClick ? 0 : undefined}
          onClick={onRowClick ? () => onRowClick(i) : undefined}
          onKeyDown={onRowClick ? rowKeyDown(onRowClick, i) : undefined}
          className={[
            "grid w-full items-center gap-x-4 border-b border-hairline px-4 py-3 text-left font-body text-sm last:border-b-0",
            onRowClick
              ? "cursor-pointer rounded-none transition-colors hover:bg-active/60 focus-visible:bg-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              : "",
          ].join(" ")}
          style={{ gridTemplateColumns: gridCols }}
        >
          {columns.map((c) => (
            <span key={c.key} className={cellClassName(c, columns)} title={cellTitle(row[c.key])}>
              {row[c.key] == null || row[c.key] === "" ? (
                <span className="text-muted">—</span>
              ) : (
                row[c.key]
              )}
            </span>
          ))}
          {onRowClick && (
            <span aria-hidden="true" className="justify-self-end text-muted">
              →
            </span>
          )}
        </div>
      ))}
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
}: Pick<
  DataListProps,
  "columns" | "rows" | "onRowClick" | "primaryColumn" | "mobileColumns" | "className"
>) {
  const primaryKey = primaryColumn ?? columns[0]?.key;
  const detailKeys =
    mobileColumns ??
    columns.map((c) => c.key).filter((k) => k !== primaryKey && k !== "action" && k !== "actions");
  const labelByKey = Object.fromEntries(columns.map((c) => [c.key, c.label]));

  return (
    <div data-list-cards="" className={className}>
      {rows.map((row, i) => (
        <div
          key={i}
          data-list-row=""
          data-list-card=""
          role={onRowClick ? "button" : undefined}
          tabIndex={onRowClick ? 0 : undefined}
          onClick={onRowClick ? () => onRowClick(i) : undefined}
          onKeyDown={onRowClick ? rowKeyDown(onRowClick, i) : undefined}
          className={[
            "flex w-full items-start gap-3 border-b border-hairline px-4 py-3.5 text-left last:border-b-0",
            onRowClick
              ? "min-h-11 cursor-pointer transition-colors hover:bg-active/60 focus-visible:bg-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              : "",
          ].join(" ")}
        >
          <div className="min-w-0 flex-1">
            {primaryKey && (
              <div
                className="truncate font-body text-sm font-semibold text-ink"
                title={cellTitle(row[primaryKey])}
              >
                {row[primaryKey]}
              </div>
            )}
            <dl className="mt-1.5 flex flex-col gap-1">
              {detailKeys.map((key) =>
                row[key] != null && row[key] !== "" ? (
                  <div key={key} className="flex min-w-0 items-baseline justify-between gap-3 text-sm">
                    <dt className="shrink-0 text-muted">{labelByKey[key]}</dt>
                    <dd className="min-w-0 truncate text-right font-medium text-ink" title={cellTitle(row[key])}>
                      {row[key]}
                    </dd>
                  </div>
                ) : null,
              )}
            </dl>
          </div>
          {onRowClick && (
            <span aria-hidden="true" className="mt-0.5 shrink-0 text-muted">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * DataList — hairline-separated rows with mono column headers.
 * Framed by default. Below md, renders scannable cards unless layout="table".
 * Use DataListLink for named entities in cells.
 */
export function DataList({
  columns,
  rows,
  onRowClick,
  primaryColumn,
  mobileColumns,
  layout = "auto",
  framed = true,
  className,
}: DataListProps) {
  const frameClass = framed
    ? "overflow-hidden rounded-lg border border-hairline bg-panel"
    : "";

  if (layout === "table") {
    return (
      <div className={["min-w-0", frameClass, className ?? ""].filter(Boolean).join(" ")}>
        <DataListTable columns={columns} rows={rows} onRowClick={onRowClick} className="min-w-0" />
      </div>
    );
  }

  return (
    <div className={[frameClass, className ?? ""].filter(Boolean).join(" ")}>
      <div className="hidden min-w-0 md:block">
        <DataListTable columns={columns} rows={rows} onRowClick={onRowClick} className="min-w-0" />
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
