import type { ReactNode } from "react";
import { ProgressBar } from "../ui/ProgressBar";

export interface ProgressListItem {
  label: string;
  value: ReactNode;
  /** 0–100 */
  percent: number;
  caption?: ReactNode;
  onClick?: () => void;
}

/** Labelled progress bars (plan distribution, collection rate, enrolment channels, wallet benefits). */
export const ProgressList = ({ items }: { items: ProgressListItem[] }) => (
  <div className="px-5 pb-[18px]">
    {items.map((item) => {
      const content = (
        <>
          <div className="flex justify-between gap-4 text-[13px]">
            <strong className="font-medium">{item.label}</strong>
            <span className="text-muted">{item.value}</span>
          </div>
          <ProgressBar value={item.percent} label={item.label} className="my-2.5" />
          {item.caption && <small className="text-xs text-muted">{item.caption}</small>}
        </>
      );
      return item.onClick ? (
        <button key={item.label} type="button" onClick={item.onClick} className="block w-full py-[9px] text-left">
          {content}
        </button>
      ) : (
        <div key={item.label} className="py-[9px]">
          {content}
        </div>
      );
    })}
  </div>
);
