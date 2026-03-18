import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { dogs } from "@/db/schema";
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

  const [dog] = await db
    .update(dogs)
    .set({
      name: body.name,
      breed: body.breed,
      gender: body.gender,
      dob: body.dob || null,
      color: body.color,
      weight: body.weight || null,
      photos: body.photos || [],
      isActive: body.isActive ?? true,
    })
    .where(and(eq(dogs.id, id), eq(dogs.breederId, session.breederId)))
    .returning();

  if (!dog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(dog);
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

  const [dog] = await db
    .delete(dogs)
    .where(and(eq(dogs.id, id), eq(dogs.breederId, session.breederId)))
    .returning();

  if (!dog) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
