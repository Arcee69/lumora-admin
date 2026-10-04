import { cn, getInitials } from "../../utils/cn";

interface AvatarProps {
  name: string;
  /** "round" is the user avatar; "square" is the record/table avatar. */
  shape?: "round" | "square";
  className?: string;
}

export const Avatar = ({ name, shape = "round", className }: AvatarProps) => (
  <span
    aria-hidden="true"
    className={cn(
      "inline-flex shrink-0 items-center justify-center font-semibold",
      shape === "round"
        ? "size-[34px] rounded-full border border-[#d6e2d9] bg-[#e6efe8] text-xs text-brand-700"
        : "size-8 rounded-[7px] bg-[#eff3ee] text-[10px] text-[#809481]",
      className,
    )}
  >
    {getInitials(name)}
  </span>
);
