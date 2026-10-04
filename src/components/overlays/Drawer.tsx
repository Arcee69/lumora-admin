import type { ReactNode, Ref } from "react";
import { LuX } from "react-icons/lu";
import { IconButton } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Overlay } from "./Overlay";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Small caps line above the title, e.g. "MEMBER / LMR-0001842". */
  eyebrow?: ReactNode;
  subtitle?: ReactNode;
  /** Optional slot above the eyebrow (e.g. "Back to previous record"). */
  headerTop?: ReactNode;
  /** Badges row under the header (status, priority, owner). */
  status?: ReactNode;
  /** Usually a <Tabs> strip. */
  tabs?: ReactNode;
  footer?: ReactNode;
  contentRef?: Ref<HTMLDivElement>;
  children: ReactNode;
}

/** Right-hand record detail panel. */
export const Drawer = ({
  open,
  onClose,
  title,
  eyebrow,
  subtitle,
  headerTop,
  status,
  tabs,
  footer,
  contentRef,
  children,
}: DrawerProps) => {
  if (!open) return null;

  return (
    <Overlay onClose={onClose} placement="end">
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex h-dvh w-[610px] max-w-full flex-col bg-white shadow-[-10px_0_50px_#12332618]"
      >
        <div className="flex items-start gap-[15px] px-5 pb-[19px] pt-[22px] md:px-[25px] md:pt-7">
          <div className="min-w-0 flex-1">
            {headerTop}
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className="my-2.5 text-[23px]">{title}</h2>
            {subtitle && <p className="text-xs text-[#839180]">{subtitle}</p>}
          </div>
          <IconButton aria-label="Close detail" onClick={onClose}>
            <LuX size={20} />
          </IconButton>
        </div>
        {status && (
          <div className="flex flex-wrap items-center gap-[9px] px-5 pb-[15px] md:px-[25px] md:pb-[18px]">{status}</div>
        )}
        {tabs && <div className="shrink-0 [&_[role=tab]]:min-h-12">{tabs}</div>}
        <div ref={contentRef} className="flex-1 overflow-y-auto p-5 md:p-[25px] [&_h3]:mb-3 [&_h3]:mt-[22px]">
          {children}
        </div>
        {footer && (
          <div className="flex gap-[7px] border-t border-line px-5 py-4 text-xs text-[#8c9b86] md:px-[25px]">{footer}</div>
        )}
      </section>
    </Overlay>
  );
};

/** "Owner: Claims team" style meta that sits at the end of the drawer status row. */
export const DrawerMeta = ({ children }: { children: ReactNode }) => (
  <span className="ml-auto hidden text-xs text-[#8b9887] md:inline">{children}</span>
);
