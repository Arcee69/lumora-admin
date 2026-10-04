import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

/** Small uppercase label shown above headings ("MEMBER OPERATIONS"). */
export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("mb-[9px] text-xs font-semibold uppercase tracking-[1px] text-[#718077]", className)}>
    {children}
  </div>
);
