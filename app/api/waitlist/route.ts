export const dynamic = "force-dynamic";

import { db } from "@/db";
import { applications, waitlist } from "@/db/schema";
import { eq, and, max } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// POST — approve application and add to waitlist
export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { applicationId } = await request.json();
  if (!applicationId) {
    return NextResponse.json({ error: "applicationId required" }, { status: 400 });
  }

  const [app] = await db
    .select()
    .from(applications)
    .where(
      and(
        eq(applications.id, applicationId),
        eq(applications.breederId, session.breederId)
      )
    );

  if (!app) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  // Get next position
  const [maxPos] = await db
    .select({ value: max(waitlist.position) })
    .from(waitlist)
    .where(eq(waitlist.breederId, session.breederId));

  const nextPosition = (maxPos?.value ?? 0) + 1;

  // Update application status
  await db
    .update(applications)
    .set({ status: "approved" })
    .where(eq(applications.id, applicationId));

  // Add to waitlist
  const [entry] = await db
    .insert(waitlist)
    .values({
      breederId: session.breederId,
      applicationId,
      position: nextPosition,
    })
    .returning();

  return NextResponse.json(entry, { status: 201 });
}

// PATCH — update waitlist entry (reorder, assign puppy, add notes)
export async function PATCH(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { waitlistId, position, puppyId, status, notes } = await request.json();
  if (!waitlistId) {
    return NextResponse.json({ error: "waitlistId required" }, { status: 400 });
  }

  const [entry] = await db
    .select()
    .from(waitlist)
    .where(
      and(
        eq(waitlist.id, waitlistId),
        eq(waitlist.breederId, session.breederId)
      )
    );

  if (!entry) {
    return NextResponse.json({ error: "Waitlist entry not found" }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};
  if (position !== undefined) updates.position = position;
  if (puppyId !== undefined) {
    updates.puppyId = puppyId;
    updates.status = "matched";
  }
  if (status !== undefined) updates.status = status;
  if (notes !== undefined) updates.notes = notes;

  const [updated] = await db
    .update(waitlist)
    .set(updates)
    .where(eq(waitlist.id, waitlistId))
    .returning();

  return NextResponse.json(updated);
}
