import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface Column<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  className?: string;
}

interface SelectionConfig<T> {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  /** Rows that cannot be selected get a disabled checkbox. */
  isSelectable?: (row: T) => boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  selection?: SelectionConfig<T>;
  /** Rendered below the header row when `rows` is empty. */
  empty?: ReactNode;
  ariaLabel?: string;
  /** "comfortable" is the module table; "compact" is for tables inside drawers. */
  density?: "comfortable" | "compact";
}

export const DataTable = <T,>({
  columns,
  rows,
  getRowId,
  onRowClick,
  selection,
  empty,
  ariaLabel = "Records table, scroll horizontally for more columns",
  density = "comfortable",
}: DataTableProps<T>) => {
  const selectableRows = selection ? rows.filter((row) => selection.isSelectable?.(row) ?? true) : [];
  const allSelected =
    !!selection &&
    selectableRows.length > 0 &&
    selectableRows.every((row) => selection.selectedIds.includes(getRowId(row)));

  const toggleAll = (checked: boolean) => {
    if (!selection) return;
    const pageIds = selectableRows.map(getRowId);
    selection.onChange(
      checked
        ? Array.from(new Set([...selection.selectedIds, ...pageIds]))
        : selection.selectedIds.filter((id) => !pageIds.includes(id)),
    );
  };

  const toggleRow = (id: string, checked: boolean) => {
    if (!selection) return;
    selection.onChange(checked ? [...selection.selectedIds, id] : selection.selectedIds.filter((x) => x !== id));
  };

  const cellPadding = density === "comfortable" ? "px-5 py-[18px]" : "px-3 py-3";

  return (
    <div className="overflow-x-auto focus-visible:outline-offset-[-3px]" tabIndex={0} aria-label={ariaLabel}>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            {selection && (
              <th className="w-[55px] border-y border-[#edf0eb] bg-[#fafbf9] py-3.5 pl-5">
                <input
                  type="checkbox"
                  aria-label="Select all selectable rows on this page"
                  checked={allSelected}
                  disabled={!selectableRows.length}
                  onChange={(event) => toggleAll(event.target.checked)}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "whitespace-nowrap border-y border-[#edf0eb] bg-[#fafbf9] px-5 py-3.5 text-xs font-medium text-[#8a968c]",
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const id = getRowId(row);
            const selectable = selection?.isSelectable?.(row) ?? true;
            return (
              <tr
                key={id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer", "transition-colors hover:bg-hover")}
              >
                {selection && (
                  <td className="w-[55px] border-b border-[#edf0eb] py-[18px] pl-5" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      aria-label={`Select ${id}`}
                      disabled={!selectable}
                      checked={selection.selectedIds.includes(id)}
                      onChange={(event) => toggleRow(id, event.target.checked)}
                      className="disabled:cursor-not-allowed"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn("whitespace-nowrap border-b border-[#edf0eb]", cellPadding, column.className)}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!rows.length && empty}
    </div>
  );
};
