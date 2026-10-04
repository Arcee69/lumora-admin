import { useCallback, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  NotificationPopover,
  SearchDialog,
  Sidebar,
  Toaster,
  Topbar,
} from "../../components";
import type { SearchResult } from "../../components";
import { findNavItem, NAV_GROUPS } from "../../constants/navigation";
import {
  CURRENT_USER,
  getWorkQueue,
  RECORD_TYPE_LABELS,
  RECORD_TYPE_PATHS,
  SAMPLE_RECORDS,
} from "../../data/sampleRecords";
import { useHotkey } from "../../hooks/useHotkey";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeNotifications = useCallback(() => setNotificationsOpen(false), []);
  useHotkey("k", openSearch);

  const workQueue = useMemo(() => getWorkQueue(), []);
  const pendingAuthorizations = SAMPLE_RECORDS.filter(
    (record) => record.type === "authorization" && record.status === "Pending",
  ).length;

  const pageLabel = findNavItem(pathname)?.item.label ?? "Command centre";

  const searchRecords = (query: string): SearchResult[] => {
    const term = query.toLowerCase();
    return SAMPLE_RECORDS.filter((record) =>
      [record.name, record.id, record.secondary].some((field) => field.toLowerCase().includes(term)),
    )
      .slice(0, 12)
      .map((record) => ({
        id: record.id,
        title: record.name,
        subtitle: `${record.id} · ${RECORD_TYPE_LABELS[record.type]}`,
        status: record.status,
      }));
  };

  const openRecord = (id: string) => {
    const record = SAMPLE_RECORDS.find((entry) => entry.id === id);
    if (record) navigate(RECORD_TYPE_PATHS[record.type]);
  };

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="fixed -top-12 left-2.5 z-100 bg-white p-2.5 focus:top-2.5"
      >
        Skip to main content
      </a>

      <Sidebar
        groups={NAV_GROUPS}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
        counts={{ work: workQueue.length, authorizations: pendingAuthorizations }}
        onHelpClick={() => setHelpOpen(true)}
        status={{ title: "Review workspace", caption: "Sample records · API not connected" }}
      />

      <div className="md:ml-[225px] lg:ml-[240px] xl:ml-[270px]">
        <Topbar
          pageLabel={pageLabel}
          user={CURRENT_USER}
          notificationCount={workQueue.length}
          notificationsOpen={notificationsOpen}
          onMenuClick={() => setMobileNavOpen(true)}
          onSearchClick={openSearch}
          onNotificationsClick={() => setNotificationsOpen((open) => !open)}
        />

        <main
          id="main"
          tabIndex={-1}
          className="mx-auto max-w-[1680px] px-4 pt-[25px] outline-none md:px-[22px] md:pt-6 xl:px-[30px] xl:pt-[31px] 2xl:px-10 2xl:pt-[38px]"
        >
          <Outlet />
        </main>
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        search={searchRecords}
        onSelect={(result) => openRecord(result.id)}
      />

      <NotificationPopover
        open={notificationsOpen}
        onClose={closeNotifications}
        items={workQueue.slice(0, 6).map((record) => ({ id: record.id, label: `${record.name} · ${record.status}` }))}
        onSelect={(item) => openRecord(item.id)}
      />

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Workspace help">
        <h3 className="mb-2 text-[15px]">Follow a request through Lumora</h3>
        <p className="text-sm leading-[1.7] text-muted">
          Open a record, check its linked member, provider and authorization, then record a decision with a reason.
        </p>
        <h3 className="mb-2 mt-5 text-[15px]">Working efficiently</h3>
        <p className="text-sm leading-[1.7] text-muted">
          Press Ctrl/⌘ K to search across every module, and filter tables by owner or priority.
        </p>
        <Button
          variant="primary"
          className="mt-5"
          onClick={() => {
            setHelpOpen(false);
            navigate("/work");
          }}
        >
          Open work queue
        </Button>
      </Modal>

      <Toaster />
    </div>
  );
};

export default DashboardLayout;
