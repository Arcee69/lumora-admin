import { Button } from "../ui/Button";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  /** Noun used in the summary, e.g. "matching records". */
  label?: string;
}

/** Table footer: "1–10 of 42 matching records" plus Previous / Page x of y / Next. */
export const Pagination = ({ page, pageSize, total, onPageChange, label = "matching records" }: PaginationProps) => {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pageCount);
  const start = total ? (current - 1) * pageSize + 1 : 0;
  const end = Math.min(current * pageSize, total);

  return (
    <div className="flex flex-wrap justify-between gap-[15px] px-5 py-3.5 text-xs text-[#98a393]">
      <span>
        {total ? `${start}–${end}` : "0"} of {total} {label}
      </span>
      <div className="ml-auto flex items-center gap-2.5">
        <Button size="sm" disabled={current <= 1} onClick={() => onPageChange(current - 1)}>
          Previous
        </Button>
        <span className="whitespace-nowrap">
          Page {current} of {pageCount}
        </span>
        <Button size="sm" disabled={current >= pageCount} onClick={() => onPageChange(current + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};
