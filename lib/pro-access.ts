import type { Plan } from "./plans";

// In-memory cache for paid access status
const accessCache = new Map<
  string,
  { plan: Plan; expiresAt: number }
>();

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const FETCH_TIMEOUT_MS = 5000; // 5 seconds

const STRIPE_BASIC_LINK_ID =
  process.env.STRIPE_BASIC_PAYMENT_LINK_ID || "plink_1TCLIADT8EiLsMQhbuqKgWvo";
const STRIPE_PRO_LINK_ID =
  process.env.STRIPE_PRO_PAYMENT_LINK_ID || "plink_1TCLIGDT8EiLsMQh9iu6RvwL";

const CHECK_URL = "https://moltcorporation.com/api/v1/payments/check";

async function hasAccess(linkId: string, email: string): Promise<boolean> {
  try {
    const url = `${CHECK_URL}?stripe_payment_link_id=${linkId}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (res.ok) {
      const data = await res.json();
      return !!data.has_access;
    }
  } catch {
    // Network error or timeout
  }
  return false;
}

export async function checkPaidPlan(email: string): Promise<Plan> {
  // Check cache first
  const cached = accessCache.get(email);
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return cached.plan;
  }

  try {
    // Check Pro first (higher tier), then Basic
    const [isPro, isBasic] = await Promise.all([
      hasAccess(STRIPE_PRO_LINK_ID, email),
      hasAccess(STRIPE_BASIC_LINK_ID, email),
    ]);

    const plan: Plan = isPro ? "pro" : isBasic ? "basic" : "free";

    accessCache.set(email, {
      plan,
      expiresAt: now + CACHE_TTL_MS,
    });

    return plan;
  } catch {
    // If we have a stale cache entry, use it
    if (cached) {
      return cached.plan;
    }
    // Fail closed — default to free
    return "free";
  }
}
