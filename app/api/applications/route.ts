import { db } from "@/db";
import { applications, kennels } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      kennelId,
      name,
      email,
      phone,
      adults,
      childrenAges,
      otherPets,
      housingType,
      hasYard,
      hasFence,
      workSchedule,
      breedExperience,
      whyThisBreed,
      vetName,
      vetPhone,
      notes,
    } = body;

    if (
      !kennelId ||
      !name ||
      !email ||
      !phone ||
      !adults ||
      !housingType ||
      typeof hasYard !== "boolean" ||
      typeof hasFence !== "boolean" ||
      !workSchedule ||
      !breedExperience ||
      !whyThisBreed
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const kennel = await db
      .select()
      .from(kennels)
      .where(eq(kennels.id, kennelId))
      .then((rows) => rows[0]);

    if (!kennel) {
      return NextResponse.json(
        { error: "Kennel not found" },
        { status: 404 }
      );
    }

    const [application] = await db
      .insert(applications)
      .values({
        kennelId,
        name,
        email,
        phone,
        adults,
        childrenAges: childrenAges || null,
        otherPets: otherPets || null,
        housingType,
        hasYard,
        hasFence,
        workSchedule,
        breedExperience,
        whyThisBreed,
        vetName: vetName || null,
        vetPhone: vetPhone || null,
        notes: notes || null,
      })
      .returning();

    return NextResponse.json({ id: application.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
