import type { Dispatch, SetStateAction } from "react";
import { COMPANIES } from "../../../data/sampleRecords";
import { PERIODS } from "../metrics";
import type { Period, Scope } from "../metrics";

interface ScopeControlsProps {
  scope: Scope;
  onScopeChange: Dispatch<SetStateAction<Scope>>;
  snapshotAt: Date;
  periodRecordCount: number;
  currentRecordCount: number;
}

export const ScopeControls = ({
  scope,
  onScopeChange,
  snapshotAt,
  periodRecordCount,
  currentRecordCount,
}: ScopeControlsProps) => (
  <div className="mb-4 flex flex-wrap items-end gap-3.5 rounded-[10px] border border-line bg-white p-3.5 md:px-[18px] md:py-4">
    <ControlSelect
      label="Activity period"
      value={scope.period}
      options={PERIODS}
      onChange={(period) => onScopeChange((current) => ({ ...current, period: period as Period }))}
    />
    <ControlSelect
      label="Corporate account"
      value={scope.company}
      options={["All companies", ...COMPANIES, "Individual"]}
      onChange={(company) => onScopeChange((current) => ({ ...current, company }))}
    />
    <div className="w-full text-xs text-muted md:ml-auto md:w-auto md:text-right">
      <b className="text-ink">
        As of{" "}
        {snapshotAt.toLocaleTimeString("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit" })}{" "}
        WAT · {snapshotAt.toISOString().slice(0, 10)}
      </b>
      <span className="mt-1 block">
        {periodRecordCount} period records · {currentRecordCount} current records in scope
      </span>
    </div>
  </div>
);

interface ControlSelectProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}

const ControlSelect = ({ label, value, options, onChange }: ControlSelectProps) => (
  <label className="flex min-w-[140px] flex-1 flex-col gap-1.5 text-sm font-medium md:flex-none">
    {label}
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-10 w-full rounded-md border border-[#d8e3d5] bg-[#f9fbf8] px-2.5 py-2 font-normal md:w-auto md:max-w-[260px]"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </label>
);
