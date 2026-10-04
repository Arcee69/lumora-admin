import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface Stage {
  label: ReactNode;
  value: ReactNode;
  caption?: ReactNode;
}

interface StageMetricsProps {
  stages: Stage[];
  /** "left" = gold left border (journey times), "top" = gold top border (onboarding stages). */
  accent?: "left" | "top";
}

/** Horizontal sequence of stages, e.g. "Time to enrol / activate / verify …" or the FastStart pipeline. */
export const StageMetrics = ({ stages, accent = "left" }: StageMetricsProps) => (
  <div className="grid grid-cols-2 gap-5 px-5 pb-6 md:grid-cols-4 md:gap-[15px] xl:grid-cols-7">
    {stages.map((stage, index) => (
      <div
        key={index}
        className={cn(accent === "left" ? "border-l-2 border-gold pl-3" : "border-t-[3px] border-gold pt-3")}
      >
        <span className="block font-display text-xs text-muted">{stage.label}</span>
        <strong
          className={cn(
            "mt-[7px] block",
            accent === "left" ? "font-display text-xl font-medium" : "my-2 text-xs font-medium leading-relaxed",
          )}
        >
          {stage.value}
        </strong>
        {stage.caption && <small className="text-xs text-[#8e9f8d]">{stage.caption}</small>}
      </div>
    ))}
  </div>
);
