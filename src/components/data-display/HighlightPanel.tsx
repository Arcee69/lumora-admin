import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Eyebrow } from "../ui/Eyebrow";

interface HighlightPanelProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** Large gold figure, e.g. "8m 20s". */
  metric?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  /** Bottom strip separated by a hairline (reassurance note, target). */
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Dark-green feature panel (review signal, time-to-care). */
export const HighlightPanel = ({
  eyebrow,
  title,
  metric,
  description,
  action,
  footer,
  children,
  className,
}: HighlightPanelProps) => (
  <section className={cn("relative overflow-hidden rounded-lg bg-brand-900 px-5 py-[23px] text-[#e6efe8]", className)}>
    {eyebrow && <Eyebrow className="text-gold">{eyebrow}</Eyebrow>}
    {title && <h2 className="my-[11px] text-2xl font-normal leading-tight tracking-[-0.7px]">{title}</h2>}
    {metric && (
      <div className="mt-[17px] font-display text-[41px] font-medium tracking-[-1.3px] text-gold">{metric}</div>
    )}
    {description && <p className="mb-[17px] mt-[3px] text-xs leading-relaxed text-[#a8c0b2]">{description}</p>}
    {action}
    {children}
    {footer && (
      <div className="mt-5 flex items-center gap-[7px] border-t border-white/[0.13] pt-3.5 text-xs text-[#c7d8cd]">
        {footer}
      </div>
    )}
  </section>
);

export interface HighlightStripItem {
  label?: ReactNode;
  value: ReactNode;
  caption?: ReactNode;
}

interface HighlightStripProps {
  eyebrow?: ReactNode;
  headline: HighlightStripItem;
  items?: HighlightStripItem[];
  action?: ReactNode;
}

/** Wide dark-green banner with a headline metric and supporting figures ("LUMORA TIME TO CARE"). */
export const HighlightStrip = ({ eyebrow, headline, items = [], action }: HighlightStripProps) => (
  <div className="mb-[22px] flex flex-wrap items-center gap-[18px] rounded-xl bg-brand-900 p-6 text-white xl:flex-nowrap xl:gap-6">
    <div className="basis-full xl:flex-[1.3] xl:basis-auto">
      {eyebrow && <Eyebrow className="text-gold">{eyebrow}</Eyebrow>}
      <strong className="block font-display text-[31px] text-gold">{headline.value}</strong>
      {headline.caption && <span className="mt-[5px] block text-xs leading-[1.7] text-[#c1d4c7]">{headline.caption}</span>}
    </div>
    {items.map((item, index) => (
      <div key={index} className="min-w-[160px] basis-full sm:basis-auto sm:flex-1">
        {item.label && <b className="text-sm">{item.label}</b>}
        <span className="mt-[5px] block text-xs leading-[1.7] text-[#c1d4c7]">{item.value}</span>
        {item.caption && <small className="mt-[5px] block text-xs leading-[1.7] text-[#c1d4c7]">{item.caption}</small>}
      </div>
    ))}
    {action && <div className="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">{action}</div>}
  </div>
);
