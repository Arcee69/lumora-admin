import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "default" | "primary" | "danger" | "light";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-white border-[#dce4dd] text-ink hover:bg-[#f0f5f1]",
  primary:
    "bg-brand-700 border-brand-700 text-white hover:bg-brand-800 disabled:bg-brand-400 disabled:border-brand-400",
  danger: "bg-white border-[#e5c6be] text-danger hover:bg-danger-50",
  light: "bg-white/95 border-transparent text-brand-700 hover:bg-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[34px] px-2.5 py-1 text-xs",
  md: "min-h-10 px-[13px] py-[7px] text-sm",
};

export const Button = ({
  variant = "default",
  size = "md",
  icon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-[5px] border text-center font-medium transition-colors disabled:opacity-60",
      variantClasses[variant],
      sizeClasses[size],
      className,
    )}
    {...props}
  >
    {icon}
    {children}
  </button>
);

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
}

/** Square, borderless button for a single icon (close, menu, row chevrons). */
export const IconButton = ({ className, children, type = "button", ...props }: IconButtonProps) => (
  <button
    type={type}
    className={cn(
      "relative inline-flex min-h-8 min-w-8 items-center justify-center rounded-[5px] text-[#67766d] transition-colors hover:bg-[#edf3ef]",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

/** Inline link-style button ("View all", "Clear selection"). */
export const TextButton = ({
  className,
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type={type}
    className={cn(
      "inline-flex items-center gap-[3px] whitespace-nowrap text-xs text-[#386952] hover:text-brand-700",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
