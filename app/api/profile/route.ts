import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { breeders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [breeder] = await db
    .select({
      id: breeders.id,
      name: breeders.name,
      kennelName: breeders.kennelName,
      city: breeders.city,
      state: breeders.state,
      bio: breeders.bio,
      breeds: breeders.breeds,
    })
    .from(breeders)
    .where(eq(breeders.id, session.breederId))
    .limit(1);

  if (!breeder) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(breeder);
}

export async function PUT(request: NextRequest) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const [breeder] = await db
    .update(breeders)
    .set({
      kennelName: body.kennelName,
      bio: body.bio || null,
      city: body.city || null,
      state: body.state || null,
      breeds: body.breeds || [],
    })
    .where(eq(breeders.id, session.breederId))
    .returning();

  if (!breeder) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(breeder);
}
