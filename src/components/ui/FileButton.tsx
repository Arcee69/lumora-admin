import type { ReactNode } from "react";
import { LuUpload } from "react-icons/lu";
import { cn } from "../../utils/cn";

interface FileButtonProps {
  onSelect: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  variant?: "default" | "primary";
  children: ReactNode;
  className?: string;
}

/** Button-styled file picker (roster upload, supporting documents). */
export const FileButton = ({
  onSelect,
  accept,
  multiple,
  variant = "default",
  children,
  className,
}: FileButtonProps) => (
  <label
    className={cn(
      "relative inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-[5px] border px-[13px] py-[7px] text-sm font-medium transition-colors focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-[#b5a058]",
      variant === "primary"
        ? "border-brand-700 bg-brand-700 text-white hover:bg-brand-800"
        : "border-[#dce4dd] bg-white text-ink hover:bg-[#f0f5f1]",
      className,
    )}
  >
    <LuUpload size={16} />
    {children}
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      className="absolute inset-0 cursor-pointer opacity-0"
      onChange={(event) => {
        if (event.target.files?.length) onSelect(event.target.files);
        event.target.value = "";
      }}
    />
  </label>
);
