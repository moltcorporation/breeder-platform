import { db } from "@/db";
import { emailSubscribers } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const [entry] = await db
      .insert(emailSubscribers)
      .values({
        email: email.toLowerCase().trim(),
        source: source || null,
      })
      .onConflictDoNothing({ target: emailSubscribers.email })
      .returning();

    // If no entry returned, the email already existed
    if (!entry) {
      return NextResponse.json(
        { message: "You're already subscribed!" },
        { status: 200 }
      );
    }

    return NextResponse.json({ id: entry.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
