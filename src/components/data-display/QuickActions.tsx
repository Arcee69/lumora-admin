import type { ReactNode } from "react";

export interface QuickAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

/** Grid of shortcut tiles ("Add provider", "Review care", "Adjudicate claims"). */
export const QuickActions = ({ actions }: { actions: QuickAction[] }) => (
  <div className="grid grid-cols-2 gap-2.5 px-[15px] pb-[18px] xl:grid-cols-4">
    {actions.map((action) => (
      <button
        key={action.label}
        type="button"
        onClick={action.onClick}
        className="flex items-center gap-2.5 rounded-md border border-[#e0e8d8] bg-[#f5f8f0] px-3 py-3.5 text-left text-[13px] transition-colors hover:border-[#b8cfbf] md:text-sm [&_svg]:size-[18px] [&_svg]:shrink-0"
      >
        {action.icon}
        {action.label}
      </button>
    ))}
  </div>
);
