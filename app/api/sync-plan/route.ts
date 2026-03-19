import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { breeders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkPaidPlan } from "@/lib/pro-access";

export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [breeder] = await db
    .select({ email: breeders.email, plan: breeders.plan })
    .from(breeders)
    .where(eq(breeders.id, session.breederId))
    .limit(1);

  if (!breeder) {
    return NextResponse.json({ error: "Breeder not found" }, { status: 404 });
  }

  const verifiedPlan = await checkPaidPlan(breeder.email);

  // Update DB if plan changed (upgrade only — don't downgrade without explicit cancel)
  if (verifiedPlan !== "free" && verifiedPlan !== breeder.plan) {
    await db
      .update(breeders)
      .set({ plan: verifiedPlan })
      .where(eq(breeders.id, session.breederId));
  }

  const effectivePlan = verifiedPlan !== "free" ? verifiedPlan : breeder.plan;

  return NextResponse.json({ plan: effectivePlan });
}
