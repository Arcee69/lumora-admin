import type { ReactNode } from "react";
import { Eyebrow } from "../ui/Eyebrow";

interface PageHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned buttons (Export, primary create action). */
  actions?: ReactNode;
}

export const PageHeading = ({ eyebrow, title, description, actions }: PageHeadingProps) => (
  <div className="mb-[25px] flex flex-col items-start justify-between gap-[15px] lg:flex-row lg:items-center lg:gap-5">
    <div className="min-w-0">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="max-w-[660px] text-2xl leading-tight tracking-[-0.8px] xl:text-[27px]">{title}</h1>
      {description && <p className="mt-[9px] text-sm text-[#7b8980]">{description}</p>}
    </div>
    {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
  </div>
);
