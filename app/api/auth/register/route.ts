export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { breeders } from "@/db/schema";
import { hashPassword, createSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, kennelName } = await request.json();

    if (!email || !password || !name || !kennelName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await db
      .select()
      .from(breeders)
      .where(eq(breeders.email, email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const [breeder] = await db
      .insert(breeders)
      .values({ email, passwordHash, name, kennelName })
      .returning({ id: breeders.id });

    await createSession(breeder.id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
