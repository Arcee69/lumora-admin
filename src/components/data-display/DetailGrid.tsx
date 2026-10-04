import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface DetailItem {
  label: string;
  value: ReactNode;
}

/** Two-column label/value grid for record overviews and form review steps. */
export const DetailGrid = ({ items, className }: { items: DetailItem[]; className?: string }) => (
  <div className={cn("mb-7 grid grid-cols-2 gap-5 md:gap-6", className)}>
    {items.map(({ label, value }) => (
      <div key={label}>
        <span className="mb-[5px] block text-xs text-[#8e9a8a]">{label}</span>
        <strong className="text-sm font-medium wrap-anywhere">{value ?? "Not set"}</strong>
      </div>
    ))}
  </div>
);

/** Single key/value line with a divider ("Co-pay ........ 10%"). */
export const KeyValueRow = ({ label, value }: DetailItem) => (
  <div className="flex items-start justify-between gap-5 border-b border-line py-[13px] text-sm">
    <span className="text-[#7e8d78]">{label}</span>
    <strong className="max-w-[65%] text-right font-medium wrap-anywhere">{value}</strong>
  </div>
);
