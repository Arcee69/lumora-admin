import { useNavigate } from "react-router-dom";
import { DataTable, Panel, PanelHeader, StatusBadge, TextButton } from "../../../components";
import type { Column } from "../../../components";
import { RECORD_TYPE_PATHS } from "../../../data/sampleRecords";
import { formatNaira } from "../../../utils/cn";
import { formatDuration, formatPercent } from "../../../utils/csv";
import type { CommandCenterMetrics } from "../metrics";

type ProviderRow = CommandCenterMetrics["providers"][number];

interface ProviderPerformanceProps {
  metrics: CommandCenterMetrics;
}

export const ProviderPerformance = ({ metrics: m }: ProviderPerformanceProps) => {
  const navigate = useNavigate();

  const columns: Column<ProviderRow>[] = [
    {
      key: "provider",
      header: "Provider",
      render: ({ provider }) => (
        <div>
          <button
            type="button"
            className="text-left font-medium text-[#264532] hover:underline"
            onClick={() => navigate(RECORD_TYPE_PATHS.provider)}
          >
            {provider.name}
          </button>
          <small className="mt-1 block text-xs text-muted">{provider.secondary.split(" · ")[0]}</small>
        </div>
      ),
    },
    { key: "members", header: "Active principals assigned", render: (row) => row.members },
    { key: "care", header: "Care requests", render: (row) => row.careRequests },
    { key: "claims", header: "Claims / submitted value", render: (row) => `${row.claimCount} / ${formatNaira(row.claimValue)}` },
    { key: "approval", header: "Authorization approval", render: (row) => formatPercent(row.approvalRate) },
    { key: "decision", header: "Avg decision", render: (row) => formatDuration(row.avgDecision) },
    { key: "status", header: "Network status", render: ({ provider }) => <StatusBadge value={provider.status} /> },
  ];

  return (
    <Panel className="mb-5">
      <PanelHeader
        title="Top provider utilization & performance"
        description="Authorization requests and claim value in the selected scope."
        action={<TextButton className="border p-2 rounded-md border-gray-300 shadow" onClick={() => navigate("/providers")}>Open provider network</TextButton>}
      />
      <DataTable
        columns={columns}
        rows={[...m.providers].sort((a, b) => b.careRequests - a.careRequests || b.claimValue - a.claimValue)}
        getRowId={(row) => row.provider.id}
        ariaLabel="Provider performance, scroll horizontally for more columns"
      />
      <div className="border-t border-[#e4ebdb] bg-[#f4f7ef] px-[22px] py-[17px] text-[13px] leading-[1.7]">
        <b>{m.activeProviders.length} active facilities</b>
        <span className="mt-[5px] block text-xs text-muted">
          Sample footprint only. Full regional coverage needs the complete provider registry.
        </span>
      </div>
    </Panel>
  );
};
