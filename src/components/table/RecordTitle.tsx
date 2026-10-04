import type { ReactNode } from "react";
import { Avatar } from "../ui/Avatar";

interface RecordTitleProps {
  name: string;
  subtitle?: ReactNode;
  onOpen?: () => void;
}

/** First-column cell: square initials avatar, record name and a muted secondary line. */
export const RecordTitle = ({ name, subtitle, onOpen }: RecordTitleProps) => (
  <div className="flex min-w-[260px] items-center gap-[11px]">
    <Avatar name={name} shape="square" />
    <div className="min-w-0">
      {onOpen ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
          className="block text-left text-sm font-medium text-[#264532] hover:underline"
        >
          {name}
        </button>
      ) : (
        <strong className="block text-sm font-medium text-[#264532]">{name}</strong>
      )}
      {subtitle && <small className="mt-[3px] block max-w-[300px] whitespace-normal text-xs text-[#8d998e]">{subtitle}</small>}
    </div>
  </div>
);

/** Muted monospace-like reference cell ("LMR-0001842"). */
export const ReferenceCell = ({ children }: { children: ReactNode }) => (
  <span className="text-xs text-[#819182]">{children}</span>
);
