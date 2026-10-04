import type { ReactNode } from "react";

interface MiniStatProps {
  label: string;
  value: ReactNode;
  onClick?: () => void;
}

/** Compact label/value cell used in 2-column grids inside dashboard panels. */
export const MiniStat = ({ label, value, onClick }: MiniStatProps) => {
  const Element = onClick ? "button" : "div";
  return (
    <Element
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className="flex min-w-0 flex-col gap-[5px] border-b border-line-soft px-2 py-3.5 text-left transition-colors hover:bg-brand-50"
    >
      <span className="text-[13px] leading-normal text-muted">{label}</span>
      <strong className="text-[19px] leading-snug wrap-anywhere text-brand-900 md:text-xl">{value}</strong>
    </Element>
  );
};

export const MiniStatGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 px-2.5 pb-2.5 md:px-[18px]">{children}</div>
);
