// Sample records used until the Laravel API is connected.
// Shapes mirror what the API is expected to return for list endpoints.

export type RecordType =
  | "member"
  | "dependant"
  | "enrollment"
  | "authorization"
  | "claim"
  | "invoice"
  | "payable"
  | "batch"
  | "ticket"
  | "provider"
  | "corporate"
  | "integration"
  | "user";

export type Priority = "Urgent" | "High" | "Normal";

export interface SampleRecord {
  id: string;
  type: RecordType;
  name: string;
  secondary: string;
  status: string;
  priority: Priority;
  owner: string;
  amount: number;
  /** ISO date the record was received/created. */
  date: string;
  /** Minutes since the request was received, for open work items. */
  ageMinutes?: number;
  plan?: "Basic" | "Silver" | "Gold" | "Premium";
  company?: string;
  providerId?: string;
  channel?: string;
  /** Authorization: minutes from request to decision. */
  decisionMinutes?: number;
  /** Authorization: minutes from request to confirmed access to care. */
  careMinutes?: number;
  /** Enrolment: minutes from application to activation. */
  onboardingMinutes?: number;
  /** Ticket: minutes to first response, and 1–5 satisfaction rating if surveyed. */
  firstResponseMinutes?: number;
  rating?: number;
  /** Staff user: multi-factor authentication confirmed. */
  mfaConfirmed?: boolean;
}

export const RECORD_TYPE_LABELS: Record<RecordType, string> = {
  member: "Member",
  dependant: "Dependant",
  enrollment: "Enrolment review",
  authorization: "Authorization review",
  claim: "Claim adjudication",
  invoice: "Premium collection",
  payable: "Claim payable",
  batch: "Settlement approval",
  ticket: "Support request",
  provider: "Provider",
  corporate: "Account renewal",
  integration: "Integration",
  user: "Staff user",
};

/** Module route for each record type, used by search and notifications. */
export const RECORD_TYPE_PATHS: Record<RecordType, string> = {
  member: "/members",
  dependant: "/dependants",
  enrollment: "/enrollment",
  authorization: "/authorizations",
  claim: "/claims",
  invoice: "/billing",
  payable: "/payables",
  batch: "/batches",
  ticket: "/support",
  provider: "/providers",
  corporate: "/corporate",
  integration: "/integrations",
  user: "/settings",
};

export const COMPANIES = ["Northstar Logistics", "Brightpath Energy", "Kestrel Foods"] as const;

export const CURRENT_USER = { name: "Amaka Eze", role: "Super Administrator" };

export const SAMPLE_RECORDS: SampleRecord[] = [
  // Members
  { id: "LMR-0001842", type: "member", name: "Chinedu Okafor", secondary: "Gold · Northstar Logistics", status: "Active", priority: "Normal", owner: "Member services", amount: 0, date: "2026-09-02", plan: "Gold", company: "Northstar Logistics", providerId: "PRV-001" },
  { id: "LMR-0001843", type: "member", name: "Funmilayo Adeyemi", secondary: "Premium · Brightpath Energy", status: "Active", priority: "Normal", owner: "Member services", amount: 0, date: "2026-09-04", plan: "Premium", company: "Brightpath Energy", providerId: "PRV-002" },
  { id: "LMR-0001844", type: "member", name: "Ibrahim Musa", secondary: "Silver · Northstar Logistics", status: "Active", priority: "Normal", owner: "Member services", amount: 0, date: "2026-09-06", plan: "Silver", company: "Northstar Logistics", providerId: "PRV-003" },
  { id: "LMR-0001845", type: "member", name: "Ngozi Eze", secondary: "Gold · Kestrel Foods", status: "Active", priority: "Normal", owner: "Member services", amount: 0, date: "2026-09-10", plan: "Gold", company: "Kestrel Foods", providerId: "PRV-001" },
  { id: "LMR-0001846", type: "member", name: "Tunde Bakare", secondary: "Basic · Individual", status: "Active", priority: "Normal", owner: "Member services", amount: 0, date: "2026-09-12", plan: "Basic", company: "Individual", providerId: "PRV-002" },
  { id: "LMR-0001847", type: "member", name: "Aisha Bello", secondary: "Silver · Brightpath Energy", status: "Pending", priority: "High", owner: "Member services", amount: 0, date: "2026-09-29", plan: "Silver", company: "Brightpath Energy" },
  { id: "LMR-0001848", type: "member", name: "Emeka Nwosu", secondary: "Gold · Kestrel Foods", status: "Suspended", priority: "Normal", owner: "Member services", amount: 0, date: "2026-08-20", plan: "Gold", company: "Kestrel Foods" },
  { id: "LMR-D-00412", type: "dependant", name: "Ada Okafor", secondary: "Dependant of Chinedu Okafor", status: "Active", priority: "Normal", owner: "Member services", amount: 0, date: "2026-09-02", company: "Northstar Logistics" },
  { id: "LMR-D-00413", type: "dependant", name: "Zainab Musa", secondary: "Dependant of Ibrahim Musa", status: "Active", priority: "Normal", owner: "Member services", amount: 0, date: "2026-09-06", company: "Northstar Logistics" },

  // Enrolment applications
  { id: "ENR-2026-118", type: "enrollment", name: "Aisha Bello", secondary: "Corporate roster · Brightpath Energy", status: "Pending", priority: "High", owner: "Enrolment team", amount: 0, date: "2026-10-01", ageMinutes: 2880, channel: "Corporate roster", company: "Brightpath Energy" },
  { id: "ENR-2026-117", type: "enrollment", name: "Kelechi Obi", secondary: "Enrollee app · Individual", status: "Approved", priority: "Normal", owner: "Enrolment team", amount: 0, date: "2026-09-30", channel: "Enrollee app", company: "Individual", onboardingMinutes: 1440 },
  { id: "ENR-2026-116", type: "enrollment", name: "Grace Akpan", secondary: "Enrollee app · Individual", status: "Queried", priority: "Normal", owner: "Enrolment team", amount: 0, date: "2026-09-28", ageMinutes: 7200, channel: "Enrollee app", company: "Individual" },
  { id: "ENR-2026-115", type: "enrollment", name: "Samuel Etim", secondary: "Corporate roster · Kestrel Foods", status: "Approved", priority: "Normal", owner: "Enrolment team", amount: 0, date: "2026-09-27", channel: "Corporate roster", company: "Kestrel Foods", onboardingMinutes: 2160 },
  { id: "ENR-2026-114", type: "enrollment", name: "Halima Yusuf", secondary: "Agent assisted · Northstar Logistics", status: "Approved", priority: "Normal", owner: "Enrolment team", amount: 0, date: "2026-09-25", channel: "Agent assisted", company: "Northstar Logistics", onboardingMinutes: 2880 },

  // Authorizations (care requests)
  { id: "AUTH-30921", type: "authorization", name: "Ngozi Eze", secondary: "MRI scan · Lagoon Specialist Hospital", status: "Pending", priority: "Urgent", owner: "Medical review", amount: 65000, date: "2026-10-03", ageMinutes: 24, providerId: "PRV-001", company: "Kestrel Foods" },
  { id: "AUTH-30920", type: "authorization", name: "Chinedu Okafor", secondary: "Outpatient consultation · Lagoon Specialist Hospital", status: "Pending", priority: "High", owner: "Medical review", amount: 18500, date: "2026-10-03", ageMinutes: 8, providerId: "PRV-001", company: "Northstar Logistics" },
  { id: "AUTH-30919", type: "authorization", name: "Funmilayo Adeyemi", secondary: "Physiotherapy · Cedar Clinic Abuja", status: "Queried", priority: "Normal", owner: "Medical review", amount: 42000, date: "2026-10-02", ageMinutes: 95, providerId: "PRV-002", company: "Brightpath Energy" },
  { id: "AUTH-30918", type: "authorization", name: "Ibrahim Musa", secondary: "Lab panel · Harbour Medical Centre", status: "Approved", priority: "Normal", owner: "Medical review", amount: 21000, date: "2026-10-01", providerId: "PRV-003", company: "Northstar Logistics", decisionMinutes: 6.5, careMinutes: 8.2 },
  { id: "AUTH-30917", type: "authorization", name: "Tunde Bakare", secondary: "Dental review · Cedar Clinic Abuja", status: "Approved", priority: "Normal", owner: "Medical review", amount: 15000, date: "2026-09-30", providerId: "PRV-002", company: "Individual", decisionMinutes: 9, careMinutes: 11 },
  { id: "AUTH-30916", type: "authorization", name: "Chinedu Okafor", secondary: "Specialist referral · Lagoon Specialist Hospital", status: "Approved", priority: "Normal", owner: "Medical review", amount: 30000, date: "2026-09-29", providerId: "PRV-001", company: "Northstar Logistics", decisionMinutes: 12, careMinutes: 9.5 },

  // Claims
  { id: "CLM-88412", type: "claim", name: "Lagoon Specialist Hospital", secondary: "Ngozi Eze · Diagnostic imaging", status: "Pending", priority: "High", owner: "Claims team", amount: 184000, date: "2026-10-02", ageMinutes: 3300, providerId: "PRV-001", company: "Kestrel Foods" },
  { id: "CLM-88411", type: "claim", name: "Cedar Clinic Abuja", secondary: "Funmilayo Adeyemi · Physiotherapy", status: "Queried", priority: "Normal", owner: "Claims team", amount: 96000, date: "2026-09-30", ageMinutes: 4400, providerId: "PRV-002", company: "Brightpath Energy" },
  { id: "CLM-88410", type: "claim", name: "Harbour Medical Centre", secondary: "Ibrahim Musa · Lab panel", status: "Approved", priority: "Normal", owner: "Claims team", amount: 21000, date: "2026-10-01", providerId: "PRV-003", company: "Northstar Logistics" },
  { id: "CLM-88409", type: "claim", name: "Lagoon Specialist Hospital", secondary: "Chinedu Okafor · Specialist consultation", status: "Payment ready", priority: "Normal", owner: "Claims team", amount: 48500, date: "2026-09-29", providerId: "PRV-001", company: "Northstar Logistics" },
  { id: "CLM-88408", type: "claim", name: "Cedar Clinic Abuja", secondary: "Tunde Bakare · Dental review", status: "Paid", priority: "Normal", owner: "Claims team", amount: 15000, date: "2026-09-27", providerId: "PRV-002", company: "Individual" },
  { id: "CLM-88407", type: "claim", name: "Harbour Medical Centre", secondary: "Emeka Nwosu · Emergency care", status: "Rejected", priority: "Normal", owner: "Claims team", amount: 120000, date: "2026-09-26", providerId: "PRV-003", company: "Kestrel Foods" },

  // Finance
  { id: "INV-2026-031", type: "invoice", name: "Northstar Logistics", secondary: "Q4 premium invoice", status: "Outstanding", priority: "Normal", owner: "Finance", amount: 4200000, date: "2026-09-15", company: "Northstar Logistics" },
  { id: "INV-2026-030", type: "invoice", name: "Kestrel Foods", secondary: "September premium invoice", status: "Overdue", priority: "High", owner: "Finance", amount: 1850000, date: "2026-09-01", ageMinutes: 46080, company: "Kestrel Foods" },
  { id: "INV-2026-029", type: "invoice", name: "Brightpath Energy", secondary: "Q4 premium invoice", status: "Paid", priority: "Normal", owner: "Finance", amount: 3600000, date: "2026-09-05", company: "Brightpath Energy" },
  { id: "PAY-5521", type: "payable", name: "Lagoon Specialist Hospital", secondary: "CLM-88409", status: "Payment ready", priority: "Normal", owner: "Finance maker", amount: 48500, date: "2026-09-30", providerId: "PRV-001" },
  { id: "BAT-0091", type: "batch", name: "September provider settlement", secondary: "Awaiting independent approval", status: "Awaiting approval", priority: "High", owner: "Finance maker", amount: 735000, date: "2026-09-30", ageMinutes: 4300 },

  // Support
  { id: "TKT-4410", type: "ticket", name: "Funmilayo Adeyemi", secondary: "Card not showing in app", status: "Escalated", priority: "Urgent", owner: "Support", amount: 0, date: "2026-10-03", ageMinutes: 75, firstResponseMinutes: 70 },
  { id: "TKT-4409", type: "ticket", name: "Cedar Clinic Abuja", secondary: "Tariff query on physiotherapy", status: "Open", priority: "Normal", owner: "Support", amount: 0, date: "2026-10-02", ageMinutes: 1300, firstResponseMinutes: 35 },
  { id: "TKT-4408", type: "ticket", name: "Ibrahim Musa", secondary: "Dependant added incorrectly", status: "Resolved", priority: "Normal", owner: "Support", amount: 0, date: "2026-09-30", firstResponseMinutes: 22, rating: 4.6 },

  // Providers
  { id: "PRV-001", type: "provider", name: "Lagoon Specialist Hospital", secondary: "Lagos · Tertiary", status: "Active", priority: "Normal", owner: "Network team", amount: 0, date: "2025-01-10" },
  { id: "PRV-002", type: "provider", name: "Cedar Clinic Abuja", secondary: "FCT · Secondary", status: "Active", priority: "Normal", owner: "Network team", amount: 0, date: "2025-03-02" },
  { id: "PRV-003", type: "provider", name: "Harbour Medical Centre", secondary: "Lagos · Secondary", status: "Active", priority: "Normal", owner: "Network team", amount: 0, date: "2025-05-18" },
  { id: "PRV-004", type: "provider", name: "Garden City Hospital", secondary: "Rivers · Secondary", status: "Pending", priority: "Normal", owner: "Network team", amount: 0, date: "2026-09-20" },

  // Corporate accounts
  { id: "CORP-012", type: "corporate", name: "Kestrel Foods", secondary: "Renews 31 Oct 2026", status: "Expiring", priority: "High", owner: "Account management", amount: 22000000, date: "2025-10-31", ageMinutes: 2000 },

  // Integrations
  { id: "INT-01", type: "integration", name: "Enrollee app", secondary: "Coverage, digital card and care requests", status: "Operational", priority: "Normal", owner: "Platform", amount: 0, date: "2026-01-01" },
  { id: "INT-02", type: "integration", name: "Provider portal", secondary: "Eligibility checks and claim submission", status: "Operational", priority: "Normal", owner: "Platform", amount: 0, date: "2026-01-01" },
  { id: "INT-03", type: "integration", name: "Payment gateway", secondary: "Premium collection and settlement receipts", status: "Attention", priority: "Normal", owner: "Platform", amount: 0, date: "2026-01-01" },

  // Staff
  { id: "USR-01", type: "user", name: "Amaka Eze", secondary: "Super Administrator", status: "Active", priority: "Normal", owner: "People", amount: 0, date: "2026-01-01", mfaConfirmed: true },
  { id: "USR-02", type: "user", name: "Dr. Bayo Adeleke", secondary: "Medical Reviewer", status: "Active", priority: "Normal", owner: "People", amount: 0, date: "2026-01-01", mfaConfirmed: true },
  { id: "USR-03", type: "user", name: "Kemi Lawal", secondary: "Finance Approver", status: "Active", priority: "Normal", owner: "People", amount: 0, date: "2026-02-01", mfaConfirmed: false },
  { id: "USR-04", type: "user", name: "Yusuf Danjuma", secondary: "Support Agent", status: "Pending", priority: "Normal", owner: "People", amount: 0, date: "2026-09-28" },
];

const OPEN_STATUSES = ["Pending", "Queried", "Open", "Escalated", "Awaiting approval", "Expiring", "Overdue"];

/** Records that need someone to act, ordered by priority then age (oldest first). */
export const getWorkQueue = (records: SampleRecord[] = SAMPLE_RECORDS) => {
  const rank: Record<Priority, number> = { Urgent: 0, High: 1, Normal: 2 };
  return records
    .filter((record) => OPEN_STATUSES.includes(record.status) && !["member", "provider", "user"].includes(record.type))
    .sort((a, b) => rank[a.priority] - rank[b.priority] || (b.ageMinutes ?? 0) - (a.ageMinutes ?? 0));
};

export const SAMPLE_AUDIT = [
  "AUTH-30918 approved by Dr. Bayo Adeleke · eligibility and tariff confirmed",
  "CLM-88409 moved to Payment ready by Claims team",
  "BAT-0091 prepared by Finance maker · awaiting independent approval",
  "ENR-2026-117 approved · coverage activated for Kelechi Obi",
  "TKT-4410 escalated to Support lead · first response target missed",
];
