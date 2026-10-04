import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  ariaLabel: string;
  /** Leading icon or text, e.g. a filter icon or "Sort". */
  prefix?: ReactNode;
  className?: string;
}

/** Compact bordered select used in table toolbars and dashboard controls. */
export const FilterSelect = ({ value, onChange, options, ariaLabel, prefix, className }: FilterSelectProps) => (
  <label
    className={cn(
      "flex items-center gap-[7px] rounded-[5px] border border-line bg-white p-2 text-sm text-[#6d7e70]",
      className,
    )}
  >
    {prefix}
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="max-w-[160px] bg-transparent text-ink outline-none"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </label>
);
