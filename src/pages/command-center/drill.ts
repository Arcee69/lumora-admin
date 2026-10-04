import { IMPLEMENTED_PATHS } from "../../constants/navigation";
import { RECORD_TYPE_PATHS } from "../../data/sampleRecords";
import type { SampleRecord } from "../../data/sampleRecords";
import type { CommandCenterMetrics } from "./metrics";

/** The records behind a figure, shown in the drill-down modal. */
export interface DrillDown {
  title: string;
  note?: string;
  records: SampleRecord[];
}

export type OpenDrill = (title: string, records: SampleRecord[], note?: string) => void;

/**
 * The built page that lists every one of these records, if there is one.
 * Mixed record types, or a type whose page is not built yet, return undefined so the modal is used instead.
 */
export const drillPagePath = (records: SampleRecord[]) => {
  const paths = new Set(records.map((record) => RECORD_TYPE_PATHS[record.type]));
  const [path] = paths;
  return paths.size === 1 && IMPLEMENTED_PATHS.has(path) ? path : undefined;
};

/** Props shared by every dashboard section. */
export interface SectionProps {
  metrics: CommandCenterMetrics;
  onDrill: OpenDrill;
}
