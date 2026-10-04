import type { ReactNode } from "react";
import { LuX } from "react-icons/lu";
import { cn } from "../../utils/cn";
import { IconButton } from "../ui/Button";
import { Overlay } from "./Overlay";

type ModalSize = "sm" | "md" | "lg";

const sizeClasses: Record<ModalSize, string> = {
  sm: "w-[460px]",
  md: "w-[700px]",
  lg: "w-[760px]",
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  size?: ModalSize;
  /** Sticky footer row, right-aligned (Cancel / Save). */
  footer?: ReactNode;
  children: ReactNode;
}

export const Modal = ({ open, onClose, title, description, size = "sm", footer, children }: ModalProps) => {
  if (!open) return null;

  return (
    <Overlay onClose={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        className={cn(
          "mb-[35px] max-h-[85vh] max-w-[95vw] overflow-auto rounded-[10px] bg-white px-5 pb-[23px] shadow-[0_15px_70px_#12332244] md:px-6 md:pb-[25px]",
          sizeClasses[size],
        )}
      >
        <div className="sticky -top-px z-[1] flex items-center justify-between gap-2.5 bg-white py-[18px] md:py-5">
          <div>
            <h2 className="text-base md:text-lg">{title}</h2>
            {description && <p className="mt-1 text-xs text-[#849087]">{description}</p>}
          </div>
          <IconButton aria-label="Close dialog" onClick={onClose}>
            <LuX size={20} />
          </IconButton>
        </div>
        {children}
        {footer && (
          <div className="sticky -bottom-px z-[1] mt-6 flex justify-end gap-2.5 border-t border-line bg-white py-4">
            {footer}
          </div>
        )}
      </section>
    </Overlay>
  );
};
