import { MetricTile, MetricTileGrid, Panel, PanelHeader, PanelNote, ProgressList } from "../../../components";
import { formatNaira } from "../../../utils/cn";
import { formatPercent } from "../../../utils/csv";
import type { SectionProps } from "../drill";
import { CLAIM_STAGES, percent } from "../metrics";
import { TwoColumn } from "./SectionParts";

const PLANS = ["Basic", "Silver", "Gold", "Premium"] as const;

/** Active principals by plan and claims by pipeline stage. */
export const PlansAndClaims = ({ metrics: m, onDrill }: SectionProps) => (
  <TwoColumn>
    <Panel>
      <PanelHeader title="Members by plan" description="Current active principals; dependants are counted separately" />
      <ProgressList
        items={PLANS.map((plan) => {
          const members = m.activeMembers.filter((record) => record.plan === plan);
          const share = percent(members.length, m.activeMembers.length);
          return {
            label: plan,
            value: `${members.length} · ${formatPercent(share)}`,
            percent: share ?? 0,
            onClick: () => onDrill(`${plan} active principals`, members),
          };
        })}
      />
    </Panel>
    <Panel>
      <PanelHeader
        title="Claims pipeline"
        action={<span className="text-xs text-muted">{m.claims.length} period records</span>}
      />
      <MetricTileGrid>
        {CLAIM_STAGES.map((stage) => {
          const stageClaims = m.claims.filter((record) => record.status === stage);
          return stageClaims.length ? (
            <MetricTile
              key={stage}
              label={stage}
              value={stageClaims.length}
              caption={formatNaira(stageClaims.reduce((t, r) => t + r.amount, 0))}
              onClick={() => onDrill(`${stage} claims`, stageClaims)}
            />
          ) : null;
        })}
      </MetricTileGrid>
      <PanelNote>Each claim sits in exactly one stage. Payables and batches are not added to claim value.</PanelNote>
    </Panel>
  </TwoColumn>
);
