import type { ReactNode } from "react";
import { LuSearch } from "react-icons/lu";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = ({
  title,
  description,
  icon = <LuSearch size={30} />,
  action,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center px-5 py-10 text-center text-[#8a9c8b]">
    <span className="mb-2.5">{icon}</span>
    <h3 className="my-[7px] text-[15px] text-[#3d5843]">{title}</h3>
    {description && <p className="mb-[13px] text-xs">{description}</p>}
    {action}
  </div>
);
