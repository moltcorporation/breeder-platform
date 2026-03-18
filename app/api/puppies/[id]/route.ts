import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { puppies, litters } from "@/db/schema";
import { eq, and } from "drizzle-orm";

async function verifyPuppyOwnership(puppyId: string, breederId: string) {
  const result = await db
    .select({ puppy: puppies, litter: litters })
    .from(puppies)
    .innerJoin(litters, eq(puppies.litterId, litters.id))
    .where(and(eq(puppies.id, puppyId), eq(litters.breederId, breederId)))
    .limit(1);

  return result[0] || null;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const ownership = await verifyPuppyOwnership(id, session.breederId);
  if (!ownership) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json();

  const [puppy] = await db
    .update(puppies)
    .set({
      name: body.name,
      gender: body.gender,
      color: body.color,
      status: body.status || "available",
      photos: body.photos || [],
    })
    .where(eq(puppies.id, id))
    .returning();

  return NextResponse.json(puppy);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const ownership = await verifyPuppyOwnership(id, session.breederId);
  if (!ownership) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.delete(puppies).where(eq(puppies.id, id));

  return NextResponse.json({ success: true });
}
