import { db } from "@/db";
import { feedback } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, category, intent, message, page } = body;

    if (!category || !message) {
      return NextResponse.json(
        { error: "Category and message are required" },
        { status: 400 }
      );
    }

    const validCategories = ["bug", "feature", "general"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const [entry] = await db
      .insert(feedback)
      .values({
        email: email || null,
        category,
        intent: intent || null,
        message,
        page: page || null,
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
