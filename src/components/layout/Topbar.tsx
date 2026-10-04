import { LuBell, LuChevronDown, LuChevronRight, LuMenu, LuSearch } from "react-icons/lu";
import { Avatar } from "../ui/Avatar";
import { IconButton } from "../ui/Button";

interface TopbarProps {
  /** Root crumb, e.g. "Lumora Health". */
  rootLabel?: string;
  /** Current page label. */
  pageLabel: string;
  user: { name: string; role: string };
  notificationCount?: number;
  notificationsOpen?: boolean;
  onMenuClick: () => void;
  onSearchClick: () => void;
  onNotificationsClick: () => void;
  onProfileClick?: () => void;
}

export const Topbar = ({
  rootLabel = "Lumora Health",
  pageLabel,
  user,
  notificationCount = 0,
  notificationsOpen,
  onMenuClick,
  onSearchClick,
  onNotificationsClick,
  onProfileClick,
}: TopbarProps) => (
  <header className="flex h-[65px] items-center justify-between gap-4 border-b border-line bg-white px-[15px] md:h-[76px] md:px-5 xl:px-[30px] 2xl:px-10">
    <div className="flex max-w-[55%] items-center gap-2 text-xs md:max-w-none md:gap-3">
      <IconButton aria-label="Open navigation" onClick={onMenuClick} className="md:hidden">
        <LuMenu size={20} />
      </IconButton>
      <span className="hidden text-[#89958e] lg:inline">{rootLabel}</span>
      <LuChevronRight size={14} className="hidden text-[#89958e] lg:block" />
      <strong className="truncate font-medium">{pageLabel}</strong>
    </div>

    <div className="flex items-center gap-[5px] md:gap-2.5 xl:gap-[19px]">
      <button
        type="button"
        onClick={onSearchClick}
        className="flex items-center gap-2.5 p-1 text-sm text-[#829087] hover:text-ink"
        aria-label="Search anything"
      >
        <LuSearch size={17} />
        <span className="hidden xl:inline">Search anything...</span>
        <kbd className="hidden rounded border border-line bg-[#f7f8f7] px-1 py-px text-[10px] text-[#849088] xl:inline">
          Ctrl / ⌘ K
        </kbd>
      </button>

      <IconButton
        aria-label={`Open work notifications, ${notificationCount} pending`}
        aria-expanded={notificationsOpen}
        onClick={onNotificationsClick}
      >
        <LuBell size={19} />
        {notificationCount > 0 && <i className="absolute right-[7px] top-1 size-[5px] rounded-full bg-[#c59147]" />}
      </IconButton>

      <div className="hidden h-7 border-l border-line md:block" />

      <button type="button" onClick={onProfileClick} className="flex items-center gap-2.5 px-0.5 text-left text-sm">
        <Avatar name={user.name} />
        <span className="hidden lg:block">
          <strong className="block text-[13px] font-semibold xl:text-sm">{user.name}</strong>
          <small className="block max-w-[155px] truncate text-xs text-[#7d8982]">{user.role}</small>
        </span>
        <LuChevronDown size={15} className="hidden lg:block" />
      </button>
    </div>
  </header>
);
