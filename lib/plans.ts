export type Plan = "free" | "basic" | "pro";

export const PLAN_LIMITS: Record<Plan, { maxActiveLitters: number; label: string }> = {
  free: { maxActiveLitters: 1, label: "Free" },
  basic: { maxActiveLitters: 3, label: "Basic" },
  pro: { maxActiveLitters: Infinity, label: "Pro" },
};

export const STRIPE_PAYMENT_LINKS = {
  basic: "https://buy.stripe.com/aFa4gz7BNd4B0b30jW3Nm08",
  pro: "https://buy.stripe.com/fZu6oH5tFggNe1TgiU3Nm09",
};

export const STRIPE_PAYMENT_LINK_IDS = {
  basic: "plink_1TCLIADT8EiLsMQhbuqKgWvo",
  pro: "plink_1TCLIGDT8EiLsMQh9iu6RvwL",
};

export function canCreateLitter(plan: string, activeLitterCount: number): boolean {
  const limits = PLAN_LIMITS[(plan as Plan) || "free"];
  return activeLitterCount < limits.maxActiveLitters;
}

export function getUpgradePlan(currentPlan: string): Plan | null {
  if (currentPlan === "free") return "basic";
  if (currentPlan === "basic") return "pro";
  return null;
}
