import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type BannerTone = "success" | "info" | "gold" | "warning" | "error";

const toneClasses: Record<BannerTone, string> = {
  success: "bg-[#eaf3ed] border-[#d5e6da] text-[#245441]",
  info: "bg-[#edf3ec] border-[#d8e6d6] text-[#617d62]",
  gold: "bg-gold-50 border-[#e8dcaa] text-[#625432]",
  warning: "bg-[#fff8e7] border-[#eee0b8] text-gold-700",
  error: "bg-[#fff0ec] border-[#e9c6ba] text-[#a15b47]",
};

interface BannerProps {
  tone?: BannerTone;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Right-aligned action: button, select, link. */
  action?: ReactNode;
  className?: string;
  role?: "status" | "alert";
}

/**
 * Full-width notice strip. Covers the operational banner, role/privacy banners,
 * the gold sample-data banner, save feedback and form error summaries.
 */
export const Banner = ({
  tone = "info",
  icon,
  title,
  description,
  action,
  className,
  role,
}: BannerProps) => (
  <div
    role={role}
    className={cn(
      "mb-5 flex flex-wrap items-center gap-3 rounded-[7px] border px-[18px] py-3.5 text-sm md:flex-nowrap",
      toneClasses[tone],
      className,
    )}
  >
    {icon && <span className="shrink-0">{icon}</span>}
    <div className="min-w-0 flex-1">
      {title && <strong className="block font-medium">{title}</strong>}
      {description && <span className="mt-[3px] block text-xs leading-relaxed opacity-90">{description}</span>}
    </div>
    {action && <div className="basis-full sm:basis-auto sm:shrink-0">{action}</div>}
  </div>
);
