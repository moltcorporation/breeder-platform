import { db } from "@/db";
import { breedNotifications } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, breed_slug, state } = body;

    if (!email || !breed_slug) {
      return NextResponse.json(
        { error: "Email and breed are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const [entry] = await db
      .insert(breedNotifications)
      .values({
        email,
        breedSlug: breed_slug,
        state: state || null,
      })
      .returning();

    return NextResponse.json({ id: entry.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
