import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

interface OverlayProps {
  onClose?: () => void;
  /** "end" slides content to the right edge (drawer); "center" places it near the top centre (modal). */
  placement?: "end" | "center";
  className?: string;
  children: ReactNode;
}

/** Blurred backdrop rendered in a portal. Closes on backdrop click and Escape; locks page scroll. */
export const Overlay = ({ onClose, placement = "center", className, children }: OverlayProps) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-60 flex bg-[#102a2355] backdrop-blur-[2px]",
        placement === "end"
          ? "justify-end"
          : "items-start justify-center overflow-auto px-3 pb-[30px] pt-[9vh] md:px-5 md:pt-[13vh]",
        className,
      )}
    >
      <div onClick={(event) => event.stopPropagation()} className={placement === "end" ? "contents" : "w-full max-w-max"}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
