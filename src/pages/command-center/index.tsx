import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LuDownload, LuRefreshCw, LuTriangleAlert } from "react-icons/lu";
import { Banner, Button, PageHeading, TextButton } from "../../components";
import { SAMPLE_RECORDS } from "../../data/sampleRecords";
import { downloadCsv } from "../../utils/csv";
import { AttentionPanels } from "./components/AttentionPanels";
import { CareTiming } from "./components/CareTiming";
import { DrillDownModal } from "./components/DrillDownModal";
import { EnrolmentAndSupport } from "./components/EnrolmentAndSupport";
import { FinancePanels } from "./components/FinancePanels";
import { KpiCards } from "./components/KpiCards";
import { OperationsPanels } from "./components/OperationsPanels";
import { PlansAndClaims } from "./components/PlansAndClaims";
import { ProviderPerformance } from "./components/ProviderPerformance";
import { ScopeControls } from "./components/ScopeControls";

import { drillPagePath } from "./drill";
import type { DrillDown, OpenDrill } from "./drill";
import { buildMetrics } from "./metrics";
import type { Scope } from "./metrics";

const CommandCenter = () => {
  const navigate = useNavigate();
  const [scope, setScope] = useState<Scope>({ period: "All records", company: "All companies" });
  const [snapshotAt, setSnapshotAt] = useState(() => new Date());
  const [drill, setDrill] = useState<DrillDown | null>(null);
  const [visible] = useState({
    finance: true,
    providers: true,
    enrolment: true,
    activity: true,
  });

  // snapshotAt is a dependency so "Refresh snapshot" recomputes against the current time.
  const m = useMemo(() => buildMetrics(SAMPLE_RECORDS, scope, snapshotAt), [scope, snapshotAt]);

  // Go straight to the page that lists these records when it exists; otherwise show them in the modal.
  const open: OpenDrill = (title, records, note) => {
    const path = drillPagePath(records);
    if (path) navigate(path);
    else setDrill({ title, records, note });
  };

  const exportReport = () => {
    downloadCsv(
      m.inScope,
      ["id", "type", "name", "secondary", "status", "priority", "amount", "owner", "date"],
      `lumora-command-centre-${snapshotAt.toISOString().slice(0, 10)}`,
    );
    toast.success(`Exported ${m.inScope.length} records`);
  };

  return (
    <div>
      <PageHeading
        eyebrow="LUMORA COMMAND CENTRE"
        title="The whole programme. Every next decision."
        description="Care, members, financial exposure and controls in one accountable view."
        actions={
          <>
            <Button
              icon={<LuRefreshCw size={16} />}
              onClick={() => {
                setSnapshotAt(new Date());
                toast.success("Snapshot refreshed");
              }}
            >
              Refresh snapshot
            </Button>
            <Button variant="primary" icon={<LuDownload size={16} />} onClick={exportReport}>
              Export report
            </Button>
          </>
        }
      />

      <ScopeControls
        scope={scope}
        onScopeChange={setScope}
        snapshotAt={snapshotAt}
        periodRecordCount={m.inScope.length}
        currentRecordCount={m.scoped.length}
      />

      <Banner
        tone="gold"
        icon={<LuTriangleAlert size={18} />}
        title="Sample session data · live services not connected"
        description="Activity figures follow the period above. Coverage, open balances and queues use today's snapshot."
        action={<TextButton onClick={() => navigate("/integrations")}>Review connections</TextButton>}
      />

      <KpiCards metrics={m} onDrill={open} />
      <CareTiming metrics={m} onDrill={open} />
      <OperationsPanels metrics={m} onDrill={open} />
      <AttentionPanels metrics={m} onDrill={open} />
      <FinancePanels metrics={m} onDrill={open} />
      <PlansAndClaims metrics={m} onDrill={open} />
      <EnrolmentAndSupport metrics={m} onDrill={open} showEnrolment={visible.enrolment} />
      <ProviderPerformance metrics={m} />

      <DrillDownModal drill={drill} scope={scope} onClose={() => setDrill(null)} />
    </div>
  );
};

export default CommandCenter;