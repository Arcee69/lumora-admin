import { cn } from "../../utils/cn";

interface ProgressBarProps {
  /** 0–100 */
  value: number;
  /** "light" for white panels, "dark" for the green highlight panel. */
  tone?: "light" | "dark";
  className?: string;
  label?: string;
}

export const ProgressBar = ({ value, tone = "light", className, label }: ProgressBarProps) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "overflow-hidden rounded",
        tone === "light" ? "h-[5px] bg-[#edf2e7]" : "h-[3px] bg-[#316253]",
        className,
      )}
    >
      <i
        className={cn("block h-full min-w-[5px] rounded", tone === "light" ? "bg-brand-700" : "bg-gold")}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};
