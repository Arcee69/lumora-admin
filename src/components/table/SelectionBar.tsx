import type { ReactNode } from "react";
import { TextButton } from "../ui/Button";

interface SelectionBarProps {
  count: number;
  /** Extra summary after the count, e.g. the selected total amount. */
  summary?: ReactNode;
  onClear: () => void;
}

/** Green strip shown above a table while rows are selected. */
export const SelectionBar = ({ count, summary, onClear }: SelectionBarProps) => (
  <div className="flex justify-between gap-[15px] border-y border-[#d7e8d1] bg-[#edf5eb] px-5 py-3 text-sm">
    <span>
      <strong className="font-medium">{count} selected</strong>
      {summary && <> · {summary}</>}
    </span>
    <TextButton onClick={onClear}>Clear selection</TextButton>
  </div>
);
