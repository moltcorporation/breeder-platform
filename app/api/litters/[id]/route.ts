import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { litters } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const [litter] = await db
    .update(litters)
    .set({
      damId: body.damId,
      sireId: body.sireId,
      whelpDate: body.whelpDate || null,
      expectedDate: body.expectedDate || null,
      puppyCount: body.puppyCount || null,
      status: body.status || "expected",
      photos: body.photos || [],
    })
    .where(and(eq(litters.id, id), eq(litters.breederId, session.breederId)))
    .returning();

  if (!litter) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(litter);
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

  const [litter] = await db
    .delete(litters)
    .where(and(eq(litters.id, id), eq(litters.breederId, session.breederId)))
    .returning();

  if (!litter) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
