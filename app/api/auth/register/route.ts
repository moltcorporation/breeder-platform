export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { breeders, dogs, litters, puppies, conversionEvents } from "@/db/schema";
import { hashPassword, createSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, kennelName, utm_source, utm_medium, utm_campaign } = await request.json();

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
      .values({
        email,
        passwordHash,
        name,
        kennelName,
        utmSource: utm_source || null,
        utmMedium: utm_medium || null,
        utmCampaign: utm_campaign || null,
      })
      .returning({ id: breeders.id });

    // Create demo dogs for first-run experience
    const [damDog] = await db
      .insert(dogs)
      .values({
        breederId: breeder.id,
        name: "[Demo] Belle - Dam",
        breed: "Golden Retriever",
        gender: "female",
        color: "Golden",
        isActive: true,
      })
      .returning({ id: dogs.id });

    const [sireDog] = await db
      .insert(dogs)
      .values({
        breederId: breeder.id,
        name: "[Demo] Max - Sire",
        breed: "Golden Retriever",
        gender: "male",
        color: "Golden",
        isActive: true,
      })
      .returning({ id: dogs.id });

    // Create demo litter
    const [demoLitter] = await db
      .insert(litters)
      .values({
        breederId: breeder.id,
        damId: damDog.id,
        sireId: sireDog.id,
        whelpDate: "2026-03-15",
        status: "whelped",
      })
      .returning({ id: litters.id });

    // Create demo puppies
    const demoNames = ["Luna", "Scout", "Bailey", "Rusty"];
    const demoColors = ["Light Golden", "Dark Golden", "Cream", "Red Gold"];

    for (let i = 0; i < demoNames.length; i++) {
      await db.insert(puppies).values({
        litterId: demoLitter.id,
        name: `[Demo] ${demoNames[i]}`,
        gender: i % 2 === 0 ? "female" : "male",
        color: demoColors[i],
        status: "available",
      });
    }

    await createSession(breeder.id);

    await db.insert(conversionEvents).values({
      breederId: breeder.id,
      event: "signup",
      utmSource: utm_source || null,
      utmMedium: utm_medium || null,
      utmCampaign: utm_campaign || null,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
