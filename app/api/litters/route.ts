import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { litters } from "@/db/schema";
import { eq } from "drizzle-orm";

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
