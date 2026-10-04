export interface StackedSegment {
  label: string;
  value: number;
  color: string;
  /** Optional formatted value for the legend (defaults to `value`). */
  display?: string;
}

/** Single horizontal stacked bar with a two-column legend (pipeline breakdowns). */
export const StackedBar = ({ segments }: { segments: StackedSegment[] }) => {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;

  return (
    <>
      <div className="mx-5 mb-[17px] flex h-2 gap-0.5 overflow-hidden rounded">
        {segments.map((segment) => (
          <span
            key={segment.label}
            title={`${segment.label}: ${segment.display ?? segment.value}`}
            style={{ width: `${(segment.value / total) * 100}%`, background: segment.color }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-[15px] gap-y-2.5 px-5 pb-5 text-xs">
        {segments.map((segment) => (
          <div key={segment.label} className="flex justify-between">
            <span className="flex items-center gap-1.5 text-[#7e8a80]">
              <i className="size-1.5 rounded-sm" style={{ background: segment.color }} />
              {segment.label}
            </span>
            <strong className="font-medium">{segment.display ?? segment.value}</strong>
          </div>
        ))}
      </div>
    </>
  );
};
