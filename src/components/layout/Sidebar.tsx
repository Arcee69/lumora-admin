import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuChevronDown, LuChevronRight, LuLifeBuoy, LuPanelLeftClose } from "react-icons/lu";
import logo from "../../assets/lumora-logo.png";
import type { NavGroup } from "../../constants/navigation";
import { cn } from "../../utils/cn";
import { LiveDot } from "../ui/Badge";
import { SearchField } from "../ui/SearchField";

interface SidebarProps {
  groups: NavGroup[];
  /** Mobile drawer state (≤700px). Always visible on larger screens. */
  mobileOpen: boolean;
  onMobileClose: () => void;
  /** Badge counts keyed by nav item id, e.g. { work: 12, authorizations: 3 }. */
  counts?: Record<string, number>;
  onHelpClick?: () => void;
  /** Bottom status card, e.g. environment or connection state. */
  status?: { title: string; caption?: string };
}

export const Sidebar = ({ groups, mobileOpen, onMobileClose, counts = {}, onHelpClick, status }: SidebarProps) => {
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const term = query.trim().toLowerCase();
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !term || item.label.toLowerCase().includes(term) || group.label.toLowerCase().includes(term),
      ),
    }))
    .filter((group) => group.items.length);

  const toggleGroup = (label: string) =>
    setCollapsed((current) => (current.includes(label) ? current.filter((x) => x !== label) : [...current, label]));

  return (
    <>
      <aside
        aria-label="Workspace navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-[270px] flex-col bg-brand-950 text-[#e8efeb] transition-transform duration-200",
          "md:w-[225px] lg:w-[240px] xl:w-[270px] md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-[82px] items-center justify-between bg-canvas px-5 py-[18px] lg:px-4 xl:px-5">
          <img src={logo} alt="Lumora Health" className="h-auto max-h-[45px] w-full object-contain" />
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onMobileClose}
            className="inline-flex text-brand-900 md:hidden"
          >
            <LuPanelLeftClose size={18} />
          </button>
        </div>

        <div className="px-[22px] pb-[3px] pt-[22px] text-xs font-semibold tracking-[1.1px] text-[#92afa1]">
          COMMAND CENTRE
        </div>

        <SearchField
          tone="dark"
          value={query}
          onChange={setQuery}
          placeholder="Find a workspace"
          className="mx-3.5 mt-[15px]"
        />

        <nav className="flex-1 overflow-y-auto px-3 pb-6 pt-[7px] [scrollbar-color:#426b5b_transparent] [scrollbar-width:thin]">
          {visibleGroups.map((group) => {
            const Icon = group.icon;
            const expanded = !!term || !collapsed.includes(group.label);
            return (
              <div key={group.label} className="mt-[17px]">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => toggleGroup(group.label)}
                  className="flex w-full items-center justify-between px-[11px] py-1.5 text-left text-[11px] font-medium tracking-[1px] text-[#9ab8a8]"
                >
                  {group.label}
                  <LuChevronDown size={13} className={cn("transition-transform", !expanded && "-rotate-90")} />
                </button>
                {expanded &&
                  group.items.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={onMobileClose}
                      className={({ isActive }) =>
                        cn(
                          "my-0.5 flex w-full items-center gap-2.5 rounded-md px-3 py-[11px] text-left text-sm leading-tight transition-colors md:text-[13px] xl:text-sm",
                          isActive
                            ? "border-l-2 border-gold bg-brand-700 pl-[10px] text-white [&_svg]:text-gold"
                            : "text-[#b7c9bf] hover:bg-white/[0.035] hover:text-white",
                        )
                      }
                    >
                      <Icon size={17} className="opacity-80" />
                      <span className="flex-1">{item.label}</span>
                      {!!counts[item.id] && (
                        <b className="rounded bg-[#315f50] px-[5px] py-px text-[11px] font-medium text-[#e8d599]">
                          {counts[item.id]}
                        </b>
                      )}
                    </NavLink>
                  ))}
              </div>
            );
          })}
          {!visibleGroups.length && <p className="p-5 text-[13px] text-[#b8cebe]">No matching workspaces</p>}
        </nav>

        <div className="border-t border-white/[0.06] p-[13px]">
          {onHelpClick && (
            <button
              type="button"
              onClick={onHelpClick}
              className="flex w-full items-center gap-2.5 px-[9px] py-[7px] text-sm text-[#baccc2] hover:text-white"
            >
              <LuLifeBuoy size={18} />
              Help & support
              <LuChevronRight size={14} className="ml-auto" />
            </button>
          )}
          {status && (
            <div className="mt-3 flex items-center gap-[9px] rounded-md border border-white/[0.075] bg-white/[0.025] p-[11px] text-xs">
              <LiveDot />
              <div>
                {status.title}
                {status.caption && <small className="mt-0.5 block text-xs text-[#9bb5a7]">{status.caption}</small>}
              </div>
            </div>
          )}
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onMobileClose}
          className="fixed inset-0 z-25 bg-[#183d3266] md:hidden"
        />
      )}
    </>
  );
};
