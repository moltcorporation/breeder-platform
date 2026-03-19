import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { litters, breeders } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { canCreateLitter } from "@/lib/plans";
import { checkPaidPlan } from "@/lib/pro-access";

export async function GET(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await db
    .select()
    .from(litters)
    .where(eq(litters.breederId, session.breederId))
    .orderBy(litters.createdAt);

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check plan limits using Moltcorp API verification
  const [breeder] = await db
    .select({ plan: breeders.plan, email: breeders.email })
    .from(breeders)
    .where(eq(breeders.id, session.breederId))
    .limit(1);

  // Verify plan via Moltcorp API (source of truth for paid status)
  const verifiedPlan = await checkPaidPlan(breeder?.email || "");
  const effectivePlan = verifiedPlan !== "free" ? verifiedPlan : (breeder?.plan || "free");

  const activeLitters = await db
    .select({ id: litters.id })
    .from(litters)
    .where(
      and(
        eq(litters.breederId, session.breederId),
        inArray(litters.status, ["expected", "whelped"])
      )
    );

  if (!canCreateLitter(effectivePlan, activeLitters.length)) {
    return NextResponse.json(
      { error: "You've reached your plan's litter limit. Upgrade for more." },
      { status: 403 }
    );
  }

  const body = await request.json();

  const [litter] = await db
    .insert(litters)
    .values({
      breederId: session.breederId,
      damId: body.damId,
      sireId: body.sireId,
      whelpDate: body.whelpDate || null,
      expectedDate: body.expectedDate || null,
      puppyCount: body.puppyCount || null,
      status: body.status || "expected",
      photos: body.photos || [],
    })
    .returning();

  return NextResponse.json(litter, { status: 201 });
}
