/** Downloads rows as a CSV file. Values starting with = + - @ are prefixed to block formula injection. */
export const downloadCsv = <T extends object>(rows: T[], columns: Array<keyof T & string>, filename: string) => {
  const escape = (value: unknown) =>
    `"${String(value ?? "")
      .replace(/^[=+@-]/, (char) => `'${char}`)
      .replace(/"/g, '""')}"`;

  const csv = [columns.join(","), ...rows.map((row) => columns.map((key) => escape(row[key])).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/** Formats minutes as "45s", "8m 20s", "3.5h" or "2.1 days". */
export const formatDuration = (minutes: number | null | undefined) => {
  if (minutes == null) return "Not recorded";
  if (minutes < 1) return `${Math.round(minutes * 60)}s`;
  if (minutes < 60) return `${Math.floor(minutes)}m ${Math.round((minutes % 1) * 60)}s`;
  if (minutes < 1440) return `${(minutes / 60).toFixed(1)}h`;
  return `${(minutes / 1440).toFixed(1)} days`;
};

export const formatPercent = (value: number | null | undefined) =>
  value == null || Number.isNaN(value) ? "Not available" : `${value.toFixed(1)}%`;
