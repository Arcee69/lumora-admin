import { Button, HighlightStrip, Panel, PanelHeader, PanelNote, TrendBars, TrendLegend } from "../../../components";
import type { TrendSeries } from "../../../components";
import { formatDuration } from "../../../utils/csv";
import type { SectionProps } from "../drill";
import { TARGETS } from "../metrics";

const TREND_SERIES: TrendSeries[] = [
  { key: "care", label: "Care requests", color: "#166b53" },
  { key: "claims", label: "Claims submitted", color: "#cfb874" },
];

/** Time-to-care highlight strip followed by the seven-day care & claims trend. */
export const CareTiming = ({ metrics: m, onDrill }: SectionProps) => (
  <>
    <HighlightStrip
      eyebrow="LUMORA TIME TO CARE"
      headline={{
        value: formatDuration(m.timeToCare),
        caption: `Request received → confirmed access · ${m.careSamples.length} measured case${m.careSamples.length === 1 ? "" : "s"}`,
      }}
      items={[
        {
          label: `Target < ${TARGETS.authorization} minutes`,
          value:
            m.timeToCare == null
              ? "Connect care-confirmation events"
              : m.timeToCare < TARGETS.authorization
                ? "Within target for measured cases"
                : "Measured cases exceed target",
        },
        {
          label: `Onboarding ${formatDuration(m.onboardingTime)}`,
          value: "Tracked separately from care-request timing",
        },
      ]}
      action={
        <Button variant="light" onClick={() => onDrill("Time-to-care samples", m.careSamples)}>
          Inspect timing
        </Button>
      }
    />

    <Panel className="mb-5">
      <PanelHeader
        title="Daily care & claims activity"
        description="Last seven days, within the selected period and corporate account."
        action={<TrendLegend series={TREND_SERIES} />}
      />
      <TrendBars
        series={TREND_SERIES}
        data={m.trendDays.map((day) => ({
          label: day.day.slice(5),
          values: { care: day.care.length, claims: day.claims.length },
        }))}
        onBarClick={(point, series) => {
          const day = m.trendDays.find((entry) => entry.day.slice(5) === point.label);
          if (day) onDrill(`${series.label} · ${day.day}`, series.key === "care" ? day.care : day.claims);
        }}
      />
      <PanelNote>Counts are recorded requests and submissions, not confirmed visits.</PanelNote>
    </Panel>
  </>
);
