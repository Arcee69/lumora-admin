import type { IconType } from "react-icons";
import {
  LuHeartPulse,
  LuLandmark,
  LuLayoutDashboard,
  LuShieldCheck,
  LuUsers,
} from "react-icons/lu";

export interface NavItem {
  id: string;
  label: string;
  path: string;
}

export interface NavGroup {
  label: string;
  icon: IconType;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "WORKSPACE",
    icon: LuLayoutDashboard,
    items: [
      { id: "overview", label: "Command centre", path: "/command-center" },
      { id: "work", label: "My work queue", path: "/work" },
    ],
  },
  {
    label: "MEMBER OPERATIONS",
    icon: LuUsers,
    items: [
      { id: "members", label: "Members", path: "/members" },
      { id: "enrollment", label: "Enrolment & exceptions", path: "/enrollment" },
      { id: "eligibility", label: "Eligibility verification", path: "/eligibility" },
      { id: "dependants", label: "Family & dependants", path: "/dependants" },
      { id: "changes", label: "Member change requests", path: "/changes" },
      { id: "faststart", label: "FastStart onboarding", path: "/faststart" },
    ],
  },
  {
    label: "CARE & NETWORK",
    icon: LuHeartPulse,
    items: [
      { id: "providers", label: "Provider network", path: "/providers" },
      { id: "contracts", label: "Contracts & tariffs", path: "/contracts" },
      { id: "authorizations", label: "Authorizations", path: "/authorizations" },
      { id: "referrals", label: "Referrals & care", path: "/referrals" },
      { id: "claims", label: "Claims & adjudication", path: "/claims" },
      { id: "risk", label: "Fraud & risk", path: "/risk" },
    ],
  },
  {
    label: "COMMERCIAL & FINANCE",
    icon: LuLandmark,
    items: [
      { id: "corporate", label: "Corporate accounts", path: "/corporate" },
      { id: "plans", label: "Plans & benefits", path: "/plans" },
      { id: "billing", label: "Premiums & billing", path: "/billing" },
      { id: "payables", label: "Claim payables", path: "/payables" },
      { id: "batches", label: "Payment batches", path: "/batches" },
      { id: "reconciliation", label: "Reconciliation", path: "/reconciliation" },
    ],
  },
  {
    label: "EXPERIENCE & GOVERNANCE",
    icon: LuShieldCheck,
    items: [
      { id: "support", label: "Support & complaints", path: "/support" },
      { id: "communications", label: "Communications", path: "/communications" },
      { id: "analytics", label: "Intelligence & reports", path: "/analytics" },
      { id: "compliance", label: "Compliance & consent", path: "/compliance" },
      { id: "audit", label: "Audit trail", path: "/audit" },
      { id: "settings", label: "People & permissions", path: "/settings" },
      { id: "security", label: "Security & privacy", path: "/security" },
      { id: "integrations", label: "Integrations", path: "/integrations" },
    ],
  },
];

/**
 * Paths that have a real page in `src/routers/index.tsx`; every other nav path renders the placeholder.
 * Add a path here when its page is routed.
 */
export const IMPLEMENTED_PATHS: ReadonlySet<string> = new Set(["/command-center", "/members"]);

export const findNavItem = (pathname: string) => {
  for (const group of NAV_GROUPS) {
    const item = group.items.find((entry) => pathname.startsWith(entry.path));
    if (item) return { group, item };
  }
  return undefined;
};
