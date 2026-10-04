import { LuChevronRight } from "react-icons/lu";
import { cn } from "../../utils/cn";

export interface SummaryItem {
  label: string;
  count: number;
}

interface ModuleSummaryProps {
  items: SummaryItem[];
  selected?: string;
  onSelect: (label: string) => void;
}

/** Row of clickable status counters above a module table ("Pending 4 >", "Active 12 >"). */
export const ModuleSummary = ({ items, selected, onSelect }: ModuleSummaryProps) => (
  <div className="mb-[22px] grid grid-cols-2 gap-2.5 md:gap-[15px] xl:grid-cols-4">
    {items.map(({ label, count }) => (
      <button
        key={label}
        type="button"
        onClick={() => onSelect(label)}
        className={cn(
          "flex items-center gap-3 rounded-[7px] border bg-white p-3 text-left transition-colors md:px-[18px] md:py-[15px]",
          selected === label ? "border-[#6e9d83] bg-[#f0f7f1]" : "border-line hover:border-[#b8cfbf]",
        )}
      >
        <span className="flex-1 text-[13px] text-[#829084] md:text-sm">{label}</span>
        <strong className="font-display text-[23px] font-medium">{count}</strong>
        <LuChevronRight size={15} className="text-[#b2bdb2]" />
      </button>
    ))}
  </div>
);
