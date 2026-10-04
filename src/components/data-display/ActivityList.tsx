import type { ReactNode } from "react";

export interface ActivityItem {
  id: string | number;
  message: ReactNode;
  timestamp?: ReactNode;
  icon?: ReactNode;
}

/** Vertical event feed (recent activity, audit trail). Falls back to a dot when no icon is given. */
export const ActivityList = ({ items }: { items: ActivityItem[] }) => (
  <div className="px-5 pb-5">
    {items.map((item) => (
      <div key={item.id} className="flex items-start gap-2.5 border-b border-line-soft py-[11px] text-xs last:border-0">
        {item.icon ?? <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#a0b4a5]" />}
        <div className="min-w-0">
          <p className="leading-relaxed">{item.message}</p>
          {item.timestamp && <small className="mt-1 block text-xs text-[#9aa399]">{item.timestamp}</small>}
        </div>
      </div>
    ))}
  </div>
);
