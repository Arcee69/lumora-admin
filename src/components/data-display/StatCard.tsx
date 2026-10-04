import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
  /** e.g. "View supporting records" — shown in green at the bottom. */
  actionLabel?: string;
  onClick?: () => void;
  className?: string;
}

/** KPI card for the top-of-page stats grid. Becomes a button when onClick is given. */
export const StatCard = ({ label, value, icon, description, actionLabel, onClick, className }: StatCardProps) => {
  const Element = onClick ? "button" : "div";
  return (
    <Element
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "flex min-h-[164px] min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-white px-3.5 pb-4 pt-4 text-left transition-colors xl:px-[19px] xl:pt-5",
        onClick && "hover:border-[#b8cfbf]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 text-[13px] text-[#6b7b70] xl:text-sm">
        {label}
        {icon && <span className="text-[#668374]">{icon}</span>}
      </div>
      <div className="my-2 font-display text-2xl font-semibold leading-snug tracking-[-0.9px] wrap-anywhere text-[#183d2e] xl:text-[28px]">
        {value}
      </div>
      {description && <p className="flex-1 text-xs leading-relaxed text-muted">{description}</p>}
      {actionLabel && <span className="mt-3.5 text-xs font-medium text-brand-700">{actionLabel}</span>}
    </Element>
  );
};

/** Responsive grid wrapper for StatCards. */
export const StatsGrid = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn(
      "mb-[22px] grid grid-cols-2 gap-2.5 md:gap-3.5 lg:grid-cols-[repeat(auto-fit,minmax(195px,1fr))]",
      className,
    )}
  >
    {children}
  </div>
);
