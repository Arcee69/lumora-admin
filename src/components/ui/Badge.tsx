import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { getStatusTone } from "../../utils/status";
import type { BadgeTone } from "../../utils/status";

const toneClasses: Record<BadgeTone, string> = {
  green: "bg-[#eaf3ec] text-[#397253]",
  red: "bg-[#fbebe6] text-[#b16450]",
  amber: "bg-[#f7f1e0] text-[#a0843c]",
  neutral: "bg-[#f0f3f0] text-[#77847a]",
};

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

export const Badge = ({ tone = "neutral", className, children }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 whitespace-nowrap rounded px-[7px] py-[3px] text-xs font-medium leading-normal",
      toneClasses[tone],
      className,
    )}
  >
    {children}
  </span>
);

/** Badge whose colour is derived from a record status or priority. */
export const StatusBadge = ({ value, className }: { value: string; className?: string }) => (
  <Badge tone={getStatusTone(value)} className={className}>
    {value}
  </Badge>
);

/** Small gold count next to a panel title, e.g. "Needs attention 12". */
export const CountPill = ({ children }: { children: ReactNode }) => (
  <span className="ml-[7px] rounded bg-[#f1ede2] px-1.5 py-[3px] align-middle text-[10px] text-[#9d7b32]">
    {children}
  </span>
);

/** Pulsing-style status dot used for "live" workspace indicators. */
export const LiveDot = ({ className }: { className?: string }) => (
  <span className={cn("inline-block size-1.5 shrink-0 rounded-full bg-[#56b392]", className)} />
);
