import {
  LuActivity,
  LuChartColumn,
  LuFileText,
  LuHeartPulse,
  LuLandmark,
  LuLifeBuoy,
  LuUsers,
  LuWallet,
} from "react-icons/lu";
import { StatCard, StatsGrid } from "../../../components";
import { formatNaira } from "../../../utils/cn";
import { formatDuration, formatPercent } from "../../../utils/csv";
import type { SectionProps } from "../drill";
import { TARGETS } from "../metrics";

export const KpiCards = ({ metrics: m, onDrill }: SectionProps) => (
  <StatsGrid className="xl:grid-cols-4">
    <StatCard
      label="Active enrollees"
      icon={<LuUsers size={18} />}
      value={m.activeMembers.length + m.activeDependants.length}
      description={`${m.activeMembers.length} principals · ${m.activeDependants.length} dependants`}
      actionLabel="View supporting records"
      onClick={() => onDrill("Active enrollees", [...m.activeMembers, ...m.activeDependants])}
    />
    <StatCard
      label="Enrolment applications"
      icon={<LuFileText size={18} />}
      value={m.enrolments.length}
      description={`${m.completedEnrolments.length} approved · ${m.enrolmentQueries.length} queried`}
      actionLabel="View supporting records"
      onClick={() => onDrill("Enrolment applications", m.enrolments)}
    />
    <StatCard
      label="Premium collected"
      icon={<LuWallet size={18} />}
      value={formatNaira(m.collected)}
      description={`${formatPercent(m.collectionRate)} of period invoices collected`}
      actionLabel="View supporting records"
      onClick={() => onDrill("Premium invoices", m.invoices)}
    />
    <StatCard
      label="Claims submitted"
      icon={<LuActivity size={18} />}
      value={m.claims.length}
      description={`${m.openClaims.length} awaiting adjudication`}
      actionLabel="View supporting records"
      onClick={() => onDrill("Claims submitted", m.claims)}
    />
    <StatCard
      label="Submitted claim value"
      icon={<LuChartColumn size={18} />}
      value={formatNaira(m.submittedValue)}
      description={`${formatNaira(m.incurred)} adjudicated`}
      actionLabel="View supporting records"
      onClick={() => onDrill("Submitted claim value", m.claims)}
    />
    <StatCard
      label="Medical expense ratio"
      icon={<LuLandmark size={18} />}
      value={formatPercent(m.medicalExpenseRatio)}
      description="Adjudicated claims ÷ premium collected in the period"
      actionLabel="View supporting records"
      onClick={() => onDrill("Adjudicated claims", m.incurredClaims)}
    />
    <StatCard
      label="Avg authorization decision"
      icon={<LuHeartPulse size={18} />}
      value={formatDuration(m.avgDecision)}
      description={`${formatPercent(m.authSla)} decided within the ${TARGETS.authorization}m target`}
      actionLabel="View supporting records"
      onClick={() => onDrill("Timed authorization decisions", m.authorizations.filter((r) => r.decisionMinutes != null))}
    />
    <StatCard
      label="Member satisfaction"
      icon={<LuLifeBuoy size={18} />}
      value={m.csat == null ? "Not recorded" : `${m.csat.toFixed(1)} / 5`}
      description={`${m.csatResponses} survey response${m.csatResponses === 1 ? "" : "s"}`}
      actionLabel="View supporting records"
      onClick={() => onDrill("Support tickets", m.openTickets)}
    />
  </StatsGrid>
);
