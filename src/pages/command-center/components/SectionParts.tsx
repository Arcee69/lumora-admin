import type { ReactNode } from "react";
import { MiniStat } from "../../../components";
import type { SampleRecord } from "../../../data/sampleRecords";
import type { OpenDrill } from "../drill";

/** Muted icon for a PanelHeader action slot. */
export const PanelIcon = ({ children }: { children: ReactNode }) => (
  <span className="text-[#668374]">{children}</span>
);

/** Single column on mobile, two equal columns from md up. */
export const TwoColumn = ({ children }: { children: ReactNode }) => (
  <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">{children}</div>
);

interface DrillStatProps {
  label: string;
  value: ReactNode;
  records: SampleRecord[];
  onDrill: OpenDrill;
}

/** MiniStat that opens its supporting records when clicked. */
export const DrillStat = ({ label, value, records, onDrill }: DrillStatProps) => (
  <MiniStat label={label} value={value} onClick={() => onDrill(label, records)} />
);
