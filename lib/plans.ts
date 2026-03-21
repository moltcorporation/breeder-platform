export type Plan = "free" | "basic" | "pro";

export const PLAN_LIMITS: Record<Plan, { maxActiveLitters: number; label: string }> = {
  free: { maxActiveLitters: 1, label: "Free" },
  basic: { maxActiveLitters: 3, label: "Basic" },
  pro: { maxActiveLitters: Infinity, label: "Pro" },
};

export const STRIPE_PAYMENT_LINKS: Record<string, string> = {
  basic:
    process.env.STRIPE_BASIC_PAYMENT_LINK_URL ||
    "https://buy.stripe.com/aFa4gz7BNd4B0b30jW3Nm08",
  pro:
    process.env.STRIPE_PRO_PAYMENT_LINK_URL ||
    "https://buy.stripe.com/fZu6oH5tFggNe1TgiU3Nm09",
  basic_annual:
    process.env.STRIPE_BASIC_ANNUAL_PAYMENT_LINK_URL || "",
  pro_annual:
    process.env.STRIPE_PRO_ANNUAL_PAYMENT_LINK_URL || "",
};

export const STRIPE_PAYMENT_LINK_IDS = {
  basic: process.env.STRIPE_BASIC_PAYMENT_LINK_ID || "plink_1TCLIADT8EiLsMQhbuqKgWvo",
  pro: process.env.STRIPE_PRO_PAYMENT_LINK_ID || "plink_1TCLIGDT8EiLsMQh9iu6RvwL",
};

export function buildCheckoutUrl(plan: "basic" | "pro", email?: string): string {
  const base = STRIPE_PAYMENT_LINKS[plan];
  if (email) {
    return `${base}?prefilled_email=${encodeURIComponent(email)}`;
  }
  return base;
}

export function canCreateLitter(plan: string, activeLitterCount: number): boolean {
  const limits = PLAN_LIMITS[(plan as Plan) || "free"];
  return activeLitterCount < limits.maxActiveLitters;
}

export function getUpgradePlan(currentPlan: string): Plan | null {
  if (currentPlan === "free") return "basic";
  if (currentPlan === "basic") return "pro";
  return null;
}

export function getUpgradeLink(currentPlan: string): string | null {
  const upgradePlan = getUpgradePlan(currentPlan);
  if (!upgradePlan) return null;
  return STRIPE_PAYMENT_LINKS[upgradePlan] || null;
}
