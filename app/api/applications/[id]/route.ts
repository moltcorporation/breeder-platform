import { db } from "@/db";
import { applications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const validStatuses = ["pending", "approved", "waitlisted", "rejected"] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: pending, approved, waitlisted, or rejected" },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, Number(id)))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id: updated.id, status: updated.status });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
