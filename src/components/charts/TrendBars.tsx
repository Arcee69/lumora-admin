export interface TrendSeries {
  key: string;
  label: string;
  color: string;
}

export interface TrendPoint {
  label: string;
  values: Record<string, number>;
}

interface TrendBarsProps {
  series: TrendSeries[];
  data: TrendPoint[];
  onBarClick?: (point: TrendPoint, series: TrendSeries) => void;
}

export const TrendLegend = ({ series }: { series: TrendSeries[] }) => (
  <span className="flex items-center gap-2 text-xs">
    {series.map((item) => (
      <span key={item.key} className="flex items-center gap-2">
        <i className="size-2.5 rounded-[3px]" style={{ background: item.color }} />
        {item.label}
      </span>
    ))}
  </span>
);

/** Grouped vertical bars per day with value labels ("Daily care & claims activity"). */
export const TrendBars = ({ series, data, onBarClick }: TrendBarsProps) => {
  const max = Math.max(1, ...data.flatMap((point) => series.map((s) => point.values[s.key] ?? 0)));

  return (
    <div
      className="grid gap-2 px-3.5 pb-3 pt-5 md:gap-3.5 md:px-6"
      style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
    >
      {data.map((point) => (
        <div key={point.label} className="text-center">
          <div className="flex h-[120px] items-end justify-center gap-[5px] border-b border-[#dde5df]">
            {series.map((s) => {
              const value = point.values[s.key] ?? 0;
              return (
                <button
                  key={s.key}
                  type="button"
                  aria-label={`${point.label}: ${value} ${s.label.toLowerCase()}`}
                  onClick={onBarClick ? () => onBarClick(point, s) : undefined}
                  className="relative min-h-0.5 w-3.5 rounded-t md:w-[25px]"
                  style={{ height: `${(value / max) * 100}%`, background: s.color }}
                >
                  <span className="absolute inset-x-0 -top-[19px] text-[11px] text-brand-900">{value}</span>
                </button>
              );
            })}
          </div>
          <small className="mt-[9px] block text-[11px] text-[#52635b]">{point.label}</small>
        </div>
      ))}
    </div>
  );
};
