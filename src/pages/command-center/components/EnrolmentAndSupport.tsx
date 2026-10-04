import { LuLifeBuoy } from "react-icons/lu";
import { MiniStatGrid, Panel, PanelHeader, PanelNote, ProgressList } from "../../../components";
import { formatDuration, formatPercent } from "../../../utils/csv";
import type { SectionProps } from "../drill";
import { percent } from "../metrics";
import { DrillStat, PanelIcon, TwoColumn } from "./SectionParts";

interface EnrolmentAndSupportProps extends SectionProps {
  showEnrolment: boolean;
}

/** Enrolment channels (optional) and customer experience. */
export const EnrolmentAndSupport = ({ metrics: m, onDrill, showEnrolment }: EnrolmentAndSupportProps) => {
  const channels = [...new Set(m.enrolments.map((record) => record.channel ?? "Unspecified"))];

  return (
    <TwoColumn>
      {showEnrolment && (
        <Panel>
          <PanelHeader
            title="Enrolment performance & channels"
            action={<span className="text-xs text-muted">{m.enrolments.length} applications</span>}
          />
          <MiniStatGrid>
            <DrillStat label="Approved" value={m.completedEnrolments.length} records={m.completedEnrolments} onDrill={onDrill} />
            <DrillStat
              label="Completion rate"
              value={formatPercent(percent(m.completedEnrolments.length, m.enrolments.length))}
              records={m.completedEnrolments}
              onDrill={onDrill}
            />
          </MiniStatGrid>
          <ProgressList
            items={channels.map((channel) => {
              const channelRecords = m.enrolments.filter((record) => (record.channel ?? "Unspecified") === channel);
              const share = percent(channelRecords.length, m.enrolments.length);
              return {
                label: channel,
                value: `${channelRecords.length} · ${formatPercent(share)}`,
                percent: share ?? 0,
                onClick: () => onDrill(`${channel} applications`, channelRecords),
              };
            })}
          />
        </Panel>
      )}
      <Panel>
        <PanelHeader title="Customer experience" action={<PanelIcon><LuLifeBuoy size={20} /></PanelIcon>} />
        <MiniStatGrid>
          <DrillStat label="Open support" value={m.openTickets.length} records={m.openTickets} onDrill={onDrill} />
          <DrillStat label="Escalated" value={m.escalatedTickets.length} records={m.escalatedTickets} onDrill={onDrill} />
          <DrillStat label="First response average" value={formatDuration(m.firstResponse)} records={m.openTickets} onDrill={onDrill} />
          <DrillStat label="Satisfaction responses" value={m.csatResponses} records={m.openTickets} onDrill={onDrill} />
        </MiniStatGrid>
        <PanelNote>Satisfaction shows its response count; unanswered surveys are not counted as positive.</PanelNote>
      </Panel>
    </TwoColumn>
  );
};
