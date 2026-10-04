import { getWorkQueue } from "../../data/sampleRecords";
import type { RecordType, SampleRecord } from "../../data/sampleRecords";

export const PERIODS = ["All records", "Today", "Last 7 days", "This month"] as const;
export type Period = (typeof PERIODS)[number];

export interface Scope {
  period: Period;
  company: string;
}

/** Service targets in minutes. */
export const TARGETS = { authorization: 10, claim: 48 * 60, ticket: 60 };

export const CLAIM_STAGES = ["Pending", "Queried", "Approved", "Payment ready", "Paid", "Rejected"] as const;

const DAY_MS = 86_400_000;
const toDay = (date: Date) => date.toISOString().slice(0, 10);

const inPeriod = (isoDate: string, period: Period, today: Date) => {
  const todayKey = toDay(today);
  switch (period) {
    case "Today":
      return isoDate === todayKey;
    case "Last 7 days":
      return isoDate > toDay(new Date(today.getTime() - 7 * DAY_MS)) && isoDate <= todayKey;
    case "This month":
      return isoDate.slice(0, 7) === todayKey.slice(0, 7);
    default:
      return true;
  }
};

const sum = (records: SampleRecord[]) => records.reduce((total, record) => total + record.amount, 0);
const average = (values: number[]) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : null);
export const percent = (part: number, whole: number) => (whole ? (part / whole) * 100 : null);

export const buildMetrics = (records: SampleRecord[], scope: Scope, today = new Date()) => {
  // Company scope applies to everything; period applies only to activity (not current snapshot figures).
  const scoped =
    scope.company === "All companies"
      ? records
      : records.filter((record) => record.company === scope.company || ["provider", "integration", "user"].includes(record.type));
  const inScope = scoped.filter((record) => inPeriod(record.date, scope.period, today));

  const by = (type: RecordType) => scoped.filter((record) => record.type === type);
  const periodBy = (type: RecordType) => inScope.filter((record) => record.type === type);
  const isOpen = (record: SampleRecord) => ["Pending", "Queried", "Open", "Escalated"].includes(record.status);

  const activeMembers = by("member").filter((record) => record.status === "Active");
  const activeDependants = by("dependant").filter((record) => record.status === "Active");

  const authorizations = periodBy("authorization");
  const openAuthorizations = by("authorization").filter(isOpen);
  const authOverdue = openAuthorizations.filter((record) => (record.ageMinutes ?? 0) > TARGETS.authorization);
  const timedAuthorizations = authorizations.filter((record) => record.decisionMinutes != null);
  const decided = authorizations.filter((record) => ["Approved", "Rejected"].includes(record.status));

  const claims = periodBy("claim");
  const openClaims = by("claim").filter(isOpen);
  const claimsOverdue = openClaims.filter((record) => (record.ageMinutes ?? 0) > TARGETS.claim);
  const incurredClaims = claims.filter((record) => ["Approved", "Payment ready", "Paid"].includes(record.status));

  const invoices = by("invoice");
  const periodInvoices = periodBy("invoice");
  const unpaidInvoices = invoices.filter((record) => ["Outstanding", "Overdue"].includes(record.status));
  const overdueInvoices = invoices.filter((record) => record.status === "Overdue");
  const collected = sum(periodInvoices.filter((record) => record.status === "Paid"));
  const collectionRate = percent(collected, sum(periodInvoices));

  const enrolments = periodBy("enrollment");
  const completedEnrolments = enrolments.filter((record) => record.status === "Approved");

  const tickets = by("ticket");
  const openTickets = tickets.filter(isOpen);
  const ratings = tickets.flatMap((record) => (record.rating != null ? [record.rating] : []));

  const providers = by("provider").map((provider) => {
    const providerAuths = authorizations.filter((record) => record.providerId === provider.id);
    const providerClaims = claims.filter((record) => record.providerId === provider.id);
    const providerDecided = providerAuths.filter((record) => ["Approved", "Rejected"].includes(record.status));
    return {
      provider,
      members: activeMembers.filter((record) => record.providerId === provider.id).length,
      careRequests: providerAuths.length,
      claimCount: providerClaims.length,
      claimValue: sum(providerClaims),
      approvalRate: percent(providerDecided.filter((record) => record.status === "Approved").length, providerDecided.length),
      avgDecision: average(providerAuths.flatMap((record) => (record.decisionMinutes != null ? [record.decisionMinutes] : []))),
    };
  });

  const trendDays = Array.from({ length: 7 }, (_, index) => {
    const day = toDay(new Date(today.getTime() - (6 - index) * DAY_MS));
    return {
      day,
      care: authorizations.filter((record) => record.date === day),
      claims: claims.filter((record) => record.date === day),
    };
  });

  const alerts = [
    { title: "Care requests past decision target", rows: authOverdue, severity: "Critical" },
    { title: "Claims past processing target", rows: claimsOverdue, severity: "High" },
    {
      title: "Urgent member support",
      rows: openTickets.filter((record) => record.priority === "Urgent"),
      severity: "High",
    },
    { title: "Overdue premium invoices", rows: overdueInvoices, severity: "High" },
  ].filter((alert) => alert.rows.length);

  const staff = by("user");

  return {
    scoped,
    inScope,
    activeMembers,
    activeDependants,
    pendingMembers: by("member").filter((record) => record.status === "Pending"),
    coverageIssues: by("member").filter((record) => record.status === "Suspended"),

    authorizations,
    openAuthorizations,
    authOverdue,
    authSla: percent(
      timedAuthorizations.filter((record) => (record.decisionMinutes ?? 0) <= TARGETS.authorization).length,
      timedAuthorizations.length,
    ),
    avgDecision: average(timedAuthorizations.map((record) => record.decisionMinutes ?? 0)),
    approvalRate: percent(decided.filter((record) => record.status === "Approved").length, decided.length),
    timeToCare: average(authorizations.flatMap((record) => (record.careMinutes != null ? [record.careMinutes] : []))),
    careSamples: authorizations.filter((record) => record.careMinutes != null),

    claims,
    openClaims,
    claimsOverdue,
    incurredClaims,
    submittedValue: sum(claims),
    incurred: sum(incurredClaims),
    paymentReadyClaims: by("claim").filter((record) => record.status === "Payment ready"),

    invoices,
    unpaidInvoices,
    overdueInvoices,
    outstanding: sum(unpaidInvoices),
    overdueBalance: sum(overdueInvoices),
    collected,
    collectionRate,
    medicalExpenseRatio: percent(sum(incurredClaims), collected),
    renewingAccounts: by("corporate").filter((record) => record.status === "Expiring"),

    payablesReady: by("payable").filter((record) => record.status === "Payment ready"),
    unpaidBatches: by("batch").filter((record) => record.status !== "Paid"),

    enrolments,
    completedEnrolments,
    enrolmentQueries: enrolments.filter((record) => record.status === "Queried"),
    onboardingTime: average(completedEnrolments.flatMap((record) => (record.onboardingMinutes != null ? [record.onboardingMinutes] : []))),

    openTickets,
    escalatedTickets: openTickets.filter((record) => record.status === "Escalated"),
    firstResponse: average(tickets.flatMap((record) => (record.firstResponseMinutes != null ? [record.firstResponseMinutes] : []))),
    csat: average(ratings),
    csatResponses: ratings.length,

    providers,
    activeProviders: providers.filter(({ provider }) => provider.status === "Active"),
    trendDays,
    alerts,
    queue: getWorkQueue(scoped),

    activeStaff: staff.filter((record) => record.status === "Active"),
    mfaMissing: staff.filter((record) => record.status === "Active" && record.mfaConfirmed === false),
    pendingInvites: staff.filter((record) => record.status === "Pending"),
    integrations: by("integration"),
  };
};

export type CommandCenterMetrics = ReturnType<typeof buildMetrics>;
