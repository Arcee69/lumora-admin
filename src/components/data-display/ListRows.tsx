import type { ReactNode } from "react";
import { LuChevronRight } from "react-icons/lu";
import { cn } from "../../utils/cn";

interface ActionRowProps {
  title: ReactNode;
  description?: ReactNode;
  /** Leading icon. Wrapped in a tinted square when `iconTone` is set. */
  icon?: ReactNode;
  iconTone?: "default" | "urgent";
  /** Right-side content (badge, amount, timestamp). Hidden on small screens if `hideMetaOnMobile`. */
  meta?: ReactNode;
  hideMetaOnMobile?: boolean;
  showChevron?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Clickable full-width row with a top divider. Used for attention items, alerts,
 * prioritised queue entries, system rows, report links and notification items.
 */
export const ActionRow = ({
  title,
  description,
  icon,
  iconTone,
  meta,
  hideMetaOnMobile,
  showChevron,
  onClick,
  className,
}: ActionRowProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex w-full items-center gap-2.5 border-t border-line-soft bg-white px-[15px] py-[15px] text-left text-ink transition-colors hover:bg-[#f6f9f1] md:gap-[13px] md:px-5 md:py-4",
      className,
    )}
  >
    {icon &&
      (iconTone ? (
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-[7px] md:size-[38px]",
            iconTone === "urgent" ? "bg-[#faeeeb] text-[#a6614f]" : "bg-[#f0f4f0] text-[#6d8978]",
          )}
        >
          {icon}
        </span>
      ) : (
        <span className="shrink-0 text-[#6d8978]">{icon}</span>
      ))}
    <div className="min-w-0 flex-1">
      <b className="block text-sm font-medium leading-relaxed">{title}</b>
      {description && <small className="mt-[3px] block text-xs leading-relaxed text-muted">{description}</small>}
    </div>
    {meta && <div className={cn("shrink-0 text-right", hideMetaOnMobile && "hidden md:block")}>{meta}</div>}
    {showChevron && <LuChevronRight size={18} className="shrink-0 text-[#97a498]" />}
  </button>
);

interface LinkedRowProps {
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
}

/** Row linking to a related record inside the detail drawer (dependants, payables, employees). */
export const LinkedRow = ({ icon, title, subtitle, trailing, onClick }: LinkedRowProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center gap-[13px] border-b border-line py-[17px] text-left text-[#628359] hover:bg-hover"
  >
    {icon}
    <div className="min-w-0 flex-1">
      <strong className="block text-sm font-medium text-ink">{title}</strong>
      {subtitle && <small className="mt-[5px] block text-xs text-[#93a08a]">{subtitle}</small>}
    </div>
    {trailing}
  </button>
);

interface CheckRowProps {
  passed: boolean;
  title: ReactNode;
  description?: ReactNode;
  trailing?: ReactNode;
  passIcon: ReactNode;
  failIcon: ReactNode;
}

/** Review checklist line: pass/fail icon, label, explanation and a status badge. */
export const CheckRow = ({ passed, title, description, trailing, passIcon, failIcon }: CheckRowProps) => (
  <div className="flex items-center gap-[13px] border-b border-line py-[15px]">
    <span className={passed ? "text-[#247658]" : "text-[#b29750]"}>{passed ? passIcon : failIcon}</span>
    <div className="min-w-0 flex-1">
      <strong className="text-sm font-medium">{title}</strong>
      {description && <small className="mt-1 block text-xs text-[#90a084]">{description}</small>}
    </div>
    {trailing}
  </div>
);
