import { cn } from "../../utils/cn";

interface TabsProps<T extends string> {
  tabs: readonly T[];
  value: T;
  onChange: (tab: T) => void;
  ariaLabel: string;
  className?: string;
}

/** Underlined tab strip used above tables and inside the record drawer. */
export const Tabs = <T extends string>({ tabs, value, onChange, ariaLabel, className }: TabsProps<T>) => (
  <div
    role="tablist"
    aria-label={ariaLabel}
    className={cn(
      "flex items-center gap-[19px] overflow-x-auto border-b border-line px-[17px] md:gap-[22px] md:px-5",
      className,
    )}
  >
    {tabs.map((tab) => {
      const selected = tab === value;
      return (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={selected}
          onClick={() => onChange(tab)}
          className={cn(
            "whitespace-nowrap border-b-2 pb-[13px] pt-4 text-sm transition-colors",
            selected ? "border-brand-700 font-semibold text-brand-700" : "border-transparent text-[#7d8c81] hover:text-ink",
          )}
        >
          {tab}
        </button>
      );
    })}
  </div>
);
