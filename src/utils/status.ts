export type BadgeTone = "green" | "red" | "amber" | "neutral";

const GREEN_STATUSES = [
  "Active", "Approved", "Paid", "Matched", "Resolved", "Operational",
  "Completed", "Confirmed", "Sent", "Payment ready", "Attached",
];
const RED_STATUSES = ["Rejected", "Suspended", "Overdue", "Urgent", "Exception", "Critical", "Missing"];
const AMBER_STATUSES = [
  "Queried", "Pending", "Expiring", "High", "Attention", "Awaiting approval",
  "Open", "Review", "Investigating", "Escalated",
];

/** Maps a record status or priority to a badge colour. Unknown values are neutral. */
export const getStatusTone = (status: string): BadgeTone => {
  if (GREEN_STATUSES.includes(status)) return "green";
  if (RED_STATUSES.includes(status)) return "red";
  if (AMBER_STATUSES.includes(status)) return "amber";
  return "neutral";
};
