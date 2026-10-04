import { useNavigate } from "react-router-dom";
import { LuCircleCheck } from "react-icons/lu";
import { ActionRow, Badge, CountPill, EmptyState, Panel, PanelHeader, TextButton } from "../../../components";
import { RECORD_TYPE_LABELS, RECORD_TYPE_PATHS } from "../../../data/sampleRecords";
import { formatDuration } from "../../../utils/csv";
import type { SectionProps } from "../drill";
import { TwoColumn } from "./SectionParts";

/** Open alerts and the prioritized work queue. Always visible. */
export const AttentionPanels = ({ metrics: m, onDrill }: SectionProps) => {
  const navigate = useNavigate();

  return (
    <TwoColumn>
      <Panel>
        <PanelHeader
          title="Requires attention"
          description="Built from unresolved records; closing the workflow clears the alert."
          action={<CountPill>{m.alerts.length} signals</CountPill>}
        />
        {m.alerts.length ? (
          m.alerts.map((alert) => (
            <ActionRow
              key={alert.title}
              icon={<Badge tone={alert.severity === "Critical" ? "red" : "amber"}>{alert.severity}</Badge>}
              title={alert.title}
              description={`${alert.rows.length} record${alert.rows.length === 1 ? "" : "s"} · owner assigned in each record`}
              showChevron
              onClick={() => onDrill(alert.title, alert.rows)}
            />
          ))
        ) : (
          <EmptyState icon={<LuCircleCheck size={30} />} title="No open alerts in this scope" />
        )}
      </Panel>
      <Panel>
        <PanelHeader
          title="Prioritized work queue"
          description={`${m.queue.length} current items · oldest first within each priority`}
          action={<TextButton onClick={() => onDrill("Current work queue", m.queue)}>View queue</TextButton>}
        />
        {m.queue.slice(0, 5).map((record) => (
          <ActionRow
            key={record.id}
            title={`${RECORD_TYPE_LABELS[record.type]} · ${record.name}`}
            description={`${record.id} · ${record.owner}`}
            onClick={() => navigate(RECORD_TYPE_PATHS[record.type])}
            meta={
              <div className="min-w-23.75">
                <Badge tone={record.priority === "Urgent" ? "red" : "amber"}>{record.priority}</Badge>
                <small className="mt-1.25 block text-xs text-muted">
                  {record.ageMinutes != null ? `${formatDuration(record.ageMinutes)} elapsed` : "Age not recorded"}
                </small>
              </div>
            }
          />
        ))}
      </Panel>
    </TwoColumn>
  );
};
