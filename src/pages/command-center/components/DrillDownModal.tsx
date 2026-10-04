import { useNavigate } from "react-router-dom";
import { ActionRow, EmptyState, Modal, StatusBadge } from "../../../components";
import { RECORD_TYPE_LABELS, RECORD_TYPE_PATHS } from "../../../data/sampleRecords";
import { formatNaira } from "../../../utils/cn";
import type { DrillDown } from "../drill";
import type { Scope } from "../metrics";

interface DrillDownModalProps {
  drill: DrillDown | null;
  scope: Scope;
  onClose: () => void;
}

/** The records behind any figure on the dashboard. */
export const DrillDownModal = ({ drill, scope, onClose }: DrillDownModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal
      open={!!drill}
      onClose={onClose}
      title={drill?.title}
      description={drill ? `${scope.company} · ${scope.period} · ${drill.records.length} supporting records` : undefined}
      size="lg"
    >
      {drill?.note && <p className="pb-4 text-sm leading-[1.8] text-muted">{drill.note}</p>}
      {drill?.records.length ? (
        <div className="-mx-1 pb-2">
          {drill.records.map((record) => (
            <ActionRow
              key={record.id}
              className="px-1 md:px-2"
              title={record.name}
              description={`${record.id} · ${RECORD_TYPE_LABELS[record.type]}${record.amount ? ` · ${formatNaira(record.amount)}` : ""}`}
              meta={<StatusBadge value={record.status} />}
              showChevron
              onClick={() => {
                onClose();
                navigate(RECORD_TYPE_PATHS[record.type]);
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No records in this scope" description="Try a wider period or another corporate account." />
      )}
    </Modal>
  );
};
