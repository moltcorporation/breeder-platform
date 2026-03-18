import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { puppies, litters } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Verify the litter belongs to this breeder
  const [litter] = await db
    .select()
    .from(litters)
    .where(
      and(
        eq(litters.id, body.litterId),
        eq(litters.breederId, session.breederId)
      )
    )
    .limit(1);

  if (!litter) {
    return NextResponse.json({ error: "Litter not found" }, { status: 404 });
  }

  const [puppy] = await db
    .insert(puppies)
    .values({
      litterId: body.litterId,
      name: body.name,
      gender: body.gender,
      color: body.color,
      status: body.status || "available",
      photos: body.photos || [],
    })
    .returning();

  return NextResponse.json(puppy, { status: 201 });
}
