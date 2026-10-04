import { useNavigate } from "react-router-dom";
import { LuActivity, LuHeartPulse, LuUsers } from "react-icons/lu";
import { MiniStatGrid, Panel, PanelHeader, PanelNote, TextButton } from "../../../components";
import { formatNaira } from "../../../utils/cn";
import { formatPercent } from "../../../utils/csv";
import type { SectionProps } from "../drill";
import { TARGETS } from "../metrics";
import { DrillStat, PanelIcon } from "./SectionParts";

/** Member, care and claims operations side by side. */
export const OperationsPanels = ({ metrics: m, onDrill }: SectionProps) => {
  const navigate = useNavigate();
  const urgent = m.openAuthorizations.filter((r) => r.priority === "Urgent");

  return (
    <div className="mb-5 grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:[&>*:last-child]:col-span-2 xl:grid-cols-3 xl:[&>*:last-child]:col-span-1">
      <Panel>
        <PanelHeader title="Member operations" action={<PanelIcon><LuUsers size={20} /></PanelIcon>} />
        <MiniStatGrid>
          <DrillStat label="Active principals" value={m.activeMembers.length} records={m.activeMembers} onDrill={onDrill} />
          <DrillStat label="Pending activation" value={m.pendingMembers.length} records={m.pendingMembers} onDrill={onDrill} />
          <DrillStat label="Coverage issues" value={m.coverageIssues.length} records={m.coverageIssues} onDrill={onDrill} />
          <DrillStat label="Enrolment queries" value={m.enrolmentQueries.length} records={m.enrolmentQueries} onDrill={onDrill} />
        </MiniStatGrid>
        <TextButton className="mx-5 mb-[18px]" onClick={() => navigate("/faststart")}>
          Open FastStart
        </TextButton>
      </Panel>
      <Panel>
        <PanelHeader title="Care operations" action={<PanelIcon><LuHeartPulse size={20} /></PanelIcon>} />
        <MiniStatGrid>
          <DrillStat label="Period requests" value={m.authorizations.length} records={m.authorizations} onDrill={onDrill} />
          <DrillStat label="Awaiting decision" value={m.openAuthorizations.length} records={m.openAuthorizations} onDrill={onDrill} />
          <DrillStat label="Urgent" value={urgent.length} records={urgent} onDrill={onDrill} />
          <DrillStat label="Past target" value={m.authOverdue.length} records={m.authOverdue} onDrill={onDrill} />
        </MiniStatGrid>
        <PanelNote>
          {TARGETS.authorization}m decision target · approval rate {formatPercent(m.approvalRate)}
        </PanelNote>
      </Panel>
      <Panel>
        <PanelHeader title="Claims operations" action={<PanelIcon><LuActivity size={20} /></PanelIcon>} />
        <MiniStatGrid>
          <DrillStat label="Awaiting adjudication" value={m.openClaims.length} records={m.openClaims} onDrill={onDrill} />
          <DrillStat label="Past target" value={m.claimsOverdue.length} records={m.claimsOverdue} onDrill={onDrill} />
          <DrillStat label="Adjudicated value" value={formatNaira(m.incurred)} records={m.incurredClaims} onDrill={onDrill} />
          <DrillStat label="Payment ready" value={m.paymentReadyClaims.length} records={m.paymentReadyClaims} onDrill={onDrill} />
        </MiniStatGrid>
        <PanelNote>{TARGETS.claim / 60}h review target · pending and queried claims keep ageing</PanelNote>
      </Panel>
    </div>
  );
};
