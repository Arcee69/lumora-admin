import type { ReactNode } from "react";

interface MetricTileProps {
  label: ReactNode;
  value: ReactNode;
  /** Secondary text beside or below the value (e.g. a currency total next to a count). */
  caption?: ReactNode;
  onClick?: () => void;
}

/** Tinted tile for ledger figures and claim pipeline stages. */
export const MetricTile = ({ label, value, caption, onClick }: MetricTileProps) => {
  const Element = onClick ? "button" : "div";
  return (
    <Element
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className="rounded-[7px] border border-[#dce7d5] bg-brand-50 p-[15px] text-left transition-colors hover:border-[#b8cfbf] md:p-4"
    >
      <span className="block text-[13px] text-muted">{label}</span>
      <strong className="mt-1.5 inline-block font-display text-[19px] font-semibold text-brand-900 md:text-2xl">
        {value}
      </strong>
      {caption && <small className="ml-3 text-[13px] text-muted">{caption}</small>}
    </Element>
  );
};

export const MetricTileGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 gap-2.5 px-[15px] pb-[15px] md:gap-3.5 md:px-[22px] md:pb-[18px]">{children}</div>
);
