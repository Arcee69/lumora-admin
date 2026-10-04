import type { ReactNode } from "react";
import { SearchField } from "../ui/SearchField";

interface TableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  /** Filter selects, sort, record count. */
  children?: ReactNode;
}

/** Search box on the left, filters on the right; stacks on small screens. */
export const TableToolbar = ({
  search,
  onSearchChange,
  searchPlaceholder = "Search by name, reference or organisation",
  children,
}: TableToolbarProps) => (
  <div className="flex flex-col flex-wrap items-start justify-between gap-[15px] p-[15px] md:p-5 lg:flex-row lg:items-center">
    <SearchField
      value={search}
      onChange={onSearchChange}
      placeholder={searchPlaceholder}
      aria-label="Search records"
      className="w-full lg:max-w-[45%] lg:min-w-[200px] lg:flex-1"
    />
    {children && <div className="flex flex-wrap items-center gap-2 lg:gap-[13px]">{children}</div>}
  </div>
);
