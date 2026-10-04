import { LuCheck } from "react-icons/lu";
import { cn } from "../../utils/cn";

interface FormProgressProps {
  steps: string[];
  /** Zero-based index of the current step. */
  current: number;
  /** Allow jumping back to completed steps. */
  onStepClick?: (index: number) => void;
}

/** Numbered step indicator for multi-step forms (e.g. New claim: Details → Services → Review). */
export const FormProgress = ({ steps, current, onStepClick }: FormProgressProps) => (
  <ol className="flex gap-3 border-b border-line pb-[18px]">
    {steps.map((step, index) => {
      const state = index === current ? "active" : index < current ? "complete" : "upcoming";
      return (
        <li key={step} className="flex-1">
          <button
            type="button"
            disabled={!onStepClick || index > current}
            onClick={() => onStepClick?.(index)}
            aria-current={state === "active" ? "step" : undefined}
            className={cn(
              "flex items-center gap-[7px] text-left text-xs disabled:cursor-default disabled:opacity-100",
              state === "active" ? "font-medium text-brand-700" : "text-[#849480]",
            )}
          >
            <span
              className={cn(
                "flex size-[25px] shrink-0 items-center justify-center rounded-full border text-xs",
                state === "active" && "border-brand-700 bg-brand-700 text-white",
                state === "complete" && "border-[#cbdcc2] bg-[#eaf3e5] text-brand-700",
                state === "upcoming" && "border-[#dbe4d5]",
              )}
            >
              {state === "complete" ? <LuCheck size={13} /> : index + 1}
            </span>
            {step}
          </button>
        </li>
      );
    })}
  </ol>
);
