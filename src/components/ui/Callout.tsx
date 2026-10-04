import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface CalloutProps {
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Soft green note box used inside drawers ("Coverage is active", control notes). */
export const Callout = ({ icon, title, children, className }: CalloutProps) => (
  <div
    className={cn(
      "my-[18px] flex items-start gap-[11px] rounded-[7px] border border-[#e1e8dc] bg-[#f3f6f0] p-4 text-[#53714e]",
      className,
    )}
  >
    {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
    <div className="min-w-0">
      {title && <strong className="block text-sm">{title}</strong>}
      {children && <div className="mt-[5px] space-y-1 text-xs leading-[1.7] text-[#82907a]">{children}</div>}
    </div>
  </div>
);

/** Neutral grey note box. */
export const Note = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("my-2.5 rounded-md border border-[#e2e9dc] bg-[#f5f7f2] p-3.5 text-xs", className)}>
    {children}
  </div>
);
