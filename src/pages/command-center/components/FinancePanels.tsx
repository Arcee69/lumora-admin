import { LuLock, LuWallet } from "react-icons/lu";
import { MetricTile, MetricTileGrid, MiniStatGrid, Panel, PanelHeader, PanelNote, ProgressBar } from "../../../components";
import { formatNaira } from "../../../utils/cn";
import { formatPercent } from "../../../utils/csv";
import type { SectionProps } from "../drill";
import { DrillStat, PanelIcon, TwoColumn } from "./SectionParts";

/** Premium receivables and settlement exposure. */
export const FinancePanels = ({ metrics: m, onDrill }: SectionProps) => {
  const awaitingChecker = m.unpaidBatches.filter((r) => r.status === "Awaiting approval");

  return (
    <TwoColumn>
      <Panel>
        <PanelHeader title="Premiums & receivables" action={<PanelIcon><LuWallet size={20} /></PanelIcon>} />
        <MetricTileGrid>
          <MetricTile
            label="Outstanding balance"
            value={formatNaira(m.outstanding)}
            onClick={() => onDrill("Invoices with balances", m.unpaidInvoices)}
          />
          <MetricTile
            label="Overdue balance"
            value={formatNaira(m.overdueBalance)}
            onClick={() => onDrill("Overdue invoices", m.overdueInvoices)}
          />
        </MetricTileGrid>
        <div className="px-[22px] pb-6">
          <div className="mb-3 flex justify-between text-sm">
            <span>Collected on period invoices</span>
            <b>{formatNaira(m.collected)}</b>
          </div>
          <ProgressBar value={m.collectionRate ?? 0} label="Premium collection rate" className="h-2" />
          <small className="mt-[9px] block text-xs text-muted">
            {formatPercent(m.collectionRate)} collected of invoiced · collections are not earned premium
          </small>
        </div>
        <MiniStatGrid>
          <DrillStat label="Invoices with balances" value={m.unpaidInvoices.length} records={m.unpaidInvoices} onDrill={onDrill} />
          <DrillStat label="Accounts renewing" value={m.renewingAccounts.length} records={m.renewingAccounts} onDrill={onDrill} />
        </MiniStatGrid>
      </Panel>
      <Panel>
        <PanelHeader title="Settlement & reconciliation exposure" action={<PanelIcon><LuLock size={20} /></PanelIcon>} />
        <MiniStatGrid>
          <DrillStat
            label="Unbatched payables"
            value={formatNaira(m.payablesReady.reduce((t, r) => t + r.amount, 0))}
            records={m.payablesReady}
            onDrill={onDrill}
          />
          <DrillStat
            label="Unpaid batches"
            value={formatNaira(m.unpaidBatches.reduce((t, r) => t + r.amount, 0))}
            records={m.unpaidBatches}
            onDrill={onDrill}
          />
          <DrillStat label="Awaiting checker" value={awaitingChecker.length} records={awaitingChecker} onDrill={onDrill} />
          <DrillStat label="Payment ready claims" value={m.paymentReadyClaims.length} records={m.paymentReadyClaims} onDrill={onDrill} />
        </MiniStatGrid>
        <PanelNote>
          Unbatched payables and unpaid batches are separate obligations. Every batch needs an independent
          approver, and this dashboard never moves money.
        </PanelNote>
      </Panel>
    </TwoColumn>
  );
};
