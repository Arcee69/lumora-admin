import { useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { EmptyState, PageHeading, Panel } from "../../components";
import { findNavItem } from "../../constants/navigation";

/** Shown for navigation modules that have not been built yet. */
const ModulePlaceholder = () => {
  const { pathname } = useLocation();
  const match = findNavItem(pathname);

  return (
    <>
      <PageHeading eyebrow={match?.group.label} title={match?.item.label ?? "Page not found"} />
      <Panel>
        <EmptyState
          icon={<LuLayoutDashboard size={30} />}
          title={match ? "This workspace is not built yet" : "We couldn't find that page"}
          description={match ? "It will appear here once the module is implemented." : "Check the address or use the navigation."}
        />
      </Panel>
    </>
  );
};

export default ModulePlaceholder;
