import type { InputHTMLAttributes } from "react";
import { LuSearch } from "react-icons/lu";
import { cn } from "../../utils/cn";

interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  /** "light" for white surfaces, "dark" for the green sidebar. */
  tone?: "light" | "dark";
}

export const SearchField = ({
  value,
  onChange,
  tone = "light",
  className,
  placeholder = "Search",
  ...props
}: SearchFieldProps) => (
  <label
    className={cn(
      "flex items-center gap-2 rounded-[5px] border px-2.5 py-2 text-sm",
      tone === "light"
        ? "border-line bg-white text-[#9aa59b]"
        : "rounded-md border-white/[0.13] bg-white/[0.035] text-[#b5cbbf]",
      className,
    )}
  >
    <LuSearch size={tone === "light" ? 17 : 15} className="shrink-0" />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={props["aria-label"] ?? placeholder}
      className={cn(
        "w-full min-w-0 bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden",
        tone === "light" ? "text-ink placeholder:text-[#9aa59b]" : "text-[13px] text-canvas placeholder:text-[#9eb7a8]",
      )}
      {...props}
    />
  </label>
);
