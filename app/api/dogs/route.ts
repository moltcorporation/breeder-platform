import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { dogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await db
    .select()
    .from(dogs)
    .where(eq(dogs.breederId, session.breederId))
    .orderBy(dogs.createdAt);

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const [dog] = await db
    .insert(dogs)
    .values({
      breederId: session.breederId,
      name: body.name,
      breed: body.breed,
      gender: body.gender,
      dob: body.dob || null,
      color: body.color,
      weight: body.weight || null,
      photos: body.photos || [],
      isActive: body.isActive ?? true,
    })
    .returning();

  return NextResponse.json(dog, { status: 201 });
}
