import { useEffect } from "react";
import { LuBell, LuChevronRight, LuX } from "react-icons/lu";
import { IconButton } from "../ui/Button";

export interface NotificationItem {
  id: string;
  label: string;
}

interface NotificationPopoverProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  items: NotificationItem[];
  onSelect: (item: NotificationItem) => void;
}

/** Pending-work dropdown anchored under the topbar bell. */
export const NotificationPopover = ({
  open,
  onClose,
  title = "Pending work",
  items,
  onSelect,
}: NotificationPopoverProps) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed right-3 top-[66px] z-50 w-[calc(100%-24px)] overflow-hidden rounded-lg border border-line bg-white shadow-[0_8px_40px_#0b2e2920] md:right-[30px] md:w-[360px]">
      <div className="flex items-center justify-between gap-2.5 p-5">
        <h2 className="text-base">
          {title} · {items.length}
        </h2>
        <IconButton aria-label="Close notifications" onClick={onClose}>
          <LuX size={18} />
        </IconButton>
      </div>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => {
            onSelect(item);
            onClose();
          }}
          className="flex w-full items-center gap-[11px] border-t border-line px-5 py-[15px] text-left text-sm text-[#667e5b] hover:bg-hover"
        >
          <LuBell size={17} />
          <span className="flex-1">{item.label}</span>
          <LuChevronRight size={16} />
        </button>
      ))}
      {!items.length && <p className="border-t border-line px-5 py-[15px] text-sm text-muted">Nothing pending.</p>}
    </div>
  );
};
