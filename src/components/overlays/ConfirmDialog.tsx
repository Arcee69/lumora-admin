import type { ReactNode } from "react";
import { Button } from "../ui/Button";
import { Overlay } from "./Overlay";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  /** "danger" styles the confirm button red (discard, reject). */
  tone?: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Small blocking dialog, e.g. "Keep your changes?". The safe (cancel) action is
 * the primary, auto-focused button, matching the original discard prompt.
 */
export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  tone = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <Overlay onClose={onCancel} className="z-90 bg-[#102a2366]">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className="w-[460px] max-w-[95vw] rounded-[10px] bg-white p-7 shadow-[0_15px_70px_#12332244]"
      >
        <h2 className="text-lg">{title}</h2>
        <p className="mt-3.5 text-sm leading-[1.7] text-muted">{message}</p>
        <div className="mt-[15px] flex flex-wrap gap-2">
          <Button variant="primary" autoFocus onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={tone === "danger" ? "danger" : "default"} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </section>
    </Overlay>
  );
};
