import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

/** White bordered card that wraps most dashboard sections. */
export const Panel = ({ className, children, ...props }: HTMLAttributes<HTMLElement>) => (
  <section
    className={cn("min-w-0 overflow-hidden rounded-lg border border-line bg-white", className)}
    {...props}
  >
    {children}
  </section>
);

/** Muted footnote at the bottom of a panel explaining how a figure is calculated. */
export const PanelNote = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("px-[22px] pb-[18px] text-xs leading-[1.7] text-muted", className)}>{children}</p>
);

interface PanelHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned slot: text button, badge, legend, etc. */
  action?: ReactNode;
  className?: string;
}

export const PanelHeader = ({ title, description, action, className }: PanelHeaderProps) => (
  <div
    className={cn(
      "flex flex-wrap items-start justify-between gap-2.5 p-[17px] md:flex-nowrap md:items-center md:p-5",
      className,
    )}
  >
    <div className="min-w-0">
      <h2 className="text-base leading-normal tracking-[-0.35px]">{title}</h2>
      {description && <p className="mt-1 text-xs leading-relaxed text-[#849087]">{description}</p>}
    </div>
    {action}
  </div>
);
